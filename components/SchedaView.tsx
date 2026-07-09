"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { loadSelection } from "@/lib/selection";
import { loadAnamnesi, type AnamnesiData } from "@/lib/anamnesi";
import { hotspots2D } from "@/lib/muscleHotspots2D";
import { muscleGroups } from "@/lib/muscleGroups";
import { exercisesForGroup, buildRoutine, phaseLabel, type Exercise } from "@/lib/exercises";
import { LIABILITY_DISCLAIMER } from "@/lib/legal";

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

function ExerciseVideo({ exercise }: { exercise: Exercise }) {
  const [playing, setPlaying] = useState(false);

  if (exercise.videoSource === "custom" && exercise.videoId) {
    return <video src={exercise.videoId} controls className="aspect-video w-full bg-black print:hidden" />;
  }

  if (exercise.videoSource === "youtube" && exercise.videoId) {
    if (playing) {
      return (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${exercise.videoId}?autoplay=1`}
          title={exercise.name}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full print:hidden"
        />
      );
    }
    return (
      <button
        onClick={() => setPlaying(true)}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-stone-900 print:hidden"
      >
        <img
          src={`https://i.ytimg.com/vi/${exercise.videoId}/hqdefault.jpg`}
          alt={exercise.name}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow">▶</span>
      </button>
    );
  }

  return (
    <a
      href={exercise.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex aspect-video items-center justify-center bg-stone-100 print:hidden dark:bg-stone-800"
    >
      <span className="flex items-center gap-2 text-xs font-medium text-stone-500 transition-colors group-hover:text-stone-800 dark:group-hover:text-stone-200">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow dark:bg-stone-950">▶</span>
        Cerca l&apos;esecuzione
      </span>
    </a>
  );
}

export default function SchedaView({ trial }: { trial: boolean }) {
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [anamnesi, setAnamnesi] = useState<AnamnesiData | null>(null);

  useEffect(() => {
    const meshById = new Map(hotspots2D.map((h) => [h.id, h]));
    const selection = loadSelection();
    const groups = Array.from(
      new Set(selection.map((id) => meshById.get(id)?.groupId).filter((g): g is string => Boolean(g)))
    );
    setGroupIds(groups);
    setAnamnesi(loadAnamnesi());
  }, []);

  useEffect(() => {
    if (groupIds.length > 0) {
      fetch("/api/scheda/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupIds, trial }),
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trial, groupIds.length > 0]);

  const sections = useMemo(
    () =>
      groupIds
        .map((groupId) => ({ group: muscleGroups[groupId], exercises: exercisesForGroup(groupId) }))
        .filter((s) => s.group),
    [groupIds]
  );

  const routine = useMemo(() => buildRoutine(groupIds), [groupIds]);

  const hasContraindications =
    anamnesi && anamnesi.controindicazioni.filter((c) => c !== "Nessuna").length > 0;

  if (groupIds.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-stone-50 px-6 text-center dark:bg-stone-950">
        <p className="text-sm text-stone-500">Nessun distretto selezionato per la scheda.</p>
        <Link
          href="/corpo"
          className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white dark:bg-emerald-500 dark:text-emerald-950"
        >
          Torna alla mappa corporea
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-stone-50 dark:bg-stone-950">
      {trial && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-40 flex select-none items-center justify-center overflow-hidden print:fixed"
          style={{ mixBlendMode: "multiply" }}
        >
          <span className="rotate-[-28deg] whitespace-nowrap text-6xl font-bold text-stone-300/60 dark:text-stone-100/10 sm:text-8xl">
            ANTEPRIMA · KINESIS STUDIO
          </span>
        </div>
      )}

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
          className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
        >
          Esporta / Stampa PDF
        </button>
      </header>

      {trial && (
        <div className="mx-6 mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 print:hidden dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
          Questa è la tua generazione di prova gratuita (con watermark). Per schede illimitate senza
          watermark,{" "}
          <Link href="/abbonamento" className="font-medium underline">
            abbonati
          </Link>
          .
        </div>
      )}

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
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            <strong>Attenzione:</strong> in anamnesi risultano controindicazioni (
            {anamnesi!.controindicazioni.filter((c) => c !== "Nessuna").join(", ")}). Verificare ogni
            esercizio con il professionista prima dell&apos;esecuzione.
          </div>
        )}

        {routine.length > 0 && (
          <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Routine consigliata
            </h3>
            <p className="mt-0.5 text-xs text-stone-500">
              Sequenza suggerita: riscaldamento, lavoro principale, defaticamento.
            </p>
            <ol className="mt-4 flex flex-col gap-4">
              {routine.map(({ phase, exercises }, i) => (
                <li key={phase}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    {i + 1}. {phaseLabel[phase]}
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {exercises.map((ex) => (
                      <li
                        key={ex.id}
                        className="flex items-center justify-between gap-3 text-sm text-stone-700 dark:text-stone-300"
                      >
                        <span>{ex.name}</span>
                        <span className="shrink-0 text-xs text-stone-400">{ex.sets}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
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
                      className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
                    >
                      <ExerciseVideo exercise={ex} />
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
                        {ex.videoSource === "youtube" && ex.videoId && (
                          <div className="mt-1 flex items-center gap-2 border-t border-stone-100 pt-2 dark:border-stone-800">
                            <div className="shrink-0 rounded-md bg-white p-1">
                              <QRCode
                                value={`https://www.youtube.com/watch?v=${ex.videoId}`}
                                size={44}
                                style={{ height: "44px", width: "44px" }}
                              />
                            </div>
                            <p className="text-[10px] leading-tight text-stone-400">
                              Inquadra il QR per guardare
                              <br />
                              l&apos;esecuzione su YouTube
                            </p>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
            Avvertenza e limitazione di responsabilità
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
            {LIABILITY_DISCLAIMER}
          </p>
        </div>
      </main>
    </div>
  );
}
