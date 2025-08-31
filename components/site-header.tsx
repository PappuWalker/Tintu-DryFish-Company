"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search } from "lucide-react"
import { useCart } from "@/context/cart-context"

export function SiteHeader() {
  const { cartItemCount } = useCart();

  return (
    <header
      className="fixed top-0 z-40 w-full border-b border-white/20 backdrop-blur-md"
      style={{ background: 'linear-gradient(to right, #010907, #242e30)' }}
    >
      <div className="container flex h-16 items-center justify-between">
        <nav className="flex gap-6 mx-auto">
          <Link
            href="/"
            className="flex items-center text-lg font-semibold text-white sm:text-sm"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="flex items-center text-lg font-semibold text-white sm:text-sm"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="flex items-center text-lg font-semibold text-white sm:text-sm"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="flex items-center text-lg font-semibold text-white sm:text-sm"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="w-full max-w-sm flex items-center space-x-2">
            <Input type="search" placeholder="Search products..." className="h-9 bg-white/20 text-white placeholder-white/70 border-white/30" />
            <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30 text-white">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Link href="/checkout">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
