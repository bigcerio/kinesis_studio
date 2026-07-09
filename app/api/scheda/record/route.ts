import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { markTrialGenerationUsed } from "@/lib/access";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autenticato." }, { status: 401 });
  }

  const { groupIds, trial } = await request.json().catch(() => ({ groupIds: [], trial: false }));
  const muscleGroupIds: string[] = Array.isArray(groupIds) ? groupIds : [];

  await prisma.schedaGeneration.create({
    data: {
      userId: session.user.id,
      muscleGroupIds,
      trial: Boolean(trial),
    },
  });

  if (trial) {
    await markTrialGenerationUsed(session.user.id);
  }

  return NextResponse.json({ ok: true });
}
