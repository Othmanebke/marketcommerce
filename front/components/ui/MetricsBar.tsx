interface MetricsBarProps {
  label: string
  value: number  // 1–5
  max?: number
}

export function MetricsBar({ label, value, max = 5 }: MetricsBarProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-20 text-caption text-paper-50/60 uppercase tracking-widest shrink-0">
        {label}
      </span>
      <div
        className="flex-1 flex gap-1"
        role="meter"
        aria-label={`${label} : ${value} sur ${max}`}
        aria-valuenow={value}
        aria-valuemin={1}
        aria-valuemax={max}
      >
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`
              flex-1 h-px rounded-full transition-all duration-reveal ease-luxury
              ${i < value
                ? 'bg-gold-100'
                : 'bg-stroke-12'
              }
            `}
          />
        ))}
      </div>
      <span className="text-caption text-paper-50/40 w-6 text-right shrink-0">
        {value}/{max}
      </span>
    </div>
  )
}

interface MetricsBarsProps {
  intensity: number
  tenue: number
  sillage: number
  className?: string
}

export function MetricsBars({ intensity, tenue, sillage, className = '' }: MetricsBarsProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <MetricsBar label="Intensité" value={intensity} />
      <MetricsBar label="Tenue"     value={tenue}     />
      <MetricsBar label="Sillage"   value={sillage}   />
    </div>
  )
}
