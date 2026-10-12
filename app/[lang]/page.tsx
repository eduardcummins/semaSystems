import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionaries } from "@/content";
import { bookHref, config } from "@/lib/config";
import { isLocale } from "@/lib/i18n";
import { BookLink } from "@/components/BookLink";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Player } from "@/components/Player";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = dictionaries[lang];
  const book = bookHref(lang);

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

        <section className="wrap section examples-player" id="examples">
          <h2>{d.examples.heading}</h2>
          <p className="lead">{d.examples.intro}</p>
          <Player ui={d.player} lang={lang} tabs detail />
        </section>

        <section className="wrap section" id="faq">
          <h2>{d.faq.heading}</h2>
          <Faq items={d.faq.items} />
        </section>

        <section className="wrap section" id="contact">
          <div className="contact">
            <div>
              <h2>{d.contact.heading}</h2>
              <p className="lead">{d.contact.intro}</p>
            </div>
            <ContactForm d={d.contact} lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} d={d.footer} />
    </>
  );
}
