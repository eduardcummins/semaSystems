import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { dict } from "@/content";
import { workflows } from "@/content/workflows";
import { contactEmail, isLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict(lang);

  return (
    <main>
      <section className="hero">
        <h1>{t.hero.title}</h1>
        <p className="lead">{t.hero.sub}</p>
        <a className="btn" href="#contact">{t.hero.cta}</a>
      </section>

      <section id="workflows" className="section">
        <h2>{t.workflows.title}</h2>
        <p className="muted">{t.workflows.intro}</p>
        <div className="cards">
          {workflows(lang).map((w) => (
            <Link key={w.slug} href={`/${lang}/workflows/${w.slug}`} className="card">
              <span className="tag">{w.sector}{w.placeholder && ` · ${t.workflows.placeholder}`}</span>
              <h3>{w.title}</h3>
              <p>{w.summary}</p>
              <span className="more">{t.workflows.view} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="section">
        <h2>{t.how.title}</h2>
        <ol className="steps">
          {t.how.steps.map((s, i) => (
            <li key={i}><span className="num">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>
          ))}
        </ol>
      </section>

      <section id="about" className="section narrow">
        <h2>{t.about.title}</h2>
        {t.about.body.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section id="contact" className="section narrow">
        <h2>{t.contact.title}</h2>
        <p className="muted">{t.contact.intro}</p>
        <ContactForm t={t.contact} />
        <p className="muted">{t.contact.direct} <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {t.footer.rights}</span>
      </footer>
    </main>
  );
}
