'use client';

import React from 'react';

export default function RoomAssignmentPage() {
  return (
    <div className="flex bg-[#f6f7f8] dark:bg-[#111521] overflow-hidden h-full">
      {/* Tool Content */}
      <div className="flex flex-1 overflow-hidden p-4 sm:p-6 gap-6">
        {/* Left Panel: Unassigned Students */}
        <div className="flex w-80 shrink-0 flex-col rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] shadow-sm">
          <div className="flex flex-col gap-3 p-4 border-b border-[#e5e7eb] dark:border-[#2d3748]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#646d87] dark:text-[#a0aec0]">Unassigned Students</h3>
              <span className="rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-bold text-red-700 dark:text-red-400">14 Pending</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#646d87] text-lg">filter_list</span>
              <input
                className="w-full h-8 rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] pl-9 pr-3 text-xs focus:border-primary focus:ring-1 focus:ring-primary dark:text-white"
                placeholder="Filter by Name/ID"
                type="text"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1 px-2 text-xs font-medium rounded border border-[#e5e7eb] dark:border-[#4a5568] bg-[#f9fafb] dark:bg-[#2d3748] text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-[#4a5568]">Boys</button>
              <button className="flex-1 py-1 px-2 text-xs font-medium rounded border border-[#e5e7eb] dark:border-[#4a5568] bg-[#f9fafb] dark:bg-[#2d3748] text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-[#4a5568]">Girls</button>
              <button className="flex-1 py-1 px-2 text-xs font-medium rounded border border-[#e5e7eb] dark:border-[#4a5568] bg-[#f9fafb] dark:bg-[#2d3748] text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-[#4a5568]">Gr 9-12</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            <div className="flex flex-col gap-2">
              {/* Student Card 1 */}
              <div className="group flex cursor-grab active:cursor-grabbing items-center gap-3 rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] p-3 hover:border-primary hover:shadow-md transition-all">
                <div className="relative size-10 shrink-0">
                  <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrHzb6BfJ44OxLeAHwnlT_2ju5aOPE32j21zriJ9HLI65mhjFpVw1b8C3E19lLJgfgHegdgz1IhCQCEClZswFvFW3hYxGohrTJJ8e_pWfWrQH9nCpKXcE2LVoxzDHQkvRlOl3QOEBoWiIwci4tofMQtyiR-c38GaoLB6fyjUXJGUsDHhtXeFPi4xpz1iYUVVqWm43nKUjwOhUAA9nLbRh6nBr_qUjHSWzpkFANAQJwvJJGanABUpIEPXwE4Uc6t2AvLeiuHVD9Tho')" }}></div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 border border-white">B</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-[#111317] dark:text-white truncate">Michael Chen</p>
                  <p className="text-xs text-[#646d87] dark:text-[#a0aec0]">ID: 2024098 • Gr 11</p>
                  <div className="flex gap-1 mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/30 text-[10px] font-medium text-yellow-800 dark:text-yellow-400">Nut Allergy</span>
                  </div>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:text-primary">drag_indicator</span>
              </div>
              {/* Student Card 2 */}
              <div className="group flex cursor-grab active:cursor-grabbing items-center gap-3 rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] p-3 hover:border-primary hover:shadow-md transition-all">
                <div className="relative size-10 shrink-0">
                  <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmWRsAx-NCDCJi3dxR-LnV2RgMOvDd8lSrIXncz8c06lhgurX9FcTpevS6D67SY1aYuUCmhVrMpiN_H2oKDt_a4n_J8zwiuXgl2ji0nw6To1mwI5EFSzSWSH5a6470Z6g9FSHYQZUGHcMr79VAGbsIF23mhMtbhMmpUqn3nmMv-SHZnxlalKQdyqlCbJSXwo8xFiIVD90ZPwthxHX0u0JyjTp_89iUflW9HemzNtvZNKstihoTrjIX1OQ2ez66UoSZV3LzQuGA874')" }}></div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-100 text-[10px] font-bold text-pink-700 border border-white">G</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-[#111317] dark:text-white truncate">Sarah Jenkins</p>
                  <p className="text-xs text-[#646d87] dark:text-[#a0aec0]">ID: 2024112 • Gr 10</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:text-primary">drag_indicator</span>
              </div>
              {/* Student Card 3 */}
              <div className="group flex cursor-grab active:cursor-grabbing items-center gap-3 rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] p-3 hover:border-primary hover:shadow-md transition-all">
                <div className="relative size-10 shrink-0">
                  <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwfvBe2Sgh4P0cWvPMw2_UyfMCqNNLLGz0jqENgE9qgP3eYYpWrDnalyjrYEKgtaYG3RXb1znMR304MfyUg04cspt20IdhZ_TYIARSH1e0ilyZmXE39b3yBicR2RmAMZkl5mpCgv12AKHS9Lp0Is6G0ejFZysYXGYo-HcmIC4_cA0RtfVG4mHd8_1zRxRIEMDEC0OrjsJxjD90ouLZOx285XzhoaT7wp2G8NQkNs4L8dzhz9t39vyOgNdpL2RslxtwqHCk8p03UzY')" }}></div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 border border-white">B</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-[#111317] dark:text-white truncate">David Ross</p>
                  <p className="text-xs text-[#646d87] dark:text-[#a0aec0]">ID: 2024005 • Gr 12</p>
                  <div className="flex gap-1 mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-[10px] font-medium text-purple-800 dark:text-purple-400">Prefect</span>
                  </div>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400 group-hover:text-primary">drag_indicator</span>
              </div>
              {/* Conflict Card Example */}
              <div className="group flex cursor-grab active:cursor-grabbing items-center gap-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800 p-3 hover:border-red-400 transition-all">
                <div className="relative size-10 shrink-0">
                  <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCKngwqU0nGiKvMdG9ZqKVIuj5v56KDgRLLabUR8aNgNBVeggHZmtcTj0hSAIFqzyEVCHA3KPYppmIEebrPlIm5YidoV-cLxTtaP8zWERDp11diVo8NOxDcQhrzNaqYnN_kZBRTMW8i4-8OnSU4CLQy4GwXaVf9DVjkSD5T6DdmDWWnGdzBofa3Iqx6CsyXM8ABxtsJ9bGI3Y5-umll3uI_RRUF8w4-dJtpZzqZ4yz3qImDZDnPqnhquK82f3CCz4feYiSPgXwhuM')" }}></div>
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 border border-white">B</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-bold text-[#111317] dark:text-white truncate">James Miller</p>
                  <p className="text-xs text-[#646d87] dark:text-[#a0aec0]">ID: 2024331 • Gr 9</p>
                  <p className="text-[10px] text-red-600 dark:text-red-400 font-medium mt-0.5">Needs Ground Floor</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-red-300 group-hover:text-red-500">warning</span>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-[#e5e7eb] dark:border-[#2d3748] bg-gray-50 dark:bg-[#1a202c]">
            <button className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white shadow hover:bg-blue-700 transition-colors">
              Auto-Assign Remaining
            </button>
          </div>
        </div>

        {/* Right Panel: Building/Room Tree View */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] shadow-sm">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-[#e5e7eb] dark:border-[#2d3748] p-4 bg-gray-50/50 dark:bg-[#1a202c]">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#4a5568] dark:text-white">
                <span className="material-symbols-outlined text-base">domain</span>
                North Hall
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] bg-white dark:bg-[#2d3748] px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#4a5568] dark:text-white">
                <span className="material-symbols-outlined text-base">layers</span>
                Floor 2
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#646d87] dark:text-[#a0aec0]">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-emerald-500"></span> Available
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-blue-500"></span> Occupied
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500"></span> Conflict
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="font-medium text-[#111317] dark:text-white">284/300 Beds Filled</span>
            </div>
          </div>
          {/* Room Grid */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50 dark:bg-[#111521]">
            {/* Floor Header */}
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-xl font-bold text-[#111317] dark:text-white">North Hall — Floor 2 (Boys Wing)</h4>
              <div className="flex gap-2">
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#646d87] dark:text-[#a0aec0]">
                  <span className="material-symbols-outlined">zoom_in</span>
                </button>
                <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#646d87] dark:text-[#a0aec0]">
                  <span className="material-symbols-outlined">zoom_out</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {/* Room Card: Full */}
              <div className="flex flex-col rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-[#2d3748] px-4 py-2 border-b border-[#e5e7eb] dark:border-[#4a5568]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#646d87]">meeting_room</span>
                    <span className="font-bold text-[#111317] dark:text-white">Room 201</span>
                  </div>
                  <span className="rounded bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-bold text-green-700 dark:text-green-400">Full</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="text-xs font-medium text-[#646d87] dark:text-[#a0aec0] uppercase tracking-wide">Occupants (2/2)</div>
                  {/* Occupant */}
                  <div className="flex items-center justify-between rounded bg-background-light dark:bg-[#111521] p-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9YVZ2sGzSbZgz1pDafsMy66WeGB0XaCym0poeQKpVvBokM066nw42PW-VEazWkvqlAZtPFRAM2u_awENjwwqtaXMtxy1tCnR8TcOqkcYnjgn9j35iJiFveOJziTaxuioDnyMGLXbsqbDY1me5GAw11XhvvcQYcMeDU_DYWie0BJ5OHKEu0wctMDwYfC7cMofZYLYF7YaGzA0BvV1iNJAWqncOo9e8DXDIslTM9iYuve4tQoYEuxISQMNGU3e433fdu8EzaZdD4ns')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Tom H.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 11</span>
                  </div>
                  {/* Occupant */}
                  <div className="flex items-center justify-between rounded bg-background-light dark:bg-[#111521] p-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtytgzjo4tQx40vN_2l8RWk4yT-VBjJubP58qXhj9UneDDr14xifpOFyrvWCu2EH3cUYVHhav160NE-IVrqEm09x4GioeV_0leXiUEvGJtBqZdZhwriMhzak2_aZFGfly-GZQwMNPDyXOmq18d7bMAPAUoARIO3nlGzOvHUaVRHX0_mLPqNgRaF4K0d7pHaa5gvrBIEjoasTq9t7TncYNX5TjNy00Ob-o5goZcxcBpj85dleoIZtzQnhhepT3le0pAfVJ-jjqMJJI')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Alex B.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 11</span>
                  </div>
                </div>
              </div>
              {/* Room Card: Available */}
              <div className="flex flex-col rounded-xl border border-primary/40 ring-1 ring-primary/10 dark:border-primary/40 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between bg-primary/5 dark:bg-[#2d3748] px-4 py-2 border-b border-[#e5e7eb] dark:border-[#4a5568]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">meeting_room</span>
                    <span className="font-bold text-[#111317] dark:text-white">Room 202</span>
                  </div>
                  <span className="rounded bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">1 Slot Open</span>
                </div>
                <div className="p-3 flex flex-col gap-2 h-full">
                  <div className="text-xs font-medium text-[#646d87] dark:text-[#a0aec0] uppercase tracking-wide">Occupants (1/2)</div>
                  {/* Occupant */}
                  <div className="flex items-center justify-between rounded bg-background-light dark:bg-[#111521] p-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA5qi1PNLEk4HLBPBV4poStECbwFi9mAhq_pj_0BbQm7hAV04zCTyq66aQhbZvaVrOAdSn2RGcvGuR2LEwfKB31nheR0rQ4ORswZPbNgMKGwmCfyE9wdMj4fNLvGI2VImOfv93ca_R-dITgvZqdCikJMJ7WzBVdqbYxxt16EUaSJVpYh6rzvyXg_B4lg8l66FoW6Twg8PwNf4DJrT2uNwH9RVnAqqej2OYZUGvzQIuy0RROUG2fF9F5Uzie4S5vHJRpBNSzCRvQG9c')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Liam K.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 10</span>
                  </div>
                  {/* Drop Zone */}
                  <div className="flex flex-1 min-h-[44px] items-center justify-center rounded border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-700 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Drop Student Here
                  </div>
                </div>
              </div>
              {/* Room Card: Conflict */}
              <div className="flex flex-col rounded-xl border border-red-300 dark:border-red-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 px-4 py-2 border-b border-red-100 dark:border-red-800">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-600">error</span>
                    <span className="font-bold text-[#111317] dark:text-white">Room 203</span>
                  </div>
                  <span className="rounded bg-red-100 dark:bg-red-900/40 px-2 py-0.5 text-xs font-bold text-red-700 dark:text-red-400">Conflict</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-2 rounded">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Grade Mismatch (Gr 9 & Gr 12)
                  </div>
                  {/* Occupant */}
                  <div className="flex items-center justify-between rounded bg-background-light dark:bg-[#111521] p-2 border-l-2 border-transparent">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWRp-qa_6uUfYxZzITU6NAKtfoDVoK2rTYsPLcWOMWzzCRmo9U6Kb1yDHU2I_fB4xcfSTGxRnHrLSjV34LBIvEv7SVZrWpFFgGdyVeohBuUttSXqd5Pj-0R4fB8jWRoAhxScmzh-0UwCPMMN_rT99i8pxrvutTnm3_sHUBtFtTJXbFGJowh40Yp5OsginJBBwVnnEKHCxphdKyZAWG4drguBaac4YPSyS5Jpy8M5L5KdNxRPk_tDyDbw1WNNdsRCMjC9kMxeouZWA')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Jayden S.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 9</span>
                  </div>
                  {/* Occupant (Conflict Source) */}
                  <div className="flex items-center justify-between rounded bg-red-50 dark:bg-red-900/10 p-2 border-l-2 border-red-500">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLcInVtQk1_HFYP56nsO89_jQjd5mo3oZRh3BU1EK-g0IAXGkZq3OHhfUh8nITsiuSnNfvTcZAV9gG74dDA86NdG00xYojmO8mn_WSENBDPfkhzHKnfh_2x-Pykf5ng-ZfBl3pFlf7jrr-7ySZsi1GCKqejQP3Wpv-uom74K2xJjXJ2RTSahu6meUVUfrEB6Mq3sBPUwRkraSyHSIJWjUU0zB0qse_tRsPWrkIhpu-3BauynLzRn9FL_EdGhoRfGqHVDh7Rf-Jx64')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Marcus P.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 12</span>
                  </div>
                </div>
              </div>
              {/* Room Card: Empty */}
              <div className="flex flex-col rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-[#2d3748] px-4 py-2 border-b border-[#e5e7eb] dark:border-[#4a5568]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#646d87]">meeting_room</span>
                    <span className="font-bold text-[#111317] dark:text-white">Room 204</span>
                  </div>
                  <span className="rounded bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-xs font-bold text-gray-600 dark:text-gray-300">Empty</span>
                </div>
                <div className="p-3 flex flex-col gap-2 h-full justify-center">
                  <div className="flex flex-col items-center justify-center py-4 border-2 border-dashed border-[#e5e7eb] dark:border-[#4a5568] rounded-lg text-[#646d87]">
                    <span className="material-symbols-outlined mb-1">add</span>
                    <span className="text-xs">Drag students here</span>
                  </div>
                </div>
              </div>
              {/* Room Card: Maintenance */}
              <div className="flex flex-col rounded-xl border border-gray-200 dark:border-[#2d3748] bg-gray-50 dark:bg-[#1a202c] shadow-sm overflow-hidden relative">
                <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <span className="material-symbols-outlined text-sm">build</span> Maintenance
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-100 dark:bg-[#2d3748] px-4 py-2 border-b border-[#e5e7eb] dark:border-[#4a5568]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#646d87]">no_meeting_room</span>
                    <span className="font-bold text-[#646d87] dark:text-gray-400">Room 205</span>
                  </div>
                  <span className="rounded bg-gray-200 dark:bg-gray-700 px-2 py-0.5 text-xs font-bold text-gray-500">Blocked</span>
                </div>
                <div className="p-3 flex flex-col gap-2 h-full opacity-50">
                  <div className="text-xs font-medium text-[#646d87] uppercase tracking-wide">Occupants (0/2)</div>
                  <div className="h-10 rounded bg-gray-100 dark:bg-[#111521]"></div>
                  <div className="h-10 rounded bg-gray-100 dark:bg-[#111521]"></div>
                </div>
              </div>
              {/* Room Card: Full */}
              <div className="flex flex-col rounded-xl border border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-[#2d3748] px-4 py-2 border-b border-[#e5e7eb] dark:border-[#4a5568]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#646d87]">meeting_room</span>
                    <span className="font-bold text-[#111317] dark:text-white">Room 206</span>
                  </div>
                  <span className="rounded bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-bold text-green-700 dark:text-green-400">Full</span>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  <div className="text-xs font-medium text-[#646d87] dark:text-[#a0aec0] uppercase tracking-wide">Occupants (2/2)</div>
                  {/* Occupant */}
                  <div className="flex items-center justify-between rounded bg-background-light dark:bg-[#111521] p-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcR13YGlX6bWg29QYTl2Io_d2ONP1hox5hiYXR3H1C2z6UcJ1BQPNCkXHSkLztxeN9XPsAqxP3_XLFexsKIXaDNEyN5-l_Z0hFQQYWV2--X0k6cUhfkqJVb9deG3ZKK7otV8qsMCHp06RhMuiSc5y51L3rR7iv8u0Qc1yRqt--RWs6mikHZFeyB9ddzL1glpsbJo6L5L_5YqPsEJTmqcUe4L_dJhk4EgvcWa12dpaVpuA_cugqWePt_hGhotNPrYUKXQkHppDasDI')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Chris M.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 12</span>
                  </div>
                  {/* Occupant */}
                  <div className="flex items-center justify-between rounded bg-background-light dark:bg-[#111521] p-2">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3aAfFaSoZbXT6QlgswDiT_k4EtcUWbUIUySuT2F8svtPan7f92O9qurDt10XVqfLmEK0FawoDfe0_nYgsOzV0yer5516nthaMIJwLSaLdiiGiO6MKkWjYkDvYYNZmB9VD02zc0EJ7SdCW03Y33MmZnMgsxbBmIRGBeSLDQKsNmuqbmhI6xWe0Pm_BZ6PZ53aJRs7ZrvGWyyS_gRYJ7yz1gY8xSZgDM5H5MI4KllkKgn9VDYGM3CHzAPU_8-w2s85ELmdFVbUwJos')" }}></div>
                      <span className="text-sm font-medium dark:text-white">Sam T.</span>
                    </div>
                    <span className="text-xs text-[#646d87] dark:text-[#a0aec0]">Gr 12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Actions */}
          <div className="border-t border-[#e5e7eb] dark:border-[#2d3748] bg-white dark:bg-[#1a202c] p-4 flex justify-between items-center">
            <p className="text-sm text-[#646d87] dark:text-[#a0aec0]">Last saved: Today at 09:42 AM</p>
            <div className="flex gap-3">
              <button className="rounded-lg border border-[#e5e7eb] dark:border-[#4a5568] px-4 py-2 text-sm font-bold text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2d3748]">
                Reset Changes
              </button>
              <button className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700">
                Save Assignments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
