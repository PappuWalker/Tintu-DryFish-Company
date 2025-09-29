"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [ackDeliveryCharges, setAckDeliveryCharges] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Customer & shipping state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { t } = useLanguage();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("checkout.empty.title", "Your Cart is Empty")}</h1>
        <p className="text-lg text-muted-foreground mb-6">{t("checkout.empty.subtitle", "Looks like you haven't added anything to your cart yet.")}</p>
        <Link href="/shop">
          <Button className="bg-primary text-primary-foreground hover:opacity-90">{t("btn.startShopping", "Start Shopping")}</Button>
        </Link>
      </div>
    );
  }

  async function handleProceed() {
    setErrorMsg("");
    if (!ackDeliveryCharges) return;
    if (!fullName || !phone || !addressLine1 || !city || !pincode) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    if (cart.length === 0) return;
    try {
      setSubmitting(true);

      // Compute shipping: using 0 for now (delivery charges handled offline or free over threshold)
      // You can change this to a flat/tiered calculation if needed.
      const shippingPaise = cartTotal >= 5000 ? 0 : 0;

      // Build items payload: send productId and quantity
      const items = cart.map((it) => ({ productId: it.id, quantity: it.quantity }));

      // 1) Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: fullName, phone, email },
          shipping: { addressLine1, city, pincode },
          notes,
          items,
          charges: { shipping_paise: shippingPaise, discount_paise: 0, tax_paise: 0 },
        }),
      });
      const orderJson = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderJson?.error || "Create order failed");

      // 2) Initiate payment (PhonePe)
      const payRes = await fetch("/api/payments/phonepe/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderJson.orderId }),
      });
      const payJson = await payRes.json();
      if (!payRes.ok) throw new Error(payJson?.error || "Initiate payment failed");

      const redirectUrl: string | undefined = payJson?.providerResponse?.redirectUrl;
      if (!redirectUrl) throw new Error("No redirectUrl from provider");

      // TEMP: diagnostics for environment
      // eslint-disable-next-line no-console
      console.log("[PhonePe Initiate] response:", payJson);
      // eslint-disable-next-line no-console
      console.log("[PhonePe Initiate] redirectUrl:", redirectUrl);
      if (/mercury-uat|sandbox|uat/i.test(redirectUrl)) {
        alert("Payment redirect appears to point to UAT/sandbox (" + redirectUrl + ")");
      }

      // 3) Redirect to hosted checkout
      window.location.href = redirectUrl;
    } catch (e: any) {
      setErrorMsg(e?.message || "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{t("checkout.title", "Checkout")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left: Items + Shipping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{t("checkout.items", "Your Items")}</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.name}-${item.weightKg}`} className="flex items-center gap-4 border border-border rounded-xl p-3 md:p-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-semibold whitespace-normal">{item.name} <span className="text-xs text-muted-foreground">· {item.weightKg} kg</span></h3>
                    <p className="text-muted-foreground mb-2">₹{(item.price * item.weightKg).toFixed(2)} <span className="text-xs">per unit</span></p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.name, item.weightKg, item.quantity - 1)} aria-label="Decrease quantity">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-base md:text-lg font-semibold w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.name, item.weightKg, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.name, item.weightKg)} aria-label="Remove item">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button variant="outline" onClick={clearCart}>{t("checkout.clearCart", "Clear Cart")}</Button>
            </div>
          </div>

          {/* Shipping */}
          <div className="rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">{t("checkout.shipping", "Shipping Information")}</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">{t("form.fullName", "Full Name")}</label>
                <Input type="text" id="name" placeholder={t("form.placeholder.fullName", "John Doe")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground">{t("form.phone", "Phone")}</label>
                <Input type="tel" id="phone" placeholder={t("form.placeholder.phone", "9999999999")} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">{t("form.email", "Email")}</label>
                <Input type="email" id="email" placeholder={t("form.placeholder.email", "test@example.com")} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-foreground">{t("form.address", "Address")}</label>
                <Input type="text" id="address" placeholder={t("form.placeholder.address", "123 Main St")} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-foreground">{t("form.city", "City")}</label>
                <Input type="text" id="city" placeholder={t("form.placeholder.city", "Anytown")} value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-foreground">{t("form.zip", "Zip Code")}</label>
                <Input type="text" id="zip" placeholder={t("form.placeholder.zip", "600001")} value={pincode} onChange={(e) => setPincode(e.target.value)} />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-foreground">{t("form.notes", "Order Notes (optional)")}</label>
                <textarea id="notes" rows={3} className="mt-1 w-full rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground shadow-sm focus:border-primary focus:ring-primary p-2 text-sm" placeholder={t("form.placeholder.notes", "Any special instructions?")} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
            </form>
            {errorMsg && (
              <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-border bg-card/80 dark:bg-card/60 backdrop-blur p-4 md:p-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">{t("checkout.summary", "Order Summary")}</h2>
            <div className="divide-y">
              <div className="flex justify-between py-3">
                <span>{t("summary.subtotal", "Subtotal")}</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span>{t("summary.shipping", "Shipping")}</span>
                <span className="text-sm text-muted-foreground">
                  {cartTotal >= 5000 ? t("summary.freeDelivery", "Free delivery") : t("summary.calculatedAtDelivery", "Calculated at delivery")}
                </span>
              </div>
              <div className="flex justify-between py-3 font-bold text-lg">
                <span>{t("summary.total", "Total")}</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border p-3 bg-muted/40">
              <input
                id="delivery-ack"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                checked={ackDeliveryCharges}
                onChange={(e) => setAckDeliveryCharges(e.target.checked)}
              />
              <label htmlFor="delivery-ack" className="text-sm text-foreground leading-relaxed font-semibold">
                {t("checkout.deliveryAck", "Delivery charges apply to all orders and are calculated based on distance from our location. You'll pay these charges when your order is delivered. Spend ₹5,000 or more to get free delivery.")}
              </label>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground hover:opacity-90"
              disabled={!ackDeliveryCharges || submitting}
              onClick={handleProceed}
            >
              {submitting ? t("btn.processing", "Processing...") : t("btn.proceedToPayment", "Proceed to Payment")}
            </Button>
            <p className="text-xs text-muted-foreground">{t("checkout.termsNote", "By continuing, you agree to our Terms and Privacy Policy.")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
