"use client";
import { useEffect, useMemo, useState } from "react";

export default function CheckoutResultPage() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "failed" | "error">("idle");
  const [message, setMessage] = useState("");

  const mtid = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("mtid") || "";
  }, []);

  useEffect(() => {
    if (!mtid) return;
    setStatus("pending");
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(`/api/payments/phonepe/status?merchantTransactionId=${encodeURIComponent(mtid)}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        const code = String(json?.code || "");
        if (code === "COMPLETED") {
          setStatus("success");
          setMessage("Payment confirmed. Your order has been placed.");
          return;
        }
        if (code === "PENDING" || code === "CREATED") {
          if (!cancelled) setTimeout(poll, 2000);
        } else {
          setStatus("failed");
          setMessage("Payment failed or cancelled. Please try again.");
        }
      } catch (e: any) {
        if (!cancelled) {
          setStatus("error");
          setMessage(e?.message || "Unexpected error");
        }
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [mtid]);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Result</h1>
      <div className="text-lg">
        {message || (status === "pending" ? "Processing payment…" : "")}
      </div>
    </div>
  );
}
