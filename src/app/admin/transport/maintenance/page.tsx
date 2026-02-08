'use client';

import React from 'react';

export default function FleetMaintenancePage() {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-surface-light dark:bg-[#1c242f] border-b border-[#dbe0e6] dark:border-[#283039] sticky top-0 z-10">
        <div className="px-6 py-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-[#617589] dark:text-[#9dabb9]">
            <a className="hover:text-primary" href="#">
              Home
            </a>
            <span>/</span>
            <a className="hover:text-primary" href="#">
              Transport
            </a>
            <span>/</span>
            <span className="text-[#111418] dark:text-white font-medium">Maintenance</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111418] dark:text-white tracking-tight">
                Fleet Maintenance &amp; Compliance
              </h2>
              <p className="text-[#617589] dark:text-[#9dabb9] text-sm mt-1">
                Monitor vehicle health, insurance status, and operational costs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-[#283039] border border-[#dbe0e6] dark:border-[#3b4754] rounded-lg text-sm font-semibold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-[#323b46] transition-colors">
                <span className="material-symbols-outlined text-base">file_download</span>
                Export Report
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
                <span className="material-symbols-outlined text-base">add</span>
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="px-6 flex gap-6 overflow-x-auto border-t border-[#dbe0e6] dark:border-[#283039] mt-2">
          <button className="py-3 text-sm font-bold text-primary border-b-2 border-primary whitespace-nowrap">
            Dashboard Overview
          </button>
          <button className="py-3 text-sm font-medium text-[#617589] dark:text-[#9dabb9] hover:text-[#111418] dark:hover:text-white border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors whitespace-nowrap">
            Fleet Registry
          </button>
          <button className="py-3 text-sm font-medium text-[#617589] dark:text-[#9dabb9] hover:text-[#111418] dark:hover:text-white border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors whitespace-nowrap">
            Maintenance History
          </button>
          <button className="py-3 text-sm font-medium text-[#617589] dark:text-[#9dabb9] hover:text-[#111418] dark:hover:text-white border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors whitespace-nowrap">
            Fuel &amp; Expenses
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
          {/* Alert Banner */}
          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400">
                  warning
                </span>
              </div>
              <div>
                <h3 className="text-red-900 dark:text-red-200 font-bold text-sm">
                  Critical Compliance Warning
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm mt-0.5">
                  Vehicle #402 (Ford Transit) and Vehicle #110 (Blue Bird) have overdue inspections.
                  Immediate action required to maintain active status.
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors w-full sm:w-auto text-center">
              Schedule Inspection
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-surface-light dark:bg-[#1c242f] p-5 rounded-xl border border-[#dbe0e6] dark:border-[#283039] shadow-sm flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#617589] dark:text-[#9dabb9] text-sm font-medium">
                  Total Fleet Size
                </p>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-md text-xl">
                  directions_bus
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#111418] dark:text-white tracking-tight">
                  42
                </p>
                <div className="flex items-center gap-1 mt-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span>+2 Vehicles vs last year</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-light dark:bg-[#1c242f] p-5 rounded-xl border border-[#dbe0e6] dark:border-[#283039] shadow-sm flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#617589] dark:text-[#9dabb9] text-sm font-medium">
                  Service Due (7 Days)
                </p>
                <span className="material-symbols-outlined text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-1.5 rounded-md text-xl">
                  build
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#111418] dark:text-white tracking-tight">
                  3
                </p>
                <div className="flex items-center gap-1 mt-1 text-amber-600 dark:text-amber-400 text-xs font-bold">
                  <span>Pending Maintenance</span>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-light dark:bg-[#1c242f] p-5 rounded-xl border border-[#dbe0e6] dark:border-[#283039] shadow-sm flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#617589] dark:text-[#9dabb9] text-sm font-medium">
                  Insurance Alerts
                </p>
                <span className="material-symbols-outlined text-red-500 bg-red-50 dark:bg-red-900/30 p-1.5 rounded-md text-xl">
                  policy
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#111418] dark:text-white tracking-tight">
                  2
                </p>
                <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400 text-xs font-bold">
                  <span>Expiring within 30 days</span>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-surface-light dark:bg-[#1c242f] p-5 rounded-xl border border-[#dbe0e6] dark:border-[#283039] shadow-sm flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#617589] dark:text-[#9dabb9] text-sm font-medium">
                  Monthly Fuel Spend
                </p>
                <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-900/30 p-1.5 rounded-md text-xl">
                  local_gas_station
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-[#111418] dark:text-white tracking-tight">
                  $12,450
                </p>
                <div className="flex items-center gap-1 mt-1 text-[#617589] dark:text-[#9dabb9] text-xs font-medium">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">+5%</span> vs
                  last month
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Data Table (Wider Column) */}
            <div className="xl:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white">Fleet Registry</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#617589] dark:text-[#9dabb9] text-lg">
                      search
                    </span>
                    <input
                      className="pl-9 pr-4 py-1.5 text-sm bg-white dark:bg-[#1c242f] border border-[#dbe0e6] dark:border-[#3b4754] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-[#111418] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 w-48 lg:w-64"
                      placeholder="Search vehicle..."
                      type="text"
                    />
                  </div>
                  <button className="p-1.5 bg-white dark:bg-[#1c242f] border border-[#dbe0e6] dark:border-[#3b4754] rounded-lg text-[#617589] dark:text-[#9dabb9] hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">filter_list</span>
                  </button>
                </div>
              </div>
              <div className="bg-surface-light dark:bg-[#1c242f] border border-[#dbe0e6] dark:border-[#283039] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-[#202a36] text-[#617589] dark:text-[#9dabb9] font-semibold border-b border-[#dbe0e6] dark:border-[#283039]">
                      <tr>
                        <th className="px-5 py-4 w-16">ID</th>
                        <th className="px-5 py-4">Vehicle Info</th>
                        <th className="px-5 py-4">Assigned Driver</th>
                        <th className="px-5 py-4">Next Service</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#283039]">
                      {/* Row 1 */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-[#242d38] transition-colors group">
                        <td className="px-5 py-4 font-mono text-xs text-[#617589] dark:text-[#9dabb9]">
                          #402
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                              data-alt="White Ford Transit Van"
                              style={{
                                backgroundImage:
                                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCD0Q1EYABp6b_aUBbzPmD3dzY78A9Vg9Dytr_yyMfUhUMTOnrv_liN_dw-yV0voXrnIOnCj65DTpZQoY0vl38E7JcLbosjEdBxDOB8fLjyyNslZJLbsGjqqmf0eh_oWGMKjB4CsKiDCOy_TRVZHQOo57gdC8ek4IlvVW84QT6QI3maJZ4cW_Y9UZA3libEjrYyh4GSven37-k56hIvlgSOjmKe6biM9gtFGWcJYGgkC1Nd5drqfbInkfPjTLHaIr60bkQdG8Y9iSk')",
                              }}
                            ></div>
                            <div>
                              <p className="font-bold text-[#111418] dark:text-white">
                                Ford Transit 350
                              </p>
                              <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                                Reg: GWA-4482 • 2021
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                              JD
                            </div>
                            <span className="text-[#111418] dark:text-white">John Doe</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-red-600 dark:text-red-400 font-bold">
                            Overdue (2 days)
                          </span>
                          <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                            Odo: 45,200 km
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                            Action Required
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-primary hover:text-blue-700 dark:hover:text-blue-400 font-semibold text-sm">
                            Manage
                          </button>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-[#242d38] transition-colors group">
                        <td className="px-5 py-4 font-mono text-xs text-[#617589] dark:text-[#9dabb9]">
                          #110
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                              data-alt="Yellow School Bus"
                              style={{
                                backgroundImage:
                                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjgFKnRjOp_wSwnAy7qBJ8w-F5lmKrajUbW5J_7QuR-4Y6wxMmqlDBEkMDC57aAdyAeAvT6vMPzpUzo0CEMPjSFvsT_JQxJEZ7WapXrGMhumr_lsMlyxOQHzgcaG4PThcUyueQHmIbGkJ9NPnnxSdmdF_r524-WFGbqiTlHayaGvZutxwu0cmbhtbimo34ggb3IIgexr0yauuhIl4CzxI8s82K4UY_h-wFsquuqD5YtD7eKgH1GGfq7XKIGTNlo2p1x1yEstRPv8Q')",
                              }}
                            ></div>
                            <div>
                              <p className="font-bold text-[#111418] dark:text-white">
                                Blue Bird Vision
                              </p>
                              <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                                Reg: BUS-0092 • 2019
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                              MR
                            </div>
                            <span className="text-[#111418] dark:text-white">Mike Ross</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">
                            Oct 24, 2023
                          </span>
                          <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                            Due in 5 days
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                            Maintenance
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-primary hover:text-blue-700 dark:hover:text-blue-400 font-semibold text-sm">
                            Manage
                          </button>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="hover:bg-gray-50 dark:hover:bg-[#242d38] transition-colors group">
                        <td className="px-5 py-4 font-mono text-xs text-[#617589] dark:text-[#9dabb9]">
                          #205
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 bg-cover bg-center"
                              data-alt="Silver Sedan"
                              style={{
                                backgroundImage:
                                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHy621QpBSCTboc-qE7J9CqNwPjOFjsyUt-hIYPzooW49VHKn2yietOWoW0idon1IVWxAR0wL23lw7ZkF8c433JEzKfgqYMS9K8vxplEGmeJWKQcMvBhHyPg8rC7rZPJg4OdjatpB4OAVgW4gnhJOPULhOrMhQ1e1Noa3J1qbgKLX1P1VoWNeLrf1o_kLLLFsNjfewYRFfHaGA6vmCTkQmftY-vOKVTqmo8Y_8PvdEpyfWrOwXZhVPAZpIfK-H4AVQSo6zMGGrNt8')",
                              }}
                            ></div>
                            <div>
                              <p className="font-bold text-[#111418] dark:text-white">
                                Toyota Camry
                              </p>
                              <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                                Reg: ADM-1123 • 2022
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
                              AS
                            </div>
                            <span className="text-[#111418] dark:text-white">Alice Smith</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-[#111418] dark:text-white font-medium">
                            Nov 15, 2023
                          </span>
                          <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                            Odo: 12,100 km
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                            Active
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-primary hover:text-blue-700 dark:hover:text-blue-400 font-semibold text-sm">
                            Manage
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-5 py-3 border-t border-[#dbe0e6] dark:border-[#283039] flex items-center justify-between bg-gray-50 dark:bg-[#1c242f]">
                  <span className="text-xs text-[#617589] dark:text-[#9dabb9]">
                    Showing 3 of 42 vehicles
                  </span>
                  <div className="flex gap-1">
                    <button className="h-8 w-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-[#3b4754] bg-white dark:bg-[#1c242f] text-[#617589] hover:bg-gray-50 dark:hover:bg-[#283039]">
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center rounded border border-[#dbe0e6] dark:border-[#3b4754] bg-white dark:bg-[#1c242f] text-[#617589] hover:bg-gray-50 dark:hover:bg-[#283039]">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Calendar & Tools (Narrower Column) */}
            <div className="xl:col-span-1 flex flex-col gap-6">
              {/* Compliance Calendar Widget */}
              <div className="bg-surface-light dark:bg-[#1c242f] border border-[#dbe0e6] dark:border-[#283039] rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#111418] dark:text-white">Compliance Calendar</h3>
                  <div className="flex items-center text-sm font-semibold text-primary cursor-pointer hover:underline">
                    Oct 2023
                    <span className="material-symbols-outlined text-base">arrow_drop_down</span>
                  </div>
                </div>
                {/* Visual Mini Calendar Row */}
                <div className="grid grid-cols-7 gap-1 text-center mb-4">
                  <div className="text-[10px] font-bold text-[#617589] uppercase">M</div>
                  <div className="text-[10px] font-bold text-[#617589] uppercase">T</div>
                  <div className="text-[10px] font-bold text-[#617589] uppercase">W</div>
                  <div className="text-[10px] font-bold text-[#617589] uppercase">T</div>
                  <div className="text-[10px] font-bold text-[#617589] uppercase">F</div>
                  <div className="text-[10px] font-bold text-[#617589] uppercase">S</div>
                  <div className="text-[10px] font-bold text-[#617589] uppercase">S</div>
                  {/* Days */}
                  <div className="h-8 flex items-center justify-center text-xs text-gray-400">
                    16
                  </div>
                  <div className="h-8 flex items-center justify-center text-xs text-gray-400">
                    17
                  </div>
                  <div className="h-8 flex items-center justify-center text-xs text-[#111418] dark:text-white relative font-bold bg-primary/10 rounded-full text-primary">
                    18
                    <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full"></span>
                  </div>
                  <div className="h-8 flex items-center justify-center text-xs text-[#111418] dark:text-white">
                    19
                  </div>
                  <div className="h-8 flex items-center justify-center text-xs text-[#111418] dark:text-white relative">
                    20
                    <span className="absolute bottom-1 w-1 h-1 bg-red-500 rounded-full"></span>
                  </div>
                  <div className="h-8 flex items-center justify-center text-xs text-[#111418] dark:text-white">
                    21
                  </div>
                  <div className="h-8 flex items-center justify-center text-xs text-[#111418] dark:text-white">
                    22
                  </div>
                </div>
                {/* Upcoming Events List */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-[#617589] uppercase tracking-wide">
                    Upcoming Events
                  </h4>
                  <div className="flex gap-3 items-start p-3 rounded-lg border border-[#dbe0e6] dark:border-[#283039] bg-gray-50 dark:bg-[#202a36]">
                    <div className="bg-white dark:bg-[#283039] border border-[#dbe0e6] dark:border-[#3b4754] rounded flex flex-col items-center justify-center h-10 w-10 shrink-0">
                      <span className="text-[10px] font-bold text-red-600 uppercase">Oct</span>
                      <span className="text-sm font-bold text-[#111418] dark:text-white">20</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111418] dark:text-white">
                        Insurance Renewal
                      </p>
                      <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                        Fleet Policy #99238 • High Priority
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 rounded-lg border border-[#dbe0e6] dark:border-[#283039] bg-white dark:bg-[#1c242f]">
                    <div className="bg-white dark:bg-[#283039] border border-[#dbe0e6] dark:border-[#3b4754] rounded flex flex-col items-center justify-center h-10 w-10 shrink-0">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Oct</span>
                      <span className="text-sm font-bold text-[#111418] dark:text-white">24</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111418] dark:text-white">
                        Inspection: Bus #110
                      </p>
                      <p className="text-xs text-[#617589] dark:text-[#9dabb9]">
                        Scheduled with City Garage
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  View Full Calendar
                </button>
              </div>

              {/* Fuel & Expenses Quick Log */}
              <div className="bg-primary text-white rounded-xl p-5 shadow-lg relative overflow-hidden">
                {/* Decorative bg circle */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined">receipt_long</span>
                    <h3 className="font-bold text-lg">Quick Expense Log</h3>
                  </div>
                  <p className="text-blue-100 text-sm mb-4">
                    Instantly log fuel receipts or minor repairs to keep audit trails up to date.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button className="w-full bg-white text-primary font-bold text-sm py-2.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">local_gas_station</span>
                      Log Fuel
                    </button>
                    <button className="w-full bg-blue-600 text-white border border-blue-500 font-bold text-sm py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-sm">build</span>
                      Log Repair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
