'use client';

import React from 'react';
import { MaterialIcon } from './material-icon';

export interface Notice {
  id: string;
  title: string;
  date: string;
  dateLabel?: string;
  category?: string;
  urgent?: boolean;
  href?: string;
}

interface NoticeBoardProps {
  notices: Notice[];
  title?: string;
  icon?: string;
  maxDisplay?: number;
  className?: string;
}

export function NoticeBoard({
  notices,
  title = 'School Notices',
  icon = 'campaign',
  maxDisplay,
  className = '',
}: NoticeBoardProps) {
  const displayedNotices = maxDisplay ? notices.slice(0, maxDisplay) : notices;

  return (
    <section className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-[#0B1F3B] text-white">
        <h3 className="text-base font-bold leading-tight flex items-center gap-2">
          <MaterialIcon icon={icon} className="text-xl" />
          {title}
        </h3>
      </div>

      {/* Notices List */}
      <div className="divide-y divide-gray-100">
        {displayedNotices.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MaterialIcon icon="inbox" className="text-4xl mb-2 opacity-30" />
            <p className="text-sm">No notices at this time</p>
          </div>
        ) : (
          displayedNotices.map((notice) => {
            const NoticeWrapper = notice.href ? 'a' : 'div';
            const wrapperProps = notice.href
              ? { href: notice.href }
              : {};

            return (
              <NoticeWrapper
                key={notice.id}
                {...wrapperProps}
                className={`block p-4 transition-colors ${
                  notice.href ? 'hover:bg-gray-50 cursor-pointer' : ''
                } ${notice.urgent ? 'bg-red-50/50' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className={`text-xs font-bold ${
                          notice.urgent
                            ? 'text-red-600'
                            : notice.dateLabel === 'Today'
                            ? 'text-[#C9A227]'
                            : 'text-gray-500'
                        }`}
                      >
                        {notice.dateLabel || notice.date}
                      </p>
                      {notice.category && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wide">
                          {notice.category}
                        </span>
                      )}
                      {notice.urgent && (
                        <MaterialIcon icon="priority_high" className="text-red-600 text-sm" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 leading-snug">
                      {notice.title}
                    </p>
                  </div>
                  {notice.href && (
                    <MaterialIcon
                      icon="chevron_right"
                      className="text-gray-400 text-xl shrink-0"
                    />
                  )}
                </div>
              </NoticeWrapper>
            );
          })
        )}
      </div>
    </section>
  );
}
