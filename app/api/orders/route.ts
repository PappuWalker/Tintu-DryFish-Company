import { NextResponse } from "next/server";
import { ADMIN_BASE_URL, ADMIN_API_KEY } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstream = await fetch(`${ADMIN_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Per provided cURL for orders
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      body: JSON.stringify(body),
      // Prevent Next from caching
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));
    return new NextResponse(JSON.stringify(data), { status: upstream.status });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ ok: false, error: e?.message || "Order proxy failed" }),
      { status: 500 }
    );
  }
}
