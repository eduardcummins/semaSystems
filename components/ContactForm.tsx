"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict } from "@/content";
import { track } from "@/lib/analytics";

export function ContactForm({ d, lang }: { d: Dict["contact"]; lang: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Submissions made without JavaScript come back here as ?sent=1 / ?error=1 (see /api/contact).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.has("sent")) setState("success");
    else if (q.has("error")) setState("error");
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      setState(res.ok ? "success" : "error");
      if (res.ok) {
        track("form_submit", { lang });
        form.reset();
      }
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={submit} method="post" action="/api/contact" className="form">
      <input type="hidden" name="lang" value={lang} />
      <label>
        {d.email}
        <input name="email" type="email" required autoComplete="email" maxLength={200} />
      </label>
      <label>
        <span>
          {d.task} <span className="opt">({d.optional})</span>
        </span>
        <textarea name="task" rows={4} maxLength={2000} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hp" />
      <p className="consent">
        {d.consentBefore}
        <Link href={`/${lang}/privacy`}>{d.consentLink}</Link>
        {d.consentAfter}
      </p>
      <div className="form-foot">
        <button className="btn" disabled={state === "sending"}>
          {state === "sending" ? d.sending : d.send}
        </button>
        <p role="status" className={state === "error" ? "err" : "ok"}>
          {state === "success" && d.success}
          {state === "error" && d.error}
        </p>
      </div>
    </form>
  );
}
