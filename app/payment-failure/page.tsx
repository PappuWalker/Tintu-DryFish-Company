"use client";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/go-back-button";

export default function PaymentFailurePage() {
  // Validate status and bounce to success if payment actually completed
  const mtid = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("mtid") || "";
  }, []);

  useEffect(() => {
    if (!mtid) return;
    fetch(`/api/payments/phonepe/status?merchantTransactionId=${encodeURIComponent(mtid)}`, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json().catch(() => ({} as any));
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        const code = String(json?.code || "").toUpperCase();
        const state = String(json?.data?.state || json?.state || "").toUpperCase();
        const isCompleted = code === "COMPLETED" || state === "COMPLETED";
        if (isCompleted && typeof window !== "undefined") {
          window.location.href = `https://tintucuts.com/payment-success?mtid=${encodeURIComponent(mtid)}`;
        }
      })
      .catch(() => void 0);
  }, [mtid]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-red-50 to-red-100 dark:from-red-950 dark:to-red-900/40">
      <section className="relative mx-auto max-w-2xl px-4 py-16 sm:py-24">
        {/* intensified red backdrop glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.22),transparent_60%)]" />
        <Card className="overflow-hidden border-0 bg-background/80 shadow-2xl ring-1 ring-border/60 backdrop-blur">
          <CardHeader className="!block">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="mb-2 grid place-items-center">
                <div className="grid size-20 place-items-center rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white shadow-lg shadow-red-500/30">
                  <AlertCircle className="size-10" aria-hidden="true" />
                </div>
              </div>
              <CardTitle className="text-3xl font-semibold">Payment Failed</CardTitle>
              <CardDescription className="text-sm">We couldn't process your payment</CardDescription>
              <CardDescription className="mt-7 text-base leading-relaxed">
                Unfortunately, your payment was unsuccessful. No worries - please try again! If the issue persists, <strong>contact us through the information given in the contact page.</strong>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 py-2"></CardContent>

          <CardFooter className="flex flex-col items-stretch gap-3 sm:max-w-md sm:self-center">
            <Button asChild className="w-full">
              <Link href="/">Try Again</Link>
            </Button>
            <div className="flex items-center justify-between gap-3">
              <GoBackButton>Go Back</GoBackButton>
              <Button asChild variant="ghost">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
