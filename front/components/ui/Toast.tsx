'use client'

import { useEffect, useState } from 'react'

type ToastType = 'success' | 'error' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
}

const icons: Record<ToastType, string> = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
}

const colors: Record<ToastType, string> = {
  success: 'border-l-[var(--success)] text-[var(--success)]',
  error:   'border-l-[var(--danger)]  text-[var(--danger)]',
  warning: 'border-l-[var(--warning)] text-[var(--warning)]',
}

export function Toast({ message, type = 'success', duration = 3500, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(t)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        flex items-center gap-3 px-4 py-3
        glass-med rounded-card border-l-2
        animate-fade-up
        ${colors[type]}
      `}
    >
      <span className="font-semibold text-lg leading-none">{icons[type]}</span>
      <span className="text-ui text-paper-50">{message}</span>
    </div>
  )
}

// ── Conteneur global Toast (à placer dans le layout) ──
interface ToastItem {
  id: string
  message: string
  type: ToastType
}

let addToastFn: ((message: string, type?: ToastType) => void) | null = null

export function addToast(message: string, type: ToastType = 'success') {
  addToastFn?.(message, type)
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    addToastFn = (message, type = 'success') => {
      const id = crypto.randomUUID()
      setToasts(prev => [...prev, { id, message, type }])
    }
    return () => { addToastFn = null }
  }, [])

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map(t => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
        />
      ))}
    </div>
  )
}
