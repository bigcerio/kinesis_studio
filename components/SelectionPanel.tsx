"use client";

import { useRouter } from "next/navigation";
import { muscleGroups } from "@/lib/muscleGroups";
import { saveSelection } from "@/lib/selection";
import { exercisesForGroup } from "@/lib/exercises";

interface SelectableRegion {
  id: string;
  groupId: string;
  side: string;
}

interface Props {
  selectedIds: string[];
  meshById: Map<string, SelectableRegion>;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const sideLabel: Record<string, string> = { sx: "sx", dx: "dx", c: "" };

export default function SelectionPanel({ selectedIds, meshById, onRemove, onClear }: Props) {
  const router = useRouter();

  const handleGenerate = () => {
    saveSelection(selectedIds);
    router.push("/scheda");
  };

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
              const exerciseCount = exercisesForGroup(mesh.groupId).length;
              return (
                <li
                  key={id}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-900"
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

                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-2 py-1.5 text-xs text-stone-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-400">
                    <span className="inline-block h-4 w-4 shrink-0 rounded-sm bg-emerald-100 dark:bg-emerald-900" />
                    <span>
                      {exerciseCount} esercizi{exerciseCount === 1 ? "o" : ""} con video di esecuzione
                    </span>
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
          onClick={handleGenerate}
          className="w-full rounded-2xl bg-emerald-600 py-2.5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 dark:bg-emerald-500 dark:text-emerald-950 dark:disabled:bg-stone-800 dark:disabled:text-stone-600"
        >
          Genera scheda
        </button>
        <p className="mt-2 text-center text-[11px] text-stone-400">
          {selectedIds.length} distrett{selectedIds.length === 1 ? "o" : "i"} selezionat
          {selectedIds.length === 1 ? "o" : "i"}
        </p>
      </div>
    </aside>
  );
}
