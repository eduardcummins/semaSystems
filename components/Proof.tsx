import { proof } from "@/content/proof";
import type { Locale } from "@/lib/i18n";

/** Logo/name row plus one outcome line. Renders nothing while there is no real data. */
export function Proof({ lang }: { lang: Locale }) {
  if (proof.clients.length === 0) return null;
  const quote = proof.outcome?.[lang];
  return (
    <section className="proof" aria-label={lang === "es" ? "Clientes" : "Clients"}>
      <div className="wrap">
        <ul>
          {proof.clients.slice(0, 5).map((c) => (
            <li key={c.name}>
              {c.logo ? <img src={c.logo} alt={c.name} height={28} /> : c.name}
            </li>
          ))}
        </ul>
        {quote && (
          <blockquote>
            <p>{quote}</p>
            {proof.attribution && <footer className="muted">{proof.attribution}</footer>}
          </blockquote>
        )}
      </div>
    </section>
  );
}
