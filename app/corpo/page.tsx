import StudioApp from "@/components/StudioApp";

// Forza il rendering dinamico: una pagina completamente statica puo' essere
// servita da Vercel direttamente dalla cache edge, bypassando proxy.ts (il
// gate di autenticazione). Vedi SETUP.md / commit history per il contesto.
export const dynamic = "force-dynamic";

export default function CorpoPage() {
  return <StudioApp />;
}
