"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/products";
import { ProductSkeleton } from "./product-skeleton";
import GlareHover from './GlareHover'
import { useCart } from "@/context/cart-context"
import { useCallback, useState } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/language-context"
import { useIsMobile } from "@/hooks/use-mobile";

export function ProductSection({ title, products, isLoading }: { title:string; products: Product[]; isLoading?: boolean }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { t, lang } = useLanguage() as any;

  const handleAdd = useCallback((e: React.MouseEvent, p: Product, weightKg: 0.5 | 1 | 1.5 | 2) => {
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
    const isMobile = useIsMobile();
    const [weightKg, setWeightKg] = useState<0.5 | 1 | 1.5 | 2>(1);
    const cartItem = cart.find((item) => item.name === p.name && item.weightKg === weightKg);
    const displayName = (lang === 'ta' && p.name_ta) ? p.name_ta : p.name;
    const outOfStock = typeof p.inventory === 'number' && p.inventory <= 0;
    return (
      <GlareHover
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
          className="flex flex-col rounded-lg shadow-lg transition-shadow cursor-pointer overflow-hidden w-full"
        >
          <Link href={`/product/${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}`} className="block flex-1">
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
                  className="absolute inset-x-0 bottom-0 text-white text-center text-xs md:text-sm font-semibold py-1 md:py-2"
                  style={{ backgroundColor: '#d30c19' }}
                >
                  {t('badge.outOfStock', 'Out of Stock')}
                </div>
              )}
            </div>
            <div className="p-2 md:p-4">
              <p className="font-semibold text-sm md:text-base mb-1">{displayName}</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary font-semibold text-base md:text-lg">₹{(p.price * weightKg).toFixed(2)}</span>
              </div>
              {/* Weight selector: below price on mobile; inline on md+ */}
              <div className="flex items-center gap-1 flex-wrap">
                <button
                  className={`${isMobile ? 'px-1.5 py-0.5 text-[11px]' : 'px-3 py-1 text-sm'} rounded border ${weightKg === 0.5 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(0.5); }}
                >
                  500g
                </button>
                <button
                  className={`${isMobile ? 'px-1.5 py-0.5 text-[11px]' : 'px-3 py-1 text-sm'} rounded border ${weightKg === 1 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(1); }}
                >
                  1kg
                </button>
                <button
                  className={`${isMobile ? 'px-1.5 py-0.5 text-[11px]' : 'px-3 py-1 text-sm'} rounded border ${weightKg === 1.5 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(1.5); }}
                >
                  1.5kg
                </button>
                <button
                  className={`${isMobile ? 'px-1.5 py-0.5 text-[11px]' : 'px-3 py-1 text-sm'} rounded border ${weightKg === 2 ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/80'}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWeightKg(2); }}
                >
                  2kg
                </button>
              </div>
            </div>
          </Link>
          <div className="px-2 pb-2 pt-0">
            <div className="flex items-center gap-1 justify-center">
              {/* WhatsApp action as a button to avoid nested anchors inside Link */}
              <button
                type="button"
                title="WhatsApp"
                aria-label="WhatsApp"
                className="inline-flex items-center justify-center rounded-md border border-border h-9 w-9 text-foreground hover:text-primary hover:border-primary shrink-0"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open('https://chat.whatsapp.com/KDn1mXcSfANFnlD5G2tMDq?mode=ems_copy_t', '_blank', 'noopener,noreferrer'); }}
              >
                <Image src="/images/whatsapp.jpg" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
              </button>
              {cartItem ? (
                <div className="flex items-center justify-between rounded-md border border-primary text-primary h-9 md:w-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-full"
                    onClick={(e) => handleUpdateQuantity(e, p, weightKg, cartItem.quantity - 1)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{cartItem.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-full"
                    disabled={outOfStock || (typeof p.inventory === 'number' && cartItem.quantity >= p.inventory)}
                    onClick={(e) => handleUpdateQuantity(e, p, weightKg, cartItem.quantity + 1)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button className="h-9 bg-primary text-primary-foreground hover:opacity-90 md:w-auto" disabled={outOfStock} onClick={(e) => handleAdd(e, p, weightKg)}>
                  <span className="inline md:hidden">
                    {lang === 'ta' && isMobile ? t("product.addCartMobile", "Cart") : t("product.addToCart", "Add cart")}
                  </span>
                  <span className="hidden md:inline">{t("product.addToCart", "Add to cart")}</span>
                </Button>
              )}
            </div>
          </div>
        </GlareHover>
    );
  }

  return (
    <div className="product-section">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="hr-title text-xl md:text-2xl font-semibold">{title}</h2>
        <Link href="/shop" className="hidden md:inline-block">
          <Button variant="outline" size="sm">View all</Button>
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
          : products.map((p, index) => <ProductCard key={p.id ?? index} p={p} />)}
      </div>
    </div>
  );
}
