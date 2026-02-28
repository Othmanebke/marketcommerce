'use client'

import { useState } from 'react'

interface AccordionItem {
  id: string
  label: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export default function Accordion({ items, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

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
              className="
                w-full flex items-center justify-between
                py-4 text-left
                text-ui text-paper-50/80 hover:text-paper-50
                transition-colors duration-micro ease-luxury
                focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,181,109,0.6)]
              "
            >
              <span className="font-medium">{item.label}</span>
              <span
                aria-hidden="true"
                className={`
                  text-gold-100 text-lg leading-none transition-transform duration-micro ease-luxury
                  ${isOpen ? 'rotate-45' : 'rotate-0'}
                `}
              >
                +
              </span>
            </button>
            <div
              id={`accordion-${item.id}`}
              role="region"
              hidden={!isOpen}
              className={`
                overflow-hidden transition-all duration-reveal ease-luxury
                ${isOpen ? 'pb-4' : ''}
              `}
            >
              <div className="text-ui text-paper-50/60 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
