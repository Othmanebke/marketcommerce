'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type RevealType = 'fade-up' | 'fade-in' | 'slide-right' | 'scale-up' | 'word-reveal';

interface ScrollRevealProps {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  type = 'fade-up',
  delay = 0,
  duration = 0.8,
  once = true,
  className = '',
  staggerChildren,
}: ScrollRevealProps) {
  const getVariants = () => {
    switch (type) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1], staggerChildren },
          },
        };
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay, ease: 'easeOut', staggerChildren },
          },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1], staggerChildren },
          },
        };
      case 'scale-up':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1], staggerChildren },
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: [0.16, 1, 0.3, 1], staggerChildren },
          },
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
