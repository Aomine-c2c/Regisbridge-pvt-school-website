'use client';

import React from 'react';

export default function LibraryProcurementPage() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen bg-[#f6f7f8] dark:bg-[#101922]">
      {/* Top Navigation Bar is handled by Main Layout */}

      {/* Main Content */}
      <main className="flex-1 p-6 md:px-8 py-6 max-w-[1600px] mx-auto w-full overflow-y-auto">
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm text-[#64748b] dark:text-[#94a3b8]">
              <a className="hover:text-primary" href="/admin/library">
                Library
              </a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <a className="hover:text-primary" href="#">
                Cataloging
              </a>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-medium text-[#0f172a] dark:text-white">New Acquisition</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[#0f172a] dark:text-white">
              Procurement &amp; Cataloging
            </h1>
            <p className="text-[#64748b] dark:text-[#94a3b8]">
              Process new books, approve wishlist items, and print barcode labels.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#334155] dark:text-[#e2e8f0] font-bold text-sm hover:bg-[#f8fafc] dark:hover:bg-[#334155] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              <span>Bulk Import CSV</span>
            </button>
            <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] text-[#334155] dark:text-[#e2e8f0] font-bold text-sm hover:bg-[#f8fafc] dark:hover:bg-[#334155] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Recent Logs</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Procurement Queue (Wishlist) */}
          <aside className="col-span-1 lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
            <div className="bg-white dark:bg-[#1c242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#f1f5f9] dark:border-[#334155] flex justify-between items-center bg-[#f8fafc] dark:bg-[#15202b]">
                <h3 className="font-bold text-[#1e293b] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">list_alt</span>
                  Requests Queue
                </h3>
                <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs font-bold px-2 py-1 rounded-full">
                  12 Pending
                </span>
              </div>
              <div className="divide-y divide-[#f1f5f9] dark:divide-[#334155] max-h-[600px] overflow-y-auto">
                {/* Request Item 1 */}
                <div className="p-4 hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-[#0f172a] dark:text-white line-clamp-2">
                      The Midnight Library
                    </h4>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                      12 votes
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                    Req: Grade 10 English • Matt Haig
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 h-8 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all">
                      <span className="material-symbols-outlined text-[16px]">check</span> Approve
                    </button>
                    <button className="size-8 flex items-center justify-center rounded bg-[#f1f5f9] dark:bg-[#334155] text-[#64748b] dark:text-[#94a3b8] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                </div>
                {/* Request Item 2 */}
                <div className="p-4 hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-[#0f172a] dark:text-white line-clamp-2">
                      Project Hail Mary
                    </h4>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                      8 votes
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                    Req: Student Council • Andy Weir
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 h-8 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all">
                      <span className="material-symbols-outlined text-[16px]">check</span> Approve
                    </button>
                    <button className="size-8 flex items-center justify-center rounded bg-[#f1f5f9] dark:bg-[#334155] text-[#64748b] dark:text-[#94a3b8] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                </div>
                {/* Request Item 3 */}
                <div className="p-4 hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50 transition-colors group border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-900/10">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-[#0f172a] dark:text-white line-clamp-2">
                      Atomic Habits
                    </h4>
                    <span className="text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                      Approved
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                    Req: Staff (J. Smith)
                  </p>
                  <button className="w-full flex items-center justify-center gap-1 h-8 rounded bg-green-600 text-white hover:bg-green-700 text-xs font-bold transition-all shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">shopping_cart</span>{' '}
                    Order Now
                  </button>
                </div>
                {/* Request Item 4 */}
                <div className="p-4 hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-[#0f172a] dark:text-white line-clamp-2">
                      Sapiens: A Brief History
                    </h4>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
                      5 votes
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mb-3">
                    Req: History Dept • Yuval Noah Harari
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 h-8 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all">
                      <span className="material-symbols-outlined text-[16px]">check</span> Approve
                    </button>
                    <button className="size-8 flex items-center justify-center rounded bg-[#f1f5f9] dark:bg-[#334155] text-[#64748b] dark:text-[#94a3b8] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-[#f1f5f9] dark:border-[#334155] bg-[#f8fafc] dark:bg-[#15202b]">
                <button className="w-full text-center text-xs font-bold text-[#64748b] hover:text-primary transition-colors">
                  View All Requests
                </button>
              </div>
            </div>
            {/* Quick Stats / Budget */}
            <div className="bg-white dark:bg-[#1c242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm p-4">
              <h3 className="font-bold text-[#1e293b] dark:text-white text-sm mb-3">
                Budget Status
              </h3>
              <div className="mb-2 flex justify-between text-xs text-[#64748b]">
                <span>Library Fund (FY24)</span>
                <span className="font-mono text-[#1e293b] dark:text-white">$4,250 left</span>
              </div>
              <div className="w-full bg-[#f1f5f9] dark:bg-[#334155] rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </aside>

          {/* Main Panel: Cataloging Wizard */}
          <section className="col-span-1 lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {/* Stepper */}
            <div className="flex items-center w-full max-w-3xl mx-auto mb-2">
              <div className="flex items-center relative">
                <div className="rounded-full transition duration-500 ease-in-out size-8 flex items-center justify-center bg-primary text-white font-bold text-sm ring-4 ring-primary/20 z-10">
                  1
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-bold text-primary uppercase">
                  Source
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-primary"></div>
              <div className="flex items-center relative">
                <div className="rounded-full transition duration-500 ease-in-out size-8 flex items-center justify-center bg-primary text-white font-bold text-sm ring-4 ring-primary/20 z-10">
                  2
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-bold text-primary uppercase">
                  Metadata
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-[#e2e8f0] dark:border-[#334155]"></div>
              <div className="flex items-center relative">
                <div className="rounded-full transition duration-500 ease-in-out size-8 flex items-center justify-center bg-[#e2e8f0] dark:bg-[#334155] text-[#64748b] font-bold text-sm z-10">
                  3
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-bold text-[#94a3b8] uppercase">
                  Classify
                </div>
              </div>
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-[#e2e8f0] dark:border-[#334155]"></div>
              <div className="flex items-center relative">
                <div className="rounded-full transition duration-500 ease-in-out size-8 flex items-center justify-center bg-[#e2e8f0] dark:bg-[#334155] text-[#64748b] font-bold text-sm z-10">
                  4
                </div>
                <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-bold text-[#94a3b8] uppercase">
                  Inventory
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-[#1c242f] rounded-xl border border-[#e5e7eb] dark:border-[#283039] shadow-sm mt-6">
              {/* Step 1: ISBN Search */}
              <div className="p-6 border-b border-[#f1f5f9] dark:border-[#334155] bg-[#f8fafc] dark:bg-[#15202b] rounded-t-xl">
                <label className="block text-sm font-bold text-[#334155] dark:text-[#cbd5e1] mb-2 uppercase tracking-wide">
                  Step 1: Auto-fill from ISBN
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-[#94a3b8]">
                        qr_code_scanner
                      </span>
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-3 border border-[#cbd5e1] dark:border-[#475569] rounded-lg leading-5 bg-white dark:bg-[#1e293b] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow shadow-sm dark:text-white"
                      placeholder="Scan or type ISBN-13 (e.g. 9780140449136)"
                      type="text"
                    />
                  </div>
                  <button className="bg-[#1e293b] dark:bg-[#334155] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#334155] dark:hover:bg-[#475569] transition-colors shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    Fetch Data
                  </button>
                </div>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Fields Area */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Section: Book Details */}
                  <div>
                    <h4 className="text-lg font-bold text-[#0f172a] dark:text-white mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">menu_book</span> Book
                      Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Title
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm"
                          type="text"
                          defaultValue="Educated: A Memoir"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Subtitle
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Author(s)
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm"
                          type="text"
                          defaultValue="Tara Westover"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Publisher
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm"
                          type="text"
                          defaultValue="Random House"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Publication Year
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm"
                          type="number"
                          defaultValue="2018"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Edition / Format
                        </label>
                        <select className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm">
                          <option>Hardcover</option>
                          <option>Paperback</option>
                          <option>E-Book</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Section: Classification */}
                  <div className="pt-4 border-t border-[#f1f5f9] dark:border-[#334155]">
                    <h4 className="text-lg font-bold text-[#0f172a] dark:text-white mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">category</span>{' '}
                      Classification
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Dewey Decimal (DDC)
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm font-mono"
                          type="text"
                          defaultValue="920"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Cutter Number
                        </label>
                        <input
                          className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm font-mono"
                          type="text"
                          defaultValue="WES"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Shelf Location
                        </label>
                        <select className="w-full rounded-md border-[#cbd5e1] dark:border-[#475569] bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white focus:border-primary focus:ring-primary shadow-sm text-sm">
                          <option>Main Library - Bio</option>
                          <option>Reference</option>
                          <option>Reserves</option>
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-[#64748b] uppercase mb-1">
                          Subject Tags
                        </label>
                        <div className="flex flex-wrap gap-2 p-2 border border-[#cbd5e1] dark:border-[#475569] rounded-md bg-white dark:bg-[#1e293b]">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Biography
                            <button className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600">
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Memoir
                            <button className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600">
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </span>
                          <input
                            className="border-none focus:ring-0 p-0 text-sm bg-transparent w-24 outline-none dark:text-white"
                            placeholder="+ Add tag"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar: Inventory & Barcode */}
                <div className="flex flex-col gap-6">
                  {/* Inventory Box */}
                  <div className="bg-[#f8fafc] dark:bg-[#1e293b]/50 rounded-lg p-4 border border-[#e2e8f0] dark:border-[#334155]">
                    <h5 className="font-bold text-[#0f172a] dark:text-white mb-3 text-sm uppercase">
                      Inventory Data
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] mb-1">
                          Accession ID (Auto)
                        </label>
                        <input
                          className="w-full rounded bg-[#e2e8f0] dark:bg-[#334155] border-transparent text-[#475569] dark:text-[#94a3b8] text-sm font-mono cursor-not-allowed"
                          disabled
                          type="text"
                          defaultValue="LIB-2023-0892"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] mb-1">
                          Cost / Price
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-[#64748b] text-sm">$</span>
                          </div>
                          <input
                            className="w-full rounded border-[#cbd5e1] dark:border-[#475569] pl-7 text-sm bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white"
                            type="text"
                            defaultValue="28.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#64748b] mb-1">
                          Funding Source
                        </label>
                        <select className="w-full rounded border-[#cbd5e1] dark:border-[#475569] text-sm bg-white dark:bg-[#1e293b] text-[#0f172a] dark:text-white">
                          <option>General Fund</option>
                          <option>English Dept</option>
                          <option>Donation</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Barcode Preview */}
                  <div className="bg-white dark:bg-[#0f172a] rounded-lg p-6 border-2 border-dashed border-[#cbd5e1] dark:border-[#334155] flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-bold text-[#94a3b8] uppercase mb-4 tracking-widest">
                      Label Preview
                    </p>
                    {/* The Label */}
                    <div className="w-48 h-28 bg-white border border-[#e2e8f0] shadow-md p-3 flex flex-col items-center justify-between rounded-sm">
                      <div className="text-[10px] font-bold text-[#0f172a] uppercase tracking-wider">
                        School Library
                      </div>
                      <div className="flex flex-col items-center w-full">
                        <div
                          className="mb-1 opacity-80 w-full h-10"
                          style={{
                            backgroundImage:
                              'linear-gradient(90deg, #000 0%, #000 5%, transparent 5%, transparent 8%, #000 8%, #000 11%, transparent 11%, transparent 15%, #000 15%, #000 20%, transparent 20%, transparent 22%, #000 22%, #000 28%, transparent 28%, transparent 32%, #000 32%, #000 35%, transparent 35%, transparent 38%, #000 38%, #000 45%, transparent 45%, transparent 48%, #000 48%, #000 52%, transparent 52%, transparent 55%, #000 55%, #000 65%, transparent 65%, transparent 68%, #000 68%, #000 75%, transparent 75%, transparent 80%, #000 80%, #000 85%, transparent 85%, transparent 88%, #000 88%, #000 95%, transparent 95%, transparent 100%)',
                          }}
                        ></div>
                        <div className="text-[10px] font-mono text-[#475569] tracking-widest">
                          LIB-2023-0892
                        </div>
                      </div>
                      <div className="flex justify-between w-full border-t border-black pt-1 mt-1 text-black">
                        <span className="text-[12px] font-black font-mono leading-none">920</span>
                        <span className="text-[12px] font-black font-mono leading-none">WES</span>
                        <span className="text-[10px] font-bold leading-none">2018</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <input
                        defaultChecked
                        className="rounded border-[#cbd5e1] text-primary focus:ring-primary"
                        type="checkbox"
                      />
                      <label className="text-sm text-[#475569] dark:text-[#94a3b8]">
                        Print label on save
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Actions Footer */}
              <div className="px-8 py-5 bg-[#f8fafc] dark:bg-[#15202b] border-t border-[#e2e8f0] dark:border-[#334155] rounded-b-xl flex justify-between items-center">
                <button className="text-[#64748b] hover:text-[#1e293b] dark:text-[#94a3b8] dark:hover:text-white font-bold text-sm">
                  Cancel
                </button>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white dark:bg-[#1e293b] border border-[#cbd5e1] dark:border-[#475569] rounded-lg text-[#334155] dark:text-white font-bold text-sm hover:bg-[#f8fafc] dark:hover:bg-[#334155] transition-colors shadow-sm">
                    Save &amp; Add Another
                  </button>
                  <button className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    Save &amp; Print Label
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Acquisitions Table (Optional) */}
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-bold text-[#0f172a] dark:text-white mb-4">
                Recent Acquisitions
              </h3>
              <div className="overflow-x-auto rounded-lg border border-[#e2e8f0] dark:border-[#334155]">
                <table className="w-full text-left text-sm text-[#475569] dark:text-[#cbd5e1]">
                  <thead className="bg-[#f8fafc] dark:bg-[#1e293b] text-xs uppercase font-bold text-[#64748b]">
                    <tr>
                      <th className="px-6 py-3">Accession ID</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Author</th>
                      <th className="px-6 py-3">Call Number</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9] dark:divide-[#334155] bg-white dark:bg-[#1c242f]">
                    <tr className="hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50">
                      <td className="px-6 py-4 font-mono text-xs">LIB-2023-0891</td>
                      <td className="px-6 py-4 font-medium text-[#0f172a] dark:text-white">
                        Dune
                      </td>
                      <td className="px-6 py-4">Frank Herbert</td>
                      <td className="px-6 py-4 font-mono">F HER</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Available
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f8fafc] dark:hover:bg-[#1e293b]/50">
                      <td className="px-6 py-4 font-mono text-xs">LIB-2023-0890</td>
                      <td className="px-6 py-4 font-medium text-[#0f172a] dark:text-white">
                        1984
                      </td>
                      <td className="px-6 py-4">George Orwell</td>
                      <td className="px-6 py-4 font-mono">F ORW</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Processing
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
