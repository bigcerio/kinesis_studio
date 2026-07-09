"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadSelection } from "@/lib/selection";
import { loadAnamnesi, type AnamnesiData } from "@/lib/anamnesi";
import { buildMuscleMeshes } from "@/lib/muscleMeshLayout";
import { muscleGroups } from "@/lib/muscleGroups";
import { exercisesForGroup, type Exercise } from "@/lib/exercises";

const categoryLabel: Record<Exercise["category"], string> = {
  stretching: "Stretching",
  rinforzo: "Rinforzo",
  mobilita: "Mobilità",
  recupero: "Recupero funzionale",
};

const categoryColor: Record<Exercise["category"], string> = {
  stretching: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300",
  rinforzo: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  mobilita: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
  recupero: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
};

export default function SchedaPage() {
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [anamnesi, setAnamnesi] = useState<AnamnesiData | null>(null);

  useEffect(() => {
    const meshById = new Map(buildMuscleMeshes().map((m) => [m.id, m]));
    const selection = loadSelection();
    const groups = Array.from(
      new Set(selection.map((id) => meshById.get(id)?.groupId).filter((g): g is string => Boolean(g)))
    );
    setGroupIds(groups);
    setAnamnesi(loadAnamnesi());
  }, []);

  const sections = useMemo(
    () =>
      groupIds
        .map((groupId) => ({
          group: muscleGroups[groupId],
          exercises: exercisesForGroup(groupId),
        }))
        .filter((s) => s.group),
    [groupIds]
  );

  const hasContraindications =
    anamnesi && anamnesi.controindicazioni.filter((c) => c !== "Nessuna").length > 0;

  if (groupIds.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-stone-50 px-6 text-center dark:bg-stone-950">
        <p className="text-sm text-stone-500">Nessun distretto selezionato per la scheda.</p>
        <Link
          href="/corpo"
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
        >
          Torna alla mappa corporea
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-stone-50 dark:bg-stone-950">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 px-6 py-4 print:hidden dark:border-stone-800">
        <div>
          <Link href="/corpo" className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
            ← Mappa corporea
          </Link>
          <h1 className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Scheda personalizzata
          </h1>
        </div>
        <button
          onClick={() => window.print()}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          Esporta / Stampa PDF
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6 print:mb-4">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Kinesis Studio — Scheda esercizi
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            {sections.length} distrett{sections.length === 1 ? "o" : "i"} muscolar
            {sections.length === 1 ? "e" : "i"} · generata il {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>

        {hasContraindications && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <strong>Attenzione:</strong> in anamnesi risultano controindicazioni (
            {anamnesi!.controindicazioni.filter((c) => c !== "Nessuna").join(", ")}). Verificare ogni
            esercizio con il professionista prima dell&apos;esecuzione.
          </div>
        )}

        <div className="flex flex-col gap-8">
          {sections.map(({ group, exercises }) => (
            <section key={group.id}>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">{group.name}</h3>
              <p className="text-xs text-stone-500">{group.function}</p>

              {exercises.length === 0 ? (
                <p className="mt-2 text-sm text-stone-400">
                  Nessun esercizio ancora disponibile per questo distretto — in attesa di validazione clinica.
                </p>
              ) : (
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {exercises.map((ex) => (
                    <article
                      key={ex.id}
                      className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
                    >
                      <a
                        href={ex.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex aspect-video items-center justify-center bg-stone-100 print:hidden dark:bg-stone-800"
                      >
                        <span className="flex items-center gap-2 text-xs font-medium text-stone-500 transition-colors group-hover:text-stone-800 dark:group-hover:text-stone-200">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow dark:bg-stone-950">
                            ▶
                          </span>
                          Guarda l&apos;esecuzione
                        </span>
                      </a>
                      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{ex.name}</p>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColor[ex.category]}`}
                          >
                            {categoryLabel[ex.category]}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{ex.description}</p>
                        <p className="text-xs text-stone-600 dark:text-stone-300">
                          <span className="font-medium">Esecuzione: </span>
                          {ex.execution}
                        </p>
                        <p className="text-xs font-medium text-stone-700 dark:text-stone-200">{ex.sets}</p>
                        {ex.contraindications.length > 0 && (
                          <p className="text-[11px] text-red-600 dark:text-red-400">
                            Evitare se: {ex.contraindications.join(", ")}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] text-stone-400">
          Contenuto a scopo indicativo, validato dal professionista prima della consegna al paziente.
        </p>
      </main>
    </div>
  );
}
