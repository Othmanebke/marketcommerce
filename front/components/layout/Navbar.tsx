'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'

const leftLinks  = [
  { href: '/collection', label: 'Collection' },
  { href: '/maison',     label: 'Maison'     },
]
const rightLinks = [
  { href: '/journal',    label: 'Journal'    },
  { href: '/contact',    label: 'Contact'    },
]

interface NavbarProps {
  onCartOpen:   () => void
  onSearchOpen: () => void
}

export default function Navbar({ onCartOpen, onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalQty }            = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-700
          ${scrolled
            ? 'bg-ink-950/92 backdrop-blur-xl border-b border-stroke-12'
            : 'bg-transparent'
          }
        `}
      >
        {/* Gold hairline — always at very top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-100/20 to-transparent" />

        <nav
          aria-label="Navigation principale"
          className="max-w-[1440px] mx-auto px-8 md:px-14 h-[72px] grid grid-cols-[1fr_auto_1fr] items-center"
        >
          {/* ── Left links ── */}
          <ul role="list" className="hidden md:flex items-center gap-10">
            {leftLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    draw-underline
                    text-[9px] uppercase tracking-[0.32em] text-paper-50/50
                    hover:text-paper-50 transition-colors duration-500
                    focus-visible:outline-none
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Center logo ── */}
          <Link
            href="/"
            aria-label="Maison — Accueil"
            className="
              font-serif text-[17px] tracking-[0.55em] uppercase
              text-paper-50 hover:text-gold-100
              transition-colors duration-700 focus-visible:outline-none
              select-none
            "
          >
            Maison
          </Link>

          {/* ── Right: links + icons ── */}
          <div className="flex items-center gap-10 justify-end">
            <ul role="list" className="hidden md:flex items-center gap-10">
              {rightLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      draw-underline
                      text-[9px] uppercase tracking-[0.32em] text-paper-50/50
                      hover:text-paper-50 transition-colors duration-500
                      focus-visible:outline-none
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icons cluster */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                type="button"
                onClick={onSearchOpen}
                aria-label="Ouvrir la recherche"
                className="
                  w-9 h-9 flex items-center justify-center rounded-full
                  text-paper-50/45 hover:text-paper-50 hover:bg-glass-08
                  transition-all duration-300 focus-visible:outline-none
                "
              >
                <SearchIcon />
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={onCartOpen}
                aria-label={`Ouvrir le panier — ${totalQty} article${totalQty !== 1 ? 's' : ''}`}
                className="
                  relative w-9 h-9 flex items-center justify-center rounded-full
                  text-paper-50/45 hover:text-paper-50 hover:bg-glass-08
                  transition-all duration-300 focus-visible:outline-none
                "
              >
                <CartIcon />
                <AnimatePresence>
                  {totalQty > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      aria-hidden="true"
                      className="
                        absolute -top-0.5 -right-0.5
                        w-[18px] h-[18px] flex items-center justify-center
                        rounded-full bg-gold-100 text-ink-950
                        text-[9px] font-bold leading-none
                      "
                    >
                      {totalQty > 9 ? '9+' : totalQty}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Hamburger — mobile only */}
              <button
                type="button"
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
                className="
                  md:hidden ml-1 w-9 h-9 flex flex-col items-center justify-center gap-[5px]
                  text-paper-50/50 hover:text-paper-50 transition-colors duration-300
                  focus-visible:outline-none
                "
              >
                <span className={`block h-px bg-current transition-all duration-400 ${menuOpen ? 'w-5 rotate-45 translate-y-[5px]' : 'w-5'}`} />
                <span className={`block h-px bg-current transition-all duration-400 ${menuOpen ? 'w-0 opacity-0' : 'w-3.5 ml-[-3px]'}`} />
                <span className={`block h-px bg-current transition-all duration-400 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[5px]' : 'w-5'}`} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Fullscreen Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-nav"
            role="dialog"
            aria-label="Menu principal"
            aria-modal="true"
            className="fixed inset-0 z-40 md:hidden bg-ink-950 flex flex-col"
          >
            {/* Top bar in menu */}
            <div className="h-[72px] flex items-center justify-between px-8 border-b border-stroke-12">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-[17px] tracking-[0.55em] uppercase text-paper-50"
              >
                Maison
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-paper-50/40 hover:text-paper-50 transition-colors"
                aria-label="Fermer le menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col items-start justify-center px-10 gap-1">
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      block py-4 font-serif text-5xl text-paper-50
                      hover:text-gold-100 transition-colors duration-500
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-6"
              >
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onSearchOpen() }}
                  className="text-[9px] uppercase tracking-[0.35em] text-paper-50/40 hover:text-gold-100 transition-colors flex items-center gap-2"
                >
                  <SearchIcon small /> Rechercher
                </button>
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onCartOpen() }}
                  className="text-[9px] uppercase tracking-[0.35em] text-paper-50/40 hover:text-gold-100 transition-colors flex items-center gap-2"
                >
                  <CartIcon small /> Panier {totalQty > 0 ? `(${totalQty})` : ''}
                </button>
              </motion.div>
            </nav>

            {/* Bottom */}
            <div className="px-10 py-8 border-t border-stroke-12">
              <p className="text-[8px] uppercase tracking-[0.35em] text-paper-50/20">
                Parfumerie de création — France
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Icons ──────────────────────────────────────────

function SearchIcon({ small }: { small?: boolean }) {
  const s = small ? 14 : 16
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function CartIcon({ small }: { small?: boolean }) {
  const s = small ? 14 : 16
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1.5 1.5h2l2 8h7l2-5.5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="13.5" r="1" fill="currentColor"/>
      <circle cx="11" cy="13.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
