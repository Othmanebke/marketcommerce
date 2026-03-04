'use client'

import { useState } from 'react'

interface AccordionItem {
  id: string
  label: string
  content: React.ReactNode
}

interface AccordionProps {
  items?: AccordionItem[]
  title?: string
  id?: string
  children?: React.ReactNode
  className?: string
}

export default function Accordion({ items, title, id, children, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  
  // Mode "Groupe" (plusieurs items)
  if (items) {
    return (
      <div className={`flex flex-col divide-y divide-stroke-12 ${className}`}>
        {items.map(item => {
          const isOpen = openId === item.id
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`accordion-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex justify-between items-center py-6 text-left hover:text-gold-100 transition-colors group"
              >
                <span className="font-serif text-lg text-paper-50 group-hover:text-gold-100 transition-colors">
                  {item.label}
                </span>
                <span className={`text-xl transition-transform duration-300 text-gold-100 ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div
                id={`accordion-${item.id}`}
                className={`
                  overflow-hidden transition-all duration-500 ease-luxury
                  ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}
                `}
              >
                <div className="text-paper-50/70 font-light leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Mode "Single" (un seul item, controlé par props ou état local simpliste)
  // Note: pour un vrai accordéon single isolé, on utilise un state local simple boolean.
  const [isOpenLocal, setIsOpenLocal] = useState(false)
  const toggle = () => setIsOpenLocal(!isOpenLocal)

  return (
    <div className={`border-b border-stroke-12 ${className}`}>
        <button
          type="button"
          aria-expanded={isOpenLocal}
          onClick={toggle}
          className="w-full flex justify-between items-center py-6 text-left hover:text-gold-100 transition-colors group"
        >
          <span className="font-serif text-lg text-paper-50 group-hover:text-gold-100 transition-colors">
            {title}
          </span>
          <span className={`text-xl transition-transform duration-300 text-gold-100 ${isOpenLocal ? 'rotate-45' : ''}`}>
            +
          </span>
        </button>
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-luxury
            ${isOpenLocal ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="text-paper-50/70 font-light leading-relaxed">
            {children}
          </div>
        </div>
    </div>
  )
}
