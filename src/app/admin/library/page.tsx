'use client';

import React, { useEffect, useState } from 'react';

interface LibraryMetrics {
  totalVolumes: number;
  activeCirculation: number;
  overdueItems: number;
  digitalAccess: number;
}

interface Transaction {
  id: string;
  bookTitle: string;
  studentName: string;
  grade: string;
  type: string;
  time: string;
}

interface InventoryItem {
  id: string;
  title: string;
  isbn: string;
  category: string;
  status: string;
  borrower: string | null;
  dueDate: string | null;
  coverImage: string | null;
}

interface LibraryAdminData {
  metrics: LibraryMetrics;
  recentTransactions: Transaction[];
  inventory: InventoryItem[];
}

export default function LibraryCommandCenterPage() {
  const [data, setData] = useState<LibraryAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/library/dashboard/admin');
        if (!response.ok) throw new Error('Failed to fetch library data');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred while loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
     return (
       <div className="flex-1 p-8 flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
       </div>
     );
  }

  if (error) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) return null;

  const filteredInventory = data.inventory.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.isbn && item.isbn.includes(searchQuery))
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen bg-background-light dark:bg-[#101922]">
      {/* Header Section */}
      <header className="bg-surface-light dark:bg-[#1c242f] border-b border-[#e5e7eb] dark:border-[#283039] px-6 py-4 flex-shrink-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8]">
            <span className="text-[#0f172a] dark:text-white font-medium">Library</span>
          </div>
          <div className="flex flex-wrap justify-between items-end gap-4 mt-2">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#0f172a] dark:text-white tracking-tight">
                Library &amp; Asset Command Center
              </h1>
              <p className="text-[#64748b] dark:text-[#94a3b8] mt-1">
                Manage physical inventory, digital assets, and circulation records.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] dark:border-[#334155] rounded-lg text-sm font-medium text-[#334155] dark:text-[#e2e8f0] bg-white dark:bg-[#1e293b] hover:bg-[#f8fafc] dark:hover:bg-[#334155] transition-all">
                <span className="material-symbols-outlined text-[20px]">file_download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium shadow-sm transition-all">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Add Resource
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col gap-8 overflow-y-auto">
        {/* Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Metric Card 1 */}
          <div className="bg-white dark:bg-[#1c242f] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl dark:text-white">
                library_books
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-medium mb-1">
                Total Volumes
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white">{data.metrics.totalVolumes.toLocaleString()}</h3>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                  +12%
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-2">Physical books &amp; media</p>
            </div>
          </div>
          {/* Metric Card 2 */}
          <div className="bg-white dark:bg-[#1c242f] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl dark:text-white">
                assignment_ind
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-medium mb-1">
                Currently Borrowed
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white">{data.metrics.activeCirculation}</h3>
                <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">
                    trending_flat
                  </span>
                  Stable
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-2">Active circulation</p>
            </div>
          </div>
          {/* Metric Card 3 */}
          <div className="bg-white dark:bg-[#1c242f] p-6 rounded-xl border border-rose-200 dark:border-rose-900/50 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 text-rose-500 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl">warning</span>
            </div>
            <div className="relative z-10">
              <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-medium mb-1">
                Overdue Items
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white">{data.metrics.overdueItems}</h3>
                <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/30 dark:text-rose-400 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                  +5%
                </span>
              </div>
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
                Requires action
              </p>
            </div>
          </div>
          {/* Metric Card 4 */}
          <div className="bg-white dark:bg-[#1c242f] p-6 rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-8xl dark:text-white">cloud_done</span>
            </div>
            <div className="relative z-10">
              <p className="text-[#64748b] dark:text-[#94a3b8] text-sm font-medium mb-1">
                Digital Access (24h)
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white">{data.metrics.digitalAccess.toLocaleString()}</h3>
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                  +8%
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-2">E-books &amp; database logins</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Quick Circulation Desk (Takes up 4/12 columns) */}
          <section className="xl:col-span-4 flex flex-col gap-6">
            {/* Main Action Card */}
            <div className="bg-white dark:bg-[#1c242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm p-6 flex flex-col h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0f172a] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">barcode_reader</span>
                  Quick Circulation
                </h2>
                <div className="bg-[#f1f5f9] dark:bg-[#0f172a] p-1 rounded-lg inline-flex">
                  <button className="px-3 py-1 text-xs font-semibold rounded-md shadow-sm bg-white dark:bg-[#1e293b] text-primary dark:text-white">
                    Issue
                  </button>
                  <button className="px-3 py-1 text-xs font-medium rounded-md text-[#64748b] hover:text-[#334155] dark:text-[#94a3b8] dark:hover:text-[#e2e8f0]">
                    Return
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wide">
                    Resource Barcode / ISBN
                  </label>
                  <div className="relative">
                    <input
                      autoFocus
                      className="w-full bg-white dark:bg-[#0f172a] border border-[#cbd5e1] dark:border-[#334155] rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white font-mono placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      placeholder="Scan or type ISBN..."
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-3.5 text-[#94a3b8]">
                      qr_code_scanner
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wide">
                    Borrower ID / Name
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-white dark:bg-[#0f172a] border border-[#cbd5e1] dark:border-[#334155] rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      placeholder="Student or Staff ID..."
                      type="text"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-3.5 text-[#94a3b8]">
                      badge
                    </span>
                  </div>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2">
                  <span>Process Transaction</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Recent Activity Log */}
            <div className="bg-white dark:bg-[#1c242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm p-0 flex flex-col flex-1 overflow-hidden">
              <div className="p-4 border-b border-[#e5e7eb] dark:border-[#283039] bg-[#f8fafc]/50 dark:bg-[#1e293b]/50">
                <h3 className="text-sm font-bold text-[#1e293b] dark:text-[#e2e8f0]">
                  Recent Transactions
                </h3>
              </div>
              <div className="divide-y divide-[#f1f5f9] dark:divide-[#283039] overflow-y-auto max-h-[300px]">
                {data.recentTransactions.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">No recent transactions.</div>
                ) : (
                  data.recentTransactions.map((tx) => (
                    <div key={tx.id} className="p-4 flex items-start gap-3 hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-md bg-[#e2e8f0] dark:bg-[#334155] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#64748b]">book</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0f172a] dark:text-white truncate">
                          {tx.bookTitle}
                        </p>
                        <p className="text-xs text-[#64748b] dark:text-[#94a3b8] flex items-center gap-1">
                          {tx.type}{' '}
                          <span className="font-semibold text-[#334155] dark:text-[#cbd5e1]">
                            {tx.studentName} ({tx.grade})
                          </span>
                        </p>
                      </div>
                      <div className="text-xs font-medium text-[#94a3b8] whitespace-nowrap">
                        {tx.time}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Inventory Table (Takes up 8/12 columns) */}
          <section className="xl:col-span-8 bg-white dark:bg-[#1c242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm flex flex-col overflow-hidden">
            {/* Table Filters */}
            <div className="p-4 border-b border-[#e5e7eb] dark:border-[#283039] flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1c242f]">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <h2 className="text-lg font-bold text-[#0f172a] dark:text-white whitespace-nowrap mr-2">
                  Inventory
                </h2>
                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#94a3b8] text-[20px]">
                    search
                  </span>
                  <input
                    className="w-full pl-9 pr-4 py-1.5 text-sm bg-[#f8fafc] dark:bg-[#0f172a] border border-[#cbd5e1] dark:border-[#334155] rounded-md focus:ring-1 focus:ring-primary outline-none dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="Search title, author, ISBN..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <select className="text-sm bg-white dark:bg-[#0f172a] border border-[#cbd5e1] dark:border-[#334155] rounded-md px-3 py-1.5 text-[#334155] dark:text-[#e2e8f0] focus:ring-primary focus:border-primary outline-none cursor-pointer">
                  <option>All Categories</option>
                  <option>Fiction</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>Technology</option>
                </select>
                <select className="text-sm bg-white dark:bg-[#0f172a] border border-[#cbd5e1] dark:border-[#334155] rounded-md px-3 py-1.5 text-[#334155] dark:text-[#e2e8f0] focus:ring-primary focus:border-primary outline-none cursor-pointer">
                  <option>All Statuses</option>
                  <option>Available</option>
                  <option>Borrowed</option>
                  <option>Overdue</option>
                  <option>Lost</option>
                </select>
                <button className="p-1.5 text-[#64748b] hover:text-primary border border-[#cbd5e1] dark:border-[#334155] rounded-md hover:bg-[#f8fafc] dark:hover:bg-[#334155] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
              </div>
            </div>
            {/* Data Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] dark:bg-[#1e293b]/50 border-b border-[#e5e7eb] dark:border-[#283039]">
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider w-16">
                      Cover
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                      Title / ISBN
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                      Borrower
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-xs font-semibold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9] dark:divide-[#283039]/50 bg-white dark:bg-[#1c242f]">
                  {filteredInventory.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                        No books found.
                      </td>
                    </tr>
                   ) : (
                    filteredInventory.map((book) => (
                      <tr key={book.id} className="group hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/30 transition-colors">
                        <td className="px-6 py-3">
                          <div
                            className="h-10 w-8 rounded bg-[#e2e8f0] dark:bg-[#334155] bg-cover bg-center shadow-sm"
                            style={{
                              backgroundImage: book.coverImage ? `url('${book.coverImage}')` : undefined,
                            }}
                          >
                            {!book.coverImage && <span className="flex items-center justify-center h-full w-full text-xs text-slate-400">?</span>}
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <p className="text-sm font-semibold text-[#0f172a] dark:text-white">
                            {book.title}
                          </p>
                          <p className="text-xs text-[#64748b] font-mono">{book.isbn}</p>
                        </td>
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#f1f5f9] text-[#1e293b] dark:bg-[#1e293b] dark:text-[#e2e8f0]">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            book.status === 'Overdue' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300' :
                            book.status === 'Borrowed' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                            'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              book.status === 'Overdue' ? 'bg-rose-500' :
                              book.status === 'Borrowed' ? 'bg-amber-500' :
                              'bg-emerald-500'
                            }`}></span>
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          {book.borrower ? (
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-[#e2e8f0] flex items-center justify-center text-[10px] font-bold text-[#475569]">
                                {book.borrower.charAt(0)}
                              </div>
                              <span className="text-sm text-[#334155] dark:text-[#cbd5e1]">{book.borrower}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-[#94a3b8] italic">--</span>
                          )}
                        </td>
                        <td className="px-6 py-3">
                          {book.dueDate ? (
                             <span className={`text-sm font-medium ${book.status === 'Overdue' ? 'text-rose-600 dark:text-rose-400' : 'text-[#475569] dark:text-[#94a3b8]'}`}>
                               {book.dueDate}
                             </span>
                          ) : (
                             <span className="text-sm text-[#94a3b8] italic">--</span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <button className="text-[#94a3b8] hover:text-primary transition-colors p-1">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                        </td>
                      </tr>
                    ))
                   )}
                </tbody>
              </table>
            </div>
            {/* Table Pagination */}
            <div className="p-4 border-t border-[#e5e7eb] dark:border-[#283039] bg-[#f8fafc] dark:bg-[#1c242f] flex items-center justify-between">
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                Showing <span className="font-bold">1-{filteredInventory.length}</span> of{' '}
                <span className="font-bold">{data.metrics.totalVolumes}</span> results
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-[#cbd5e1] dark:border-[#475569] text-xs font-medium text-[#475569] dark:text-[#cbd5e1] hover:bg-white dark:hover:bg-[#334155] disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 rounded border border-[#cbd5e1] dark:border-[#475569] text-xs font-medium text-[#475569] dark:text-[#cbd5e1] hover:bg-white dark:hover:bg-[#334155]">
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
