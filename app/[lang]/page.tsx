import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { config } from "@/lib/config";
import { isLocale } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";
import { Examples } from "@/components/Examples";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroVisual } from "@/components/HeroVisual";
import { HowItWorks } from "@/components/HowItWorks";
import { Intro } from "@/components/Intro";
import { IntroName } from "@/components/IntroName";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];

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
      mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Intro />
      <Header lang={lang} nav={d.nav} />
      <main>
        <section className="hero wrap" id="top">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-brand rise" style={{ "--d": -4 } as React.CSSProperties}>
              Sema Systems
            </p>
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
              <a href={`/${lang}#contact`} className="pill">
                {d.nav.contact}
              </a>
            </div>
          </div>
          <div className="hero-visual rise" style={{ "--d": 3 } as React.CSSProperties}>
            <HeroVisual v={d.hero.visual} />
            <p className="hero-caption">{d.hero.visual.caption}</p>
          </div>
        </section>

        <HowItWorks d={d.how} />

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
            {d.faq.items.map((f) => (
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
          <div className="contact" id="contact-form">
            <ContactForm d={d.contact} lang={lang} />
          </div>
          <p className="closing-email">
            {d.closing.email}{" "}
            <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
          </p>
        </section>
      </main>
      <Footer lang={lang} d={d.footer} nav={d.nav} />
    </>
  );
}
