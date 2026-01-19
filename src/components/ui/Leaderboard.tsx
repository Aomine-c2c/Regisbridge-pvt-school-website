'use client';

import React from 'react';
import { MaterialIcon } from './material-icon';

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  motto?: string;
  score: number;
  weeklyChange?: number;
  trailingBy?: number;
  icon?: string;
  color?: string;
  badge?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
  subtitle?: string;
  scoreLabel?: string;
  className?: string;
  showChange?: boolean;
  highlightTop?: number;
}

export function Leaderboard({
  entries,
  title = 'House Championship',
  subtitle = 'Term 3 Standings & Statistics',
  scoreLabel = 'Points',
  className = '',
}: LeaderboardProps) {
  const firstPlace = entries.find(e => e.rank === 1);
  const runnersUp = entries.filter(e => e.rank >= 2 && e.rank <= 4);

  const getBorderColor = (rank: number) => {
    switch (rank) {
      case 2:
        return 'border-gray-400';
      case 3:
        return 'border-amber-700';
      case 4:
        return 'border-blue-900';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <section className={className}>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div className="flex min-w-72 flex-col gap-2">
          <div className="flex items-center gap-2 text-[#0B1F3B] font-bold text-sm tracking-widest uppercase mb-1">
            <MaterialIcon icon="emoji_events" className="text-lg" />
            Official Leaderboard
          </div>
          <h1 className="text-gray-900 text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            {title}
          </h1>
          <p className="text-gray-600 text-lg font-normal">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MaterialIcon icon="update" className="text-lg" />
          Last updated: Today, 09:00 AM
        </div>
      </div>

      {/* Leaderboard Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 1st Place (Hero Card) */}
        {firstPlace && (
          <div className="lg:col-span-4 relative group overflow-hidden rounded-xl shadow-lg border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3B]/90 to-[#0B1F3B]/60 mix-blend-multiply z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577979749830-f1d742b96791?q=80&w=2574&auto=format&fit=crop')" }}
            ></div>
            <div className="relative z-20 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Crest */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl ring-4 ring-[#C9A227]/50">
                  <MaterialIcon icon={firstPlace.icon || 'local_fire_department'} className="text-6xl md:text-7xl text-[#0B1F3B]" />
                </div>
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-1 bg-[#C9A227] text-[#0B1F3B] text-xs font-bold px-2 py-1 rounded mb-2">
                    <MaterialIcon icon="trophy" className="text-sm" /> CURRENT LEADER
                  </div>
                  <h2 className="text-white text-4xl font-black tracking-tight mb-1">{firstPlace.name}</h2>
                  {firstPlace.motto && (
                    <p className="text-white/90 text-lg italic">&ldquo;{firstPlace.motto}&rdquo;</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <span className="text-white/80 text-sm font-bold uppercase tracking-widest">Total {scoreLabel}</span>
                <div className="text-white text-6xl md:text-7xl font-black tracking-tighter drop-shadow-md">
                  {firstPlace.score.toLocaleString()}
                </div>
                {firstPlace.weeklyChange !== undefined && (
                  <div className="flex items-center gap-2 text-white/90 bg-white/10 px-3 py-1 rounded-full mt-2 backdrop-blur-sm">
                    <MaterialIcon icon="trending_up" className="text-sm" />
                    +{firstPlace.weeklyChange} this week
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Runners Up Grid (2nd-4th place) */}
        {runnersUp.map((entry) => (
          <div
            key={entry.id}
            className={`bg-white p-6 rounded-xl shadow-md border-t-4 ${getBorderColor(entry.rank)} flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}
          >
            <div className="absolute top-2 right-2 text-gray-300 font-black text-6xl opacity-20 z-0">
              {entry.rank}
            </div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 z-10 text-gray-700 group-hover:bg-[#0B1F3B]/10 group-hover:text-[#0B1F3B] transition-colors">
              <MaterialIcon icon={entry.icon || 'shield'} className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-1 z-10">{entry.name}</h3>
            <p className="text-4xl font-black text-[#0B1F3B] mb-2 z-10">
              {entry.score.toLocaleString()}
            </p>
            {entry.trailingBy !== undefined && (
              <span className="text-xs text-gray-500 font-medium z-10">
                Trailing by {entry.trailingBy} pts
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
