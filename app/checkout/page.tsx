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
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Your Items</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.name} className="flex items-center border rounded-lg p-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.name)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={clearCart} className="mt-6">Clear Cart</Button>
        </div>

        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹50.00</span> {/* Placeholder for shipping */}
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{(cartTotal + 50).toFixed(2)}</span>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">Proceed to Payment</Button>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Information</h2>
          <form className="space-y-4 border rounded-lg p-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <Input type="text" id="name" placeholder="John Doe" />
            </div>
            <div>
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
          </form>
        </div>
      </div>
    </div>
  );
}
