"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/shop">
          <Button className="bg-primary text-primary-foreground hover:opacity-90">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: Items + Shipping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="rounded-2xl border bg-white/60 backdrop-blur p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Your Items</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.name} className="flex items-center gap-4 border rounded-xl p-3 md:p-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-muted-foreground">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.name, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-base md:text-lg font-semibold w-6 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.name, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.name)} aria-label="Remove item">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-2xl border bg-white/60 backdrop-blur p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Shipping Information</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input type="text" id="name" placeholder="John Doe" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Input type="text" id="address" placeholder="123 Main St" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <Input type="text" id="city" placeholder="Anytown" />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <Input type="text" id="zip" placeholder="12345" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Order Notes (optional)</label>
                <textarea id="notes" rows={3} className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 text-sm" placeholder="Any special instructions?" />
              </div>
            </form>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-2xl border bg-white/70 backdrop-blur p-4 md:p-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">Order Summary</h2>
            <div className="divide-y">
              <div className="flex justify-between py-3">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Shipping</span>
                <span>₹50.00</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-lg">
                <span>Total</span>
                <span>₹{(cartTotal + 50).toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">Proceed to Payment</Button>
            <p className="text-xs text-muted-foreground">By continuing, you agree to our Terms and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
