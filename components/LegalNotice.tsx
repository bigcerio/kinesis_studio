import Link from "next/link";

export default function LegalNotice() {
  return (
    <Link
      href="/note-legali"
      className="fixed bottom-3 right-3 z-50 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[10px] text-slate-400 shadow-sm backdrop-blur-sm transition-colors hover:text-slate-700 print:hidden dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-500"
    >
      Note legali
    </Link>
  );
}
