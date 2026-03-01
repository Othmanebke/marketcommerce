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
    <GlassCard
      as={Link}
      href={`/parfum/${product.slug}`}
      hover={false}
      className="
        block group hover-lift
        overflow-hidden
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-800 shine-on-hover">
        <Image
          src={product.heroImageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={`
            object-cover transition-all duration-[600ms] ease-luxury
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
              object-cover absolute inset-0
              transition-all duration-[600ms] ease-luxury
              ${hovered ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.badges.map(badge => (
              <span
                key={badge}
                className={`
                  px-2 py-0.5 rounded-chip
                  text-[10px] font-medium tracking-wider uppercase
                  border
                  ${badgeColors[badge] ?? 'bg-glass-08 text-paper-50/70 border-stroke-12'}
                `}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <p className="text-caption text-paper-50/40 uppercase tracking-widest">
          {product.concentration}
        </p>
        <h3 className="font-serif text-heading-sm text-paper-50 group-hover:text-gold-100 transition-colors duration-micro ease-luxury">
          {product.name}
        </h3>
        <p className="text-ui text-paper-50/60 mt-1">
          À partir de {formatPrice(product.priceFromCents)}
        </p>
      </div>
    </GlassCard>
  )
}
