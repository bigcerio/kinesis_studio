import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Anamnesi",
    text: "Storia clinica, dolore attuale, obiettivi e controindicazioni raccolti in modo strutturato.",
  },
  {
    n: "02",
    title: "Mappa corporea 3D",
    text: "Corpo interattivo, ruotabile, basato sul profilo: esplora e seleziona i distretti muscolari coinvolti.",
  },
  {
    n: "03",
    title: "Scheda personalizzata",
    text: "Esercizi con basi scientifiche e collegamenti all'esecuzione, pronti da esportare in PDF.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-stone-50 dark:bg-stone-950">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Kinesis Studio
        </span>
        <span className="rounded-full border border-stone-200 px-3 py-1 text-[11px] text-stone-400 dark:border-stone-800">
          accesso riservato agli abbonati — prototipo
        </span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-100">
          Osteopatia funzionale, allenamento e recupero: schede costruite sul tuo corpo.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          Nessuna teoria generica. Anamnesi approfondita, selezione anatomica precisa,
          esercizi con basi scientifiche — stretching, allenamento funzionale, recupero.
        </p>
        <Link
          href="/anamnesi"
          className="mt-8 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
        >
          Inizia la tua valutazione
        </Link>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950"
            >
              <span className="text-xs font-medium text-stone-400">{s.n}</span>
              <h2 className="mt-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                {s.title}
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="px-6 py-5 text-center text-[11px] text-stone-400">
        Prototipo frontend · abbonamenti, autenticazione e database in fase successiva
      </footer>
    </div>
  );
}
