"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { workflows, type WfCfg, type WfId } from "@/lib/workflows";
import { Graph, hCurve, vCurve, type GEdge, type GLayout, type GNode, type NodeState } from "./Graph";

type UI = Dict["player"];
const H = 88;

function layoutFor(cfg: WfCfg, ui: UI, vertical: boolean, lang: Locale, compact: boolean): GLayout {
  const copy = ui.items[cfg.id];
  const W = vertical ? 300 : 215;
  const fmt = (d: number) => (lang === "es" ? `${d.toFixed(1).replace(".", ",")} s` : `${d.toFixed(1)}s`);
  const n = cfg.nodes.length;
  // Compact (hero column): two columns so text stays large; full width: up to three.
  const cols = vertical ? 1 : compact ? Math.min(2, n) : n <= 3 ? n : n === 4 ? 2 : 3;

  // Snake layout (wide) or a single column (narrow), so arrows always read in order.
  const nodes: GNode[] = cfg.nodes.map((node, i) => {
    const c = copy.nodes[node.id];
    const row = Math.floor(i / cols);
    const col = row % 2 === 0 ? i % cols : cols - 1 - (i % cols);
    return {
      id: node.id,
      num: i + 1,
      x: vertical ? 0 : col * (W + 30),
      y: vertical ? i * (H + 22) : row * (H + 40),
      w: W,
      h: H,
      title: c.title,
      sub: node.human ? ui.person : c.tool,
      result: c.result,
      duration: node.dur ? fmt(node.dur) : undefined,
      human: node.human,
    };
  });

  const edges: GEdge[] = nodes.slice(1).map((b, i) => {
    const a = nodes[i];
    let d: string;
    if (vertical || Math.abs(b.x - a.x) < W / 2) d = vCurve(a.x + W / 2, a.y + H, b.x + W / 2, b.y);
    else if (b.x > a.x) d = hCurve(a.x + W, a.y + H / 2, b.x, b.y + H / 2);
    else d = hCurve(a.x, a.y + H / 2, b.x + W, b.y + H / 2);
    return { from: a.id, to: b.id, d };
  });
  return { w: Math.max(...nodes.map((x) => x.x + x.w)), h: Math.max(...nodes.map((x) => x.y + x.h)), nodes, edges };
}

/** Counts the first number in `text` up from 0 once `play` is true (no motion when reduced). */
function CountUp({ text, play, reduced }: { text: string; play: boolean; reduced: boolean }) {
  const m = text.match(/\d+/);
  const target = m ? Number(m[0]) : 0;
  const [val, setVal] = useState(reduced || !m ? target : 0);
  useEffect(() => {
    if (!m || reduced || !play) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 700);
      setVal(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced, target, m]);
  if (!m) return <>{text}</>;
  const i = m.index ?? 0;
  return (
    <>
      {text.slice(0, i)}
      <span className="num">{val}</span>
      {text.slice(i + m[0].length)}
    </>
  );
}

/** One workflow playing through: phase p is odd while node (p-1)/2 runs, even once it has finished. */
function Run({ cfg, ui, lang, detail, reduced, compact }: { cfg: WfCfg; ui: UI; lang: Locale; detail: boolean; reduced: boolean; compact: boolean }) {
  const copy = ui.items[cfg.id];
  const n = cfg.nodes.length;
  const end = 2 * n;
  const [p, setP] = useState(reduced ? end : 0);
  const [auto, setAuto] = useState(!reduced);
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay while at least half on screen; hold 2s at the end, then loop.
  useEffect(() => {
    if (!auto || !visible || reduced) return;
    const atEnd = p >= end;
    const node = cfg.nodes[Math.min(Math.floor(p / 2), n - 1)];
    const delay = atEnd ? 2000 : p === 0 ? 500 : p % 2 === 1 ? Math.max(650, (node.dur ?? 1) * 650) : 450;
    const t = setTimeout(() => {
      setSelected(null);
      setP(atEnd ? 0 : p + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [auto, visible, reduced, p, end, n, cfg.nodes]);

  const states: Record<string, NodeState> = {};
  cfg.nodes.forEach((node, k) => {
    states[node.id] = p >= 2 * k + 2 ? "done" : p === 2 * k + 1 ? "active" : "idle";
  });

  const wide = useMemo(() => layoutFor(cfg, ui, false, lang, compact), [cfg, ui, lang, compact]);
  const narrow = useMemo(() => layoutFor(cfg, ui, true, lang, compact), [cfg, ui, lang, compact]);
  const finished = p >= end;
  const idx = p > 0 ? Math.floor((p - 1) / 2) : -1;
  const current = selected ?? (idx >= 0 ? cfg.nodes[idx].id : null);
  const cNode = current ? copy.nodes[current] : null;
  const cState = current ? states[current] : "idle";

  const next = () => {
    setAuto(false);
    setSelected(null);
    setP(finished ? 0 : p % 2 === 1 ? p + 1 : p + 2);
  };
  const toggle = () => {
    if (finished) {
      setP(0);
      setAuto(true);
      return;
    }
    track(auto ? "pause" : "play", { workflow: cfg.id });
    setAuto((a) => !a);
  };
  const restart = () => {
    setSelected(null);
    setP(0);
    setAuto(!reduced);
  };
  const pick = (id: string) => {
    setAuto(false);
    setSelected((c) => (c === id ? null : id));
  };

  const stepTitle = idx >= 0 ? copy.nodes[cfg.nodes[idx].id].title : "";
  const live = ui.stepNow.replace("{n}", String(Math.max(1, idx + 1))).replace("{total}", String(n)).replace("{title}", stepTitle);

  return (
    <div ref={ref}>
      <p className="sample">
        {ui.sample}: {copy.sample}
      </p>
      <figure className="flow-figure">
        <Graph layout={wide} states={states} selected={selected} onSelect={pick} label={copy.title} className="only-wide" />
        <Graph layout={narrow} states={states} selected={selected} onSelect={pick} label={copy.title} className="only-narrow" />
      </figure>

      <div className="controls">
        {!reduced && !finished && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={toggle}>
            {auto ? ui.pause : ui.play}
          </button>
        )}
        <button type="button" className="btn btn-ghost btn-sm" onClick={finished ? restart : next}>
          {finished ? ui.restart : ui.next}
        </button>
        <span className="step-live" aria-live="polite">
          {idx >= 0 ? live : ""}
        </span>
      </div>

      <div className="flow-panel">
        {cNode ? (
          <>
            <strong>{cNode.title}</strong>
            <dl>
              <dt>{ui.input}</dt>
              <dd>{cNode.input}</dd>
              <dt>{ui.output}</dt>
              <dd>{cState === "done" ? cNode.output : cState === "active" ? ui.pending : "—"}</dd>
            </dl>
          </>
        ) : (
          <span className="muted">{ui.hint}</span>
        )}
      </div>

      {detail && (
        <>
          <div className="compare-head">
            <span className="tag">{ui.illustrative}</span>
          </div>
          <dl className="compare">
            <div>
              <dt>{ui.before}</dt>
              <dd>
                <CountUp text={copy.before} play={seen} reduced={reduced} />
              </dd>
            </div>
            <div>
              <dt>{ui.after}</dt>
              <dd>{copy.after}</dd>
            </div>
            <div>
              <dt>{ui.tools}</dt>
              <dd>{cfg.tools.map((t) => (typeof t === "string" ? t : t[lang])).join(", ")}</dd>
            </div>
          </dl>
        </>
      )}
    </div>
  );
}

type Props = { ui: UI; lang: Locale; initial?: WfId; tabs?: boolean; detail?: boolean; compact?: boolean };

export function Player({ ui, lang, initial = "invoices", tabs = false, detail = false, compact = false }: Props) {
  const [id, setId] = useState<WfId>(initial);
  const [reduced, setReduced] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const cfg = workflows.find((w) => w.id === id)!;
  const select = (i: number) => {
    const next = workflows[i].id;
    if (next !== id) track("example_switch", { from: id, to: next });
    setId(next);
    tabRefs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const last = workflows.length - 1;
    const to = e.key === "ArrowRight" ? (i === last ? 0 : i + 1) : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (to === null) return;
    e.preventDefault();
    select(to);
  };

  return (
    <div className="player">
      {tabs && (
        <div className="tabs" role="tablist" aria-label={ui.label}>
          {workflows.map((w, i) => (
            <button
              key={w.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${w.id}`}
              aria-selected={w.id === id}
              aria-controls="player-panel"
              tabIndex={w.id === id ? 0 : -1}
              className="tab"
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {ui.items[w.id].tab}
            </button>
          ))}
        </div>
      )}
      <div id={tabs ? "player-panel" : undefined} role={tabs ? "tabpanel" : undefined} aria-labelledby={tabs ? `tab-${id}` : undefined}>
        <Run key={id + String(reduced)} cfg={cfg} ui={ui} lang={lang} detail={detail} reduced={reduced} compact={compact} />
      </div>
    </div>
  );
}
