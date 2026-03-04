'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

const SUGGESTIONS = [
  { label: 'Noir Velours',  href: '/parfum/noir-velours'  },
  { label: 'Bleu Minéral',  href: '/parfum/bleu-mineral'  },
  { label: 'Or Solaire',    href: '/parfum/or-solaire'    },
  { label: 'Iris Blanc',    href: '/parfum/iris-blanc'    },
]

const TAGS = ['Boisé', 'Oriental', 'Floral', 'Frais', 'Épicé', 'Ambré', 'Musqué']

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery]   = useState('')
  const inputRef            = useRef<HTMLInputElement>(null)
  const router              = useRouter()

  // Auto-focus
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    } else {
      setQuery('')
    }
  }, [open])

  // ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      onClose()
    }
  }

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
  }
  const item = {
    hidden:  { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as number[] } },
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="Recherche"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-ink-950/97 backdrop-blur-2xl flex flex-col"
          style={{ backgroundColor: 'rgba(5,5,7,0.97)' }}
        >
          {/* Top hairline */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-100/30 to-transparent" />

          {/* Header bar */}
          <div className="flex items-center justify-between px-8 md:px-16 py-7 border-b border-stroke-12">
            <p className="text-[9px] uppercase tracking-[0.4em] text-gold-100">Recherche</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer la recherche"
              className="w-10 h-10 flex items-center justify-center rounded-full text-paper-50/40 hover:text-paper-50 hover:bg-glass-08 transition-all duration-300"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 md:px-16 -mt-20">

            {/* Search form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl mb-16"
            >
              <div className="relative border-b-2 border-stroke-18 flex items-center gap-5 pb-5 group focus-within:border-gold-100/50 transition-colors duration-700">
                <SearchIcon className="text-paper-50/20 shrink-0 group-focus-within:text-gold-100/50 transition-colors duration-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Un parfum, une note, une matière…"
                  className="
                    flex-1 bg-transparent font-serif
                    text-[clamp(1.8rem,4vw,3.5rem)]
                    text-paper-50 placeholder:text-paper-50/15
                    outline-none caret-gold-100 leading-tight
                  "
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(''); inputRef.current?.focus() }}
                    className="text-paper-50/30 hover:text-paper-50/60 transition-colors shrink-0"
                  >
                    <CloseIcon size={16} />
                  </button>
                )}
              </div>
              {/* Hidden submit */}
              <button type="submit" className="sr-only">Rechercher</button>
            </motion.form>

            {/* Bottom content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Suggestions */}
              <motion.div variants={item}>
                <p className="text-[9px] uppercase tracking-[0.35em] text-paper-50/25 mb-5">
                  Parfums
                </p>
                <ul className="flex flex-col gap-3">
                  {SUGGESTIONS.map(s => (
                    <li key={s.label}>
                      <Link
                        href={s.href}
                        onClick={onClose}
                        className="flex items-center justify-between group/s py-2 border-b border-stroke-12 hover:border-gold-100/20 transition-colors duration-400"
                      >
                        <span className="font-serif text-xl text-paper-50/60 group-hover/s:text-paper-50 transition-colors duration-400">
                          {s.label}
                        </span>
                        <span className="text-gold-100/0 group-hover/s:text-gold-100/60 transition-colors duration-400 text-sm">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tags */}
              <motion.div variants={item}>
                <p className="text-[9px] uppercase tracking-[0.35em] text-paper-50/25 mb-5">
                  Familles olfactives
                </p>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        router.push(`/collection?famille=${encodeURIComponent(tag.toLowerCase())}`)
                        onClose()
                      }}
                      className="
                        px-4 py-2 border border-stroke-12
                        text-[9px] uppercase tracking-[0.25em] text-paper-50/40
                        hover:border-gold-100/40 hover:text-gold-100
                        transition-all duration-400
                      "
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom keyboard hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-8 md:px-16 py-6 flex justify-center"
          >
            <p className="text-[8px] uppercase tracking-[0.3em] text-paper-50/15">
              Appuyez sur Entrée pour rechercher · Échap pour fermer
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 18L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
