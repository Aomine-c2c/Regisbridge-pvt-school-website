'use client';

import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  altText?: string;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  altText = 'Gallery image'
}: ImageLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrevious]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed);
  }, [isZoomed]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
        aria-label="Close lightbox"
      >
        <X className="text-white" size={28} />
      </button>

      {/* Zoom Button */}
      <button
        onClick={toggleZoom}
        className="absolute top-4 right-20 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
        aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
      >
        {isZoomed ? (
          <ZoomOut className="text-white" size={24} />
        ) : (
          <ZoomIn className="text-white" size={24} />
        )}
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full z-10">
        <span className="text-white font-semibold">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm z-10 group"
          aria-label="Previous image"
        >
          <ChevronLeft className="text-white group-hover:scale-110 transition-transform" size={32} />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm z-10 group"
          aria-label="Next image"
        >
          <ChevronRight className="text-white group-hover:scale-110 transition-transform" size={32} />
        </button>
      )}

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <img
          src={images[currentIndex]}
          alt={`${altText} ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain transition-all duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg max-w-[90vw] overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                const diff = index - currentIndex;
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext();
                } else if (diff < 0) {
                  for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                }
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? 'ring-2 ring-[#D4AF37] scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/60 text-sm text-center hidden md:block">
        <p>Use arrow keys to navigate • ESC to close • Click image to zoom</p>
      </div>
    </div>
  );
}
