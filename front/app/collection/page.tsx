'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSection } from '@/components/marketing/HeroSection'
import ProductCard, { type ProductCardData } from '@/components/commerce/ProductCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

// Données mockées étendues pour le catalogue complet
const ALL_PRODUCTS: ProductCardData[] = [
  { slug: 'noir-velours', name: 'Noir Velours',  concentration: 'Extrait de Parfum', priceFromCents: 22000, heroImageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80', badges: ['Atelier', 'Hiver'] },
  { slug: 'bleu-mineral', name: 'Bleu Minéral',  concentration: 'Eau de Parfum',     priceFromCents: 16000, heroImageUrl: 'https://images.unsplash.com/photo-1588514912908-53abc9d9c399?w=800&q=80', badges: ['Nouveau', 'Eté'] },
  { slug: 'or-solaire',   name: 'Or Solaire',    concentration: 'Eau de Parfum',     priceFromCents: 18000, heroImageUrl: 'https://images.unsplash.com/photo-1600612253971-1e40651e8ef6?w=800&q=80', badges: ['Soleil'] },
  { slug: 'iris-blanc',   name: 'Iris Blanc',    concentration: 'Extrait de Parfum', priceFromCents: 26000, heroImageUrl: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80', badges: ['Rare', 'Intemporel'] },
  { slug: 'cuir-fume',    name: 'Cuir Fumé',     concentration: 'Eau de Parfum',     priceFromCents: 19500, heroImageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80', badges: ['Caractère'] },
  { slug: 'rose-oud',     name: 'Rose Oud',      concentration: 'Extrait de Parfum', priceFromCents: 28000, heroImageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80', badges: ['Exclusif', 'Soir'] },
  { slug: 'santal-creme', name: 'Santal Crème',  concentration: 'Eau de Parfum',     priceFromCents: 17500, heroImageUrl: 'https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=800&q=80', badges: ['Douceur'] },
  { slug: 'vetiver-racine',name: 'Vétiver Racine',concentration: 'Eau de Toilette',  priceFromCents: 14500, heroImageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80', badges: ['Terre'] },
]

const FILTERS = ['Tout', 'Extrait de Parfum', 'Eau de Parfum', 'Atelier', 'Nouveautés']

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState('Tout')

  // Filtrage simple
  const filteredProducts = ALL_PRODUCTS.filter(p => {
    if (activeFilter === 'Tout') return true
    if (activeFilter === 'Nouveautés') return p.badges?.includes('Nouveau')
    if (activeFilter === 'Atelier') return p.badges?.includes('Atelier')
    return p.concentration === activeFilter
  })

  return (
    <main className="min-h-screen bg-ink-950 pb-32">
      <HeroSection
        title="La Collection"
        subtitle="Une collection de fragrances pensées pour durer, sans compromis sur la matière."
        backgroundImage="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1920&q=85"
        align="center"
      />

      <section className="px-6 max-w-[1400px] mx-auto -mt-20 relative z-10">
        <ScrollReveal type="fade-up" delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`
                  px-5 py-2 rounded-chip text-sm font-medium transition-all duration-300 backdrop-blur-md
                  ${activeFilter === filter 
                    ? 'bg-gold-100 text-ink-950 shadow-[0_0_20px_rgba(214,181,109,0.3)]' 
                    : 'bg-ink-900/60 text-paper-50 border border-stroke-12 hover:border-gold-100/30 hover:bg-ink-800/80'}
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence>
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.slug} type="fade-up" delay={i * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-paper-50/40 font-light italic">
            Aucun parfum ne correspond à votre recherche.
          </div>
        )}
      </section>
    </main>
  )
}
