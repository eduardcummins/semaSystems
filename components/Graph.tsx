import { useId, type KeyboardEvent } from "react";

export type NodeState = "idle" | "active" | "done" | "error";

export type GNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  result?: string;
  duration?: string;
  num?: number;
  human?: boolean;
};
export type GEdge = { from: string; to: string; d: string };
export type GLayout = { w: number; h: number; nodes: GNode[]; edges: GEdge[] };

// Smooth curve leaving horizontally / vertically.
export const hCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x1 + x2) / 2;
  return `M${x1} ${y1}C${m} ${y1} ${m} ${y2} ${x2} ${y2}`;
};
export const vCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (y1 + y2) / 2;
  return `M${x1} ${y1}C${x1} ${m} ${x2} ${m} ${x2} ${y2}`;
};

type Props = {
  layout: GLayout;
  states?: Record<string, NodeState>;
  selected?: string | null;
  onSelect?: (id: string) => void;
  label: string;
  className?: string;
};

export function Graph({ layout, states = {}, selected, onSelect, label, className }: Props) {
  const uid = useId().replace(/:/g, "");
  const st = (id: string): NodeState => states[id] ?? "idle";
  const key = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(id);
    }
  };
  return (
    <svg
      className={`graph ${className ?? ""}`}
      style={{ maxWidth: (layout.w + 4) * 1.25 }}
      viewBox={`-2 -2 ${layout.w + 4} ${layout.h + 4}`}
      role="group"
      aria-label={label}
    >
      <defs>
        <marker id={`${uid}-idle`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1.5L8 5L1 8.5" fill="none" stroke="var(--line-strong)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id={`${uid}-on`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1.5L8 5L1 8.5" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {layout.edges.map((e) => (
        <g key={e.from + e.to} className={states[e.from] === "done" ? "edge-on" : ""}>
          <path d={e.d} className="edge" markerEnd={`url(#${uid}-idle)`} />
          <path d={e.d} className="edge-fill" pathLength={1} markerEnd={`url(#${uid}-on)`} />
        </g>
      ))}
      {layout.nodes.map((n) => {
        const s = st(n.id);
        const interactive = !!onSelect;
        const showResult = (s === "done" || s === "error") && n.result;
        return (
          <g
            key={n.id}
            transform={`translate(${n.x} ${n.y})`}
            className={`node node-${s} ${n.human ? "node-human" : ""} ${selected === n.id ? "node-selected" : ""} ${interactive ? "node-click" : ""}`}
            {...(interactive
              ? {
                  role: "button",
                  tabIndex: 0,
                  "aria-pressed": selected === n.id,
                  "aria-label": `${n.title}. ${n.sub ?? ""}`,
                  onClick: () => onSelect?.(n.id),
                  onKeyDown: (e: KeyboardEvent) => key(e, n.id),
                }
              : {})}
          >
            {selected === n.id && <rect className="node-ring" x={-5} y={-5} width={n.w + 10} height={n.h + 10} rx={23} />}
            <rect className="node-box" width={n.w} height={n.h} rx={18} />
            {n.num !== undefined && (
              <g aria-hidden>
                <circle className="node-badge" cx={28} cy={23} r={11} />
                <text className="node-num" x={28} y={27} textAnchor="middle">
                  {n.num}
                </text>
              </g>
            )}
            <text className="node-title" x={n.num !== undefined ? 48 : 16} y={n.sub ? 28 : n.h / 2 + 5}>
              {n.title}
            </text>
            {n.sub && (
              <text className="node-sub" x={16} y={50}>
                {n.sub}
              </text>
            )}
            {n.result && (
              <text className="node-result" x={16} y={n.h - 14} style={{ opacity: showResult ? 1 : 0 }}>
                {n.result}
              </text>
            )}
            {n.human && (
              <g aria-hidden className="node-person-icon">
                <circle className="node-person" cx={n.w - 24} cy={20} r={4.5} />
                <path className="node-person" d={`M${n.w - 34} 36c0-6 4.5-9 10-9s10 3 10 9`} />
              </g>
            )}
            {n.duration && s === "done" && (
              <text className="node-dur" x={n.w - 14} y={26} textAnchor="end">
                {n.duration}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
