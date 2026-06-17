'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

interface FeeRecord {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  paidAmount: number;
  balance: number;
  feeType: string;
  status: string;
  dueDate: string;
  paymentDate: string;
  method: string;
}

interface FinanceStats {
  totalRevenue: number;
  pendingFees: number;
  overdueCount: number;
}

export default function FinanceFeeManagementPage() {
  const { toast } = useToast();
  const [records, setRecords] = useState<FeeRecord[]>([]);
  const [stats, setStats] = useState<FinanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        
        // Fetch Stats
        const statsRes = await fetch('/api/admin/finance/stats', { headers });
        const statsJson = await statsRes.json();
        if (statsJson.success) {
          setStats(statsJson.data);
        }

        // Fetch Payments
        const paymentsRes = await fetch('/api/admin/finance/payments', { headers });
        const paymentsJson = await paymentsRes.json();
        if (paymentsJson.success) {
          setRecords(paymentsJson.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch finance data", error);
        toast({ title: "Error", description: "Failed to load finance data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const filteredRecords = records.filter(r =>
    r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;

  const totalInvoiced = stats?.totalRevenue || 0; // Stats API mock revenue as sum of paid
  const totalCollected = stats?.totalRevenue || 0;
  const outstanding = stats?.pendingFees || 0;
  const overdueAccounts = stats?.overdueCount || 0;

  return (
    <div className="h-screen flex bg-gray-50 font-sans overflow-hidden">


      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-gray-50 py-6 px-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link className="hover:text-blue-600 transition-colors" href="#">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-blue-600 transition-colors" href="#">Finance</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-gray-900 font-medium">Aging Report</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Fee Aging Report</h2>
              <p className="text-gray-500 mt-1 max-w-2xl">
                Monitor outstanding balances, manage overdue accounts, and streamline collections across all grades.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">ios_share</span>
                Export PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-md shadow-blue-500/20">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Generate Invoice
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-sm font-medium">Total Invoiced (YTD)</p>
                <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalInvoiced / 1000).toFixed(0)},000</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+12% vs last year</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-sm font-medium">Total Collected</p>
                <div className="p-1.5 bg-emerald-50 rounded-md text-emerald-600">
                  <span className="material-symbols-outlined text-[20px]">savings</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">${(totalCollected / 1000).toFixed(0)},000</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+8% vs last year</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-sm font-medium">Outstanding Balance</p>
                <div className="p-1.5 bg-orange-50 rounded-md text-orange-600">
                  <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">${(outstanding / 1000).toFixed(0)},000</p>
              <div className="flex items-center gap-1 mt-2 text-rose-500 text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_down</span>
                <span>High priority</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-sm font-medium">Overdue Accounts</p>
                <div className="p-1.5 bg-rose-50 rounded-md text-rose-600">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{overdueAccounts}</p>
              <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs font-medium">
                <span className="material-symbols-outlined text-[16px]">trending_down</span>
                <span>-2% from last month</span>
              </div>
            </div>
          </div>

          {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
                </div>
                <input
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                  placeholder="Search by student, ID, or invoice..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-3">
                <select className="px-3 py-2 text-sm border-gray-300 bg-white text-gray-700 rounded-lg">
                  <option>All Grades</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
                <select className="px-3 py-2 text-sm border-gray-300 bg-white text-gray-700 rounded-lg">
                  <option>All Statuses</option>
                  <option>PAID</option>
                  <option>PENDING</option>
                  <option>PARTIAL</option>
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Type</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Paid</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record: any) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                              {record.studentName.substring(0, 2)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                              <div className="text-xs text-gray-500">ID: {record.studentId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{record.feeType}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 font-medium">${record.amount.toLocaleString()}.00</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-emerald-600 font-medium">${record.paidAmount.toLocaleString()}.00</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${record.balance > 0 ? 'text-rose-600' : 'text-gray-400'}`}>
                          ${record.balance.toLocaleString()}.00
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            record.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            record.status === 'PARTIAL' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                            'bg-rose-100 text-rose-800 border-rose-200'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-gray-400 hover:text-blue-600" title="Send Reminder">
                              <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                            </button>
                            <button className="text-gray-400 hover:text-gray-600" title="View Details">
                              <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                       <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          No payment records found.
                       </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">142</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
