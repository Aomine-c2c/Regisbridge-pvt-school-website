'use client';

import React from 'react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="font-sans antialiased bg-[#f8f8f5] dark:bg-[#221e10] text-slate-900 dark:text-slate-100 overflow-hidden h-screen relative">
      {/* Main Dashboard Layer (Blurred Background) */}
      <div className="relative flex h-full w-full flex-col bg-[#181611] dark overflow-hidden blur-[4px] scale-[0.99] opacity-60 pointer-events-none select-none transition-all duration-500">
        <div className="flex h-full grow flex-col">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#393528] px-10 py-3 bg-[#181611]">
            <div className="flex items-center gap-4 text-white">
              <div className="size-8 text-[#f4c025] flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">EduCommand Enterprise</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#bab29c]">search</span>
                <span className="material-symbols-outlined text-[#bab29c]">notifications</span>
                <div className="size-10 rounded-full bg-gray-700"></div>
              </div>
            </div>
          </header>
          <div className="flex h-full flex-1">
            {/* Sidebar Mock */}
            <aside className="w-64 border-r border-[#393528] bg-[#181611] flex flex-col p-4 gap-2 hidden lg:flex">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#393528] text-[#f4c025]">
                <span className="material-symbols-outlined">dashboard</span>
                <p className="text-white text-sm font-medium leading-normal">Dashboard</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-[#bab29c]">
                <span className="material-symbols-outlined">person_add</span>
                <p className="text-sm font-medium leading-normal">Admissions</p>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-[#bab29c]">
                <span className="material-symbols-outlined">menu_book</span>
                <p className="text-sm font-medium leading-normal">Academics</p>
              </div>
            </aside>
            {/* Content Area Mock */}
            <main className="flex-1 p-8 bg-[#181611]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
                <div className="h-40 rounded-lg bg-[#27241b] border border-[#393528]"></div>
                <div className="h-40 rounded-lg bg-[#27241b] border border-[#393528]"></div>
                <div className="h-40 rounded-lg bg-[#27241b] border border-[#393528]"></div>
                <div className="h-96 rounded-lg bg-[#27241b] border border-[#393528] col-span-2"></div>
                <div className="h-96 rounded-lg bg-[#27241b] border border-[#393528]"></div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        {/* Modal Container */}
        <div className="relative w-full max-w-[900px] bg-[#1a1814] border border-[#393528] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
           {/* Close Button */}
           <button className="absolute top-4 right-4 text-[#bab29c] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 z-20">
             <span className="material-symbols-outlined text-xl">close</span>
           </button>

           {/* Left Column: Visual/Welcome */}
           <div className="w-full md:w-5/12 bg-[#221e10] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#393528] relative overflow-hidden">
             {/* Background accent */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f4c025]/0 via-[#f4c025] to-[#f4c025]/0 opacity-50"></div>
             
             <div className="space-y-6 z-10 relative">
               <div className="size-12 rounded-lg bg-[#f4c025]/10 flex items-center justify-center text-[#f4c025] mb-4 border border-[#f4c025]/20">
                 <span className="material-symbols-outlined text-3xl">school</span>
               </div>
               <div>
                 <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Command Center</h1>
                 <p className="text-[#bab29c] text-base leading-relaxed">Experience the new standard in K-12 institutional management. We've redesigned your workflow for clarity and speed.</p>
               </div>
             </div>

             <div className="mt-12 space-y-6 relative z-10">
               <ValueProp icon="cut" title="Efficiency" desc="Streamlined workflows for staff and faculty." />
               <ValueProp icon="visibility" title="Clarity" desc="Data-driven insights at a glance." />
               <ValueProp icon="verified_user" title="Authority" desc="Total control over administrative governance." />
             </div>
           </div>

           {/* Right Column: Choices */}
           <div className="w-full md:w-7/12 bg-[#1a1814] p-8 flex flex-col justify-center">
             <div className="mb-8">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-xs font-bold text-[#f4c025] uppercase tracking-widest">Onboarding Step 1 of 3</span>
                 <div className="flex gap-1">
                   <div className="w-8 h-1 bg-[#f4c025] rounded-full"></div>
                   <div className="w-8 h-1 bg-[#393528] rounded-full"></div>
                   <div className="w-8 h-1 bg-[#393528] rounded-full"></div>
                 </div>
               </div>
               <h2 className="text-2xl font-bold text-white">How would you like to get started?</h2>
             </div>

             <div className="active-options grid gap-4">
               <OnboardingOption 
                 icon="explore" 
                 title="Take a Tour" 
                 desc="Step-by-step interactive guide through the platform." 
                 href="/admin/dashboard"
               />
               <OnboardingOption 
                 icon="play_arrow" 
                 title="Watch Overview" 
                 desc="Quick 2-minute video introduction to key features." 
                 href="#"
               />
               <OnboardingOption 
                 icon="rocket_launch" 
                 title="Jump Right In" 
                 desc="Skip the intro and explore on my own." 
                 href="/admin/dashboard"
               />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ValueProp({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-[#f4c025] mt-1">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3 className="text-white font-bold text-sm uppercase tracking-wide">{title}</h3>
        <p className="text-[#8e8675] text-sm">{desc}</p>
      </div>
    </div>
  );
}

function OnboardingOption({ icon, title, desc, href }: any) {
  return (
    <Link href={href} className="group relative flex items-center gap-4 p-5 rounded-lg border border-[#393528] bg-[#221e10] hover:bg-[#2a261a] hover:border-[#f4c025]/50 transition-all duration-300 text-left">
      <div className="size-12 rounded-full bg-[#393528] group-hover:bg-[#f4c025] group-hover:text-black text-white flex items-center justify-center transition-colors duration-300 shrink-0">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white group-hover:text-[#f4c025] transition-colors">{title}</h3>
        <p className="text-[#8e8675] text-sm">{desc}</p>
      </div>
      <div className="text-[#393528] group-hover:text-[#f4c025] transition-colors">
        <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </Link>
  );
}
