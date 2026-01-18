'use client';

import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  separator?: string;
  suffix?: string;
  decimals?: number;
}

export function useCountUp({
  end,
  duration = 2000,
  start = 0,
  separator = ',',
  suffix = '',
  decimals = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation (easeOutExpo)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = start + (end - start) * easeOutExpo;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  // Format the number
  const formatNumber = (num: number): string => {
    const fixedNum = num.toFixed(decimals);
    const parts = fixedNum.split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decimals > 0 ? `${integerPart}.${parts[1]}${suffix}` : `${integerPart}${suffix}`;
  };

  return formatNumber(count);
}
