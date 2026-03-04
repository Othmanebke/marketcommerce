'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

// Reusing same mock data logic as homepage logic for continuity
const COLLECTIONS = [
  {
    id: 'noir',
    title: 'La Collection Noire',
    subtitle: 'Profondeur. Mystère. Intensité.',
    description: "Des extraits de parfum riches en résines, bois fumés et épices. Pour le soir, pour l'hiver, ou pour marquer les esprits.",
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=85',
    link: '/shop?filter=Noire'
  },
  {
    id: 'lumiere',
    title: 'La Collection Lumière',
    subtitle: 'Éclat. Fraîcheur. Transparence.',
    description: "Des eaux de parfum ciselées autour des agrumes, des fleurs blanches et des muscs. Une élégance diurne et lumineuse.",
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=85',
    link: '/shop?filter=Lumière'
  },
  {
    id: 'matieres',
    title: 'Les Soliflores',
    subtitle: 'Hommage à la matière brute.',
    description: "Une exploration radicale d'une seule matière première d'exception : Iris, Vétiver, Santal. Sans artifice.",
    image: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=1200&q=85',
    link: '/shop?filter=Soliflore'
  }
]

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-ink-950 pb-32">
       <HeroSection
        title="Nos Collections"
        subtitle="Trois univers, trois visions de la parfumerie. Choisissez votre signature."
        backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=85&auto=format&fit=crop"
        align="center"
      />

      <section className="px-6 max-w-[1400px] mx-auto py-24 space-y-32">
        {COLLECTIONS.map((col, i) => (
          <ScrollReveal key={col.id} type="fade-up" delay={i * 0.1}>
            <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Block */}
              <div className="w-full lg:w-1/2 aspect-[4/5] relative group overflow-hidden border border-stroke-12">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink-950/20 group-hover:bg-ink-950/0 transition-colors duration-500" />
              </div>

              {/* Text Block */}
              <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                <h2 className="font-serif text-4xl md:text-5xl text-paper-50">
                  {col.title}
                </h2>
                <p className="text-gold-100 font-medium tracking-wide uppercase text-sm">
                  {col.subtitle}
                </p>
                <div className="w-16 h-[1px] bg-gold-100/30 mx-auto lg:mx-0" />
                <p className="text-paper-50/70 text-lg font-light leading-relaxed max-w-md mx-auto lg:ml-0">
                  {col.description}
                </p>
                
                <div className="pt-4">
                  <Link href="/shop">
                    <Button variant="outline">
                      Découvrir la collection
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* CTA Bottom */}
      <ScrollReveal>
        <section className="py-24 px-6 text-center bg-ink-900/30 border-y border-stroke-12">
          <h2 className="font-serif text-3xl text-paper-50 mb-6">Vous ne savez pas quoi choisir ?</h2>
          <p className="text-paper-50/60 mb-8 max-w-xl mx-auto font-light">
            Laissez notre expert olfactif vous guider vers le parfum qui correspond à votre personnalité et vos envies du moment.
          </p>
          <div className="flex justify-center">
            <Link href="/shop">
              <Button variant="primary">
                 Voir tout le catalogue
              </Button>
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  )
}
