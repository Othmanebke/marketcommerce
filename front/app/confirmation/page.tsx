import type { Metadata } from 'next'
import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import DividerGoldHairline from '@/components/ui/Divider'

export const metadata: Metadata = {
  title: 'Confirmation de commande',
  robots: 'noindex',
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  const ref = session_id
    ? `MN-${session_id.slice(-6).toUpperCase()}`
    : 'MN-XXXXXX'

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center animate-fade-up">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full glass-med border border-stroke-12 flex items-center justify-center mx-auto mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="var(--success)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-serif text-display-sm text-paper-50 mb-4">
          Merci.
        </h1>
        <p className="text-ui text-paper-50/60 mb-8 leading-relaxed">
          Votre commande est en préparation.
          <br />
          Vous recevrez un email de confirmation sous peu.
        </p>

        <GlassCard className="p-4 mb-8 text-left">
          <p className="text-caption text-paper-50/40 uppercase tracking-widest mb-1">
            Référence
          </p>
          <p className="font-serif text-heading-sm text-gold-100">{ref}</p>
        </GlassCard>

        <DividerGoldHairline className="mb-8" />

        <div className="flex flex-col gap-3">
          <Link
            href="/collection"
            className="inline-flex items-center justify-center gap-2 rounded-btn font-sans tracking-wide transition-all duration-micro ease-luxury cursor-pointer px-6 py-3 text-ui bg-gold-100 text-ink-950 font-medium hover:-translate-y-px hover:shadow-[0_4px_24px_rgba(214,181,109,0.35)]"
          >
            {"Continuer l'exploration"}
          </Link>
          <Link
            href="/journal"
            className="inline-flex items-center justify-center gap-2 rounded-btn font-sans tracking-wide transition-all duration-micro ease-luxury cursor-pointer px-6 py-3 text-ui bg-glass-06 backdrop-blur-soft border border-stroke-12 text-paper-50 hover:-translate-y-px hover:bg-glass-10 hover:border-stroke-18"
          >
            Lire le Journal →
          </Link>
        </div>
      </div>
    </div>
  )
}
