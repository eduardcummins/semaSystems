import { ImageResponse } from "next/og";
import { dictionaries } from "@/content";
import { isLocale } from "@/lib/i18n";

export const alt = "Sema Systems: an agent shown as four steps, the last one waiting for a person to approve";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#f0b35a";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = dictionaries[isLocale(lang) ? lang : "en"];
  const steps = d.hero.visual.steps;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          fontFamily: "serif",
          background: "radial-gradient(circle at 78% 60%, #1c1c1c 0%, #050505 55%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,.55)", fontFamily: "sans-serif", marginBottom: 20 }}>Sema Systems</div>
          <div style={{ fontSize: 92, lineHeight: 1, letterSpacing: -2 }}>{d.hero.title}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontFamily: "sans-serif" }}>
          {steps.map((s, i) => {
            const human = i === steps.length - 1;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: 236,
                    height: 92,
                    padding: "0 20px",
                    borderRadius: 16,
                    fontSize: 22,
                    color: human ? ACCENT : "#fff",
                    background: human ? "rgba(240,179,90,.1)" : "#101010",
                    border: human ? `2px dashed ${ACCENT}` : "2px solid rgba(255,255,255,.18)",
                  }}
                >
                  {s}
                </div>
                {i < steps.length - 1 && <div style={{ display: "flex", width: 24, height: 2, background: "rgba(255,255,255,.3)" }} />}
              </div>
            );
          })}
        </div>
      </div>
    ),
    size,
  );
}
