import Link from "next/link";
import { LIABILITY_DISCLAIMER } from "@/lib/legal";

export default function NoteLegaliPage() {
  return (
    <div className="min-h-dvh bg-stone-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-xs text-stone-400 hover:text-stone-700">
          ← Home
        </Link>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-stone-900">
          Note legali e limitazione di responsabilità
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-stone-600">{LIABILITY_DISCLAIMER}</p>
      </div>
    </div>
  );
}
