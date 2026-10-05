export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const workflow = String(body?.workflow ?? "").trim().slice(0, 2000);
  if (body?.website) return Response.json({ ok: true }); // honeypot
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !workflow) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.log("[contact] (email not configured)", { name, email, workflow });
    return Response.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Sema Systems <onboarding@resend.dev>",
      to,
      reply_to: email,
      subject: `Call request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nWorkflow:\n${workflow}`,
    }),
  });
  return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
}
