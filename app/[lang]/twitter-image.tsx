import { ImageResponse } from "next/og";
import { dictionaries } from "@/content";
import { isLocale } from "@/lib/i18n";

export const alt = "Sema Systems: a workflow where a person checks the result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#2b50e6";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = dictionaries[isLocale(lang) ? lang : "en"];
  const items = d.player.items.invoices.nodes;
  const steps = ["email", "read", "extract", "sheet", "review"].map((id, i) => ({ n: i + 1, title: items[id].title, human: id === "review" }));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#f6f4ef", color: "#111", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#5a5a55", marginBottom: 16 }}>Sema Systems</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>{d.hero.title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 188, height: 112, padding: 16, borderRadius: 14, background: s.human ? "#e8edfe" : "#fff", border: `3px ${s.human ? "dashed" : "solid"} ${ACCENT}` }}>
                <div style={{ display: "flex", alignItems: "center", fontSize: 24, fontWeight: 700 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 15, background: ACCENT, color: "#fff", fontSize: 18, marginRight: 10 }}>{s.n}</div>
                  <div>{s.title.length > 12 ? s.title.split(" ")[0] : s.title}</div>
                </div>
                {s.human && <div style={{ fontSize: 20, fontWeight: 700, color: ACCENT, marginTop: 8 }}>{d.player.person}</div>}
              </div>
              {i < steps.length - 1 && <div style={{ display: "flex", width: 22, height: 3, background: ACCENT }} />}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
