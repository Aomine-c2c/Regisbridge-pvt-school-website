import { AuditLogViewer } from "@/components/admin/AuditLogViewer";

export default function AuditLogsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-2">Track all system activities and security events.</p>
      </div>

      <AuditLogViewer />
    </div>
  );
}
