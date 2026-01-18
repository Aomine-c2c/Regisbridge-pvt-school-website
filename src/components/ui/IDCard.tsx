'use client';

import React from 'react';
import Image from 'next/image';

export interface IDCardProps {
  studentName: string;
  studentId: string;
  house?: string;
  photo?: string;
  photoAlt?: string;
  grade?: string;
  className?: string;
}

export function IDCard({
  studentName,
  studentId,
  house,
  photo,
  photoAlt,
  grade,
  className = '',
}: IDCardProps) {
  return (
    <div
      className={`relative w-full aspect-[1.586] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] duration-300 ${className}`}
    >
      {/* Metallic Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="relative h-full p-5 flex flex-col justify-between text-gray-900">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-1">
              Student ID
            </span>
            <h3 className="text-lg md:text-xl font-black tracking-tight text-brand-navy">
              REGISBRIDGE ACADEMY
            </h3>
          </div>
          {/* School Logo Watermark */}
          <div className="w-10 h-10 opacity-60 flex items-center justify-center bg-brand-navy/10 rounded-full">
            <span className="material-symbols-outlined text-brand-navy text-2xl">school</span>
          </div>
        </div>

        {/* Student Info */}
        <div className="flex gap-4 items-end mt-4">
          {/* Photo */}
          <div className="w-20 h-24 bg-gray-300 rounded overflow-hidden border-2 border-white shadow-sm shrink-0 relative">
            {photo ? (
              <Image
                src={photo}
                alt={photoAlt || `${studentName} photo`}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="material-symbols-outlined text-gray-400 text-4xl">person</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 pb-1 flex-1 min-w-0">
            <p className="text-base md:text-lg font-bold leading-tight truncate">
              {studentName}
            </p>
            <p className="text-xs font-mono text-gray-600">ID: {studentId}</p>
            {grade && (
              <p className="text-xs text-gray-600">Grade: {grade}</p>
            )}
            {house && (
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-brand-gold rounded-full" />
                <span className="text-xs font-bold uppercase text-brand-navy tracking-wide">
                  House {house}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-auto pt-3 opacity-50">
          <div className="h-8 w-full relative overflow-hidden">
            {/* Simple barcode pattern */}
            <div className="flex gap-[2px] h-full items-end">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-800"
                  style={{ height: `${60 + Math.random() * 40}%` }}
                />
              ))}
            </div>
          </div>
          <p className="text-[8px] text-center mt-1 font-mono text-gray-600">
            {studentId.replace(/-/g, '')}
          </p>
        </div>
      </div>
    </div>
  );
}
