'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Chip from '@/components/ui/Chip'
import GlassCard from '@/components/ui/GlassCard'
import DividerGoldHairline from '@/components/ui/Divider'

// ── Types ──
type Step = 'init' | 'vibe' | 'family' | 'notes_liked' | 'notes_avoid' | 'intensity' | 'occasion' | 'done'

interface Reco {
  slug:          string
  name:          string
  concentration: string
  priceFromCents:number
  heroImageUrl?: string
  reasons:       string[]
  score:         number
}

interface Message {
  role:    'user' | 'assistant'
  content: string
  chips?:  string[]
  recos?:  Reco[]
}

interface ChatModalProps {
  open:        boolean
  onClose:     () => void
  productSlug?: string | null
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 0,
  }).format(cents / 100)
}

// ── Typing indicator ──
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 glass-soft rounded-card w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-paper-50/60 animate-dot1" />
      <span className="w-1.5 h-1.5 rounded-full bg-paper-50/60 animate-dot2" />
      <span className="w-1.5 h-1.5 rounded-full bg-paper-50/60 animate-dot3" />
    </div>
  )
}

// ── Reco card ──
function RecoCard({ reco }: { reco: Reco }) {
  return (
    <GlassCard className="p-4 flex gap-3 hover:border-[rgba(214,181,109,0.4)]">
      {/* Image placeholder */}
      <div className="w-14 h-18 rounded-lg overflow-hidden bg-ink-800 shrink-0 relative" style={{ minHeight: '72px' }}>
        {reco.heroImageUrl && (
          <Image
            src={reco.heroImageUrl}
            alt={reco.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-caption text-paper-50/40 mb-0.5">{reco.concentration}</p>
        <p className="font-serif text-ui text-paper-50 font-medium mb-1 truncate">{reco.name}</p>
        <p className="text-caption text-gold-100 mb-2">{formatPrice(reco.priceFromCents)}</p>
        <ul className="space-y-1 mb-3">
          {reco.reasons.map((r, i) => (
            <li key={i} className="text-caption text-paper-50/50 leading-tight">
              · {r}
            </li>
          ))}
        </ul>
        <Link
          href={`/parfum/${reco.slug}`}
          className="
            text-caption text-gold-100 hover:text-paper-50
            transition-colors duration-micro ease-luxury
            inline-flex items-center gap-1
          "
        >
          Voir la création →
        </Link>
      </div>
    </GlassCard>
  )
}

export default function ChatModal({ open, onClose, productSlug = null }: ChatModalProps) {
  const [sessionId,  setSessionId]  = useState<string | null>(null)
  const [messages,   setMessages]   = useState<Message[]>([])
  const [chips,      setChips]      = useState<string[]>(['Commencer →'])
  const [step,       setStep]       = useState<Step>('init')
  const [typing,     setTyping]     = useState(false)
  const [selected,   setSelected]   = useState<string[]>([])
  const [error,      setError]      = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Init session on open
  useEffect(() => {
    if (!open || sessionId) return
    initSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function initSession() {
    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode:        productSlug ? 'CONTEXTUAL' : 'FULL',
          productSlug: productSlug ?? null,
        }),
      })
      const { sessionId: sid } = await res.json()
      setSessionId(sid)

      // Message d'accueil
      if (productSlug) {
        setMessages([{
          role:    'assistant',
          content: `Tu explores un parfum de la Maison. Dans quelle direction veux-tu affiner ?`,
          chips:   ['Plus frais', 'Plus doux', 'Plus puissant', 'Plus discret', 'Plus sombre'],
        }])
        setChips(['Plus frais', 'Plus doux', 'Plus puissant', 'Plus discret', 'Plus sombre'])
      } else {
        setMessages([{
          role:    'assistant',
          content: 'Bienvenue. Je suis le Conseiller Maison.\nJe vais te recommander une création en quelques questions.',
          chips:   ['Commencer →'],
        }])
        setChips(['Commencer →'])
      }
    } catch {
      setError('Impossible de démarrer la session.')
    }
  }

  const sendMessage = useCallback(async (message: string) => {
    if (!sessionId) return
    setError(null)
    setSelected([])

    // Ajouter le message user
    const userMsg: Message = { role: 'user', content: message }
    setMessages(prev => [...prev, userMsg])

    setTyping(true)
    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message, step }),
      })

      if (res.status === 429) {
        setError('Trop de requêtes. Attendez un moment.')
        setTyping(false)
        return
      }

      const data = await res.json()
      setTyping(false)

      const assistantMsg: Message = {
        role:    'assistant',
        content: data.assistantMessage,
        chips:   data.chips,
        recos:   data.recommendations?.length ? data.recommendations : undefined,
      }
      setMessages(prev => [...prev, assistantMsg])
      setChips(data.chips ?? [])
      setStep(data.step)
    } catch {
      setTyping(false)
      setError('Je n\'ai pas pu répondre. Réessayons.')
    }
  }, [sessionId, step])

  function handleChipClick(chip: string) {
    if (chip === 'Recommencer') {
      reset()
      return
    }

    // Multi-select sur notes_liked / notes_avoid
    if (step === 'notes_liked' || step === 'notes_avoid') {
      if (chip === 'Passer →') {
        sendMessage('Passer →')
        return
      }
      setSelected(prev =>
        prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
      )
      return
    }

    // Single-select pour les autres steps
    sendMessage(chip)
  }

  function handleConfirmMulti() {
    if (selected.length === 0) {
      sendMessage('Passer →')
    } else {
      sendMessage(selected.join(', '))
    }
  }

  function reset() {
    setSessionId(null)
    setMessages([])
    setChips(['Commencer →'])
    setStep('init')
    setSelected([])
    setError(null)
    setTyping(false)
    initSession()
  }

  if (!open) return null

  const isMultiStep = step === 'notes_liked' || step === 'notes_avoid'

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 bg-ink-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Conseiller Parfum"
        aria-modal="true"
        className="
          fixed bottom-0 right-0 z-50
          w-full sm:w-[420px]
          h-[90dvh] sm:h-[80dvh] sm:bottom-6 sm:right-6
          sm:rounded-modal
          flex flex-col overflow-hidden
          glass-med border border-stroke-18
          animate-slide-right
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stroke-12 shrink-0">
          <div>
            <p className="text-caption text-gold-100 uppercase tracking-widest">
              Conseiller Maison
            </p>
            <p className="text-ui text-paper-50/60 text-[12px]">
              Recommandation personnalisée
            </p>
          </div>
          <button
            type="button"
            aria-label="Fermer le conseiller"
            onClick={onClose}
            className="
              w-8 h-8 flex items-center justify-center rounded-full
              text-paper-50/40 hover:text-paper-50 hover:bg-glass-08
              transition-all duration-micro ease-luxury
            "
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                {/* Bubble */}
                <div
                  className={`
                    px-4 py-3 rounded-card text-ui leading-relaxed whitespace-pre-line
                    ${msg.role === 'user'
                      ? 'bg-gold-30 text-paper-50 border border-[rgba(214,181,109,0.3)] ml-auto'
                      : 'glass-soft text-paper-50/90'
                    }
                  `}
                >
                  {msg.content}
                </div>

                {/* Recommendations */}
                {msg.recos && msg.recos.length > 0 && (
                  <div className="w-full space-y-3 mt-1">
                    <DividerGoldHairline />
                    {msg.recos.map(reco => (
                      <RecoCard key={reco.slug} reco={reco} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}

          {error && (
            <div className="glass-soft border border-[rgba(255,90,106,0.3)] rounded-card px-4 py-3 text-caption text-danger">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Chips + confirm */}
        <div className="shrink-0 border-t border-stroke-12 px-4 pt-3 pb-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {chips.map(chip => (
              <Chip
                key={chip}
                size="sm"
                selected={selected.includes(chip)}
                onClick={() => handleChipClick(chip)}
                disabled={typing}
              >
                {chip}
              </Chip>
            ))}
          </div>

          {/* Confirm pour multi-select */}
          {isMultiStep && (
            <button
              type="button"
              onClick={handleConfirmMulti}
              disabled={typing}
              className="
                w-full py-2 rounded-btn text-ui text-gold-100 bg-glass-06
                border border-stroke-12 hover:bg-glass-10 hover:border-stroke-18
                transition-all duration-micro ease-luxury
                disabled:opacity-40
              "
            >
              {selected.length > 0
                ? `Confirmer (${selected.length} sélectionnée${selected.length > 1 ? 's' : ''})`
                : 'Passer →'
              }
            </button>
          )}

          {/* Privacy */}
          <p className="text-caption text-paper-50/20 text-center leading-tight">
            Tes réponses servent uniquement à te recommander une création.
          </p>
        </div>
      </div>
    </>
  )
}
