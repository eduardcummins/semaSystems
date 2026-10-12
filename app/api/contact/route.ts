import { config } from "@/lib/config";

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  // JSON from the enhanced form, or a plain urlencoded POST when JavaScript is off.
  const isJson = (req.headers.get("content-type") ?? "").includes("application/json");
  const body: Record<string, unknown> | null = isJson
    ? await req.json().catch(() => null)
    : Object.fromEntries(await req.formData().catch(() => new FormData()));
  const lang = body?.lang === "es" ? "es" : "en";

  const respond = (ok: boolean, status = ok ? 200 : 400) =>
    isJson
      ? Response.json({ ok }, { status })
      : new Response(null, { status: 303, headers: { Location: `/${lang}?${ok ? "sent" : "error"}=1#contact` } });

  if (body?.website) return respond(true); // honeypot
  const name = clean(body?.name, 200);
  const company = clean(body?.company, 200);
  const email = clean(body?.email, 200);
  const task = clean(body?.task, 300);
  const message = clean(body?.message, 2000);
  if (!name || !company || !/^\S+@\S+\.\S+$/.test(email)) return respond(false);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email service configured yet: log so nothing is lost while developing locally.
    console.log("[contact] RESEND_API_KEY not set, logging instead:", { name, company, email, task, message });
    return respond(true);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sema Systems <onboarding@resend.dev>",
      to: config.contactEmail,
      reply_to: email,
      subject: `Call request from ${name} (${company})`,
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\nMost time-consuming task:\n${task || "(none)"}\n\nMessage:\n${message || "(none)"}`,
    }),
  });
  return respond(res.ok, res.ok ? 200 : 502);
}
