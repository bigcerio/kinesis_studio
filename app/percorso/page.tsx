import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { muscleGroups } from "@/lib/muscleGroups";

export const dynamic = "force-dynamic";

export default async function PercorsoPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/accedi?next=/percorso");
  }

  const generations = await prisma.schedaGeneration.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-dvh bg-stone-50">
      <header className="flex items-center justify-between border-b border-stone-200 px-5 py-3">
        <div className="flex items-center gap-3">
          <Link href="/corpo" className="text-xs text-stone-400 hover:text-stone-700">
            ← Mappa corporea
          </Link>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-stone-900">Il mio percorso</h1>
            <p className="text-xs text-stone-400">Storico delle schede generate</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        {generations.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
            <p className="text-sm text-stone-500">
              Non hai ancora generato nessuna scheda.
            </p>
            <Link
              href="/corpo"
              className="mt-4 inline-block rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Inizia dalla mappa corporea
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {generations.map((g) => {
              const names = g.muscleGroupIds
                .map((id) => muscleGroups[id]?.name)
                .filter((n): n is string => Boolean(n));
              return (
                <li
                  key={g.id}
                  className="rounded-2xl border border-stone-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-stone-900">
                      {g.createdAt.toLocaleDateString("it-IT", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {g.trial && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                        prova gratuita
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs text-stone-500">
                    {names.length > 0 ? names.join(", ") : "Nessun distretto registrato"}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
