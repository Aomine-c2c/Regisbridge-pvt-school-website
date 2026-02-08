'use client';

import React from 'react';

export default function SupportPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-white font-sans transition-colors duration-200">
      {/* Top Nav skipped (layout) */}
      
      <main className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#2957e0] font-bold text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-lg">support_agent</span>
              <span>Help Center</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em] text-[#111317] dark:text-white">Support Concierge</h1>
            <p className="text-[#646d87] dark:text-gray-400 text-base max-w-2xl">
              Get assistance with technical issues, account inquiries, or general questions. We're here to help 24/7.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 text-sm font-bold text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
              <span>FAQs</span>
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#2957e0] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>New Ticket</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Tickets */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-[#1e2330] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-blue-300 transition-colors group cursor-pointer">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-[#2957e0] rounded-full mb-1 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h3 className="text-2xl font-black text-[#111317] dark:text-white">2</h3>
                <p className="text-xs font-bold text-[#646d87] dark:text-gray-400 uppercase tracking-wide">Open Tickets</p>
              </div>
              <div className="bg-white dark:bg-[#1e2330] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-amber-300 transition-colors group cursor-pointer">
                <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full mb-1 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">pending</span>
                </div>
                <h3 className="text-2xl font-black text-[#111317] dark:text-white">1</h3>
                <p className="text-xs font-bold text-[#646d87] dark:text-gray-400 uppercase tracking-wide">Pending Action</p>
              </div>
               <div className="bg-white dark:bg-[#1e2330] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center gap-1 hover:border-green-300 transition-colors group cursor-pointer">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full mb-1 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-[#111317] dark:text-white">14</h3>
                <p className="text-xs font-bold text-[#646d87] dark:text-gray-400 uppercase tracking-wide">Resolved</p>
              </div>
            </div>

            {/* Ticket List */}
            <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col flex-1">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#111317] dark:text-white">Recent Tickets</h3>
                <button className="text-[#2957e0] text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {/* Ticket 1 */}
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-start gap-4">
                  <div className="mt-1">
                     <span className="flex items-center justify-center size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#2957e0] font-bold text-xs ring-4 ring-white dark:ring-[#1e2330]">
                       #42
                     </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-[#111317] dark:text-white hover:text-[#2957e0] cursor-pointer">Unable to access Grade 10 Math resources</h4>
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-[#2957e0] dark:bg-blue-900/30 dark:text-blue-300">Open</span>
                    </div>
                    <p className="text-xs text-[#646d87] dark:text-gray-400 line-clamp-1">I'm trying to download the syllabus for the new semester but the link seems broken...</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#646d87]">
                       <span className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-[14px]">schedule</span> 2 hrs ago
                       </span>
                       <span className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-[14px]">person</span> You
                       </span>
                       <span className="flex items-center gap-1 text-orange-500">
                         <span className="material-symbols-outlined text-[14px]">question_answer</span> Waiting for support
                       </span>
                    </div>
                  </div>
                </div>
                {/* Ticket 2 */}
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-start gap-4">
                  <div className="mt-1">
                     <span className="flex items-center justify-center size-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 font-bold text-xs ring-4 ring-white dark:ring-[#1e2330]">
                       #38
                     </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-[#111317] dark:text-white hover:text-[#2957e0] cursor-pointer">Payment confirmation not received</h4>
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300">Resolved</span>
                    </div>
                    <p className="text-xs text-[#646d87] dark:text-gray-400 line-clamp-1">I made a payment for the field trip yesterday but haven't got the email receipt.</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#646d87]">
                       <span className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-[14px]">schedule</span> Yesterday
                       </span>
                       <span className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-[14px]">support_agent</span> Agent Sarah
                       </span>
                    </div>
                  </div>
                </div>
                {/* Ticket 3 */}
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-start gap-4">
                  <div className="mt-1">
                     <span className="flex items-center justify-center size-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-bold text-xs ring-4 ring-white dark:ring-[#1e2330]">
                       #35
                     </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-bold text-[#111317] dark:text-white hover:text-[#2957e0] cursor-pointer">Login issues on mobile app</h4>
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">Pending</span>
                    </div>
                    <p className="text-xs text-[#646d87] dark:text-gray-400 line-clamp-1">The app keeps crashing when I try to log in with my FaceID.</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-[#646d87]">
                       <span className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-[14px]">schedule</span> 2 days ago
                       </span>
                       <span className="flex items-center gap-1">
                         <span className="material-symbols-outlined text-[14px]">person</span> You
                       </span>
                       <span className="flex items-center gap-1 text-amber-600">
                         <span className="material-symbols-outlined text-[14px]">mark_email_unread</span> Action required
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Suggested Help */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-[#111317] dark:bg-black text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
               {/* Pattern */}
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <span className="material-symbols-outlined text-[100px]">support</span>
               </div>
               
               <h3 className="text-lg font-bold mb-2 relative z-10">Need Live Help?</h3>
               <p className="text-sm text-gray-300 mb-6 relative z-10">Start a chat with our support team for immediate assistance.</p>
               
               <button className="w-full h-12 bg-[#2957e0] text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-blue-900/50">
                   <span className="material-symbols-outlined">chat</span>
                   Start Live Chat
               </button>
                <p className="text-xs text-center text-gray-500 mt-3">Typical wait time: &lt; 2 mins</p>
            </div>

            <div className="bg-white dark:bg-[#1e2330] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
               <h3 className="text-lg font-bold text-[#111317] dark:text-white mb-4">Suggested Articles</h3>
               <div className="space-y-4">
                 <a href="#" className="flex gap-3 items-start group">
                   <span className="material-symbols-outlined text-gray-400 group-hover:text-[#2957e0] text-[20px] mt-0.5">article</span>
                   <div>
                     <p className="text-sm font-bold text-[#111317] dark:text-white group-hover:text-[#2957e0] transition-colors">How to reset your portal password</p>
                     <p className="text-xs text-[#646d87] mt-1">Guide • 2 min read</p>
                   </div>
                 </a>
                 <a href="#" className="flex gap-3 items-start group">
                   <span className="material-symbols-outlined text-gray-400 group-hover:text-[#2957e0] text-[20px] mt-0.5">article</span>
                   <div>
                     <p className="text-sm font-bold text-[#111317] dark:text-white group-hover:text-[#2957e0] transition-colors">Understanding your fee statement</p>
                     <p className="text-xs text-[#646d87] mt-1">FAQ • 5 min read</p>
                   </div>
                 </a>
                 <a href="#" className="flex gap-3 items-start group">
                   <span className="material-symbols-outlined text-gray-400 group-hover:text-[#2957e0] text-[20px] mt-0.5">article</span>
                   <div>
                     <p className="text-sm font-bold text-[#111317] dark:text-white group-hover:text-[#2957e0] transition-colors">Updating your contact information</p>
                     <p className="text-xs text-[#646d87] mt-1">Guide • 3 min read</p>
                   </div>
                 </a>
               </div>
               <button className="w-full mt-4 py-2 text-sm font-bold text-[#646d87] hover:text-[#2957e0] border border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#2957e0] transition-colors">
                 Visit Knowledge Base
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
