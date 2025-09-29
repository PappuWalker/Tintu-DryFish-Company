"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

export default function PaymentLoadingPage() {
  const [loading, setLoading] = useState(true);
  const mtid = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("mtid") || "";
  }, []);

  useEffect(() => {
    if (!mtid) {
      setLoading(false);
      return;
    }
    fetch(`/api/payments/phonepe/status?merchantTransactionId=${encodeURIComponent(mtid)}`, { cache: "no-store" })
      .then(async (res) => {
        const json: any = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        const code = String(json?.code || "").toUpperCase();
        const state = String(json?.data?.state || json?.state || "").toUpperCase();
        const isCompleted = code === "COMPLETED" || state === "COMPLETED";
        if (isCompleted) {
          window.location.href = `/payment-success?mtid=${encodeURIComponent(mtid)}`;
        } else {
          window.location.href = `/payment-failure?mtid=${encodeURIComponent(mtid)}`;
        }
      })
      .catch(() => {
        // On error, assume failed
        window.location.href = `/payment-failure?mtid=${encodeURIComponent(mtid)}`;
      })
      .finally(() => setLoading(false));
  }, [mtid]);

  if (loading) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900/40">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Verifying payment status...</p>
        </div>
      </main>
    );
  }

  return null; // Should have redirected
}
