// Server-side site config. Read from env so nothing is hard-coded in components.
export const config = {
  // Shown on the site (footer, under the form, privacy policy). Set CONTACT_EMAIL to override.
  contactEmail: process.env.CONTACT_EMAIL || "hello@semasys.xyz",
  // Where contact-form messages are delivered. Straight to Gmail rather than via the hello@ forwarding, which made
  // Gmail file them as spam. Set CONTACT_FORM_TO to override.
  formTo: process.env.CONTACT_FORM_TO || "eduardcummins@gmail.com",
  // Public address for canonical links, the sitemap and the share image. On Vercel it defaults to the production domain.
  siteUrl: (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  linkedin: "https://www.linkedin.com/company/sema-sys/",
};
