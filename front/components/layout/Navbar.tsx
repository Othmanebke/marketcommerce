'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/collection', label: 'Collection' },
  { href: '/maison',     label: 'Maison'     },
  { href: '/journal',    label: 'Journal'    },
  { href: '/contact',    label: 'Contact'    },
]

interface NavbarProps {
  cartCount?: number
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-700
          ${scrolled
            ? 'bg-ink-950/80 backdrop-blur-xl border-b border-stroke-12 py-2'
            : 'bg-transparent border-b border-transparent py-4'
          }
        `}
      >
        <nav
          aria-label="Navigation principale"
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            className="
              font-serif text-2xl tracking-[0.2em] text-paper-50
              hover:text-gold-100 transition-colors duration-500
              focus-visible:outline-none
            "
            aria-label="Maison — Accueil"
          >
            Maison
          </Link>

          {/* Links desktop */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-10"
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-[10px] uppercase tracking-[0.25em] text-paper-50/70
                    hover:text-gold-100
                    transition-colors duration-500
                    focus-visible:outline-none
                  "
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Rechercher"
              className="
                w-9 h-9 flex items-center justify-center rounded-full
                text-paper-50/60 hover:text-paper-50 hover:bg-glass-08
                transition-all duration-micro ease-luxury
              "
            >
              <SearchIcon />
            </Link>

            {/* Cart */}
            <Link
              href="/panier"
              aria-label={`Panier — ${cartCount} article${cartCount !== 1 ? 's' : ''}`}
              className="
                w-9 h-9 flex items-center justify-center rounded-full relative
                text-paper-50/60 hover:text-paper-50 hover:bg-glass-08
                transition-all duration-micro ease-luxury
              "
            >
              <CartIcon />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="
                    absolute -top-0.5 -right-0.5
                    w-4 h-4 flex items-center justify-center
                    rounded-full bg-gold-100 text-ink-950
                    text-[10px] font-semibold leading-none
                  "
                >
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger mobile */}
            <button
              type="button"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(v => !v)}
              className="
                md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full
                text-paper-50/60 hover:text-paper-50 hover:bg-glass-08
                transition-all duration-micro ease-luxury
              "
            >
              <span className={`block w-4 h-px bg-current transition-all duration-micro ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block w-4 h-px bg-current transition-all duration-micro ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-4 h-px bg-current transition-all duration-micro ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            id="mobile-menu"
            role="dialog"
            aria-label="Menu de navigation"
            aria-modal="true"
            className="fixed inset-0 z-40 md:hidden glass-med flex flex-col pt-16"
          >
            <nav className="flex flex-col gap-1 p-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      block py-4 px-4 rounded-card
                      font-serif text-heading-sm text-paper-50
                      hover:bg-glass-08 hover:text-gold-100
                      transition-all duration-micro ease-luxury
                      border-b border-stroke-12
                    "
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2h1.5l2 7h6l1.5-5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="13" r="1" fill="currentColor"/>
      <circle cx="11" cy="13" r="1" fill="currentColor"/>
    </svg>
  )
}
