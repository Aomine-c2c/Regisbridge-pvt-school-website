'use client';

import { Leaderboard } from '@/components';
import type { LeaderboardEntry } from '@/components/ui/Leaderboard';
import Link from 'next/link';

const HOUSE_RANKINGS: LeaderboardEntry[] = [
  {
    id: '1',
    rank: 1,
    name: 'Windsor House',
    score: 1582,
    change: 0,
    color: '#10b981',
    badge: 'Boys 10-13',
  },
  {
    id: '2',
    rank: 2,
    name: 'Phoenix House',
    score: 1234,
    change: 1,
    color: '#3b82f6',
    badge: 'Girls 7-9',
  },
  {
    id: '3',
    rank: 3,
    name: 'Victoria House',
    score: 1156,
    change: -1,
    color: '#a855f7',
    badge: 'Girls 10-13',
  },
  {
    id: '4',
    rank: 4,
    name: 'Hamilton House',
    score: 1089,
    change: 0,
    color: '#f59e0b',
    badge: 'Sixth Form Boys',
  },
  {
    id: '5',
    rank: 5,
    name: 'Century House',
    score: 987,
    change: 0,
    color: '#ef4444',
    badge: 'Boys 7-9',
  },
  {
    id: '6',
    rank: 6,
    name: 'Cambridge House',
    score: 923,
    change: 0,
    color: '#6366f1',
    badge: 'Sixth Form Girls',
  },
];

export default function HouseLeaderboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-navy text-white border-b border-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">House Championship</h1>
              <p className="text-white/80">Term 1 • 2025-2026</p>
            </div>
            <Link
              href="/student"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Podium Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Top 3 Houses</h2>
          
          <div className="flex items-end justify-center gap-6 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-40 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-xl flex flex-col items-center justify-center mb-4 relative shadow-lg">
                <div className="absolute -top-6 w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-white text-3xl">emoji_events</span>
                </div>
                <div className="mt-6">
                  <p className="font-black text-3xl text-gray-700">1,234</p>
                  <p className="text-xs text-gray-600 text-center">points</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-gray-900">Phoenix House</p>
                <p className="text-xs text-gray-500">Girls 7-9</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="w-40 h-52 bg-gradient-to-b from-brand-gold to-brand-gold-dark rounded-t-xl flex flex-col items-center justify-center mb-4 relative shadow-2xl">
                <div className="absolute -top-8 w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="material-symbols-outlined text-white text-4xl">emoji_events</span>
                </div>
                <div className="mt-8">
                  <p className="font-black text-4xl text-white">1,582</p>
                  <p className="text-sm text-white/90 text-center">points</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-gray-900">Windsor House</p>
                <p className="text-sm text-gray-500">Boys 10-13</p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-xl flex flex-col items-center justify-center mb-4 relative shadow-lg">
                <div className="absolute -top-6 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-white text-3xl">emoji_events</span>
                </div>
                <div className="mt-4">
                  <p className="font-black text-2xl text-orange-800">1,156</p>
                  <p className="text-xs text-orange-700 text-center">points</p>
                </div>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-gray-900">Victoria House</p>
                <p className="text-xs text-gray-500">Girls 10-13</p>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Leaderboard */}
        <Leaderboard
          entries={HOUSE_RANKINGS}
          title="Complete Rankings"
          showChange={true}
          highlightTop={3}
        />

        {/* Point Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-navy/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-brand-navy text-2xl">school</span>
              </div>
              <h3 className="font-bold text-gray-900">Academic Points</h3>
            </div>
            <p className="text-sm text-gray-600">Earned through excellent grades, homework, and academic competitions</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-2xl">sports_soccer</span>
              </div>
              <h3 className="font-bold text-gray-900">Sports Points</h3>
            </div>
            <p className="text-sm text-gray-600">Won through inter-house competitions and sports events</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 text-2xl">volunteer_activism</span>
              </div>
              <h3 className="font-bold text-gray-900">Service Points</h3>
            </div>
            <p className="text-sm text-gray-600">Awarded for community service and positive behavior</p>
          </div>
        </div>

        {/* Your Contribution */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Contribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Points</p>
              <p className="text-3xl font-black text-green-600">45</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">This Week</p>
              <p className="text-3xl font-black text-green-600">12</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Class Rank</p>
              <p className="text-3xl font-black text-green-600">#3</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
