'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface HeroVideoProps {
  videoUrl: string;
  posterImage: string;
  posterAlt: string;
  children: React.ReactNode;
  enabled?: boolean;
}

export default function HeroVideo({
  videoUrl,
  posterImage,
  posterAlt,
  children,
  enabled = false,
}: HeroVideoProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only load video on desktop with good connection
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const connection = (navigator as any).connection;
    const shouldLoad = enabled && mediaQuery.matches && (!connection || connection.effectiveType === '4g');
    
    setShouldPlayVideo(shouldLoad);

    if (shouldLoad && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, fallback to image
        setShouldPlayVideo(false);
      });
    }
  }, [enabled]);

  return (
    <section aria-label="Hero" className="relative w-full">
      <div className="absolute inset-0 z-0">
        {/* Video Background (Optional) */}
        {shouldPlayVideo && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage}
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Fallback Image */}
        <Image
          src={posterImage}
          alt={posterAlt}
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          className={`object-cover ${shouldPlayVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}
          sizes="100vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      {/* Hero Content */}
      {children}
    </section>
  );
}
