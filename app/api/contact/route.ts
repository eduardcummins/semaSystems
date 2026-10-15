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
  const email = clean(body?.email, 200);
  const task = clean(body?.task, 2000);
  if (!/^\S+@\S+\.\S+$/.test(email)) return respond(false);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email service configured yet: log so nothing is lost while developing locally.
    console.log("[contact] RESEND_API_KEY not set, logging instead:", { email, task });
    return respond(true);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sema Systems <onboarding@resend.dev>",
      to: config.formTo,
      reply_to: email,
      subject: `Task to map from ${email}`,
      text: `Email: ${email}

What task eats their time:
${task || "(not given)"}`,
    }),
  });
  return respond(res.ok, res.ok ? 200 : 502);
}
