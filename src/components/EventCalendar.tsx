import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events = [
    { date: '2025-01-15', title: 'Term 2 Opening', type: 'academic' },
    { date: '2025-02-14', title: 'Valentine\'s Day Assembly', type: 'cultural' },
    { date: '2025-03-10', title: 'Science Fair', type: 'academic' },
    { date: '2025-03-25', title: 'Sports Day', type: 'sports' },
    { date: '2025-04-02', title: 'Easter Break Begins', type: 'holiday' },
    { date: '2025-04-15', title: 'Parent-Teacher Meetings', type: 'academic' },
    { date: '2025-05-01', title: 'Workers\' Day', type: 'holiday' },
    { date: '2025-05-20', title: 'Cultural Festival', type: 'cultural' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-[#1C1A75]';
      case 'sports': return 'bg-green-600';
      case 'cultural': return 'bg-[#D4AF37]';
      case 'holiday': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <section id="calendar" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-[#1C1A75] text-center mb-4">
          School Calendar
        </h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

        <div className="max-w-4xl mx-auto">
          {/* Calendar Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-2xl font-bold text-[#1C1A75]">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-semibold text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="p-2"></div>;
                }

                const dayEvents = getEventsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = selectedDate?.toDateString() === date.toDateString();

                return (
                  <div
                    key={index}
                    className={`p-2 min-h-[80px] border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isToday ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'hover:bg-gray-50'
                    } ${isSelected ? 'ring-2 ring-[#1C1A75]' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-[#D4AF37]' : 'text-gray-700'}`}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`text-xs px-1 py-0.5 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Details */}
          {selectedDate && (
            <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
              <h4 className="text-xl font-bold text-[#1C1A75] mb-4 flex items-center">
                <CalendarIcon className="mr-2" size={24} />
                Events for {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h4>

              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className={`w-4 h-4 rounded-full mr-3 ${getEventTypeColor(event.type)}`}></div>
                      <div>
                        <h5 className="font-semibold text-[#1C1A75]">{event.title}</h5>
                        <p className="text-sm text-gray-600 capitalize">{event.type} Event</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No events scheduled for this date.</p>
              )}
            </div>
          )}

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h4 className="text-xl font-bold text-[#1C1A75] mb-4">Upcoming Events</h4>
            <div className="space-y-3">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .slice(0, 5)
                .map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border-l-4 border-[#D4AF37] bg-gray-50">
                    <div>
                      <h5 className="font-semibold text-[#1C1A75]">{event.title}</h5>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs text-white ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}