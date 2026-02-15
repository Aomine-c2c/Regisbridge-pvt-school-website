'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Shield } from 'lucide-react';
import { RoleEditor } from './RoleEditor';

interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  _count: { users: number };
  permissions: { permission: { slug: string; description: string } }[];
}

export function RoleList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/roles');
      if (res.ok) {
        const data = await res.json();
        setRoles(data);
      }
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    try {
      const res = await fetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchRoles();
      } else {
        alert('Failed to delete role');
      }
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Roles & Permissions</h2>
        <button
          onClick={() => { setEditingRole(null); setIsEditorOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Create New Role
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading roles...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${role.isSystem ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role._count?.users || 0} users</p>
                </div>
              </div>
              {!role.isSystem && (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingRole(role); setIsEditorOpen(true); }}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-50"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 md:h-10">
              {role.description || 'No description provided.'}
            </p>

            <div className="border-t pt-4 mt-auto">
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.slice(0, 3).map((p) => (
                  <span key={p.permission.slug} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
                    {p.permission.description}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-400 text-xs rounded-md">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {isEditorOpen && (
        <RoleEditor
          role={editingRole}
          onClose={() => setIsEditorOpen(false)}
          onSave={() => { setIsEditorOpen(false); fetchRoles(); }}
        />
      )}
    </div>
  );
}
