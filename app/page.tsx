import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    n: "01",
    title: "Anamnesi",
    text: "Storia clinica, dolore attuale, obiettivi e controindicazioni raccolti in modo strutturato.",
  },
  {
    n: "02",
    title: "Mappa corporea",
    text: "Corpo interattivo, fronte e retro: esplora e seleziona i distretti muscolari coinvolti.",
  },
  {
    n: "03",
    title: "Scheda personalizzata",
    text: "Esercizi con basi scientifiche e collegamenti all'esecuzione, pronti da esportare in PDF.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-stone-50">
      <header
        className="flex items-center justify-between px-6 py-5 opacity-0 [animation-fill-mode:forwards]"
        style={{ animation: "fade-up 0.5s ease-out 0.05s forwards" }}
      >
        <span className="text-sm font-semibold tracking-tight text-stone-900">
          Kinesis Studio
        </span>
        <div className="flex items-center gap-3 text-xs">
          <Link href="/accedi" className="text-stone-500 transition-colors hover:text-stone-800">
            Accedi
          </Link>
          <Link
            href="/registrati"
            className="rounded-full bg-stone-900 px-3.5 py-1.5 font-medium text-white transition-colors hover:bg-stone-800"
          >
            Registrati
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 items-center gap-10 px-6 py-12 sm:py-16 md:grid-cols-2 md:gap-6">
          {/* Sfondo decorativo */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-emerald-100/70 blur-3xl"
          />

          <div className="text-center md:text-left">
            <span
              className="inline-block rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-medium text-stone-500 opacity-0"
              style={{ animation: "fade-up 0.5s ease-out 0.1s forwards" }}
            >
              Osteopatia funzionale · anti-aging · recupero
            </span>

            <h1
              className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 opacity-0 sm:text-4xl"
              style={{ animation: "fade-up 0.6s ease-out 0.18s forwards" }}
            >
              Schede di allenamento e recupero costruite sul tuo corpo.
            </h1>

            <p
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-stone-500 opacity-0 md:mx-0"
              style={{ animation: "fade-up 0.6s ease-out 0.28s forwards" }}
            >
              Nessuna teoria generica. Anamnesi approfondita, selezione anatomica precisa,
              esercizi con basi scientifiche — stretching, allenamento funzionale, recupero.
            </p>

            <div
              className="mt-8 opacity-0"
              style={{ animation: "fade-up 0.6s ease-out 0.38s forwards" }}
            >
              <Link
                href="/anamnesi"
                className="inline-block rounded-full bg-emerald-600 px-7 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
              >
                Inizia la tua valutazione
              </Link>
            </div>
          </div>

          <div
            className="relative mx-auto h-[320px] w-[230px] opacity-0 sm:h-[400px] sm:w-[290px]"
            style={{ animation: "fade-in 0.8s ease-out 0.3s forwards" }}
          >
            <div
              className="relative h-full w-full"
              style={{ animation: "float-slow 6s ease-in-out infinite" }}
            >
              <Image
                src="/body/front.webp"
                alt="Corpo umano, mappa muscolare anteriore"
                fill
                priority
                sizes="(max-width: 640px) 230px, 290px"
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </section>

        <section
          className="relative mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-3xl px-6 opacity-0 sm:mt-8"
          style={{ animation: "fade-up 0.6s ease-out 0.4s forwards" }}
        >
          <div className="relative isolate flex min-h-[280px] items-center overflow-hidden rounded-3xl sm:min-h-[340px]">
            <Image
              src="/hero-recovery.webp"
              alt="Sessione di recupero funzionale e fisioterapia"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="-z-10 object-cover object-center"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-stone-900/80 via-stone-900/35 to-stone-900/10" />
            <div className="px-6 py-10 sm:px-10">
              <p className="max-w-md text-lg font-medium leading-snug text-white sm:text-xl">
                Recupero funzionale guidato, con lo stesso rigore di uno studio clinico.
              </p>
              <p className="mt-2 max-w-sm text-xs text-white/70">
                Ogni scheda nasce da un'anamnesi vera, non da un algoritmo generico.
              </p>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-3xl px-6 pb-16 sm:pb-20">
          <div
            className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3 [&>*]:opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="group rounded-2xl border border-stone-200 bg-white p-5 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                style={{ animation: `fade-up 0.5s ease-out ${0.45 + i * 0.1}s forwards` }}
              >
                <span className="text-xs font-medium text-emerald-600 transition-colors">
                  {s.n}
                </span>
                <h2 className="mt-2 text-sm font-semibold text-stone-900">{s.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-500">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-6 py-5 text-center text-[11px] text-stone-400">
        Prototipo frontend · abbonamenti, autenticazione e database in fase successiva
      </footer>
    </div>
  );
}
