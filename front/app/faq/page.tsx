'use client'

import React from 'react'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Accordion from '@/components/ui/Accordion'

const FAQS = [
  {
    category: 'Nos Parfums',
    items: [
      {
        id: 'tenue',
        question: 'Quelle est la tenue de vos parfums ?',
        answer: 'Nos Extraits de Parfum sont concentrés entre 25% et 30%, offrant une tenue exceptionnelle de plus de 12 heures sur peau. Nos Eaux de Parfum (15-20%) tiennent environ 6 à 8 heures. La tenue dépend aussi de votre type de peau et de l\'hydratation.'
      },
      {
        id: 'natural',
        question: 'Utilisez-vous des ingrédients naturels ?',
        answer: 'Nous privilégions les belles matières naturelles (Vétiver d\'Haïti, Rose de Grasse, Bergamote de Calabre) pour leur richesse et leur complexité. Nous les associons à des molécules de synthèse sûres et modernes qui apportent diffusion, tenue et créativité, impossibles à obtenir avec le 100% naturel.'
      },
      {
        id: 'samples',
        question: 'Proposez-vous des échantillons ?',
        answer: 'Absolument. Chaque commande est accompagnée de 2 échantillons gratuits de votre choix pour découvrir le reste de la collection. Nous proposons également un "Coffret Découverte" remboursable sur votre prochain achat de flacon 50ml ou 100ml.'
      }
    ]
  },
  {
    category: 'Commandes & Livraison',
    items: [
      {
        id: 'shipping-time',
        question: 'Quels sont les délais de livraison ?',
        answer: 'Toute commande passée avant 13h est expédiée le jour même. En France métropolitaine, la livraison Colissimo s\'effectue en 48h ouvrées. Pour l\'Europe, comptez 3 à 5 jours ouvrés.'
      },
      {
        id: 'returns',
        question: 'Puis-je retourner mon parfum ?',
        answer: 'Oui. Grâce à l\'échantillon d\'essai inclus avec votre flacon, vous pouvez tester le parfum sur votre peau avant d\'ouvrir l\'emballage principal. Si la fragrance ne vous convient pas, renvoyez le flacon scellé sous 30 jours pour un remboursement intégral.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-ink-950 pb-32">
      <HeroSection
        title="Questions Fréquentes"
        subtitle="Tout savoir sur nos créations, nos engagements et nos services."
        backgroundImage="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1920&q=85&auto=format&fit=crop"
        align="center"
      />

      <section className="px-6 max-w-4xl mx-auto -mt-20 relative z-10">
        <ScrollReveal type="fade-up">
           <div className="space-y-16">
             {FAQS.map((section, i) => (
               <div key={i} className="bg-ink-900/40 backdrop-blur-md border border-stroke-12 p-8 md:p-12 rounded-card">
                 <h2 className="font-serif text-3xl text-paper-50 mb-8 border-b border-stroke-12 pb-4">
                   {section.category}
                 </h2>
                 <div className="space-y-4">
                   {section.items.map((item) => (
                     <Accordion 
                       key={item.id} 
                       title={item.question} 
                       id={item.id}
                     >
                       <p className="text-paper-50/80 leading-relaxed pb-4 font-light">
                         {item.answer}
                       </p>
                     </Accordion>
                   ))}
                 </div>
               </div>
             ))}
           </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
