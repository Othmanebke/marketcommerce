'use client'

import React, { useState } from 'react'
import { HeroSection } from '@/components/marketing/HeroSection'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import DividerGoldHairline from '@/components/ui/Divider'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-ink-950 pb-32">
      <HeroSection
        title="Contact & Atelier"
        subtitle="Une question sur une commande, un conseil olfactif ou une demande presse ? Nous sommes à votre écoute."
        backgroundImage="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1920&q=85&auto=format&fit=crop"
        align="left"
      />

      <section className="px-6 max-w-6xl mx-auto -mt-20 relative z-10">
        <ScrollReveal type="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Colonne d'infos */}
            <GlassCard className="p-8 md:p-12 space-y-8 h-fit">
              <div>
                <h3 className="font-serif text-2xl text-paper-50 mb-4">L'Atelier</h3>
                <p className="text-paper-50/60 font-light leading-relaxed">
                  12 Rue des Archives<br/>
                  75004 Paris, France<br/>
                  <span className="text-sm opacity-60 mt-2 block">Sur rendez-vous uniquement.</span>
                </p>
              </div>

              <DividerGoldHairline />

              <div>
                <h3 className="font-serif text-2xl text-paper-50 mb-4">Service Client</h3>
                <p className="text-paper-50/60 font-light leading-relaxed mb-4">
                  Du lundi au vendredi<br/>
                  9h00 - 18h00
                </p>
                <a href="mailto:bonjour@maison.fr" className="text-gold-100 hover:text-paper-50 transition-colors block mb-1">bonjour@maison.fr</a>
                <a href="tel:+33100000000" className="text-paper-50/60 hover:text-paper-50 transition-colors">+33 1 00 00 00 00</a>
              </div>

              <DividerGoldHairline />

              <div>
                <h3 className="font-serif text-2xl text-paper-50 mb-4">Presse & Partenariats</h3>
                <a href="mailto:presse@maison.fr" className="text-gold-100 hover:text-paper-50 transition-colors">presse@maison.fr</a>
              </div>
            </GlassCard>

            {/* Formulaire */}
            <div className="bg-ink-900/40 backdrop-blur-md border border-stroke-12 p-8 md:p-12 rounded-card">
              {status === 'success' ? (
                <div className="h-full flex flex-col justify-center items-center text-center py-12">
                   <div className="w-16 h-16 rounded-full border border-gold-100 flex items-center justify-center text-gold-100 text-2xl mb-6">✓</div>
                   <h3 className="font-serif text-3xl text-paper-50 mb-4">Message reçu</h3>
                   <p className="text-paper-50/60 font-light mb-8">
                     Merci de nous avoir écrit. Notre équipe vous répondra<br/>sous 24 à 48 heures.
                   </p>
                   <Button variant="outline" onClick={() => setStatus('idle')}>Envoyer un autre message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-serif text-3xl text-paper-50 mb-8">Envoyer un message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label htmlFor="name" className="text-xs uppercase tracking-wider text-paper-50/40 font-medium">Nom</label>
                       <input 
                         required
                         type="text" 
                         id="name" 
                         className="w-full bg-ink-950/50 border border-stroke-12 rounded focus:border-gold-100 focus:outline-none p-3 text-paper-50 transition-colors placeholder:text-paper-50/20"
                         placeholder="Votre nom"
                       />
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="email" className="text-xs uppercase tracking-wider text-paper-50/40 font-medium">Email</label>
                       <input 
                         required
                         type="email" 
                         id="email" 
                         className="w-full bg-ink-950/50 border border-stroke-12 rounded focus:border-gold-100 focus:outline-none p-3 text-paper-50 transition-colors placeholder:text-paper-50/20"
                         placeholder="votre@email.com"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="subject" className="text-xs uppercase tracking-wider text-paper-50/40 font-medium">Sujet</label>
                     <div className="relative">
                        <select 
                          id="subject" 
                          className="w-full bg-ink-950/50 border border-stroke-12 rounded focus:border-gold-100 focus:outline-none p-3 text-paper-50 appearance-none transition-colors"
                        >
                          <option>Conseil Parfum</option>
                          <option>Suivi de commande</option>
                          <option>Partenariats</option>
                          <option>Autre</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-paper-50/40">↓</div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label htmlFor="message" className="text-xs uppercase tracking-wider text-paper-50/40 font-medium">Message</label>
                     <textarea 
                       required
                       id="message" 
                       rows={6}
                       className="w-full bg-ink-950/50 border border-stroke-12 rounded focus:border-gold-100 focus:outline-none p-3 text-paper-50 transition-colors placeholder:text-paper-50/20 resize-none"
                       placeholder="Comment pouvons-nous vous aider ?"
                     />
                  </div>

                  <div className="pt-4">
                     <Button 
                        variant="primary" 
                        className="w-full justify-center" 
                        disabled={status === 'submitting'}
                      >
                       {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                     </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}

