'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import NewsCard from './NewsCard';

interface NewsCarouselProps {
  items: Array<{
    href: string;
    image: string;
    imageAlt: string;
    category: string;
    categoryColor: 'blue' | 'purple' | 'amber';
    date: string;
    title: string;
  }>;
}

export default function NewsCarousel({ items }: NewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 md:gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex-[0_0_85%] min-w-0 md:flex-[0_0_calc(33.333%-1.333rem)]">
              <NewsCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Mobile Only */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="p-2 rounded-full bg-brand-primary text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-primary-dark transition-colors"
          aria-label="Previous news item"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="p-2 rounded-full bg-brand-primary text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-primary-dark transition-colors"
          aria-label="Next news item"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>

      {/* Desktop Grid View - Hidden on Mobile */}
      <div className="hidden md:grid grid-cols-3 gap-8">
        {items.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
