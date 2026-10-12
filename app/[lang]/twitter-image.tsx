import { ImageResponse } from "next/og";
import { dictionaries } from "@/content";
import { isLocale } from "@/lib/i18n";

export const alt = "Sema Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = dictionaries[isLocale(lang) ? lang : "en"];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f6f4ef", color: "#111", fontFamily: "sans-serif" }}>
        <svg width="120" height="100" viewBox="180 135 825 680" fill="#111">
          <path d="M207 347C207 250 380 190 580 190C650 190 690 170 699 142L997 142C990 240 850 298 595 298C530 298 490 320 485 347Z" />
          <path d="M207 373L485 373C490 400 530 422 595 422C850 422 985 480 986 579L690 579C680 548 650 530 580 528C380 525 207 470 207 373Z" />
          <path d="M690 605L986 605C980 700 850 760 595 760C530 760 490 780 466 810L187 810C190 710 380 652 580 652C650 652 680 635 690 605Z" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{d.hero.title}</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#2b50e6" }}>Sema Systems</div>
        </div>
      </div>
    ),
    size,
  );
}
