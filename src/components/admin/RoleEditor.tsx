'use client';

import { useState, useEffect } from 'react';
import { X, Save, Check } from 'lucide-react';

interface Permission {
  id: string;
  slug: string;
  description: string;
  group: string;
}

interface RoleEditorProps {
  role?: any;
  onClose: () => void;
  onSave: () => void;
}

export function RoleEditor({ role, onClose, onSave }: RoleEditorProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissionIds: role?.permissions?.map((p: any) => p.permission.id) || []
  });
  
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      const res = await fetch('/api/admin/permissions');
      if (res.ok) {
        setPermissions(await res.json());
      }
    };
    fetchPermissions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = role ? `/api/admin/roles/${role.id}` : '/api/admin/roles';
      const method = role ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        onSave();
      } else {
        alert('Failed to save role');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving role');
    } finally {
      setLoading(false);
    }
  };

  // Group permissions by 'group' field
  const groupedPermissions = permissions.reduce((acc, perm) => {
    const group = perm.group || 'Other';
    if (!acc[group]) acc[group] = [];
    acc[group].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  const togglePermission = (id: string) => {
    setFormData(prev => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(id)
        ? prev.permissionIds.filter((pid: string) => pid !== id)
        : [...prev.permissionIds, id]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">{role ? 'Edit Role' : 'Create Role'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <form id="role-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Finance Manager"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                rows={2}
                placeholder="Brief description of what this role handles..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([group, perms]) => (
                  <div key={group}>
                    <h4 className="font-medium text-gray-900 mb-2 border-b pb-1">{group}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {perms.map(perm => {
                        const isSelected = formData.permissionIds.includes(perm.id);
                        return (
                          <div
                            key={perm.id}
                            onClick={() => togglePermission(perm.id)}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              isSelected 
                                ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200' 
                                : 'hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-300'
                            }`}>
                              {isSelected && <Check size={14} strokeWidth={3} />}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{perm.slug}</div>
                              <div className="text-xs text-gray-500 leading-snug mt-0.5">{perm.description}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="role-form"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? 'Saving...' : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
