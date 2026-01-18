'use client';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'admissions' | 'academic' | 'sports' | 'arts' | 'community';
  registrationUrl?: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Open House & Campus Tour',
    date: '2026-02-05',
    time: '10:00 AM - 2:00 PM',
    location: 'Main Campus',
    description: 'Join us for a comprehensive campus tour, meet our faculty, and learn about our programs. Refreshments provided.',
    category: 'admissions',
    registrationUrl: '/contact',
  },
  {
    id: '2',
    title: 'Science Fair Exhibition',
    date: '2026-02-15',
    time: '9:00 AM - 3:00 PM',
    location: 'Science Block',
    description: 'Student science projects on display. See innovation and creativity in action.',
    category: 'academic',
  },
  {
    id: '3',
    title: 'Inter-School Rugby Championship',
    date: '2026-02-22',
    time: '2:00 PM',
    location: 'Sports Complex',
    description: 'Our First XV competes in the regional championship finals. Come support our team!',
    category: 'sports',
  },
  {
    id: '4',
    title: 'Spring Music Concert',
    date: '2026-03-08',
    time: '6:00 PM',
    location: 'Auditorium',
    description: 'An evening of classical and contemporary music performed by our talented students.',
    category: 'arts',
    registrationUrl: '/contact',
  },
  {
    id: '5',
    title: 'Parent-Teacher Conference',
    date: '2026-03-15',
    time: '1:00 PM - 6:00 PM',
    location: 'Various Classrooms',
    description: 'Meet with teachers to discuss student progress. By appointment only.',
    category: 'community',
  },
  {
    id: '6',
    title: 'A-Level Information Session',
    date: '2026-03-20',
    time: '5:00 PM',
    location: 'Conference Hall',
    description: 'Learn about our A-Level program, subject choices, and university preparation.',
    category: 'admissions',
    registrationUrl: '/contact',
  },
];

const CATEGORY_COLORS = {
  admissions: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  academic: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  sports: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  arts: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  community: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

function addToCalendar(event: Event) {
  const startDate = new Date(`${event.date} ${event.time.split(' - ')[0]}`);
  const formattedDate = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  
  window.open(calendarUrl, '_blank');
}

export default function EventsCalendar() {
  return (
    <section id="events" aria-label="Upcoming Events" className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Upcoming Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Join us for campus events, tours, and community gatherings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UPCOMING_EVENTS.map((event) => (
          <article
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              {/* Category Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${CATEGORY_COLORS[event.category]}`}>
                {event.category}
              </span>

              {/* Event Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {event.title}
              </h3>

              {/* Date & Time */}
              <div className="flex items-start gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined text-brand-primary text-base flex-shrink-0" aria-hidden="true">
                  calendar_today
                </span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(event.date)}
                  </div>
                  <div>{event.time}</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="material-symbols-outlined text-brand-primary text-base" aria-hidden="true">
                  location_on
                </span>
                <span>{event.location}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {event.description}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => addToCalendar(event)}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-4 py-2 bg-brand-primary text-white text-sm font-bold rounded-lg hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
                  aria-label={`Add ${event.title} to calendar`}
                >
                  <span className="material-symbols-outlined text-base" aria-hidden="true">add</span>
                  Add to Calendar
                </button>
                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-brand-primary dark:text-white text-sm font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
                    aria-label={`Register for ${event.title}`}
                  >
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* View All Events CTA */}
      <div className="mt-12 text-center">
        <a
          href="/events"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-brand-primary font-bold rounded-lg border-2 border-brand-primary hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
        >
          View Full Calendar
          <span className="material-symbols-outlined text-sm" aria-hidden="true">calendar_month</span>
        </a>
      </div>
    </section>
  );
}
