'use client';

import React, { useEffect, useState } from 'react';

interface TransportStats {
  totalVehicles: { value: number; subtext: string };
  activeRoutes: { value: number; subtext: string };
  fuelEfficiency: { current: number; unit: string; trend: string };
  nextService: { value: number; subtext: string };
}

interface Vehicle {
  id: string;
  vehicleId: string;
  driver: { name: string; image: string | null };
  route: string;
  status: string;
  fuel: string;
  odometer: string;
  lastService: string;
}

interface TransportData {
  stats: TransportStats;
  fleet: Vehicle[];
}

export default function TransportPage() {
  const [data, setData] = useState<TransportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/transport/dashboard');
        if (!response.ok) throw new Error('Failed to fetch transport data');
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

  const filteredFleet = data.fleet.filter(vehicle => {
    const matchesStatus = filterStatus === 'All Status' || vehicle.status === filterStatus;
    const matchesSearch = vehicle.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vehicle.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px] flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
              Fleet Management
            </h1>
            <p className="text-slate-500 dark:text-[#9dabb9] text-base font-normal">
              Real-time transport command center
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-[#283039] border border-slate-200 dark:border-[#3b4754] text-slate-700 dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-[#323b46] transition-colors">
              <span className="mr-2 material-symbols-outlined text-[18px]">history</span>
              <span>History</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-colors">
              <span className="mr-2 material-symbols-outlined text-[18px]">download</span>
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c242f] border border-slate-200 dark:border-[#283039] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                Total Vehicles
              </p>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                <span className="material-symbols-outlined">directions_bus</span>
              </div>
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">{data.stats.totalVehicles.value}</p>
              <p className="text-slate-400 dark:text-[#9dabb9] text-sm font-medium mb-1">
                {data.stats.totalVehicles.subtext}
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c242f] border border-slate-200 dark:border-[#283039] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                Active Routes
              </p>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500">
                <span className="material-symbols-outlined">route</span>
              </div>
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">{data.stats.activeRoutes.value}</p>
              <div className="flex items-center text-emerald-500 text-sm font-medium mb-1 gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {data.stats.activeRoutes.subtext}
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c242f] border border-slate-200 dark:border-[#283039] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                Fuel Efficiency
              </p>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">
                {data.stats.fuelEfficiency.current} <span className="text-lg font-normal text-slate-400">{data.stats.fuelEfficiency.unit}</span>
              </p>
              <p className="text-emerald-500 text-sm font-medium mb-1">{data.stats.fuelEfficiency.trend} vs last month</p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c242f] border border-slate-200 dark:border-[#283039] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">
                Next Service
              </p>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-500">
                <span className="material-symbols-outlined">car_repair</span>
              </div>
            </div>
            <div className="flex items-end gap-3 mt-2">
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-none">{data.stats.nextService.value}</p>
              <p className="text-amber-500 text-sm font-medium mb-1">{data.stats.nextService.subtext}</p>
            </div>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid lg:grid-cols-3 gap-6 h-full min-h-[600px]">
          {/* Map Section (Takes up 2/3 on large screens) */}
          <div className="lg:col-span-2 flex flex-col rounded-xl overflow-hidden border border-slate-200 dark:border-[#283039] bg-white dark:bg-[#1c242f] shadow-sm relative group">
            {/* Toolbar overlaid on map */}
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row justify-between gap-4 pointer-events-none">
              <label className="pointer-events-auto flex flex-col min-w-[200px] sm:min-w-[300px] shadow-lg">
                <div className="flex w-full items-stretch rounded-lg h-10 md:h-12 bg-white dark:bg-[#101922] border border-slate-200 dark:border-transparent">
                  <div className="text-slate-500 dark:text-[#9dabb9] flex items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-400 dark:placeholder:text-[#9dabb9] px-4 rounded-l-none pl-2 text-sm md:text-base font-normal"
                    placeholder="Search vehicle or route ID"
                    value={searchQuery}
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                  />
                </div>
              </label>
              <div className="flex flex-col gap-2 items-end pointer-events-auto">
                <div className="flex flex-col shadow-lg rounded-lg overflow-hidden bg-white dark:bg-[#101922] border border-slate-200 dark:border-transparent">
                  <button className="flex size-10 items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#1c242f] border-b border-slate-100 dark:border-[#283039]">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="flex size-10 items-center justify-center text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-[#1c242f]">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
                <button className="flex size-10 items-center justify-center rounded-lg bg-white dark:bg-[#101922] text-primary shadow-lg border border-slate-200 dark:border-transparent hover:bg-slate-50 dark:hover:bg-[#1c242f]">
                  <span className="material-symbols-outlined">navigation</span>
                </button>
              </div>
            </div>

            {/* Map Background */}
            <div className="w-full h-full bg-slate-100 dark:bg-[#0f151c] relative min-h-[500px]">
              {/* Static Map Image Representation */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-60"
                data-alt="Dark themed map of city streets"
                data-location="New York City"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJRlrNY0EhNDafyx2Z4Vf7hQ8tBIBCWGZBxwUXSwkB-e9lZzcm3Nd__68F1TRLtt-G2dxf4D8dwJgZ6UpCopI3qKx-spBz7GPR5bUm7MR538YZTO5Hu2Mb3Pv4kwgGBTtvoSLaUugZ9TOMT27O4G2gexeKvoRZk9xeK843IFGY7y7U5Hi18DCwUDcAGv8oQVd0ZLzAnZUjEqhdgCEW8LwwScEA8np8lCPwuC798HdAUbue-_U8sPj_REL7gyEFOM1DFU1CDEsGYoc")',
                }}
              ></div>
              
              {/* Markers for first 5 vehicles to avoid overcrowding */}
              {data.fleet.slice(0, 5).map((vehicle, index) => {
                // Generate pseudo-random positions for demo visual
                const top = 20 + ((index * 15) % 60); 
                const left = 20 + ((index * 25) % 60); 
                
                return (
                  <div 
                    key={vehicle.id} 
                    className="absolute flex flex-col items-center gap-1 group/marker cursor-pointer"
                    style={{ top: `${top}%`, left: `${left}%` }}
                  >
                    <div className="px-2 py-1 bg-white dark:bg-[#1c242f] rounded shadow text-xs font-bold text-slate-900 dark:text-white opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap border border-slate-200 dark:border-[#3b4754]">
                      {vehicle.vehicleId} ({vehicle.status})
                    </div>
                    <div className={`size-8 rounded-full border-2 border-white dark:border-[#1c242f] shadow-lg flex items-center justify-center text-white transform hover:scale-110 transition-transform ${
                      vehicle.status === 'On Time' ? 'bg-emerald-500' :
                      vehicle.status === 'Delayed' ? 'bg-amber-500 animate-bounce' :
                      vehicle.status === 'Maintenance' ? 'bg-red-500' : 'bg-slate-400'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {vehicle.status === 'Maintenance' ? 'build' : vehicle.status === 'Idle' ? 'local_parking' : 'directions_bus'}
                      </span>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Bottom Info Bar inside Map */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-[#1c242f]/95 backdrop-blur-sm border-t border-slate-200 dark:border-[#283039] p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    On Route
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Delayed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    Idle
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                Last Updated: Just now
              </div>
            </div>
          </div>

          {/* Side Panel / Fleet List */}
          <div className="flex flex-col rounded-xl border border-slate-200 dark:border-[#283039] bg-white dark:bg-[#1c242f] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-[#283039] flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Fleet</h3>
              <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredFleet.length === 0 ? (
                <div className="p-4 text-center text-slate-500">No vehicles found.</div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-[#202a36] text-slate-500 dark:text-[#9dabb9] font-medium sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3">Vehicle</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Cap.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#283039]">
                    {filteredFleet.map((vehicle: any) => (
                      <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-[#242d38] transition-colors cursor-pointer group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-100 dark:bg-[#283039] rounded-full p-2 text-slate-500 dark:text-slate-300">
                              <span className="material-symbols-outlined text-[18px]">
                                directions_bus
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{vehicle.vehicleId}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {vehicle.route} • {vehicle.driver.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            vehicle.status === 'On Time' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            vehicle.status === 'Delayed' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            vehicle.status === 'Maintenance' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-slate-700 dark:text-slate-200 font-medium">32/40</span>
                            <div className="w-16 h-1.5 bg-slate-100 dark:bg-[#3b4754] rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[80%]"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-[#283039]">
              <button className="w-full py-2 rounded-lg border border-slate-200 dark:border-[#3b4754] text-slate-600 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-[#323b46] transition-colors">
                Dispatch New Vehicle
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Data Table Section */}
        <div className="flex flex-col rounded-xl border border-slate-200 dark:border-[#283039] bg-white dark:bg-[#1c242f] shadow-sm mb-8">
          <div className="p-5 border-b border-slate-200 dark:border-[#283039] flex flex-wrap gap-4 justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Detailed Fleet Roster
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[18px]">
                  filter_list
                </span>
                <select 
                  className="pl-9 pr-8 py-2 bg-slate-50 dark:bg-[#283039] border-none rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary outline-none"
                  value={filterStatus}
                  onChange={(e: any) => setFilterStatus(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Idle">Idle</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
              <button className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#283039] text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-[#202a36] text-slate-500 dark:text-[#9dabb9] text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039]">
                    Vehicle ID
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039]">
                    Driver
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039]">
                    Route
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039]">
                    Fuel Level
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039]">
                    Odometer
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039]">
                    Last Service
                  </th>
                  <th className="px-6 py-4 border-b border-slate-200 dark:border-[#283039] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#283039] text-sm">
                {filteredFleet.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-slate-500">
                            No vehicles found.
                        </td>
                    </tr>
                ) : (
                    filteredFleet.map((vehicle: any) => (
                    <tr key={vehicle.id} className="hover:bg-slate-50 dark:hover:bg-[#242d38] transition-colors">
                      <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">
                        {vehicle.vehicleId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="size-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-200"
                          >
                            {vehicle.driver.name.charAt(0)}
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">{vehicle.driver.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {vehicle.route}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[18px] ${parseInt(vehicle.fuel) < 40 ? 'text-amber-500' : 'text-emerald-500'}`}>
                            local_gas_station
                          </span>
                          <span className="text-slate-900 dark:text-white font-medium">{vehicle.fuel}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{vehicle.odometer}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{vehicle.lastService}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary font-medium hover:text-primary/80">
                          Manage
                        </button>
                      </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
