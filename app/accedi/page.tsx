"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

function AccediForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/corpo";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError("Email o password non corretti.");
      return;
    }
    router.push(next);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-stone-50 px-6 dark:bg-stone-950">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
        <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-100">Accedi</h1>
        <p className="mt-1 text-sm text-stone-500">Entra nel tuo account Kinesis Studio.</p>

        <button
          onClick={() => signIn("google", { callbackUrl: next })}
          className="mt-5 w-full rounded-2xl border border-stone-200 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          Continua con Google
        </button>

        <div className="my-4 flex items-center gap-3 text-xs text-stone-400">
          <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
          oppure
          <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-emerald-400 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
          />
          {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-emerald-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-60 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            {loading ? "Accesso in corso…" : "Accedi"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-stone-400">
          Non hai un account?{" "}
          <Link href="/registrati" className="font-medium text-stone-600 underline dark:text-stone-300">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AccediPage() {
  return (
    <Suspense fallback={null}>
      <AccediForm />
    </Suspense>
  );
}
