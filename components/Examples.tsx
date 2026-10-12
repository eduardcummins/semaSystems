"use client";

import { useRef, useState } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/i18n";
import { workflows, type WfId } from "@/lib/workflows";
import { Player } from "./Player";

export function Examples({ d, ui, lang }: { d: Dict["examples"]; ui: Dict["workflows"]; lang: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [openId, setOpenId] = useState<WfId | null>(null);
  const cfg = workflows.find((w) => w.id === openId);

  const open = (id: WfId) => {
    setOpenId(id);
    dialog.current?.showModal();
  };

  return (
    <>
      <div className="examples">
        {workflows.map((w) => {
          const c = ui.items[w.id];
          return (
            <article className="card" key={w.id}>
              <span className="tag">{ui.illustrative}</span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <p className="muted small">
                {w.nodes.length} {d.steps}
              </p>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => open(w.id)} aria-haspopup="dialog">
                {d.open}
                <span className="sr-only">: {c.title}</span>
              </button>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onClose={() => !dialog.current?.open && setOpenId(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close(); // backdrop click
        }}
      >
        {cfg && (
          <div className="modal-inner">
            <div className="modal-head">
              <div>
                <span className="tag">{ui.illustrative}</span>
                <h3 id="modal-title">{ui.items[cfg.id].title}</h3>
              </div>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => dialog.current?.close()}>
                {d.close}
              </button>
            </div>
            <Player key={cfg.id} cfg={cfg} copy={ui.items[cfg.id]} ui={ui} lang={lang} />
          </div>
        )}
      </dialog>
    </>
  );
}
