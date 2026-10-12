"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import type { WfCfg } from "@/lib/workflows";
import { Graph, hCurve, vCurve, type GEdge, type GLayout, type GNode, type NodeState } from "./Graph";

const H = 88;

function layoutFor(cfg: WfCfg, copy: Dict["workflows"]["items"][keyof Dict["workflows"]["items"]], ui: Dict["workflows"], vertical: boolean, lang: Locale, failed: boolean): GLayout {
  const n = cfg.nodes.length;
  const custom = cfg.positions?.[vertical ? "narrow" : "wide"];
  const W = vertical ? (cfg.positions ? 230 : 300) : 230;
  const fmt = (d: number) => (lang === "es" ? `${d.toFixed(1).replace(".", ",")} s` : `${d.toFixed(1)}s`);

  // Positions: hand-placed, or a snake layout (wide) / single column (narrow).
  const pos: Record<string, [number, number]> = {};
  if (custom) Object.assign(pos, custom);
  else {
    const cols = vertical ? 1 : n <= 3 ? n : n === 4 ? 2 : 3;
    cfg.nodes.forEach((node, i) => {
      const row = Math.floor(i / cols);
      const c = i % cols;
      const col = row % 2 === 0 ? c : cols - 1 - c;
      pos[node.id] = vertical ? [0, i * (H + 56)] : [col * (W + 70), row * (H + 50)];
    });
  }

  const nodes: GNode[] = cfg.nodes.map((node, idx) => {
    const c = copy.nodes[node.id];
    const [x, y] = pos[node.id];
    return {
      id: node.id,
      num: idx + 1,
      x,
      y,
      w: W,
      h: H,
      title: c.title,
      sub: c.tool,
      result: cfg.failAt === node.id && failed && copy.error ? copy.error : c.result,
      duration: node.dur ? fmt(node.dur) : undefined,
      badge: node.human ? ui.person : undefined,
      human: node.human,
    };
  });
  const byId = Object.fromEntries(nodes.map((nd) => [nd.id, nd]));

  const pairs: [string, string, number?, number?][] = cfg.edges ?? cfg.nodes.slice(1).map((nd, i) => [cfg.nodes[i].id, nd.id]);
  const edges: GEdge[] = pairs.map(([from, to, ff = 0.5, tf = 0.5]) => {
    const a = byId[from];
    const b = byId[to];
    let d: string;
    if (vertical) d = vCurve(a.x + W * ff, a.y + H, b.x + W * tf, b.y);
    else if (Math.abs(b.x - a.x) < W / 2) d = b.y > a.y ? vCurve(a.x + W / 2, a.y + H, b.x + W / 2, b.y) : vCurve(a.x + W / 2, a.y, b.x + W / 2, b.y + H);
    else if (b.x > a.x) d = hCurve(a.x + W, a.y + H / 2, b.x, b.y + H / 2);
    else d = hCurve(a.x, a.y + H / 2, b.x + W, b.y + H / 2);
    return { from, to, d };
  });

  const w = Math.max(...nodes.map((nd) => nd.x + nd.w));
  const h = Math.max(...nodes.map((nd) => nd.y + nd.h));
  return { w, h, nodes, edges };
}

type Props = {
  cfg: WfCfg;
  copy: Dict["workflows"]["items"][keyof Dict["workflows"]["items"]];
  ui: Dict["workflows"];
  lang: Locale;
  /** Hero player starts automatically on screen; dialog players too. */
  autoplay?: boolean;
};

export function Player({ cfg, copy, ui, lang, autoplay = true }: Props) {
  const n = cfg.nodes.length;
  const end = 2 * n;
  const [p, setP] = useState(0); // phase: odd = node (p-1)/2 running, even = node p/2-1 finished
  const [auto, setAuto] = useState(autoplay);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const loop = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const failIdx = cfg.failAt ? cfg.nodes.findIndex((x) => x.id === cfg.failAt) : -1;

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setAuto(false);
      setP(end);
    }
  }, [end]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-run: advance through the phases, hold at the end, then loop. Every third loop fails at cfg.failAt.
  useEffect(() => {
    if (!auto || !visible || reduced) return;
    const atEnd = p >= end || failed;
    const node = cfg.nodes[Math.min(Math.floor(p / 2), n - 1)];
    const delay = atEnd ? 3200 : p === 0 ? 500 : p % 2 === 1 ? Math.max(650, (node.dur ?? 1) * 650) : 450;
    const t = setTimeout(() => {
      setSelected(null);
      if (atEnd) {
        loop.current += 1;
        setFailed(false);
        setP(0);
        return;
      }
      const next = p + 1;
      if (next % 2 === 0 && failIdx === next / 2 - 1 && (loop.current + 1) % 3 === 0) setFailed(true);
      setP(next);
    }, delay);
    return () => clearTimeout(t);
  }, [auto, visible, reduced, p, failed, end, n, cfg.nodes, failIdx]);

  const states: Record<string, NodeState> = {};
  cfg.nodes.forEach((node, k) => {
    states[node.id] = p >= 2 * k + 2 ? (failed && k === failIdx ? "error" : "done") : p === 2 * k + 1 ? "active" : "idle";
  });

  const wide = useMemo(() => layoutFor(cfg, copy, ui, false, lang, failed), [cfg, copy, ui, lang, failed]);
  const narrow = useMemo(() => layoutFor(cfg, copy, ui, true, lang, failed), [cfg, copy, ui, lang, failed]);

  const current = selected ?? (p > 0 ? cfg.nodes[Math.floor((p - 1) / 2)].id : null);
  const cNode = current ? copy.nodes[current] : null;
  const cState = current ? states[current] : "idle";
  const finished = p >= end || failed;

  const next = () => {
    setAuto(false);
    setFailed(false);
    setSelected(null);
    setP(finished ? 0 : p % 2 === 1 ? p + 1 : p + 2);
  };
  const restart = () => {
    setFailed(false);
    setP(0);
    setSelected(null);
    setAuto(!reduced);
  };
  // Clicking a step pauses the run so the panel and the diagram agree.
  const pickNode = (id: string) => {
    setAuto(false);
    setSelected((c) => (c === id ? null : id));
  };
  const stepNo = Math.min(n, Math.ceil(p / 2));

  return (
    <div className="player" ref={ref}>
      <p className="player-intro">{ui.intro}</p>
      <p className="sample">
        <span className="label">{ui.sample}</span> {copy.sample}
      </p>
      <figure className="flow-figure">
        <Graph layout={wide} states={states} selected={selected} onSelect={pickNode} label={`${ui.caption}: ${copy.title}`} className="only-wide" />
        <Graph layout={narrow} states={states} selected={selected} onSelect={pickNode} label={`${ui.caption}: ${copy.title}`} className="only-narrow" />
        <figcaption>{ui.caption}</figcaption>
      </figure>

      <div className="controls">
        {!reduced && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => (finished ? restart() : setAuto((a) => !a))}>
            {auto && !finished ? ui.pause : finished ? ui.restart : ui.play}
          </button>
        )}
        <button type="button" className="btn btn-ghost btn-sm" onClick={next}>
          {finished ? ui.restart : ui.next}
        </button>
        <span className="muted step-count" aria-live="polite">
          {ui.stepOf.replace("{n}", String(stepNo)).replace("{total}", String(n))}
        </span>
      </div>

      <div className="flow-panel" aria-live={auto ? "off" : "polite"}>
        {cNode && current ? (
          <>
            <strong>{cNode.title}</strong>
            <dl>
              <dt>{ui.input}</dt>
              <dd>{cNode.input}</dd>
              <dt>{ui.output}</dt>
              <dd className={cState === "error" ? "err" : ""}>
                {cState === "error" ? copy.error : cState === "done" ? cNode.output : cState === "active" ? ui.pending : "—"}
              </dd>
            </dl>
          </>
        ) : (
          <span className="muted">{ui.hint}</span>
        )}
      </div>

      <p className="time">
        <span className="label">{ui.timeSaved}</span> {copy.timeSaved}
      </p>
    </div>
  );
}
