"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { emptyAnamnesi, obiettiviOptions, saveAnamnesi, type AnamnesiData, type Sex } from "@/lib/anamnesi";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      {hint && <p className="mt-0.5 text-xs text-slate-400">{hint}</p>}
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100";

function toggleInArray(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function AnamnesiForm() {
  const router = useRouter();
  const [data, setData] = useState<AnamnesiData>(emptyAnamnesi);
  const update = <K extends keyof AnamnesiData>(key: K, value: AnamnesiData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAnamnesi(data);
    router.push("/corpo");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-5 py-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Prima di iniziare
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Poche domande per orientare la tua scheda. Il quadro clinico completo — storia articolare,
          patologie pregresse, controindicazioni specifiche — viene approfondito con il professionista
          all&apos;attivazione dell&apos;abbonamento.
        </p>
      </div>

      <Section title="Dati generali">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Field label="Sesso">
            <div className="flex gap-1 rounded-2xl border border-slate-200 p-1 dark:border-slate-800">
              {(["F", "M"] as Sex[]).map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => update("sex", s)}
                  className={`flex-1 rounded-xl py-1.5 text-xs font-medium transition-colors ${
                    data.sex === s
                      ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-blue-950"
                      : "text-slate-500"
                  }`}
                >
                  {s === "F" ? "Donna" : "Uomo"}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Età">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={data.eta}
              onChange={(e) => update("eta", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Obiettivo principale" hint="Seleziona una o più voci">
        <div className="flex flex-wrap gap-2">
          {obiettiviOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => update("obiettivi", toggleInArray(data.obiettivi, opt))}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                data.obiettivi.includes(opt)
                  ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500 dark:text-blue-950"
                  : "border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-800 dark:text-slate-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Zona di fastidio" hint="Facoltativo — se presente una zona da tenere d'occhio">
        <input
          type="text"
          placeholder="es. lombare, cervicale, ginocchio destro…"
          className={inputClass}
          value={data.doloreZone}
          onChange={(e) => update("doloreZone", e.target.value)}
        />
      </Section>

      <Section title="Livello di attività fisica attuale">
        <select
          className={inputClass}
          value={data.livelloAttivita}
          onChange={(e) => update("livelloAttivita", e.target.value)}
        >
          <option value="">Seleziona…</option>
          <option value="sedentario">Sedentario</option>
          <option value="leggero">Leggero (1-2 volte/settimana)</option>
          <option value="moderato">Moderato (3-4 volte/settimana)</option>
          <option value="intenso">Intenso (5+ volte/settimana)</option>
        </select>
      </Section>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-xs leading-relaxed text-blue-900 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
        <p className="font-medium">Con l&apos;abbonamento sblocchi l&apos;anamnesi clinica completa</p>
        <p className="mt-1 text-blue-800/80 dark:text-blue-300/80">
          Patologie pregresse, interventi chirurgici, farmaci, quadro articolare specifico e
          restrizioni mediche — validati insieme al professionista per una scheda davvero su misura.
        </p>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-2xl bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:text-blue-950 dark:hover:bg-blue-400"
      >
        Continua alla mappa corporea
      </button>
    </form>
  );
}
