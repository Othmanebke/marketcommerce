'use client'

import { useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm:  'max-w-sm',
  md:  'max-w-lg',
  lg:  'max-w-2xl',
  xl:  'max-w-4xl',
}

export default function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect()
    if (!rect) return
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) {
      onClose()
    }
  }

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={`
        ${sizes[size]} w-full m-auto
        bg-ink-850 border border-stroke-12 rounded-modal
        backdrop:bg-[rgba(0,0,0,0.75)] backdrop:backdrop-blur-sm
        animate-fade-in
        open:flex open:flex-col
        p-0 overflow-hidden
      `}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-stroke-12">
          <h2 className="font-serif text-heading-sm text-paper-50">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="
              w-8 h-8 rounded-full flex items-center justify-center
              text-paper-50/50 hover:text-paper-50 hover:bg-glass-08
              transition-all duration-micro ease-luxury
            "
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
      {/* Body */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </dialog>
  )
}
