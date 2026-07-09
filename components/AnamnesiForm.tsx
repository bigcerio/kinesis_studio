"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  emptyAnamnesi,
  obiettiviOptions,
  controindicazioniOptions,
  saveAnamnesi,
  type AnamnesiData,
  type Sex,
} from "@/lib/anamnesi";

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
          Anamnesi
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Alcune informazioni prima di iniziare, per costruire una scheda coerente con la tua
          condizione. I dati restano privati e vengono validati dal professionista.
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
          <Field label="Peso (kg)">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={data.peso}
              onChange={(e) => update("peso", e.target.value)}
            />
          </Field>
          <Field label="Altezza (cm)">
            <input
              type="number"
              min={0}
              className={inputClass}
              value={data.altezza}
              onChange={(e) => update("altezza", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section title="Obiettivi" hint="Seleziona una o più voci">
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

      <Section title="Dolore attuale">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Zona interessata">
            <input
              type="text"
              placeholder="es. lombare, cervicale, ginocchio destro…"
              className={inputClass}
              value={data.doloreZone}
              onChange={(e) => update("doloreZone", e.target.value)}
            />
          </Field>
          <Field label="Da quanto tempo">
            <select
              className={inputClass}
              value={data.doloreDurata}
              onChange={(e) => update("doloreDurata", e.target.value)}
            >
              <option value="">Seleziona…</option>
              <option value="acuto">Acuto (&lt; 2 settimane)</option>
              <option value="subacuto">Subacuto (2-12 settimane)</option>
              <option value="cronico">Cronico (&gt; 12 settimane)</option>
              <option value="assente">Nessun dolore attuale</option>
            </select>
          </Field>
        </div>
        <Field label={`Intensità percepita (0-10): ${data.doloreIntensita}`}>
          <input
            type="range"
            min={0}
            max={10}
            value={data.doloreIntensita}
            onChange={(e) => update("doloreIntensita", Number(e.target.value))}
          />
        </Field>
      </Section>

      <Section title="Storia clinica">
        <Field label="Patologie pregresse">
          <textarea
            className={inputClass}
            rows={2}
            value={data.patologiePregresse}
            onChange={(e) => update("patologiePregresse", e.target.value)}
          />
        </Field>
        <Field label="Interventi chirurgici">
          <textarea
            className={inputClass}
            rows={2}
            value={data.interventiChirurgici}
            onChange={(e) => update("interventiChirurgici", e.target.value)}
          />
        </Field>
        <Field label="Farmaci attualmente assunti">
          <textarea
            className={inputClass}
            rows={2}
            value={data.farmaci}
            onChange={(e) => update("farmaci", e.target.value)}
          />
        </Field>
      </Section>

      <Section
        title="Quadro articolare e mobilità"
        hint="Fondamentale per adattare l'intensità e escludere esercizi controindicati"
      >
        <Field label="Patologie articolari specifiche (ernie, protrusioni, artrosi, instabilità…)">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. ernia L4-L5, protrusione C5-C6, artrosi ginocchio destro…"
            value={data.patologieArticolari}
            onChange={(e) => update("patologieArticolari", e.target.value)}
          />
        </Field>
        <Field label="Limitazioni di mobilità riscontrate">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. limitata rotazione cervicale, difficoltà a flettere l'anca…"
            value={data.problemiMobilita}
            onChange={(e) => update("problemiMobilita", e.target.value)}
          />
        </Field>
        <Field label="Origine del problema — come si è sviluppato">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. trauma acuto (caduta, incidente), insorgenza graduale, posturale/da sovraccarico lavorativo…"
            value={data.origineProblema}
            onChange={(e) => update("origineProblema", e.target.value)}
          />
        </Field>
        <Field label="Indicazioni o restrizioni ricevute dal medico/specialista">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. evitare carichi assiali, no impatto, fisioterapia in corso…"
            value={data.indicazioniMediche}
            onChange={(e) => update("indicazioniMediche", e.target.value)}
          />
        </Field>
      </Section>

      <Section title="Attività fisica praticata">
        <Field label="Attività/sport attualmente praticati">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. corsa 2 volte a settimana, nuoto, nessuna attività regolare…"
            value={data.attivitaSvolta}
            onChange={(e) => update("attivitaSvolta", e.target.value)}
          />
        </Field>
        <Field label="Tipo di allenamento svolto">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. pesi in palestra, corsi di gruppo, yoga/pilates, allenamento a corpo libero…"
            value={data.tipoAllenamento}
            onChange={(e) => update("tipoAllenamento", e.target.value)}
          />
        </Field>
      </Section>

      <Section
        title="Preferenze ed esercizi da evitare"
        hint="Movimenti non eseguibili, sconsigliati o semplicemente non graditi"
      >
        <Field label="Esercizi, posizioni o movimenti da evitare">
          <textarea
            className={inputClass}
            rows={2}
            placeholder="es. non riesco a stare in ginocchio, evito esercizi a terra in supino, no salti/impatto, non gradisco esercizi con corda…"
            value={data.eserciziDaEvitare}
            onChange={(e) => update("eserciziDaEvitare", e.target.value)}
          />
        </Field>
      </Section>

      <Section title="Controindicazioni" hint="Seleziona ciò che si applica">
        <div className="flex flex-wrap gap-2">
          {controindicazioniOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => update("controindicazioni", toggleInArray(data.controindicazioni, opt))}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                data.controindicazioni.includes(opt)
                  ? "border-red-700 bg-red-700 text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-800 dark:text-slate-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
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

      <Section title="Note aggiuntive">
        <textarea
          className={inputClass}
          rows={3}
          placeholder="Qualsiasi informazione utile al professionista…"
          value={data.note}
          onChange={(e) => update("note", e.target.value)}
        />
      </Section>

      <button
        type="submit"
        className="mt-2 w-full rounded-2xl bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:text-blue-950 dark:hover:bg-blue-400"
      >
        Continua alla mappa corporea
      </button>
    </form>
  );
}
