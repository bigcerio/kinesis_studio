"use client";

import { muscleGroups } from "@/lib/muscleGroups";
import type { HoverInfo2D } from "@/components/BodyDiagram2D";

export default function Tooltip2D({ info }: { info: HoverInfo2D | null }) {
  if (!info) return null;
  const group = muscleGroups[info.groupId];
  if (!group) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 max-w-[220px] rounded-2xl border border-stone-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm"
      style={{ left: info.x + 14, top: info.y + 14 }}
    >
      <p className="text-sm font-medium text-stone-900">{group.name}</p>
      <p className="text-xs italic text-stone-500">{group.latin}</p>
      <p className="mt-1 text-xs text-stone-600">{group.function}</p>
    </div>
  );
}
