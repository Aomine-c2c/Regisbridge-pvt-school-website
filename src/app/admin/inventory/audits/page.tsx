'use client';

import React from 'react';

export default function AssetAuditsPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f7f8] dark:bg-[#111521]">
      {/* Header */}
      <header className="bg-white dark:bg-[#1a202c] border-b border-[#dcdee5] dark:border-gray-700 px-6 py-4 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <a className="hover:text-primary transition-colors" href="#">Home</a>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <a className="hover:text-primary transition-colors" href="#">Finance</a>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">Inventory Audit</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inventory Audit & Reporting</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm focus:ring-primary focus:border-primary w-64"
                placeholder="Search assets, reports..."
                type="text"
              />
            </div>
            <button className="flex items-center gap-2 bg-white dark:bg-[#1a202c] border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-[18px]">upload</span>
              Import Data
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Audit Cycle
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1a202c] p-5 rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Fixed Assets</p>
                <span className="material-symbols-outlined text-gray-400">account_balance</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">$4,250,000</p>
                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded flex items-center">
                  <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> 2.5%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Vs. previous term</p>
            </div>
            <div className="bg-white dark:bg-[#1a202c] p-5 rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Items Flagged</p>
                <span className="material-symbols-outlined text-gray-400">build</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">45 Items</p>
                <span className="text-xs font-medium text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-1.5 py-0.5 rounded flex items-center">
                  Needs Repair
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">12 Critical items</p>
            </div>
            <div className="bg-white dark:bg-[#1a202c] p-5 rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Depreciation YTD</p>
                <span className="material-symbols-outlined text-gray-400">trending_down</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">-$125,000</p>
                <span className="text-xs font-medium text-red-600 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded flex items-center">
                  -5.0%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Scheduled write-offs</p>
            </div>
            <div className="bg-white dark:bg-[#1a202c] p-5 rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Audit Status</p>
                <span className="material-symbols-outlined text-gray-400">fact_check</span>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-primary tabular-nums">In Progress</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">65% Complete • Due in 3 days</p>
            </div>
          </div>

          {/* Charts & Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Data Viz */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Distribution */}
              <div className="bg-white dark:bg-[#1a202c] p-6 rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Asset Distribution</h3>
                  <button className="text-gray-400 hover:text-primary"><span className="material-symbols-outlined">more_horiz</span></button>
                </div>
                <div className="flex items-center gap-8 justify-center h-full">
                  {/* CSS Donut Chart */}
                  <div
                    className="relative size-40 rounded-full shrink-0"
                    style={{
                      background: 'conic-gradient(#2957e0 0% 35%, #0ea5e9 35% 60%, #6366f1 60% 85%, #cbd5e1 85% 100%)',
                    }}
                  >
                    <div className="absolute inset-0 m-auto size-28 bg-white dark:bg-[#1a202c] rounded-full flex items-center justify-center flex-col">
                      <span className="text-sm font-medium text-gray-500">Total</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">1,240</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-primary"></span>
                      <span className="text-gray-600 dark:text-gray-300">IT & Labs (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-sky-500"></span>
                      <span className="text-gray-600 dark:text-gray-300">Classrooms (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-indigo-500"></span>
                      <span className="text-gray-600 dark:text-gray-300">Sports (25%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-slate-300"></span>
                      <span className="text-gray-600 dark:text-gray-300">Other (15%)</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Depreciation Trend */}
              <div className="bg-white dark:bg-[#1a202c] p-6 rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Depreciation Trend</h3>
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-md p-0.5">
                    <button className="px-2 py-0.5 text-xs font-medium rounded bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white">Term</button>
                    <button className="px-2 py-0.5 text-xs font-medium rounded text-gray-500 hover:text-gray-700">Year</button>
                  </div>
                </div>
                <div className="flex flex-1 items-end gap-4 h-40 px-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {/* Bars */}
                  <div className="flex-1 flex flex-col justify-end gap-2 group">
                    <div className="w-full bg-indigo-100 dark:bg-indigo-900/40 rounded-t-sm h-[60%] relative group-hover:bg-indigo-200 transition-colors"></div>
                    <span className="text-xs text-center text-gray-500">T1</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end gap-2 group">
                    <div className="w-full bg-indigo-100 dark:bg-indigo-900/40 rounded-t-sm h-[75%] relative group-hover:bg-indigo-200 transition-colors"></div>
                    <span className="text-xs text-center text-gray-500">T2</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end gap-2 group">
                    <div className="w-full bg-primary rounded-t-sm h-[90%] relative group-hover:bg-primary-dark transition-colors shadow-sm">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        $125k
                      </div>
                    </div>
                    <span className="text-xs text-center font-medium text-primary">T3</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Col: Report Generator */}
            <div className="bg-white dark:bg-[#1a202c] rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm flex flex-col">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-lg">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Report Generator
                </h3>
                <p className="text-xs text-gray-500 mt-1">Generate government-compliant PDFs.</p>
              </div>
              <div className="p-4 flex flex-col gap-4 flex-1">
                {/* Report Type 1 */}
                <div className="flex flex-col gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Count Sheets</label>
                  <div className="flex gap-2">
                    <select className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-1.5 text-sm text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:max-w-xs">
                      <option>All Locations</option>
                      <option>Science Lab A</option>
                      <option>Gymnasium</option>
                    </select>
                  </div>
                  <button className="mt-1 w-full flex items-center justify-center gap-2 rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <span className="material-symbols-outlined text-[16px]">download</span> Generate Sheet
                  </button>
                </div>
                {/* Report Type 2 */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Financial Reports</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex flex-col items-center justify-center gap-1 p-3 rounded border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-colors group">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">table_chart</span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Depreciation</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 p-3 rounded border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-colors group">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">broken_image</span>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Lost/Damaged</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 rounded-b-lg">
                <button className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Export Master Audit (XLS)
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Data Table */}
          <div className="bg-white dark:bg-[#1a202c] rounded-lg border border-[#dcdee5] dark:border-gray-700 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/50">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Current Asset Registry</h3>
                <p className="text-sm text-gray-500">Term 3, 2024 • Verified 2 days ago</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-gray-500 hover:text-primary transition-colors" title="Filter"><span className="material-symbols-outlined">filter_list</span></button>
                <button className="p-1.5 text-gray-500 hover:text-primary transition-colors" title="Settings"><span className="material-symbols-outlined">settings</span></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Asset ID</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Location</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Original Cost</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Current Value</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" scope="col">Status</th>
                    <th className="relative px-6 py-3" scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1a202c] divide-y divide-gray-200 dark:divide-gray-700">
                  {/* Row 1 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">AST-2024-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">MacBook Air M2 13"</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IT Equipment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Computer Lab A</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right tabular-nums">$1,199.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium tabular-nums">$950.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Good</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined text-[18px]">edit</span></a>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">AST-2023-842</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Varsity Football Gear (Set)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sports Equipment</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gym Storage B</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right tabular-nums">$3,500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium tabular-nums">$2,100.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Inspect</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined text-[18px]">edit</span></a>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">AST-2022-115</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Smartboard Pro 75"</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Room 304</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right tabular-nums">$4,200.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium tabular-nums">$2,800.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Good</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined text-[18px]">edit</span></a>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">AST-2021-009</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Dormitory Bunk Beds (Wing A)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Furniture</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dorm Block A</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right tabular-nums">$12,000.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium tabular-nums">$6,500.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Damaged</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined text-[18px]">edit</span></a>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">AST-2024-055</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Chemistry Glassware Kit</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lab Consumables</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Science Lab B</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right tabular-nums">$850.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right font-medium tabular-nums">$600.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Good</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a className="text-gray-400 hover:text-primary" href="#"><span className="material-symbols-outlined text-[18px]">edit</span></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">1240</span> results
                  </p>
                </div>
                <div>
                  <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <a className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0" href="#">
                      <span className="sr-only">Previous</span>
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </a>
                    <a aria-current="page" className="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" href="#">1</a>
                    <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0" href="#">2</a>
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-offset-0">...</span>
                    <a className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0" href="#">
                      <span className="sr-only">Next</span>
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
