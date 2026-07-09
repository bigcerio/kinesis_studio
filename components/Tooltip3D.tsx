"use client";

import { muscleGroups } from "@/lib/muscleGroups";
import type { HoverInfo } from "@/components/BodyScene3D";

export default function Tooltip3D({ info }: { info: HoverInfo | null }) {
  if (!info) return null;
  const group = muscleGroups[info.groupId];
  if (!group) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 max-w-[220px] rounded-2xl border border-stone-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm dark:border-stone-700 dark:bg-stone-900/95"
      style={{ left: info.x + 14, top: info.y + 14 }}
    >
      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{group.name}</p>
      <p className="text-xs italic text-stone-500 dark:text-stone-400">{group.latin}</p>
      <p className="mt-1 text-xs text-stone-600 dark:text-stone-300">{group.function}</p>
    </div>
  );
}
