// Server-side site config. Read from env so nothing is hard-coded in components.
export const config = {
  // Shown on the site and receives contact-form requests. Set CONTACT_EMAIL to override.
  contactEmail: process.env.CONTACT_EMAIL || "eduardcummins@gmail.com",
  // Cal.com / Calendly link. When unset, "Book a call" falls back to the #contact form.
  bookingUrl: process.env.BOOKING_URL || null,
  siteUrl: (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  linkedin: "https://www.linkedin.com/company/sema-sys/",
};

export const bookHref = (lang: string) => config.bookingUrl ?? `/${lang}#contact`;
