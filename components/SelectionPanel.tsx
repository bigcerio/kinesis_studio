"use client";

import { muscleGroups } from "@/lib/muscleGroups";
import type { MuscleMeshDef } from "@/lib/muscleMeshLayout";

interface Props {
  selectedIds: string[];
  meshById: Map<string, MuscleMeshDef>;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const sideLabel: Record<string, string> = { l: "sx", r: "dx", c: "" };

export default function SelectionPanel({ selectedIds, meshById, onRemove, onClear }: Props) {
  return (
    <aside className="flex h-full w-full flex-col border-l border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
        <h2 className="text-sm font-medium tracking-wide text-stone-900 dark:text-stone-100">
          Scheda in costruzione
        </h2>
        {selectedIds.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            svuota
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {selectedIds.length === 0 ? (
          <p className="mt-8 text-center text-sm leading-relaxed text-stone-400">
            Passa il mouse sul corpo per esplorare i distretti muscolari.
            <br />
            Clicca per aggiungerli alla scheda.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {selectedIds.map((id) => {
              const mesh = meshById.get(id);
              if (!mesh) return null;
              const group = muscleGroups[mesh.groupId];
              return (
                <li
                  key={id}
                  className="rounded-lg border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        {group.name}
                        {sideLabel[mesh.side] && (
                          <span className="ml-1 text-xs font-normal text-stone-400">
                            ({sideLabel[mesh.side]})
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                        {group.function}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(id)}
                      aria-label="Rimuovi"
                      className="shrink-0 rounded-full p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2 rounded-md border border-dashed border-stone-300 px-2 py-1.5 text-xs text-stone-400 dark:border-stone-700">
                    <span className="inline-block h-4 w-4 shrink-0 rounded-sm bg-stone-200 dark:bg-stone-700" />
                    <span>Esecuzione video — collegata in fase contenuti</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-800">
        <button
          disabled={selectedIds.length === 0}
          title="Disponibile quando colleghiamo anamnesi e database esercizi"
          className="w-full rounded-lg bg-stone-900 py-2.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 dark:bg-stone-100 dark:text-stone-900 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
        >
          Genera scheda PDF
        </button>
        <p className="mt-2 text-center text-[11px] text-stone-400">
          {selectedIds.length} distrett{selectedIds.length === 1 ? "o" : "i"} selezionat
          {selectedIds.length === 1 ? "o" : "i"}
        </p>
      </div>
    </aside>
  );
}
