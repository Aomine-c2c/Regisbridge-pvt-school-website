'use client';

import React from 'react';
import { MaterialIcon } from './material-icon';

export interface TimetableLesson {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime?: string;
  duration?: string;
  icon?: string;
  status?: 'current' | 'next' | 'upcoming' | 'past';
}

interface TimetableGridProps {
  lessons: TimetableLesson[];
  title?: string;
  showStatus?: boolean;
  onViewFull?: () => void;
  className?: string;
}

export function TimetableGrid({
  lessons,
  title = 'My Timetable',
  showStatus = true,
  onViewFull,
  className = '',
}: TimetableGridProps) {
  const statusColors = {
    current: {
      border: 'border-green-500',
      bg: 'bg-green-50',
      badge: 'bg-green-100 text-green-700',
      indicator: 'bg-green-500',
    },
    next: {
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      badge: 'bg-blue-100 text-blue-700',
      indicator: 'bg-blue-500',
    },
    upcoming: {
      border: 'border-transparent',
      bg: '',
      badge: 'bg-gray-100 text-gray-600',
      indicator: 'bg-gray-300',
    },
    past: {
      border: 'border-transparent',
      bg: '',
      badge: 'bg-gray-100 text-gray-400',
      indicator: 'bg-gray-200',
    },
  };

  const statusLabels = {
    current: 'Now',
    next: 'Next',
    upcoming: 'Upcoming',
    past: 'Past',
  };

  return (
    <section className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-gray-900 text-lg font-bold leading-tight flex items-center gap-2">
          <MaterialIcon icon="schedule" className="text-brand-gold" />
          {title}
        </h3>
        {onViewFull && (
          <button
            onClick={onViewFull}
            className="text-sm text-brand-primary font-medium hover:underline focus:outline-none focus:underline"
          >
            View Full Week
          </button>
        )}
      </div>

      {/* Lessons List */}
      <div className="divide-y divide-gray-100">
        {lessons.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MaterialIcon icon="event_busy" className="text-4xl mb-2 opacity-30" />
            <p className="text-sm">No classes scheduled</p>
          </div>
        ) : (
          lessons.map((lesson) => {
            const status = lesson.status || 'upcoming';
            const colors = statusColors[status];

            return (
              <div
                key={lesson.id}
                className={`flex items-center gap-4 px-6 py-4 relative overflow-hidden group hover:bg-gray-50 transition-colors ${colors.bg}`}
              >
                {/* Status Indicator Line */}
                {lesson.status === 'current' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                )}

                {/* Subject Icon */}
                <div className="text-gray-700 flex items-center justify-center rounded-lg bg-gray-100 shrink-0 w-12 h-12">
                  <MaterialIcon icon={lesson.icon || 'book'} className="text-2xl" />
                </div>

                {/* Lesson Info */}
                <div className="flex flex-col flex-1 justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-gray-900 text-base font-bold leading-normal truncate">
                      {lesson.subject}
                    </p>
                    {showStatus && lesson.status && (
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${colors.badge}`}
                      >
                        {statusLabels[lesson.status]}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm font-normal leading-normal truncate">
                    {lesson.room} • {lesson.teacher}
                  </p>
                </div>

                {/* Time */}
                <div className="shrink-0 text-right">
                  <p className="text-gray-900 font-medium text-sm">{lesson.startTime}</p>
                  {lesson.duration && (
                    <p className="text-xs text-gray-500">{lesson.duration}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
