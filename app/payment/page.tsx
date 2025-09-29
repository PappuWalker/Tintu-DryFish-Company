"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfettiLayer from "@/components/confetti-layer";
import DateTimeStamp from "@/components/date-time-stamp";
import GoBackButton from "@/components/go-back-button";
import LangText from "@/components/lang-text";

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
            <p className="text-lg font-medium"><LangText en="Verifying payment status..." ta="கட்டண நிலையை சரிபார்க்கிறது..." /></p>
            <p className="text-sm text-muted-foreground"><LangText en="This usually takes just a moment" ta="இது பொதுவாக சில நொடிகள் மட்டுமே எடுக்கும்" /></p>
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
                <CardTitle className="text-3xl font-semibold">
                  <LangText en="Payment Complete" ta="கட்டணம் வெற்றிகரமாக முடிந்தது" />
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  <LangText
                    en={<span>Wonderful! Your payment was successful and your order is queued up. We'll have it dispatched within 24 hours, and <strong>you'll get a confirmation email shortly. Thanks for your patience!</strong></span>}
                    ta={<span>அற்புதம்! உங்கள் கட்டணம் வெற்றிகரமாக முடிந்தது மற்றும் உங்கள் ஆர்டர் தயாராக உள்ளது. இது 24 மணிநேரத்திற்குள் அனுப்பப்படும், மேலும் <strong>உறுதிப்படுத்தல் மின்னஞ்சல் விரைவில் கிடைக்கும். உங்கள் பொறுமைக்கு நன்றி!</strong></span>}
                  />
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-6">
              <div className="rounded-lg border bg-card/60 p-4 text-center">
                <p className="text-sm text-muted-foreground"><LangText en="Order status" ta="ஆர்டர் நிலை" /></p>
                <p className="mt-1 text-sm font-medium text-foreground"><LangText en="Queued for dispatch within 24 hours" ta="24 மணிநேரத்திற்குள் அனுப்ப தயாராக உள்ளது" /></p>
              </div>
              <p className="text-center text-xs text-muted-foreground"><LangText en="Updated " ta="புதுப்பிக்கப்பட்டது " /><DateTimeStamp />{fetchedAt ? "" : ""}</p>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/"><LangText en="Continue Shopping" ta="வாங்குவதைக் தொடரவும்" /></Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact"><LangText en="Need Help? Contact Us" ta="உதவி வேண்டுமா? எங்களை தொடர்பு கொள்ளவும்" /></Link>
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
              <CardTitle className="text-3xl font-semibold">
                {state === "invalid" ? (
                  <LangText en="Payment Missing" ta="கட்டண தகவல் இல்லை" />
                ) : (
                  <LangText en="Payment Failed" ta="கட்டணம் தோல்வியடைந்தது" />
                )}
              </CardTitle>
              <CardDescription className="text-sm">
                {state === "invalid" ? (
                  <LangText en="We couldn't find a transaction id (mtid)." ta="பரிவர்த்தனை ஐடி (mtid) கிடைக்கவில்லை." />
                ) : state === "error" ? (
                  <LangText en="We couldn't verify your payment at the moment." ta="தற்போது உங்கள் கட்டணத்தை சரிபார்க்க முடியவில்லை." />
                ) : (
                  <LangText en="We couldn't process your payment." ta="உங்கள் கட்டணத்தை செயலாக்க முடியவில்லை." />
                )}
              </CardDescription>
              <CardDescription className="mt-7 text-base leading-relaxed">
                {state === "invalid" ? (
                  <LangText en="Please return to checkout and try again. If the issue persists, contact us through the information given in the contact page." ta="தயவுசெய்து செக்அவுட்டிற்கு திரும்பி மீண்டும் முயற்சிக்கவும். பிரச்சனை தொடர்ந்தால், தொடர்பு பக்கத்தில் கொடுக்கப்பட்ட தகவல்களின் மூலம் எங்களை தொடர்பு கொள்ளுங்கள்." />
                ) : (
                  <LangText en="No worries - please try again! If the issue persists, contact us through the information given in the contact page." ta="கவலைப்பட வேண்டாம் — தயவு செய்து மீண்டும் முயற்சி செய்யுங்கள்! பிரச்சனை தொடர்ந்தால், தொடர்பு பக்கத்தில் கொடுக்கப்பட்ட தகவல்களின் மூலம் எங்களை தொடர்பு கொள்ளுங்கள்." />
                )}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 py-2"></CardContent>

          <CardFooter className="flex flex-col items-stretch gap-3 sm:max-w-md sm:self-center">
            <Button asChild className="w-full">
              <Link href="/"><LangText en="Try Again" ta="மீண்டும் முயற்சிக்கவும்" /></Link>
            </Button>
            <div className="flex items-center justify-between gap-3">
              <GoBackButton><LangText en="Go Back" ta="பின்னுக்கு செல்லவும்" /></GoBackButton>
              <Button asChild variant="ghost">
                <Link href="/contact"><LangText en="Contact Support" ta="ஆதரவை தொடர்பு கொள்ளவும்" /></Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
