import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Action = "grant_lifetime" | "grant_months" | "revoke";

async function assertAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });
  return user?.isAdmin ? session.user.id : null;
}

export async function POST(request: Request) {
  const adminId = await assertAdmin();
  if (!adminId) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const targetUserId: string | undefined = body?.userId;
  const action: Action | undefined = body?.action;
  const months: number | undefined = body?.months;

  if (!targetUserId || !action) {
    return NextResponse.json({ error: "Parametri mancanti." }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!targetUser) {
    return NextResponse.json({ error: "Utente non trovato." }, { status: 404 });
  }

  if (action === "revoke") {
    await prisma.subscription.updateMany({
      where: { userId: targetUserId },
      data: { status: "canceled", currentPeriodEnd: new Date() },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "grant_lifetime") {
    await prisma.subscription.upsert({
      where: { userId: targetUserId },
      create: {
        userId: targetUserId,
        stripeCustomerId: `manual_lifetime_${targetUserId}`,
        status: "active",
        currentPeriodEnd: null,
      },
      update: {
        status: "active",
        currentPeriodEnd: null,
      },
    });
    return NextResponse.json({ ok: true });
  }

  if (action === "grant_months") {
    const n = Number(months);
    if (!n || n <= 0) {
      return NextResponse.json({ error: "Numero di mesi non valido." }, { status: 400 });
    }
    const periodEnd = new Date();
    periodEnd.setMonth(periodEnd.getMonth() + n);

    await prisma.subscription.upsert({
      where: { userId: targetUserId },
      create: {
        userId: targetUserId,
        stripeCustomerId: `manual_grant_${targetUserId}`,
        status: "active",
        currentPeriodEnd: periodEnd,
      },
      update: {
        status: "active",
        currentPeriodEnd: periodEnd,
      },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Azione non riconosciuta." }, { status: 400 });
}
