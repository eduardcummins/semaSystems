"use client";
import { useState } from "react";
import type { Dict } from "@/content/en";

export function ContactForm({ t }: { t: Dict["contact"] }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") return <p className="notice">{t.ok}</p>;
  return (
    <form onSubmit={submit} className="form">
      <label>{t.name}<input name="name" required autoComplete="name" /></label>
      <label>{t.email}<input name="email" type="email" required autoComplete="email" /></label>
      <label>{t.workflow}<textarea name="workflow" rows={3} required /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" disabled={state === "sending"}>{state === "sending" ? t.sending : t.send}</button>
      {state === "error" && <p className="notice error">{t.error}</p>}
    </form>
  );
}
