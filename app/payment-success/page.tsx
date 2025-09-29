import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfettiLayer from "@/components/confetti-layer";
import DateTimeStamp from "@/components/date-time-stamp";
import LangText from "@/components/lang-text";

export default async function PaymentSuccessPage({ searchParams }: { searchParams: { mtid?: string } }) {
  const mtid = searchParams?.mtid || "";
  if (!mtid) redirect("/payment-failure");

  // Server-side status check
  const base = process.env.ADMIN_BASE_URL || "https://admin.tintucuts.com";
  const res = await fetch(`${base}/api/payments/phonepe/status?merchantTransactionId=${encodeURIComponent(mtid)}`, { cache: "no-store" });
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) {
    redirect(`/payment-failure?mtid=${encodeURIComponent(mtid)}`);
  }
  const code = String(json?.code || "").toUpperCase();
  const state = String(json?.data?.state || json?.state || "").toUpperCase();
  const isCompleted = code === "COMPLETED" || state === "COMPLETED";
  if (!isCompleted) {
    redirect(`/payment-failure?mtid=${encodeURIComponent(mtid)}`);
  }

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
            <p className="text-center text-xs text-muted-foreground"><LangText en="Updated " ta="புதுப்பிக்கப்பட்டது " /><DateTimeStamp /></p>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/"><LangText en="Continue Shopping" ta="வாங்குவதைக் தொடரவும்" /></Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/contact">
                <LangText
                  en="Need Help? Contact Us"
                  ta={<span>உதவி வேண்டுமா?<br className="block" /> எங்களை தொடர்பு கொள்ளவும்</span>}
                />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
