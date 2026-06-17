'use client';

import React, { useEffect, useState } from 'react';

interface Room {
  id: string;
  number: string;
  blockName: string;
  floor: number;
  capacity: number;
  occupied: number;
  status: string;
  students: { name: string; avatar: string | null }[];
}

interface MaintenanceRequest {
  id: string;
  room: string;
  issue: string;
  reportedBy: string;
  date: string;
  status: string;
}

interface HostelAdminData {
  metrics: {
    totalCapacity: number;
    currentResidents: number;
    occupancyRate: number;
    maintenanceRequests: number;
  };
  rooms: Room[];
  maintenanceList: MaintenanceRequest[];
}

export default function HostelOccupancyPage() {
  const [data, setData] = useState<HostelAdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterBlock, setFilterBlock] = useState('All');
  const [filterFloor, setFilterFloor] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hostel/dashboard/admin');
        if (!response.ok) throw new Error('Failed to fetch hostel data');
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

  // Extract unique blocks and floors for filters
  const blocks = Array.from(new Set(data.rooms.map(r => r.blockName)));
  const floors = Array.from(new Set(data.rooms.map(r => r.floor))).sort((a, b) => a - b);

  const filteredRooms = data.rooms.filter(room => {
      const matchBlock = filterBlock === 'All' || room.blockName === filterBlock;
      const matchFloor = filterFloor === 'All' || room.floor.toString() === filterFloor;
      return matchBlock && matchFloor;
  });

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f6f7f8] dark:bg-[#111521]">
      <div className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col gap-6">
        {/* Hero Section */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-sm min-h-[180px] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAH09Op5NL12fBvx1SSLOmn-2-58A_DsvXXdmeAVTn6nmClNg5zdAC_E18Xrq4BqibX7L0aH0eOEignqnrIBQa6VP7crV0HVNxTrHXmuzsqhuGVVAEAShKLnSvdVsMmhqZk3rV_eG2zsaszwq8aq-gmhgK0jck44AESg3fwEOXieueKs7xM9Xk6hvQV8IxIR1hkZ6fuO6XUFyaO2BD6hRfRdMIK1NuZCNDwE3Y6ytCuE1tMpG2lsFgA2CT67oG4jFkJcTkffaOlPZM')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 p-6 flex justify-between items-end w-full">
            <div>
              <p className="text-gray-300 text-sm font-medium uppercase tracking-wider mb-1">Saint Mary's Institute</p>
              <h1 className="text-white text-3xl font-bold leading-tight">Hostel Management Dashboard</h1>
            </div>
            <div className="hidden sm:block">
              <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Assign Student
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <section>
          <h3 className="text-[#111317] dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">analytics</span>
            Occupancy Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric Card 1 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Capacity</p>
                <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-900/30 p-1 rounded">apartment</span>
              </div>
              <p className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.totalCapacity} Beds</p>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">+0%</span>
                <span className="text-gray-400">vs last semester</span>
              </div>
            </div>
            {/* Metric Card 2 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Current Residents</p>
                <span className="material-symbols-outlined text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 p-1 rounded">groups</span>
              </div>
              <p className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.currentResidents} Students</p>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">+5%</span>
                <span className="text-gray-400">year-over-year</span>
              </div>
            </div>
            {/* Metric Card 3 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Occupancy Rate</p>
                <span className="material-symbols-outlined text-orange-500 bg-orange-50 dark:bg-orange-900/30 p-1 rounded">pie_chart</span>
              </div>
              <p className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.occupancyRate}%</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${data.metrics.occupancyRate}%` }}></div>
              </div>
            </div>
            {/* Metric Card 4 */}
            <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Maintenance</p>
                <span className="material-symbols-outlined text-red-500 bg-red-50 dark:bg-red-900/30 p-1 rounded">engineering</span>
              </div>
              <p className="text-[#111317] dark:text-white text-2xl font-bold">{data.metrics.maintenanceRequests} Requests</p>
              <p className="text-[#646d87] dark:text-gray-400 text-xs font-medium">Pending Urgent Action</p>
            </div>
          </div>
        </section>

        {/* Room Overview Section */}
        <section className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
            <h3 className="text-[#111317] dark:text-white text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">grid_view</span>
              Dormitory Status
            </h3>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select 
                    className="appearance-none bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                    onChange={(e: any) => setFilterBlock(e.target.value)}
                    value={filterBlock}
                >
                  <option value="All">All Blocks</option>
                  {blocks.map(block => <option key={block} value={block}>{block}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">expand_more</span>
              </div>
              <div className="relative">
                <select 
                    className="appearance-none bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                    onChange={(e: any) => setFilterFloor(e.target.value)}
                    value={filterFloor}
                >
                  <option value="All">All Floors</option>
                  {floors.map(floor => <option key={floor} value={floor}>Floor {floor}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">expand_more</span>
              </div>
              <button className="bg-white dark:bg-[#1a202e] border border-[#dcdee5] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg text-gray-500 dark:text-gray-300 transition-colors">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>
          </div>
          {/* Room Grid */}
          <div className="bg-white dark:bg-[#1a202e] rounded-xl border border-[#dcdee5] dark:border-gray-700 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-700 dark:text-gray-200">
                  {filterBlock === 'All' ? 'All Blocks' : filterBlock} - {filterFloor === 'All' ? 'All Floors' : `Floor ${filterFloor}`}
              </h4>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-emerald-500"></span> Available</div>
                <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-blue-500"></span> Occupied</div>
                <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-amber-500"></span> Maintenance</div>
              </div>
            </div>
            {filteredRooms.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No rooms found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredRooms.map((room: any) => (
                    <div 
                        key={room.id} 
                        className={`group relative flex flex-col gap-3 p-4 rounded-lg border transition-all cursor-pointer bg-white dark:bg-[#1a202e] shadow-sm hover:shadow-md ${
                            room.status === 'Maintenance' ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10' : 
                            room.status === 'Full' ? 'border-gray-200 dark:border-gray-700 hover:border-primary' : 
                            'border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                        }`}
                    >
                    <div className="flex justify-between items-start">
                        <div className={`font-bold px-2 py-1 rounded text-sm ${
                            room.status === 'Maintenance' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                            room.status === 'Full' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                            'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        }`}>Room {room.number}</div>
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">more_horiz</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                            {room.status === 'Maintenance' ? 'Status' : 'Occupancy'}
                        </p>
                        <div className="flex items-center gap-2">
                        {room.status === 'Maintenance' ? (
                            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">Under Repair</p>
                        ) : (
                            <>
                                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${room.status === 'Full' ? 'bg-blue-500' : 'bg-emerald-500'}`} 
                                        style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{room.occupied}/{room.capacity}</span>
                            </>
                        )}
                        </div>
                    </div>
                    <div className="flex -space-x-2 overflow-hidden py-1 min-h-[32px]">
                        {room.students.length > 0 ? (
                            <>
                                {room.students.slice(0, 3).map((student, idx) => (
                                    <div key={idx} className="h-8 w-8 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-800" title={student.name}>
                                        {student.name.charAt(0)}
                                    </div>
                                ))}
                                {room.students.length > 3 && (
                                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                                        +{room.students.length - 3}
                                    </div>
                                )}
                            </>
                        ) : (
                            !room.status.includes('Maintenance') && <span className="text-xs text-gray-400 italic flex items-center pt-1">No students assigned</span>
                        )}
                    </div>
                    </div>
                ))}
                </div>
            )}
          </div>
        </section>

        {/* Footer area / Secondary Table */}
        <section className="mb-8">
          <div className="bg-white dark:bg-[#1a202e] rounded-xl border border-[#dcdee5] dark:border-gray-700 p-0 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#dcdee5] dark:border-gray-700 flex justify-between items-center">
              <h4 className="font-bold text-[#111317] dark:text-white">Recent Maintenance Requests</h4>
              <a className="text-primary text-sm font-medium hover:underline" href="#">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                  <tr>
                    <th className="px-6 py-3">Room</th>
                    <th className="px-6 py-3">Issue</th>
                    <th className="px-6 py-3">Reported By</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {data.maintenanceList.map((req: any) => (
                    <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 font-medium text-[#111317] dark:text-gray-200">{req.room}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{req.issue}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{req.reportedBy}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{req.date}</td>
                        <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                req.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                                req.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {req.status}
                            </span>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
