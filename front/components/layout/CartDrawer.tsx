'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 0,
  }).format(cents / 100)
}

const UPSELLS = [
  { id: 'coffret',      label: 'Coffret découverte', priceCents: 1200 },
  { id: 'echantillons', label: 'Échantillons ×3',    priceCents: 400  },
  { id: 'etui',         label: 'Étui de voyage',     priceCents: 1800 },
]

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalCents, totalQty, removeItem, updateQty } = useCart()
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-ink-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Votre panier"
            aria-modal="true"
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[440px] bg-ink-950 border-l border-stroke-12 flex flex-col"
          >
            {/* Top gold hairline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-100/40 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-stroke-12">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-gold-100 mb-1.5">
                  Mon Panier
                </p>
                <h2 className="font-serif text-2xl text-paper-50 leading-none">
                  {totalQty > 0
                    ? `${totalQty} article${totalQty !== 1 ? 's' : ''}`
                    : 'Vide'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le panier"
                className="w-10 h-10 flex items-center justify-center rounded-full text-paper-50/40 hover:text-paper-50 hover:bg-glass-08 transition-all duration-300"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-7" data-lenis-prevent>
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-24 gap-6">
                  <div className="w-16 h-16 rounded-full border border-stroke-12 flex items-center justify-center">
                    <CartIconLarge />
                  </div>
                  <div>
                    <p className="font-serif text-2xl text-paper-50/30 mb-2">Aucun article</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-paper-50/20 font-light">
                      Votre panier est vide
                    </p>
                  </div>
                  <Link
                    href="/collection"
                    onClick={onClose}
                    className="text-[9px] uppercase tracking-[0.35em] text-gold-100 hover:text-paper-50 transition-colors pb-0.5 border-b border-gold-100/30 hover:border-paper-50/30"
                  >
                    Explorer la Collection →
                  </Link>
                </div>
              ) : (
                <>
                  {items.map(item => (
                    <CartItem
                      key={item.variantId}
                      item={item}
                      onRemove={() => removeItem(item.variantId)}
                      onUpdateQty={(qty) => updateQty(item.variantId, qty)}
                      onClose={onClose}
                    />
                  ))}

                  {/* Upsell row */}
                  <div className="pt-4 border-t border-stroke-12">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-paper-50/30 mb-4">
                      Compléter votre sélection
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {UPSELLS.map(u => (
                        <button
                          key={u.id}
                          type="button"
                          className="px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] border border-stroke-12 text-paper-50/40 hover:border-gold-100/40 hover:text-gold-100 transition-all duration-400"
                        >
                          {u.label} +{formatPrice(u.priceCents)}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer — only when items exist */}
            {items.length > 0 && (
              <div className="border-t border-stroke-12 px-8 py-7 flex flex-col gap-5">
                {/* Total */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-paper-50/40 mb-1">Total estimé</p>
                    <p className="text-[10px] text-paper-50/30 font-light">Livraison calculée à l'étape suivante</p>
                  </div>
                  <span className="font-serif text-3xl text-gold-100 leading-none">
                    {formatPrice(totalCents)}
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  disabled={checkoutLoading}
                  onClick={handleCheckout}
                  className="
                    w-full py-4 bg-paper-50 text-ink-950 text-[10px] uppercase tracking-[0.35em] font-medium
                    hover:bg-gold-100 transition-colors duration-500
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {checkoutLoading ? 'Chargement…' : 'Passer au paiement'}
                </button>

                {/* View full cart */}
                <Link
                  href="/panier"
                  onClick={onClose}
                  className="text-center text-[9px] uppercase tracking-[0.3em] text-paper-50/30 hover:text-gold-100 transition-colors duration-400"
                >
                  Voir le panier complet
                </Link>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-6 pt-2 border-t border-stroke-12">
                  {['Paiement sécurisé', 'Retours 14j'].map(t => (
                    <p key={t} className="text-[8px] uppercase tracking-[0.2em] text-paper-50/20">{t}</p>
                  ))}
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Sub-components ─────────────────────────────────

interface CartItemProps {
  item: {
    variantId: string
    productSlug: string
    productName: string
    concentration: string
    volumeMl: number
    priceCents: number
    qty: number
    imageUrl: string
  }
  onRemove: () => void
  onUpdateQty: (qty: number) => void
  onClose: () => void
}

function CartItem({ item, onRemove, onUpdateQty, onClose }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex gap-5 group"
    >
      {/* Image */}
      <Link
        href={`/parfum/${item.productSlug}`}
        onClick={onClose}
        className="relative w-[72px] h-24 shrink-0 overflow-hidden bg-ink-900 border border-stroke-12"
      >
        <Image
          src={item.imageUrl}
          alt={item.productName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="72px"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col min-w-0">
        <p className="text-[9px] uppercase tracking-[0.2em] text-gold-100 mb-1">
          {item.concentration} · {item.volumeMl} ml
        </p>
        <Link
          href={`/parfum/${item.productSlug}`}
          onClick={onClose}
          className="font-serif text-lg text-paper-50 hover:text-gold-100 transition-colors duration-400 truncate leading-tight mb-1"
        >
          {item.productName}
        </Link>
        <p className="text-sm text-paper-50/50 font-light">
          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(item.priceCents / 100)}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-between mt-auto pt-3">
          {/* Qty stepper */}
          <div className="flex items-center border border-stroke-12">
            <button
              type="button"
              aria-label="Diminuer"
              onClick={() => onUpdateQty(item.qty - 1)}
              className="w-8 h-7 flex items-center justify-center text-paper-50/40 hover:text-gold-100 transition-colors text-base"
            >
              −
            </button>
            <span className="w-8 text-center text-sm text-paper-50 leading-none border-x border-stroke-12 py-1.5">
              {item.qty}
            </span>
            <button
              type="button"
              aria-label="Augmenter"
              onClick={() => onUpdateQty(item.qty + 1)}
              className="w-8 h-7 flex items-center justify-center text-paper-50/40 hover:text-gold-100 transition-colors text-base"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-[9px] uppercase tracking-[0.2em] text-paper-50/20 hover:text-gold-100 transition-colors"
          >
            Retirer
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CartIconLarge() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3h2l2.5 10h9l2.5-8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  )
}
