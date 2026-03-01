'use client';

import { ReactNode } from 'react';

interface MarqueeStripProps {
  children: ReactNode;
  speed?: 'normal' | 'fast' | 'slow';
  reverse?: boolean;
  className?: string;
}

export function MarqueeStrip({
  children,
  speed = 'normal',
  reverse = false,
  className = '',
}: MarqueeStripProps) {
  const durationMap = {
    fast: '15s',
    normal: '30s',
    slow: '60s'
  };

  const directionClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';

  return (
    <div className={`flex overflow-hidden whitespace-nowrap w-full ${className}`}>
      <div 
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 ${directionClass}`}
        style={{ animationDuration: durationMap[speed] }}
      >
        {children}
      </div>
      <div 
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 ${directionClass}`}
        aria-hidden="true"
        style={{ animationDuration: durationMap[speed] }}
      >
        {children}
      </div>
    </div>
  );
}
