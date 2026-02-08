'use client';

import React, { useEffect, useState } from 'react';

interface Roommate {
  name: string;
  grade?: string;
  avatar: string | null;
}

interface RoomDetails {
  number: string;
  block: string;
  blockType: string;
  floor: number;
  location: string;
}

interface HostelStudentData {
  assigned: boolean;
  message?: string;
  room?: RoomDetails;
  roommates?: Roommate[];
  status?: string;
  checkIn?: string;
  curfew?: string;
}

export default function StudentBoardingPage() {
  const [data, setData] = useState<HostelStudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hostel/dashboard/student');
        if (!response.ok) {
            if (response.status === 404) {
                 // Student profile not found
                 setError("Student profile not found.");
            } else {
                 throw new Error('Failed to fetch hostel data');
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
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f7f8] dark:bg-[#111521]">
      {/* Top Navigation would be part of layout, skipping here as per structure */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#111317] dark:text-white mb-2">Boarding & Hostel</h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
              View your room details, manage leave requests, and access hostel services.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[#111317] dark:text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span>Handbook</span>
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>New Leave Request</span>
            </button>
          </div>
        </div>

        {!data.assigned ? (
            <div className="bg-white dark:bg-[#1e2330] p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">bed</span>
                <h3 className="text-xl font-bold text-[#111317] dark:text-white mb-2">No Room Assigned</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    {data.message || "You have not been assigned a hostel room. Please contact the administration if this is an error."}
                </p>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Room & Personal Info (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Room Stats Cards */}
                <section>
                <h3 className="text-lg font-bold text-[#111317] dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">key</span>
                    My Assignment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-[#1e2330] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Room Number</span>
                    <span className="text-3xl font-bold text-[#111317] dark:text-white">{data.room?.number}</span>
                    <div className="mt-2 flex items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded w-fit">
                        <span className="size-2 bg-green-500 rounded-full mr-1.5"></span> Occupied
                    </div>
                    </div>
                    <div className="bg-white dark:bg-[#1e2330] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Building</span>
                    <span className="text-3xl font-bold text-[#111317] dark:text-white">{data.room?.block}</span>
                    <div className="mt-2 text-xs text-gray-400">{data.room?.blockType}</div>
                    </div>
                    <div className="bg-white dark:bg-[#1e2330] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-1">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Floor</span>
                    <span className="text-3xl font-bold text-[#111317] dark:text-white">
                        {data.room?.floor === 1 ? '1st' : data.room?.floor === 2 ? '2nd' : data.room?.floor === 3 ? '3rd' : `${data.room?.floor}th`}
                    </span>
                    <div className="mt-2 text-xs text-gray-400">{data.room?.location}</div>
                    </div>
                </div>
                </section>

                {/* Roommates Section */}
                <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#111317] dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">group</span>
                    Roommates
                    </h3>
                </div>
                <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
                    {data.roommates && data.roommates.length > 0 ? (
                        data.roommates.map((mate, index) => (
                            <div key={index} className="p-4 flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                                        {mate.name.charAt(0)}
                                    </div>
                                    <div>
                                    <p className="font-bold text-[#111317] dark:text-white">{mate.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{mate.grade || 'Student'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-primary dark:hover:text-white transition-colors" title="Message">
                                    <span className="material-symbols-outlined">chat</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-6 text-center text-gray-500 italic">No roommates assigned.</div>
                    )}
                </div>
                </section>

                {/* Leave Request Form */}
                <section>
                <h3 className="text-lg font-bold text-[#111317] dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">flight_takeoff</span>
                    Request Weekend Leave
                </h3>
                <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Departure */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Departure Date & Time</label>
                        <div className="relative">
                        <input
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:text-white text-sm h-10 px-3"
                            type="datetime-local"
                        />
                        </div>
                    </div>
                    {/* Return */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Return Date & Time</label>
                        <div className="relative">
                        <input
                            className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:text-white text-sm h-10 px-3"
                            type="datetime-local"
                        />
                        </div>
                    </div>
                    {/* Destination */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Destination / Address</label>
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                        <div className="pl-3 text-gray-400">
                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                        </div>
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 text-sm dark:text-white placeholder-gray-500 py-2.5 px-2"
                            placeholder="123 Family Home Lane, Cityville"
                            type="text"
                        />
                        </div>
                    </div>
                    {/* Reason */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Leave</label>
                        <textarea
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:text-white text-sm resize-none p-3"
                        placeholder="Visiting parents for the weekend..."
                        rows={2}
                        ></textarea>
                    </div>
                    {/* Consent Checkbox */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                        <input className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            I confirm that my parents/guardians are aware of this request and have granted permission. They may be contacted for verification.
                        </span>
                        </label>
                    </div>
                    {/* Submit Action */}
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                        className="bg-primary hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md shadow-primary/20 transition-all active:scale-95"
                        type="button"
                        >
                        Submit Request
                        </button>
                    </div>
                    </form>
                </div>
                </section>
            </div>

            {/* Right Column: Maintenance & Info (1/3 width) */}
            <div className="flex flex-col gap-8">
                {/* Active Status Widget */}
                <div className="bg-gradient-to-br from-primary to-blue-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">Current Status</h4>
                    <div className="flex items-center gap-2 mb-4">
                    <span className="size-3 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-2xl font-bold">{data.status}</span>
                    </div>
                    <div className="text-sm text-blue-100 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                    <p>Last check-in: {data.checkIn}</p>
                    <p>Curfew tonight: {data.curfew}</p>
                    </div>
                </div>
                {/* Decorative background icon */}
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/5 pointer-events-none">bed</span>
                </div>

                {/* Maintenance Report */}
                <section>
                <h3 className="text-lg font-bold text-[#111317] dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-500">build</span>
                    Report Issue
                </h3>
                <div className="bg-white dark:bg-[#1e2330] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
                    <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Category</label>
                    <select className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:text-white text-sm h-10 px-2">
                        <option>Plumbing (Leak, blockage)</option>
                        <option>Electrical (Light, socket)</option>
                        <option>Furniture (Broken bed, desk)</option>
                        <option>HVAC (AC, Heating)</option>
                    </select>
                    </div>
                    <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Description</label>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary dark:text-white text-sm resize-none p-3"
                        placeholder="Describe the issue..."
                        rows={3}
                    ></textarea>
                    </div>
                    <button className="w-full bg-white dark:bg-[#1e2330] border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#111317] dark:text-white font-medium py-2 rounded-lg transition-colors text-sm">
                    Submit Ticket
                    </button>
                </div>
                </section>

                {/* Resources Links */}
                <section>
                <h3 className="text-lg font-bold text-[#111317] dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-500">library_books</span>
                    Resources
                </h3>
                <div className="flex flex-col gap-3">
                    <a className="flex items-center p-3 bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors group" href="#">
                    <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mr-3">
                        <span className="material-symbols-outlined">description</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-sm text-[#111317] dark:text-white group-hover:text-primary transition-colors">Hostel Rules PDF</p>
                        <p className="text-xs text-gray-500">2.4 MB • Updated Aug 2023</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">download</span>
                    </a>
                    <a className="flex items-center p-3 bg-white dark:bg-[#1e2330] border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary dark:hover:border-primary transition-colors group" href="#">
                    <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                        <span className="material-symbols-outlined">contact_phone</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-sm text-[#111317] dark:text-white group-hover:text-primary transition-colors">Emergency Contacts</p>
                        <p className="text-xs text-gray-500">Warden & Medical</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                    </a>
                </div>
                </section>
            </div>
            </div>
        )}
      </main>
    </div>
  );
}
