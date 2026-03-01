'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Mock API call
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: 'general', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-ink-950 pt-32 pb-24 px-6 md:pt-40">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* Contact Info (Left) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-10">
          <ScrollReveal type="slide-right">
            <div>
              <p className="text-[10px] text-gold-100 uppercase tracking-[0.2em] mb-4">Assistance</p>
              <h1 className="font-serif text-5xl md:text-6xl text-paper-50 mb-6 tracking-tight">Contact</h1>
              <p className="text-lg font-light text-paper-50/60 leading-relaxed mb-16 italic">
                Notre service client est à votre disposition pour vous accompagner dans la découverte de nos créations, le suivi de vos commandes, ou toute autre demande.
              </p>
              <div className="border-t border-stroke-12 w-full mb-16" />
            </div>
            
            <div className="flex flex-col gap-12">
              <div>
                <h3 className="text-sm font-medium text-paper-50 mb-4 uppercase tracking-widest">Par Téléphone</h3>
                <p className="text-xl font-light text-paper-50/80">+33 (0)1 42 61 73 89</p>
                <p className="text-[11px] text-paper-50/40 mt-2 uppercase tracking-wide">Lundi au Vendredi, 10h - 18h</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-paper-50 mb-4 uppercase tracking-widest">Par Email</h3>
                <a href="mailto:contact@maison.com" className="text-xl font-light text-gold-100 hover:text-paper-50 transition-colors duration-300 border-b border-gold-100/30 hover:border-gold-100 pb-1">
                  contact@maison.com
                </a>
                <p className="text-[11px] text-paper-50/40 mt-3 uppercase tracking-wide">Nous répondons sous 24h ouvrées</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-paper-50 mb-4 uppercase tracking-widest">Boutique Atelier</h3>
                <p className="text-lg font-light text-paper-50/80 break-words leading-relaxed">
                  42 Rue de Sévigné<br />
                  75003 Paris, France
                </p>
                <a href="#" className="text-[10px] text-gold-100 uppercase tracking-[0.2em] hover:text-paper-50 transition-colors mt-6 inline-block border-b border-gold-100/30 hover:border-gold-100 pb-1">
                  Itinéraire <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form (Right) */}
        <div className="w-full lg:w-2/3">
          <ScrollReveal type="fade-up" delay={0.2}>
            <div className="p-8 md:p-16 border border-stroke-12 relative overflow-hidden bg-ink-950">
              
              <h2 className="font-serif text-3xl md:text-4xl text-paper-50 mb-12 relative z-10 tracking-tight">Envoyer un message</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-[10px] text-paper-50/60 uppercase tracking-[0.2em]">Nom complet</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-transparent border-b border-stroke-12 px-0 py-3 text-paper-50 focus:outline-none focus:border-gold-100 transition-colors duration-300 font-light rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-[10px] text-paper-50/60 uppercase tracking-[0.2em]">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-transparent border-b border-stroke-12 px-0 py-3 text-paper-50 focus:outline-none focus:border-gold-100 transition-colors duration-300 font-light rounded-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="subject" className="text-[10px] text-paper-50/60 uppercase tracking-[0.2em]">Sujet</label>
                  <select 
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="bg-transparent border-b border-stroke-12 px-0 py-3 text-paper-50 focus:outline-none focus:border-gold-100 transition-colors duration-300 font-light appearance-none rounded-none cursor-pointer"
                  >
                    <option value="general" className="bg-ink-950">Question générale</option>
                    <option value="order" className="bg-ink-950">Suivi de commande</option>
                    <option value="advice" className="bg-ink-950">Conseil olfactif</option>
                    <option value="press" className="bg-ink-950">Presse & Partenariats</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="message" className="text-[10px] text-paper-50/60 uppercase tracking-[0.2em]">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-transparent border-b border-stroke-12 px-0 py-3 text-paper-50 focus:outline-none focus:border-gold-100 transition-colors duration-300 resize-none font-light rounded-none"
                  ></textarea>
                </div>

                <div className="pt-8 flex items-center justify-between">
                  <Button 
                    type="submit" 
                    disabled={status === 'submitting' || status === 'success'}
                    className="md:w-auto w-full"
                  >
                    {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer notre message'}
                  </Button>

                  {status === 'success' && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="text-gold-100 text-sm font-light flex items-center gap-2 tracking-wide"
                    >
                      ✓ Message envoyé
                    </motion.span>
                  )}
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

