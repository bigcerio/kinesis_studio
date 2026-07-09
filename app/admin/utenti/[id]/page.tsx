import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { muscleGroups } from "@/lib/muscleGroups";
import AdminSubscriptionControls from "@/components/AdminSubscriptionControls";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  active: "Attivo",
  trialing: "Prova",
  past_due: "Pagamento in ritardo",
  canceled: "Annullato",
  incomplete: "Incompleto",
};

export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      subscription: true,
      schedaGenerations: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!user) notFound();

  const trialDeadline = new Date(user.createdAt.getTime() + 3 * 24 * 60 * 60 * 1000);
  const trialActive = !user.trialGenerationUsedAt && new Date() <= trialDeadline;

  return (
    <div className="bg-dot-pattern min-h-dvh">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-5 py-3 backdrop-blur-sm">
        <div>
          <Link href="/admin" className="text-xs text-slate-400 hover:text-slate-700">
            ← Tutti gli utenti
          </Link>
          <h1 className="text-base font-semibold tracking-tight text-slate-900">
            {user.name || user.email}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Account</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-slate-400">Email</dt>
              <dd className="text-slate-700">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Registrato il</dt>
              <dd className="text-slate-700">{user.createdAt.toLocaleDateString("it-IT")}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Prova gratuita</dt>
              <dd className="text-slate-700">
                {user.trialGenerationUsedAt
                  ? `Usata il ${user.trialGenerationUsedAt.toLocaleDateString("it-IT")}`
                  : trialActive
                    ? "Disponibile"
                    : "Scaduta, non usata"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400">Ruolo</dt>
              <dd className="text-slate-700">{user.isAdmin ? "Amministratore" : "Utente"}</dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">Abbonamento</h2>
          {user.subscription ? (
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span>
                Stato: <strong className="text-slate-900">{statusLabel[user.subscription.status]}</strong>
              </span>
              <span>
                Scadenza:{" "}
                <strong className="text-slate-900">
                  {user.subscription.currentPeriodEnd
                    ? user.subscription.currentPeriodEnd.toLocaleDateString("it-IT")
                    : "Lifetime"}
                </strong>
              </span>
              <span className="text-xs text-slate-400">({user.subscription.stripeCustomerId})</span>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">Nessun abbonamento associato.</p>
          )}

          <div className="mt-4">
            <AdminSubscriptionControls userId={user.id} />
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Schede generate ({user.schedaGenerations.length})
          </h2>
          {user.schedaGenerations.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Nessuna scheda generata finora.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {user.schedaGenerations.map((g) => {
                const names = g.muscleGroupIds
                  .map((mid) => muscleGroups[mid]?.name)
                  .filter((n): n is string => Boolean(n));
                return (
                  <li
                    key={g.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-700">
                        {g.createdAt.toLocaleDateString("it-IT")}
                      </span>
                      {g.trial && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                          prova
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {names.length > 0 ? names.join(", ") : "—"}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
