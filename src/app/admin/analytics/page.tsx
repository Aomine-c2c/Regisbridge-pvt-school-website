'use client';

import React, { useState } from 'react';

export default function ExecutiveAnalyticsPage() {
  const [cohort, setCohort] = useState('2023-2024');
  const [level, setLevel] = useState('A-Level');
  const [department, setDepartment] = useState('All Sciences');
  const [term, setTerm] = useState('Finals');

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#111521] text-[#111317] dark:text-white font-sans transition-colors duration-200">
       {/* Top Nav skipped (layout) */}
      
      <main className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 gap-8">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-[#2957e0] font-bold text-sm uppercase tracking-wider">
               <span className="material-symbols-outlined text-lg">analytics</span>
               <span>Executive Deep-Dive</span>
             </div>
             <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.02em] text-[#111317] dark:text-white">Academic Performance Trends</h1>
             <p className="text-[#646d87] dark:text-gray-400 text-base max-w-2xl">
               Analyze exam results against predictions, evaluate faculty effectiveness, and identify subject-level opportunities for the current academic cycle.
             </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 text-sm font-bold text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              <span>Export Report</span>
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#2957e0] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="w-full bg-white dark:bg-[#1e2330] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2 text-[#646d87] dark:text-gray-400 text-sm font-bold mr-2">
            <span className="material-symbols-outlined">filter_list</span>
            <span>Filters:</span>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {/* Cohort */}
            <div className="relative group">
              <label className="absolute -top-2 left-2 px-1 bg-white dark:bg-[#1e2330] text-xs font-bold text-[#2957e0] z-10">Cohort</label>
              <select 
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-[#2957e0] focus:border-[#2957e0] text-[#111317] dark:text-white appearance-none cursor-pointer"
              >
                <option>2023-2024</option>
                <option>2022-2023</option>
                <option>2021-2022</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 text-gray-400 pointer-events-none text-lg">arrow_drop_down</span>
            </div>
             {/* Level */}
            <div className="relative group">
              <label className="absolute -top-2 left-2 px-1 bg-white dark:bg-[#1e2330] text-xs font-bold text-[#2957e0] z-10">Level</label>
               <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-[#2957e0] focus:border-[#2957e0] text-[#111317] dark:text-white appearance-none cursor-pointer"
              >
                <option>A-Level</option>
                <option>O-Level/IGCSE</option>
                <option>IB Diploma</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 text-gray-400 pointer-events-none text-lg">arrow_drop_down</span>
            </div>
             {/* Department */}
            <div className="relative group">
              <label className="absolute -top-2 left-2 px-1 bg-white dark:bg-[#1e2330] text-xs font-bold text-[#2957e0] z-10">Department</label>
               <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-[#2957e0] focus:border-[#2957e0] text-[#111317] dark:text-white appearance-none cursor-pointer"
              >
                <option>All Sciences</option>
                <option>Humanities</option>
                <option>Mathematics</option>
                <option>Arts</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 text-gray-400 pointer-events-none text-lg">arrow_drop_down</span>
            </div>
             {/* Term */}
            <div className="relative group">
              <label className="absolute -top-2 left-2 px-1 bg-white dark:bg-[#1e2330] text-xs font-bold text-[#2957e0] z-10">Term</label>
               <select 
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-[#2957e0] focus:border-[#2957e0] text-[#111317] dark:text-white appearance-none cursor-pointer"
              >
                <option>Finals</option>
                <option>Mid-Term</option>
                <option>Mocks</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 text-gray-400 pointer-events-none text-lg">arrow_drop_down</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Average Grade Points" icon="school" value="3.82" sub="/ 4.0" trend="+2.4% vs last year" trendUp={true} color="blue" />
          <KPICard title="Pass Rate (A*-C)" icon="check_circle" value="98.2%" sub="" trend="+1.2% vs target" trendUp={true} color="purple" />
          <KPICard title="Top Subject" icon="emoji_events" value="Physics" sub="" badge="42 Students • 4.0 Avg" color="yellow" />
          <KPICard title="Performance Alert" icon="warning" value="History" sub="" trend="-5.4% deviation" trendUp={false} color="red" />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
           {/* Chart 1 */}
           <div className="xl:col-span-2 bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
             <div className="flex justify-between items-center mb-8">
               <div>
                 <h3 className="text-lg font-bold text-[#111317] dark:text-white">Predicted vs. Actual Grades</h3>
                 <p className="text-sm text-[#646d87] dark:text-gray-400">Comparing faculty predictions against final exam results</p>
               </div>
               <div className="flex gap-4 text-xs font-bold">
                 <div className="flex items-center gap-2">
                   <div className="size-3 rounded-sm bg-gray-300 dark:bg-gray-600"></div>
                   <span className="text-[#646d87] dark:text-gray-400">Predicted</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="size-3 rounded-sm bg-[#2957e0]"></div>
                   <span className="text-[#111317] dark:text-white">Actual</span>
                 </div>
               </div>
             </div>
             
             {/* CSS Bar Chart */}
             <div className="flex-1 w-full min-h-[300px] flex items-end justify-between gap-4 md:gap-8 px-2">
                <BarGroup label="Physics" pred={70} act={85} pVal="3.5" aVal="4.0" />
                <BarGroup label="Chem" pred={75} act={78} pVal="3.7" aVal="3.8" />
                <BarGroup label="Bio" pred={80} act={65} pVal="3.9" aVal="3.2" />
                <BarGroup label="Math" pred={88} act={92} pVal="4.2" aVal="4.5" />
                <BarGroup label="Eng" pred={60} act={65} pVal="3.0" aVal="3.2" />
                <BarGroup label="Hist" pred={70} act={50} pVal="3.5" aVal="2.5" />
             </div>
           </div>

           {/* Chart 2: Matrix */}
           <div className="xl:col-span-1 bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#111317] dark:text-white">Subject Matrix</h3>
                <p className="text-sm text-[#646d87] dark:text-gray-400">Popularity vs. Performance</p>
              </div>
              <div className="relative flex-1 w-full min-h-[300px] border-l border-b border-gray-300 dark:border-gray-600">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-400 tracking-wider">PERFORMANCE</div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 tracking-wider">POPULARITY</div>
                {/* Grid Lines */}
                <div className="absolute top-1/2 w-full h-px bg-gray-200 dark:bg-gray-700 border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                <div className="absolute left-1/2 h-full w-px bg-gray-200 dark:bg-gray-700 border-l border-dashed border-gray-300 dark:border-gray-600"></div>
                
                {/* Bubbles */}
                <Bubble top="10%" right="10%" size="size-20" color="blue" label="Physics" />
                <Bubble top="5%" right="25%" size="size-24" color="blue" label="Math" />
                <Bubble bottom="20%" left="45%" size="size-16" color="red" label="History" />
                <Bubble top="40%" left="10%" size="size-12" color="gray" label="Art" />
                <Bubble bottom="30%" right="15%" size="size-20" color="yellow" label="Bio" />
              </div>
           </div>
        </div>

        {/* Faculty Table */}
        <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
           <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
             <div>
               <h3 className="text-lg font-bold text-[#111317] dark:text-white">Faculty Impact Matrix</h3>
               <p className="text-sm text-[#646d87] dark:text-gray-400">Deviation from predicted grades by instructor</p>
             </div>
             <button className="text-[#2957e0] text-sm font-bold hover:underline">View All Staff</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 dark:bg-gray-800/50 text-[#646d87] dark:text-gray-400 text-xs uppercase tracking-wider font-semibold">
                 <tr>
                   <th className="px-6 py-4">Faculty Member</th>
                   <th className="px-6 py-4">Department</th>
                   <th className="px-6 py-4">Students</th>
                   <th className="px-6 py-4">Avg. Grade</th>
                   <th className="px-6 py-4">Pred. vs Actual</th>
                   <th className="px-6 py-4 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                 <FacultyRow name="Dr. Sarah Chen" dept="Physics" students="42" grade="4.0 (A)" deviation="+0.5" isPositive={true} />
                 <FacultyRow name="Mr. James Wilson" dept="History" students="28" grade="2.8 (C+)" deviation="-0.8" isPositive={false} />
                 <FacultyRow name="Prof. Anita Roy" dept="Mathematics" students="55" grade="3.9 (A-)" deviation="+0.2" isPositive={true} />
                 <FacultyRow name="Mr. David Kim" dept="Biology" students="38" grade="3.2 (B)" deviation="0.0" isNeutral={true} />
               </tbody>
             </table>
           </div>
           <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/20 flex justify-center">
             <button className="text-sm font-bold text-[#646d87] dark:text-gray-400 hover:text-[#2957e0] flex items-center gap-1 transition-colors">
               Show All 34 Faculty Members
               <span className="material-symbols-outlined text-sm">expand_more</span>
             </button>
           </div>
        </div>

      </main>
    </div>
  );
}

// Subcomponents for cleaner code
function KPICard({ title, icon, value, sub, trend, trendUp, color, badge }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-[#2957e0] dark:bg-blue-900/20',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20',
  };
  
  return (
    <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col gap-3 hover:border-[#2957e0]/50 transition-colors group">
      <div className="flex justify-between items-start">
        <p className="text-[#646d87] dark:text-gray-400 text-sm font-semibold">{title}</p>
        <div className={`p-1.5 rounded-md ${colors[color]} group-hover:scale-110 transition-transform`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-[#111317] dark:text-white truncate">{value}</h3>
        {sub && <span className="text-sm font-bold text-gray-500">{sub}</span>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 w-fit px-2 py-0.5 rounded text-xs font-bold ${trendUp ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
          <span className="material-symbols-outlined text-[14px]">{trendUp ? 'trending_up' : 'trending_down'}</span>
          <span>{trend}</span>
        </div>
      )}
      {badge && (
        <div className="flex items-center gap-1 text-[#646d87] dark:text-gray-400 bg-gray-100 dark:bg-gray-800 w-fit px-2 py-0.5 rounded text-xs font-bold">
          <span>{badge}</span>
        </div>
      )}
    </div>
  );
}

function BarGroup({ label, pred, act, pVal, aVal }: any) {
  return (
    <div className="flex flex-col items-center flex-1 group cursor-pointer">
      <div className="relative w-full flex justify-center gap-1 h-full items-end">
        <div className="w-3 md:w-6 bg-gray-300 dark:bg-gray-600 rounded-t-sm group-hover:bg-gray-400 transition-all relative" style={{ height: `${pred}%` }}>
           <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 transition-opacity">Pred: {pVal}</div>
        </div>
        <div className="w-3 md:w-6 bg-[#2957e0] rounded-t-sm group-hover:bg-blue-600 transition-all relative shadow-[0_0_15px_-3px_rgba(41,87,224,0.3)]" style={{ height: `${act}%` }}>
           <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2957e0] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 transition-opacity">Act: {aVal}</div>
        </div>
      </div>
      <p className="mt-3 text-xs md:text-sm font-bold text-[#646d87] dark:text-gray-400">{label}</p>
    </div>
  );
}

function Bubble({ top, left, right, bottom, size, color, label }: any) {
    const style: any = {};
    if (top) style.top = top;
    if (left) style.left = left;
    if (right) style.right = right;
    if (bottom) style.bottom = bottom;

    const colors: any = {
        blue: 'bg-[#2957e0]/20 border-[#2957e0] text-[#2957e0]',
        red: 'bg-red-100 border-red-500 text-red-600',
        yellow: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        gray: 'bg-gray-100 dark:bg-gray-700 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300',
    };

    return (
        <div 
            className={`absolute ${size} rounded-full border flex items-center justify-center text-xs font-bold shadow-sm hover:scale-110 transition-transform cursor-pointer ${colors[color]}`}
            style={style}
            title={label}
        >
            {label}
        </div>
    );
}

function FacultyRow({ name, dept, students, grade, deviation, isPositive, isNeutral }: any) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4 font-bold text-[#111317] dark:text-white">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
            {name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          {name}
        </div>
      </td>
      <td className="px-6 py-4 text-[#111317] dark:text-gray-200">{dept}</td>
      <td className="px-6 py-4 text-[#111317] dark:text-gray-200">{students}</td>
      <td className="px-6 py-4 font-bold text-[#111317] dark:text-white">{grade}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${
            isNeutral ? 'text-gray-500 bg-gray-100 dark:bg-gray-800' :
            isPositive ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 
            'text-red-600 bg-red-50 dark:bg-red-900/20'
        }`}>
          <span className="material-symbols-outlined text-[14px]">{isNeutral ? 'remove' : isPositive ? 'arrow_upward' : 'arrow_downward'}</span>
          {deviation}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-gray-400 hover:text-[#2957e0] transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
      </td>
    </tr>
  );
}
