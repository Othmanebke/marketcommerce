interface SkeletonProps {
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'card'
}

export function Skeleton({ className = '', rounded = 'md' }: SkeletonProps) {
  const radii = {
    sm:   'rounded',
    md:   'rounded-lg',
    lg:   'rounded-2xl',
    full: 'rounded-full',
    card: 'rounded-card',
  }
  return (
    <div
      className={`skeleton-glass ${radii[rounded]} ${className}`}
      aria-hidden="true"
    />
  )
}

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[3/4] w-full" rounded="card" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )
}

export function SkeletonProductGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  )
}
