import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getSchedaEntitlement } from "@/lib/access";
import SchedaView from "@/components/SchedaView";

export default async function SchedaPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/accedi?next=/scheda");
  }

  const entitlement = await getSchedaEntitlement(session.user.id);
  if (!entitlement.allowed) {
    redirect("/abbonamento?motivo=" + entitlement.reason);
  }

  return <SchedaView trial={entitlement.trial} />;
}
