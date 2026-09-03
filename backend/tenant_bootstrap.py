"""
Tenant and Superuser Bootstrap Script for Regisbridge School Management System
Executes idempotently on container startup to ensure required baseline schemas,
default school tenant, and administrative credentials exist.
"""
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from tenants.models import SchoolTenant, Domain

User = get_user_model()

def bootstrap():
    print("[*] Running Tenant & Superuser Bootstrap...", flush=True)

    server_domain = os.getenv('SERVER_DOMAIN', 'localhost').strip()
    superuser_email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@regisbridge.edu').strip()
    superuser_password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'Admin123!').strip()

    # 1. Public Tenant (Required by django-tenants for global shared models)
    public_tenant = SchoolTenant.objects.filter(schema_name='public').first()
    if not public_tenant:
        print("[*] Creating Public Tenant...", flush=True)
        public_tenant = SchoolTenant(
            schema_name='public',
            name='Regisbridge Master System',
            subscription_plan='ENTERPRISE',
            is_active=True
        )
        public_tenant.save()

        public_domain = Domain(
            domain=server_domain,
            tenant=public_tenant,
            is_primary=True
        )
        public_domain.save()
        print(f"[+] Created Public Tenant with domain: {server_domain}", flush=True)
    else:
        print(f"[+] Public Tenant already present.", flush=True)

    # 2. Default School Tenant (e.g., 'school' or 'regisbridge')
    school_tenant = SchoolTenant.objects.filter(schema_name='regisbridge').first()
    if not school_tenant:
        print("[*] Creating Default School Tenant ('regisbridge')...", flush=True)
        school_tenant = SchoolTenant(
            schema_name='regisbridge',
            name='Regisbridge Private School',
            subscription_plan='ENTERPRISE',
            is_active=True,
            enable_finance=True,
            enable_hr=True,
            enable_events=True,
            enable_hostel=True,
            enable_transport=True,
            enable_library=True
        )
        school_tenant.save()

        school_subdomain = f"school.{server_domain}" if server_domain != 'localhost' else "school.localhost"
        school_domain = Domain(
            domain=school_subdomain,
            tenant=school_tenant,
            is_primary=True
        )
        school_domain.save()
        print(f"[+] Created School Tenant with domain: {school_subdomain}", flush=True)
    else:
        print("[+] Default School Tenant ('regisbridge') already present.", flush=True)

    # 3. Superuser in public schema
    if not User.objects.filter(email=superuser_email).exists():
        print(f"[*] Creating Django superuser ({superuser_email})...", flush=True)
        try:
            # Check fields on custom User model
            user = User.objects.create_superuser(
                email=superuser_email,
                password=superuser_password
            )
            print(f"[+] Superuser {superuser_email} created successfully.", flush=True)
        except Exception as e:
            print(f"[!] Warning creating superuser: {e}", flush=True)
    else:
        print(f"[+] Superuser {superuser_email} already exists.", flush=True)

    print("[+] Tenant Bootstrap completed successfully.", flush=True)

if __name__ == '__main__':
    bootstrap()
