'use client';

import React, { useState } from 'react';

export default function ReleaseNotesPage() {
  const [filterType, setFilterType] = useState('All Categories');

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#111318] text-[#111317] dark:text-white font-sans transition-colors duration-200">
       {/* Top Nav skipped (layout) */}
      
      <main className="flex-grow">
         {/* Header Area */}
         <div className="bg-white dark:bg-[#111318] border-b border-[#282c39] px-4 md:px-10 py-6 mb-6">
            <div className="max-w-[1200px] mx-auto">
               <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-[#111317] dark:text-white mb-2">System Updates & Change Log</h1>
               <p className="text-[#646d87] dark:text-[#9da4b9] text-base font-normal max-w-2xl">
                 Track system evolution, new features, and technical impact assessments for the EduManage platform.
               </p>
               
               {/* Subscription Box */}
               <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-xl border border-[#3b4154] bg-[#f8fafc] dark:bg-[#181b25]">
                 <div className="flex items-center gap-4">
                   <div className="size-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#1142d4]">
                     <span className="material-symbols-outlined text-2xl">notifications_active</span>
                   </div>
                   <div>
                     <p className="text-[#111317] dark:text-white text-base font-bold leading-tight">Subscribe to Critical Updates</p>
                     <p className="text-[#646d87] dark:text-[#9da4b9] text-sm">Get notified about critical system changes and downtime via Email or SMS.</p>
                   </div>
                 </div>
                 <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#282c39] p-0.5 transition-colors has-[:checked]:bg-[#1142d4] has-[:checked]:justify-end">
                   <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                   <input defaultChecked className="hidden" type="checkbox" />
                 </label>
               </div>
            </div>
         </div>

         {/* Main Content Grid */}
         <div className="max-w-[1200px] mx-auto px-4 md:px-10 pb-20 flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar: Filters */}
            <aside className="hidden lg:flex flex-col w-64 gap-8 sticky top-6 h-fit shrink-0">
               {/* Search */}
               <div className="flex items-center bg-white dark:bg-[#282c39] border border-gray-200 dark:border-[#3b4154] rounded-lg h-10 px-3">
                 <span className="material-symbols-outlined text-gray-400">search</span>
                 <input className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-[#111317] dark:text-white" placeholder="Search logs..." />
               </div>

               {/* Type Filter */}
               <div className="flex flex-col gap-3">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-[#9da4b9]">Update Type</h3>
                 <div className="space-y-2">
                   <FilterCheckbox label="New Features" color="text-[#111317] dark:text-white" />
                   <FilterCheckbox label="Improvements" color="text-[#111317] dark:text-white" />
                   <FilterCheckbox label="Bug Fixes" color="text-[#111317] dark:text-white" />
                   <FilterCheckbox label="Critical / Security" color="text-red-600 dark:text-red-400 font-bold" />
                 </div>
               </div>

               {/* Module Filter */}
               <div className="flex flex-col gap-3">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-[#9da4b9]">System Modules</h3>
                 <div className="flex flex-wrap gap-2">
                   <ModuleTag label="Finance" active />
                   <ModuleTag label="Academics" />
                   <ModuleTag label="Dormitory" />
                   <ModuleTag label="Admissions" />
                   <ModuleTag label="Library" />
                 </div>
               </div>
            </aside>

            {/* Timeline Feed */}
            <div className="flex-1 relative pl-4 lg:pl-6">
               {/* Vertical Line */}
               <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-300 dark:bg-[#3b4154]"></div>
               
               <div className="flex flex-col gap-8">
                  {/* Release 1: Feature */}
                  <ReleaseCard 
                    version="v4.2.0"
                    date="Oct 24, 2023"
                    type="New Feature"
                    typeColor="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    tags={['Dormitory', 'Mobile App']}
                    title="New Dormitory QR Check-in Module"
                    desc="Boarding staff can now use the mobile app to scan student ID cards for rapid check-in/check-out during curfew hours. This update includes real-time syncing with the central attendance dashboard."
                    dots={[
                      "Added QR scanner to iOS and Android staff apps.",
                      "New \"Curfew Report\" available in the Dormitory dashboard.",
                      "Offline mode support for dorms with poor Wi-Fi connectivity."
                    ]}
                    impact={{
                      req: "iPadOS 15+ / Android 12+",
                      db: "New table: `dorm_scan_logs` (No downtime)"
                    }}
                  />

                  {/* Release 2: Bug Fix */}
                  <ReleaseCard 
                    version="v4.1.8"
                    date="Oct 20, 2023"
                    type="Improvement"
                    typeColor="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    tags={['Gradebook']}
                    title="Gradebook Calculation Precision Patch"
                    desc="Addressed a rounding discrepancy where weighted averages were rounding down at the 3rd decimal place. The system now uses standard rounding rules (round half up)."
                    impact={{
                      trigger: "Automatic re-calculation of current term grades scheduled for 02:00 AM server time."
                    }}
                    dotColor="bg-slate-400 dark:bg-slate-600"
                  />

                  {/* Release 3: Critical Security */}
                  <ReleaseCard 
                    version="v4.1.5"
                    date="Oct 15, 2023"
                    type="Critical Security"
                    typeIcon="security"
                    typeColor="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                    tags={['API', 'Core']}
                    title="API Authentication Protocol Update"
                    desc="We are deprecating legacy token authentication (v1) in favor of OAuth 2.0 flows. This is a mandatory update for all schools using custom integrations with the EduManage API."
                    dotColor="bg-red-500"
                    borderColor="border-red-200 dark:border-red-900/50"
                    bgColor="bg-red-50/50 dark:bg-red-900/10"
                    warning={{
                      title: "Action Required: IT Admin",
                      msg: "Legacy API tokens will stop working on Nov 30, 2023.",
                      sub: "Please review the \"Integration Settings\" panel and regenerate keys for all active webhooks."
                    }}
                  />
                  
                  {/* Load More */}
                  <div className="relative pl-8 pt-4">
                     <div className="absolute -left-[3px] top-6 size-2 rounded-full bg-gray-300 dark:bg-slate-600"></div>
                     <button className="text-sm font-medium text-[#646d87] dark:text-[#9da4b9] hover:text-[#1142d4] transition-colors flex items-center gap-2">
                       <span className="material-symbols-outlined text-lg">history</span>
                       Load older updates
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}

function FilterCheckbox({ label, color }: any) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input type="checkbox" defaultChecked className="rounded border-gray-300 dark:border-[#3b4154] bg-white dark:bg-[#282c39] text-[#1142d4] focus:ring-[#1142d4]" />
      <span className={`text-sm font-medium transition-colors ${color}`}>{label}</span>
    </label>
  );
}

function ModuleTag({ label, active }: any) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer border border-transparent transition-colors ${active ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-[#282c39] text-gray-600 dark:text-gray-400 hover:border-gray-400'}`}>
      {label}
    </span>
  );
}

function ReleaseCard({ version, date, type, typeColor, typeIcon, tags, title, desc, dots, impact, dotColor = "bg-[#1142d4]", borderColor = "border-gray-200 dark:border-[#3b4154]", bgColor = "bg-white dark:bg-[#1e232e]", warning }: any) {
  return (
    <div className="relative pl-8">
       {/* Timeline Dot */}
       <div className={`absolute -left-[5px] top-6 size-3 rounded-full ${dotColor} ring-4 ring-bg-[#f6f6f8] dark:ring-[#111318]`}></div>
       
       <div className={`flex flex-col gap-4 rounded-xl border ${borderColor} ${bgColor} p-6 shadow-sm hover:shadow-md transition-shadow`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-[#282c39] pb-4">
             <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                   <h3 className="text-xl font-bold text-[#111317] dark:text-white">{version}</h3>
                   <span className={`${typeColor} text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-1`}>
                      {typeIcon && <span className="material-symbols-outlined text-xs">{typeIcon}</span>}
                      {type}
                   </span>
                </div>
                <p className="text-sm text-[#646d87] dark:text-[#9da4b9]">Released on {date}</p>
             </div>
             {type !== 'Critical Security' && (
               <button className="flex items-center gap-2 text-sm font-medium text-[#1142d4] hover:text-blue-400 transition-colors">
                 <span>Read Documentation</span>
                 <span className="material-symbols-outlined text-base">open_in_new</span>
               </button>
             )}
              {type === 'Critical Security' && (
               <button className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 transition-colors">
                 <span>Security Bulletin</span>
                 <span className="material-symbols-outlined text-base">shield</span>
               </button>
             )}
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
               {tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{tag}</span>
               ))}
            </div>
            <h4 className="text-lg font-semibold text-[#111317] dark:text-gray-200 mb-2">{title}</h4>
            <p className="text-[#646d87] dark:text-gray-400 leading-relaxed mb-4">{desc}</p>
            
            {dots && (
               <ul className="list-disc list-inside text-[#646d87] dark:text-gray-400 space-y-1 ml-2 mb-4 text-sm">
                  {dots.map((dot: string, i: number) => <li key={i}>{dot}</li>)}
               </ul>
            )}
          </div>

          {/* Technical Impact Box */}
          {impact && (
            <div className="mt-2 rounded-lg bg-gray-50 dark:bg-[#151921] border border-gray-200 dark:border-[#282c39] overflow-hidden">
               <div className="px-4 py-2 bg-gray-100 dark:bg-[#282c39] border-b border-gray-200 dark:border-[#3b4154] flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-sm">construction</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#646d87] dark:text-gray-300">Technical Impact Assessment</span>
               </div>
               <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {impact.req && (
                    <div>
                      <p className="text-[#9da4b9] text-xs uppercase mb-1">Requirements</p>
                      <p className="text-[#111317] dark:text-gray-300 font-mono text-xs">{impact.req}</p>
                    </div>
                  )}
                  {impact.db && (
                    <div>
                       <p className="text-[#9da4b9] text-xs uppercase mb-1">Database Impact</p>
                       <p className="text-[#111317] dark:text-gray-300 font-mono text-xs">{impact.db}</p>
                    </div>
                  )}
                  {impact.trigger && (
                     <div>
                       <p className="text-[#9da4b9] text-xs uppercase mb-1">Process Trigger</p>
                       <p className="text-[#111317] dark:text-gray-300 font-mono text-xs">{impact.trigger}</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* Warning Box */}
          {warning && (
             <div className="mt-2 rounded-lg bg-red-100/50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 overflow-hidden">
               <div className="px-4 py-2 bg-red-100 dark:bg-red-900/20 border-b border-red-200 dark:border-red-900/40 flex items-center gap-2">
                 <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
                 <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300">{warning.title}</span>
               </div>
               <div className="p-4 text-sm">
                 <p className="text-red-800 dark:text-red-200 text-sm mb-2 font-medium">{warning.msg}</p>
                 <p className="text-[#646d87] dark:text-gray-400 text-xs">{warning.sub}</p>
               </div>
             </div>
          )}
       </div>
    </div>
  );
}
