'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'

export interface ProductCardData {
  slug: string
  name: string
  concentration: string
  priceFromCents: number
  heroImageUrl: string
  hoverImageUrl?: string
  badges?: string[]
  metrics?: {
    intensity: number
    tenue: number
    sillage: number
  }
}

interface ProductCardProps {
  product: ProductCardData
  priority?: boolean
}

const badgeColors: Record<string, string> = {
  'Nouveau':          'bg-[rgba(59,209,138,0.15)] text-[#3BD18A] border-[rgba(59,209,138,0.3)]',
  'Atelier':          'bg-gold-30 text-gold-100 border-[rgba(214,181,109,0.4)]',
  'Édition limitée':  'bg-[rgba(255,90,106,0.12)] text-[#FF5A6A] border-[rgba(255,90,106,0.3)]',
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/parfum/${product.slug}`}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-900 border border-stroke-12 mb-4">
        <Image
          src={product.heroImageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={`
            object-cover transition-transform duration-[1.5s] ease-out
            ${hovered ? 'scale-105' : 'scale-100'}
            ${hovered && product.hoverImageUrl ? 'opacity-0' : 'opacity-100'}
          `}
          priority={priority}
        />
        {product.hoverImageUrl && (
          <Image
            src={product.hoverImageUrl}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`
              object-cover absolute inset-0 transition-transform duration-[1.5s] ease-out
              ${hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}
            `}
          />
        )}

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.badges.map(badge => (
              <span
                key={badge}
                className={`
                  px-3 py-1 text-[9px] tracking-[0.2em] uppercase border backdrop-blur-md
                  ${badgeColors[badge] ?? 'bg-ink-950/40 text-paper-50/70 border-stroke-12'}
                `}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center px-2">
        <p className="text-[10px] text-paper-50/40 uppercase tracking-[0.2em] mb-2">
          {product.concentration}
        </p>
        <h3 className="font-serif text-2xl text-paper-50 group-hover:text-gold-100 transition-colors duration-500 mb-2">
          {product.name}
        </h3>
        <p className="text-sm font-light text-paper-50/60 italic">
          À partir de {formatPrice(product.priceFromCents)}
        </p>
      </div>
    </Link>
  )
}
