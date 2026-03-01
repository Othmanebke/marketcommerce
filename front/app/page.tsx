import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MarqueeStrip } from '@/components/ui/MarqueeStrip'

export const metadata: Metadata = {
  title: 'Maison — Parfumerie de création',
  description: 'Des matières choisies, une composition précise, une tenue pensée pour durer.',
}

const BESTSELLERS: ProductCardData[] = [
  { slug: 'noir-velours', name: 'Noir Velours', concentration: 'Extrait de Parfum', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80', badges: ['Atelier'] },
  { slug: 'bleu-mineral', name: 'Bleu Minéral', concentration: 'Eau de Parfum', priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80', badges: ['Nouveau'] },
  { slug: 'or-solaire', name: 'Or Solaire', concentration: 'Eau de Parfum', priceFromCents: 18000, heroImageUrl: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=800&q=80' },
  { slug: 'iris-blanc', name: 'Iris Blanc', concentration: 'Extrait de Parfum', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80', badges: ['Édition limitée'] },
]

const UNIVERS = [
  { id: 'noir', label: 'Noir Velours', tagline: 'Profond. Résine. Fumé.', href: '/collection?vibe=noir-velours', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80' },
  { id: 'or', label: 'Or Solaire', tagline: 'Chaleur ambrée. Lumière.', href: '/collection?vibe=or-solaire', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80' },
  { id: 'bleu', label: 'Bleu Minéral', tagline: 'Frais. Propre. Élégant.', href: '/collection?vibe=bleu-mineral', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80' },
]

const JOURNAL_POSTS = [
  { slug: 'le-role-du-fond', title: 'Le rôle des notes de fond', excerpt: 'Comment le vétiver, l\'ambre et la résine construisent la persistance.', tag: 'Matières', image: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=800&q=80' },
  { slug: 'concentration-extrait', title: 'Pourquoi l\'Extrait', excerpt: 'La concentration maximale : moins de surface, plus de durée, plus de présence.', tag: 'Atelier', image: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80' },
  { slug: 'rituel-application', title: 'Le rituel d\'application', excerpt: 'Points de chaleur, superposition, moment : les gestes qui font durer.', tag: 'Rituels', image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80' },
]

export default function HomePage() {
  return (
    <div className="bg-ink-950 min-h-screen selection:bg-gold-100/30 selection:text-gold-100">
      {/* ── IMMERSIVE HERO WITH SLOW ZOOM ── */}
      <HeroSection 
        title="La Signature de l'Invisible" 
        subtitle="Où le parfum devient une extension de l'âme." 
        backgroundImage="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=2000"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full mt-12">
          <Link
            href="/collection"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-btn px-8 py-4 font-sans tracking-widest uppercase text-sm bg-gold-100 text-ink-950 transition-all duration-[600ms] hover:scale-105 hover:shadow-[0_0_40px_rgba(214,181,109,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium">
              Découvrir la Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        </div>
      </HeroSection>

      <MarqueeStrip speed="slow" className="py-6 border-y border-stroke-12 bg-ink-950/50 backdrop-blur-md overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="text-gold-100/70 text-sm uppercase tracking-[0.2em] px-12 font-medium">
            ✦ Sillage persistant ✦ Extraits purs ✦ Fabriqué en France ✦ Flacons ressourçables
          </span>
        ))}
      </MarqueeStrip>

      {/* ── MANIFESTE POÉTIQUE (Negative Space) ── */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-stroke-12 to-gold-100/50" />
        <ScrollReveal type="fade-up" duration={1.2}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-caption text-gold-100 uppercase tracking-widest mb-8 block">Le Manifeste</span>
            <h2 className="font-serif text-heading-xl text-paper-50 leading-tight mb-10">
              « Le parfum n'est pas fait pour masquer, <br className="hidden md:block"/>
              <span className="text-paper-50/50 italic mr-2">il est fait pour</span> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-100 to-amber-200 shadow-gold-100">révéler.</span> »
            </h2>
            <p className="text-ui text-paper-50/60 max-w-2xl mx-auto leading-relaxed text-lg">
              Loin des productions de masse, nous assemblons à la main des absolues rares et des essences précieuses. 
              Chaque goutte est une promesse d'intensité, un voile de mystère qui vous habille bien après votre départ.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── ASYMMETRIC GRID: UNIVERS OLFACTIFS ── */}
      <section className="py-24 px-6 bg-ink-900 border-y border-stroke-12 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <ScrollReveal type="slide-right">
              <h2 className="font-serif text-5xl md:text-7xl text-paper-50 tracking-tight">
                Matières <br/><span className="text-gold-100 italic">Premières</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal type="fade-in" delay={0.3}>
              <p className="max-w-md text-paper-50/50 text-ui leading-relaxed text-left md:text-right">
                Explorez nos trois univers sculptés autour des familles olfactives les plus nobles de la parfumerie.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Big Feature Left */}
            <div className="lg:col-span-7 h-[60vh] lg:h-[80vh]">
              <ScrollReveal className="h-full" type="fade-up">
                <Link href={UNIVERS[0].href} className="group relative w-full h-full block rounded-2xl overflow-hidden will-change-transform">
                  <Image src={UNIVERS[0].image} alt={UNIVERS[0].label} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                    <span className="px-3 py-1 rounded-full border border-gold-100/30 text-gold-100 text-xs uppercase tracking-widest backdrop-blur-md mb-4 inline-block">Iconique</span>
                    <h3 className="font-serif text-4xl text-paper-50 mb-2 group-hover:text-gold-100 transition-colors duration-700">{UNIVERS[0].label}</h3>
                    <p className="text-paper-50/70 text-lg">{UNIVERS[0].tagline}</p>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
            
            {/* Two Stacked Right */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-10 h-[80vh] lg:h-[80vh]">
              {UNIVERS.slice(1).map((u, i) => (
                <ScrollReveal key={u.id} className="flex-1 min-h-0" type="fade-up" delay={i * 0.2 + 0.2}>
                  <Link href={u.href} className="group relative w-full h-full block rounded-2xl overflow-hidden">
                    <Image src={u.image} alt={u.label} fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-serif text-2xl text-paper-50 mb-1 group-hover:text-gold-100 transition-colors duration-700">{u.label}</h3>
                      <p className="text-paper-50/70">{u.tagline}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BREATHTAKING PARALLAX BANNER (Savoir-faire) ── */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1920&q=85')] bg-fixed bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-[2px]" />
        
        <ScrollReveal type="scale-up" duration={1.2}>
          <GlassCard variant="soft" hover={false} className="relative z-10 p-12 md:p-16 max-w-2xl text-center mx-4 border-gold-100/20 shadow-2xl">
            <span className="text-3xl text-gold-100 mb-6 block">◈</span>
            <h2 className="font-serif text-4xl text-paper-50 mb-6">L'Atelier Français</h2>
            <p className="text-paper-50/70 text-lg leading-relaxed mb-8">
              Macération lente. Embouteillage à la main. Un respect absolu du temps de maturation pour garantir une rémanence qui défie les heures.
            </p>
            <Link href="/maison" className="inline-flex items-center gap-2 text-gold-100 uppercase tracking-widest text-sm hover:text-paper-50 transition-colors duration-300">
              Découvrir notre art <span className="text-lg">→</span>
            </Link>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* ── BEST-SELLERS MINIMALIST CAROUSEL/GRID ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal type="fade-up">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-caption text-gold-100 uppercase tracking-widest mb-4">La Sélection</span>
              <h2 className="font-serif text-heading-lg text-paper-50 mb-6">Objets de Désir</h2>
              <div className="h-px w-24 bg-stroke-12" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BESTSELLERS.map((product, i) => (
              <ScrollReveal key={product.slug} type="fade-up" delay={i * 0.1}>
                <ProductCard product={product} priority={i < 2} />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              href="/collection"
              className="px-8 py-3 rounded-full border border-stroke-12 text-paper-50/70 hover:text-gold-100 hover:border-gold-100 hover:bg-gold-100/5 transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Explorer le vestiaire olfactif
            </Link>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL / JOURNAL ── */}
      <section className="py-32 px-6 bg-ink-900 border-t border-stroke-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <ScrollReveal>
              <h2 className="font-serif text-5xl text-paper-50">Journal de<br/><span className="italic text-gold-100">Création</span></h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link href="/journal" className="inline-flex items-center gap-2 text-ui text-paper-50/50 hover:text-gold-100 transition-colors duration-300">
                Tout lire <span aria-hidden="true">→</span>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {JOURNAL_POSTS.map((post, i) => (
              <ScrollReveal key={post.slug} type="fade-up" delay={i * 0.15}>
                <Link href={`/journal/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute top-4 left-4 border border-paper-50/20 bg-ink-950/40 backdrop-blur-md px-3 py-1 rounded-full text-xs text-gold-100 uppercase tracking-widest">
                      {post.tag}
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl text-paper-50 mb-3 group-hover:text-gold-100 transition-colors duration-300">{post.title}</h3>
                  <p className="text-paper-50/50 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
