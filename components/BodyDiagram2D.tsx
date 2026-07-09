"use client";

import { useState } from "react";
import { hotspotsForView, type View2D } from "@/lib/muscleHotspots2D";
import { muscleGroups } from "@/lib/muscleGroups";

export interface HoverInfo2D {
  groupId: string;
  x: number;
  y: number;
}

interface Props {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onHover: (info: HoverInfo2D | null) => void;
}

function Hotspot({
  h,
  isSelected,
  onToggle,
  onHover,
}: {
  h: ReturnType<typeof hotspotsForView>[number];
  isSelected: boolean;
  onToggle: (id: string) => void;
  onHover: (info: HoverInfo2D | null) => void;
}) {
  const [hovering, setHovering] = useState(false);

  const fill = isSelected ? "#2a7dd4" : "#8f6a52";
  const opacity = isSelected ? 0.55 : hovering ? 0.4 : 0.001;

  return (
    <rect
      x={h.x}
      y={h.y}
      width={h.w}
      height={h.h}
      rx={Math.min(h.w, h.h) * 0.25}
      fill={fill}
      opacity={opacity}
      stroke={isSelected || hovering ? fill : "transparent"}
      strokeWidth={4}
      className="cursor-pointer transition-opacity"
      onMouseEnter={(e) => {
        setHovering(true);
        onHover({ groupId: h.groupId, x: e.clientX, y: e.clientY });
      }}
      onMouseMove={(e) => onHover({ groupId: h.groupId, x: e.clientX, y: e.clientY })}
      onMouseLeave={() => {
        setHovering(false);
        onHover(null);
      }}
      onClick={() => onToggle(h.id)}
    />
  );
}

export default function BodyDiagram2D({ selected, onToggle, onHover }: Props) {
  const [view, setView] = useState<View2D>("front");
  const hotspots = hotspotsForView(view);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 py-4">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 p-1">
        {(["front", "back"] as View2D[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              view === v
                ? "bg-blue-600 text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {v === "front" ? "Fronte" : "Retro"}
          </button>
        ))}
      </div>

      <div className="relative aspect-[5/7] h-full max-h-[75vh]">
        <img
          src={`/body/${view}.webp`}
          alt={view === "front" ? "Corpo umano, vista anteriore" : "Corpo umano, vista posteriore"}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          draggable={false}
        />
        <svg
          viewBox="0 0 1000 1400"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {hotspots.map((h) => (
            <Hotspot
              key={h.id}
              h={h}
              isSelected={selected.has(h.id)}
              onToggle={onToggle}
              onHover={onHover}
            />
          ))}
        </svg>
      </div>

      <a
        href="https://commons.wikimedia.org/wiki/File:Muscular_system.svg"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-slate-300 hover:text-slate-400"
      >
        Illustrazione: Termininja / Wikimedia Commons (CC BY-SA 3.0)
      </a>
    </div>
  );
}

export { muscleGroups };
