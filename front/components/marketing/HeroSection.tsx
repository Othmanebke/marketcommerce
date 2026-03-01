'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

export function HeroSection({ title, subtitle, backgroundImage, children }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Split title into words for reveal animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-ink-950 flex items-center justify-center pt-20"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-ink-950/50 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center"
        style={{ y: textY, opacity }}
      >
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-display-lg md:text-display-xl font-display text-transparent bg-clip-text text-paper-50 mb-6 flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 perspective-1000"
        >
          {title.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block transform-style-3d text-gradient-gold pb-2" dangerouslySetInnerHTML={{ __html: word === '<br/>' ? '<br/>' : word }}>
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-body md:text-heading-sm text-paper-50/80 max-w-2xl font-light tracking-wide mb-10"
        >
          {subtitle}
        </motion.p>
        
        {children && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
             className="w-full flex justify-center"
           >
             {children}
           </motion.div>
        )}
      </motion.div>
    </div>
  );
}
