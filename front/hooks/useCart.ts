'use client'

import { useState, useEffect, useCallback } from 'react'

export interface CartItem {
  variantId: string
  productSlug: string
  productName: string
  concentration: string
  volumeMl: number
  priceCents: number
  qty: number
  imageUrl: string
}

const STORAGE_KEY = 'maison_cart'

function readStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function writeStorage(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    setItems(readStorage())
    setHydrated(true)
  }, [])

  const persist = useCallback((next: CartItem[]) => {
    setItems(next)
    writeStorage(next)
  }, [])

  const addItem = useCallback(
    (item: Omit<CartItem, 'qty'>, qty = 1) => {
      setItems(prev => {
        const existing = prev.find(
          i => i.variantId === item.variantId
        )
        const next = existing
          ? prev.map(i =>
              i.variantId === item.variantId
                ? { ...i, qty: i.qty + qty }
                : i
            )
          : [...prev, { ...item, qty }]
        writeStorage(next)
        return next
      })
    },
    []
  )

  const removeItem = useCallback((variantId: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.variantId !== variantId)
      writeStorage(next)
      return next
    })
  }, [])

  const updateQty = useCallback((variantId: string, qty: number) => {
    if (qty <= 0) { removeItem(variantId); return }
    setItems(prev => {
      const next = prev.map(i =>
        i.variantId === variantId ? { ...i, qty } : i
      )
      writeStorage(next)
      return next
    })
  }, [removeItem])

  const clearCart = useCallback(() => persist([]), [persist])

  const totalCents = items.reduce((sum, i) => sum + i.priceCents * i.qty, 0)
  const totalQty   = items.reduce((sum, i) => sum + i.qty, 0)

  return { items, totalCents, totalQty, hydrated, addItem, removeItem, updateQty, clearCart }
}
