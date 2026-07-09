import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { markTrialGenerationUsed } from "@/lib/access";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autenticato." }, { status: 401 });
  }
  await markTrialGenerationUsed(session.user.id);
  return NextResponse.json({ ok: true });
}
