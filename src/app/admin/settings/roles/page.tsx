import { RoleList } from "@/components/admin/RoleList";

export default function RolesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
        <p className="text-gray-600 mt-2">Manage custom roles and assign permissions to control access across the system.</p>
      </div>

      <RoleList />
    </div>
  );
}
