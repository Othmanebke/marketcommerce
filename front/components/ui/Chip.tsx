'use client'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  size?: 'sm' | 'md'
}

export default function Chip({
  selected = false,
  size = 'md',
  children,
  className = '',
  ...props
}: ChipProps) {
  const sizes = {
    sm: 'px-3 py-1 text-caption',
    md: 'px-4 py-2 text-ui',
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      className={`
        inline-flex items-center gap-1.5
        rounded-chip border font-sans tracking-wide
        transition-all duration-micro ease-luxury
        ${sizes[size]}
        ${
          selected
            ? 'bg-gold-30 border-[rgba(214,181,109,0.6)] text-gold-100 shadow-[0_0_12px_rgba(214,181,109,0.2)]'
            : 'bg-glass-06 border-stroke-12 text-paper-50/70 hover:bg-glass-10 hover:border-stroke-18 hover:text-paper-50'
        }
        disabled:opacity-45 disabled:pointer-events-none
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
