import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultProfile, type EditableProfile } from "./profile";

const profilePath = path.join(process.cwd(), "data", "profile.json");

export async function getEditableProfile(): Promise<EditableProfile> {
  try {
    const file = await readFile(profilePath, "utf8");
    const parsed = JSON.parse(file) as Partial<EditableProfile>;
    return {
      ...defaultProfile,
      ...parsed,
      otherLinks: Array.isArray(parsed.otherLinks) ? parsed.otherLinks : defaultProfile.otherLinks,
    };
  } catch {
    return defaultProfile;
  }
}

export async function saveEditableProfile(profile: EditableProfile): Promise<EditableProfile> {
  await mkdir(path.dirname(profilePath), { recursive: true });
  await writeFile(profilePath, `${JSON.stringify(profile, null, 2)}\n`, "utf8");
  return profile;
}
