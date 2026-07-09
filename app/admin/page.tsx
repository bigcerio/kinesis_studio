import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  active: "Attivo",
  trialing: "Prova",
  past_due: "Pagamento in ritardo",
  canceled: "Annullato",
  incomplete: "Incompleto",
};

const statusColor: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  trialing: "bg-blue-100 text-blue-700",
  past_due: "bg-amber-100 text-amber-700",
  canceled: "bg-slate-100 text-slate-500",
  incomplete: "bg-slate-100 text-slate-500",
};

export default async function AdminPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subscription: true,
      _count: { select: { schedaGenerations: true, anamnesi: true } },
    },
  });

  const totalUsers = users.length;
  const activeSubs = users.filter(
    (u) => u.subscription?.status === "active" || u.subscription?.status === "trialing"
  ).length;
  const trialsUsed = users.filter((u) => u.trialGenerationUsedAt).length;
  const totalSchede = users.reduce((sum, u) => sum + u._count.schedaGenerations, 0);

  return (
    <div className="bg-dot-pattern min-h-dvh">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-5 py-3 backdrop-blur-sm">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-slate-900">
            Pannello amministrazione
          </h1>
          <p className="text-xs text-slate-400">Kinesis Studio — gestione utenti e abbonamenti</p>
        </div>
        <Link href="/corpo" className="text-xs text-slate-400 hover:text-slate-700">
          ← Torna alla piattaforma
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Utenti totali", value: totalUsers },
            { label: "Abbonamenti attivi", value: activeSubs },
            { label: "Prove gratuite usate", value: trialsUsed },
            { label: "Schede generate", value: totalSchede },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-2xl font-semibold tracking-tight text-slate-900">{stat.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-medium">Utente</th>
                <th className="px-4 py-2.5 font-medium">Registrato il</th>
                <th className="px-4 py-2.5 font-medium">Abbonamento</th>
                <th className="px-4 py-2.5 font-medium">Scadenza</th>
                <th className="px-4 py-2.5 font-medium">Schede</th>
                <th className="px-4 py-2.5 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => {
                const status = u.subscription?.status;
                return (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-slate-900">{u.name || "—"}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {u.createdAt.toLocaleDateString("it-IT")}
                    </td>
                    <td className="px-4 py-2.5">
                      {status ? (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusColor[status]}`}
                        >
                          {statusLabel[status]}
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                          Nessuno
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      {u.subscription
                        ? u.subscription.currentPeriodEnd
                          ? u.subscription.currentPeriodEnd.toLocaleDateString("it-IT")
                          : "Lifetime"
                        : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">{u._count.schedaGenerations}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Link
                        href={`/admin/utenti/${u.id}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800"
                      >
                        Gestisci →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
