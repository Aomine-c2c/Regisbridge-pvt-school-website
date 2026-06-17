'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface AnalyticsData {
  counts: {
    students: number;
    staff: number;
  };
  financial: {
    collectionRate: number;
    totalCollected: number;
    totalExpected: number;
  };
  academic: {
    avgScore: number;
  };
  charts: {
    distribution: { label: string; value: number }[];
  };
}

export default function ExecutiveAnalyticsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);

  // Filter states (kept for UI consistency, though API might not support all yet)
  const [cohort, setCohort] = useState('2023-2024');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics', {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        
        if (json.success) {
          setData(json.data);
        } else {
          toast({ title: "Error", description: json.message || "Failed to load analytics", variant: "destructive" });
        }
      } catch (error) {
        console.error("Analytics Load Error:", error);
        toast({ title: "Error", description: "Failed to connect to server", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f6f6f8] dark:bg-[#111521]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2957e0]"></div>
      </div>
    );
  }

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
               Real-time overview of student enrollment, financial performance, and academic metrics for the current academic cycle.
             </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 text-sm font-bold text-[#111317] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Filters - Visual Only for now */}
        <div className="w-full bg-white dark:bg-[#1e2330] p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-center flex-wrap opacity-60">
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
                onChange={(e: any) => setCohort(e.target.value)}
                disabled
                className="w-full h-10 pl-3 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:ring-[#2957e0] focus:border-[#2957e0] text-[#111317] dark:text-white appearance-none cursor-pointer"
              >
                <option>2023-2024</option>
              </select>
               <span className="material-symbols-outlined absolute right-2 top-2.5 text-gray-400 pointer-events-none text-lg">lock</span>
            </div>
            {/* Other filters disabled for this version */}
             <div className="col-span-3 flex items-center text-xs text-gray-500 italic">
                * Global filters are currently read-only in this version.
             </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard 
            title="Total Students" 
            icon="school" 
            value={data?.counts.students.toString() || "0"} 
            sub="Active Enrollments" 
            color="blue" 
            badge="Updated"
          />
          <KPICard 
             title="Total Staff" 
             icon="group" 
             value={data?.counts.staff.toString() || "0"} 
             sub="Active Faculty & Staff" 
             color="purple" 
           />
          <KPICard 
            title="Fees Collected" 
            icon="payments" 
            value={`$${(data?.financial.totalCollected || 0).toLocaleString()}`} 
            sub={`of $${(data?.financial.totalExpected || 0).toLocaleString()} Expected`}
            color="green" 
            trend="+12%"
            trendUp={true}
          />
           <KPICard 
            title="Avg Academic Score" 
            icon="emoji_events" 
            value={data?.academic.avgScore ? `${data.academic.avgScore}%` : "N/A"} 
            sub="Across all recent grades"
            color="yellow" 
          />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
           {/* Chart 1 */}
           <div className="xl:col-span-2 bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
             <div className="flex justify-between items-center mb-8">
               <div>
                 <h3 className="text-lg font-bold text-[#111317] dark:text-white">Student Distribution</h3>
                 <p className="text-sm text-[#646d87] dark:text-gray-400">Enrollment count by Grade Level</p>
               </div>
             </div>
             
             {/* CSS Bar Chart */}
             <div className="flex-1 w-full min-h-[300px] flex items-end justify-center gap-4 md:gap-8 px-2">
                {data?.charts.distribution && data.charts.distribution.length > 0 ? (
                    data?.charts.distribution.map((item: any) => {
                         // Calculate relative height based on max value
                         const maxVal = Math.max(...data.charts.distribution.map(d => d.value));
                         const heightPct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
                         
                         return (
                            <div key={item.label} className="flex flex-col items-center flex-1 group cursor-pointer max-w-[100px]">
                                <div className="relative w-full flex justify-center h-full items-end" style={{height: '250px'}}>
                                    <div 
                                        className="w-8 md:w-12 bg-[#2957e0] rounded-t-sm group-hover:bg-blue-600 transition-all relative shadow-[0_0_15px_-3px_rgba(41,87,224,0.3)]" 
                                        style={{ height: `${Math.max(heightPct, 5)}%` }} // Min height 5% for visibility
                                    >
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-[#2957e0] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10 transition-opacity">
                                            {item.value} Students
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs md:text-sm font-bold text-[#646d87] dark:text-gray-400 text-center">{item.label}</p>
                            </div>
                         );
                    })
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 italic">
                        No student distribution data available
                    </div>
                )}
             </div>
           </div>

           {/* Chart 2: Recent Activity / Placeholder */}
           <div className="xl:col-span-1 bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#111317] dark:text-white">System Insights</h3>
                <p className="text-sm text-[#646d87] dark:text-gray-400">Quick stats overview</p>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-4 text-center p-4">
                 <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <span className="material-symbols-outlined text-4xl text-[#2957e0]">insights</span>
                 </div>
                 <h4 className="font-bold text-gray-900 dark:text-white">Data Collection Active</h4>
                 <p className="text-sm text-gray-500">
                    The system is actively collecting data for detailed academic and financial analysis. More advanced charts will appear here as data grows.
                 </p>
              </div>
           </div>
        </div>

        {/* Performance Prediction vs Actual */}
        <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#111317] dark:text-white">Financial Performance Forecast</h3>
              <p className="text-sm text-[#646d87] dark:text-gray-400">Predicted vs Actual Collection by Quarter</p>
            </div>
            <div className="flex gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <span className="text-[#646d87] dark:text-gray-400">Predicted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#2957e0] rounded"></div>
                <span className="text-[#646d87] dark:text-gray-400">Actual</span>
              </div>
            </div>
          </div>
          
          {/* Bar Chart using BarGroup */}
          <div className="flex-1 w-full min-h-[280px] flex items-end justify-center gap-6 md:gap-12 px-4" style={{height: '280px'}}>
            <BarGroup label="Q1" pred={75} act={82} pVal="$45K" aVal="$49K" />
            <BarGroup label="Q2" pred={80} act={78} pVal="$48K" aVal="$47K" />
            <BarGroup label="Q3" pred={70} act={85} pVal="$42K" aVal="$51K" />
            <BarGroup label="Q4" pred={90} act={65} pVal="$54K" aVal="$39K" />
          </div>
          
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-300 italic">
              ℹ️ Forecast data shown above is simulated for demonstration. Connect to your financial prediction model for live data.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents for cleaner code
interface KPICardProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  sub: string;
  trend?: string;
  trendUp?: boolean;
  color: 'blue' | 'purple' | 'yellow' | 'red' | 'green';
  badge?: string;
}

function KPICard({ title, icon, value, sub, trend, trendUp, color, badge }: KPICardProps) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-[#2957e0] dark:bg-blue-900/20',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20',
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

interface BarGroupProps {
  label: string;
  pred: number;
  act: number;
  pVal: string | number;
  aVal: string | number;
}

function BarGroup({ label, pred, act, pVal, aVal }: BarGroupProps) {
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

interface BubbleProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  color: 'blue' | 'red' | 'yellow' | 'gray';
  label: string;
}

function Bubble({ top, left, right, bottom, size, color, label }: BubbleProps) {
    const style: React.CSSProperties = {};
    if (top) style.top = top;
    if (left) style.left = left;
    if (right) style.right = right;
    if (bottom) style.bottom = bottom;

    const colors: Record<string, string> = {
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

interface FacultyRowProps {
  name: string;
  dept: string;
  students: number;
  grade: string;
  deviation: string;
  isPositive?: boolean;
  isNeutral?: boolean;
}

function FacultyRow({ name, dept, students, grade, deviation, isPositive, isNeutral }: FacultyRowProps) {
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
