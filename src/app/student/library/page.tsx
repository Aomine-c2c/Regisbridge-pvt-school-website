'use client';

import React, { useEffect, useState } from 'react';

interface BookItem {
  id: string;
  title: string;
  author: string;
  coverImage: string | null;
  type?: string;
  progress?: number | null;
  dueDate?: string;
  daysLeft?: number;
  rating?: string;
  available?: boolean;
}

interface LibraryStudentData {
  studentName: string;
  myShelf: BookItem[];
  recommendations: BookItem[];
  newArrivals: BookItem[];
}

export default function StudentLibraryPage() {
  const [data, setData] = useState<LibraryStudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/library/dashboard/student');
        if (!response.ok) {
            // If 404 (student profile not found), handle gracefully?
            if (response.status === 404) {
                setError('Student profile not found. Please contact admin.');
            } else {
                throw new Error('Failed to fetch library data');
            }
            return;
        }
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('An error occurred while loading data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
       <div className="flex-1 p-8 flex items-center justify-center text-red-500">
         Error: {error}
       </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#f6f7f8] dark:bg-[#101922]">
      {/* Sticky Header / Top Bar */}
      <header className="flex flex-col bg-[#f6f7f8] dark:bg-[#101922] z-10 p-6 pb-2 shrink-0 gap-6">
        {/* Welcome & Search Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-tight text-[#0f172a] dark:text-white">
              Good afternoon, {data.studentName}
            </h2>
            <p className="text-[#64748b] dark:text-[#94a3b8] text-base">
              Continue your learning journey today.
            </p>
          </div>
          {/* Search Bar */}
          <div className="flex items-center gap-4 w-full max-w-lg">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94a3b8] group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-3 border-none rounded-xl leading-5 bg-white dark:bg-[#283039] text-[#0f172a] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm shadow-sm"
                placeholder="Search titles, authors, ISBNs..."
                type="text"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button className="p-1 rounded-lg hover:bg-[#f1f5f9] dark:hover:bg-white/10 text-[#94a3b8] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </button>
              </div>
            </div>
            <button className="flex items-center justify-center size-12 rounded-xl bg-white dark:bg-[#283039] text-[#475569] dark:text-white shadow-sm hover:text-primary transition-colors relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-3 right-3 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#283039]"></span>
            </button>
          </div>
        </div>
        {/* Chips / Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium whitespace-nowrap shadow-md shadow-primary/20">
            All
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-[#283039] border border-[#e2e8f0] dark:border-transparent text-[#475569] dark:text-[#9dabb9] hover:bg-[#f8fafc] dark:hover:bg-[#323b45] text-sm font-medium whitespace-nowrap transition-colors">
            Physical Books
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-[#283039] border border-[#e2e8f0] dark:border-transparent text-[#475569] dark:text-[#9dabb9] hover:bg-[#f8fafc] dark:hover:bg-[#323b45] text-sm font-medium whitespace-nowrap transition-colors">
            E-Books
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-[#283039] border border-[#e2e8f0] dark:border-transparent text-[#475569] dark:text-[#9dabb9] hover:bg-[#f8fafc] dark:hover:bg-[#323b45] text-sm font-medium whitespace-nowrap transition-colors">
            Audiobooks
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-[#283039] border border-[#e2e8f0] dark:border-transparent text-[#475569] dark:text-[#9dabb9] hover:bg-[#f8fafc] dark:hover:bg-[#323b45] text-sm font-medium whitespace-nowrap transition-colors">
            Journals
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-[#283039] border border-[#e2e8f0] dark:border-transparent text-[#475569] dark:text-[#9dabb9] hover:bg-[#f8fafc] dark:hover:bg-[#323b45] text-sm font-medium whitespace-nowrap transition-colors">
            Faculty Picks
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-20">
        <div className="flex flex-col gap-10 max-w-[1400px]">
          {/* My Borrowed Items Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#0f172a] dark:text-white">My Shelf</h3>
              <a className="text-sm text-primary font-medium hover:underline" href="#">
                View all
              </a>
            </div>
            {data.myShelf.length === 0 ? (
                <div className="p-8 text-center text-slate-500 bg-white dark:bg-[#1C252E] rounded-xl border border-[#f1f5f9] dark:border-[#283039]">
                    You haven't borrowed any books yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.myShelf.map((book) => (
                    <div key={book.id} className="flex bg-white dark:bg-[#1C252E] p-4 rounded-xl shadow-sm border border-[#f1f5f9] dark:border-[#283039] gap-4 group hover:border-primary/50 transition-colors">
                        <div
                        className="w-24 h-32 shrink-0 rounded-lg bg-[#e2e8f0] dark:bg-[#334155] bg-cover bg-center shadow-inner"
                        style={{
                            backgroundImage: book.coverImage ? `url('${book.coverImage}')` : undefined,
                        }}
                        >
                            {!book.coverImage && <span className="flex items-center justify-center h-full text-xs text-slate-400">?</span>}
                        </div>
                        <div className="flex flex-col justify-between w-full">
                        <div>
                            <div className="flex justify-between items-start">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-500 uppercase tracking-wide">
                                Physical
                            </span>
                            <span className="material-symbols-outlined text-[#94a3b8] text-lg cursor-pointer hover:text-red-500">
                                favorite
                            </span>
                            </div>
                            <h4 className="text-lg font-bold text-[#0f172a] dark:text-white leading-tight mt-1 line-clamp-1">
                            {book.title}
                            </h4>
                            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-0.5">{book.author}</p>
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                            <div className={`flex items-center gap-2 text-xs font-medium p-2 rounded-lg ${book.daysLeft && book.daysLeft < 3 ? 'text-red-500 bg-red-500/5' : 'text-orange-500 bg-orange-500/5'}`}>
                            <span className="material-symbols-outlined text-[16px]">calendar_clock</span>
                            Due {book.dueDate} ({book.daysLeft} days)
                            </div>
                            <button className="w-full py-2 bg-white dark:bg-[#283039] border border-[#e2e8f0] dark:border-[#475569] hover:bg-[#f8fafc] dark:hover:bg-[#323b45] text-[#334155] dark:text-white text-sm font-medium rounded-lg transition-colors">
                            Renew
                            </button>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
          </section>

          {/* Recommendations Carousel */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#0f172a] dark:text-white">
                  Recommended for you
                </h3>
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                  Based on popular reads
                </p>
              </div>
              <div className="flex gap-2">
                <button className="size-8 flex items-center justify-center rounded-full bg-white dark:bg-[#283039] text-[#475569] dark:text-white hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-8 flex items-center justify-center rounded-full bg-white dark:bg-[#283039] text-[#475569] dark:text-white hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {data.recommendations.map((book) => (
                <div key={book.id} className="group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg mb-3 bg-[#e2e8f0] dark:bg-[#334155]">
                        {book.coverImage ? (
                            <img
                                alt={book.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                src={book.coverImage}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">No Cover</div>
                        )}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                        {book.rating} ★
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="bg-primary text-white px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        Details
                        </button>
                    </div>
                    </div>
                    <h4 className="font-bold text-[#0f172a] dark:text-white text-sm truncate">
                    {book.title}
                    </h4>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">{book.author}</p>
                </div>
              ))}
            </div>
          </section>

          {/* New Arrivals / Categories Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category 1 */}
            <div className="bg-white dark:bg-[#1C252E] rounded-xl p-6 border border-[#f1f5f9] dark:border-[#283039]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">New Arrivals</h3>
              </div>
              <div className="space-y-4">
                {data.newArrivals.slice(0, 2).map((book) => (
                    <div key={book.id} className="flex gap-4 items-center group cursor-pointer hover:bg-[#f8fafc] dark:hover:bg-white/5 p-2 rounded-lg -mx-2 transition-colors">
                    <div
                        className="w-12 h-16 rounded bg-[#e2e8f0] dark:bg-[#334155] bg-cover bg-center shrink-0"
                        style={{
                        backgroundImage: book.coverImage ? `url('${book.coverImage}')` : undefined,
                        }}
                    ></div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#0f172a] dark:text-white truncate">
                        {book.title}
                        </h4>
                        <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">{book.author}</p>
                    </div>
                    <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-[#64748b] dark:text-[#9dabb9] font-medium border border-[#e2e8f0] dark:border-[#475569] rounded-lg hover:bg-[#f8fafc] dark:hover:bg-white/5 transition-colors">
                View all New Arrivals
              </button>
            </div>
            {/* Category 2 (Static for balance) */}
            <div className="bg-white dark:bg-[#1C252E] rounded-xl p-6 border border-[#f1f5f9] dark:border-[#283039]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500">
                  <span className="material-symbols-outlined">auto_stories</span>
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">
                  Trending Literature
                </h3>
              </div>
               <div className="space-y-4">
                {/* Placeholders or reuse new arrivals if needed, keeping static for now to match design feel */}
                  <div className="p-4 text-center text-slate-500 text-sm">
                      Curated selections coming soon.
                  </div>
              </div>
               <button className="w-full mt-4 py-2 text-sm text-[#64748b] dark:text-[#9dabb9] font-medium border border-[#e2e8f0] dark:border-[#475569] rounded-lg hover:bg-[#f8fafc] dark:hover:bg-white/5 transition-colors">
                View all Literature
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
