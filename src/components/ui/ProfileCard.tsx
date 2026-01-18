'use client';

import React from 'react';
import Image from 'next/image';
import { MaterialIcon } from './material-icon';

export interface ProfileCardProps {
  name: string;
  role: string;
  department?: string;
  bio?: string;
  image?: string;
  imageAlt?: string;
  email?: string;
  phone?: string;
  office?: string;
  qualifications?: string[];
  onClick?: () => void;
}

export function ProfileCard({
  name,
  role,
  department,
  bio,
  image,
  imageAlt,
  email,
  phone,
  office,
  qualifications,
  onClick,
}: ProfileCardProps) {
  const CardWrapper = onClick ? 'button' : 'div';
  
  return (
    <CardWrapper
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
        onClick ? 'cursor-pointer text-left w-full' : ''
      }`}
    >
      <div className="relative">
        {/* Profile Image */}
        <div className="relative h-64 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || `${name} - ${role}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <MaterialIcon icon="person" className="text-brand-navy/30 text-8xl" />
            </div>
          )}
        </div>

        {/* Department Badge (if provided) */}
        {department && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-3 py-1 bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {department}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Name & Role */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-brand-primary font-medium mb-4">{role}</p>

        {/* Bio */}
        {bio && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {bio}
          </p>
        )}

        {/* Qualifications */}
        {qualifications && qualifications.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {qualifications.map((qual, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                >
                  {qual}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(email || phone || office) && (
          <div className="pt-4 border-t border-gray-100 space-y-2">
            {email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MaterialIcon icon="mail" className="text-brand-gold text-base" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-brand-primary transition-colors truncate"
                  onClick={(e) => e.stopPropagation()}
                >
                  {email}
                </a>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MaterialIcon icon="call" className="text-brand-gold text-base" />
                <a
                  href={`tel:${phone}`}
                  className="hover:text-brand-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {phone}
                </a>
              </div>
            )}
            {office && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MaterialIcon icon="location_on" className="text-brand-gold text-base" />
                <span>{office}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
