import Link from "next/link";
import { notFound } from "next/navigation";
import { dict } from "@/content";
import { workflow, workflowSlugs } from "@/content/workflows";
import { isLocale, locales } from "@/lib/i18n";

export const generateStaticParams = () =>
  locales.flatMap((lang) => workflowSlugs().map((slug) => ({ lang, slug })));

export default async function WorkflowPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const w = workflow(lang, slug);
  if (!w) notFound();
  const t = dict(lang).workflowPage;

  return (
    <main className="section narrow page">
      <Link href={`/${lang}#workflows`} className="muted">← {t.back}</Link>
      <span className="tag">{w.sector}</span>
      <h1>{w.title}</h1>
      {w.placeholder && <p className="notice">{t.placeholder}</p>}
      <h2>{t.problem}</h2>
      <p>{w.problem}</p>
      <div className="ba">
        <div><h3>{t.before}</h3><p>{w.before}</p></div>
        <div><h3>{t.after}</h3><p>{w.after}</p></div>
      </div>
      <h2>{t.steps}</h2>
      <ol className="list">{w.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
      <h2>{t.returns}</h2>
      <ul className="list">{w.returns.map((s, i) => <li key={i}>{s}</li>)}</ul>
      <h2>{t.saved}</h2>
      <p>{w.saved}</p>
      <p className="review">{t.review}</p>
      <Link className="btn" href={`/${lang}#contact`}>{t.cta}</Link>
    </main>
  );
}
