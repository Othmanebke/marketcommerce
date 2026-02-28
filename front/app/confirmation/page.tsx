import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import DividerGoldHairline from '@/components/ui/Divider'

export const metadata: Metadata = {
  title: 'Confirmation de commande',
  robots: 'noindex',
}

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const ref = searchParams.session_id
    ? `MN-${searchParams.session_id.slice(-6).toUpperCase()}`
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
          <Button variant="primary" as={Link} href="/collection">
            Continuer l'exploration
          </Button>
          <Button variant="secondary" as={Link} href="/journal">
            Lire le Journal →
          </Button>
        </div>
      </div>
    </div>
  )
}
