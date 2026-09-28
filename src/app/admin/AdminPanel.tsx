"use client";

import { FormEvent, useEffect, useState } from "react";
import type { EditableProfile } from "@/content/profile";

type Mode = "loading" | "login" | "editor";

function linksToText(profile: EditableProfile) {
  return profile.otherLinks.map((link) => `${link.label} | ${link.url}`).join("\n");
}

function textToLinks(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...urlParts] = line.split("|");
      return { label: label.trim(), url: urlParts.join("|").trim() };
    })
    .filter((link) => link.label && link.url);
}

export default function AdminPanel() {
  const [mode, setMode] = useState<Mode>("loading");
  const [profile, setProfile] = useState<EditableProfile | null>(null);
  const [otherLinks, setOtherLinks] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadProfile() {
    const response = await fetch("/api/admin/profile", { cache: "no-store" });
    if (!response.ok) {
      setMode("login");
      return;
    }
    const nextProfile = (await response.json()) as EditableProfile;
    setProfile(nextProfile);
    setOtherLinks(linksToText(nextProfile));
    setMode("editor");
  }

  useEffect(() => {
    void loadProfile();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!response.ok) {
      setMessage("That password was not accepted.");
      return;
    }
    setPassword("");
    setMessage("");
    await loadProfile();
  }

  function updateField(field: keyof EditableProfile, value: string) {
    setProfile((current) => current ? { ...current, [field]: value } : current);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profile, otherLinks: textToLinks(otherLinks) }),
    });
    const result = await response.json();
    setBusy(false);
    if (!response.ok) {
      setMessage(result.error ?? "Unable to save changes.");
      return;
    }
    setProfile(result);
    setOtherLinks(linksToText(result));
    setMessage("Changes saved. Refresh the public site to see the update.");
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem("cv") as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) {
      setMessage("Choose a PDF before uploading.");
      return;
    }
    setBusy(true);
    setMessage("");
    const body = new FormData();
    body.append("cv", file);
    const response = await fetch("/api/admin/cv", { method: "POST", body });
    const result = await response.json();
    setBusy(false);
    setMessage(response.ok ? "CV uploaded. The public download link now points to the new file." : result.error ?? "Unable to upload the CV.");
    if (response.ok && input) input.value = "";
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setProfile(null);
    setMode("login");
    setMessage("Admin session locked.");
  }

  if (mode === "loading") {
    return <div className="admin-shell admin-loading">Loading admin access...</div>;
  }

  if (mode === "login") {
    return (
      <div className="admin-shell">
        <header className="admin-header"><a className="wordmark" href="/"><span className="wordmark-mark">NC</span><span>Ndibueze Chibuzor</span></a><a href="/">View public site <span aria-hidden="true">↗</span></a></header>
        <main className="admin-login-wrap">
          <section className="admin-login">
            <p className="eyebrow">Private area</p>
            <h1>Admin access</h1>
            <p>Update the details that appear across your public portfolio and replace the CV without editing the page layout.</p>
            <form onSubmit={handleLogin}>
              <label htmlFor="admin-password">Admin password</label>
              <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button className="admin-button admin-button-primary" type="submit" disabled={busy}>{busy ? "Checking..." : "Unlock admin"} <span aria-hidden="true">-&gt;</span></button>
            </form>
            {message && <p className="admin-message" role="alert">{message}</p>}
            <p className="admin-help">Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> in your local environment before signing in.</p>
          </section>
        </main>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="admin-shell">
      <header className="admin-header"><a className="wordmark" href="/"><span className="wordmark-mark">NC</span><span>Ndibueze Chibuzor</span></a><div className="admin-header-actions"><a href="/">View public site <span aria-hidden="true">↗</span></a><button className="admin-text-button" type="button" onClick={handleLogout}>Lock admin</button></div></header>
      <main className="admin-main">
        <div className="admin-intro"><div><p className="eyebrow">Content control room</p><h1>Keep the public profile current.</h1><p>Edit the details below and publish them to the public portfolio. The page structure stays intact while your contact details and CV can change over time.</p></div><div className="admin-status"><span className="status-dot" aria-hidden="true" />Authenticated</div></div>

        <form className="admin-card" onSubmit={handleSave}>
          <div className="admin-card-heading"><div><p className="eyebrow">01 / Profile</p><h2>Identity and introduction</h2></div><span className="admin-card-note">Public content</span></div>
          <div className="admin-form-grid">
            <label>Full name<input value={profile.name} onChange={(event) => updateField("name", event.target.value)} /></label>
            <label>Short name<input value={profile.shortName} onChange={(event) => updateField("shortName", event.target.value)} /></label>
            <label className="admin-full">Professional headline<input value={profile.headline} onChange={(event) => updateField("headline", event.target.value)} /></label>
            <label className="admin-full">Introduction<textarea rows={5} value={profile.intro} onChange={(event) => updateField("intro", event.target.value)} /></label>
            <label>Location<input value={profile.location} onChange={(event) => updateField("location", event.target.value)} /></label>
          </div>
          <div className="admin-form-footer"><span className="admin-help">Keep the introduction specific and evidence-led. It appears in the homepage hero.</span><button className="admin-button admin-button-primary" type="submit" disabled={busy}>{busy ? "Saving..." : "Save profile"} <span aria-hidden="true">-&gt;</span></button></div>
        </form>

        <form className="admin-card" onSubmit={handleSave}>
          <div className="admin-card-heading"><div><p className="eyebrow">02 / Contact</p><h2>How people reach you</h2></div><span className="admin-card-note">Public content</span></div>
          <div className="admin-form-grid">
            <label>Email address<input type="email" value={profile.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" /></label>
            <label>Phone number<input type="tel" value={profile.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+234 ..." /></label>
            <label>LinkedIn URL<input type="url" value={profile.linkedin} onChange={(event) => updateField("linkedin", event.target.value)} placeholder="https://www.linkedin.com/in/..." /></label>
            <label>GitHub URL<input type="url" value={profile.github} onChange={(event) => updateField("github", event.target.value)} placeholder="https://github.com/..." /></label>
            <label className="admin-full">Other links<textarea rows={5} value={otherLinks} onChange={(event) => setOtherLinks(event.target.value)} placeholder="Research profile | https://example.com/profile\nPortfolio | https://example.com" /></label>
          </div>
          <p className="admin-help">Add one link per line using <code>Label | URL</code>. Empty links stay hidden from the public site.</p>
          <div className="admin-form-footer"><span className="admin-help">Email and phone are shown as contact actions, not stored in the page markup.</span><button className="admin-button admin-button-primary" type="submit" disabled={busy}>{busy ? "Saving..." : "Save contact details"} <span aria-hidden="true">-&gt;</span></button></div>
        </form>

        <form className="admin-card admin-upload-card" onSubmit={handleUpload}>
          <div className="admin-card-heading"><div><p className="eyebrow">03 / CV</p><h2>Replace your downloadable CV</h2></div><span className="admin-card-note">PDF only · 10 MB max</span></div>
          <div className="admin-upload-row"><label className="admin-file-label" htmlFor="cv-upload"><span>Choose a PDF</span><input id="cv-upload" name="cv" type="file" accept="application/pdf,.pdf" /></label><button className="admin-button admin-button-primary" type="submit" disabled={busy}>{busy ? "Uploading..." : "Upload CV"} <span aria-hidden="true">↑</span></button></div>
          <p className="admin-help">The public buttons always use <code>/cv/ndibueze-cv.pdf</code>, so uploading here replaces the file without changing the UI.</p>
        </form>

        <section className="admin-card admin-preview-card"><div className="admin-card-heading"><div><p className="eyebrow">04 / Current surface</p><h2>What visitors can use</h2></div><a href="/#contact">Open contact section <span aria-hidden="true">↗</span></a></div><div className="admin-preview-grid"><div><span>Email</span><strong>{profile.email || "Not added yet"}</strong></div><div><span>Phone</span><strong>{profile.phone || "Not added yet"}</strong></div><div><span>LinkedIn</span><strong>{profile.linkedin ? "Connected" : "Not added yet"}</strong></div><div><span>GitHub</span><strong>{profile.github ? "Connected" : "Not added yet"}</strong></div></div></section>

        {message && <p className="admin-toast" role="status">{message}</p>}
      </main>
    </div>
  );
}
