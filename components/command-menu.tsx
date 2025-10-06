"use client"

import * as React from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { fetchProducts, Product } from "@/lib/products"

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onOpenChange])

  React.useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const go = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  React.useEffect(() => {
    if (open) {
      const list = document.querySelector('[cmdk-list]');
      if (list) {
        list.scrollTop = 0;
      }
    }
  }, [searchValue, open]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search products, categories, or pages..." 
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          {products.slice(0, 50).map((p) => {
            const slug = encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))
            return (
              <CommandItem
                key={p.id}
                value={`${p.name} ${p.category} ${p.id} ${slug}`.toLowerCase()}
                keywords={[p.category, p.id, slug]}
                onSelect={() => go(`/product/${slug}`)}
              >
                <div className="flex w-full items-center gap-3">
                  <img
                    src={p.image || "/placeholder.svg?height=64&width=64"}
                    alt={p.name}
                    className="h-12 w-12 rounded object-cover ring-1 ring-border"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground capitalize truncate">{p.category}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold">₹{p.price.toFixed(2)}</span>
                    <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 ring-1 ring-emerald-500/20">In stock</span>
                  </div>
                </div>
              </CommandItem>
            )
          })}
        </CommandGroup>
        <CommandGroup heading="Quick Links">
          <CommandItem onSelect={() => go("/")}>Home</CommandItem>
          <CommandItem onSelect={() => go("/shop")}>Shop</CommandItem>
          <CommandItem onSelect={() => go("/checkout")}>Checkout</CommandItem>
          <CommandItem onSelect={() => go("/about")}>About</CommandItem>
          <CommandItem onSelect={() => go("/contact")}>Contact</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Categories">
          <CommandItem onSelect={() => go("/category/dry-fish")}>Dry fish</CommandItem>
          <CommandItem onSelect={() => go("/category/fresh-cut")}>Fresh cut</CommandItem>
          <CommandItem onSelect={() => go("/category/frozen")}>Frozen</CommandItem>
          <CommandItem onSelect={() => go("/category/non-frozen")}>Non frozen</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function CommandButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden md:flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground hover:bg-background"
      aria-label="Search (Ctrl+K)"
    >
      <Search className="h-4 w-4" />
      <span>Search</span>
      <kbd className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">Ctrl K</kbd>
    </button>
  )
}
