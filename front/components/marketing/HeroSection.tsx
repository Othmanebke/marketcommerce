'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroSectionProps {
  title:            string
  subtitle:         string
  eyebrow?:         string
  backgroundImage?: string
  videoUrl?:        string
  children?:        React.ReactNode
  align?:           'left' | 'center'
}

export function HeroSection({
  title,
  subtitle,
  eyebrow,
  backgroundImage,
  videoUrl,
  children,
  align = 'left',
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => { setIsMounted(true) }, [])

  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start start', 'end start'],
  })

  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const fade     = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const words = title.split(' ')

  const isLeft = align === 'left'

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-ink-950 flex items-end"
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={{ y: bgY }}
      >
        {isMounted && videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[115%] object-cover -mt-[7.5%]"
            src={videoUrl}
          />
        ) : backgroundImage ? (
          <div
            className="w-full h-[115%] -mt-[7.5%]"
            style={{
              backgroundImage:    `url(${backgroundImage})`,
              backgroundPosition: 'center 30%',
              backgroundSize:     'cover',
            }}
          />
        ) : (
          <div className="w-full h-full bg-ink-950" />
        )}

        {/* Multi-layer atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/50 via-transparent to-ink-950/20" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </motion.div>

      {/* ── Decorative vertical line — far left ── */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-8 md:left-14 top-1/4 bottom-1/4 w-px origin-top"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(214,181,109,0.35), transparent)' }}
      />

      {/* ── Vertical text — far right ── */}
      <div
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}
      >
        <p className="text-[8px] uppercase tracking-[0.45em] text-paper-50/18 font-sans">
          Parfumerie de Création — Depuis 2024
        </p>
      </div>

      {/* ── Decorative number — upper right ── */}
      <div className="absolute top-28 right-10 md:right-20 z-10 pointer-events-none hidden lg:block">
        <span
          className="font-serif text-[120px] leading-none font-bold select-none"
          style={{ color: 'rgba(214,181,109,0.04)', letterSpacing: '-0.04em' }}
        >
          01
        </span>
      </div>

      {/* ── Main content ── */}
      <motion.div
        className={`
          relative z-10 w-full max-w-[1440px] mx-auto
          px-8 md:px-14 pb-24 md:pb-32
          ${isLeft ? '' : 'flex flex-col items-center text-center'}
        `}
        style={{ y: contentY, opacity: fade }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -20 : 0, y: isLeft ? 0 : 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-7"
        >
          <span className="block w-8 h-px bg-gold-100/50" />
          <p className="text-[9px] uppercase tracking-[0.45em] text-gold-100">
            {eyebrow ?? 'Collection Permanente'}
          </p>
        </motion.div>

        {/* Title — word-by-word reveal */}
        <h1
          className={`
            font-serif mb-7 leading-[1.02]
            text-[clamp(2.8rem,6.5vw,6.5rem)]
            ${isLeft ? 'max-w-5xl' : 'max-w-4xl mx-auto'}
          `}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
              <motion.span
                className="inline-block text-paper-50"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.95,
                  delay:    0.5 + i * 0.09,
                  ease:     [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.1 }}
          className={`
            text-paper-50/55 text-sm md:text-[15px] font-light tracking-wide leading-relaxed mb-10
            ${isLeft ? 'max-w-sm' : 'max-w-md mx-auto'}
          `}
        >
          {subtitle}
        </motion.p>

        {/* CTA slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5"
      >
        <p className="text-[7px] uppercase tracking-[0.5em] text-paper-50/25">Défiler</p>
        <div className="w-px h-10 bg-stroke-12 relative overflow-hidden">
          <motion.div
            className="absolute w-full bg-gold-100/60"
            style={{ height: '40%' }}
            animate={{ y: ['-100%', '350%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  )
}
