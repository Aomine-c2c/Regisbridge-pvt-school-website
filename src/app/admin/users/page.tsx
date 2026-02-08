'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  accessModules: string[];
  status: 'Active' | 'Away' | 'Disabled';
  lastLogin: string;
  lastIP: string;
  avatar?: string;
}

// Default permissions structure
const DEFAULT_PERMISSIONS = {
  finance: {
    view_reports: true,
    process_payments: false,
    manage_payroll: false,
  },
  students: {
    view_profiles: true,
    edit_records: false,
    delete_records: false,
  }
};

const SYSTEM_ROLES = ['Super Admin', 'Teacher', 'Registrar', 'Accountant'];

export default function SystemUserManagementPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('staff');
  
  // Permissions State
  const [selectedRoleToEdit, setSelectedRoleToEdit] = useState('Accountant');
  const [permissionSettings, setPermissionSettings] = useState(DEFAULT_PERMISSIONS);
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        if (json.success) {
          // Normalize user data from API if needed, for now assuming simpler shape or mock fallback
          const apiUsers = json.users.map((u: any) => ({
             id: u.id,
             name: `${u.firstName} ${u.lastName}`,
             email: u.email,
             role: u.role,
             roleColor: getRoleColor(u.role),
             accessModules: [], // API doesn't return this yet
             status: u.status === 'active' ? 'Active' : 'Disabled',
             lastLogin: 'N/A',
             lastIP: 'N/A'
          }));
          setUsers(apiUsers.length ? apiUsers : getMockUsers());
        } else {
          setUsers(getMockUsers());
        }
      } catch (error) {
        console.error(error);
        setUsers(getMockUsers());
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRoleColor = (role: string) => {
    switch(role.toLowerCase()) {
        case 'super admin': return 'purple';
        case 'teacher': return 'blue';
        case 'registrar': return 'indigo';
        case 'accountant': return 'teal';
        default: return 'gray';
    }
  };

  const getMockUsers = (): User[] => [
    { id: '1', name: 'Sarah Jenkins', email: 'sarah.j@eagle.edu', role: 'Super Admin', roleColor: 'purple', accessModules: ['Finance', 'HR', 'Academics', 'All'], status: 'Active', lastLogin: 'Today, 9:00 AM', lastIP: '192.168.1.1' },
    { id: '2', name: 'Michael Ross', email: 'm.ross@eagle.edu', role: 'Teacher', roleColor: 'blue', accessModules: ['Academics', 'Students'], status: 'Active', lastLogin: 'Yesterday', lastIP: '192.168.1.42' },
    { id: '3', name: 'Elena Gomez', email: 'e.gomez@eagle.edu', role: 'Registrar', roleColor: 'indigo', accessModules: ['Students', 'Enrollment'], status: 'Away', lastLogin: '2 days ago', lastIP: '192.168.1.12', avatar: 'https://via.placeholder.com/150' },
    { id: '4', name: 'David Chen', email: 'd.chen@eagle.edu', role: 'Accountant', roleColor: 'teal', accessModules: ['Finance'], status: 'Active', lastLogin: 'Today, 8:30 AM', lastIP: '192.168.1.88' },
  ];

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePermission = (category: keyof typeof DEFAULT_PERMISSIONS, key: string) => {
    setPermissionSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSavePermissions = async () => {
    setIsSavingPermissions(true);
    try {
      const res = await fetch('/api/admin/roles/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          role: selectedRoleToEdit,
          permissions: permissionSettings
        })
      });

      const json = await res.json();
      
      if (res.ok) {
        toast({
          title: "Permissions Saved",
          description: `Access rights for ${selectedRoleToEdit} have been updated.`,
        });
      } else {
        throw new Error(json.message || 'Failed to update');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save permissions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSavingPermissions(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;

  return (
    <div className="overflow-hidden flex h-screen w-full bg-gray-50 font-sans">
      {/* Sidebar removed - using AdminLayout sidebar */}


      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
        {/* Page Header */}
        <div className="px-6 py-8 md:px-10 w-full bg-white border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl mx-auto">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-2">User & Role Management</h1>
              <p className="text-gray-500 text-base max-w-2xl">Manage system access, define roles, and configure granular permissions for staff members.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors text-sm font-bold shadow-sm">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span>Audit Logs</span>
              </button>
              <button className="flex items-center justifycenter gap-2 h-10 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-bold shadow-sm">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Add New User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-6 max-w-7xl mx-auto w-full">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setSelectedTab('staff')}
                className={`flex items-center gap-2 border-b-[3px] pb-3 px-1 transition-colors ${
                  selectedTab === 'staff' ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <span className="text-sm font-bold">Staff Users</span>
              </button>
              <button
                onClick={() => setSelectedTab('roles')}
                className={`flex items-center gap-2 border-b-[3px] pb-3 px-1 transition-colors ${
                  selectedTab === 'roles' ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">shield_person</span>
                <span className="text-sm font-bold">Role Permissions</span>
              </button>
              <button
                onClick={() => setSelectedTab('security')}
                className={`flex items-center gap-2 border-b-[3px] pb-3 px-1 transition-colors ${
                  selectedTab === 'security' ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-blue-600'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span className="text-sm font-bold">Security Policies</span>
              </button>
            </div>
          </div>

          {selectedTab === 'staff' && (
            <>
              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="relative flex-1 max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 h-10 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-600 text-sm text-gray-900 placeholder-gray-500"
                    placeholder="Search by name, email, or role..."
                    type="text"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 h-10 px-3 rounded-lg bg-gray-50 border-none text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center gap-2 h-10 px-3 rounded-lg bg-gray-50 border-none text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text gray-500 w-1/4">Name / Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Access Level</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Last Login</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="size-10 rounded-full object-cover" />
                              ) : (
                                <div className={`size-10 rounded-full bg-${user.roleColor}-100 flex items-center justify-center text-${user.roleColor}-600 font-bold`}>
                                  {user.name.substring(0, 2)}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-${user.roleColor}-100 text-${user.roleColor}-800`}>
                              <span className={`w-1.5 h-1.5 rounded-full bg-${user.roleColor}-500`}></span>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex -space-x-2">
                              {user.accessModules.slice(0, 3).map((module, idx) => (
                                <div key={idx} className="size-6 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[10px] text-gray-500" title={module}>
                                  {module.substring(0, 2)}
                                </div>
                              ))}
                              {user.accessModules.length > 3 && (
                                <div className="size-6 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[10px] text-gray-500">
                                  +{user.accessModules.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' :
                              user.status === 'Away' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-900">{user.lastLogin}</p>
                            <p className="text-xs text-gray-500">IP: {user.lastIP}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-gray-500 hover:text-blue-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                              <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-16">
                            <div className="text-center">
                              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">person_search</span>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
                              <p className="text-gray-500 max-w-md mx-auto">
                                {searchQuery 
                                  ? `No users match "${searchQuery}". Try adjusting your search.`
                                  : 'No users available in the system.'
                                }
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-bold text-gray-900">1-{filteredUsers.length}</span> of <span className="font-bold text-gray-900">{users.length}</span> users
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-200 text-sm text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedTab === 'roles' && (
            /* Granular Permissions Panel */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Role Info */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-600">
                      <span className="material-symbols-outlined">calculate</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{selectedRoleToEdit}</h3>
                      <p className="text-sm text-gray-500">Select role to edit</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Role</label>
                  <select 
                    value={selectedRoleToEdit}
                    onChange={(e) => setSelectedRoleToEdit(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600"
                  >
                    {SYSTEM_ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="text-sm font-medium">Require 2FA</span>
                    <div className="relative inline-flex h6 w-11 items-center rounded-full bg-blue-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <span className="text-sm font-medium">Session Timeout</span>
                    <span className="text-sm font-bold text-blue-600">30 Mins</span>
                  </div>
                </div>
              </div>

              {/* Permission Toggles */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-gray-900">Module Access Permissions</h3>
                  <div className="flex items-center gap-2">
                     <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">Unsaved Changes</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Finance Module */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-2">Finance Module</h4>
                    {[
                      { key: 'view_reports', name: 'View Reports', desc: 'Access to financial dashboards' },
                      { key: 'process_payments', name: 'Process Payments', desc: 'Charge cards and record checks' },
                      { key: 'manage_payroll', name: 'Manage Payroll', desc: 'Edit salaries and disburse funds' },
                    ].map((perm) => (
                      <div key={perm.key} className="flex items-center justify-between group">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{perm.name}</span>
                          <span className="text-xs text-gray-500">{perm.desc}</span>
                        </div>
                        <div 
                          onClick={() => togglePermission('finance', perm.key)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer transition-colors ${permissionSettings.finance[perm.key as keyof typeof permissionSettings.finance] ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition shadow ${permissionSettings.finance[perm.key as keyof typeof permissionSettings.finance] ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Student Records */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-2">Student Records</h4>
                    {[
                      { key: 'view_profiles', name: 'View Profiles', desc: 'Read-only access to student info' },
                      { key: 'edit_records', name: 'Edit Academic Records', desc: 'Change grades and attendance' },
                      { key: 'delete_records', name: 'Delete Records', desc: 'Permanently remove student data' },
                    ].map((perm) => (
                      <div key={perm.key} className="flex items-center justify-between group">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{perm.name}</span>
                          <span className="text-xs text-gray-500">{perm.desc}</span>
                        </div>
                        <div 
                          onClick={() => togglePermission('students', perm.key)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer transition-colors ${permissionSettings.students[perm.key as keyof typeof permissionSettings.students] ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition shadow ${permissionSettings.students[perm.key as keyof typeof permissionSettings.students] ? 'translate-x-5' : 'translate-x-1'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                  <button 
                    onClick={() => setPermissionSettings(DEFAULT_PERMISSIONS)}
                    className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900"
                  >
                    Reset Defaults
                  </button>
                  <button 
                    onClick={handleSavePermissions}
                    disabled={isSavingPermissions}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSavingPermissions && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                    Save Permissions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
