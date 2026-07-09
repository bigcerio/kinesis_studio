"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSubscriptionControls({ userId }: { userId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [months, setMonths] = useState(6);

  const call = async (action: string, extra?: Record<string, unknown>) => {
    setPending(action);
    try {
      const res = await fetch("/api/admin/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action, ...extra }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Errore durante l'operazione.");
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        disabled={pending !== null}
        onClick={() => call("grant_lifetime")}
        className="rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending === "grant_lifetime" ? "..." : "Concedi lifetime"}
      </button>

      <div className="flex items-center gap-1 rounded-full border border-slate-200 px-1 py-1">
        <input
          type="number"
          min={1}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-12 rounded-full px-2 py-1 text-center text-xs text-slate-700 focus:outline-none"
        />
        <span className="pr-1 text-xs text-slate-400">mesi</span>
        <button
          disabled={pending !== null}
          onClick={() => call("grant_months", { months })}
          className="rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {pending === "grant_months" ? "..." : "Concedi"}
        </button>
      </div>

      <button
        disabled={pending !== null}
        onClick={() => call("revoke")}
        className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        {pending === "revoke" ? "..." : "Revoca abbonamento"}
      </button>
    </div>
  );
}
