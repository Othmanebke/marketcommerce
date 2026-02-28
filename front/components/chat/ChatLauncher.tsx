'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy-load ChatModal (évite d'alourdir le bundle initial)
const ChatModal = dynamic(() => import('./ChatModal'), { ssr: false })

interface ChatLauncherProps {
  productSlug?: string | null
  label?: string
}

export default function ChatLauncher({
  productSlug = null,
  label = 'Trouver mon parfum',
}: ChatLauncherProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label="Ouvrir le conseiller parfum"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-30
          flex items-center gap-3
          px-4 py-3 rounded-chip
          glass-med border border-stroke-18
          text-ui text-paper-50/80 hover:text-paper-50
          hover:shadow-[0_0_24px_rgba(214,181,109,0.2)]
          hover:border-[rgba(214,181,109,0.4)]
          transition-all duration-micro ease-luxury
          group
        "
      >
        <span className="w-5 h-5 text-gold-100 shrink-0" aria-hidden="true">
          <ChatBubbleIcon />
        </span>
        <span className="hidden sm:block">{label}</span>
      </button>

      {/* Modal */}
      {open && (
        <ChatModal
          open={open}
          onClose={() => setOpen(false)}
          productSlug={productSlug}
        />
      )}
    </>
  )
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M17.5 10c0 4.142-3.358 7.5-7.5 7.5a7.47 7.47 0 01-3.748-1L2.5 17.5l1-3.752A7.471 7.471 0 012.5 10c0-4.142 3.358-7.5 7.5-7.5S17.5 5.858 17.5 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
