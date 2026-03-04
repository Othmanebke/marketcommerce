'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import Chip from '@/components/ui/Chip'

const ARTICLES = [
  {
    slug: 'le-role-du-fond',
    title: 'Le rôle des notes de fond dans nos extraits',
    excerpt: "Pourquoi nos créations accordent une place si importante au vétiver, à l'ambre et à la résine. Analyse d'une structure tenace.",
    category: 'Savoir-faire',
    date: '12 Nov 2023',
    image: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=800&q=80',
    readTime: '4 min'
  },
  {
    slug: 'concentration-extrait',
    title: 'Pourquoi l\'Extrait ?',
    excerpt: 'La concentration maximale : moins d\'eau, plus de durée, plus de présence. Un choix radical pour des parfums de peau.',
    category: 'Atelier',
    date: '28 Oct 2023',
    image: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80',
    readTime: '3 min'
  },
  {
    slug: 'macérats-longs',
    title: 'L\'art de la macération longue',
    excerpt: 'Le temps ne se rattrape pas. Découvrez pourquoi nous laissons nos jus reposer 6 semaines avant la mise en flacon.',
    category: 'Technique',
    date: '15 Oct 2023',
    image: 'https://images.unsplash.com/photo-1616604212595-5807bbdb2142?w=800&q=80',
    readTime: '6 min'
  },
  {
    slug: 'vetiver-haiti',
    title: 'Immersion : Le Vétiver d\'Haïti',
    excerpt: 'Reportage au cœur des cultures de vétiver, une racine complexe, terreuse et fumée qui signe plusieurs de nos créations.',
    category: 'Matières',
    date: '02 Sept 2023',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    readTime: '5 min'
  },
  {
    slug: 'minimalisme-olfactif',
    title: 'Le minimalisme olfactif',
    excerpt: 'Dire plus avec moins. Comment épurons-nous nos formules pour ne garder que l\'essentiel et la lisibilité.',
    category: 'Philosophie',
    date: '10 Aout 2023',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
    readTime: '3 min'
  }
]

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-ink-950 pb-32">
      <HeroSection
        title="Le Journal"
        subtitle="Notes d'atelier, explorations de matières et réflexions sur le temps long de la parfumerie."
        backgroundImage="https://images.unsplash.com/photo-1615484477745-a43424151366?w=1920&q=85&auto=format&fit=crop"
        align="left"
      />

      <section className="px-6 max-w-[1400px] mx-auto -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <ScrollReveal key={article.slug} type="fade-up" delay={i * 0.1}>
              <Link href={`/journal/${article.slug}`} className="group block h-full">
                <GlassCard className="h-full overflow-hidden hover:border-gold-100/30 transition-colors duration-500 flex flex-col">
                  {/* Image Zoom Effect */}
                  <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Chip variant="dark">{article.category}</Chip>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                     <div className="flex items-center gap-3 text-xs text-paper-50/40 mb-4 font-medium uppercase tracking-wider">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gold-100/50" />
                        <span>{article.readTime}</span>
                     </div>
                     
                     <h3 className="font-serif text-2xl text-paper-50 mb-3 group-hover:text-gold-100 transition-colors duration-300 line-clamp-2">
                       {article.title}
                     </h3>
                     
                     <p className="text-paper-50/60 leading-relaxed font-light line-clamp-3 mb-6 flex-1">
                       {article.excerpt}
                     </p>
                     
                     <div className="text-gold-100 text-sm font-medium flex items-center gap-2 group-hover:gap-4 transition-all pb-1 mt-auto">
                        Lire l'article <span className="text-lg">→</span>
                     </div>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  )
}
