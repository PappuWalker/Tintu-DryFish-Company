"use client";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfettiLayer from "@/components/confetti-layer";
import DateTimeStamp from "@/components/date-time-stamp";

export const metadata: Metadata = {
  title: "Payment Successful",
};

export default function PaymentSuccessPage() {
  // On landing, call status endpoint once to ensure server finalizes order & notifications
  const mtid = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("mtid") || "";
  }, []);

  useEffect(() => {
    if (!mtid) return;
    // Use our proxy to avoid CORS and keep headers consistent
    fetch(`/api/payments/phonepe/status?merchantTransactionId=${encodeURIComponent(mtid)}`, { cache: "no-store" })
      .then(() => void 0)
      .catch(() => void 0);
  }, [mtid]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900/40">
      <section className="relative mx-auto max-w-2xl px-4 py-16 sm:py-24">
        {/* backdrop glow + confetti */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),transparent_60%)]" />
        <ConfettiLayer />

        <Card className="relative overflow-hidden border-0 bg-background/80 shadow-2xl ring-1 ring-border/60 backdrop-blur">
          <CardHeader className="!block">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="mb-2 grid place-items-center">
                <div className="grid size-20 place-items-center rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-lg">
                  <CheckCircle2 className="size-10" aria-hidden="true" />
                </div>
              </div>
              <CardTitle className="text-3xl font-semibold">Payment Complete</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Wonderful! Your payment was successful and your order is queued up. We'll have it dispatched within 24 hours, and <strong>you'll get a confirmation email shortly. Thanks for your patience!</strong>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 py-6">
            <div className="rounded-lg border bg-card/60 p-4 text-center">
              <p className="text-sm text-muted-foreground">Order status</p>
              <p className="mt-1 text-sm font-medium text-foreground">Queued for dispatch within 24 hours</p>
            </div>
            <p className="text-center text-xs text-muted-foreground">Updated <DateTimeStamp /></p>
          </CardContent>

          <CardFooter className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact">Need Help? Contact Us</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
