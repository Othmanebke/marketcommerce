'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Chip from '@/components/ui/Chip'
import DividerGoldHairline from '@/components/ui/Divider'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import { SkeletonProductGrid } from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'

// ── Types ──
interface ProductFull extends ProductCardData {
  family: string
  intensity: number
  tenue: number
  sillage: number
  seasons: string[]
  moments: string[]
  vibes: string[]
}

// ── Mock catalog (remplacé par fetch /api/products en prod) ──
const ALL_PRODUCTS: ProductFull[] = [
  {
    slug: 'noir-velours', name: 'Noir Velours', concentration: 'Extrait de Parfum',
    priceFromCents: 22000,
    heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
    badges: ['Atelier'], metrics: { intensity: 5, tenue: 5, sillage: 4 },
    family: 'boisé', intensity: 5, tenue: 5, sillage: 4,
    seasons: ['hiver', 'mi-saison'], moments: ['soirée', 'rendez-vous'],
    vibes: ['Noir Velours', 'Rouge Épicé'],
  },
  {
    slug: 'bleu-mineral', name: 'Bleu Minéral', concentration: 'Eau de Parfum',
    priceFromCents: 16000,
    heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80',
    badges: ['Nouveau'], metrics: { intensity: 3, tenue: 4, sillage: 3 },
    family: 'hespéridé', intensity: 3, tenue: 4, sillage: 3,
    seasons: ['été', 'mi-saison'], moments: ['jour', 'bureau'],
    vibes: ['Bleu Minéral'],
  },
  {
    slug: 'or-solaire', name: 'Or Solaire', concentration: 'Eau de Parfum',
    priceFromCents: 18000,
    heroImageUrl: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=800&q=80',
    metrics: { intensity: 4, tenue: 4, sillage: 4 },
    family: 'ambré', intensity: 4, tenue: 4, sillage: 4,
    seasons: ['été', 'mi-saison'], moments: ['soirée', 'rendez-vous'],
    vibes: ['Or Solaire'],
  },
  {
    slug: 'iris-blanc', name: 'Iris Blanc', concentration: 'Extrait de Parfum',
    priceFromCents: 26000,
    heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80',
    badges: ['Édition limitée'], metrics: { intensity: 3, tenue: 5, sillage: 2 },
    family: 'floral', intensity: 3, tenue: 5, sillage: 2,
    seasons: ['mi-saison', 'hiver'], moments: ['bureau', 'rendez-vous'],
    vibes: ['Ivoire Propre'],
  },
  {
    slug: 'rouge-epice', name: 'Rouge Épicé', concentration: 'Eau de Parfum',
    priceFromCents: 19000,
    heroImageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
    metrics: { intensity: 5, tenue: 4, sillage: 5 },
    family: 'ambré', intensity: 5, tenue: 4, sillage: 5,
    seasons: ['hiver'], moments: ['soirée'],
    vibes: ['Rouge Épicé', 'Noir Velours'],
  },
  {
    slug: 'vent-de-sel', name: 'Vent de Sel', concentration: 'Eau de Toilette',
    priceFromCents: 12000,
    heroImageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    metrics: { intensity: 2, tenue: 2, sillage: 2 },
    family: 'hespéridé', intensity: 2, tenue: 2, sillage: 2,
    seasons: ['été'], moments: ['jour', 'bureau'],
    vibes: ['Bleu Minéral'],
  },
  {
    slug: 'musc-silencieux', name: 'Musc Silencieux', concentration: 'Eau de Parfum',
    priceFromCents: 17000,
    heroImageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    metrics: { intensity: 2, tenue: 4, sillage: 2 },
    family: 'musqué', intensity: 2, tenue: 4, sillage: 2,
    seasons: ['toute saison'], moments: ['bureau', 'jour'],
    vibes: ['Ivoire Propre'],
  },
  {
    slug: 'cendre-douce', name: 'Cendre Douce', concentration: 'Extrait de Parfum',
    priceFromCents: 28000,
    heroImageUrl: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80',
    badges: ['Atelier'], metrics: { intensity: 4, tenue: 5, sillage: 3 },
    family: 'boisé', intensity: 4, tenue: 5, sillage: 3,
    seasons: ['hiver', 'mi-saison'], moments: ['soirée', 'rendez-vous'],
    vibes: ['Noir Velours'],
  },
]

const VIBES    = ['Noir Velours', 'Or Solaire', 'Bleu Minéral', 'Ivoire Propre', 'Rouge Épicé']
const FAMILLES = ['boisé', 'ambré', 'floral', 'hespéridé', 'musqué', 'gourmand']
const SAISONS  = ['été', 'hiver', 'mi-saison', 'toute saison']
const MOMENTS  = ['jour', 'bureau', 'soirée', 'rendez-vous']

interface Filters {
  vibes: string[]
  familles: string[]
  saisons: string[]
  moments: string[]
  intensityMin: number
  tenueMin: number
  sillageMin: number
}

const EMPTY_FILTERS: Filters = {
  vibes: [], familles: [], saisons: [], moments: [],
  intensityMin: 1, tenueMin: 1, sillageMin: 1,
}

function toggleItem(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]
}

export default function CollectionPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [sort, setSort]       = useState('relevance')

  const filtered = useMemo(() => {
    const result = ALL_PRODUCTS.filter(p => {
      if (filters.vibes.length    && !p.vibes.some(v   => filters.vibes.includes(v)))    return false
      if (filters.familles.length && !filters.familles.includes(p.family))                return false
      if (filters.saisons.length  && !p.seasons.some(s => filters.saisons.includes(s)))  return false
      if (filters.moments.length  && !p.moments.some(m => filters.moments.includes(m)))  return false
      if (p.intensity < filters.intensityMin) return false
      if (p.tenue     < filters.tenueMin)     return false
      if (p.sillage   < filters.sillageMin)   return false
      return true
    })
    if (sort === 'price_asc')  return [...result].sort((a, b) => a.priceFromCents - b.priceFromCents)
    if (sort === 'price_desc') return [...result].sort((a, b) => b.priceFromCents - a.priceFromCents)
    return result
  }, [filters, sort])

  const hasActiveFilters = Boolean(
    filters.vibes.length || filters.familles.length ||
    filters.saisons.length || filters.moments.length ||
    filters.intensityMin > 1 || filters.tenueMin > 1 || filters.sillageMin > 1
  )

  return (
    <div className="bg-ink-950 min-h-screen">

      {/* ── Page header ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-stroke-12 to-gold-100/50" />
        <ScrollReveal type="fade-up" duration={1.2}>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-caption text-gold-100 uppercase tracking-widest mb-6 block">
              Le Vestiaire Olfactif
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-paper-50 mb-8 tracking-tight leading-tight">
              Collection <br/><span className="text-gold-100 italic">Signature</span>
            </h1>
            <p className="text-lg text-paper-50/60 font-light max-w-2xl mx-auto leading-relaxed">
              Explorez nos créations assemblées à la main. Laissez-vous guider par vos humeurs, 
              nos matières premières nobles et l'intensité qui vous correspond.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div
        className="sticky top-16 z-30 glass-med border-b border-stroke-12 py-4 px-6"
        role="search"
        aria-label="Filtres de la collection"
      >
        <div className="max-w-7xl mx-auto space-y-3">

          {/* Vibes */}
          <fieldset>
            <legend className="sr-only">Humeur / Vibe</legend>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-caption text-paper-50/30 uppercase tracking-widest w-16 shrink-0" aria-hidden="true">
                Humeur
              </span>
              {VIBES.map(v => (
                <Chip
                  key={v} size="sm"
                  selected={filters.vibes.includes(v)}
                  onClick={() => setFilters(f => ({ ...f, vibes: toggleItem(f.vibes, v) }))}
                >
                  {v}
                </Chip>
              ))}
            </div>
          </fieldset>

          {/* Famille */}
          <fieldset>
            <legend className="sr-only">Famille olfactive</legend>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-caption text-paper-50/30 uppercase tracking-widest w-16 shrink-0" aria-hidden="true">
                Famille
              </span>
              {FAMILLES.map(f => (
                <Chip
                  key={f} size="sm"
                  selected={filters.familles.includes(f)}
                  onClick={() => setFilters(fi => ({ ...fi, familles: toggleItem(fi.familles, f) }))}
                >
                  {f}
                </Chip>
              ))}
            </div>
          </fieldset>

          {/* Saison + Moment + Sliders */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            <fieldset>
              <legend className="sr-only">Saison</legend>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-caption text-paper-50/30 uppercase tracking-widest w-14 shrink-0" aria-hidden="true">
                  Saison
                </span>
                {SAISONS.map(s => (
                  <Chip
                    key={s} size="sm"
                    selected={filters.saisons.includes(s)}
                    onClick={() => setFilters(f => ({ ...f, saisons: toggleItem(f.saisons, s) }))}
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="sr-only">Moment</legend>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-caption text-paper-50/30 uppercase tracking-widest w-16 shrink-0" aria-hidden="true">
                  Moment
                </span>
                {MOMENTS.map(m => (
                  <Chip
                    key={m} size="sm"
                    selected={filters.moments.includes(m)}
                    onClick={() => setFilters(f => ({ ...f, moments: toggleItem(f.moments, m) }))}
                  >
                    {m}
                  </Chip>
                ))}
              </div>
            </fieldset>
          </div>

          {/* Métriques min + reset */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-between">
            <div className="flex flex-wrap gap-6">
              {(
                [
                  { key: 'intensityMin' as const, label: 'Intensité min' },
                  { key: 'tenueMin'     as const, label: 'Tenue min'     },
                  { key: 'sillageMin'   as const, label: 'Sillage min'   },
                ]
              ).map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 text-caption text-paper-50/50">
                  <span>{label}</span>
                  <select
                    value={filters[key]}
                    onChange={e => setFilters(f => ({ ...f, [key]: Number(e.target.value) }))}
                    className="
                      bg-glass-06 border border-stroke-12 rounded text-paper-50 text-caption
                      px-2 py-1 focus:outline-none focus:border-[rgba(214,181,109,0.6)]
                      cursor-pointer
                    "
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n} className="bg-ink-900">{n}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="
                  text-caption text-paper-50/40 hover:text-danger
                  transition-colors duration-micro ease-luxury
                "
              >
                Réinitialiser ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Results meta */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-ui text-paper-50/50" aria-live="polite" aria-atomic="true">
            {filtered.length} création{filtered.length !== 1 ? 's' : ''}
          </p>
          <label className="flex items-center gap-2 text-caption text-paper-50/50">
            <span>Trier</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="
                bg-glass-06 border border-stroke-12 rounded text-paper-50 text-caption
                px-3 py-1.5 focus:outline-none focus:border-[rgba(214,181,109,0.6)]
                cursor-pointer
              "
            >
              <option value="relevance"  className="bg-ink-900">Pertinence</option>
              <option value="price_asc"  className="bg-ink-900">Prix croissant</option>
              <option value="price_desc" className="bg-ink-900">Prix décroissant</option>
            </select>
          </label>
        </div>

        <DividerGoldHairline className="mb-8" />

        {/* Grid / Empty */}
        {filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center"
          >
            <p className="font-serif text-heading-sm text-paper-50/30 mb-3">
              Aucune création ne correspond.
            </p>
            <p className="text-ui text-paper-50/25 mb-8">
              Essayez une autre humeur ou une note différente.
            </p>
            <Button variant="secondary" onClick={() => setFilters(EMPTY_FILTERS)}>
              Réinitialiser les filtres
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filtered.map((product, i) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} priority={i < 4} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
