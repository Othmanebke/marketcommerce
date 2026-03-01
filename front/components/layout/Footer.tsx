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
  { href: '#', label: 'LinkedIn',  icon: LinkedInIcon  },
]

export default function Footer() {
  return (
    <footer className="border-t border-stroke-12 mt-24" role="contentinfo">
      <ScrollReveal>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-[18px] tracking-[0.12em] uppercase text-paper-50 mb-3">
              Maison
            </p>
            <p className="text-ui text-paper-50/40 max-w-xs leading-relaxed">
              Parfumerie de création. Des compositions conçues pour rester.
            </p>
          </div>

          {/* Maison links */}
          <nav aria-label="Navigation Maison">
            <p className="text-caption text-gold-100 uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul role="list" className="flex flex-col gap-2">
              {maison.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-ui text-paper-50/50 hover:text-paper-50
                      transition-colors duration-micro ease-luxury
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal links */}
          <nav aria-label="Informations légales">
            <p className="text-caption text-gold-100 uppercase tracking-widest mb-4">
              Légal
            </p>
            <ul role="list" className="flex flex-col gap-2">
              {legal.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      text-ui text-paper-50/50 hover:text-paper-50
                      transition-colors duration-micro ease-luxury
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <DividerGoldHairline className="mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-paper-50/30">
            © {new Date().getFullYear()} Maison. Tous droits réservés.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-8 h-8 flex items-center justify-center rounded-full
                  text-paper-50/30 hover:text-gold-100 hover:bg-glass-08
                  transition-all duration-micro ease-luxury
                "
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      </ScrollReveal>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 7v4M5 5.5v.01M8 11V8.5c0-1 .5-1.5 1.5-1.5S11 7.5 11 8.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
