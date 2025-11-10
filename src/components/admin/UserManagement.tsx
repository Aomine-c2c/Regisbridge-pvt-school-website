// UserManagement Component - Manage all users in the system
import { useEffect, useState } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { DataTable, Column } from './shared/DataTable';
import { ConfirmDialog } from './shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Edit, Trash2, MoreHorizontal, Download, UserCog, CheckCircle, XCircle } from 'lucide-react';
import { getAllUsers, createUser, updateUser, deleteUser, exportUsersToCSV } from '@/services/adminService';
import type { User, UserFormData } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [bulkRoleDialogOpen, setBulkRoleDialogOpen] = useState(false);
  const [bulkStatusDialogOpen, setBulkStatusDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [bulkRole, setBulkRole] = useState<string>('student');
  const [bulkStatus, setBulkStatus] = useState<string>('active');
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'student',
    grade: '',
    studentId: '',
    phoneNumber: '',
    password: '',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      role: 'student',
      grade: '',
      studentId: '',
      phoneNumber: '',
      password: '',
    });
    setDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      grade: user.grade || '',
      studentId: user.studentId || '',
      phoneNumber: user.phoneNumber || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      });
      loadUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        toast({
          title: 'Success',
          description: 'User updated successfully',
        });
      } else {
        await createUser(formData);
        toast({
          title: 'Success',
          description: 'User created successfully',
        });
      }
      setDialogOpen(false);
      loadUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: editingUser ? 'Failed to update user' : 'Failed to create user',
        variant: 'destructive',
      });
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportUsersToCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      toast({
        title: 'Success',
        description: 'Users exported successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export users',
        variant: 'destructive',
      });
    }
  };

  // Bulk selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(users.map(u => u.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelected = new Set(selectedUsers);
    if (checked) {
      newSelected.add(userId);
    } else {
      newSelected.delete(userId);
    }
    setSelectedUsers(newSelected);
  };

  const isAllSelected = users.length > 0 && selectedUsers.size === users.length;
  const isSomeSelected = selectedUsers.size > 0 && selectedUsers.size < users.length;

  // Bulk action handlers
  const handleBulkDelete = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: 'No Selection',
        description: 'Please select users to delete',
        variant: 'destructive',
      });
      return;
    }
    setBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      // Simulate bulk delete API call
      const promises = Array.from(selectedUsers).map(id => deleteUser(id));
      await Promise.all(promises);
      
      toast({
        title: 'Success',
        description: `Deleted ${selectedUsers.size} user(s) successfully`,
      });
      setSelectedUsers(new Set());
      loadUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete some users',
        variant: 'destructive',
      });
    }
  };

  const handleBulkRoleChange = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: 'No Selection',
        description: 'Please select users to update',
        variant: 'destructive',
      });
      return;
    }
    setBulkRoleDialogOpen(true);
  };

  const confirmBulkRoleChange = async () => {
    try {
      // Simulate bulk role update API call
      const promises = Array.from(selectedUsers).map(id => 
        updateUser(id, { role: bulkRole as any })
      );
      await Promise.all(promises);
      
      toast({
        title: 'Success',
        description: `Updated role for ${selectedUsers.size} user(s)`,
      });
      setSelectedUsers(new Set());
      setBulkRoleDialogOpen(false);
      loadUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update some users',
        variant: 'destructive',
      });
    }
  };

  const handleBulkStatusChange = () => {
    if (selectedUsers.size === 0) {
      toast({
        title: 'No Selection',
        description: 'Please select users to update',
        variant: 'destructive',
      });
      return;
    }
    setBulkStatusDialogOpen(true);
  };

  const confirmBulkStatusChange = async () => {
    try {
      // Simulate bulk status update API call
      const promises = Array.from(selectedUsers).map(id => 
        updateUser(id, { status: bulkStatus as any })
      );
      await Promise.all(promises);
      
      toast({
        title: 'Success',
        description: `Updated status for ${selectedUsers.size} user(s)`,
      });
      setSelectedUsers(new Set());
      setBulkStatusDialogOpen(false);
      loadUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update some users',
        variant: 'destructive',
      });
    }
  };

  const columns: Column<User>[] = [
    {
      key: 'select',
      label: (
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={handleSelectAll}
          aria-label="Select all users"
        />
      ),
      render: (user) => (
        <Checkbox
          checked={selectedUsers.has(user.id)}
          onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
          aria-label={`Select ${user.firstName} ${user.lastName}`}
        />
      ),
    },
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (user) => `${user.firstName} ${user.lastName}`,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (user) => (
        <Badge variant="outline" className="capitalize">
          {user.role}
        </Badge>
      ),
    },
    {
      key: 'grade',
      label: 'Grade',
      render: (user) => user.grade || '—',
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (user) => (
        <Badge
          variant={user.status === 'active' ? 'default' : 'secondary'}
          className={user.status === 'active' ? 'bg-green-500' : ''}
        >
          {user.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="User Management"
        description="Manage all system users including students, parents, teachers, and admins"
        action={
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        }
      />

      {/* Bulk Actions Toolbar */}
      {selectedUsers.size > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="font-medium text-blue-900">
              {selectedUsers.size} user{selectedUsers.size > 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleBulkRoleChange} variant="outline" size="sm">
              <UserCog className="h-4 w-4 mr-2" />
              Change Role
            </Button>
            <Button onClick={handleBulkStatusChange} variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Update Status
            </Button>
            <Button onClick={handleBulkDelete} variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      <DataTable
        data={users}
        columns={columns}
        searchPlaceholder="Search users..."
        loading={loading}
        actions={(user) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(user)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(user)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Edit User' : 'Create New User'}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? 'Update user information below'
                : 'Fill in the details to create a new user'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>

            {formData.role === 'student' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            {!editingUser && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingUser ? 'Update' : 'Create'} User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${userToDelete?.firstName} ${userToDelete?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />

      {/* Bulk Delete Confirmation */}
      <ConfirmDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        onConfirm={confirmBulkDelete}
        title="Delete Multiple Users"
        description={`Are you sure you want to delete ${selectedUsers.size} user(s)? This action cannot be undone.`}
        confirmText="Delete All"
        variant="destructive"
      />

      {/* Bulk Role Change Dialog */}
      <Dialog open={bulkRoleDialogOpen} onOpenChange={setBulkRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Role for Multiple Users</DialogTitle>
            <DialogDescription>
              Select a new role for {selectedUsers.size} selected user(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulkRole">New Role</Label>
              <Select value={bulkRole} onValueChange={setBulkRole}>
                <SelectTrigger id="bulkRole">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBulkRoleChange}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Status Change Dialog */}
      <Dialog open={bulkStatusDialogOpen} onOpenChange={setBulkStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status for Multiple Users</DialogTitle>
            <DialogDescription>
              Select a new status for {selectedUsers.size} selected user(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulkStatus">New Status</Label>
              <Select value={bulkStatus} onValueChange={setBulkStatus}>
                <SelectTrigger id="bulkStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBulkStatusChange}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
