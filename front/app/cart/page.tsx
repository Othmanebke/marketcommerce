'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart, type CartItem } from '@/hooks/useCart'
import DividerGoldHairline from '@/components/ui/Divider'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 0,
  }).format(cents / 100)
}

export default function CartPage() {
  const { items, removeItem, updateQty } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const subtotal = items.reduce((acc, item) => acc + item.priceCents * item.qty, 0)
  const shipping = subtotal > 15000 ? 0 : 1200 // Livraison offerte > 150€
  const total    = subtotal + shipping

  if (!mounted) return <div className="min-h-screen bg-ink-950 flex items-center justify-center text-gold-100">Chargement...</div>

  return (
    <main className="min-h-screen bg-ink-950 pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h1 className="font-serif text-4xl md:text-5xl text-paper-50 mb-2">Votre Panier</h1>
          <p className="text-paper-50/60 mb-12 font-light">
            {items.length > 0
              ? `${items.length} création${items.length > 1 ? 's' : ''} en attente`
              : 'Votre panier est vide'}
          </p>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal delay={0.1}>
            <div className="text-center py-24 border border-stroke-12 rounded-card bg-paper-50/5 backdrop-blur-sm">
              <p className="font-serif text-2xl text-paper-50/40 mb-8">Le vide appelle la création.</p>
              <Link href="/collection">
                <Button variant="primary">Explorer la collection</Button>
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
            {/* Liste des items */}
            <div className="flex-1 space-y-8">
              <DividerGoldHairline />
              <AnimatePresence mode='popLayout'>
                {items.map((item) => (
                  <motion.div
                    key={item.variantId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex gap-6 group relative"
                  >
                    {/* Image */}
                    <div className="relative w-24 aspect-[3/4] rounded bg-ink-900 overflow-hidden shrink-0 border border-stroke-12">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Détails */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <Link href={`/parfum/${item.productSlug}`} className="font-serif text-xl text-paper-50 hover:text-gold-100 transition-colors">
                            {item.productName}
                          </Link>
                          <span className="font-medium text-paper-50">{formatPrice(item.priceCents * item.qty)}</span>
                        </div>
                        <p className="text-sm text-paper-50/60 font-light">{item.concentration} · {item.volumeMl}ml</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm font-medium text-paper-50">
                          <button 
                            onClick={() => updateQty(item.variantId, Math.max(1, item.qty - 1))}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-stroke-12 hover:border-gold-100 hover:text-gold-100 transition-colors"
                          >
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.variantId, item.qty + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-stroke-12 hover:border-gold-100 hover:text-gold-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-xs text-paper-50/40 hover:text-red-400 underline underline-offset-4 transition-colors"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Résumé (colonne droite) */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="lg:sticky lg:top-32">
                <GlassCard className="p-8 space-y-6">
                  <h3 className="font-serif text-2xl text-paper-50 mb-6">Récapitulatif</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-paper-50/60">
                      <span>Sous-total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-paper-50/60">
                      <span>Livraison</span>
                      <span>{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</span>
                    </div>
                  </div>

                  <DividerGoldHairline />

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-medium text-paper-50">Total</span>
                    <span className="text-2xl font-serif text-gold-100">{formatPrice(total)}</span>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button variant="primary" size="lg" className="w-full justify-center">
                      Procéder au paiement
                    </Button>
                  </Link>

                  <p className="text-xs text-center text-paper-50/40 mt-4 leading-relaxed">
                    Expédition sous 24h. Emballage soigné.<br/>
                    Retours gratuits sous 30 jours.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
