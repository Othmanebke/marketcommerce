'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import DividerGoldHairline from '@/components/ui/Divider'
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
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Contact Info (Left) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-10">
          <ScrollReveal type="slide-right">
            <div>
              <p className="text-caption text-gold-100 uppercase tracking-widest mb-4">Assistance</p>
              <h1 className="font-serif text-display-sm text-paper-50 mb-6">Contact</h1>
              <p className="text-ui text-paper-50/60 leading-relaxed mb-10">
                Notre service client est à votre disposition pour vous accompagner dans la découverte de nos créations, le suivi de vos commandes, ou toute autre demande.
              </p>
              <DividerGoldHairline className="mb-10" />
            </div>
            
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-ui font-medium text-paper-50 mb-2">Par Téléphone</h3>
                <p className="text-ui text-paper-50/60">+33 (0)1 42 61 73 89</p>
                <p className="text-caption text-paper-50/40 mt-1">Lundi au Vendredi, 10h - 18h</p>
              </div>
              
              <div>
                <h3 className="text-ui font-medium text-paper-50 mb-2">Par Email</h3>
                <a href="mailto:contact@maison.com" className="text-ui text-gold-100 hover:text-paper-50 transition-colors duration-micro">
                  contact@maison.com
                </a>
                <p className="text-caption text-paper-50/40 mt-1">Nous répondons sous 24h ouvrées</p>
              </div>

              <div>
                <h3 className="text-ui font-medium text-paper-50 mb-2">Boutique Atelier</h3>
                <p className="text-ui text-paper-50/60 break-words">
                  42 Rue de Sévigné<br />
                  75003 Paris, France
                </p>
                <a href="#" className="text-caption text-gold-100 uppercase tracking-widest hover:text-paper-50 transition-colors mt-3 inline-block">
                  Itinéraire →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form (Right) */}
        <div className="w-full lg:w-2/3">
          <ScrollReveal type="fade-up" delay={0.2}>
            <GlassCard className="p-8 md:p-12 border border-stroke-12 relative overflow-hidden" hover={false}>
              <div className="absolute inset-0 bg-gradient-to-br from-glass-08 to-transparent pointer-events-none" />
              
              <h2 className="font-serif text-heading-md text-paper-50 mb-8 relative z-10">Envoyer un message</h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-caption text-paper-50/60 uppercase tracking-wider">Nom complet</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-ink-900 border border-stroke-12 rounded-md px-4 py-3 text-paper-50 focus:outline-none focus:border-gold-80 focus:ring-1 focus:ring-gold-80 transition-all duration-micro"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-caption text-paper-50/60 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-ink-900 border border-stroke-12 rounded-md px-4 py-3 text-paper-50 focus:outline-none focus:border-gold-80 focus:ring-1 focus:ring-gold-80 transition-all duration-micro"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-caption text-paper-50/60 uppercase tracking-wider">Sujet</label>
                  <select 
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="bg-ink-900 border border-stroke-12 rounded-md px-4 py-3 text-paper-50 focus:outline-none focus:border-gold-80 focus:ring-1 focus:ring-gold-80 transition-all duration-micro appearance-none"
                  >
                    <option value="general">Question générale</option>
                    <option value="order">Suivi de commande</option>
                    <option value="advice">Conseil olfactif</option>
                    <option value="press">Presse & Partenariats</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-caption text-paper-50/60 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-ink-900 border border-stroke-12 rounded-md px-4 py-3 text-paper-50 focus:outline-none focus:border-gold-80 focus:ring-1 focus:ring-gold-80 transition-all duration-micro resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex items-center justify-between">
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
                      className="text-success text-ui flex items-center gap-2"
                    >
                      ✓ Message envoyé
                    </motion.span>
                  )}
                </div>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

