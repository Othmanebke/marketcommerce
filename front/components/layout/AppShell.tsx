'use client'

import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'

export default function AppShell() {
  const [cartOpen, setCartOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const anyOpen = cartOpen || searchOpen

  // Global scroll lock
  useEffect(() => {
    document.body.style.overflow = anyOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [anyOpen])

  return (
    <>
      <Navbar
        onCartOpen={() => { setSearchOpen(false); setCartOpen(true) }}
        onSearchOpen={() => { setCartOpen(false); setSearchOpen(true) }}
      />
      <CartDrawer   open={cartOpen}   onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
