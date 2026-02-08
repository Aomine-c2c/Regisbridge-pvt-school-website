'use client';

import React from 'react';

export default function InventoryCommandCenterPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#111521]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#1a1f2e] px-6 py-3 shrink-0 z-20">
        <div className="flex items-center gap-4 lg:hidden">
          <button className="text-[#64748b] dark:text-[#9ea5b7]">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-[#0f172a] dark:text-white text-lg font-bold">Inventory</h2>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <h2 className="text-[#0f172a] dark:text-white text-xl font-bold tracking-tight">Inventory & Asset Management</h2>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          {/* Global Search */}
          <div className="hidden md:flex max-w-md w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94a3b8] dark:text-[#9ea5b7] group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="block w-full rounded-lg border border-[#e2e8f0] dark:border-none bg-[#f1f5f9] dark:bg-[#292d38] py-2 pl-10 pr-4 text-[#0f172a] dark:text-white placeholder-[#94a3b8] dark:placeholder-[#9ea5b7] focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1a1f2e] transition-all sm:text-sm sm:leading-6"
              placeholder="Search assets, SKU, or serial numbers..."
              type="text"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[#94a3b8] dark:text-[#9ea5b7] text-xs border border-[#cbd5e1] dark:border-[#3d4252] rounded px-1.5 py-0.5">⌘K</span>
            </div>
          </div>
          {/* Icons */}
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center size-10 rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#292d38] text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-white dark:border-[#1a1f2e]"></span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-[#292d38] text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Value */}
            <div className="relative overflow-hidden rounded-xl border border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#1a1f2e] p-6 group hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#64748b] dark:text-[#9ea5b7] text-sm font-medium">Total Asset Value</p>
                  <h3 className="text-[#0f172a] dark:text-white text-3xl font-bold tracking-tight">$1,240,500</h3>
                </div>
                <div className="p-2 bg-blue-50 dark:bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">attach_money</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[16px] mr-0.5">trending_up</span>
                  2.4%
                </span>
                <span className="text-[#64748b] dark:text-[#9ea5b7] text-sm">vs last fiscal year</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            {/* Maintenance */}
            <div className="relative overflow-hidden rounded-xl border border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#1a1f2e] p-6 group hover:border-amber-500/50 transition-colors shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#64748b] dark:text-[#9ea5b7] text-sm font-medium">Pending Maintenance</p>
                  <h3 className="text-[#0f172a] dark:text-white text-3xl font-bold tracking-tight">14 Items</h3>
                </div>
                <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-500">
                  <span className="material-symbols-outlined">build</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[#0f172a] dark:text-white text-sm">3 critical urgency</span>
                <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs px-2 py-0.5 border border-[#e2e8f0] dark:border-[#292d38] rounded-full">Requires attention</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            {/* Low Stock */}
            <div className="relative overflow-hidden rounded-xl border border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#1a1f2e] p-6 group hover:border-red-500/50 transition-colors shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#64748b] dark:text-[#9ea5b7] text-sm font-medium">Low Stock Alerts</p>
                  <h3 className="text-[#0f172a] dark:text-white text-3xl font-bold tracking-tight">3 Cats</h3>
                </div>
                <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500">
                  <span className="material-symbols-outlined">warning</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[#64748b] dark:text-[#9ea5b7] text-sm truncate max-w-[200px]">Markers, Lab Coats, Printer Paper</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Actions Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#1a1f2e] p-4 rounded-xl border border-[#e2e8f0] dark:border-[#292d38] shadow-sm">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="relative">
                <select className="appearance-none bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] text-[#0f172a] dark:text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-primary focus:border-primary cursor-pointer hover:bg-[#e2e8f0] dark:hover:bg-[#323846] transition-colors">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Lab Equipment</option>
                  <option>Musical Instruments</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64748b] dark:text-[#9ea5b7]">
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] text-[#0f172a] dark:text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-primary focus:border-primary cursor-pointer hover:bg-[#e2e8f0] dark:hover:bg-[#323846] transition-colors">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Maintenance</option>
                  <option>Retired</option>
                  <option>Lost/Stolen</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64748b] dark:text-[#9ea5b7]">
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                More Filters
              </button>
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white dark:bg-[#292d38] hover:bg-[#f1f5f9] dark:hover:bg-[#323846] text-[#0f172a] dark:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors border border-[#e2e8f0] dark:border-[#292d38] group">
                <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">qr_code_scanner</span>
                <span className="hidden sm:inline">Scan</span>
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Add New Asset
              </button>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="rounded-xl border border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#1a1f2e] overflow-hidden flex flex-col shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f8fafc] dark:bg-[#1e2330] border-b border-[#e2e8f0] dark:border-[#292d38]">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7]" scope="col">Asset Name</th>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7]" scope="col">SKU / Serial</th>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7]" scope="col">Category</th>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7]" scope="col">Location / User</th>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7]" scope="col">Status</th>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7] text-right" scope="col">Value</th>
                    <th className="px-6 py-4 font-semibold text-[#64748b] dark:text-[#9ea5b7] text-right" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] dark:divide-[#292d38]">
                  {/* Row 1 */}
                  <tr className="group hover:bg-[#f8fafc] dark:hover:bg-[#292d38] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] flex items-center justify-center overflow-hidden shrink-0">
                          <img alt="Laptop" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1MeRC9ivM9v_aYiDKZzf5hJAk7rDusfoJLwfFk1uH9yHBlB_b_8aC0idbqOoTIux7m3NiJhYlcVKl98_IhldjLUy7ihRQ0KXqZQe_h-XdjX-9OvWzNVva48_AS4byDfqnOdDt1SHgwfloHMRNfbqFZDdmWMuV-8QFVGb0lcHhAa7OdakDeOiuk9TZL1cp5qJ6RsWieiO73UbVvvWuAF_jRK_tzr3-XRhycfLNzhHyZ5j4JdFDKCx_dYBf8_EW-n3z6dQvbWxBRGw"/>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#0f172a] dark:text-white font-medium">MacBook Air M2</span>
                          <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Purchased: Aug 2023</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] dark:text-[#9ea5b7] font-mono text-xs">SCH-IT-2023-001</td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white">Electronics</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] dark:text-white">Room 304</span>
                        <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Ms. Vance (Teacher)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white font-medium text-right">$1,199.00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white p-1 rounded hover:bg-[#f1f5f9] dark:hover:bg-[#3d4252] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="group hover:bg-[#f8fafc] dark:hover:bg-[#292d38] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] flex items-center justify-center overflow-hidden shrink-0">
                          <span className="material-symbols-outlined text-[#64748b] dark:text-[#9ea5b7]">science</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#0f172a] dark:text-white font-medium">Bunsen Burner Set (x5)</span>
                          <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Purchased: Jan 2021</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] dark:text-[#9ea5b7] font-mono text-xs">SCI-LAB-044</td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white">Lab Equipment</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] dark:text-white">Chemistry Lab B</span>
                        <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Storage Cabinet 4</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Maintenance
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white font-medium text-right">$450.00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white p-1 rounded hover:bg-[#f1f5f9] dark:hover:bg-[#3d4252] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="group hover:bg-[#f8fafc] dark:hover:bg-[#292d38] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] flex items-center justify-center overflow-hidden shrink-0">
                          <span className="material-symbols-outlined text-[#64748b] dark:text-[#9ea5b7]">bed</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#0f172a] dark:text-white font-medium">Oak Bunk Bed Frame</span>
                          <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Purchased: Sep 2019</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] dark:text-[#9ea5b7] font-mono text-xs">BRD-DORM-102</td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white">Furniture</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] dark:text-white">East Wing Dorm</span>
                        <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Room 12B</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white font-medium text-right">$800.00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white p-1 rounded hover:bg-[#f1f5f9] dark:hover:bg-[#3d4252] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="group hover:bg-[#f8fafc] dark:hover:bg-[#292d38] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] flex items-center justify-center overflow-hidden shrink-0">
                          <img alt="Violin" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa22jLPeVTbluLLUny6YEQc46F56SwhOacgDLO6UbwNItRYy5bHkbturhNBNeblVnB_k90MB6WJCKO8Wez1JTolOCuPEzK-JeNJPydmKk4l1qEvsZo2Q7ySlB-U5xlh9p7oEJX8O3V7snKBMNkiTdUxhIgH_d4H9WHcsu1qqMtnnQdHhNdB9nFWN8lh3w7Cp0mXdGj5FTJ76TFSeNEAVwnhjoQ7ZXqCuWbIIOntk1HW3GNSvTU7a5rxw_wmWmFc8HhuHxU4IDiYnw"/>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#0f172a] dark:text-white font-medium">Violin (Student Model)</span>
                          <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Purchased: 2015</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] dark:text-[#9ea5b7] font-mono text-xs">MUS-STR-012</td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white">Musical Instruments</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] dark:text-white">Music Hall Storage</span>
                        <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Bin #3</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                        <span className="size-1.5 rounded-full bg-red-500 dark:bg-red-400"></span>
                        Retired
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white font-medium text-right">$350.00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white p-1 rounded hover:bg-[#f1f5f9] dark:hover:bg-[#3d4252] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="group hover:bg-[#f8fafc] dark:hover:bg-[#292d38] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] flex items-center justify-center overflow-hidden shrink-0">
                          <span className="material-symbols-outlined text-[#64748b] dark:text-[#9ea5b7]">print</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#0f172a] dark:text-white font-medium">3D Printer (Prusa MK3)</span>
                          <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Purchased: Nov 2022</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] dark:text-[#9ea5b7] font-mono text-xs">SCI-TEC-005</td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white">Lab Equipment</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] dark:text-white">Makerspace</span>
                        <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Workbench 1</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Maintenance
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white font-medium text-right">$1,500.00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white p-1 rounded hover:bg-[#f1f5f9] dark:hover:bg-[#3d4252] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 6 */}
                  <tr className="group hover:bg-[#f8fafc] dark:hover:bg-[#292d38] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-[#f1f5f9] dark:bg-[#292d38] border border-[#e2e8f0] dark:border-[#292d38] flex items-center justify-center overflow-hidden shrink-0">
                          <img alt="Smartboard" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWmPLZ2Sw5JUJpmY8X9ITrBSnJe7Qv-ObCA8CJgpKJRBLYrQ3tqmPpTSY_BVWS9LTOHkwqKti9NwN3XWGVr4Uaz8rcni_fke3rLuMYZ8d5_ZNAMMRs81Q5QolR5mZ7Lh7ykOS7tXSL1h19yEp2ryReB1wZNIXHfn-YUo-zbS2fbiG-70fIj1blyr5wszZQ4uAqOFGXM8cBaw4LaZfBuYTyZnqtnphxffivP0J-JxgUH4XZ8lJ2cKWN3-7E63pQCvuFUjziFX1G-4M"/>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[#0f172a] dark:text-white font-medium">Smartboard Pro 75"</span>
                          <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Purchased: Mar 2022</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] dark:text-[#9ea5b7] font-mono text-xs">SCH-IT-2022-089</td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white">Electronics</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] dark:text-white">Room 101</span>
                        <span className="text-[#64748b] dark:text-[#9ea5b7] text-xs">Main Wall</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] dark:text-white font-medium text-right">$3,200.00</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#64748b] dark:text-[#9ea5b7] hover:text-[#0f172a] dark:hover:text-white p-1 rounded hover:bg-[#f1f5f9] dark:hover:bg-[#3d4252] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#e2e8f0] dark:border-[#292d38] bg-[#f8fafc] dark:bg-[#1a1f2e] px-6 py-4">
              <p className="text-sm text-[#64748b] dark:text-[#9ea5b7]">
                Showing <span className="font-medium text-[#0f172a] dark:text-white">1</span> to <span className="font-medium text-[#0f172a] dark:text-white">6</span> of <span className="font-medium text-[#0f172a] dark:text-white">128</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#292d38] px-3 py-1.5 text-sm font-medium text-[#0f172a] dark:text-white hover:bg-[#f1f5f9] dark:hover:bg-[#323846] disabled:opacity-50 transition-colors">
                  Previous
                </button>
                <button className="rounded-lg border border-[#e2e8f0] dark:border-[#292d38] bg-white dark:bg-[#292d38] px-3 py-1.5 text-sm font-medium text-[#0f172a] dark:text-white hover:bg-[#f1f5f9] dark:hover:bg-[#323846] transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
