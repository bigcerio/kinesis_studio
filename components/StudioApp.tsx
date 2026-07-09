"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { hotspots2D } from "@/lib/muscleHotspots2D";
import { loadAnamnesi, type Sex } from "@/lib/anamnesi";
import SelectionPanel from "@/components/SelectionPanel";
import Tooltip2D from "@/components/Tooltip2D";
import BodyDiagram2D, { type HoverInfo2D } from "@/components/BodyDiagram2D";

export default function StudioApp() {
  const [sex, setSex] = useState<Sex>("F");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<HoverInfo2D | null>(null);

  useEffect(() => {
    const anamnesi = loadAnamnesi();
    if (anamnesi) setSex(anamnesi.sex);
  }, []);

  const meshById = useMemo(() => new Map(hotspots2D.map((h) => [h.id, h])), []);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const remove = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <div className="flex h-dvh w-full flex-col bg-stone-50 dark:bg-stone-950">
      <header className="flex items-center justify-between border-b border-stone-200 px-5 py-3 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <Link href="/anamnesi" className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
            ← Anamnesi
          </Link>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Kinesis Studio
            </h1>
            <p className="text-xs text-stone-400">Prototipo — mappa corporea interattiva</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-stone-200 p-1 dark:border-stone-800">
            {(["F", "M"] as Sex[]).map((s) => (
              <button
                key={s}
                onClick={() => setSex(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  sex === s
                    ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                {s === "F" ? "Donna" : "Uomo"}
              </button>
            ))}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            Esci
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div className="relative min-h-[45vh] flex-1 md:min-h-0">
          <BodyDiagram2D selected={selected} onToggle={toggle} onHover={setHover} />
        </div>
        <div className="h-[45vh] w-full shrink-0 md:h-auto md:w-[340px]">
          <SelectionPanel
            selectedIds={Array.from(selected)}
            meshById={meshById}
            onRemove={remove}
            onClear={() => setSelected(new Set())}
          />
        </div>
      </div>

      <Tooltip2D info={hover} />
    </div>
  );
}
