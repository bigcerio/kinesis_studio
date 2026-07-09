"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const reasonMessage: Record<string, string> = {
  no_subscription: "Per continuare serve un abbonamento attivo.",
  trial_used: "Hai già usato la tua generazione di prova gratuita.",
  trial_expired: "La tua prova gratuita di 3 giorni è scaduta.",
};

const tiers = [
  {
    id: "monthly",
    label: "Mensile",
    price: "14,99 €",
    period: "/mese",
    note: null as string | null,
  },
  {
    id: "semiannual",
    label: "6 mesi",
    price: "79,99 €",
    period: "/6 mesi",
    note: "invece di 89,99 €",
    highlighted: true,
  },
  {
    id: "annual",
    label: "12 mesi",
    price: "149,99 €",
    period: "/12 mesi",
    note: "invece di 179,99 €",
  },
];

function AbbonamentoContent() {
  const params = useSearchParams();
  const { data: session } = useSession();
  const reason = params.get("motivo");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (tierId: string) => {
    if (!session) {
      signIn(undefined, { callbackUrl: "/abbonamento" });
      return;
    }
    setError(null);
    setLoadingTier(tierId);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: tierId }),
    });
    const body = await res.json().catch(() => ({}));
    setLoadingTier(null);
    if (!res.ok || !body.url) {
      setError(body.error ?? "Impossibile avviare il pagamento.");
      return;
    }
    window.location.href = body.url;
  };

  return (
    <div className="min-h-dvh bg-stone-50 px-6 py-12 dark:bg-stone-950">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Scegli il tuo abbonamento
        </h1>
        {reason && reasonMessage[reason] && (
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">{reasonMessage[reason]}</p>
        )}
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col rounded-2xl border p-6 text-left ${
                "highlighted" in tier && tier.highlighted
                  ? "border-emerald-500 bg-white shadow-md dark:border-emerald-500 dark:bg-stone-900"
                  : "border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
              }`}
            >
              <p className="text-sm font-medium text-stone-500">{tier.label}</p>
              <p className="mt-2 text-3xl font-semibold text-stone-900 dark:text-stone-100">
                {tier.price}
                <span className="text-sm font-normal text-stone-400">{tier.period}</span>
              </p>
              {tier.note && <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{tier.note}</p>}
              <button
                onClick={() => handleSubscribe(tier.id)}
                disabled={loadingTier === tier.id}
                className="mt-6 rounded-2xl bg-emerald-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-60 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
              >
                {loadingTier === tier.id ? "Attendere…" : "Abbonati"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AbbonamentoPage() {
  return (
    <Suspense fallback={null}>
      <AbbonamentoContent />
    </Suspense>
  );
}
