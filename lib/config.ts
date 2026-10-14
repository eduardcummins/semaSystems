// Server-side site config. Read from env so nothing is hard-coded in components.
export const config = {
  // Shown on the site and receives contact-form requests. Set CONTACT_EMAIL to override.
  contactEmail: process.env.CONTACT_EMAIL || "eduardcummins@gmail.com",
  // Public address for canonical links, the sitemap and the share image. On Vercel it defaults to the production domain.
  siteUrl: (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  linkedin: "https://www.linkedin.com/company/sema-sys/",
};
