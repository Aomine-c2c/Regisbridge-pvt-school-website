"""
Regisbridge School Management System — One-Click Remote Deployment Tool
Packages local project code, transfers via SFTP, and executes server setup/update via SSH.
Compatible with Windows, macOS, and Linux.
"""
import os
import sys
import tarfile
import tempfile
import time
import getpass

try:
    import paramiko
except ImportError:
    print("[!] Error: 'paramiko' is required. Please install it with: pip install paramiko")
    sys.exit(1)

# Ensure console supports utf-8
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def get_config():
    host = os.getenv("REGISBRIDGE_SERVER_HOST")
    if not host:
        host = input("Server Host / IP address: ").strip()

    user = os.getenv("REGISBRIDGE_SERVER_USER")
    if not user:
        user = input("Server SSH Username [root]: ").strip() or "root"

    key_path = os.getenv("REGISBRIDGE_SSH_KEY")
    password = None

    if not key_path:
        use_key = input("Use SSH Private Key? (y/n) [n]: ").strip().lower()
        if use_key == 'y':
            key_path = input("Path to private key file: ").strip()
        else:
            password = os.getenv("REGISBRIDGE_SERVER_PASSWORD")
            if not password:
                password = getpass.getpass(f"SSH Password for {user}@{host}: ")

    remote_dir = os.getenv("REGISBRIDGE_REMOTE_DIR", "/opt/regisbridge")
    return host, user, password, key_path, remote_dir

def package_code():
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    temp_tar = os.path.join(tempfile.gettempdir(), f"regisbridge_code_{int(time.time())}.tar.gz")
    print(f"[*] Packaging project files from: {project_root}...")

    ignored_dirs = {
        ".git", ".github", ".vscode", ".idea", ".next", "node_modules",
        ".venv", "venv", "__pycache__", "out", "dist", "build",
        "coverage", "target"
    }

    ignored_extensions = (".pyc", ".log", ".tmp", ".tsbuildinfo")

    file_count = 0
    with tarfile.open(temp_tar, "w:gz") as tar:
        for root, dirs, files in os.walk(project_root):
            dirs[:] = [d for d in dirs if d not in ignored_dirs]
            for file in files:
                if file.startswith(".env.") and not file.endswith(".example"):
                    continue # Do not upload local secrets
                if file.endswith(ignored_extensions):
                    continue

                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, project_root)
                tar.add(full_path, arcname=rel_path)
                file_count += 1

    size_mb = os.path.getsize(temp_tar) / (1024 * 1024)
    print(f"[+] Packaged {file_count} files ({size_mb:.2f} MB) into {temp_tar}")
    return temp_tar

def main():
    print("=" * 64)
    print("   Regisbridge School — Remote Server Deployment Tool   ")
    print("=" * 64)

    host, user, password, key_path, remote_dir = get_config()

    print(f"\n[*] Connecting to {host} as {user}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        if key_path:
            ssh.connect(host, username=user, key_filename=key_path, timeout=30)
        else:
            ssh.connect(host, username=user, password=password, timeout=30)
        print("[+] SSH connection established.")
    except Exception as e:
        print(f"[!] SSH Connection failed: {e}")
        sys.exit(1)

    # 1. Package files
    archive_path = package_code()

    # 2. Upload archive via SFTP
    print("[*] Uploading package to server via SFTP...")
    sftp = ssh.open_sftp()
    remote_archive = "/tmp/regisbridge_code.tar.gz"

    def progress_callback(transferred, total):
        pct = (transferred / total) * 100
        print(f"\r  Uploading: {pct:.1f}% ({transferred // 1024} KB / {total // 1024} KB)", end="", flush=True)

    sftp.put(archive_path, remote_archive, callback=progress_callback)
    sftp.close()
    os.remove(archive_path)
    print("\n[+] Package uploaded successfully.")

    def run_remote(cmd, sudo=True):
        print(f"\n>>> EXECUTING: {cmd}")
        if sudo and user != "root":
            full_cmd = f"echo '{password}' | sudo -S bash -c {repr(cmd)}"
        else:
            full_cmd = f"bash -c {repr(cmd)}"

        stdin, stdout, stderr = ssh.exec_command(full_cmd, get_pty=True)
        for line in iter(stdout.readline, ""):
            print(line, end="")
        exit_code = stdout.channel.recv_exit_status()
        if exit_code != 0:
            print(f"[!] Command failed with exit code: {exit_code}")
        return exit_code

    # 3. Extract to remote directory
    print(f"[*] Extracting package into {remote_dir}...")
    run_remote(f"mkdir -p {remote_dir}")
    run_remote(f"tar -xzf {remote_archive} -C {remote_dir}")
    run_remote(f"rm -f {remote_archive}")
    run_remote(f"chmod +x {remote_dir}/deploy/*.sh {remote_dir}/*.sh {remote_dir}/backend/*.sh {remote_dir}/gateway/*.sh 2>/dev/null || true")

    # 4. Check if this is initial setup or update
    check_env = run_remote(f"test -f {remote_dir}/.env.production && echo 'exists' || echo 'missing'")

    action = os.getenv("REGISBRIDGE_DEPLOY_ACTION")
    if not action:
        action = input("\nSelect deployment action:\n  [1] Initial Server Setup (setup_server.sh)\n  [2] Release Update (update.sh)\nChoice [1/2]: ").strip()

    if action == "2":
        run_remote(f"{remote_dir}/deploy/update.sh")
    else:
        run_remote(f"{remote_dir}/deploy/setup_server.sh")

    ssh.close()
    print("\n[+] Deployment process finished.")

if __name__ == "__main__":
    main()
