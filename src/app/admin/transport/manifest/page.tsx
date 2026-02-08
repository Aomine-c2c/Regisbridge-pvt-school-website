'use client';

import React from 'react';

export default function DriverTripManifestPage() {
  return (
    <div className="bg-background-light dark:bg-[#101922] font-display text-slate-900 dark:text-slate-100 min-h-screen flex justify-center">
      {/* Main App Container (Simulating a tablet/mobile view on desktop) */}
      <div className="w-full max-w-[800px] bg-surface-light dark:bg-[#1a2632] min-h-screen shadow-2xl flex flex-col relative overflow-hidden">
        {/* Header Section */}
        <header className="sticky top-0 z-20 bg-surface-light/95 dark:bg-[#1a2632]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button className="text-slate-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">arrow_back</span>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight">
                  Morning Run - Route 4B
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Oct 24, 2023 • Bus #42
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">map</span>
                <span className="hidden sm:inline">Map View</span>
              </button>
            </div>
          </div>
          {/* Stats Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Students Boarded
                </span>
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  15 <span className="text-lg text-slate-400 font-normal">/ 32</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-primary">47% Complete</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: '47%' }}
              ></div>
            </div>
          </div>
        </header>

        {/* Main Content: Student Manifest */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Upcoming Stops</h3>
            <button className="text-sm font-bold text-primary hover:underline">
              View Full Manifest
            </button>
          </div>
          <div className="space-y-4">
            {/* Card 1: Boarded (Checked) */}
            <div className="group relative flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-primary/30 dark:border-primary/30 shadow-sm rounded-xl transition-all hover:shadow-md">
              {/* Status Indicator Stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-xl"></div>
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <img
                    alt="Alice Johnson"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                    data-alt="Portrait of a young student with a cheerful expression"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBotKjxTNF_G0HEgKql-cAmBM4hrgHEr6H2EhTPV1hrYVZk-VG-c2pOWFhvF09wIyakm3iHegD11LMjeE2IBQ97EklLGImjsJmFJXulJLK7HoEqY7V-4KEl3P0KsBImgtBh8c4bCce0pQIlOp_aZ00ThpbAK4QLdNqpoBljwcS_C5AYCkwAkvzS0pMve8IPXoyWTS2qMuiy1n38zAcHRgi-lBuUpL63OcLE1UboXNlYt3nHZhoVqVtLlJQrM-oPvufUysBkSmIeAnY"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-white dark:border-slate-800">
                    <span className="material-symbols-outlined text-[14px] block">check</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Alice Johnson
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                      Grade 4
                    </span>
                    <span>• 7:45 AM</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    124 Maple Ave
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Mark Absent (Disabled looking since boarded) */}
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  title="Mark Absent"
                >
                  <span className="material-symbols-outlined">person_off</span>
                </button>
                {/* Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" value="" />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Card 2: Next Stop (Pending) */}
            <div className="group relative flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <img
                    alt="Ben Smith"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm grayscale-[20%]"
                    data-alt="Portrait of a young boy smiling wearing a blue shirt"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPVaIV3ULi1Fi000OqfKMLXkSNoHk1RogBSbi7Z5MUEBi4u1QL0qqBmUBz1ajMJMeewtrCmQCNNse8ArsaQ8QnJTp5FDZ1gw49whNIpXGb2Zc1LYM6RoH9iJKyJE0QHy86I29xBJ6rVd4hqc8DX0e4PspXnAYCEMt_pYSzM67_HxzjMaMsXKnnA03zIRcQGa7sQ_mJH2brpoY7mPaqjz9iDWHSlpVL1innlSK0bxEX2FtBsaybVZIO3BUeI95HUdMppSwEU1OXayg"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Ben Smith</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                      Grade 2
                    </span>
                    <span className="font-semibold text-primary">• Next: 7:50 AM</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    126 Maple Ave
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Mark Absent"
                >
                  <span className="material-symbols-outlined">person_off</span>
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" value="" />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Card 3: Pending */}
            <div className="group relative flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <img
                    alt="Charlie Brown"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm grayscale-[20%]"
                    data-alt="Portrait of a student with curly hair smiling"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH_e2AFCVZqpSPh7ihAjFJv447X9a1bFmloxELcweXzy--lem9OhSJ3mW8Wq4Rs3dDLhi8Bbo1bhu5enPRE7hFPy-WXoMGgr4o7vJsBQZkp4ltlrGIsBBfjzRg0s8O-M90IY97exZMzJ2lBbZaPW2U0DezKjXTkXGiE8VGuqiN8yAebWTAv5UTbRpNq4CraJ-phOQd_xoceVJjj6NY5iXUxDPEn6NRWxziOU8SaIEFqtszggoEgE4Ms_8i2DHYbUjiQlH1dZcKCrg"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Charlie Brown
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                      Grade 5
                    </span>
                    <span>• 7:55 AM</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    15 Oak St
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Mark Absent"
                >
                  <span className="material-symbols-outlined">person_off</span>
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" value="" />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Card 4: Absent (Marked) */}
            <div className="group relative flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-none rounded-xl opacity-75">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <img
                    alt="Daisy Miller"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 grayscale"
                    data-alt="Portrait of a young girl with braided hair"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTIeQ8-LUOR2boCGkKHkmx01KgRtu4TI9SbMIN-yEhqadh-PtNgc4m40wpsDWYV1mNBY3iBoM7DiOL_5FQc69x_o7VC7innnxfXpnfnLTdO_UAWHFCc03vR8YhqZWAXZxoJv2Jl3XWtXBINafhG4FF5QGMlpkbLIIgoG_Nb9ZJPali2QZDAVaoC8MnIkmeDai46iEIzaxODVG77ddPjZtWKVBqzUQS2d3-WW0TvuRgwOcGayelmTsf9Ms00ZsYP62H-cpGqbRA8vE"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-slate-500 text-white rounded-full p-0.5 border-2 border-white dark:border-slate-800">
                    <span className="material-symbols-outlined text-[14px] block">person_off</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-slate-500 dark:text-slate-500 line-through">
                    Daisy Miller
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
                    <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                      Grade 3
                    </span>
                    <span className="text-red-500 dark:text-red-400 font-bold">
                      • MARKED ABSENT
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 dark:text-slate-600 mt-0.5 flex items-center gap-1 line-through">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    22 Elm St
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1 text-xs font-bold text-slate-500 border border-slate-300 rounded hover:bg-slate-200">
                  Undo
                </button>
              </div>
            </div>

            {/* Card 5: Pending */}
            <div className="group relative flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <img
                    alt="Ethan Hunt"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm grayscale-[20%]"
                    data-alt="Portrait of a young student with glasses"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm5VM2gQbcxnT_V9g_qUUTHK7_6FtfWQHH3NOP4gKZUbHSh60ouynYxDPscB_OP7hz6IS9vf9JtUfl4KqCxIhldUtG27VNS5SudnCtzQOmPWgdDRIZ3AU0uuMzIV0u09RSpvCPagm6tYqT0Zb212XHYHFovfNYgM2RwTHKy1stnuyK6NZEXqY0BoqiEUrSpp7oRSvqf7G8_aQhLid8skgQNu6w6hSYqsFmErGCh_UzbX-jB_iU3taruCuV01NeaF6u8OJJ_rQ-xW4"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">Ethan Hunt</h4>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                      Grade 6
                    </span>
                    <span>• 8:05 AM</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    140 Pine St
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Mark Absent"
                >
                  <span className="material-symbols-outlined">person_off</span>
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" value="" />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </main>

        {/* Sticky Footer Action Bar */}
        <footer className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 p-4 pb-6">
          <div className="flex gap-3 justify-between items-center max-w-full overflow-x-auto pb-2 sm:pb-0">
            {/* Incident Report (Primary Warning Action) */}
            <button className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200 rounded-xl px-4 py-3.5 transition-colors group">
              <span className="material-symbols-outlined text-amber-600 group-hover:text-amber-800">
                warning
              </span>
              <span className="font-bold text-sm">Incident</span>
            </button>
            {/* Divider */}
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-600 hidden sm:block"></div>
            {/* Quick Calls */}
            <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-xl px-4 py-3.5 transition-colors">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="font-bold text-sm">Security</span>
            </button>
            <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl px-4 py-3.5 transition-colors">
              <span className="material-symbols-outlined">sos</span>
              <span className="font-bold text-sm">SOS</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
