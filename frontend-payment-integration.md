# Frontend Guide: Creating Orders and Using the Payment API (PhonePe Standard Checkout)

This guide explains how the frontend should:
- Build a cart and compute pricing (including shipping) client-side
- Create an order via our API
- Initiate a PhonePe hosted checkout payment
- Handle the result and show status to the user

All amounts are stored and exchanged in paise (₹1 = 100 paise) on the server.

## Overview

1. Build the cart in the frontend and compute:
   - Subtotal (sum of line items)
   - Shipping (computed client-side; see examples below)
   - Discount (optional)
   - Tax (optional)
2. Create order: POST `/api/orders`
3. Initiate payment: POST `/api/payments/phonepe/initiate`
4. Redirect the user to the `providerResponse.redirectUrl`
5. After user completes/cancels, PhonePe redirects to `/checkout/result?mtid=...`
6. The result page polls `/api/payments/phonepe/status?merchantTransactionId=...` until it sees COMPLETED/FAILED

## Data Contracts

### Create Order
- Endpoint: `POST /api/orders`
- Auth: Admin API key in header `x-api-key: <ADMIN_API_KEY>` (test flows)
- Request body:
```jsonc
{
  "customer": { "name": "string", "phone": "string", "email": "string" },
  "shipping": {
    "line1": "string",
    "line2": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string"
  },
  "notes": "optional string",
  "items": [
    { "productId": "uuid", "quantity": 2 }
  ],
  "charges": {
    "shipping_paise": 5000,
    "discount_paise": 0,
    "tax_paise": 0
  }
}
```
- Response:
```json
{ "orderId": "uuid", "total_paise": 129900 }
```
- Server recomputes amounts based on product prices and persists order + items. It trusts the provided shipping/discount/tax values.

### Initiate Payment
- Endpoint: `POST /api/payments/phonepe/initiate`
- Auth: Admin API key in header `x-api-key: <ADMIN_API_KEY>` (test flows)
- Request body:
```json
{ "orderId": "uuid" }
```
- Response:
```json
{
  "merchantTransactionId": "pp_...",
  "providerResponse": {
    "redirectUrl": "https://mercury-uat.phonepe.com/transact/...",
    "state": "CREATED"
  }
}
```
- Frontend should open `providerResponse.redirectUrl` in a new tab/window or same tab depending on UX.

### Result Handling
- After checkout, PhonePe redirects back to our site at `/checkout/result?mtid=<merchantOrderId>`.
- The result page will poll the server:
  - `GET /api/payments/phonepe/status?merchantTransactionId=<mtid>`
  - Response example:
```json
{ "ok": true, "code": "COMPLETED", "data": { ... from PhonePe ... } }
```
- Codes of interest: `COMPLETED` (success), `PENDING` or `CREATED` (still processing), others treated as failed.

## Client-side Shipping Calculation Patterns

- Flat rate per order:
```ts
const shippingPaise = 5000 // ₹50
```
- Tiered by subtotal:
```ts
const subtotalPaise = items.reduce((sum, it) => sum + it.unitPaise * it.qty, 0)
const shippingPaise = subtotalPaise >= 99900 ? 0 : 9900
```
- Distance-based (example placeholder):
```ts
// Use a maps API client-side to estimate distance and multiply by a per-km rate
const distanceKm = await estimateDistanceKm(address)
const shippingPaise = Math.round(distanceKm * 500) // ₹5/km
```

Whatever method you use, place the resulting `shipping_paise` value in `charges` when creating the order.

## Frontend Example Flow (TypeScript)

```ts
async function createOrderAndPay(cart: CartItem[], customer: Customer, shipping: Address) {
  // 1) Compute subtotal + shipping
  const subtotalPaise = cart.reduce((sum, it) => sum + Math.round(it.price * 100) * it.qty, 0)
  const shippingPaise = computeShippingPaise(subtotalPaise, shipping)

  // 2) Create order
  const orderRes = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY! },
    body: JSON.stringify({
      customer: { name: customer.name, phone: customer.phone, email: customer.email },
      shipping,
      items: cart.map(it => ({ productId: it.id, quantity: it.qty })),
      charges: { shipping_paise: shippingPaise }
    })
  })
  const orderJson = await orderRes.json()
  if (!orderRes.ok) throw new Error(orderJson.error || 'Create order failed')

  // 3) Initiate payment
  const payRes = await fetch('/api/payments/phonepe/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY! },
    body: JSON.stringify({ orderId: orderJson.orderId })
  })
  const payJson = await payRes.json()
  if (!payRes.ok) throw new Error(payJson.error || 'Initiate payment failed')

  // 4) Redirect to hosted checkout
  const redirectUrl: string = payJson?.providerResponse?.redirectUrl
  if (!redirectUrl) throw new Error('No redirectUrl from provider')
  window.location.href = redirectUrl
}
```

## UX Considerations

- Always show the user a summary screen (items, shipping, total) before redirecting to the gateway.
- If the user navigates back from the gateway, send them to `/checkout/result?mtid=...` with a message that the payment is still processing or was cancelled.
- If you need to show live status, call `GET /api/payments/phonepe/status` every 2–5 seconds until the state becomes `COMPLETED` or a timeout is reached.

## Going Live

- Switch `PHONEPE_BASE_URL` to `https://api.phonepe.com` and use live OAuth credentials.
- Ensure `PUBLIC_BASE_URL` points to your production domain.
- Whitelist your redirect/cancel URLs in PhonePe if required.

---
If you need UI helpers or a ready-made hook for this flow, let me know and I’ll add one under `hooks/use-payment.ts`.
