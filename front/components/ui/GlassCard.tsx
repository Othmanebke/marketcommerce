'use client'

import { forwardRef } from 'react'

interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'soft' | 'med'
  hover?: boolean
  as?: React.ElementType
  href?: string
}

const GlassCard = forwardRef<HTMLElement, GlassCardProps>(
  ({ variant = 'med', hover = true, className = '', as: Tag = 'div', ...props }, ref) => {
    const base =
      'rounded-card border transition-all duration-micro ease-luxury'
    const variants = {
      soft: 'bg-glass-06 backdrop-blur-soft border-stroke-12',
      med:  'bg-glass-08 backdrop-blur-med  border-stroke-12',
    }
    const hoverClasses = hover
      ? 'hover:-translate-y-px hover:shadow-[0_0_24px_rgba(214,181,109,0.15)] hover:border-stroke-18'
      : ''

    return (
      <Tag
        ref={ref}
        className={`${base} ${variants[variant]} ${hoverClasses} ${className}`}
        {...props}
      />
    )
  }
)

GlassCard.displayName = 'GlassCard'

export default GlassCard
