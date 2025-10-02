"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products"
import GlareHover from './GlareHover'
import { useCart } from "@/context/cart-context"
import { useCallback, useState } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/context/language-context"

export function ProductSection({ title, products }: { title: string; products: Product[] }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { t, lang } = useLanguage() as any;

  const handleAdd = useCallback((e: React.MouseEvent, p: Product, weightKg: 0.5 | 1 | 1.5 | 2) => {
    e.preventDefault();
    e.stopPropagation();
    // Add 1 unit for the selected weight variant (unit here means one pack of selected kg)
    addToCart(p, 1, weightKg);
  }, [addToCart]);

  const handleUpdateQuantity = useCallback((e: React.MouseEvent, p: Product, weightKg: 0.5 | 1 | 1.5 | 2, quantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(p.name, weightKg, quantity);
  }, [updateQuantity]);

  function ProductCard({ p }: { p: Product }) {
    const [weightKg, setWeightKg] = useState<0.5 | 1 | 1.5 | 2>(1);
    const cartItem = cart.find((item) => item.name === p.name && item.weightKg === weightKg);
    const displayName = (lang === 'ta' && p.name_ta) ? p.name_ta : p.name;
    const outOfStock = typeof p.inventory === 'number' && p.inventory <= 0;
    return (
      <Link href={`/product/${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}`}>
        <GlareHover
          glareColor="#000000"
          glareOpacity={0.3}
          glareAngle={-30}
          glareSize={400}
          transitionDuration={600}
          playOnce={false}
          width="auto"
          height="auto"
          background="transparent"
          borderRadius="10px"
          borderColor="transparent"
          className="flex flex-col rounded-lg shadow-lg transition-shadow cursor-pointer overflow-hidden md:w-[300px] md:h-[450px] lg:w-auto lg:h-[528px] mx-auto"
        >
          <div className="p-0 relative">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src={p.image || "/placeholder.svg?height=400&width=400&query=product"}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* On-sale badge removed as sale flags/prices are no longer used */}
            {outOfStock && (
              <div
                className="absolute inset-x-0 bottom-0 text-white text-center text-sm font-semibold py-2"
                style={{ backgroundColor: '#d30c19' }}
              >
                {t('badge.outOfStock', 'Out of Stock')}
              </div>
            )}
          </div>
          <div className="p-4 flex-1">
            <h3 className="text-base font-semibold">{displayName}</h3>
            <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">₹{(p.price * weightKg).toFixed(2)}</span>
              </div>
              {/* Weight selector: below price on mobile; inline on md+ */}
              <div className="flex items-center gap-1">
                <button
                  className={`px-2 py-0.5 text-xs rounded border ${weightKg === 0.5 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(0.5); }}
                >
                  500 g
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded border ${weightKg === 1 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(1); }}
                >
                  1 kg
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded border ${weightKg === 1.5 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(1.5); }}
                >
                  1.5 kg
                </button>
                <button
                  className={`px-2 py-0.5 text-xs rounded border ${weightKg === 2 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(2); }}
                >
                  2 kg
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 pt-0 card-actions">
            {cartItem ? (
              <div className="flex items-center justify-between rounded-md border border-primary text-primary w-[90px] h-[35px]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleUpdateQuantity(e, p, weightKg, cartItem.quantity - 1)}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{cartItem.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={outOfStock || (typeof p.inventory === 'number' && cartItem.quantity >= p.inventory)}
                  onClick={(e) => handleUpdateQuantity(e, p, weightKg, cartItem.quantity + 1)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button className="w-full bg-primary text-primary-foreground hover:opacity-90" disabled={outOfStock} onClick={(e) => handleAdd(e, p, weightKg)}>
                {t("product.addToCart", "Add to Cart")}
              </Button>
            )}
          </div>
        </GlareHover>
      </Link>
    );
  }

  return (
    <div className="product-section">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-pretty mb-6">{title}</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p, index) => (
          <ProductCard key={index} p={p} />
        ))}
      </div>
    </div>
  );
}

