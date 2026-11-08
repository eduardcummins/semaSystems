import { config } from "@/lib/config";

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

// Cloudflare Turnstile bot check. Skipped when TURNSTILE_SECRET_KEY is not set (e.g. locally).
async function passesBotCheck(token: unknown, req: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip && { remoteip: ip }) }),
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("[contact] Bot check failed:", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("[contact] Bot check could not be reached:", err);
    return false;
  }
}

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
  if (!(await passesBotCheck(body?.["cf-turnstile-response"], req))) return respond(false, 403);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email service configured. Locally, log the message so testing works. On the live site, report a failure
    // so the visitor is told to email instead of being thanked for a message nobody receives.
    console.log("[contact] RESEND_API_KEY not set:", { email, task });
    return process.env.VERCEL ? respond(false, 503) : respond(true);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sema Systems <website@semasys.xyz>",
      to: config.formTo,
      reply_to: email,
      subject: `Website enquiry from ${email}`,
      text: `Email: ${email}

What task eats their time:
${task || "(not given)"}`,
    }),
  });
  if (!res.ok) console.error("[contact] Resend refused the message:", res.status, await res.text());
  return respond(res.ok, res.ok ? 200 : 502);
}
