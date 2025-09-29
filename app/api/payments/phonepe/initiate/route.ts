import { NextResponse } from "next/server";

const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || "https://admin.tintucuts.com";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "SuD0MeoW96F";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstream = await fetch(`${ADMIN_BASE_URL}/api/payments/phonepe/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Match provided cURL for initiate (prod): only x-api-key
        "x-api-key": ADMIN_API_KEY,
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));
    return new NextResponse(JSON.stringify(data), { status: upstream.status });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ ok: false, error: e?.message || "Payment initiate proxy failed" }),
      { status: 500 }
    );
  }
}
