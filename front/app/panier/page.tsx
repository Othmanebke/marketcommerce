'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import DividerGoldHairline from '@/components/ui/Divider'
import { Skeleton } from '@/components/ui/Skeleton'

function formatPrice(cents: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 0,
  }).format(cents / 100)
}

const UPSELLS = [
  { id: 'coffret', label: 'Coffret découverte', priceCents: 1200 },
  { id: 'echantillons', label: 'Échantillons ×3', priceCents: 400 },
  { id: 'etui', label: 'Étui de voyage', priceCents: 1800 },
]

export default function PanierPage() {
  const { items, totalCents, totalQty, hydrated, removeItem, updateQty } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  async function handleCheckout() {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/checkout/stripe-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ variantId: i.variantId, qty: i.qty })),
          successUrl: `${window.location.origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl:  `${window.location.origin}/panier`,
        }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setCheckoutLoading(false)
    }
  }

  // ── Skeleton pendant l'hydratation ──
  if (!hydrated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Skeleton className="h-8 w-40 mb-10" />
        <div className="flex flex-col gap-4">
          {[1, 2].map(i => <Skeleton key={i} className="h-28 w-full" rounded="card" />)}
        </div>
      </div>
    )
  }

  // ── Panier vide ──
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-32">
        <p className="font-serif text-3xl md:text-5xl text-paper-50/40 mb-6 tracking-wide">
          Votre panier est vide.
        </p>
        <p className="text-sm text-paper-50/40 mb-10 font-light italic">
          Explorez notre collection pour trouver votre signature.
        </p>
        <Link href="/collection" className="bg-transparent border border-stroke-12 text-paper-50 px-8 py-3 text-xs uppercase tracking-[0.2em] hover:border-gold-100 hover:text-gold-100 transition-all duration-500">
          Découvrir la collection
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-32 bg-ink-950 min-h-screen">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs text-gold-100 uppercase tracking-[0.2em] mb-4">
          {totalQty} article{totalQty !== 1 ? 's' : ''}
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-paper-50 tracking-tight">
          Mon Panier
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

        {/* ── Items list ── */}
        <div className="flex flex-col gap-6">
          {items.map(item => (
            <div key={item.variantId} className="p-4 flex gap-6 bg-ink-900 border border-stroke-12 relative group">
              {/* Image */}
              <Link
                href={`/parfum/${item.productSlug}`}
                className="relative w-24 h-32 overflow-hidden bg-ink-950 shrink-0 border border-stroke-12"
              >
                <Image
                  src={item.imageUrl} alt={item.productName}
                  fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  sizes="96px"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-2 min-w-0 py-1">
                <p className="text-[10px] text-gold-100 uppercase tracking-[0.2em]">
                  {item.concentration} · {item.volumeMl} ml
                </p>
                <Link
                  href={`/parfum/${item.productSlug}`}
                  className="font-serif text-2xl text-paper-50 hover:text-gold-100 transition-colors duration-500 truncate"
                >
                  {item.productName}
                </Link>
                <p className="text-sm text-paper-50/60 font-light mt-auto">
                  {formatPrice(item.priceCents)}
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end justify-between shrink-0 py-1">
                {/* Remove */}
                <button
                  type="button"
                  aria-label={`Retirer ${item.productName}`}
                  onClick={() => removeItem(item.variantId)}
                  className="
                    text-paper-50/30 hover:text-gold-100
                    transition-all duration-300 text-sm tracking-widest
                  "
                >
                  RETIRER
                </button>

                {/* Qty stepper */}
                <div
                  className="flex items-center gap-4 border border-stroke-12 px-2 py-1"
                  role="group"
                  aria-label={`Quantité de ${item.productName}`}
                >
                  <button
                    type="button"
                    aria-label="Diminuer la quantité"
                    onClick={() => updateQty(item.variantId, item.qty - 1)}
                    className="w-6 h-6 flex items-center justify-center text-paper-50/60 hover:text-gold-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-4 text-center text-sm font-light text-paper-50">{item.qty}</span>
                  <button
                    type="button"
                    aria-label="Augmenter la quantité"
                    onClick={() => updateQty(item.variantId, item.qty + 1)}
                    className="w-6 h-6 flex items-center justify-center text-paper-50/60 hover:text-gold-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Upsell */}
          <div className="p-6 bg-ink-900/50 border border-stroke-12 mt-4">
            <p className="text-[10px] text-paper-50/40 uppercase tracking-[0.2em] mb-4">
              Compléter votre sélection
            </p>
            <div className="flex flex-wrap gap-3">
              {UPSELLS.map(u => (
                <button
                  key={u.id}
                  type="button"
                  className="
                    px-4 py-2 text-[10px] uppercase tracking-widest
                    bg-transparent border border-stroke-12
                    text-paper-50/60 hover:text-gold-100 hover:border-gold-100/50
                    transition-all duration-500
                  "
                >
                  {u.label} · +{formatPrice(u.priceCents)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Order summary ── */}
        <div className="lg:sticky lg:top-32">
          <div className="p-8 bg-ink-900 border border-stroke-12 flex flex-col gap-6">
            <h2 className="font-serif text-2xl text-paper-50 mb-2">
              Récapitulatif
            </h2>

            <DividerGoldHairline />

            {/* Sous-total */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-paper-50/60 font-light">Sous-total</span>
                <span className="text-paper-50">{formatPrice(totalCents)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-paper-50/60 font-light">Livraison</span>
                <span className="text-paper-50/40 italic">Calculée à l'étape suivante</span>
              </div>
            </div>

            <DividerGoldHairline />

            {/* Total */}
            <div className="flex justify-between items-end mt-2">
              <span className="text-xs uppercase tracking-[0.2em] text-paper-50/80">Total</span>
              <span className="font-serif text-3xl text-gold-100">
                {formatPrice(totalCents)}
              </span>
            </div>

            {/* CTA */}
            <button
              disabled={checkoutLoading}
              onClick={handleCheckout}
              className="w-full bg-paper-50 text-ink-950 px-6 py-4 mt-4 text-xs uppercase tracking-widest hover:bg-gold-100 transition-colors"
            >
              {checkoutLoading ? 'Chargement...' : 'Passer au paiement'}
            </button>

            {/* Trust row */}
            <div className="flex flex-col gap-2 text-center mt-4">
              {['Paiement sécurisé', 'Livraison assurée', 'Retours 14 jours'].map(t => (
                <p key={t} className="text-[10px] text-paper-50/30 uppercase tracking-[0.2em]">{t}</p>
              ))}
            </div>
          </div>

          {/* Continuer les achats */}
          <div className="mt-8 text-center">
            <Link
              href="/collection"
              className="text-xs text-paper-50/40 uppercase tracking-[0.2em] hover:text-gold-100 transition-colors duration-500"
            >
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
