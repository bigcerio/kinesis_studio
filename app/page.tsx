import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Anamnesi",
    text: "Storia clinica, dolore attuale, obiettivi. Niente questionari generici.",
  },
  {
    n: "02",
    title: "Mappa corporea",
    text: "Fronte e retro, corpo intero. Tocchi il distretto, non lo cerchi in un elenco.",
  },
  {
    n: "03",
    title: "Scheda pronta",
    text: "Esercizi con basi scientifiche, video di esecuzione, export PDF.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-slate-50">
      <header
        className="flex items-center justify-between px-6 py-5 opacity-0 [animation-fill-mode:forwards]"
        style={{ animation: "fade-up 0.5s ease-out 0.05s forwards" }}
      >
        <span className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-900">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-blue-600" aria-hidden />
          Kinesis Studio
        </span>
        <div className="flex items-center gap-3 text-xs">
          <Link href="/accedi" className="text-slate-500 transition-colors hover:text-slate-800">
            Accedi
          </Link>
          <Link
            href="/registrati"
            className="rounded-full bg-slate-900 px-3.5 py-1.5 font-medium text-white transition-colors hover:bg-slate-800"
          >
            Registrati
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 items-center gap-10 px-6 py-12 sm:py-16 md:grid-cols-2 md:gap-6">
          {/* Sfondo decorativo */}
          <div aria-hidden className="bg-grid-pattern pointer-events-none absolute inset-0 -z-20" />
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl"
          />

          <div className="text-center md:text-left">
            <span
              className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 opacity-0"
              style={{ animation: "fade-up 0.5s ease-out 0.1s forwards" }}
            >
              Osteopatia funzionale · anti-aging · recupero
            </span>

            <h1
              className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 opacity-0 sm:text-4xl"
              style={{ animation: "fade-up 0.6s ease-out 0.18s forwards" }}
            >
              La tua scheda. Costruita sul tuo corpo, non su un modello.
            </h1>

            <p
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-500 opacity-0 md:mx-0"
              style={{ animation: "fade-up 0.6s ease-out 0.28s forwards" }}
            >
              Anamnesi vera. Distretto muscolare esatto. Esercizio con basi scientifiche.
              Zero teoria generica, zero fuffa.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 opacity-0"
              style={{ animation: "fade-up 0.6s ease-out 0.38s forwards" }}
            >
              <Link
                href="/anamnesi"
                className="inline-block rounded-full bg-blue-600 px-7 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
              >
                Inizia ora
              </Link>
              <Link
                href="/abbonamento"
                className="inline-block rounded-full px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Vedi i piani →
              </Link>
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-xs opacity-0"
            style={{ animation: "fade-in 0.8s ease-out 0.3s forwards" }}
          >
            {/* Angoli "da rilevazione clinica": firma visiva ricorrente, non decorativa */}
            <span
              aria-hidden
              className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-blue-300"
            />
            <span
              aria-hidden
              className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-blue-300"
            />
            <div
              className="rotate-[-1deg] rounded-3xl border border-slate-200 bg-white/80 p-7 shadow-xl backdrop-blur-sm transition-transform duration-500 hover:rotate-0"
              style={{ animation: "float-slow 6s ease-in-out infinite" }}
            >
              <div className="flex items-center gap-2 text-blue-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M2 12h4l2-7 4 14 3-9 2 5h5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-medium">Metodo clinico</span>
              </div>

              <p className="mt-5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                20
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                distretti muscolari mappati con precisione anatomica
              </p>

              <div className="my-5 h-px bg-slate-100" />

              <p className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
                100%
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                costruita su un&apos;anamnesi reale, non su un algoritmo generico
              </p>
            </div>
          </div>
        </section>

        <section
          className="relative mx-auto mt-4 w-full max-w-5xl overflow-hidden rounded-3xl px-6 opacity-0 sm:mt-8"
          style={{ animation: "fade-up 0.6s ease-out 0.4s forwards" }}
        >
          <div className="relative isolate flex min-h-[280px] items-center overflow-hidden rounded-3xl sm:min-h-[340px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/hero-recovery.webp"
              className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
            >
              <source src="/hero-recovery.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-900/80 via-slate-900/35 to-slate-900/10" />
            <div className="px-6 py-10 sm:px-10">
              <p className="max-w-md text-lg font-medium leading-snug text-white sm:text-xl">
                Stesso rigore di uno studio clinico. Zero compromessi sul metodo.
              </p>
              <p className="mt-2 max-w-sm text-xs text-white/70">
                Ogni scheda nasce da un&apos;anamnesi vera, non da un algoritmo generico.
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
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 opacity-0 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                style={{ animation: `fade-up 0.5s ease-out ${0.45 + i * 0.1}s forwards` }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 select-none text-7xl font-bold tabular-nums text-slate-50 transition-colors duration-300 group-hover:text-blue-50"
                >
                  {s.n}
                </span>
                <span className="relative text-xs font-medium tabular-nums text-blue-600">
                  {s.n}
                </span>
                <h2 className="relative mt-2 text-sm font-semibold text-slate-900">{s.title}</h2>
                <p className="relative mt-1.5 text-xs leading-relaxed text-slate-500">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-6 py-5 text-center text-[11px] text-slate-400">
        © {new Date().getFullYear()} Kinesis Studio
      </footer>
    </div>
  );
}
