'use client'

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  size?: 'sm' | 'md'
  variant?: 'outline' | 'dark' | 'glass'
}

export default function Chip({
  selected = false,
  size = 'md',
  variant = 'outline',
  children,
  className = '',
  ...props
}: ChipProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-[0.65rem] uppercase tracking-widest',
    md: 'px-5 py-2.5 text-xs uppercase tracking-[0.2em]',
  }
  
  const variants = {
    outline: selected 
      ? 'bg-gold-100/10 text-gold-100 border-gold-100' 
      : 'bg-transparent text-paper-50/60 border-paper-50/20 hover:border-gold-100/50 hover:text-gold-100',
    dark: 'bg-ink-900 text-paper-50 border border-stroke-12 hover:border-gold-100/30',
    glass: 'glass-soft text-paper-50 hover:bg-white/10'
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      className={`
        inline-flex items-center justify-center gap-2
        border font-sans rounded-full
        transition-all duration-500
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {selected && (
        <span className="w-1 h-1 rounded-full bg-gold-100 animate-pulse" />
      )}
      {children}
    </button>
  )
}
