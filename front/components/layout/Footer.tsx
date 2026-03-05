import Link from 'next/link'
import DividerGoldHairline from '@/components/ui/Divider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const maison = [
  { href: '/collection', label: 'Collection'  },
  { href: '/maison',     label: 'La Maison'   },
  { href: '/journal',    label: 'Journal'     },
  { href: '/contact',    label: 'Contact'     },
]

const legal = [
  { href: '/cgv',             label: 'CGV'                },
  { href: '/confidentialite', label: 'Confidentialité'   },
  { href: '/cookies',         label: 'Cookies'            },
  { href: '/retours',         label: 'Retours'            },
]

const socials = [
  { href: '#', label: 'Instagram', icon: InstagramIcon },
  { href: '#', label: 'Pinterest', icon: PinterestIcon },
  { href: '#', label: 'LinkedIn',  icon: LinkedInIcon  },
]

export default function Footer() {
  return (
    <footer className="border-t border-stroke-12 bg-ink-950 relative overflow-hidden" role="contentinfo">
      {/* ── Large decorative background text ── */}
      <div
        className="absolute inset-x-0 top-0 flex items-start justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold uppercase tracking-[0.1em] text-paper-50/[0.025]"
          style={{ fontSize: 'clamp(5rem, 18vw, 16rem)', lineHeight: 1, whiteSpace: 'nowrap' }}
        >
          Maison
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 relative z-10">

        {/* ── Brand statement ── */}
        <ScrollReveal type="fade-up">
          <div className="text-center mb-20">
            <p className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-paper-50/70 font-light italic leading-relaxed max-w-3xl mx-auto">
              "Des compositions pensées pour durer.
              <span
                style={{
                  background: 'linear-gradient(135deg, #C9A85C 0%, #D6B56D 50%, #EDD992 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              > Chaque flacon, une signature."</span>
            </p>
          </div>
        </ScrollReveal>

        <DividerGoldHairline className="mb-16" />

        {/* ── Main grid ── */}
        <ScrollReveal type="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

            {/* Brand col */}
            <div className="md:col-span-1">
              <p className="font-serif text-3xl tracking-[0.2em] uppercase text-paper-50 mb-4">
                Maison
              </p>
              <p className="text-sm font-light text-paper-50/35 max-w-xs leading-relaxed mb-6">
                Parfumerie de création française. Des essences rares, une composition précise.
              </p>
              {/* Socials */}
              <div className="flex items-center gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-8 h-8 flex items-center justify-center
                      text-paper-50/25 hover:text-gold-100
                      border border-stroke-12 hover:border-gold-100/30
                      transition-all duration-400
                    "
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation col */}
            <nav aria-label="Navigation Maison" className="md:col-span-1">
              <p className="text-[10px] text-gold-100 uppercase tracking-[0.25em] mb-6">
                Navigation
              </p>
              <ul role="list" className="flex flex-col gap-3">
                {maison.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        draw-underline
                        text-[11px] text-paper-50/45 hover:text-paper-50
                        transition-colors duration-400
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal col */}
            <nav aria-label="Informations légales" className="md:col-span-1">
              <p className="text-[10px] text-gold-100 uppercase tracking-[0.25em] mb-6">
                Légal
              </p>
              <ul role="list" className="flex flex-col gap-3">
                {legal.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="
                        draw-underline
                        text-[11px] text-paper-50/45 hover:text-paper-50
                        transition-colors duration-400
                      "
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter col */}
            <div className="md:col-span-1">
              <p className="text-[10px] text-gold-100 uppercase tracking-[0.25em] mb-6">
                Newsletter
              </p>
              <p className="text-[12px] text-paper-50/40 font-light leading-relaxed mb-4">
                Soyez les premiers informés de nos nouvelles créations et éditions limitées.
              </p>
              <form className="flex border border-stroke-12 overflow-hidden hover:border-gold-100/20 transition-colors duration-500">
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-[11px] text-paper-50 placeholder:text-paper-50/20 outline-none"
                />
                <button
                  type="submit"
                  className="
                    px-4 py-2.5 shrink-0
                    bg-transparent hover:bg-gold-100
                    text-gold-100/70 hover:text-ink-950
                    text-[9px] uppercase tracking-[0.3em]
                    border-l border-stroke-12
                    transition-all duration-400
                  "
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>

        <DividerGoldHairline className="mb-8" />

        {/* ── Bottom row ── */}
        <ScrollReveal type="fade-in" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-paper-50/25">
              © {new Date().getFullYear()} Maison. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold-100/30" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-paper-50/20">
                Parfumerie de Création · France
              </p>
              <span className="w-1 h-1 rounded-full bg-gold-100/30" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 10.5C6.5 10.5 7 8.5 7 7.5C7 6.5 7.5 5.5 9 5.5C10.5 5.5 10.5 7 10 7.5C9.5 8 8.5 8 8 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 7v4M5 5.5v.01M8 11V8.5c0-1 .5-1.5 1.5-1.5S11 7.5 11 8.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
