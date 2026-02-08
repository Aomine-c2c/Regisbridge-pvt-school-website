'use client';

import React from 'react';

export default function RoutePlanningPage() {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-[#101922] h-screen overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-[#1A2632] border-b border-[#e5e7eb] dark:border-[#2C3B4A] flex items-center justify-between px-6 flex-shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-[#617589] dark:text-[#94A3B8]">
              <span>Transport Management</span>
              <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              <span className="text-primary font-medium">Route Planning</span>
            </div>
            <h2 className="text-lg font-bold text-[#111418] dark:text-white leading-tight">
              Assignments &amp; Scheduling
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Filters */}
          <div className="hidden md:flex items-center gap-2 bg-[#f0f2f4] dark:bg-[#2C3B4A] rounded-lg px-1 p-1">
            <button className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-[#374151] rounded shadow-sm text-[#111418] dark:text-white">
              Fall 2024
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-[#617589] dark:text-[#94A3B8] hover:text-[#111418] dark:hover:text-white">
              Spring 2025
            </button>
          </div>
          <div className="h-8 w-[1px] bg-[#e5e7eb] dark:bg-[#2C3B4A]"></div>
          <div className="flex items-center gap-2">
            <label className="relative hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] text-[18px]">
                search
              </span>
              <input
                className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#2C3B4A] border border-[#e5e7eb] dark:border-[#374151] rounded-lg focus:outline-none focus:ring-1 focus:ring-primary w-64 placeholder-[#94A3B8] text-[#111418] dark:text-white"
                placeholder="Search student..."
                type="text"
              />
            </label>
            <button className="flex items-center justify-center gap-2 h-9 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-colors shadow-sm shadow-blue-500/20">
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              <span>Export Schedule</span>
            </button>
          </div>
        </div>
      </header>
      {/* Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Route Manager */}
        <div className="w-full lg:w-[450px] flex flex-col border-r border-[#e5e7eb] dark:border-[#2C3B4A] bg-white dark:bg-[#1A2632] z-0 shadow-xl lg:shadow-none">
          {/* Toolbar */}
          <div className="p-4 border-b border-[#f0f2f4] dark:border-[#2C3B4A] flex justify-between items-center bg-white dark:bg-[#1A2632]">
            <h3 className="font-bold text-[#111418] dark:text-white">Active Routes (12)</h3>
            <div className="flex gap-2">
              <button
                className="p-2 text-[#617589] hover:bg-[#f0f2f4] dark:text-[#94A3B8] dark:hover:bg-[#2C3B4A] rounded-lg"
                title="Filter"
              >
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button
                className="p-2 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                title="Add Route"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {/* Route Card 1 (Normal) */}
            <div className="bg-white dark:bg-[#232D38] border border-[#e5e7eb] dark:border-[#2C3B4A] rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <span className="material-symbols-outlined">directions_bus</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111418] dark:text-white group-hover:text-primary transition-colors">
                      North-Suburbs Express
                    </h4>
                    <p className="text-xs text-[#617589] dark:text-[#94A3B8]">
                      Bus #1042 • Driver: J. Smith
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-bold px-2 py-1 rounded">
                  ON TIME
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#617589] dark:text-[#94A3B8]">Capacity</span>
                  <span className="font-medium text-[#111418] dark:text-white">42/50</span>
                </div>
                <div className="h-2 w-full bg-[#f0f2f4] dark:bg-[#374151] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[84%] rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Route Card 2 (Problem/Selected) */}
            <div className="bg-white dark:bg-[#232D38] border-2 border-primary/20 dark:border-primary/20 rounded-xl shadow-md overflow-hidden ring-1 ring-primary/5">
              {/* Card Header */}
              <div className="p-4 bg-primary/5 border-b border-[#e5e7eb] dark:border-[#2C3B4A]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 animate-pulse">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111418] dark:text-white">
                        Downtown Shuttle
                      </h4>
                      <p className="text-xs text-[#617589] dark:text-[#94A3B8]">
                        Bus #209 • Driver: M. Davis
                      </p>
                    </div>
                  </div>
                  <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    OVERBOOKED
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      Capacity Exceeded
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400">48/45</span>
                  </div>
                  <div className="h-2 w-full bg-[#f0f2f4] dark:bg-[#374151] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[100%] rounded-full relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite] -translate-x-full"
                        style={{
                          backgroundImage:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Expanded Content: Student List */}
              <div className="bg-white dark:bg-[#232D38]">
                <div className="px-4 py-2 border-b border-[#e5e7eb] dark:border-[#2C3B4A] bg-[#f8fafc] dark:bg-[#1f2933] flex justify-between items-center">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                    Passenger Manifest
                  </h5>
                  <button className="text-xs text-primary font-medium hover:underline">
                    Manage List
                  </button>
                </div>
                <div className="divide-y divide-[#e5e7eb] dark:divide-[#2C3B4A] max-h-64 overflow-y-auto">
                  {/* Student Row */}
                  <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f8fafc] dark:hover:bg-[#2C3B4A] group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">
                        AS
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111418] dark:text-white">
                          Alice Smith
                        </p>
                        <p className="text-[10px] text-[#617589] dark:text-[#94A3B8]">
                          Stop #3 • 5th Grade
                        </p>
                      </div>
                    </div>
                    <button className="text-[#617589] dark:text-[#94A3B8] opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all">
                      <span className="material-symbols-outlined text-[18px]">remove_circle</span>
                    </button>
                  </div>
                  {/* Student Row */}
                  <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f8fafc] dark:hover:bg-[#2C3B4A] group bg-red-50/50 dark:bg-red-900/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">
                        BJ
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111418] dark:text-white flex items-center gap-1">
                          Ben Johnson
                          <span
                            className="material-symbols-outlined text-red-500 text-[14px]"
                            title="Waitlisted"
                          >
                            error
                          </span>
                        </p>
                        <p className="text-[10px] text-[#617589] dark:text-[#94A3B8]">
                          Waitlist • 7th Grade
                        </p>
                      </div>
                    </div>
                    <button className="text-primary opacity-0 group-hover:opacity-100 transition-all text-xs font-bold border border-primary px-2 py-1 rounded">
                      Reassign
                    </button>
                  </div>
                  {/* Student Row */}
                  <div className="px-4 py-3 flex items-center justify-between hover:bg-[#f8fafc] dark:hover:bg-[#2C3B4A] group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                        CL
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111418] dark:text-white">
                          Charlie Lee
                        </p>
                        <p className="text-[10px] text-[#617589] dark:text-[#94A3B8]">
                          Stop #5 • 6th Grade
                        </p>
                      </div>
                    </div>
                    <button className="text-[#617589] dark:text-[#94A3B8] opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all">
                      <span className="material-symbols-outlined text-[18px]">remove_circle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Route Card 3 */}
            <div className="bg-white dark:bg-[#232D38] border border-[#e5e7eb] dark:border-[#2C3B4A] rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group opacity-75 hover:opacity-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                    <span className="material-symbols-outlined">airport_shuttle</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111418] dark:text-white group-hover:text-primary transition-colors">
                      West-End Loop
                    </h4>
                    <p className="text-xs text-[#617589] dark:text-[#94A3B8]">
                      Bus #88 • Driver: S. Connor
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#617589] dark:text-[#94A3B8]">Capacity</span>
                  <span className="font-medium text-[#111418] dark:text-white">12/30</span>
                </div>
                <div className="h-2 w-full bg-[#f0f2f4] dark:bg-[#374151] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[40%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Panel: Map Area */}
        <div className="flex-1 relative bg-[#e5e7eb] dark:bg-[#111] overflow-hidden">
          {/* Map Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90 dark:opacity-60 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
            data-alt="Interactive city map showing streets and blocks for route planning"
            data-location="Metropolis Area"
            style={{
              backgroundImage: "url('https://placeholder.pics/svg/300')",
            }}
          ></div>
          {/* Map Overlay Gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
          {/* Floating Controls (Top Right) */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <div className="bg-white/90 dark:bg-[#1A2632]/90 backdrop-blur-md rounded-lg shadow-lg border border-[#e5e7eb] dark:border-[#2C3B4A] p-1 flex flex-col">
              <button
                className="p-2 hover:bg-[#f0f2f4] dark:hover:bg-[#374151] rounded text-[#111418] dark:text-white"
                title="Zoom In"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <button
                className="p-2 hover:bg-[#f0f2f4] dark:hover:bg-[#374151] rounded text-[#111418] dark:text-white"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>
            <div className="bg-white/90 dark:bg-[#1A2632]/90 backdrop-blur-md rounded-lg shadow-lg border border-[#e5e7eb] dark:border-[#2C3B4A] p-1">
              <button
                className="p-2 hover:bg-[#f0f2f4] dark:hover:bg-[#374151] rounded text-[#111418] dark:text-white"
                title="Layers"
              >
                <span className="material-symbols-outlined">layers</span>
              </button>
            </div>
          </div>
          {/* Floating Legend/Info (Bottom Left) */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-white/95 dark:bg-[#1A2632]/95 backdrop-blur-md rounded-xl shadow-xl border border-[#e5e7eb] dark:border-[#2C3B4A] p-4 min-w-[240px]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8] mb-3">
                Map Legend
              </h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-[#1A2632] ring-1 ring-primary"></span>
                  <span className="text-xs font-medium text-[#111418] dark:text-white">
                    Active Route Path
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-white border-2 border-[#617589]"></span>
                  <span className="text-xs font-medium text-[#111418] dark:text-white">
                    Scheduled Stop
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-[#1A2632]"></span>
                  <span className="text-xs font-medium text-[#111418] dark:text-white">
                    Unassigned Student
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Simulated Map Elements (Pins & Path) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* SVG Path for Route */}
            <svg className="w-full h-full drop-shadow-lg">
              <path
                className="animate-[dash_30s_linear_infinite] opacity-80"
                d="M200 500 Q 300 400 450 450 T 600 300 T 800 200"
                fill="none"
                stroke="#2b8cee"
                strokeDasharray="10 5"
                strokeLinecap="round"
                strokeWidth="6"
              ></path>
              <style>
                {`
                                    @keyframes dash {
                                        to {
                                            stroke-dashoffset: -1000;
                                        }
                                    }
                                `}
              </style>
            </svg>
            {/* Pin 1 */}
            <div className="absolute top-[430px] left-[430px] -translate-x-1/2 -translate-y-full group pointer-events-auto cursor-pointer">
              <div className="bg-white dark:bg-[#1A2632] text-[#111418] dark:text-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#e5e7eb] dark:border-[#2C3B4A]">
                Stop #1: Central Park
              </div>
              <div className="w-8 h-8 bg-primary rounded-full border-4 border-white dark:border-[#1A2632] shadow-xl flex items-center justify-center text-white text-[10px] font-bold z-10 relative">
                1
              </div>
            </div>
            {/* Pin 2 */}
            <div className="absolute top-[280px] left-[580px] -translate-x-1/2 -translate-y-full group pointer-events-auto cursor-pointer">
              <div className="bg-white dark:bg-[#1A2632] text-[#111418] dark:text-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold mb-1 opacity-100 transition-opacity whitespace-nowrap border border-[#e5e7eb] dark:border-[#2C3B4A]">
                Stop #2: Library (Current)
              </div>
              <div className="w-10 h-10 bg-white text-primary rounded-full border-4 border-primary shadow-xl flex items-center justify-center text-sm font-bold z-20 relative animate-bounce">
                <span className="material-symbols-outlined text-[20px]">directions_bus</span>
              </div>
            </div>
            {/* Unassigned Student Pin */}
            <div className="absolute top-[180px] left-[780px] -translate-x-1/2 -translate-y-full group pointer-events-auto cursor-pointer">
              <div className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Ben Johnson (Unassigned)
              </div>
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white dark:border-[#1A2632] shadow-xl flex items-center justify-center text-white z-10 relative">
                <span className="material-symbols-outlined text-[14px]">priority_high</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
