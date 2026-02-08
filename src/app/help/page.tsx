'use client';

import React from 'react';

export default function HelpCenterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-white font-sans transition-colors duration-200">
      {/* Top Nav skipped (layout) */}
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-[#1142d4] relative overflow-hidden">
           {/* Decorative abstract background pattern (CSS radial gradient approximation) */}
           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,white_0%,transparent_20%),radial-gradient(circle_at_80%_30%,white_0%,transparent_20%)]"></div>
           
           <div className="flex flex-col items-center justify-center py-16 px-4 md:px-10 relative z-10">
             <div className="text-center max-w-2xl mb-8">
               <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                 Welcome to the Help Center
               </h1>
               <p className="text-blue-100 text-base md:text-lg font-normal leading-normal">
                 How can we assist you today? Search our knowledge base for guides and tutorials.
               </p>
             </div>
             
             {/* Search Bar */}
             <div className="w-full max-w-[640px]">
               <div className="flex w-full items-stretch rounded-lg h-14 md:h-16 shadow-lg">
                 <div className="text-[#616b89] flex bg-white dark:bg-[#1a202c] items-center justify-center pl-5 rounded-l-lg border-r border-transparent">
                   <span className="material-symbols-outlined text-[24px]">search</span>
                 </div>
                 <input className="flex w-full flex-1 border-0 text-[#111318] dark:text-white focus:ring-0 bg-white dark:bg-[#1a202c] h-full placeholder:text-[#616b89] px-4 text-base font-normal leading-normal appearance-none" placeholder="Search for articles, guides, or videos..." />
                 <div className="flex items-center justify-center rounded-r-lg bg-white dark:bg-[#1a202c] pr-2 pl-2">
                   <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-[#1142d4] hover:bg-blue-700 text-white text-sm font-bold leading-normal transition-colors">
                     Search
                   </button>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Column: Categories */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Browse by Topic */}
              <section>
                <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">Browse by Topic</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <TopicCard title="Getting Started" desc="Setup guides for new staff, teachers, and students." icon="rocket_launch" />
                   <TopicCard title="Admin Workflows" desc="Enrollment configuration, billing cycles, and reporting." icon="settings_suggest" />
                   <TopicCard title="Teacher Gradebooks" desc="Grading policies, attendance tracking, and assignments." icon="auto_stories" />
                   <TopicCard title="Student Portals" desc="Accessing report cards, transcripts, and messages." icon="account_circle" />
                </div>
              </section>

              {/* Featured Videos */}
              <section className="mt-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">New Video Tutorials</h2>
                  <a className="text-[#1142d4] text-sm font-bold hover:underline" href="#">View all videos</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <VideoCard title="Gradebook Setup 101" meta="5 min watch • Updated yesterday" />
                  <VideoCard title="Managing Enrollment Periods" meta="8 min watch • Updated 3 days ago" />
                </div>
              </section>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               {/* System Status */}
               <div className="bg-white dark:bg-[#1a202c] rounded-lg border border-[#dbdee6] dark:border-gray-700 p-5 shadow-sm">
                 <div className="flex items-center gap-2 mb-2">
                   <h3 className="font-bold text-[#111318] dark:text-white text-base">System Status</h3>
                 </div>
                 <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-100 dark:border-emerald-800">
                   <div className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                   </div>
                   <span className="text-sm font-medium text-emerald-800 dark:text-emerald-400">All Systems Operational</span>
                 </div>
                 <div className="mt-3 text-xs text-[#616b89] dark:text-gray-400 text-right">
                   Version v2.4.1
                 </div>
               </div>

               {/* Most Viewed */}
               <div className="bg-white dark:bg-[#1a202c] rounded-lg border border-[#dbdee6] dark:border-gray-700 p-5 shadow-sm">
                 <h3 className="font-bold text-[#111318] dark:text-white text-lg mb-4">Most Viewed Articles</h3>
                 <div className="flex flex-col gap-0">
                   <ArticleLink title="Resetting Parent Passwords" meta="Admin • 2k views" icon="article" />
                   <ArticleLink title="Generating Term Reports" meta="Teachers • 1.5k views" icon="article" />
                   <ArticleLink title="Video: Attendance Workflow" meta="Training • 900 views" icon="play_circle" />
                   <ArticleLink title="Importing Student Data (CSV)" meta="Admin • 850 views" icon="article" />
                   <ArticleLink title="Configuring Academic Years" meta="Admin • 700 views" icon="article" last={true} />
                 </div>
               </div>
               
               {/* Contact Box */}
               <div className="bg-[#1142d4]/5 rounded-lg border border-[#1142d4]/20 p-5">
                 <div className="flex items-center gap-3 mb-2">
                   <span className="material-symbols-outlined text-[#1142d4] text-2xl">support_agent</span>
                   <h3 className="font-bold text-[#111318] dark:text-white text-base">Still need help?</h3>
                 </div>
                 <p className="text-sm text-[#616b89] dark:text-gray-400 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
                 <button className="w-full cursor-pointer rounded-lg h-10 bg-white dark:bg-[#1a202c] border border-gray-300 dark:border-gray-600 hover:border-[#1142d4] text-[#1142d4] text-sm font-bold shadow-sm transition-colors">
                    Contact Support
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-[#1a202c] border-t border-[#f0f1f4] dark:border-gray-800 mt-auto">
        <div className="max-w-[1200px] mx-auto px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#616b89] dark:text-gray-500 text-sm">© 2023 SchoolManage Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-[#616b89] dark:text-gray-400 hover:text-[#1142d4] text-sm" href="#">Privacy Policy</a>
            <a className="text-[#616b89] dark:text-gray-400 hover:text-[#1142d4] text-sm" href="#">Terms of Service</a>
            <a className="text-[#616b89] dark:text-gray-400 hover:text-[#1142d4] text-sm" href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TopicCard({ title, desc, icon }: any) {
  return (
    <a className="group flex flex-col gap-4 rounded-xl border border-[#dbdee6] dark:border-gray-700 bg-white dark:bg-[#1a202c] p-6 hover:shadow-md hover:border-[#1142d4] transition-all duration-200" href="#">
      <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#1142d4] dark:text-blue-400 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-[#111318] dark:text-white text-lg font-bold leading-tight group-hover:text-[#1142d4] transition-colors">{title}</h3>
        <p className="text-[#616b89] dark:text-gray-400 text-sm leading-normal">{desc}</p>
      </div>
    </a>
  );
}

function VideoCard({ title, meta }: any) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-[#dbdee6] dark:border-gray-700 bg-white dark:bg-[#1a202c] group cursor-pointer hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center">
         <div className="absolute inset-0 bg-black/5 dark:bg-black/40 group-hover:bg-black/10 transition-colors"></div>
         <span className="material-symbols-outlined text-white text-5xl opacity-90 drop-shadow-lg z-10 group-hover:scale-110 transition-transform">play_circle</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#111318] dark:text-white mb-1 group-hover:text-[#1142d4] transition-colors">{title}</h3>
        <p className="text-xs text-[#616b89] dark:text-gray-400">{meta}</p>
      </div>
    </div>
  );
}

function ArticleLink({ title, meta, icon, last }: any) {
  return (
    <a className={`flex items-start gap-3 py-3 ${!last ? 'border-b border-[#f0f1f4] dark:border-gray-800' : ''} hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-5 px-5 transition-colors group`} href="#">
      <span className="material-symbols-outlined text-gray-400 text-xl mt-0.5 group-hover:text-[#1142d4] transition-colors">{icon}</span>
      <div>
        <p className="text-sm font-medium text-[#1142d4] hover:underline">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{meta}</p>
      </div>
    </a>
  );
}
