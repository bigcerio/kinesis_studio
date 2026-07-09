export type Sex = "M" | "F";

export interface AnamnesiData {
  sex: Sex;
  eta: string;
  peso: string;
  altezza: string;
  obiettivi: string[];
  doloreZone: string;
  doloreIntensita: number;
  doloreDurata: string;
  patologiePregresse: string;
  interventiChirurgici: string;
  farmaci: string;
  livelloAttivita: string;
  controindicazioni: string[];
  problemiMobilita: string;
  indicazioniMediche: string;
  patologieArticolari: string;
  origineProblema: string;
  attivitaSvolta: string;
  tipoAllenamento: string;
  eserciziDaEvitare: string;
  note: string;
}

export const emptyAnamnesi: AnamnesiData = {
  sex: "F",
  eta: "",
  peso: "",
  altezza: "",
  obiettivi: [],
  doloreZone: "",
  doloreIntensita: 0,
  doloreDurata: "",
  patologiePregresse: "",
  interventiChirurgici: "",
  farmaci: "",
  livelloAttivita: "",
  controindicazioni: [],
  problemiMobilita: "",
  indicazioniMediche: "",
  patologieArticolari: "",
  origineProblema: "",
  attivitaSvolta: "",
  tipoAllenamento: "",
  eserciziDaEvitare: "",
  note: "",
};

const STORAGE_KEY = "kinesis_anamnesi_v1";

export function saveAnamnesi(data: AnamnesiData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadAnamnesi(): AnamnesiData | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AnamnesiData;
  } catch {
    return null;
  }
}

export const obiettiviOptions = [
  "Recupero funzionale post-infortunio",
  "Mobilità articolare",
  "Forza e tono muscolare",
  "Postura e riequilibrio posturale",
  "Anti-aging / prevenzione",
  "Riduzione del dolore",
];

export const controindicazioniOptions = [
  "Gravidanza in corso",
  "Patologie cardiovascolari",
  "Osteoporosi diagnosticata",
  "Interventi chirurgici recenti (< 6 mesi)",
  "Ernie discali diagnosticate",
  "Nessuna",
];
