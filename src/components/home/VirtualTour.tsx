'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: 'campus' | 'classroom' | 'sports' | 'boarding' | 'events';
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    alt: 'Campus aerial view',
    title: 'Beautiful Campus Grounds',
    category: 'campus',
  },
  {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    alt: 'Students in modern classroom',
    title: 'State-of-the-Art Classrooms',
    category: 'classroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    alt: 'Rugby team on field',
    title: 'Championship Sports Facilities',
    category: 'sports',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    alt: 'Boarding house common room',
    title: 'Comfortable Boarding Facilities',
    category: 'boarding',
  },
  {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    alt: 'Science laboratory',
    title: 'Modern Science Labs',
    category: 'classroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    alt: 'Music performance',
    title: 'Arts & Performance Center',
    category: 'events',
  },
];

export default function VirtualTour() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | GalleryImage['category']>('all');

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="virtual-tour" aria-label="Campus Virtual Tour" className="py-16 px-6 lg:px-20 max-w-[1200px] mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Our Campus
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Take a visual tour of our world-class facilities and vibrant community
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {(['all', 'campus', 'classroom', 'sports', 'boarding', 'events'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-video rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-all hover:scale-105"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold">{image.title}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
            aria-label="Previous image"
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>

          <div className="relative max-w-5xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video">
              <Image
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <p className="text-white text-center mt-4 text-lg font-medium">
              {filteredImages[selectedImage].title}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
            aria-label="Next image"
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Want to see more? Schedule a personal campus tour.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
        >
          Book a Tour
          <span className="material-symbols-outlined text-sm" aria-hidden="true">calendar_today</span>
        </a>
      </div>
    </section>
  );
}
