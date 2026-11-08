"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Dict } from "@/content";

type State = "idle" | "sending" | "success" | "error";
const noop = () => () => {};

// Cloudflare Turnstile, the bot check. Off when no site key is set (e.g. locally), and the server only checks
// when its secret key is set, so the two keys go in together.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptLoad: Promise<void> | null = null;
function loadTurnstile() {
  scriptLoad ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptLoad = null;
      reject();
    };
    document.head.appendChild(s);
  });
  return scriptLoad;
}

export function ContactForm({ d, lang }: { d: Dict["contact"]; lang: string }) {
  // Submissions made without JavaScript come back here as ?sent=1 / ?error=1 (see /api/contact).
  const query = useSyncExternalStore(noop, () => window.location.search, () => "");
  const [submitted, setState] = useState<State | null>(null);
  const state: State = submitted ?? (/[?&]sent=/.test(query) ? "success" : /[?&]error=/.test(query) ? "error" : "idle");
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [checkShown, setCheckShown] = useState(false);

  useEffect(() => {
    if (!SITE_KEY) return;
    let gone = false;
    loadTurnstile()
      .then(() => {
        if (gone || !box.current || !window.turnstile) return;
        // Usually invisible: Cloudflare only shows a box when it wants the visitor to tick it.
        widget.current = window.turnstile.render(box.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          language: lang,
          appearance: "interaction-only",
          "before-interactive-callback": () => setCheckShown(true),
          "after-interactive-callback": () => setCheckShown(false),
        });
      })
      .catch(() => {});
    return () => {
      gone = true;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [lang]);

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
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
    // Each check passes once, so get a fresh one for any further message.
    if (widget.current) window.turnstile?.reset(widget.current);
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
      {SITE_KEY && <div ref={box} className={checkShown ? "captcha shown" : "captcha"} />}
      <p className="consent">
        {d.consentBefore}
        <Link href={`/${lang}/privacy`}>{d.consentLink}</Link>
        {d.consentAfter}
      </p>
      <div className="form-foot">
        <button className="pill" disabled={state === "sending"}>
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
