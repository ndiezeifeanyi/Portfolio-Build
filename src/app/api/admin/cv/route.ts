import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getEditableProfile, saveEditableProfile } from "@/content/profile-store";
import { hasAdminSession, jsonResponse } from "@/lib/admin-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasAdminSession(request)) return jsonResponse({ error: "Unauthorized" }, 401);

  try {
    const formData = await request.formData();
    const file = formData.get("cv");
    if (!file || typeof file === "string" || typeof (file as File).arrayBuffer !== "function" || !(file as File).name.toLowerCase().endsWith(".pdf")) {
      return jsonResponse({ error: "Please upload a PDF file." }, 400);
    }
    const upload = file as File;
    if (upload.size > 10 * 1024 * 1024) {
      return jsonResponse({ error: "The CV must be 10 MB or smaller." }, 400);
    }

    const bytes = Buffer.from(await upload.arrayBuffer());
    if (Buffer.from(bytes.subarray(0, 5)).toString("ascii") !== "%PDF-") {
      return jsonResponse({ error: "The uploaded file does not appear to be a valid PDF." }, 400);
    }

    const directory = path.join(process.cwd(), "public", "cv");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "ndibueze-cv.pdf"), bytes);
    const profile = await getEditableProfile();
    await saveEditableProfile({ ...profile, cvPath: "/cv/ndibueze-cv.pdf", updatedAt: new Date().toISOString() });
    return jsonResponse({ ok: true, path: "/cv/ndibueze-cv.pdf" });
  } catch {
    return jsonResponse({ error: "Unable to upload the CV." }, 400);
  }
}
