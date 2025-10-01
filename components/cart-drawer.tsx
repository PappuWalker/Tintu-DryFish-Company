"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { t, lang } = useLanguage() as any

  const formatWeight = (w: number) => (w === 0.5 ? "500 g" : `${w} kg`);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t("drawer.cart.title", "Your Cart")}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">
          {cart.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">{t("drawer.cart.empty", "Your cart is empty.")}</div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={`${item.name}-${item.weightKg}`} className="flex gap-3">
                  <img src={item.image || "/placeholder.svg?height=80&width=80"} alt={item.name} className="h-20 w-20 rounded object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium leading-tight">{(lang === 'ta' && item.name_ta) ? item.name_ta : item.name} <span className="text-xs text-muted-foreground">· {formatWeight(item.weightKg)}</span></h4>
                        <p className="text-sm text-muted-foreground">
                          {item.sale_price ? (
                            <>
                              <span className="line-through mr-1">₹{(item.price * item.weightKg).toFixed(2)}</span>
                              <span>₹{(item.sale_price * item.weightKg).toFixed(2)}</span>
                            </>
                          ) : (
                            <>₹{(item.price * item.weightKg).toFixed(2)}</>
                          )}
                          {" "}<span className="text-xs">per unit</span>
                        </p>
                      </div>
                      <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => removeFromCart(item.name, item.weightKg)}>{t("drawer.cart.remove", "Remove")}</button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button variant="outline" size="icon" aria-label="Decrease" onClick={() => updateQuantity(item.name, item.weightKg, item.quantity - 1)}>-</Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Increase"
                        disabled={typeof item.inventory === 'number' && item.quantity >= item.inventory}
                        onClick={() => updateQuantity(item.name, item.weightKg, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Separator className="my-4" />
        <SheetFooter>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{t("drawer.subtotal", "Subtotal")}</div>
            <div className="text-base font-semibold">₹{cartTotal.toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={clearCart} disabled={cart.length === 0}>{t("drawer.clear", "Clear")}</Button>
            <Link href="/checkout" className="flex-1" onClick={() => onOpenChange(false)}>
              <Button className="w-full" disabled={cart.length === 0}>{t("drawer.checkout", "Checkout")}</Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

