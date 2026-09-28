import { createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "ndibueze_admin_session";
const sessionLifetimeSeconds = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function signExpiry(expiry: string) {
  return createHmac("sha256", getSecret()).update(expiry).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminPasswordValid(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return Boolean(expected && candidate && safeEqual(candidate, expected));
}

export function createAdminSessionToken() {
  const expiry = String(Math.floor(Date.now() / 1000) + sessionLifetimeSeconds);
  return `${expiry}.${signExpiry(expiry)}`;
}

export function hasAdminSession(request: Request) {
  const secret = getSecret();
  if (!secret) return false;

  const cookies = request.headers.get("cookie") ?? "";
  const match = cookies.match(new RegExp(`(?:^|;\\s*)${adminCookieName}=([^;]+)`));
  if (!match) return false;

  try {
    const [expiry, signature] = decodeURIComponent(match[1]).split(".");
    if (!expiry || !signature || Number(expiry) < Math.floor(Date.now() / 1000)) return false;
    return safeEqual(signature, signExpiry(expiry));
  } catch {
    return false;
  }
}

export function sessionCookie(token: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${adminCookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionLifetimeSeconds}${secure}`;
}

export function clearSessionCookie() {
  return `${adminCookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}
