import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import { HeroSection }  from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MarqueeStrip } from '@/components/ui/MarqueeStrip'

export const metadata: Metadata = {
  title: 'Maison — Parfumerie de création',
  description: 'Des matières choisies, une composition précise, une tenue pensée pour durer.',
}

const BESTSELLERS: ProductCardData[] = [
  { slug: 'noir-velours', name: 'Noir Velours',  concentration: 'Extrait de Parfum', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80', badges: ['Atelier'] },
  { slug: 'bleu-mineral', name: 'Bleu Minéral',  concentration: 'Eau de Parfum',     priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80', badges: ['Nouveau'] },
  { slug: 'or-solaire',   name: 'Or Solaire',    concentration: 'Eau de Parfum',     priceFromCents: 18000, heroImageUrl: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=800&q=80' },
  { slug: 'iris-blanc',   name: 'Iris Blanc',    concentration: 'Extrait de Parfum', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80', badges: ['Édition limitée'] },
]

const UNIVERS = [
  {
    id:      'noir',
    label:   'Noir Velours',
    tagline: 'Résine. Fumée. Profondeur.',
    note:    '01',
    href:    '/collection?vibe=noir-velours',
    image:   'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1400&q=85',
  },
  {
    id:      'or',
    label:   'Or Solaire',
    tagline: 'Ambre chaud. Lumière.',
    note:    '02',
    href:    '/collection?vibe=or-solaire',
    image:   'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
  },
  {
    id:      'bleu',
    label:   'Bleu Minéral',
    tagline: 'Frais. Propre. Élégant.',
    note:    '03',
    href:    '/collection?vibe=bleu-mineral',
    image:   'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
  },
]

const JOURNAL_POSTS = [
  { slug: 'le-role-du-fond',       title: 'Le rôle des notes de fond',    excerpt: 'Comment le vétiver, l\'ambre et la résine construisent la persistance d\'un parfum.', tag: 'Matières', image: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=800&q=80' },
  { slug: 'concentration-extrait', title: 'Pourquoi l\'Extrait',           excerpt: 'La concentration maximale : moins d\'eau, plus de durée, plus de présence.', tag: 'Atelier',  image: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80' },
  { slug: 'rituel-application',    title: 'Le rituel d\'application',      excerpt: 'Points de chaleur, superposition, moment — les gestes qui font durer.', tag: 'Rituels',  image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80' },
]

const SAVOIR_FAIRE = [
  { num: '100 %', label: 'Naturel', desc: 'Essences et absolues sélectionnées avec rigueur' },
  { num: '8',     label: 'Semaines', desc: 'De macération lente pour chaque création' },
  { num: '0',     label: 'Compromis', desc: 'Sur la qualité des matières premières' },
]

export default function HomePage() {
  return (
    <div className="bg-ink-950 min-h-screen">

      {/* ════════════════════════════════════════════
          HERO — Editorial, bottom-left
      ════════════════════════════════════════════ */}
      <HeroSection
        eyebrow="Collection Permanente"
        title="La Signature de l'Invisible"
        subtitle="Où le parfum cesse d'être un accessoire pour devenir une extension de l'âme."
        backgroundImage="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=2400"
        align="left"
      >
        <div className="flex items-center gap-8">
          <Link
            href="/collection"
            className="
              group inline-flex items-center gap-3
              text-[10px] uppercase tracking-[0.4em] text-ink-950 font-medium
              bg-paper-50 hover:bg-gold-100
              px-8 py-4 transition-colors duration-500
            "
          >
            Explorer la Collection
            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </Link>
          <Link
            href="/maison"
            className="text-[9px] uppercase tracking-[0.4em] text-paper-50/50 hover:text-gold-100 transition-colors duration-500 pb-px border-b border-paper-50/20 hover:border-gold-100/40"
          >
            Notre Histoire
          </Link>
        </div>
      </HeroSection>

      {/* ════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════ */}
      <div className="border-y border-stroke-12 bg-ink-900/60 backdrop-blur-sm overflow-hidden">
        <MarqueeStrip speed="slow" className="py-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[9px] uppercase tracking-[0.35em] text-gold-100/60 px-10">
              ✦ Macération lente ✦ Extraits purs ✦ Fabrication française ✦ Flacons ressourçables ✦ Livraison assurée
            </span>
          ))}
        </MarqueeStrip>
      </div>

      {/* ════════════════════════════════════════════
          MANIFESTE — Negative space, typographique
      ════════════════════════════════════════════ */}
      <section className="py-48 px-8 relative overflow-hidden">
        {/* Vertical decorative line */}
        <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-stroke-12 to-gold-100/40" />

        <ScrollReveal type="fade-up" duration={1.2}>
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[9px] uppercase tracking-[0.45em] text-gold-100 mb-10">
              Notre Philosophie
            </p>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] text-paper-50 leading-[1.15] mb-10">
              «&thinsp;Le parfum n'est pas fait pour masquer.
              <br className="hidden md:block" />
              <span className="text-paper-50/35 italic">&ensp;Il est fait pour&ensp;</span>
              <span
                className="text-gradient-gold"
                style={{
                  background: 'linear-gradient(135deg, #C9A85C 0%, #D6B56D 40%, #EDD992 70%, #D6B56D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                révéler.
              </span>
              &thinsp;»
            </h2>
            <p className="text-paper-50/45 max-w-2xl mx-auto leading-relaxed text-[15px] font-light">
              Loin des productions standardisées, nous assemblons à la main des absolues rares
              et des essences précieuses. Chaque flacon est une promesse d'intensité — un voile
              de mystère qui vous habille longtemps après votre départ.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════
          UNIVERS OLFACTIFS — Asymmetric editorial grid
      ════════════════════════════════════════════ */}
      <section className="py-8 px-8 bg-ink-900 border-y border-stroke-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8 pt-16">
            <ScrollReveal type="slide-right">
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold-100 mb-5">Univers</p>
                <h2 className="font-serif text-[clamp(3rem,6vw,5.5rem)] text-paper-50 leading-tight">
                  Matières<br />
                  <span className="italic text-paper-50/60">Premières</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal type="fade-in" delay={0.3}>
              <div className="md:max-w-xs md:text-right">
                <p className="text-paper-50/40 text-[13px] leading-relaxed font-light mb-6">
                  Trois univers sculptés autour des familles olfactives les plus nobles de la parfumerie artisanale.
                </p>
                <Link
                  href="/collection"
                  className="text-[9px] uppercase tracking-[0.35em] text-paper-50/40 hover:text-gold-100 transition-colors border-b border-stroke-12 hover:border-gold-100/30 pb-px"
                >
                  Toute la collection →
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-16">
            {/* Large left card */}
            <div className="lg:col-span-7 h-[65vh] lg:h-[85vh]">
              <ScrollReveal className="h-full" type="fade-up">
                <Link
                  href={UNIVERS[0].href}
                  className="group relative w-full h-full flex overflow-hidden"
                >
                  <Image
                    src={UNIVERS[0].image}
                    alt={UNIVERS[0].label}
                    fill
                    className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/30 to-transparent" />

                  {/* Number watermark */}
                  <span className="absolute top-6 right-8 font-serif text-[80px] leading-none text-paper-50/[0.06] select-none pointer-events-none font-bold">
                    {UNIVERS[0].note}
                  </span>

                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-gold-100/70 mb-3">Signature</p>
                    <h3 className="font-serif text-4xl text-paper-50 mb-2 group-hover:text-gold-100 transition-colors duration-700">
                      {UNIVERS[0].label}
                    </h3>
                    <p className="text-paper-50/55 text-sm font-light">{UNIVERS[0].tagline}</p>
                    <div className="mt-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-paper-50/0 group-hover:text-gold-100/80 transition-colors duration-700">
                      <span className="w-6 h-px bg-gold-100/60" />
                      Explorer
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>

            {/* Two right cards stacked */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {UNIVERS.slice(1).map((u, i) => (
                <ScrollReveal key={u.id} className="flex-1 min-h-0" type="fade-up" delay={i * 0.15 + 0.2}>
                  <Link
                    href={u.href}
                    className="group relative w-full h-full min-h-[280px] flex overflow-hidden"
                  >
                    <Image
                      src={u.image}
                      alt={u.label}
                      fill
                      className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

                    <span className="absolute top-5 right-6 font-serif text-[56px] leading-none text-paper-50/[0.06] select-none pointer-events-none font-bold">
                      {u.note}
                    </span>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-serif text-2xl text-paper-50 mb-1 group-hover:text-gold-100 transition-colors duration-700">
                        {u.label}
                      </h3>
                      <p className="text-paper-50/50 text-sm font-light">{u.tagline}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SAVOIR-FAIRE — Chiffres clés
      ════════════════════════════════════════════ */}
      <section className="py-32 px-8 border-b border-stroke-12">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal type="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-stroke-12">
              {SAVOIR_FAIRE.map(({ num, label, desc }, i) => (
                <div key={i} className="px-8 md:px-16 py-10 md:py-0 first:pl-0 last:pr-0 text-center md:text-left">
                  <p className="font-serif text-[clamp(3rem,5vw,4.5rem)] text-gold-100 leading-none mb-3">{num}</p>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-paper-50 mb-2">{label}</p>
                  <p className="text-paper-50/35 text-sm font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PARALLAX INTERLUDE — Atelier
      ════════════════════════════════════════════ */}
      <section className="relative h-[75vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-[center_35%]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1920&q=85')" }}
        />
        <div className="absolute inset-0 bg-ink-950/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950/50" />

        <ScrollReveal type="scale-up" duration={1.2}>
          <div className="relative z-10 px-8 text-center max-w-xl mx-auto">
            <span className="block text-3xl text-gold-100/60 mb-6 font-serif">◈</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-paper-50 leading-tight mb-6">
              L'Atelier Français
            </h2>
            <div className="w-12 h-px bg-gold-100/40 mx-auto mb-6" />
            <p className="text-paper-50/60 text-[14px] leading-relaxed font-light mb-10">
              Macération lente. Embouteillage à la main. Un respect absolu
              du temps de maturation pour garantir une rémanence qui défie les heures.
            </p>
            <Link
              href="/maison"
              className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.45em] text-gold-100 hover:text-paper-50 transition-colors duration-400"
            >
              <span className="w-6 h-px bg-current" />
              Découvrir notre art
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ════════════════════════════════════════════
          BESTSELLERS — Grille minimaliste
      ════════════════════════════════════════════ */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">

          <ScrollReveal type="fade-up">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold-100 mb-4">Sélection</p>
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-paper-50 leading-tight">
                  Objets<br /><span className="italic text-paper-50/50">de Désir</span>
                </h2>
              </div>
              <Link
                href="/collection"
                className="text-[9px] uppercase tracking-[0.35em] text-paper-50/40 hover:text-gold-100 transition-colors border-b border-stroke-12 hover:border-gold-100/30 pb-px mb-1 self-end"
              >
                Explorer tout →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {BESTSELLERS.map((product, i) => (
              <ScrollReveal key={product.slug} type="fade-up" delay={i * 0.08}>
                <ProductCard product={product} priority={i < 2} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          JOURNAL ÉDITORIAL
      ════════════════════════════════════════════ */}
      <section className="py-32 px-8 bg-ink-900 border-t border-stroke-12">
        <div className="max-w-7xl mx-auto">

          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.4em] text-gold-100 mb-4">Édito</p>
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-paper-50 leading-tight">
                  Journal de<br /><span className="italic text-paper-50/50">Création</span>
                </h2>
              </div>
              <Link
                href="/journal"
                className="text-[9px] uppercase tracking-[0.35em] text-paper-50/40 hover:text-gold-100 transition-colors border-b border-stroke-12 hover:border-gold-100/30 pb-px self-end"
              >
                Tout lire →
              </Link>
            </div>
          </ScrollReveal>

          {/* Posts — large first, two smaller */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured large */}
            <div className="lg:col-span-6">
              <ScrollReveal type="fade-up">
                <Link href={`/journal/${JOURNAL_POSTS[0].slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <Image
                      src={JOURNAL_POSTS[0].image}
                      alt={JOURNAL_POSTS[0].title}
                      fill
                      className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 border border-paper-50/20 bg-ink-950/50 backdrop-blur-md text-[8px] uppercase tracking-[0.3em] text-gold-100">
                        {JOURNAL_POSTS[0].tag}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-serif text-3xl text-paper-50 group-hover:text-gold-100 transition-colors duration-400 mb-3 leading-tight">
                    {JOURNAL_POSTS[0].title}
                  </h3>
                  <p className="text-paper-50/45 text-sm leading-relaxed font-light line-clamp-2">
                    {JOURNAL_POSTS[0].excerpt}
                  </p>
                </Link>
              </ScrollReveal>
            </div>

            {/* Two stacked smaller */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {JOURNAL_POSTS.slice(1).map((post, i) => (
                <ScrollReveal key={post.slug} type="fade-up" delay={i * 0.1 + 0.1}>
                  <Link href={`/journal/${post.slug}`} className="group flex gap-5 items-start">
                    <div className="relative w-32 h-24 shrink-0 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[8px] uppercase tracking-[0.3em] text-gold-100/70 block mb-2">
                        {post.tag}
                      </span>
                      <h3 className="font-serif text-xl text-paper-50 group-hover:text-gold-100 transition-colors duration-400 mb-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-paper-50/40 text-[13px] leading-relaxed font-light line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}

              {/* Newsletter teaser */}
              <ScrollReveal type="fade-up" delay={0.3}>
                <div className="border border-stroke-12 p-6 mt-2 flex flex-col gap-4">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gold-100">Newsletter</p>
                  <p className="font-serif text-xl text-paper-50 leading-tight">
                    Recevez nos créations en avant-première
                  </p>
                  <form className="flex gap-0 border border-stroke-12 overflow-hidden">
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="flex-1 bg-transparent px-4 py-3 text-[11px] text-paper-50 placeholder:text-paper-50/25 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 bg-gold-100/10 hover:bg-gold-100 text-gold-100 hover:text-ink-950 text-[9px] uppercase tracking-[0.3em] transition-all duration-400 border-l border-stroke-12 shrink-0"
                    >
                      →
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BOTTOM CTA — Full width editorial
      ════════════════════════════════════════════ */}
      <section className="py-40 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 to-ink-950" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-100/20 to-transparent" />

        <ScrollReveal type="fade-up" className="relative z-10">
          <p className="text-[9px] uppercase tracking-[0.45em] text-gold-100 mb-8">Commencez</p>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] text-paper-50 leading-tight mb-8 max-w-2xl mx-auto">
            Trouvez votre signature olfactive
          </h2>
          <p className="text-paper-50/40 text-[14px] font-light mb-12 max-w-md mx-auto leading-relaxed">
            Chaque fragrance est un portrait. Lequel parle de vous ?
          </p>
          <Link
            href="/collection"
            className="
              group inline-flex items-center gap-4
              px-10 py-5 border border-stroke-18
              text-[10px] uppercase tracking-[0.45em] text-paper-50
              hover:border-gold-100/40 hover:text-gold-100
              transition-all duration-600
            "
          >
            Découvrir la Collection
            <span className="group-hover:translate-x-1.5 transition-transform duration-400 inline-block">→</span>
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
