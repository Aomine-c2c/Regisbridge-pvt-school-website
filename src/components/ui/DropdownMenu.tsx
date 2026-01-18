'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
}

export default function DropdownMenu({ label, items, isActive = false }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-sm font-medium hover:text-brand-gold transition-colors ${
          isActive ? 'text-brand-gold' : 'text-brand-navy'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <span className={`material-symbols-outlined text-[18px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-navy/5 hover:text-brand-navy transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
