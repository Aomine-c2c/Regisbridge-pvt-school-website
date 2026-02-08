'use client';

import React from 'react';

export default function ParentTransportPage() {
  return (
    <div className="bg-background-light dark:bg-[#101922] text-slate-900 dark:text-white font-display transition-colors duration-200 min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#1a232e] border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-6 lg:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
              SchoolConnect{' '}
              <span className="hidden sm:inline font-normal text-slate-500 dark:text-slate-400">
                Parent Portal
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <a
                className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium text-sm transition-colors"
                href="#"
              >
                Dashboard
              </a>
              <a className="text-primary font-bold text-sm transition-colors" href="#">
                Transit
              </a>
              <a
                className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium text-sm transition-colors"
                href="#"
              >
                Academics
              </a>
              <a
                className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium text-sm transition-colors"
                href="#"
              >
                Fees
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a232e]"></span>
              </button>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-100 dark:border-slate-700"
                data-alt="Parent profile picture"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6UJrHvme-L3KA0Foh8SlBOhlRyX6p6aAoxsPHWGfN-GrrKpxe-7W35e6uphKX_GAiwAoHODXdsbMxCehWKy5CO99WEx3-eg1PkYwKVjUPsFzSLnkiHCe56I4gXXUW1va_l58r5AzFk7oaLXTdNH5aKx1VqetPd0dbdZQAFAJMH96FjQrSPIWMRmZA23rgcxC6yJMCxMRZpaRv64BNzLM-JsjcUPM13QMfkkDuj-rvwKeaoCinV-UxxMxqIzVQ6hR9_gOnizDvns4')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-8 max-w-[1600px] mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Transit Status: Sarah Jenkins
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2 text-sm md:text-base">
              <span className="material-symbols-outlined text-sm">directions_bus</span>
              Morning Route B • Bus #42 • Stop: Maple Ave &amp; 4th St
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a232e] border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 text-sm font-medium">
            <span className="material-symbols-outlined text-lg">refresh</span>
            Refresh Status
          </button>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Left Column: Status & Details */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            {/* Primary Status Card */}
            <div className="bg-white dark:bg-[#1a232e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-8xl text-primary">
                  directions_bus
                </span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-wider">
                    Live Status
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  On the way
                </h2>
                <p className="text-slate-500 dark:text-slate-400">Heading to School</p>
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-white dark:bg-[#1a232e] rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4">
              <div className="size-14 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                <img
                  alt="Bus Driver Portrait"
                  className="w-full h-full object-cover"
                  data-alt="Portrait of the bus driver"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWYpFD26FFiLVcMO2TnBiWWJDyMTIDmdDKjCiCO8kDLyuKR5RWvqIXiI-NXmRXe_9Rj5qUbLDYRijJ3pdKNXybjul_ecNSWoWKIWYiCp4mcTErgUxJjYOmuEZOIylZMF80JFvAHESWxUPWe4elVC4Zd7gbsEuysiWR74deGnEVEEMbe5CmfkuAz2dyydu9PI5lJCA-lv7V9yz2wqUoAvLDTsaXcsjbGXzPIZHqwIRFgq1V96bQysHtbey9l3NQ5aSIjpGNFW0IeF4"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-slate-900 dark:text-white">Mr. James</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-medium">
                    Bus #104
                  </span>
                  <span>•</span>
                  <span>Exp 5 yrs</span>
                </div>
              </div>
              <button
                aria-label="Call Driver"
                className="size-10 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all shadow-sm"
              >
                <span className="material-symbols-outlined">call</span>
              </button>
              <button
                aria-label="Message Driver"
                className="size-10 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-sm"
              >
                <span className="material-symbols-outlined">chat_bubble</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#1a232e] rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                  Est. Arrival
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">7:42 AM</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> On Time
                </p>
              </div>
              <div className="bg-white dark:bg-[#1a232e] rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                  Distance
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">2 stops</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">~1.5 miles away</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#1a232e] rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex-grow">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                Trip Timeline
              </h3>
              <div className="relative timeline-line pl-2 space-y-6">
                <style jsx>{`
                  .timeline-line::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 15px;
                    width: 2px;
                    background-color: #e2e8f0;
                    z-index: 0;
                  }
                  .dark .timeline-line::before {
                    background-color: #334155;
                  }
                `}</style>
                {/* Current Step */}
                <div className="relative flex gap-4 z-10">
                  <div className="size-8 rounded-full bg-primary border-4 border-white dark:border-[#1a232e] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-white text-sm">
                      directions_bus
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Transit to School
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      In Progress • Updated 1m ago
                    </p>
                  </div>
                </div>
                {/* Past Step */}
                <div className="relative flex gap-4 z-10">
                  <div className="size-8 rounded-full bg-green-500 border-4 border-white dark:border-[#1a232e] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-white text-sm">check</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Departed Home Stop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">7:15 AM</p>
                  </div>
                </div>
                {/* Future Step */}
                <div className="relative flex gap-4 z-10 opacity-50">
                  <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-[#1a232e] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-400 text-sm">school</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Arrive at School
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Est. 7:45 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-3 rounded-lg border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">report_problem</span>
              Report Absence / No-Show
            </button>
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-8 h-[500px] lg:h-auto min-h-[500px] order-1 lg:order-2 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group">
            {/* Map Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Stylized map showing city streets and bus route"
              data-location="City Map View"
              style={{ backgroundImage: "url('https://placeholder.pics/svg/300')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

            {/* Floating Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="size-10 bg-white dark:bg-[#1a232e] rounded-lg shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="size-10 bg-white dark:bg-[#1a232e] rounded-lg shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined">remove</span>
              </button>
              <button className="size-10 bg-white dark:bg-[#1a232e] rounded-lg shadow-md text-primary hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center mt-2">
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>

            {/* Floating Notification Pill */}
            <div className="absolute top-4 left-4 max-w-sm animate-fade-in-down">
              <div className="flex items-center gap-3 bg-white/95 dark:bg-[#1a232e]/95 backdrop-blur-sm p-3 rounded-lg shadow-md border-l-4 border-yellow-400">
                <span className="material-symbols-outlined text-yellow-500">info</span>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Traffic Alert
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Bus is running 3 mins late due to traffic on Main St.
                  </p>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>

            {/* Simulated Map Markers (positioned absolutely for demo) */}
            {/* Bus Marker */}
            <div className="absolute top-[45%] left-[35%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer group/marker">
              <div className="relative">
                <div className="size-10 bg-primary rounded-full border-2 border-white dark:border-slate-900 shadow-lg flex items-center justify-center z-20 relative">
                  <span className="material-symbols-outlined text-white text-xl">
                    directions_bus
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping z-10"></div>
              </div>
              <div className="bg-white dark:bg-[#1a232e] px-2 py-1 rounded shadow-md text-xs font-bold text-slate-800 dark:text-white whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity">
                Bus #42
              </div>
            </div>

            {/* Home Marker */}
            <div className="absolute top-[60%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
              <div className="size-8 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 shadow-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">home</span>
              </div>
              <div className="bg-white dark:bg-[#1a232e] px-2 py-1 rounded shadow-md text-xs font-bold text-slate-800 dark:text-white whitespace-nowrap">
                Home
              </div>
            </div>

            {/* School Marker */}
            <div className="absolute top-[30%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
              <div className="size-12 bg-slate-800 dark:bg-white rounded-full border-2 border-white dark:border-slate-900 shadow-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white dark:text-slate-900 text-2xl">
                  school
                </span>
              </div>
              <div className="bg-white dark:bg-[#1a232e] px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-slate-800 dark:text-white whitespace-nowrap">
                North High School
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
