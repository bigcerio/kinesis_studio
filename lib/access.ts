import { prisma } from "@/lib/prisma";

const TRIAL_DAYS = 3;

export type Entitlement =
  | { allowed: true; trial: boolean }
  | { allowed: false; reason: "no_subscription" | "trial_used" | "trial_expired" };

/**
 * Un utente puo' generare una scheda se:
 * - ha un abbonamento attivo, oppure
 * - non ha ancora usato la prova gratuita (1 generazione) ed e' entro TRIAL_DAYS dalla registrazione.
 */
export async function getSchedaEntitlement(userId: string): Promise<Entitlement> {
  // Paywall in pausa per fase di test: bypass globale finché Stripe non è collegato per davvero.
  if (process.env.PAYWALL_DISABLED === "true") {
    return { allowed: true, trial: false };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });
  if (!user) return { allowed: false, reason: "no_subscription" };

  if (user.subscription?.status === "active" || user.subscription?.status === "trialing") {
    return { allowed: true, trial: false };
  }

  if (user.trialGenerationUsedAt) {
    return { allowed: false, reason: "trial_used" };
  }

  const trialDeadline = new Date(user.createdAt.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  if (new Date() > trialDeadline) {
    return { allowed: false, reason: "trial_expired" };
  }

  return { allowed: true, trial: true };
}

export async function markTrialGenerationUsed(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { trialGenerationUsedAt: new Date() },
  });
}
