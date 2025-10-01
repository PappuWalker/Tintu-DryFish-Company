import { NextResponse } from "next/server";
import { ADMIN_BASE_URL, ADMIN_API_KEY } from "@/lib/config";

export async function GET() {
  try {
    const upstream = await fetch(`${ADMIN_BASE_URL}/api/products`, {
      cache: "no-store",
      headers: {
        "Accept": "application/json",
        // If your upstream requires a key, add it here. Remove if not needed.
        ...(ADMIN_API_KEY ? { "x-api-key": ADMIN_API_KEY } : {}),
      },
    });

    const data = await upstream.json().catch(() => ({}));
    return new NextResponse(JSON.stringify(data), { status: upstream.status });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ ok: false, error: e?.message || "Products proxy failed" }),
      { status: 500 }
    );
  }
}
