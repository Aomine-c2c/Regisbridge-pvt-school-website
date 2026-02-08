'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, DollarSign, Wallet, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { getAllStudents } from '@/services/adminService';

export function FinanceManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ totalRevenue: 0, pendingFees: 0, overdueCount: 0 });
  const [payments, setPayments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    studentId: '',
    amount: '',
    paidAmount: '',
    feeType: 'TUITION',
    dueDate: '',
    paymentMethod: 'CASH',
    notes: ''
  });

  const fetchData = async () => {
    try {
      // Fetch Stats
      const statsRes = await fetch('/api/admin/finance/stats');
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch Payments
      const paymentsRes = await fetch('/api/admin/finance/payments');
      const paymentsData = await paymentsRes.json();
      if (paymentsData.success) {
        setPayments(paymentsData.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch finance data', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data.data || []);
    } catch (e) { console.error('Error fetching students', e); }
  }

  useEffect(() => {
    fetchData();
    fetchStudents();
  }, []);

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/finance/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentForm)
      });
      const data = await res.json();
      
      if (data.success) {
        toast({ title: 'Success', description: 'Payment recorded successfully' });
        setIsPaymentOpen(false);
        fetchData(); // Refresh data
        // Reset form slightly
        setPaymentForm({...paymentForm, amount: '', paidAmount: '', notes: ''});
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to record', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Exception occurred', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Finance Management"
        description="Track fees, revenue, and pending payments"
        action={
          <Button onClick={() => setIsPaymentOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg border shadow-sm flex items-center space-x-4">
          <div className="p-2 bg-green-100 rounded-full text-green-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg border shadow-sm flex items-center space-x-4">
          <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Fees</p>
            <h3 className="text-2xl font-bold">${stats.pendingFees.toLocaleString()}</h3>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border shadow-sm flex items-center space-x-4">
          <div className="p-2 bg-red-100 rounded-full text-red-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Overdue Payments</p>
            <h3 className="text-2xl font-bold">{stats.overdueCount}</h3>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Recent Transactions</TabsTrigger>
          {/* Add Reports Tab later if needed */}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
           <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Fee Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8">No transactions found</TableCell></TableRow>
                ) : (
                  payments.map((p: any) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-medium">{p.studentName}</div>
                        <div className="text-xs text-muted-foreground">{p.studentId}</div>
                      </TableCell>
                      <TableCell>{p.feeType}</TableCell>
                      <TableCell>${p.amount}</TableCell>
                      <TableCell className="text-green-600">+${p.paidAmount}</TableCell>
                      <TableCell className="text-red-600">${p.balance}</TableCell>
                      <TableCell>
                         <Badge variant={p.status === 'PAID' ? 'default' : p.status === 'PENDING' ? 'destructive' : 'secondary'}>
                           {p.status}
                         </Badge>
                      </TableCell>
                      <TableCell>
                        {p.dueDate ? format(new Date(p.dueDate), 'MMM d, yyyy') : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* RECORD PAYMENT DIALOG */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record Fee Payment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRecordPayment} className="space-y-4">
            <div className="space-y-2">
              <Label>Student</Label>
              <Select value={paymentForm.studentId} onValueChange={val => setPaymentForm({...paymentForm, studentId: val})}>
                <SelectTrigger><SelectValue placeholder="Select Student" /></SelectTrigger>
                <SelectContent>
                  {students.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.studentId || s.id.substring(0,8)})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Amount</Label>
                <Input type="number" required value={paymentForm.amount} onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                 <Label>Paid Now</Label>
                 <Input type="number" value={paymentForm.paidAmount} onChange={e => setPaymentForm({...paymentForm, paidAmount: e.target.value})} placeholder="0.00" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label>Fee Type</Label>
                 <Select value={paymentForm.feeType} onValueChange={val => setPaymentForm({...paymentForm, feeType: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TUITION">Tuition</SelectItem>
                    <SelectItem value="LIBRARY">Library</SelectItem>
                    <SelectItem value="TRANSPORT">Transport</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
               </div>
               <div className="space-y-2">
                  <Label>Payment Method</Label>
                   <Select value={paymentForm.paymentMethod} onValueChange={val => setPaymentForm({...paymentForm, paymentMethod: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CASH">Cash</SelectItem>
                      <SelectItem value="CARD">Card</SelectItem>
                      <SelectItem value="TRANSFER">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" required value={paymentForm.dueDate} onChange={e => setPaymentForm({...paymentForm, dueDate: e.target.value})} />
            </div>

            <DialogFooter>
              <Button type="submit">Record Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
