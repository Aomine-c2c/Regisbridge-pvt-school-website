'use client';

import React, { useEffect, useState } from 'react';

export default function StrategicAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/analytics/strategic');
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
     return <div className="p-10 text-center">Loading Strategic Data...</div>;
  }

  if (!data) return null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f8] dark:bg-[#111521] text-slate-900 dark:text-white font-display transition-colors duration-200">
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e2330] px-6 py-3 sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="size-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Schola Executive</h2>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <a className="text-primary text-sm font-semibold leading-normal" href="#">Dashboard</a>
            <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Academics</a>
            <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Financials</a>
            <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">HR & Staff</a>
            <a className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Settings</a>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4">
          <div className="flex gap-2">
            <button className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white dark:ring-slate-800" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuhwAuI5e1UwoqfR1NykZuko9kCZ_qMD7XSbwr058GAjO7zcUGV5ZLYW-Ccb9MOoWy9pJDBihUVVKhMFctXsQqoN-kW0q2i0QpBI8yjGnX4d9yNeGk23EvsC40-C8LXqzMPYdpR6CaVtFdDt9aLmerBiDSMC5iCb2jklsAmsbm7pUeUsQsUNsYmOxH5Jh2iHnjmJIMq1jOy1nACdXSVvVjIZvyumt6qvS-TPjE3Cg8F-ZePFATkB5070s9i_kBlbhAT4J-R2kU5uo')" }}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 md:px-10 lg:px-16 max-w-[1440px] mx-auto w-full overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Executive Strategic Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Q3 2024 Performance Report • Live Data</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined mr-2 text-[18px]">download</span>
              Download Report
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Health Score */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">health_and_safety</span>
            </div>
            <div className="flex flex-col h-full justify-between">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Institutional Health Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{data.healthScore}</span>
                  <span className="text-xl text-slate-400 dark:text-slate-500 font-medium">/100</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${data.healthScore}%` }}></div>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center">
                  <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span>
                  Excellent
                </p>
              </div>
            </div>
          </div>
          {/* Enrollment KPI */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Enrollment</p>
              <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded">{data.enrollment.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{data.enrollment.total.toLocaleString()}</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Students across 3 campuses</p>
            </div>
          </div>
          {/* Revenue KPI */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Net Revenue (YTD)</p>
              <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded">{data.revenue.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">${(data.revenue.current / 1000000).toFixed(1)}M</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">vs. ${(data.revenue.projected / 1000000).toFixed(1)}M projected</p>
            </div>
          </div>
          {/* Retention KPI */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Staff Retention</p>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{data.retention.rate}%</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{data.retention.departures} departures in Q3</p>
            </div>
          </div>
        </div>

        {/* Main Chart & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 5-Year Trajectory Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1e2330] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">5-Year Strategic Trajectory</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Correlating Academic Performance vs. Revenue vs. Operational Costs</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-slate-600 dark:text-slate-300">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                  <span className="text-slate-600 dark:text-slate-300">Academics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                  <span className="text-slate-600 dark:text-slate-300">Costs</span>
                </div>
              </div>
            </div>
            {/* Custom CSS Chart Implementation */}
            <div className="relative w-full h-[300px] mt-4">
              {/* Chart Area */}
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-0 pt-4">
                {/* Visual Placeholder for brevity - in real app would use Recharts */}
                <div className="w-full h-full bg-slate-50 dark:bg-slate-900/50 rounded flex items-center justify-center text-slate-400">
                    [Chart Visualization of {data.trajectory?.length} Years Data]
                </div>
              </div>
            </div>
          </div>
          {/* Geographic Map - Keeping Static for now as no Geo Data */}
          <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Geographic Distribution</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Commuter & Boarding Catchment</p>
            </div>
            <div className="flex-1 rounded-lg overflow-hidden relative bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 min-h-[300px]">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-40" style={{ backgroundImage: "url('https://placeholder.pics/svg/300')" }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
