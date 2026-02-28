'use client'

import { forwardRef } from 'react'

type ButtonSize    = 'sm' | 'md' | 'lg'
type ButtonVariant = 'primary' | 'secondary' | 'ghost'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>

interface ButtonOwnProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

type ButtonProps = ButtonOwnProps & AnyProps

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-ui',
  md: 'px-6 py-3 text-ui',
  lg: 'px-8 py-4 text-body',
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-gold-100 text-ink-950 font-medium
    hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(214,181,109,0.35)]
    disabled:opacity-45 disabled:pointer-events-none
    focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]
    focus-visible:shadow-[0_0_0_3px_rgba(214,181,109,0.3)]
  `,
  secondary: `
    bg-glass-06 backdrop-blur-soft border border-stroke-12 text-paper-50
    hover:-translate-y-px hover:bg-glass-10 hover:border-stroke-18
    disabled:opacity-45 disabled:pointer-events-none
    focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]
    focus-visible:shadow-[0_0_0_3px_rgba(214,181,109,0.3)]
  `,
  ghost: `
    text-paper-50 hover:text-gold-100
    disabled:opacity-45 disabled:pointer-events-none
  `,
}

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as: Tag = 'button',
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'right',
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Tag
        ref={ref}
        disabled={Tag === 'button' ? (disabled || loading) : undefined}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-btn font-sans tracking-wide
          transition-all duration-micro ease-luxury
          cursor-pointer
          ${sizes[size]}
          ${variants[variant]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="inline-flex gap-1" aria-label="Chargement">
            <span className="w-1 h-1 rounded-full bg-current animate-dot1" />
            <span className="w-1 h-1 rounded-full bg-current animate-dot2" />
            <span className="w-1 h-1 rounded-full bg-current animate-dot3" />
          </span>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </Tag>
    )
  }
)

Button.displayName = 'Button'

export default Button
