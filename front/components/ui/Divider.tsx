interface DividerProps {
  className?: string
  label?: string
}

export default function DividerGoldHairline({ className = '', label }: DividerProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <span className="flex-1 gold-hairline" aria-hidden="true" />
        <span className="text-caption text-gold-100 uppercase tracking-widest">{label}</span>
        <span className="flex-1 gold-hairline" aria-hidden="true" />
      </div>
    )
  }

  return <div className={`gold-hairline w-full ${className}`} aria-hidden="true" />
}
