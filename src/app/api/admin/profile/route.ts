import { defaultProfile, type EditableLink, type EditableProfile } from "@/content/profile";
import { getEditableProfile, saveEditableProfile } from "@/content/profile-store";
import { hasAdminSession, jsonResponse } from "@/lib/admin-session";

export const runtime = "nodejs";

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanUrl(value: unknown) {
  const url = cleanText(value, 500);
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : "";
  } catch {
    return "";
  }
}

function normalizeLinks(value: unknown): EditableLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, 12)
    .map((item) => {
      const link = item as Partial<EditableLink>;
      return { label: cleanText(link.label, 80), url: cleanUrl(link.url) };
    })
    .filter((link) => link.label && link.url);
}

function normalizeProfile(value: Partial<EditableProfile>): EditableProfile {
  return {
    ...defaultProfile,
    name: cleanText(value.name, 140) || defaultProfile.name,
    shortName: cleanText(value.shortName, 80) || defaultProfile.shortName,
    headline: cleanText(value.headline, 220) || defaultProfile.headline,
    intro: cleanText(value.intro, 1000) || defaultProfile.intro,
    location: cleanText(value.location, 100) || defaultProfile.location,
    email: cleanText(value.email, 180),
    phone: cleanText(value.phone, 60),
    linkedin: cleanUrl(value.linkedin),
    github: cleanUrl(value.github),
    otherLinks: normalizeLinks(value.otherLinks),
    cvPath: "/cv/ndibueze-cv.pdf",
    updatedAt: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  if (!hasAdminSession(request)) return jsonResponse({ error: "Unauthorized" }, 401);
  return jsonResponse(await getEditableProfile());
}

export async function PUT(request: Request) {
  if (!hasAdminSession(request)) return jsonResponse({ error: "Unauthorized" }, 401);
  try {
    const body = (await request.json()) as Partial<EditableProfile>;
    const profile = await saveEditableProfile(normalizeProfile(body));
    return jsonResponse(profile);
  } catch {
    return jsonResponse({ error: "Unable to save profile." }, 400);
  }
}
