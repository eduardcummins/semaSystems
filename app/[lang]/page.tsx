import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { bookHref, config } from "@/lib/config";
import { isLocale } from "@/lib/i18n";
import { BookLink } from "@/components/BookLink";
import { ContactForm } from "@/components/ContactForm";
import { Examples } from "@/components/Examples";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { Intro } from "@/components/Intro";
import { IntroName } from "@/components/IntroName";
import { Plate } from "@/components/Plate";
import { StepObserver } from "@/components/StepObserver";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];
  const book = bookHref(lang);
  const faq = d.faq.items.filter((f): f is { q: string; a: string } => f.a !== null);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sema Systems",
      legalName: "Innovation Partners Ltd",
      url: config.siteUrl,
      email: config.contactEmail,
      sameAs: [config.linkedin],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "es" ? "Agentes de IA a medida" : "Bespoke AI agents",
      serviceType: lang === "es" ? "Automatización de flujos de trabajo con IA" : "AI workflow automation",
      description: d.hero.sub,
      inLanguage: lang,
      url: `${config.siteUrl}/${lang}`,
      provider: { "@type": "Organization", name: "Sema Systems", url: config.siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Intro />
      <Header lang={lang} nav={d.nav} book={book} />
      <main>
        <section className="hero wrap" id="top">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy">
            <div className="hero-title">
              <IntroName />
              <h1 className="display">
                {d.hero.title.split(" ").map((w, i) => (
                  <span key={i}>
                    {i > 0 && " "}
                    <span className="word" style={{ "--i": i } as React.CSSProperties}>
                      {w}
                    </span>
                  </span>
                ))}
              </h1>
            </div>
            <p className="hero-sub rise" style={{ "--d": 0 } as React.CSSProperties}>
              {d.hero.sub}
            </p>
            <p className="hero-audience rise" style={{ "--d": 1 } as React.CSSProperties}>
              {d.hero.audience}
            </p>
            <div className="hero-ctas rise" style={{ "--d": 2 } as React.CSSProperties}>
              <BookLink href={book} location="hero" className="pill">
                {d.hero.primary}
              </BookLink>
              <Link href={`/${lang}#contact`} className="text-link" data-cta="hero-secondary">
                {d.hero.secondary} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="hero-visual rise" style={{ "--d": 3 } as React.CSSProperties}>
            <HeroVisual v={d.hero.visual} />
          </div>
        </section>

        <section className="section wrap" id="how" data-active="0" aria-labelledby="how-title">
          <h2 className="display h2 center" id="how-title">
            {d.how.heading}
          </h2>
          <div className="how">
            <div className="how-plates" aria-hidden="true">
              {d.how.steps.map((_, i) => (
                <Plate key={i} n={i + 1} />
              ))}
            </div>
            <ol className="how-steps">
              {d.how.steps.map((s, i) => (
                <li key={s.title} className="how-step" data-step={i}>
                  <Plate n={i + 1} className="plate plate-sm" />
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {s.points && (
                      <ul className="points">
                        {s.points.map((p) => (
                          <li key={p.lead}>
                            <b>{p.lead}</b> {p.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <StepObserver />
        </section>

        <section className="section wrap" id="examples" aria-labelledby="examples-title">
          <div className="section-head">
            <div>
              <h2 className="display h2" id="examples-title">
                {d.examples.heading}
              </h2>
              <p className="lead">{d.examples.sub}</p>
            </div>
            <span className="tag">{d.examples.illustrative}</span>
          </div>
          <Examples d={d.examples} />
        </section>

        <section className="section wrap narrow" id="faq" aria-labelledby="faq-title">
          <h2 className="display h2" id="faq-title">
            {d.faq.heading}
          </h2>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q} name="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section wrap closing" id="contact" aria-labelledby="closing-title">
          <h2 className="display h2" id="closing-title">
            {d.closing.title}
          </h2>
          <p className="lead">{d.closing.sub}</p>
          <div className="closing-ctas">
            <BookLink href={config.bookingUrl ?? "#contact-form"} location="closing" className="pill">
              {d.hero.primary}
            </BookLink>
            <p className="closing-email">
              {d.closing.email}{" "}
              <a href={`mailto:${config.contactEmail}`} data-cta="closing-email">
                {config.contactEmail}
              </a>
            </p>
          </div>
          <div className="contact" id="contact-form">
            <h3>{d.contact.heading}</h3>
            <ContactForm d={d.contact} lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} d={d.footer} nav={d.nav} />
    </>
  );
}
