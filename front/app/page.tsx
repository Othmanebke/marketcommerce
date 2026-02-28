import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import DividerGoldHairline from '@/components/ui/Divider'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import NewsletterForm from '@/components/marketing/NewsletterForm'

export const metadata: Metadata = {
  title: 'Maison — Parfumerie de création',
  description:
    'Des matières choisies, une composition précise, une tenue pensée pour durer.',
}

// ── Mock data (remplacé par API calls en prod) ──
const FEATURED_PRODUCT = {
  name: 'Noir Velours',
  concentration: 'Extrait de Parfum',
  price: 220,
  slug: 'noir-velours',
}

const BESTSELLERS: ProductCardData[] = [
  {
    slug: 'noir-velours',
    name: 'Noir Velours',
    concentration: 'Extrait de Parfum',
    priceFromCents: 22000,
    heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
    badges: ['Atelier'],
  },
  {
    slug: 'bleu-mineral',
    name: 'Bleu Minéral',
    concentration: 'Eau de Parfum',
    priceFromCents: 16000,
    heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80',
    badges: ['Nouveau'],
  },
  {
    slug: 'or-solaire',
    name: 'Or Solaire',
    concentration: 'Eau de Parfum',
    priceFromCents: 18000,
    heroImageUrl: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=800&q=80',
  },
  {
    slug: 'iris-blanc',
    name: 'Iris Blanc',
    concentration: 'Extrait de Parfum',
    priceFromCents: 26000,
    heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80',
    badges: ['Édition limitée'],
  },
]

const UNIVERS = [
  {
    id: 'noir',
    label: 'Noir Velours',
    tagline: 'Profond. Résine. Fumé.',
    href: '/collection?vibe=noir-velours',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80',
  },
  {
    id: 'or',
    label: 'Or Solaire',
    tagline: 'Chaleur ambrée. Lumière.',
    href: '/collection?vibe=or-solaire',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80',
  },
  {
    id: 'bleu',
    label: 'Bleu Minéral',
    tagline: 'Frais. Propre. Élégant.',
    href: '/collection?vibe=bleu-mineral',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80',
  },
]

const SAVOIR_FAIRE = [
  {
    id: 'matieres',
    title: 'Matières',
    desc: 'Sélection rigoureuse, traçabilité, accords précis.',
    icon: '◈',
  },
  {
    id: 'atelier',
    title: 'Atelier',
    desc: 'Assemblage artisanal, finitions pensées.',
    icon: '◇',
  },
  {
    id: 'tenue',
    title: 'Tenue',
    desc: 'Équilibre et persistance sur la peau.',
    icon: '○',
  },
]

const JOURNAL_POSTS = [
  {
    slug: 'le-role-du-fond',
    title: 'Le rôle des notes de fond',
    excerpt: "Comment le vétiver, l'ambre et la résine construisent la persistance d'un accord.",
    tag: 'Matières',
    image: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=800&q=80',
  },
  {
    slug: 'concentration-extrait',
    title: "Pourquoi l'Extrait",
    excerpt: 'La concentration maximale : moins de surface, plus de durée, plus de présence.',
    tag: 'Atelier',
    image: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80',
  },
  {
    slug: 'rituel-application',
    title: "Le rituel d'application",
    excerpt: 'Points de chaleur, superposition, moment : les gestes qui font durer.',
    tag: 'Rituels',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-label="Présentation Maison"
        className="relative h-screen min-h-[600px] flex items-end pb-16 overflow-hidden"
      >
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=1920&q=85"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-end justify-between gap-8">
          {/* Text block */}
          <div className="max-w-xl animate-fade-up">
            <p className="text-caption text-gold-100 uppercase tracking-[0.2em] mb-4">
              Maison · Parfumerie
            </p>
            <h1 className="font-serif text-display-sm md:text-display-lg text-paper-50 mb-4">
              Une signature.
              <br />
              Un sillage.
              <br />
              Une présence.
            </h1>
            <p className="text-ui text-paper-50/60 mb-8 max-w-md leading-relaxed">
              Des matières choisies, une composition précise,
              une tenue pensée pour durer.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/collection"
                className="inline-flex items-center justify-center gap-2 rounded-btn font-sans tracking-wide transition-all duration-micro ease-luxury cursor-pointer px-6 py-3 text-ui bg-gold-100 text-ink-950 font-medium hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(214,181,109,0.35)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]"
              >
                Découvrir la collection
              </Link>
              <Link
                href="/collection#conseiller"
                className="inline-flex items-center justify-center gap-2 rounded-btn font-sans tracking-wide transition-all duration-micro ease-luxury cursor-pointer px-6 py-3 text-ui bg-glass-06 backdrop-blur-soft border border-stroke-12 text-paper-50 hover:-translate-y-px hover:bg-glass-10 hover:border-stroke-18 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]"
              >
                Trouver mon parfum
              </Link>
            </div>
          </div>

          {/* Spotlight Card */}
          <GlassCard className="p-5 w-full md:w-72 shrink-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <p className="text-caption text-gold-100 uppercase tracking-widest mb-3">
              Création du moment
            </p>
            <p className="font-serif text-heading-sm text-paper-50 mb-1">
              {FEATURED_PRODUCT.name}
            </p>
            <p className="text-caption text-paper-50/40 mb-3">
              {FEATURED_PRODUCT.concentration}
            </p>
            <DividerGoldHairline className="mb-3" />
            <p className="text-ui text-paper-50/60 mb-1">
              À partir de {FEATURED_PRODUCT.price} €
            </p>
            <p className="text-caption text-paper-50/40 mb-4">
              Échantillon disponible
            </p>
            <Link
              href={`/parfum/${FEATURED_PRODUCT.slug}`}
              className="
                text-ui text-gold-100 hover:text-paper-50
                transition-colors duration-micro ease-luxury
                inline-flex items-center gap-1
              "
            >
              Voir la création
              <span aria-hidden="true">→</span>
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* ── UNIVERS ── */}
      <section aria-label="Univers olfactifs" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {UNIVERS.map(u => (
              <Link
                key={u.id}
                href={u.href}
                className="
                  group relative aspect-[3/4] overflow-hidden rounded-card
                  block
                "
              >
                <Image
                  src={u.image}
                  alt={u.label}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-luxury group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                {/* Gold border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[rgba(214,181,109,0.3)] rounded-card transition-colors duration-reveal ease-luxury" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-serif text-heading-sm text-paper-50 mb-1">{u.label}</p>
                  <p className="text-ui text-paper-50/60">{u.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTE ── */}
      <section aria-label="Manifeste" className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <DividerGoldHairline label="Maison" className="mb-12" />
          <blockquote className="font-serif text-heading-md text-paper-50 leading-snug mb-8 italic">
            "Une maison sans enseigne ni artifice.
            Des compositions conçues pour rester, pas pour séduire."
          </blockquote>
          <Link
            href="/maison"
            className="
              text-ui text-gold-100 hover:text-paper-50
              transition-colors duration-micro ease-luxury
              inline-flex items-center gap-2
            "
          >
            Découvrir la Maison
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ── BEST-SELLERS ── */}
      <section aria-label="Sélection" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-caption text-gold-100 uppercase tracking-widest mb-2">
                Sélection
              </p>
              <h2 className="font-serif text-heading-lg text-paper-50">
                Les essentiels
              </h2>
            </div>
            <Link
              href="/collection"
              className="
                hidden md:inline-flex items-center gap-2
                text-ui text-paper-50/50 hover:text-gold-100
                transition-colors duration-micro ease-luxury
              "
            >
              Voir tout <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {BESTSELLERS.map((product, i) => (
              <ProductCard key={product.slug} product={product} priority={i < 2} />
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href="/collection"
              className="inline-flex items-center justify-center gap-2 rounded-btn font-sans tracking-wide transition-all duration-micro ease-luxury cursor-pointer px-6 py-3 text-ui bg-glass-06 backdrop-blur-soft border border-stroke-12 text-paper-50 hover:-translate-y-px hover:bg-glass-10 hover:border-stroke-18 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]"
            >
              Voir toute la collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── SAVOIR-FAIRE ── */}
      <section aria-label="Savoir-faire" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <DividerGoldHairline label="Savoir-faire" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAVOIR_FAIRE.map(item => (
              <GlassCard key={item.id} className="p-6">
                <span className="text-2xl text-gold-100 mb-4 block" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-serif text-heading-sm text-paper-50 mb-2">
                  {item.title}
                </h3>
                <p className="text-ui text-paper-50/50 leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNAL ── */}
      <section aria-label="Journal" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-caption text-gold-100 uppercase tracking-widest mb-2">
                Journal
              </p>
              <h2 className="font-serif text-heading-lg text-paper-50">
                Notes & matières
              </h2>
            </div>
            <Link
              href="/journal"
              className="
                hidden md:inline-flex items-center gap-2
                text-ui text-paper-50/50 hover:text-gold-100
                transition-colors duration-micro ease-luxury
              "
            >
              Lire le Journal <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOURNAL_POSTS.map(post => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-video overflow-hidden rounded-card">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-luxury group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-chip text-caption text-gold-100 bg-glass-08 backdrop-blur-soft border border-stroke-12">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-heading-sm text-paper-50 mb-2 group-hover:text-gold-100 transition-colors duration-micro ease-luxury">
                    {post.title}
                  </h3>
                  <p className="text-ui text-paper-50/50 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section aria-label="Services" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <DividerGoldHairline className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <span className="text-2xl text-gold-100" aria-hidden="true">◈</span>
              <h3 className="text-ui font-medium text-paper-50">Conseil parfum</h3>
              <p className="text-caption text-paper-50/40">
                Un conseiller dédié pour trouver votre signature.
              </p>
              <button
                type="button"
                className="text-ui text-gold-100 hover:text-paper-50 transition-colors duration-micro ease-luxury"
              >
                Démarrer →
              </button>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-2xl text-gold-100" aria-hidden="true">◇</span>
              <h3 className="text-ui font-medium text-paper-50">Échantillons</h3>
              <p className="text-caption text-paper-50/40">
                Essayez avant de choisir.
              </p>
              <Link
                href="/collection?type=echantillon"
                className="text-ui text-gold-100 hover:text-paper-50 transition-colors duration-micro ease-luxury"
              >
                Découvrir →
              </Link>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="text-2xl text-gold-100" aria-hidden="true">○</span>
              <h3 className="text-ui font-medium text-paper-50">Retours 14 jours</h3>
              <p className="text-caption text-paper-50/40">
                Retour simple et sans questions.
              </p>
              <Link
                href="/retours"
                className="text-ui text-gold-100 hover:text-paper-50 transition-colors duration-micro ease-luxury"
              >
                En savoir plus →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER VIP ── */}
      <section aria-label="Newsletter" className="py-24 px-6">
        <div className="max-w-lg mx-auto">
          <GlassCard className="p-8 md:p-10 text-center">
            <p className="text-caption text-gold-100 uppercase tracking-widest mb-3">
              Accès privé
            </p>
            <h2 className="font-serif text-heading-md text-paper-50 mb-3">
              Accès privé aux sorties.
            </h2>
            <p className="text-ui text-paper-50/50 mb-6">
              Pas de bruit. Uniquement l'essentiel.
            </p>

            <NewsletterForm />

            <p className="text-caption text-paper-50/30">
              En rejoignant, vous acceptez notre{' '}
              <Link href="/confidentialite" className="underline hover:text-paper-50/60">
                politique de confidentialité
              </Link>
              .
            </p>
          </GlassCard>
        </div>
      </section>
    </>
  )
}
