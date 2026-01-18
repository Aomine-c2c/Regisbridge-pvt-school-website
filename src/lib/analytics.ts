'use client';

import { track } from '@vercel/analytics';

// Track CTA button clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  track('CTA Click', {
    cta: ctaName,
    location,
  });
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  track('Section View', {
    section: sectionName,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean) => {
  track('Form Submit', {
    form: formName,
    success: success.toString(),
  });
};

// Track link clicks
export const trackLinkClick = (linkText: string, destination: string) => {
  track('Link Click', {
    text: linkText,
    destination,
  });
};

// Track carousel interactions
export const trackCarouselSwipe = (carouselName: string, direction: 'left' | 'right') => {
  track('Carousel Swipe', {
    carousel: carouselName,
    direction,
  });
};

// Track video plays
export const trackVideoPlay = (videoName: string) => {
  track('Video Play', {
    video: videoName,
  });
};
