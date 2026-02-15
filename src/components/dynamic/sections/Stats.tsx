'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Trophy, GraduationCap } from 'lucide-react';

interface StatsProps {
  stats?: { label: string; value: string; icon?: string }[];
}

export function Stats({ stats }: StatsProps) {
  // Default stats if none provided
  const displayStats = stats || [
    { label: "Students", value: "1,200+", icon: "users" },
    { label: "Expert Faculty", value: "85+", icon: "graduation-cap" },
    { label: "Pass Rate", value: "100%", icon: "trophy" },
    { label: "Subjects", value: "24", icon: "book-open" },
  ];

  const getIcon = (name: string) => {
      switch(name) {
          case 'users': return Users;
          case 'graduation-cap': return GraduationCap;
          case 'trophy': return Trophy;
          case 'book-open': return BookOpen;
          default: return Users;
      }
  };

  return (
    <section className="py-20 bg-brand-navy text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => {
            const Icon = getIcon(stat.icon || 'users');
            return (
                <motion.div 
                    key={index}
                    className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Icon className="w-10 h-10 text-brand-gold mx-auto mb-4" />
                    <h3 className="text-4xl font-bold mb-2 font-heading">{stat.value}</h3>
                    <p className="text-gray-300 uppercase tracking-wider text-sm">{stat.label}</p>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
