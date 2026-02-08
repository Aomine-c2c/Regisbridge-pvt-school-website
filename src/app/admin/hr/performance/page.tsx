'use client';

import React from 'react';

export default function PerformanceTrackingPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f8f7] dark:bg-[#102219] text-[#111814] dark:text-gray-100 font-display transition-colors duration-200">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#182e22] border-b border-[#f0f4f2] dark:border-gray-800 flex-shrink-0 z-10 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-1 text-gray-500 hover:text-gray-700">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h2 className="text-lg font-bold tracking-tight text-[#111814] dark:text-white hidden sm:block">Staff Performance & Development</h2>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative group hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#618975]">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input className="block w-64 p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-[#f0f4f2] dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-[#13ec80] focus:border-[#13ec80] transition-all" placeholder="Search staff, certs..." type="text"/>
          </div>
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
          </button>
          <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-6 h-8">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[#111814] dark:text-white">Eleanor Rigby</p>
              <p className="text-xs text-[#618975] dark:text-gray-400">Head of HR</p>
            </div>
            <div className="size-9 rounded-full bg-cover bg-center border border-gray-200 dark:border-gray-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWv2M0paUHZq4rMd6M94tvsbkU1820f3cn6g98TTWv_dRqXWXMeuEwybS1QFQU7RFAXaAIFL3eAyI_tUVj9KZESH6K6ybFipEJpWkCIKkeih-88cKQBAhi0_zI2w66PvcClr7c_Y8eoAd_1PW0HBb2KwzhHe4MHx22gmTTt5jNQScMGDqKzSXkT5VmfiTMmG199-TPaDobTyW6UbUQpMoFf4iGLvwdBCAFvokC2q_iKR1OqoiusGTpoo90v2mlrk4INFLTJR5wbdY')" }}></div>
          </div>
        </div>
      </header>

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-[#618975]">
            <a className="hover:text-[#13ec80] transition-colors" href="#">Home</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a className="hover:text-[#13ec80] transition-colors" href="#">HR</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-medium text-[#111814] dark:text-white">Performance</span>
          </div>

          {/* Action Required Banner */}
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">Action Required: Expiring Qualifications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">3 Staff members have Safeguarding training expiring in <span className="font-bold text-red-600">less than 30 days</span>.</p>
              </div>
            </div>
            <button className="whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              View Details
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-white dark:bg-[#182e22] rounded-xl p-5 border border-[#dbe6e0] dark:border-gray-700 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#f0f4f2] dark:bg-gray-800 rounded-lg text-[#111814] dark:text-white group-hover:bg-[#13ec80] group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">assignment</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">+2 this week</span>
              </div>
              <p className="text-sm font-medium text-[#618975] dark:text-gray-400">Pending Appraisals</p>
              <h3 className="text-3xl font-bold text-[#111814] dark:text-white mt-1">12</h3>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-white dark:bg-[#182e22] rounded-xl p-5 border border-[#dbe6e0] dark:border-gray-700 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#f0f4f2] dark:bg-gray-800 rounded-lg text-[#111814] dark:text-white group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded-full">Urgent</span>
              </div>
              <p className="text-sm font-medium text-[#618975] dark:text-gray-400">Expiring Certifications</p>
              <h3 className="text-3xl font-bold text-[#111814] dark:text-white mt-1">3</h3>
            </div>
            {/* Stat Card 3 */}
            <div className="bg-white dark:bg-[#182e22] rounded-xl p-5 border border-[#dbe6e0] dark:border-gray-700 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#f0f4f2] dark:bg-gray-800 rounded-lg text-[#111814] dark:text-white group-hover:bg-[#13ec80] group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">+0.1 vs last year</span>
              </div>
              <p className="text-sm font-medium text-[#618975] dark:text-gray-400">Avg. Performance Score</p>
              <h3 className="text-3xl font-bold text-[#111814] dark:text-white mt-1">4.2</h3>
            </div>
            {/* Stat Card 4 */}
            <div className="bg-white dark:bg-[#182e22] rounded-xl p-5 border border-[#dbe6e0] dark:border-gray-700 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-[#f0f4f2] dark:bg-gray-800 rounded-lg text-[#111814] dark:text-white group-hover:bg-blue-400 group-hover:text-black transition-colors">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">+150 this term</span>
              </div>
              <p className="text-sm font-medium text-[#618975] dark:text-gray-400">Total PD Credits</p>
              <h3 className="text-3xl font-bold text-[#111814] dark:text-white mt-1">1,250</h3>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Left: Data Table */}
            <div className="flex-1 bg-white dark:bg-[#182e22] rounded-xl border border-[#dbe6e0] dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
              {/* Table Toolbar */}
              <div className="px-6 py-4 border-b border-[#f0f4f2] dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center">
                <h3 className="font-bold text-lg text-[#111814] dark:text-white">Staff Overview</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <span className="material-symbols-outlined text-[20px]">filter_list</span>
                      Filter
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 bg-[#13ec80] hover:bg-[#0eb562] text-black rounded-lg text-sm font-bold shadow-sm transition-all transform active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Log Training
                  </button>
                </div>
              </div>
              {/* Table */}
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#f9fafb] dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400">Staff Member</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400">Role & Dept</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 text-center">Safeguarding</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 text-center">First Aid</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 text-center">Last Appraisal</th>
                      <th className="px-6 py-4 font-semibold text-gray-500 dark:text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAiEgsSUOSo6KqhDL17labEo7MRrIRESYFc_MRWS5jS5_qRKC2IO9uR6n0zTXxJ5DN_XTLPC2cNtPsRkW6wTqXxic39CxIz7Fo229daR26P4OJHRn77q6OYqiBdffbgRdgNABl_iKylLT24UuaQa-mqOwWBqI0I4EmhLy93kQOkvlIxoTuYS5sOttLpKVdlbeZOhNUbdu5AQuxIvnwdC4TMo5qhzVhQlhzCBpYKXY7Dw2GGsdl0hw4Zacc56CWRgtJ-98RTwC3VFm0')" }}></div>
                          <div>
                            <p className="font-semibold text-[#111814] dark:text-white">John Smith</p>
                            <p className="text-xs text-gray-500">ID: #STF-001</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[#111814] dark:text-gray-200">Senior Teacher</p>
                        <p className="text-xs text-[#618975] dark:text-gray-400">Science Dept.</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                          <span className="size-1.5 rounded-full bg-red-600"></span>
                          Exp: 2 Days
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          <span className="size-1.5 rounded-full bg-green-600"></span>
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-base font-bold text-[#111814] dark:text-white">4.8</span>
                          <span className="material-symbols-outlined text-yellow-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                        <p className="text-[10px] text-gray-400">Oct 12, 2023</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-[#13ec80] transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlsZ6IAevsI0wYTEw1QajdcLvx39m838lqKk0xL4tLyyW04A2Ijoh5V2O3kK2OohVxbwHO7LWnfNtu6OM5bAmp1R9mlA-w78RhMJuJ2wzbZS1Q1PwItbPyuhnfNW1YqfsJ1-Sac4fvgZWTxG81S4HMyT_JNX8fM5d04Txw_B4kWXFS1E8DlOA11W2rVcVuqMSaGHTBDZjft0SEhAlZ1dQIfsteABRKl22CSmr8fdMSzhyk8DWyMBMYc7Syq6qmF9QudFK4oTry7SI')" }}></div>
                          <div>
                            <p className="font-semibold text-[#111814] dark:text-white">Sarah Lee</p>
                            <p className="text-xs text-gray-500">ID: #STF-023</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[#111814] dark:text-gray-200">Head of Arts</p>
                        <p className="text-xs text-[#618975] dark:text-gray-400">Arts Dept.</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          <span className="size-1.5 rounded-full bg-green-600"></span>
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">
                          <span className="size-1.5 rounded-full bg-yellow-500"></span>
                          Exp: 20 Days
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-base font-bold text-[#111814] dark:text-white">4.5</span>
                          <span className="material-symbols-outlined text-yellow-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                        <p className="text-[10px] text-gray-400">Sep 01, 2023</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-[#13ec80] transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcy6pCZ4C5Ga0bhO3dxJjTTVeu5VpNF6WM23AJZavE6NgLufYbZhQ64sAu-MM7qlU7lAnq-Dm3BcMH496AoBbdL94OoRxnnxoyWg-_gvIvTqUWoYYYv7uXgZeHreKIeYzlBaGz7fxEIdgLspjZOBhdE1Zu_-8iG1_ZeI0vyonMiOyW-YC77CdPNXg1nRyztL7Mmatnscsk_F7ArCuvV07GN1RhX2obb9JsvdE6WiKKmifKhTP3gqH_Hl0tTFBom5eogMTTOp3-zVc')" }}></div>
                          <div>
                            <p className="font-semibold text-[#111814] dark:text-white">Michael Chen</p>
                            <p className="text-xs text-gray-500">ID: #STF-089</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[#111814] dark:text-gray-200">Math Teacher</p>
                        <p className="text-xs text-[#618975] dark:text-gray-400">Mathematics</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          <span className="size-1.5 rounded-full bg-green-600"></span>
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          <span className="size-1.5 rounded-full bg-green-600"></span>
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-base font-bold text-[#111814] dark:text-white">3.9</span>
                          <span className="material-symbols-outlined text-yellow-400 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                        </div>
                        <p className="text-[10px] text-gray-400">Nov 15, 2023</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-[#13ec80] transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center bg-gray-100" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLuz5W1vcq3fQpmF79F_CYnnkfga2mbP1zK47sq15nPvgnjlipw2emag7-6v-gUyc5RLJwZSi02z5zgpjfsUiJ38lsbwoLlJQff2BxBskJqEyvMpFQNBFHTPSCHCIC6JUtfWqSpfvYxSif4rfTlINaMusgOzHit7UZKwTMiNQmb6VLXgeA_vMRHB5pOvbCS0kgp-nI8-G9Wm38PB5fqPwsQ6rE7wjrPqYxKsRwdSeb5onAz1w476hhOtkXIIHB-vRPseRWcsc41WY')" }}></div>
                          <div>
                            <p className="font-semibold text-[#111814] dark:text-white">David Kim</p>
                            <p className="text-xs text-gray-500">ID: #STF-112</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[#111814] dark:text-gray-200">Sports Coach</p>
                        <p className="text-xs text-[#618975] dark:text-gray-400">Athletics</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                          <span className="size-1.5 rounded-full bg-red-600"></span>
                          Exp: 5 Days
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                          <span className="size-1.5 rounded-full bg-green-600"></span>
                          Valid
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs text-gray-500">Pending</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-gray-400 hover:text-[#13ec80] transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="px-6 py-4 border-t border-[#f0f4f2] dark:border-gray-700 flex justify-between items-center">
                <span className="text-sm text-gray-500">Showing 1 to 4 of 48 entries</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Prev</button>
                  <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
                </div>
              </div>
            </div>

            {/* Right: Widgets */}
            <div className="w-full xl:w-[360px] flex flex-col gap-6 shrink-0">
              {/* Appraisal Builder Widget */}
              <div className="bg-white dark:bg-[#182e22] rounded-xl p-6 border border-[#dbe6e0] dark:border-gray-700 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#111814] dark:text-white">Appraisals</h3>
                  <button className="text-sm text-[#13ec80] font-medium hover:underline">View All</button>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 mb-6 rounded-lg bg-[#111814] text-white hover:bg-black transition-all shadow-md">
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>New Appraisal</span>
                </button>
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Recent Drafts</p>
                  <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f4f2] dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <span className="material-symbols-outlined">edit_document</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[#111814] dark:text-white truncate">Mid-Year Review: Math Dept</p>
                      <p className="text-xs text-gray-500">Edited 2 hours ago</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">arrow_forward</span>
                  </div>
                  <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-[#f0f4f2] dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <span className="material-symbols-outlined">edit_document</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[#111814] dark:text-white truncate">Probation Review: New Hires</p>
                      <p className="text-xs text-gray-500">Edited yesterday</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">arrow_forward</span>
                  </div>
                </div>
              </div>

              {/* PD Leaderboard / Progress */}
              <div className="bg-white dark:bg-[#182e22] rounded-xl p-6 border border-[#dbe6e0] dark:border-gray-700 shadow-sm flex-1">
                <h3 className="font-bold text-[#111814] dark:text-white mb-1">PD Progress</h3>
                <p className="text-sm text-gray-500 mb-6">Staff professional development credits.</p>
                <div className="space-y-6">
                  {/* Item 1 */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-medium text-[#111814] dark:text-white">Science Department</span>
                      <span className="text-xs font-bold text-[#13ec80] dark:text-[#13ec80]">85%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-[#13ec80] h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-medium text-[#111814] dark:text-white">Arts Department</span>
                      <span className="text-xs font-bold text-[#111814] dark:text-gray-400">62%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-medium text-[#111814] dark:text-white">Math Department</span>
                      <span className="text-xs font-bold text-[#111814] dark:text-gray-400">45%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600">
                      <span className="material-symbols-outlined">emoji_events</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Top Performer</p>
                      <p className="text-sm font-bold text-[#111814] dark:text-white">John Smith (+120 Credits)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
