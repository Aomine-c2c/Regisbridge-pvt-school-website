'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Utensils, Bed, Shield, Maximize2, Pause, Play } from 'lucide-react';
import { boardingStatistics2021, healthInspectionApril2021 } from '@/lib/seed-data-facilities';
import ImageLightbox from '@/components/ui/ImageLightbox';
import './BoardingSection.css';

export default function BoardingSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Memoize static arrays
  const images = useMemo(() => [
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699636260_49e40a09.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699638574_3bf8d164.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699640323_81787eba.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699641121_fcd22c61.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699643219_6b7ca07d.webp',
    'https://d64gsuwffb70l.cloudfront.net/68f224a0db0ea9149c57d208_1760699645247_b9c68fa8.webp'
  ], []);

  const testimonials = useMemo(() => [
    { text: "Regisbridge feels like home away from home.", author: "Parent, Grade 5" },
    { text: "The boarding facilities are excellent and the staff truly care.", author: "Parent, Form 2" },
    { text: "My child has grown so much academically and socially.", author: "Parent, Grade 7" }
  ], []);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);
  
  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextImage]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
    setIsAutoPlaying(false); // Pause auto-play when lightbox opens
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  return (
    <section id="boarding" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-gradient-royal text-center mb-4 text-shadow-soft">
          Boarding & School Life
        </h2>
        <div className="divider-animated w-24 h-1 mx-auto mb-12"></div>

        <div className="max-w-6xl mx-auto">
          <div className="relative mb-12 group shadow-strong rounded-lg overflow-hidden">
            <img
              src={images[currentImage]}
              alt="Boarding life"
              className="w-full h-96 object-cover transition-opacity duration-500 cursor-pointer hover:scale-105 transition-transform"
              onClick={openLightbox}
            />
            
            {/* Expand Button */}
            <button
              onClick={openLightbox}
              className="absolute top-4 right-4 p-3 glass-card rounded-full shadow-glow-gold transition-all duration-200 opacity-0 group-hover:opacity-100 micro-bounce"
              aria-label="View in fullscreen"
            >
              <Maximize2 className="text-[#1C1A75] dark:text-white" size={20} />
            </button>

            {/* Auto-play Control */}
            <button
              onClick={toggleAutoPlay}
              className="absolute bottom-4 right-4 p-3 glass-card rounded-full shadow-medium transition-all duration-200 micro-bounce"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <Pause className="text-[#1C1A75] dark:text-white" size={20} />
              ) : (
                <Play className="text-[#1C1A75] dark:text-white" size={20} />
              )}
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 px-4 py-2 glass-card-dark text-white rounded-full text-sm font-semibold">
              {currentImage + 1} / {images.length}
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full card-elevated micro-bounce"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-[#1C1A75] dark:text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-2 rounded-full card-elevated micro-bounce"
              aria-label="Next image"
            >
              <ChevronRight className="text-[#1C1A75] dark:text-white" />
            </button>

            {/* Progress Indicator */}
            {isAutoPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700">
                <div className="h-full gradient-gold animate-progress"></div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`glass-card p-6 rounded-lg border-l-4 border-[#D4AF37] animate-slide-in animate-slide-in-delay-${index} shadow-soft card-elevated`}>
                <p className="text-gray-700 dark:text-gray-300 italic mb-3">"{testimonial.text}"</p>
                <p className="text-sm font-semibold text-gradient-gold">- {testimonial.author}</p>
              </div>
            ))}
          </div>
          
          {/* Boarding Statistics */}
          <div className="gradient-royal text-white p-8 rounded-lg mb-8 shadow-strong card-elevated">
            <h3 className="text-2xl font-bold mb-6 text-gradient-gold text-center text-shadow-soft">Boarding Facilities</h3>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center micro-float">
                <Users className="mx-auto mb-2 text-[#D4AF37]" size={40} />
                <div className="text-3xl font-bold">{boardingStatistics2021.totalOccupancy}</div>
                <div className="text-sm opacity-90">Current Boarders</div>
              </div>
              <div className="text-center micro-float">
                <Bed className="mx-auto mb-2 text-[#D4AF37]" size={40} />
                <div className="text-3xl font-bold">{boardingStatistics2021.totalCapacity}</div>
                <div className="text-sm opacity-90">Bed Capacity</div>
              </div>
              <div className="text-center micro-float">
                <Shield className="mx-auto mb-2 text-[#D4AF37]" size={40} />
                <div className="text-3xl font-bold">{boardingStatistics2021.staffAssigned}</div>
                <div className="text-sm opacity-90">Staff Members</div>
              </div>
              <div className="text-center micro-float">
                <Utensils className="mx-auto mb-2 text-[#D4AF37]" size={40} />
                <div className="text-3xl font-bold">{boardingStatistics2021.kitchenStaff}</div>
                <div className="text-sm opacity-90">Kitchen Staff</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="glass-card-dark p-4 rounded shadow-soft">
                <h4 className="font-bold mb-2">Boys' Hostel</h4>
                <p>{boardingStatistics2021.boysHostel.students} students + {boardingStatistics2021.boysHostel.staff} staff</p>
              </div>
              <div className="glass-card-dark p-4 rounded shadow-soft">
                <h4 className="font-bold mb-2">Girls' Hostel</h4>
                <p>{boardingStatistics2021.girlsHostel.students} students</p>
              </div>
            </div>
          </div>
          
          {/* Health & Safety Standards */}
          <div className="glass-card border-l-4 border-[#1C1A75] p-6 rounded-lg mb-8 shadow-medium card-interactive">
            <h3 className="text-xl font-bold text-gradient-royal mb-3">Health & Safety Standards</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Our boarding facilities are regularly inspected by the Turf Clinic Environmental Health Department. 
              Latest inspection: {new Date(healthInspectionApril2021.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <strong>Key Features:</strong>
                <ul className="list-disc list-inside ml-2 mt-1">
                  <li>Separate hostels for boys and girls</li>
                  <li>Adequate ablution facilities</li>
                  <li>Dedicated kitchen staff</li>
                  <li>COVID-19 safety protocols</li>
                </ul>
              </div>
              <div>
                <strong>Ongoing Improvements:</strong>
                <ul className="list-disc list-inside ml-2 mt-1">
                  <li>Enhanced ventilation systems</li>
                  <li>Modern kitchen equipment</li>
                  <li>Regular sanitation checks</li>
                  <li>Staff health examinations</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            Our boarding program provides a caring, family-like atmosphere where students thrive academically and personally. With modern facilities, nutritious meals, and engaging weekend activities, we ensure every boarder feels at home.
          </p>
        </div>
      </div>

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentImage}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={prevImage}
          altText="Boarding facilities"
        />
      )}
    </section>
  );
}
