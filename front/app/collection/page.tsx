'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSection } from '@/components/marketing/HeroSection'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const ALL_PRODUCTS: ProductCardData[] = [
  { slug: 'noir-velours',  name: 'Noir Velours',   concentration: 'Extrait de Parfum', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80', badges: ['Atelier'] },
  { slug: 'bleu-mineral',  name: 'Bleu Minéral',   concentration: 'Eau de Parfum',     priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80', badges: ['Nouveau'] },
  { slug: 'or-solaire',    name: 'Or Solaire',     concentration: 'Eau de Parfum',     priceFromCents: 18000, heroImageUrl: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=800&q=80' },
  { slug: 'iris-blanc',    name: 'Iris Blanc',     concentration: 'Extrait de Parfum', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80', badges: ['Édition limitée'] },
  { slug: 'cuir-fume',     name: 'Cuir Fumé',      concentration: 'Eau de Parfum',     priceFromCents: 19500, heroImageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80' },
  { slug: 'rose-oud',      name: 'Rose Oud',       concentration: 'Extrait de Parfum', priceFromCents: 28000, heroImageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80', badges: ['Atelier'] },
  { slug: 'santal-creme',  name: 'Santal Crème',   concentration: 'Eau de Parfum',     priceFromCents: 17500, heroImageUrl: 'https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=800&q=80' },
  { slug: 'vetiver-racine',name: 'Vétiver Racine', concentration: 'Eau de Toilette',   priceFromCents: 14500, heroImageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80' },
]

type FilterKey = 'Tout' | 'Extrait de Parfum' | 'Eau de Parfum' | 'Eau de Toilette' | 'Atelier' | 'Nouveautés'
type SortKey   = 'default' | 'price-asc' | 'price-desc' | 'name'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'Tout',              label: 'Tout'              },
  { key: 'Extrait de Parfum', label: 'Extrait de Parfum' },
  { key: 'Eau de Parfum',     label: 'Eau de Parfum'     },
  { key: 'Eau de Toilette',   label: 'Eau de Toilette'   },
  { key: 'Atelier',           label: 'Atelier'           },
  { key: 'Nouveautés',        label: 'Nouveautés'        },
]

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'default',    label: 'Par défaut'       },
  { key: 'price-asc',  label: 'Prix croissant'   },
  { key: 'price-desc', label: 'Prix décroissant' },
  { key: 'name',       label: 'Alphabétique'     },
]

function filterCount(filter: FilterKey): number {
  if (filter === 'Tout')       return ALL_PRODUCTS.length
  if (filter === 'Nouveautés') return ALL_PRODUCTS.filter(p => p.badges?.includes('Nouveau')).length
  if (filter === 'Atelier')    return ALL_PRODUCTS.filter(p => p.badges?.includes('Atelier')).length
  return ALL_PRODUCTS.filter(p => p.concentration === filter).length
}

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('Tout')
  const [activeSort,   setActiveSort]   = useState<SortKey>('default')
  const [sortOpen,     setSortOpen]     = useState(false)

  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS.filter(p => {
      if (activeFilter === 'Tout')       return true
      if (activeFilter === 'Nouveautés') return p.badges?.includes('Nouveau')
      if (activeFilter === 'Atelier')    return p.badges?.includes('Atelier')
      return p.concentration === activeFilter
    })

    switch (activeSort) {
      case 'price-asc':  return [...list].sort((a, b) => a.priceFromCents - b.priceFromCents)
      case 'price-desc': return [...list].sort((a, b) => b.priceFromCents - a.priceFromCents)
      case 'name':       return [...list].sort((a, b) => a.name.localeCompare(b.name, 'fr'))
      default:           return list
    }
  }, [activeFilter, activeSort])

  const activeSortLabel = SORTS.find(s => s.key === activeSort)?.label ?? 'Trier'

  return (
    <main className="min-h-screen bg-ink-950 pb-32">

      {/* ── Hero ── */}
      <HeroSection
        title="La Collection"
        subtitle="Une collection de fragrances pensées pour durer, sans compromis sur la matière."
        backgroundImage="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1920&q=85"
        align="center"
      />

      {/* ── Controls bar ── */}
      <section className="px-6 max-w-[1400px] mx-auto -mt-12 relative z-10">
        <ScrollReveal type="fade-up" delay={0.15}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map(f => {
                const count  = filterCount(f.key)
                const active = activeFilter === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`
                      inline-flex items-center gap-1.5 px-4 py-1.5
                      text-[10px] uppercase tracking-[0.2em] font-medium
                      transition-all duration-300 backdrop-blur-md
                      ${active
                        ? 'bg-gold-100 text-ink-950 shadow-[0_0_20px_rgba(214,181,109,0.25)]'
                        : 'bg-ink-900/70 text-paper-50/60 border border-stroke-12 hover:border-gold-100/25 hover:text-paper-50'
                      }
                    `}
                  >
                    {f.label}
                    <span className={`text-[9px] ${active ? 'text-ink-950/60' : 'text-paper-50/30'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(v => !v)}
                className="
                  inline-flex items-center gap-2 px-4 py-1.5
                  text-[10px] uppercase tracking-[0.2em] text-paper-50/50
                  border border-stroke-12 hover:border-gold-100/25 hover:text-paper-50
                  transition-all duration-300 bg-ink-900/60 backdrop-blur-md
                "
              >
                {activeSortLabel}
                <span className={`transition-transform duration-300 ${sortOpen ? 'rotate-180' : ''}`}>↓</span>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 min-w-[180px] bg-ink-900 border border-stroke-12 z-20 overflow-hidden"
                  >
                    {SORTS.map(s => (
                      <button
                        key={s.key}
                        onClick={() => { setActiveSort(s.key); setSortOpen(false) }}
                        className={`
                          w-full text-left px-4 py-3
                          text-[10px] uppercase tracking-[0.2em]
                          transition-colors duration-200
                          ${activeSort === s.key
                            ? 'text-gold-100 bg-gold-100/5'
                            : 'text-paper-50/50 hover:text-paper-50 hover:bg-glass-06'
                          }
                        `}
                      >
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Result count */}
          <p className="text-[10px] uppercase tracking-[0.2em] text-paper-50/25 mb-10">
            {filteredProducts.length} fragrance{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </ScrollReveal>

        {/* ── Product grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty state ── */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <span className="block text-4xl text-gold-100/20 mb-6 font-serif">◈</span>
            <p className="text-paper-50/40 font-light italic text-lg">
              Aucun parfum ne correspond à cette sélection.
            </p>
            <button
              onClick={() => setActiveFilter('Tout')}
              className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold-100/60 hover:text-gold-100 transition-colors duration-300 border-b border-gold-100/20 hover:border-gold-100/40 pb-px"
            >
              Voir toute la collection
            </button>
          </motion.div>
        )}
      </section>
    </main>
  )
}
