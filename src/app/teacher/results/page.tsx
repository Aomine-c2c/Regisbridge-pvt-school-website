'use client';

import React from 'react';

export default function TeacherResultsEntryPage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#111521]">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-10 py-3 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-gray-900 dark:text-white">
            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">EduManage Enterprise</h2>
          </div>
          <label className="flex flex-col min-w-40 !h-10 max-w-64 hidden md:flex">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-gray-200 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-primary">
              <div className="text-gray-500 dark:text-gray-400 flex border-none bg-gray-50 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-50 dark:bg-gray-800 focus:border-none h-full placeholder:text-gray-500 px-4 pl-2 text-base font-normal leading-normal" placeholder="Search student or class" value=""/>
            </div>
          </label>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden lg:flex items-center gap-9">
            <a className="text-gray-900 dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Dashboard</a>
            <a className="text-primary text-sm font-bold leading-normal" href="#">Academics</a>
            <a className="text-gray-900 dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Students</a>
            <a className="text-gray-900 dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Reports</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white shadow-sm cursor-pointer" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBeR3tJnpCUA9Yev9xrPp62mIIa3CXEx4_FCh8tsWOP-d_yIsZb8C4v5TognqdAlHdCWMI4-ZACSTs-mK590ETrlvIJsrAEdpZTs3GctWTaXY-4UNizUfI5vRneO8drFb2A0I5RZt_K0oHBx6ykCGEomKwqoy-HWRmx0wPR7bQcGXNUF6NZ7Yl6k7ohkblxEcsqCoXRS7ilf3kVukJeKyOmlSp9UKbRx_OXF4tDp_XOdEqI4cQ4CF9BoQtFv0BnCR83IVDFoV3k9Kk')" }}></div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-20 xl:px-40 overflow-y-auto">
        <div className="layout-content-container flex flex-col max-w-[1280px] flex-1 w-full">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 p-4">
            <a className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="#">Academics</a>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
            <a className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:underline" href="#">My Classes</a>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
            <span className="text-gray-900 dark:text-white text-sm font-medium leading-normal">Form 3 Science - Results Entry</span>
          </div>

          {/* Page Title & Main Actions */}
          <div className="flex flex-wrap justify-between items-end gap-4 p-4">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Gradebook: Form 3 Science</h1>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded">TERM 2</span>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">2023-2024 Academic Year • Physics & Chemistry Focus</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">file_download</span>
                <span className="truncate hidden sm:inline">Export CSV</span>
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span className="truncate hidden sm:inline">View Logs</span>
              </button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Class Average</p>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">analytics</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">76%</p>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                  2.5%
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Highest Score</p>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">military_tech</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">98%</p>
                <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">No change</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Lowest Score</p>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">warning</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">42%</p>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                  5%
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Pass Rate</p>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">check_circle</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">85%</p>
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                  <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                  1.2%
                </span>
              </div>
            </div>
          </div>

          {/* Filters & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-transparent">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span className="text-gray-900 dark:text-white text-sm font-medium">All Students</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span className="text-gray-900 dark:text-white text-sm font-medium">At Risk</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span className="text-gray-900 dark:text-white text-sm font-medium">High Achievers</span>
                <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
              </button>
              <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 transition-colors">
                <span className="text-gray-900 dark:text-white text-sm font-medium">Sort By Name</span>
                <span className="material-symbols-outlined text-[18px]">sort</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5"><span className="block size-2.5 rounded-full bg-emerald-500"></span>Approved</div>
              <div className="flex items-center gap-1.5"><span className="block size-2.5 rounded-full bg-blue-500"></span>Submitted</div>
              <div className="flex items-center gap-1.5"><span className="block size-2.5 rounded-full bg-amber-400"></span>Draft</div>
            </div>
          </div>

          {/* Main Data Table */}
          <div className="p-4">
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">Student Details</th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[100px] text-center">Assess.<br/><span className="text-[10px] opacity-70">(20%)</span></th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[100px] text-center">Mid-Term<br/><span class="text-[10px] opacity-70">(30%)</span></th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[100px] text-center">Final<br/><span class="text-[10px] opacity-70">(50%)</span></th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[80px] text-center">Total</th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[80px] text-center">Grade</th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]">Status</th>
                      <th className="p-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">Comments</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {/* Row 1 */}
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASkZR0g2Wc4ytu5MTodAC9QrzPTmf8Wh1uGdfgNNNVWxSPnEIn2sEgE03R5OANH6cqcO-eAMluImWjAkDCufICKoL7tJNY73BhPXOmyxJt0d--7A-VBABAjNNqJB4A2oqaH5Of0Fs9Thk5F4FD6m9c2P_QYLxBRowNSlpiebPo3Fz9qn2b2yZAtNYMxHpAmxWSu9c3tFDwmzmMd8rpWK4Hu2qK73pc_d_Aq5LIG2Cf1AXZ4PnR9d27uflPF-Jb4M4nYjKFpDc9MB8')" }}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Alice Johnson</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: #ST-2023-089</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="20" type="number" defaultValue="18"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="30" type="number" defaultValue="28"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="50" type="number" defaultValue="45"/>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">91</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm">A</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Approved
                        </span>
                      </td>
                      <td className="p-4">
                        <input className="w-full text-sm rounded border-none bg-transparent dark:text-white placeholder:text-gray-400 focus:ring-0" placeholder="Add comment..." type="text"/>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAN4ogEt21I7CmNQ8AYVfjk-hi5Fz9_RK7q_-Vt4m5urpLe2BLbG-uGR1JqRGRSNuYSMUg6xTJN-1zYdO_gZxwJK9sc0_fdnpaDrI2SGNLr7jU12LWa6LnTWcuHQEuxgSvbiecBS_aGCsOpxEMJG8iI16uJyvLkXm6f1OUa9hloBsKh6zzOH_SvRkl-Nh5DzJ8GsnT0KnfzZ6ZkNlSKia2SDAPu0Bryvtruybtg0HuUdhWA6QpOd8K1QbrixBZMot59ODnFlo4Kd0')" }}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Michael Chen</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: #ST-2023-092</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="20" type="number" defaultValue="15"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="30" type="number" defaultValue="22"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="50" type="number" defaultValue="38"/>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">75</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm">B</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          <span className="material-symbols-outlined text-[14px]">send</span> Submitted
                        </span>
                      </td>
                      <td className="p-4">
                        <input className="w-full text-sm rounded border-none bg-transparent dark:text-white placeholder:text-gray-400 focus:ring-0" type="text" defaultValue="Good effort this term."/>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDkVKYeAmGz4eEXdTLl62wi8rkYeOmhlEYUTDOzPnVmj6u60n6d0KEfv_2IhAM9CrqeuOhIT1ldt-8MEnTnkQEotFP_nIpkAYuX6dYy-6zyPh93GPU_UDZuEd1UK6hnANBam55TS08h6FVOiNX-s7FwZDQp5Rk9vBtIh3IL3zyqDvfgKCKxsA1LplA4o5T40ujvNRL-ge1QwSfZyW-hasPVOPeLNnsjlfKFv2xpSFp9EcyYu_dBdUh8wSuaFoeeOX8gJkV45dF4S2c')" }}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Sarah Smith</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: #ST-2023-104</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="20" type="number" defaultValue="12"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="30" type="number" defaultValue="18"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="50" type="number" defaultValue="12"/>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">42</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center size-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold text-sm">F</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          <span className="material-symbols-outlined text-[14px]">edit_note</span> Draft
                        </span>
                      </td>
                      <td className="p-4">
                        <input className="w-full text-sm rounded border-none bg-transparent dark:text-white placeholder:text-gray-400 focus:ring-0" placeholder="Needs academic intervention..." type="text"/>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxsnYYefPYdxs3KAno2nBCnrPjqu4im_CED3qTPfeNcCmEgZWpsYUBf318335IgiH6uJNCL3Q11Kz3cpUgAE6QYyPjyT61VTHrKu_ftMGIo5NVXCiiyPBV9081mXON2VFhppSi7fkxXgWWjSCqNR4d745_7taDbHK1ZDEzb-wuETd0dpvicUHq14Vm1C1w3f6iJpQMYs2_nL4kv-r2iCe2O31wuX_T6Tm_vd64yXO5LUgXSskNdTL35Z2D5sW2L94N08TDyZCJrZ8')" }}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">David Okechukwu</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: #ST-2023-112</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="20" type="number" defaultValue="19"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="30" type="number" defaultValue="26"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="50" type="number" defaultValue="41"/>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">86</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm">A</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          <span className="material-symbols-outlined text-[14px]">edit_note</span> Draft
                        </span>
                      </td>
                      <td className="p-4">
                        <input className="w-full text-sm rounded border-none bg-transparent dark:text-white placeholder:text-gray-400 focus:ring-0" placeholder="Add comment..." type="text"/>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAooaphusY_xL-xBQw5rCzjwy8tvs3xDclclIYAXxwnBw_bZVAj9Dsi9kLdQcwj90RMwkh6QjOO6TF361kv9LYrTRRqTSlXax2DSDr1ogfobyk_sfkA9fatTn08YizNU0sparcWK1y9--Z_-Sal7XwaiadikIrO99Jg0cNGvYUAbFpYEwmYSuM61Gj4JF0lKK4_Mvy2TQDqu7BK7WVPPJpzIPnB9PTNxyXl2Njo3fL7KgMzITaYbeB8PbGsQzs25cmxW0Roy1xCGWY')" }}></div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Emily Zhang</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">ID: #ST-2023-120</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="20" type="number" defaultValue="17"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="30" type="number" defaultValue="25"/>
                      </td>
                      <td className="p-2 text-center">
                        <input className="w-full text-center text-sm font-medium rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 dark:text-white py-1.5 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" max="50" type="number" defaultValue="39"/>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">81</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm">A</span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> Approved
                        </span>
                      </td>
                      <td className="p-4">
                        <input className="w-full text-sm rounded border-none bg-transparent dark:text-white placeholder:text-gray-400 focus:ring-0" placeholder="Add comment..." type="text"/>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pagination & Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                <p className="text-sm text-gray-500 dark:text-gray-400">Showing <span className="font-bold text-gray-900 dark:text-white">1-5</span> of <span className="font-bold text-gray-900 dark:text-white">32</span> students</p>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 disabled:opacity-50 transition-colors" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="size-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
                  <button className="size-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">2</button>
                  <button className="size-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors">3</button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="sticky bottom-0 z-40 mt-auto w-full border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 px-8 shadow-lg shrink-0">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>Last auto-saved 2 minutes ago</span>
              </div>
              <div className="flex gap-4">
                <button className="flex min-w-[120px] items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Save Draft
                </button>
                <button className="flex min-w-[160px] items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-blue-700 transition-colors">
                  Submit for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
