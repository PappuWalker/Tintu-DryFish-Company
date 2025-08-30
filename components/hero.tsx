"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <header className="bg-card">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-pretty">Tintu Cuts</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-prose">
              Fresh, frozen, and expertly cut seafood delivered to your door. Discover premium fish, dry varieties, and
              ready-to-cook selections.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button className="bg-primary text-primary-foreground hover:opacity-90">Shop Now</Button>
              <a href="#categories">
                <Button variant="secondary" className="border border-border">
                  Explore Categories
                </Button>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img src="/fresh-fish-on-ice.png" alt="Fresh fish on ice" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/frozen-seafood-assortment.png"
                alt="Frozen seafood assortment"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
