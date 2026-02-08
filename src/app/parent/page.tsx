'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

interface ChildData {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  isSelected: boolean;
  feeStatus: {
    outstanding: number;
    dueDate: string;
  };
  achievements: { icon: string; title: string; subtitle: string; color: string }[];
  upcomingEvents: { date: string; month: string; title: string; time: string }[];
  teacherComments: { teacher: string; subject: string; comment: string; time: string; avatar: string }[];
}

export default function ParentPortalOverview() {
  const { toast } = useToast();
  const [children, setChildren] = useState<ChildData[]>([]);
  const [selectedChildId, setSelectedChildId] = useState('');
  const [loading, setLoading] = useState(true);
  const [messageTo, setMessageTo] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/parent/dashboard', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const json = await res.json();
        if (json.success) {
          setChildren(json.data || getMockData());
          if (json.data?.length > 0) setSelectedChildId(json.data[0].id);
        } else {
          setChildren(getMockData());
          setSelectedChildId('1');
        }
      } catch (error) {
        console.error(error);
        setChildren(getMockData());
        setSelectedChildId('1');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getMockData = (): ChildData[] => [{
    id: '1',
    name: 'Emma Anderson',
    avatar: 'https://via.placeholder.com/150',
    grade: '8',
    isSelected: true,
    feeStatus: { outstanding: 4500, dueDate: 'Oct 15, 2023' },
    achievements: [
      { icon: 'functions', title: 'Math Wizard', subtitle: 'Top 5%', color: 'amber' },
      { icon: 'science', title: 'Science Fair', subtitle: '1st Place', color: 'blue' },
      { icon: 'menu_book', title: 'Avid Reader', subtitle: '50+ Books', color: 'purple' },
      { icon: 'diversity_3', title: 'Team Player', subtitle: 'Leadership', color: 'emerald' },
    ],
    upcomingEvents: [
      { date: '12', month: 'Oct', title: 'Parent-Teacher Conf', time: '10:00 AM - Main Hall' },
      { date: '24', month: 'Oct', title: 'Fall Sports Day', time: '09:00 AM - Sports Field' },
      { date: '05', month: 'Nov', title: 'Science Exhibition', time: '11:30 AM - Science Block' },
    ],
    teacherComments: [
      { teacher: 'Mrs. Roberts', subject: 'Math', comment: 'Emma showed great leadership in group study today. Very proud of her progress!', time: '2h ago', avatar: 'https://via.placeholder.com/150' },
      { teacher: 'Mr. Chen', subject: 'Science', comment: 'Don\'t forget the permission slip for next week\'s field trip to the botanical garden.', time: 'Yesterday', avatar: 'https://via.placeholder.com/150' },
    ],
  }];

  const selectedChild = children.find(c => c.id === selectedChildId) || children[0];

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;

  const sendMessage = () => {
    toast({ title: 'Message Sent', description: `Your message has been sent to ${messageTo}` });
    setMessageText('');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-blue-50 text-blue-600">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <h2 className="text-gray-900 text-lg font-bold leading-tight">Regisbridge Academy</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors" href="/parent">Dashboard</Link>
            <Link className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors" href="/parent/academics">Academics</Link>
            <Link className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors" href="/parent/financial">Financials</Link>
            <Link className="text-gray-900 hover:text-blue-600 font-medium text-sm transition-colors" href="/parent/calendar">Calendar</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 text-gray-500 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="bg-blue-100 rounded-full size-10 border-2 border-white shadow-sm flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">PA</span>
            </div>
            <button className="hidden sm:flex items-center justify-center px-4 h-9 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Welcome & Child Switcher */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">Child Overview</h1>
            <p className="text-gray-500 text-lg">Welcome back, Mr. & Mrs. Anderson</p>
          </div>
          <div className="border-b border-gray-200 flex gap-8 overflow-x-auto">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`flex flex-col items-center gap-3 pb-3 border-b-[3px] min-w-[100px] transition-all ${
                  selectedChildId === child.id
                    ? 'border-blue-600 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                }`}
              >
                <div className="relative">
                  <div className={`bg-blue-100 rounded-full size-12 flex items-center justify-center text-blue-600 font-bold ${
                    selectedChildId === child.id ? 'ring-2 ring-offset-2 ring-blue-600' : ''
                  }`}>
                    {child.name.substring(0, 2)}
                  </div>
                  {selectedChildId === child.id && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                      <span className="material-symbols-outlined text-[10px] text-white font-bold block">check</span>
                    </div>
                  )}
                </div>
                <span className={`text-sm font-bold ${selectedChildId === child.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {child.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        {selectedChild && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Fee Status Card */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-500">payments</span>
                      Fee Status
                    </h3>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Action Required</span>
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-sm text-gray-500">Total Outstanding</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tight">${selectedChild.feeStatus.outstanding.toLocaleString()}.00</span>
                  </div>
                  <p className="text-sm text-amber-600 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    Due by {selectedChild.feeStatus.dueDate}
                  </p>
                </div>
                <div className="mt-8">
                  <button className="w-full flex items-center justify-center h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98]">
                    Pay Now
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">Secure payment via Stripe</p>
                </div>
              </div>
            </div>

            {/* Academic Achievements */}
            <div className="md:col-span-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500">military_tech</span>
                    Academic Achievements
                  </h3>
                  <Link className="text-sm font-medium text-blue-600 hover:underline" href="/parent/academics">View Full Report</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedChild.achievements.map((achievement, idx) => (
                    <div key={idx} className={`flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-${achievement.color}-50 border border-${achievement.color}-100`}>
                      <div className={`size-12 rounded-full bg-gradient-to-br from-${achievement.color}-300 to-${achievement.color}-500 flex items-center justify-center text-white shadow-md`}>
                        <span className="material-symbols-outlined text-2xl">{achievement.icon}</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{achievement.title}</p>
                        <p className={`text-xs text-${achievement.color}-700 font-medium`}>{achievement.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="md:col-span-6 lg:col-span-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">event</span>
                  Upcoming Events
                </h3>
                <div className="flex flex-col gap-4">
                  {selectedChild.upcomingEvents.map((event, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex flex-col items-center justify-center min-w-[50px] h-[50px] bg-blue-50 rounded-lg text-blue-600">
                        <span className="text-xs font-bold uppercase">{event.month}</span>
                        <span className="text-lg font-bold leading-none">{event.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">{event.title}</span>
                        <span className="text-sm text-gray-500">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teacher Comments */}
            <div className="md:col-span-6 lg:col-span-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">comment</span>
                  Teacher Comments
                </h3>
                <div className="flex flex-col gap-4">
                  {selectedChild.teacherComments.map((comment, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="bg-blue-100 rounded-full min-w-[40px] h-[40px] flex items-center justify-center text-blue-600 font-bold">
                        {comment.teacher.substring(0, 2)}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none flex-1">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-xs font-bold text-gray-900">{comment.teacher} ({comment.subject})</span>
                          <span className="text-[10px] text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Message */}
            <div className="md:col-span-12 lg:col-span-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">mail</span>
                  Quick Message
                </h3>
                <div className="flex-1 flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">To:</label>
                    <select
                      value={messageTo}
                      onChange={(e) => setMessageTo(e.target.value)}
                      className="w-full h-10 px-3 bg-gray-50 border-none rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select recipient</option>
                      <option value="Mrs. Roberts (Homeroom)">Mrs. Roberts (Homeroom)</option>
                      <option value="Mr. Chen (Science)">Mr. Chen (Science)</option>
                      <option value="Administration Office">Administration Office</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Message:</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full h-24 p-3 bg-gray-50 border-none rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                  <button
                    onClick={sendMessage}
                    className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">send</span>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
