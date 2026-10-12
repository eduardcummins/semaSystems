import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { bookHref, config } from "@/lib/config";
import { isLocale } from "@/lib/i18n";
import { BookLink } from "@/components/BookLink";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { engagement } from "@/content/engagement";
import { Header } from "@/components/Header";
import { Proof } from "@/components/Proof";
import { Player } from "@/components/Player";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];
  const book = bookHref(lang);
  const priced = engagement.pilotPrice && engagement.retainer;
  const cta = (location: string) => (
    <div className="wrap">
      <div className="cta-band">
        <p>{d.cta.line}</p>
        <BookLink href={book} location={location}>
          {d.hero.primary}
        </BookLink>
      </div>
    </div>
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Sema Systems",
      alternateName: "Innovation Partners Ltd",
      legalName: "Innovation Partners Ltd",
      url: config.siteUrl,
      sameAs: [config.linkedin],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "es" ? "Agentes de IA a medida para pequeñas empresas" : "Custom AI agents for small businesses",
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
      <Header lang={lang} nav={d.nav} book={book} />
      <main>
        <section className="hero wrap" id="top">
          <div className="hero-text">
            <h1>{d.hero.title}</h1>
            <p className="sub">{d.hero.sub}</p>
            <div className="btns">
              <BookLink href={book} location="hero">
                {d.hero.primary}
              </BookLink>
              <Link href={`/${lang}#contact`} className="link" data-cta="hero-secondary">
                {d.hero.secondary}
              </Link>
            </div>
          </div>
          <div className="hero-player">
            <Player ui={d.player} lang={lang} compact />
          </div>
        </section>

        <Proof lang={lang} />

        <section className="wrap section" id="outcomes">
          <div className="grid3">
            {d.outcomes.map((o) => (
              <div className="card" key={o.title}>
                <h2 className="h3">{o.title}</h2>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap section" id="how">
          <h2>{d.how.heading}</h2>
          <ol className="steps">
            {d.how.steps.map((st, i) => (
              <li key={st.title}>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
                {engagement.timeframes[i] && <span className="time">{engagement.timeframes[i]}</span>}
              </li>
            ))}
          </ol>
        </section>

        <section className="wrap section examples-player" id="examples">
          <h2>{d.examples.heading}</h2>
          <p className="lead">{d.examples.intro}</p>
          <Player ui={d.player} lang={lang} tabs detail />
        </section>

        {cta("after-examples")}

        <section className="wrap section safe" id="safe">
          <h2>{d.safe.heading}</h2>
          <div className="grid3">
            {d.safe.items.map((it) => (
              <div className="card" key={it.title}>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </section>

        {cta("after-safety")}

        <section className="wrap section" id="pricing">
          <div className="engage">
            <h2 className="sr-only">{d.engagement.heading}</h2>
            <p>{priced ? d.engagement.priced.replace("{pilot}", engagement.pilotPrice!).replace("{retainer}", engagement.retainer!) : d.engagement.fixed}</p>
          </div>
        </section>

        <section className="wrap section" id="faq">
          <h2>{d.faq.heading}</h2>
          <div className="faq">
            {d.faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="wrap section" id="contact">
          <div className="contact">
            <div>
              <h2>{d.contact.heading}</h2>
              <p className="lead">{d.contact.intro}</p>
            </div>
            <div>
              {config.bookingUrl && (
                <div className="book-first">
                  <BookLink href={config.bookingUrl} location="contact">
                    {d.hero.primary}
                  </BookLink>
                  <p className="muted">{d.contact.bookFirst}</p>
                  <p className="muted">{d.contact.orSend}</p>
                </div>
              )}
              <ContactForm d={d.contact} lang={lang} />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} d={d.footer} />
    </>
  );
}
