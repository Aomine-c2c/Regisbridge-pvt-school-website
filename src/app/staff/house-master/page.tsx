'use client';

import React from 'react';

export default function HouseMasterDashboardPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f7f8] dark:bg-[#111621]">
      {/* Header */}
      <header className="w-full px-6 py-8 flex flex-wrap justify-between items-end gap-4 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">East Wing Dashboard</h2>
          <p className="text-slate-500 dark:text-[#9da6b8] text-base font-medium">Daily operational overview for June 14, 2024</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-[#3c4453] text-slate-700 dark:text-white bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#292e38] transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Change Date
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm font-medium shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">add</span>
            New Request
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {/* Key Metrics */}
        <section className="pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-[#3c4453] bg-white dark:bg-[#1a202c] shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#9da6b8] text-sm font-semibold uppercase tracking-wider">Students Present</p>
                <span className="bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-xl">person_check</span>
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mt-1">142<span className="text-slate-400 text-xl font-medium">/150</span></p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-[#3c4453] bg-white dark:bg-[#1a202c] shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#9da6b8] text-sm font-semibold uppercase tracking-wider">Pending Leaves</p>
                <span className="bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-xl">flight_takeoff</span>
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mt-1">8</p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-[#3c4453] bg-white dark:bg-[#1a202c] shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-16 h-16 bg-red-500/10 rounded-bl-full -mr-2 -mt-2"></div>
              <div className="flex justify-between items-start relative z-10">
                <p className="text-slate-500 dark:text-[#9da6b8] text-sm font-semibold uppercase tracking-wider">Medical Alerts</p>
                <span className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mt-1 relative z-10">3</p>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 border border-slate-200 dark:border-[#3c4453] bg-white dark:bg-[#1a202c] shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-slate-500 dark:text-[#9da6b8] text-sm font-semibold uppercase tracking-wider">Maintenance</p>
                <span className="bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-xl">build</span>
                </span>
              </div>
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mt-1">5</p>
            </div>
          </div>
        </section>

        {/* Dashboard Widgets */}
        <section className="flex-1">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
            {/* Main Column: Daily Roll Call */}
            <div className="xl:col-span-2 flex flex-col bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-[#3c4453] overflow-hidden shadow-sm h-[600px] xl:h-[700px]">
              <div className="p-5 border-b border-slate-200 dark:border-[#3c4453] flex justify-between items-center bg-slate-50 dark:bg-[#1a202c]">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">fact_check</span>
                  Daily Roll Call
                </h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                    </span>
                    <input
                      className="pl-10 pr-4 py-1.5 rounded-lg bg-white dark:bg-[#111318] border border-slate-300 dark:border-[#3c4453] text-sm focus:ring-primary focus:border-primary"
                      placeholder="Search student..."
                      type="text"
                    />
                  </div>
                  <button className="text-sm font-medium text-primary hover:text-primary/80 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors">Mark All Present</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-[#1a202c] text-slate-500 dark:text-[#9da6b8] sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 font-medium">Student</th>
                      <th className="px-6 py-3 font-medium">Room</th>
                      <th className="px-6 py-3 font-medium">Grade</th>
                      <th className="px-6 py-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#292e38]">
                    {/* Student Row 1 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#202634] transition-colors group">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGHHKUZM9d9Ca9uwBjex2IwXwxrgBFwBDZ3Acpk8x_vflFboTuNv78By1pQxCbxHa0NzRSYpXdUzt0cn4iHKaH35Ja_jqP0dJpdkovg8VLm-OWEZsRvHF0vP567g0miSayN5qgDvT8GoCEvD-q6meipSIMgeKjZ5ezFlMiTYg1ZWNPlr8zTkAB7D69FlKlhmH6wC1i141yVMqkvfk5OvvVfjyYL8LmfFWg4BgEB2ed9LwQoYyO4cNC3uY644O5DGJbEQKghMOMld4')" }}></div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Sarah Jenkins</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ID: 882910</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Room 204-A</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Grade 11</td>
                      <td className="px-6 py-3 text-right">
                        <label className="relative inline-flex items-center cursor-pointer float-right">
                          <input defaultChecked className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </td>
                    </tr>
                    {/* Student Row 2 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#202634] transition-colors group">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1SHitX0DmOoQr2z4_T66LYOQ7Yz9dxA6bgwjKkuaOsktXSiSHr8g7_MKPWO2DIToBsGFVVSvcDDEWyfAK6pnFtFcAcvrBU2zopyImqJL9dL58nLegKyval6IH3BFpvFaDeCqwzbHw4L_gowKWI_BxNjOB7K1RO4AE1F5dqPJgOobDCvNPm7M7AHtGnqfvRcLHQE_ZJuHO2-6Bc-6kTbsOM3Hh787Ap4mAotU8ZuzrxzYabznfRSGjxTB0T1P4rLZSz2urEsuXdqA')" }}></div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Marcus Chen</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ID: 882942</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Room 112-B</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Grade 10</td>
                      <td className="px-6 py-3 text-right">
                        <label className="relative inline-flex items-center cursor-pointer float-right">
                          <input defaultChecked className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </td>
                    </tr>
                    {/* Student Row 3 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#202634] transition-colors group">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZc1k-acsrWda4TScdq056PdkkZBf4rqpqdbswkh3rGYKFtQ-WpI0fc61oYXtmO0YE8o1OTyQpDIV1GSxpOpauWVqzSWNokg8AP4vPHjpU_UXzhMkaWxlT8zhUe330KN7YntCWTSU-6UiujWnW-Q2TsfiauBJSN3_VoEW5ljYJSdpEJfBhuWxKN8HxwbkvSUUT_jGhw7Tka-oupleLqNDAXxzGWcjPyL7LQFNgzI9t1YsEHas_URKhe05X_81ieVWCqnv8d5MXi8k')" }}></div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Eleanor Rigby</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ID: 882110</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Room 301-A</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Grade 12</td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs font-semibold text-amber-500 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">Late</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input defaultChecked className="sr-only peer" type="checkbox" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                      </td>
                    </tr>
                    {/* Student Row 4 */}
                    <tr className="bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group border-l-4 border-red-500">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWdwaS1qj3L94m3OqLhB9RrxbzD8RzrKhl3vjbfEnfE7HYe5olYBtCwXWOiE0cDQEjt8g5RFfnDPyvkF9KnsySmlbF53IJqY2I3YHEfe9NmgW3uw7fObx7Pf5BaOI2v1ny3-BsgqKOBtN6cCTNDCOQX2LV6uf_R7Pnb5Pv_0WrXOqQvzzCNZzIzj1a8ZN4cch6GlfskAjnmCNpOCIGRviQiHClrwH3ySo5L06fSnoUHap5jBtttnkBKV5IwyNoUVXuG62ePLBuumw')" }}></div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Alexander Hamilton</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ID: 882004</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Room 101-C</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Grade 11</td>
                      <td className="px-6 py-3 text-right">
                        <label className="relative inline-flex items-center cursor-pointer float-right">
                          <input className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </td>
                    </tr>
                    {/* Student Row 5 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-[#202634] transition-colors group">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUWZoBU09N6zZNcJ7orJPpZiQQOwNrc7zJX78aRJHCN0Z8MqfmHMSh8GvVKkcZE73mKhIiaa0SaQKuebbZRF1P5bQe_foaOClSKSzCNqpRuQcDKO39eUBkFIZ6ShXIyXiXvnbKX5rN4KaeQsdmG3NB42ic94jgvGRGQOCIzS83YfWpBwCXvHeIVNYdTDJUzRzZS5ODFGhdQrr8BsvrTBObyIVddG9TFX9sDzTd4MmNwloTDY8_GnonBRoMfM9p6O67BX6hLBZ1ys0')" }}></div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">Priya Patel</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ID: 882331</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Room 205-B</td>
                      <td className="px-6 py-3 text-slate-600 dark:text-slate-300">Grade 10</td>
                      <td className="px-6 py-3 text-right">
                        <label className="relative inline-flex items-center cursor-pointer float-right">
                          <input defaultChecked className="sr-only peer" type="checkbox" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-[#3c4453] bg-slate-50 dark:bg-[#1a202c]">
                <button className="w-full text-center text-primary text-sm font-semibold hover:underline">View All Students</button>
              </div>
            </div>

            {/* Right Column: Sidebar Widgets */}
            <div className="flex flex-col gap-6">
              {/* Medical Alerts Widget */}
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-red-200 dark:border-red-900/30 overflow-hidden shadow-sm">
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/30 flex justify-between items-center">
                  <h3 className="text-base font-bold text-red-800 dark:text-red-400 flex items-center gap-2">
                    <span className="material-symbols-outlined">medical_services</span>
                    Priority Alerts
                  </h3>
                  <span className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-[#292e38]">
                  <div className="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#202634] transition-colors cursor-pointer">
                    <div className="size-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9llAU1o-muTSW9b7XaigY4YepkRP8easSGHHhO5qNmMBjeLfzYIMzGZkSRUIXK9g5Ks6Nkj3M0XUqPt7tuco7FclvHbLBIBegFQf_ejpAjcf8TapKkXP_J-HkJXleq2sIjdmNCdvhFKDk238aXvrnJItstJEIolyCqJ74UAPKkCJQGPCSmKFFXmLLu6xBGadGrFeMd6VeVdeSVxOLiFJiSod5AZv_wYQf5HKz1uuZPYcILm4kQqP828RcuKsnir-0TGnFt9QoXIc')" }}></div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">James Wilson</p>
                        <span className="text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-1.5 py-0.5 rounded">URGENT</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reported severe migraine. In infirmary.</p>
                    </div>
                  </div>
                  <div className="p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#202634] transition-colors cursor-pointer">
                    <div className="size-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDljrTzWsS6-DMYV6nJBeV0wjBPQugqYc7C1ivaM_Bg9nn8m6TmwJs_Fe1GdG1b5pFFdG3-bCPAvZhRKcuYZ4LjoN67PgX7DFElGD2YSEPEHi-A_-LC06TBugatb2aPi0S8jBwAgIxKPwxokrCw6K7msXQnd_qnH9N02L4xZ48olruUSov7y5AcIJC1DARL2dcY_UxStWSE2z7M1sGMHjOgQBPMH20WYWYwLsdOriCEPV9Xcl8pA1E5SVzD7ZwKk8r9PqgMujrdn6M')" }}></div>
                    <div className="flex flex-col flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">David Kim</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Scheduled medication: 2:00 PM (Insulin)</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Leave Approvals Widget */}
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-[#3c4453] overflow-hidden shadow-sm flex flex-col flex-1">
                <div className="p-4 border-b border-slate-200 dark:border-[#3c4453] flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">assignment_turned_in</span>
                    Leave Requests
                  </h3>
                  <button className="text-xs text-primary font-medium hover:underline">View All (8)</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-[#292e38] flex-1">
                  {/* Request 1 */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="size-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2saRR0ttmztx7Cjf4yRVAg2WeT35OE4j2QjzfBtJ3Ym-pNLU1O4npn0Hce9UPM838TsNZ_TMIPXzlYbpEQsMfjhovjQ8B3l1kJZsqTXZq-WI1oLya27WV3gQhbC7m5Q6DM87XBE4X6Px8krbVfK-Gomjng0KQFcnPhGFiG9oDNPv_7vBq8-QvFbzntpdZZbUcAEN8qx_b8As14E1ADbw8KgNyPOP70rcnEcFmKzzgbG_J0Fe_p5HoCNeWeHtBbpoXTV7FdxslsrA')" }}></div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Emily Blunt</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Weekend Pass • Family Visit</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Fri 4PM - Sun 6PM</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <button className="flex-1 bg-primary text-white text-xs font-semibold py-2 rounded hover:bg-primary/90 transition-colors">Approve</button>
                      <button className="flex-1 bg-slate-100 dark:bg-[#292e38] text-slate-600 dark:text-slate-300 text-xs font-semibold py-2 rounded hover:bg-slate-200 dark:hover:bg-[#3c4453] transition-colors">Deny</button>
                    </div>
                  </div>
                  {/* Request 2 */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="size-10 rounded-full bg-cover bg-center flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIIMHZ-IbS3Um1Jpd6hRD1tbDJ5K7IA7XEQxoE1Slc4cVbruJAtQizio5P2kZgLDXRcRIiw2itQDbnSLwShQN78rLJnMpmBrFiZ4KUVtFQdrmx3m0XHmh2KOghpHLSR9owrh2aNHPGxohbo6pKEIu8foRnhpRrhxrSqYoKn-9tFkU1qh_z9Uiahhy8ClctYFYvVikyz4mdSwS-W1Dfh4ayA537SzAfdVOHUSgNrv8PP0Y2BvnUOxVONFuWt3XIShMKJBtYU8SyH7E')" }}></div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Raj Malhotra</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Medical Appointment</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Today 2PM - 5PM</p>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <button className="flex-1 bg-primary text-white text-xs font-semibold py-2 rounded hover:bg-primary/90 transition-colors">Approve</button>
                      <button className="flex-1 bg-slate-100 dark:bg-[#292e38] text-slate-600 dark:text-slate-300 text-xs font-semibold py-2 rounded hover:bg-slate-200 dark:hover:bg-[#3c4453] transition-colors">Deny</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active Maintenance */}
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-slate-200 dark:border-[#3c4453] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-[#3c4453] flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">handyman</span>
                    Maintenance
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-[#292e38]">
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg p-2">
                        <span className="material-symbols-outlined text-lg">water_drop</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Leaking Faucet</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Room 102 • Bathroom</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">Pending</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg p-2">
                        <span className="material-symbols-outlined text-lg">lightbulb</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Bulb Replacement</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Hallway 2F</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Assigned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
