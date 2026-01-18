'use client';

import React from 'react';
import { MaterialIcon } from './material-icon';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className = '' }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-gold/50 to-transparent" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <div key={index} className="relative pl-20">
            {/* Year badge */}
            <div className="absolute left-0 top-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#0B1F3B] flex items-center justify-center shadow-lg border-4 border-white">
                  {event.icon ? (
                    <MaterialIcon icon={event.icon} className="text-brand-gold text-2xl" />
                  ) : (
                    <span className="text-brand-gold font-bold text-sm">{event.year}</span>
                  )}
                </div>
                {/* Connecting dot */}
                <div className="absolute top-1/2 -right-4 w-4 h-4 rounded-full bg-brand-gold transform -translate-y-1/2 shadow" />
              </div>
            </div>

            {/* Content card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              {event.image && (
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.imageAlt || event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-3 py-1 bg-brand-gold/10 text-[#0B1F3B] text-xs font-bold rounded-full uppercase tracking-wide">
                    {event.year}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
