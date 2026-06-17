'use client';

import React from 'react';

export default function StaffPayrollPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] text-slate-900 dark:text-white font-display transition-colors duration-200">
      {/* Header */}
      <header className="h-16 shrink-0 bg-white dark:bg-[#1a1f2e] border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 flex items-center justify-between z-10 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-slate-500 hover:text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">My Employment & Payslips</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1f2e]"></span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm shadow-blue-200 dark:shadow-none transition-all">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="hidden sm:inline">Request Leave</span>
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-8 scroll-smooth">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Top Row: Contract & Leave Balances */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Employment Summary Card */}
            <div className="lg:col-span-4 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">badge</span>
                  Contract Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Position</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Senior Math Teacher</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Contract Type</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Full-Time (Permanent)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Department</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Mathematics</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Reports To</span>
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEdC4V28opTvjxhCoThZQGJUmnIpJ70eUSxhPqQ7S_WlaqznWkP1_59tRmcb7FS-IZu12rbIUV4IT_S7rhuvHjP9Z460b_4Kc1Mg7chQ21Dic6pRVSNryoNm7xe45kjTU_twU90PC3Hpgv5-Icz30P8hkIAqcRoMfgNIcJb_jbHU_jgwkERY_cTJ8dw2bQHIgKfBSH3OBDSUfL7Vmks_l8gRaSjI7gC2skleyQM6xhv6Mm4196KjjhiZ0ef1LC-kHW512ocOWl2QM')" }}></div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Sarah Jenkins</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Start Date: Sep 1, 2020</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">Active</span>
                </div>
              </div>
            </div>
            {/* Leave Balances */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Annual Leave */}
              <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-primary">flight_takeoff</span>
                </div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Annual Leave</h4>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">12</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">Days Remaining</div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="w-full flex justify-between text-[10px] text-slate-400 uppercase font-semibold">
                  <span>Used: 8</span>
                  <span>Total: 20</span>
                </div>
              </div>
              {/* Sick Leave */}
              <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-rose-500">medical_services</span>
                </div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Sick Leave</h4>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">5</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">Days Remaining</div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <div className="w-full flex justify-between text-[10px] text-slate-400 uppercase font-semibold">
                  <span>Used: 5</span>
                  <span>Total: 10</span>
                </div>
              </div>
              {/* Compassionate/Other */}
              <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px] text-indigo-500">favorite</span>
                </div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Compassionate</h4>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">3</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-4">Days Remaining</div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="w-full flex justify-between text-[10px] text-slate-400 uppercase font-semibold">
                  <span>Used: 2</span>
                  <span>Total: 5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Calendar & Quick Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-8 bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                  Schedule & Leave
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><span className="material-symbols-outlined">chevron_left</span></button>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">October 2023</span>
                  <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* Headers */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day: any) => (
                  <div key={day} className="bg-slate-50 dark:bg-slate-800 p-2 text-center text-xs font-semibold text-slate-500">{day}</div>
                ))}
                {/* Days Row 1 */}
                {[25, 26, 27, 28, 29, 30].map((date: any) => (
                  <div key={date} className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                    <span className="text-xs text-slate-400">{date}</span>
                  </div>
                ))}
                <div className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-900 dark:text-white font-medium">1</span>
                </div>
                {/* Days Row 2 (Example with data) */}
                <div className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-900 dark:text-white font-medium">2</span>
                  <div className="w-full p-1 bg-blue-50 dark:bg-blue-900/20 text-primary rounded text-[10px] font-medium leading-tight">Teaching 4 hrs</div>
                </div>
                <div className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-900 dark:text-white font-medium">3</span>
                  <div className="w-full p-1 bg-blue-50 dark:bg-blue-900/20 text-primary rounded text-[10px] font-medium leading-tight">Teaching 5 hrs</div>
                </div>
                <div className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-900 dark:text-white font-medium">4</span>
                  <div className="w-full p-1 bg-blue-50 dark:bg-blue-900/20 text-primary rounded text-[10px] font-medium leading-tight">Teaching 2 hrs</div>
                  <div className="w-full p-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded text-[10px] font-medium leading-tight">Staff Mtg</div>
                </div>
                <div className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1 relative">
                  <span className="text-xs text-white font-bold bg-primary rounded-full w-5 h-5 flex items-center justify-center">5</span>
                  <div className="w-full p-1 bg-blue-50 dark:bg-blue-900/20 text-primary rounded text-[10px] font-medium leading-tight">Teaching 6 hrs</div>
                </div>
                <div className="bg-white dark:bg-[#1a1f2e] min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-900 dark:text-white font-medium">6</span>
                  <div className="w-full p-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded text-[10px] font-medium leading-tight flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">flight_takeoff</span>
                    Leave
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-400 font-medium">7</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 min-h-[80px] p-1.5 flex flex-col items-start gap-1">
                  <span className="text-xs text-slate-400 font-medium">8</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2"><span className="size-3 rounded bg-blue-100 dark:bg-blue-900/50"></span> Teaching Block</div>
                <div className="flex items-center gap-2"><span className="size-3 rounded bg-amber-100 dark:bg-amber-900/50"></span> Approved Leave</div>
                <div className="flex items-center gap-2"><span className="size-3 rounded bg-indigo-100 dark:bg-indigo-900/50"></span> Other Events</div>
              </div>
            </div>

            {/* Quick Actions & Policies */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                {/* Decorative background circles */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
                <h3 className="text-base font-bold mb-4 relative z-10">Quick Actions</h3>
                <div className="flex flex-col gap-3 relative z-10">
                  <button className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-3 rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">account_balance</span>
                      <span className="text-sm font-medium">Update Tax Info</span>
                    </div>
                    <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                  </button>
                  <button className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-3 rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">receipt_long</span>
                      <span className="text-sm font-medium">Expense Claim</span>
                    </div>
                    <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                  </button>
                </div>
              </div>
              {/* Handbook Link */}
              <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-start">
                <div className="size-10 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined">menu_book</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Staff Handbook</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Review the latest policies on leave, conduct, and benefits.</p>
                <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                  View Handbook <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Payslips */}
          <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Payslip Archive
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-[16px]">visibility_off</span>
                  Hide Values
                </div>
                <select className="bg-transparent text-sm border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 focus:ring-primary focus:border-primary">
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4">Period</th>
                    <th className="px-6 py-4">Date Paid</th>
                    <th className="px-6 py-4">Gross Pay</th>
                    <th className="px-6 py-4">Net Pay</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">September 2023</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Sep 28, 2023</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">$5,416.67</td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-slate-200">$4,105.22</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="size-1.5 rounded-full bg-green-500"></span> Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full" title="Download PDF">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">August 2023</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Aug 28, 2023</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">$5,416.67</td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-slate-200">$4,105.22</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="size-1.5 rounded-full bg-green-500"></span> Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full" title="Download PDF">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">July 2023</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Jul 28, 2023</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">$5,416.67</td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-slate-200">$4,105.22</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <span className="size-1.5 rounded-full bg-green-500"></span> Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full" title="Download PDF">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <button className="text-sm text-primary font-medium hover:underline">View All History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
