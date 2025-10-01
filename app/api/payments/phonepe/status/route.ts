import { NextResponse } from "next/server";
import { ADMIN_BASE_URL } from "@/lib/config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const merchantTransactionId = searchParams.get("merchantTransactionId");
    const url = new URL(`${ADMIN_BASE_URL}/api/payments/phonepe/status`);
    if (merchantTransactionId) url.searchParams.set("merchantTransactionId", merchantTransactionId);

    const upstream = await fetch(url.toString(), { cache: "no-store" });
    const data = await upstream.json().catch(() => ({}));
    return new NextResponse(JSON.stringify(data), { status: upstream.status });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ ok: false, error: e?.message || "Payment status proxy failed" }),
      { status: 500 }
    );
  }
}
