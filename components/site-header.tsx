"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Home, Store, Info, Phone, Menu, Search } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu, CommandButton } from "@/components/command-menu"
import { CartDrawer } from "@/components/cart-drawer"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const { cartItemCount } = useCart();
  const [commandOpen, setCommandOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <header
      className="fixed top-0 z-40 w-full border-b border-white/20 backdrop-blur-md"
      style={{ background: 'linear-gradient(to right, #010907, #242e30)' }}
    >
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        {/* Mobile: search bar (166x36), theme, hamburger */}
        <div className="ml-auto flex items-center md:hidden gap-2">
          <button
            type="button"
            aria-label="Open search"
            onClick={() => setCommandOpen(true)}
            className="w-[166px] h-9 rounded-md border border-white/20 bg-white/10 px-3 text-left text-sm text-white/80 flex items-center gap-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <Search className="h-4 w-4 text-white/70" />
            <span className="truncate">Search</span>
          </button>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 max-w-[85vw] p-0 text-white bg-gradient-to-b from-[#0b1413] to-[#202a2b] border-l border-white/10"
            >
              <div className="px-3 pt-3 pb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img src="/images/tinty.png" alt="Tintu Cuts" className="h-6 w-6" />
                  <div className="flex flex-col leading-none">
                    <h3 className="text-base font-semibold text-white">Tintu Cuts</h3>
                    <p className="text-xs text-white/70">Menu</p>
                  </div>
                </div>
              </div>
              <nav className="pl-1 pr-2 py-2 grid gap-0.5">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  aria-label="Home"
                >
                  <Home className="h-5 w-5 text-white/80" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  aria-label="Shop"
                >
                  <Store className="h-5 w-5 text-white/80" />
                  <span>Shop</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  aria-label="About"
                >
                  <Info className="h-5 w-5 text-white/80" />
                  <span>About</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors"
                  aria-label="Contact"
                >
                  <Phone className="h-5 w-5 text-white/80" />
                  <span>Contact</span>
                </Link>
                <div className="my-2 h-px bg-white/10" />
                <Button
                  className="mx-1.5 mt-0.5 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm py-1.5"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  View Cart{cartItemCount > 0 ? ` (${cartItemCount})` : ''}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex gap-4 md:gap-5 lg:gap-6 mx-auto">
          <Link
            href="/"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link
            href="/shop"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Store className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Shop</span>
          </Link>
          <Link
            href="/about"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Info className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>About</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center text-sm md:text-sm lg:text-base font-semibold text-white"
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Contact</span>
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <CommandButton onClick={() => setCommandOpen(true)} />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
