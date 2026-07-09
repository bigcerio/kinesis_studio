import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import StudioApp from "@/components/StudioApp";

// Gate esplicito a livello di pagina (non ci si affida solo a proxy.ts):
// una pagina interamente statica puo' essere servita da Vercel dalla cache
// edge bypassando il proxy; il controllo qui e' sempre affidabile perche'
// force-dynamic obbliga ogni richiesta a passare da questo server component.
export const dynamic = "force-dynamic";

export default async function CorpoPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/accedi?next=/corpo");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });

  return <StudioApp isAdmin={Boolean(user?.isAdmin)} />;
}
