import Link from "next/link";

export default function LegalNotice() {
  return (
    <Link
      href="/note-legali"
      className="fixed bottom-3 right-3 z-50 rounded-full border border-stone-200 bg-white/90 px-3 py-1.5 text-[10px] text-stone-400 shadow-sm backdrop-blur-sm transition-colors hover:text-stone-700 print:hidden dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-500"
    >
      Note legali
    </Link>
  );
}
