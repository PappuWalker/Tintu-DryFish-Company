"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfettiLayer from "@/components/confetti-layer";
import DateTimeStamp from "@/components/date-time-stamp";
import GoBackButton from "@/components/go-back-button";

type StatusState = "loading" | "success" | "failed" | "error" | "invalid";

export default function PaymentPage() {
  const [state, setState] = useState<StatusState>("loading");
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);

  const mtid = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("mtid") || "";
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!mtid) {
        setState("invalid");
        return;
      }
      try {
        setState("loading");
        const res = await fetch(`/api/payments/phonepe/status?merchantTransactionId=${encodeURIComponent(mtid)}`, {
          cache: "no-store",
        });
        const json: any = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        const code = String(json?.code || "").toUpperCase();
        const state = String(json?.data?.state || json?.state || "").toUpperCase();
        const isCompleted = code === "COMPLETED" || state === "COMPLETED";
        const isFailed = code === "FAILED" || state === "FAILED";
        if (cancelled) return;
        setFetchedAt(Date.now());
        if (isCompleted) setState("success");
        else if (isFailed) setState("failed");
        else setState("failed");
      } catch {
        if (!cancelled) setState("error");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [mtid]);

  if (state === "loading") {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900/40">
        <section className="relative mx-auto max-w-2xl px-4 py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.20),transparent_60%)]" />
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-b from-blue-400/20 to-blue-600/20 blur-2xl" />
              <div className="relative grid size-24 place-items-center rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-xl">
                <Loader2 className="h-12 w-12 animate-spin" />
              </div>
            </div>
            <p className="text-lg font-medium">Verifying payment status...</p>
            <p className="text-sm text-muted-foreground">This usually takes just a moment</p>
          </div>
        </section>
      </main>
    );
  }

  if (state === "success") {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900/40">
        <section className="relative mx-auto max-w-2xl px-4 py-16 sm:py-24">
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
              <p className="text-center text-xs text-muted-foreground">Updated <DateTimeStamp />{fetchedAt ? "" : ""}</p>
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

  // failed or error or invalid
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-red-50 to-red-100 dark:from-red-950 dark:to-red-900/40">
      <section className="relative mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.22),transparent_60%)]" />
        <Card className="overflow-hidden border-0 bg-background/80 shadow-2xl ring-1 ring-border/60 backdrop-blur">
          <CardHeader className="!block">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="mb-2 grid place-items-center">
                <div className="grid size-20 place-items-center rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white shadow-lg shadow-red-500/30">
                  <AlertCircle className="size-10" aria-hidden="true" />
                </div>
              </div>
              <CardTitle className="text-3xl font-semibold">Payment {state === "invalid" ? "Missing" : "Failed"}</CardTitle>
              <CardDescription className="text-sm">
                {state === "invalid" ? "We couldn't find a transaction id (mtid)." : state === "error" ? "We couldn't verify your payment at the moment." : "We couldn't process your payment."}
              </CardDescription>
              <CardDescription className="mt-7 text-base leading-relaxed">
                {state === "invalid"
                  ? "Please return to checkout and try again. If the issue persists, contact us through the information given in the contact page."
                  : "No worries - please try again! If the issue persists, contact us through the information given in the contact page."}
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
