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
    sm: 'px-3 py-1.5 text-[0.65rem] uppercase tracking-widest',
    md: 'px-5 py-2.5 text-xs uppercase tracking-[0.2em]',
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      className={`
        inline-flex items-center justify-center gap-2
        border font-sans
        transition-all duration-500
        ${sizes[size]}
        ${
          selected
            ? 'bg-gold-100/10 border-gold-100 text-gold-100'
            : 'bg-transparent border-stroke-12 text-paper-50/70 hover:border-gold-100/50 hover:text-paper-50'
        }
        disabled:opacity-20 disabled:pointer-events-none
        focus-visible:outline-none focus:border-gold-100
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
