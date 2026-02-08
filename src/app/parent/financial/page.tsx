'use client';

import React from 'react';

export default function ParentFinancialPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-white font-sans transition-colors duration-200">
      {/* Top Nav skipped (layout) */}
      
      <main className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#2957e0] font-bold text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-lg">payments</span>
              <span>Financial Overview</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em] text-[#111317] dark:text-white">Fee History & Payments</h1>
            <p className="text-[#646d87] dark:text-gray-400 text-base max-w-2xl">
              View your transaction history, download invoices, and manage upcoming fee payments securely.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 text-sm font-bold text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span>Statement</span>
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
              <span>Make Payment</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Transaction History */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#1e2330] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
                <p className="text-sm font-bold text-[#646d87] dark:text-gray-400 uppercase tracking-wide">Outstanding Balance</p>
                <h3 className="text-3xl font-black text-[#111317] dark:text-white">$2,450.00</h3>
                <p className="text-xs text-red-600 font-bold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  Due by Oct 15, 2024
                </p>
              </div>
              <div className="bg-white dark:bg-[#1e2330] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
                <p className="text-sm font-bold text-[#646d87] dark:text-gray-400 uppercase tracking-wide">Total Paid (YTD)</p>
                <h3 className="text-3xl font-black text-[#111317] dark:text-white">$12,800.00</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Up to date
                </p>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col flex-1">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center">
                <h3 className="text-lg font-bold text-[#111317] dark:text-white">Transaction History</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <select className="pl-3 pr-8 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium focus:ring-[#2957e0] appearance-none cursor-pointer">
                      <option>This Academic Year</option>
                      <option>Last Year</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-2.5 text-gray-400 pointer-events-none text-lg">arrow_drop_down</span>
                  </div>
                  <button className="p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-[#2957e0]">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-[#646d87] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Ref ID</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#111317] dark:text-white">Term 1 Tuition Fee</div>
                        <div className="text-xs text-[#646d87] dark:text-gray-400">Academic Year 2024-25</div>
                      </td>
                      <td className="px-6 py-4 text-[#111317] dark:text-gray-200">Sep 01, 2024</td>
                      <td className="px-6 py-4 font-mono text-xs text-[#646d87]">INV-2024-001</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#111317] dark:text-white">$1,800.00</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#2957e0] hover:text-blue-700 font-bold text-xs">Pay Now</button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#111317] dark:text-white">Boarding Fee</div>
                        <div className="text-xs text-[#646d87] dark:text-gray-400">Semester 1 Accommodation</div>
                      </td>
                      <td className="px-6 py-4 text-[#111317] dark:text-gray-200">Sep 01, 2024</td>
                      <td className="px-6 py-4 font-mono text-xs text-[#646d87]">INV-2024-002</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#111317] dark:text-white">$500.00</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-[#2957e0]"><span className="material-symbols-outlined text-[20px]">download</span></button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#111317] dark:text-white">Meal Plan (September)</div>
                        <div className="text-xs text-[#646d87] dark:text-gray-400">Full Board</div>
                      </td>
                      <td className="px-6 py-4 text-[#111317] dark:text-gray-200">Aug 28, 2024</td>
                      <td className="px-6 py-4 font-mono text-xs text-[#646d87]">INV-2024-003</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#111317] dark:text-white">$150.00</td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-gray-400 hover:text-[#2957e0]"><span className="material-symbols-outlined text-[20px]">download</span></button>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#111317] dark:text-white">Library Fine</div>
                        <div className="text-xs text-[#646d87] dark:text-gray-400">Late Return: "History of Time"</div>
                      </td>
                      <td className="px-6 py-4 text-[#111317] dark:text-gray-200">Jun 15, 2024</td>
                      <td className="px-6 py-4 font-mono text-xs text-[#646d87]">INV-2023-098</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-[#111317] dark:text-white">$12.50</td>
                      <td className="px-6 py-4 text-right">
                         <button className="text-gray-400 hover:text-[#2957e0]"><span className="material-symbols-outlined text-[20px]">download</span></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/20 flex justify-between items-center">
                 <p className="text-sm text-[#646d87] dark:text-gray-400">Showing 4 of 12 records</p>
                 <div className="flex gap-2">
                   <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2330] text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Previous</button>
                   <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1e2330] text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Next</button>
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Payment Widget */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-[#2957e0] text-white rounded-xl shadow-lg shadow-blue-500/30 p-6 relative overflow-hidden">
               {/* Decorative Circles */}
               <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10 blur-2xl"></div>
               <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/10 blur-2xl"></div>

               <h3 className="text-lg font-bold mb-6 relative z-10">Make a Payment</h3>
               
               <div className="space-y-4 relative z-10">
                 {/* Breakdown */}
                 <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm opacity-70">school</span>
                        Term 1 Tuition
                      </span>
                      <span className="font-medium">$1,800.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm opacity-70">bed</span>
                        Boarding Fee
                      </span>
                      <span className="font-medium">$500.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-100 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm opacity-70">restaurant</span>
                        Meal Plan (Sept)
                      </span>
                      <span className="font-medium">$150.00</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-white/20 flex justify-between items-center">
                       <span className="text-sm font-bold">Total Due</span>
                       <span className="text-xl font-black">$2,450.00</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 text-sm text-blue-100">
                   <input type="checkbox" id="partial" className="rounded border-white/30 bg-white/10 text-white focus:ring-0" />
                   <label htmlFor="partial">I want to make a partial payment</label>
                 </div>

                 <button className="w-full h-12 bg-white text-[#2957e0] rounded-lg font-bold text-base hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                   Proceed to Payment
                   <span className="material-symbols-outlined">arrow_forward</span>
                 </button>
                 
                 <div className="flex items-center justify-center gap-3 opacity-70 pt-2">
                   <span className="text-[10px] uppercase font-bold tracking-wider">Secure Payment via</span>
                   <div className="flex gap-2">
                      <div className="h-4 w-8 bg-white/20 rounded"></div>
                      <div className="h-4 w-8 bg-white/20 rounded"></div>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-white dark:bg-[#1e2330] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
               <h3 className="text-lg font-bold text-[#111317] dark:text-white mb-4">Saved Cards</h3>
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#2957e0]/50 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                       <span className="material-symbols-outlined text-gray-400">credit_card</span>
                     </div>
                     <div>
                       <p className="text-sm font-bold text-[#111317] dark:text-white">Visa ending in 4242</p>
                       <p className="text-xs text-[#646d87] dark:text-gray-400">Expires 12/25</p>
                     </div>
                   </div>
                   <span className="material-symbols-outlined text-gray-400 group-hover:text-[#2957e0]">edit</span>
                 </div>
                 <button className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-bold text-[#646d87] dark:text-gray-400 hover:text-[#2957e0] hover:border-[#2957e0] hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors flex items-center justify-center gap-2">
                   <span className="material-symbols-outlined">add</span>
                   Add Payment Method
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
