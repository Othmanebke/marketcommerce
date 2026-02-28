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
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-heading-md text-paper-50/30 mb-4">
          Votre panier est vide.
        </p>
        <p className="text-ui text-paper-50/25 mb-8">
          Explorez notre collection pour trouver votre signature.
        </p>
        <Button variant="secondary" as={Link} href="/collection">
          Découvrir la collection
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-caption text-gold-100 uppercase tracking-widest mb-2">
          {totalQty} article{totalQty !== 1 ? 's' : ''}
        </p>
        <h1 className="font-serif text-display-sm text-paper-50">
          Mon Panier
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

        {/* ── Items list ── */}
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <GlassCard key={item.variantId} className="p-4 flex gap-4">
              {/* Image */}
              <Link
                href={`/parfum/${item.productSlug}`}
                className="relative w-20 h-24 rounded-lg overflow-hidden bg-ink-800 shrink-0"
              >
                <Image
                  src={item.imageUrl} alt={item.productName}
                  fill className="object-cover"
                  sizes="80px"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-1 min-w-0">
                <p className="text-caption text-paper-50/40 uppercase tracking-widest">
                  {item.concentration} · {item.volumeMl} ml
                </p>
                <Link
                  href={`/parfum/${item.productSlug}`}
                  className="font-serif text-heading-sm text-paper-50 hover:text-gold-100 transition-colors duration-micro ease-luxury truncate"
                >
                  {item.productName}
                </Link>
                <p className="text-ui text-paper-50/60">
                  {formatPrice(item.priceCents)}
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end justify-between shrink-0">
                {/* Remove */}
                <button
                  type="button"
                  aria-label={`Retirer ${item.productName}`}
                  onClick={() => removeItem(item.variantId)}
                  className="
                    w-7 h-7 flex items-center justify-center rounded-full
                    text-paper-50/30 hover:text-danger hover:bg-glass-06
                    transition-all duration-micro ease-luxury text-sm
                  "
                >
                  ×
                </button>

                {/* Qty stepper */}
                <div
                  className="flex items-center gap-1"
                  role="group"
                  aria-label={`Quantité de ${item.productName}`}
                >
                  <button
                    type="button"
                    aria-label="Diminuer la quantité"
                    onClick={() => updateQty(item.variantId, item.qty - 1)}
                    className="
                      w-7 h-7 flex items-center justify-center rounded-full
                      glass-soft text-paper-50/60 hover:text-paper-50
                      transition-all duration-micro ease-luxury text-sm
                    "
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-ui text-paper-50">{item.qty}</span>
                  <button
                    type="button"
                    aria-label="Augmenter la quantité"
                    onClick={() => updateQty(item.variantId, item.qty + 1)}
                    className="
                      w-7 h-7 flex items-center justify-center rounded-full
                      glass-soft text-paper-50/60 hover:text-paper-50
                      transition-all duration-micro ease-luxury text-sm
                    "
                  >
                    +
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Upsell */}
          <GlassCard variant="soft" className="p-4">
            <p className="text-caption text-paper-50/30 uppercase tracking-widest mb-3">
              Compléter votre sélection
            </p>
            <div className="flex flex-wrap gap-2">
              {UPSELLS.map(u => (
                <button
                  key={u.id}
                  type="button"
                  className="
                    px-3 py-1.5 rounded-chip text-caption
                    glass-soft border border-stroke-12
                    text-paper-50/60 hover:text-paper-50 hover:border-stroke-18
                    transition-all duration-micro ease-luxury
                  "
                >
                  {u.label} · +{formatPrice(u.priceCents)}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* ── Order summary ── */}
        <div className="lg:sticky lg:top-24">
          <GlassCard className="p-6 flex flex-col gap-5">
            <h2 className="font-serif text-heading-sm text-paper-50">
              Récapitulatif
            </h2>

            <DividerGoldHairline />

            {/* Sous-total */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-ui">
                <span className="text-paper-50/60">Sous-total</span>
                <span className="text-paper-50">{formatPrice(totalCents)}</span>
              </div>
              <div className="flex justify-between text-ui">
                <span className="text-paper-50/60">Livraison</span>
                <span className="text-paper-50/40">Calculée à l'étape suivante</span>
              </div>
            </div>

            <DividerGoldHairline />

            {/* Total */}
            <div className="flex justify-between">
              <span className="font-serif text-heading-sm text-paper-50">Total</span>
              <span className="font-serif text-heading-sm text-gold-100">
                {formatPrice(totalCents)}
              </span>
            </div>

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              loading={checkoutLoading}
              onClick={handleCheckout}
            >
              Passer au paiement
            </Button>

            {/* Trust row */}
            <div className="flex flex-col gap-1 text-center">
              {['Paiement sécurisé', 'Livraison assurée', 'Retours 14 jours'].map(t => (
                <p key={t} className="text-caption text-paper-50/25">{t}</p>
              ))}
            </div>
          </GlassCard>

          {/* Continuer les achats */}
          <div className="mt-4 text-center">
            <Link
              href="/collection"
              className="text-ui text-paper-50/40 hover:text-gold-100 transition-colors duration-micro ease-luxury"
            >
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
