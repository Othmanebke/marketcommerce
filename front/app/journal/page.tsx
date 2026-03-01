import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Journal — Maison',
  description: 'Notes, réflexions et explorations autour du parfum et de ses matières.',
}

const ARTICLES = [
  {
    slug: 'le-role-du-fond',
    title: 'Le rôle des notes de fond dans nos extraits',
    excerpt: "Pourquoi nos créations accordent une place si importante au vétiver, à l'ambre et à la résine. Analyse d'une structure tenace.",
    category: 'Matières',
    date: '12 Nov 2023',
    image: 'https://images.unsplash.com/photo-1596091831165-10b9c5ef7c46?w=800&q=80',
    featured: true
  },
  {
    slug: 'concentration-extrait',
    title: "Comprendre l'Extrait de Parfum",
    excerpt: "Moins de surface, plus de durée, plus de présence. Démystification de la plus noble des concentrations.",
    category: 'Savoir-Faire',
    date: '28 Oct 2023',
    image: 'https://images.unsplash.com/photo-1607026246836-d3c0bc2e55fa?w=800&q=80'
  },
  {
    slug: 'rituel-application',
    title: "Le rituel d'application",
    excerpt: "Points de chaleur, superposition, hydratation : les gestes qui subliment le sillage et le rendent durable.",
    category: 'Rituels',
    date: '15 Sep 2023',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80'
  },
  {
    slug: 'iris-pallida',
    title: "L'Or Bleu : L'Iris Pallida",
    excerpt: "Voyage en Toscane à la découverte de l'une des matières les plus coûteuses et fascinantes de la palette du parfumeur.",
    category: 'Matières',
    date: '02 Sep 2023',
    image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=800&q=80'
  },
  {
    slug: 'evolution-peau',
    title: "La chimie de la peau",
    excerpt: "Pourquoi un même parfum se révèle si différemment d'une personne à l'autre ? Notre peau comme ultime ingrédient.",
    category: 'Science',
    date: '20 Aou 2023',
    image: 'https://images.unsplash.com/photo-1615397323755-1adb7e30d7cc?w=800&q=80'
  }
]

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-ink-950 pt-32 pb-24 px-6">
      <ScrollReveal type="fade-up">
        <div className="max-w-7xl mx-auto mb-16">
          <p className="text-caption text-gold-100 uppercase tracking-widest mb-4">Éditorial</p>
          <h1 className="font-serif text-display-md text-paper-50 mb-6">Le Journal</h1>
          <p className="text-ui text-paper-50/60 max-w-xl">
            Notes, réflexions et explorations autour du parfum. Une plongée intimiste dans notre processus créatif.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article, index) => (
          <ScrollReveal 
            key={article.slug} 
            type="scale-up" 
            delay={index * 0.1}
            className={article.featured ? "md:col-span-2 lg:col-span-2" : ""}
          >
            <Link href={`/journal/${article.slug}`} className="block h-full cursor-pointer">
              <GlassCard 
                className="flex flex-col h-full group hover-lift overflow-hidden"
                hover={false}
              >
                <div className={`relative w-full ${article.featured ? 'aspect-video' : 'aspect-[4/3]'} overflow-hidden bg-ink-900 border-b border-stroke-12`}>

                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-chip text-caption text-gold-100 bg-ink-950/80 backdrop-blur-md border border-stroke-12">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-caption text-paper-50/40 mb-3 block">{article.date}</span>
                <h3 className="font-serif text-heading-sm text-paper-50 mb-3 group-hover:text-gold-100 transition-colors duration-micro">
                  {article.title}
                </h3>
                <p className="text-ui text-paper-50/60 line-clamp-3 mb-6 flex-grow">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <span className="text-ui text-gold-100 group-hover:text-paper-50 transition-colors duration-micro inline-flex items-center gap-2">
                    Lire l'article <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
              </GlassCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
