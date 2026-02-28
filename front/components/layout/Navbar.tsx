'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
      <header
        role="banner"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-reveal ease-luxury
          ${scrolled
            ? 'glass-med border-b border-stroke-12'
            : 'bg-transparent border-b border-transparent'
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
              font-serif text-[18px] tracking-[0.12em] uppercase text-paper-50
              hover:text-gold-100 transition-colors duration-micro ease-luxury
              focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]
            "
            aria-label="Maison — Accueil"
          >
            Maison
          </Link>

          {/* Links desktop */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="
                    text-ui text-paper-50/70 tracking-wide
                    hover:text-paper-50
                    transition-colors duration-micro ease-luxury
                    focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]
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
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu de navigation"
        aria-modal="true"
        hidden={!menuOpen}
        className={`
          fixed inset-0 z-40 md:hidden
          glass-med flex flex-col
          transition-all duration-modal ease-luxury
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="h-16" aria-hidden="true" />
        <nav className="flex flex-col gap-1 p-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="
                py-4 px-4 rounded-card
                font-serif text-heading-sm text-paper-50
                hover:bg-glass-08 hover:text-gold-100
                transition-all duration-micro ease-luxury
                border-b border-stroke-12
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
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
