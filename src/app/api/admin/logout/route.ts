import { clearSessionCookie, jsonResponse } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST() {
  return jsonResponse({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
