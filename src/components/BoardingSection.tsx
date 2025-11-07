'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BoardingSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699636260_49e40a09.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699638574_3bf8d164.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699640323_81787eba.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699641121_fcd22c61.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699643219_6b7ca07d.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699645247_b9c68fa8.webp'
  ];

  const testimonials = [
    { text: "Regisbridge feels like home away from home.", author: "Parent, Grade 5" },
    { text: "The boarding facilities are excellent and the staff truly care.", author: "Parent, Form 2" },
    { text: "My child has grown so much academically and socially.", author: "Parent, Grade 7" }
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="boarding" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-[#1C1A75] text-center mb-4">
          Boarding & School Life
        </h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-12"></div>

        <div className="max-w-6xl mx-auto">
          <div className="relative mb-12">
            <img
              src={images[currentImage]}
              alt="Boarding life"
              className="w-full h-96 object-cover rounded-lg shadow-lg transition-opacity duration-500"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-[#1C1A75]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="text-[#1C1A75]" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#D4AF37] animate-slide-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
                <p className="text-sm font-semibold text-[#1C1A75]">- {testimonial.author}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-700 text-lg">
            Our boarding program provides a caring, family-like atmosphere where students thrive academically and personally. With modern facilities, nutritious meals, and engaging weekend activities, we ensure every boarder feels at home.
          </p>
        </div>
      </div>
    </section>
  );
}
