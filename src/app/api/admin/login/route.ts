import { createAdminSessionToken, isAdminPasswordValid, jsonResponse, sessionCookie } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
      return jsonResponse({ error: "Admin access is not configured on this server." }, 503);
    }
    const body = (await request.json()) as { password?: string };
    if (!isAdminPasswordValid(body.password ?? "")) {
      return jsonResponse({ error: "Invalid password." }, 401);
    }

    return jsonResponse({ ok: true }, 200, { "Set-Cookie": sessionCookie(createAdminSessionToken()) });
  } catch {
    return jsonResponse({ error: "Unable to process login." }, 400);
  }
}
