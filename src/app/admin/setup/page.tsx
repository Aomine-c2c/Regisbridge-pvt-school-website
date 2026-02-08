'use client';

import React, { useState } from 'react';

export default function SetupPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f6f6f8] dark:bg-[#101522] font-sans transition-colors duration-200 overflow-hidden relative">
      {/* Background Mock (Blurred) */}
      <div className="absolute inset-0 z-0 opacity-40 blur-[1px] pointer-events-none select-none flex flex-col">
         {/* Mock Header */}
         <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151a29]"></div>
         <div className="flex flex-1">
            <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151a29] hidden md:block"></div>
            <div className="flex-1 p-8 bg-[#f6f6f8] dark:bg-[#101522]">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="h-32 rounded-xl bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-800"></div>
                  <div className="h-32 rounded-xl bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-800"></div>
                  <div className="h-32 rounded-xl bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-800"></div>
               </div>
               <div className="h-96 rounded-xl bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-800"></div>
            </div>
         </div>
      </div>

      {/* Setup Widget (Centered for this page view, or docked right as per design) */}
      {/* We'll center it for the Route view to make it the focus */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto h-[80vh] flex flex-col bg-white dark:bg-[#111318] border border-gray-200 dark:border-gray-800 shadow-2xl rounded-xl overflow-hidden">
        {/* Widget Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-[#1142d4]/10 rounded-lg text-[#1142d4]">
               <span className="material-symbols-outlined text-xl">rocket_launch</span>
             </div>
             <h2 className="text-xl font-bold tracking-tight text-[#111317] dark:text-white">Setup Progress</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
           {/* Progress Section */}
           <div className="px-6 pt-6 pb-2">
             <div className="bg-gradient-to-r from-gray-50 to-white dark:from-[#1e2330] dark:to-[#1a1f2b] p-5 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
               <div className="flex justify-between items-end mb-3">
                 <div>
                   <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-xs mb-1">Getting Started</p>
                   <div className="flex items-baseline gap-1">
                     <span className="text-3xl font-bold text-[#1142d4]">35%</span>
                     <span className="text-sm text-gray-500 dark:text-gray-400">completed</span>
                   </div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 animate-pulse">
                   <span className="material-symbols-outlined">emoji_events</span>
                 </div>
               </div>
               <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                 <div className="h-full bg-[#1142d4] rounded-full transition-all duration-1000 ease-out w-[35%] shadow-[0_0_10px_rgba(17,66,212,0.5)]"></div>
               </div>
               <p className="text-xs text-gray-400 mt-3">Keep going! You're closer to launching your school portal.</p>
             </div>
           </div>

           {/* Task Lists */}
           <div className="p-6 space-y-4">
              {/* Section 1 */}
              <DetailsSection title="Core Configuration" icon="settings" align="open">
                 <CompletedItem text="Configure Academic Year" />
                 <InProgressItem text="Set Up Boarding Houses" />
              </DetailsSection>

              {/* Section 2 */}
              <DetailsSection title="People & Roles" icon="group" align="open">
                 <TodoItem text="Upload Staff Directory" sub="Import CSV or Excel files" />
                 <TodoItem text="Import Student Records" />
              </DetailsSection>

              {/* Section 3 */}
              <DetailsSection title="Financials" icon="account_balance">
                 <TodoItem text="Define Fee Structures" />
              </DetailsSection>

               {/* Section 4 */}
              <DetailsSection title="System Settings" icon="dns">
                 <div className="p-4 text-sm text-gray-400 text-center">Additional configuration options...</div>
              </DetailsSection>
           </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#151820]">
          <a className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#1142d4] dark:hover:text-[#1142d4] transition-colors group" href="#">
            <span className="material-symbols-outlined text-[18px]">headset_mic</span>
            <span>Need Help? Contact Support</span>
            <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">arrow_outward</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function DetailsSection({ title, icon, children, align }: any) {
  return (
    <details className="group bg-white dark:bg-[#282c39] rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden" open={align === 'open'}>
      <summary className="flex cursor-pointer items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#202430] hover:bg-gray-100 dark:hover:bg-[#252a38] transition-colors select-none list-none">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-gray-400 text-[20px]">{icon}</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
        <span className="material-symbols-outlined text-gray-400 transition-transform duration-300 group-open:rotate-180 text-[20px]">expand_more</span>
      </summary>
      <div className="flex flex-col p-2 gap-1 bg-white dark:bg-[#1e2330]">
        {children}
      </div>
    </details>
  );
}

function CompletedItem({ text }: any) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2e3342] group/item transition-all">
      <span className="material-symbols-outlined text-emerald-500 text-[22px]">check_circle</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 line-through decoration-gray-500">{text}</p>
      </div>
      <button className="text-emerald-500 opacity-0 group-hover/item:opacity-100 transition-opacity p-1.5 hover:bg-emerald-500/10 rounded-md" title="Review">
        <span className="material-symbols-outlined text-[18px]">edit</span>
      </button>
    </div>
  );
}

function InProgressItem({ text }: any) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1142d4]/5 dark:bg-[#1142d4]/10 border border-[#1142d4]/20 hover:bg-[#1142d4]/10 transition-all group/item">
      <span className="material-symbols-outlined text-amber-500 text-[22px]">pending</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{text}</p>
        <p className="text-xs text-amber-500 font-medium mt-0.5">In Progress</p>
      </div>
      <button className="bg-[#1142d4] text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1 group-hover/item:shadow-md">
        Continue
      </button>
    </div>
  );
}

function TodoItem({ text, sub }: any) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2e3342] group/item transition-all cursor-pointer">
      <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-[22px]">radio_button_unchecked</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{text}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <button className="text-[#1142d4] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 p-1.5 hover:bg-[#1142d4]/10 rounded-md">
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  );
}
