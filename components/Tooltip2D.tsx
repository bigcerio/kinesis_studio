"use client";

import { muscleGroups } from "@/lib/muscleGroups";
import type { HoverInfo2D } from "@/components/BodyDiagram2D";

export default function Tooltip2D({ info }: { info: HoverInfo2D | null }) {
  if (!info) return null;
  const group = muscleGroups[info.groupId];
  if (!group) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 max-w-[220px] rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm"
      style={{ left: info.x + 14, top: info.y + 14 }}
    >
      <p className="text-sm font-medium text-slate-900">{group.name}</p>
      <p className="text-xs italic text-slate-500">{group.latin}</p>
      <p className="mt-1 text-xs text-slate-600">{group.function}</p>
    </div>
  );
}
