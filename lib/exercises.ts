export interface Exercise {
  id: string;
  groupId: string; // matches muscleGroups id
  name: string;
  category: "stretching" | "rinforzo" | "mobilita" | "recupero";
  description: string;
  execution: string;
  sets: string;
  contraindications: string[];
  videoUrl: string;
  videoThumbnail: string;
}

// Contenuto placeholder in attesa di validazione clinica del professionista.
// Struttura pronta per essere sostituita/estesa da un pannello admin.
export const exercises: Exercise[] = [
  {
    id: "ex_pectoralis_stretch",
    groupId: "pectoralis_major",
    name: "Stretching pettorali al muro",
    category: "stretching",
    description: "Allunga il grande pettorale riducendo la tensione anteriore di spalla, utile in caso di postura chiusa.",
    execution: "Avambraccio a 90° contro lo stipite, ruota il tronco dal lato opposto finché senti tensione non dolorosa. Mantieni la respirazione fluida.",
    sets: "3 x 30\" per lato",
    contraindications: ["Lussazione di spalla recente"],
    videoUrl: "https://www.youtube.com/results?search_query=stretching+grande+pettorale",
    videoThumbnail: "",
  },
  {
    id: "ex_biceps_curl",
    groupId: "biceps_brachii",
    name: "Curl bicipiti con elastico",
    category: "rinforzo",
    description: "Rinforzo del bicipite brachiale a basso impatto articolare, adatto anche in fase di ripresa.",
    execution: "In piedi, elastico sotto i piedi, fletti il gomito mantenendo il busto stabile. Controlla la fase eccentrica.",
    sets: "3 x 12-15 ripetizioni",
    contraindications: ["Epicondilite acuta"],
    videoUrl: "https://www.youtube.com/results?search_query=curl+bicipiti+elastico",
    videoThumbnail: "",
  },
  {
    id: "ex_rectus_abdominis_deadbug",
    groupId: "rectus_abdominis",
    name: "Dead bug",
    category: "rinforzo",
    description: "Attivazione del core a basso carico spinale, indicato per stabilizzazione lombare e recupero funzionale.",
    execution: "Supino, ginocchia a 90°, braccia verso il soffitto. Estendi lentamente braccio e gamba opposti mantenendo la zona lombare a contatto col suolo.",
    sets: "3 x 8 ripetizioni per lato",
    contraindications: [],
    videoUrl: "https://www.youtube.com/results?search_query=dead+bug+exercise",
    videoThumbnail: "",
  },
  {
    id: "ex_hip_flexors_stretch",
    groupId: "hip_flexors",
    name: "Stretching ileopsoas in affondo",
    category: "stretching",
    description: "Allunga l'ileopsoas, spesso retratto in soggetti sedentari, riducendo l'anteroversione del bacino.",
    execution: "Affondo con ginocchio posteriore a terra, spingi il bacino in avanti mantenendo il busto verticale.",
    sets: "3 x 30\" per lato",
    contraindications: ["Ernia inguinale"],
    videoUrl: "https://www.youtube.com/results?search_query=stretching+ileopsoas+affondo",
    videoThumbnail: "",
  },
  {
    id: "ex_quadriceps_squat",
    groupId: "quadriceps",
    name: "Squat a corpo libero su sedia",
    category: "rinforzo",
    description: "Rinforzo funzionale del quadricipite con riferimento propriocettivo, utile per riattivazione post-infortunio.",
    execution: "Sedia dietro di te, scendi controllando il movimento fino a sfiorare la seduta, poi risali senza slancio.",
    sets: "3 x 10-12 ripetizioni",
    contraindications: ["Condropatia femoro-rotulea in fase acuta"],
    videoUrl: "https://www.youtube.com/results?search_query=squat+su+sedia+riabilitazione",
    videoThumbnail: "",
  },
  {
    id: "ex_tibialis_raise",
    groupId: "tibialis_anterior",
    name: "Sollevamento punte (tibialis raise)",
    category: "rinforzo",
    description: "Rinforza il tibiale anteriore, utile per stabilità di caviglia e prevenzione di distorsioni.",
    execution: "In piedi, schiena a un muro, solleva solo le punte dei piedi mantenendo i talloni a terra.",
    sets: "3 x 15 ripetizioni",
    contraindications: [],
    videoUrl: "https://www.youtube.com/results?search_query=tibialis+raise",
    videoThumbnail: "",
  },
  {
    id: "ex_trapezius_release",
    groupId: "trapezius",
    name: "Mobilizzazione trapezio superiore",
    category: "mobilita",
    description: "Riduce la tensione del trapezio superiore, frequente in soggetti con lavoro al videoterminale.",
    execution: "Inclina il capo lateralmente, mano omolaterale sopra l'orecchio applica una leggera trazione, senza forzare.",
    sets: "3 x 20\" per lato",
    contraindications: ["Cervicalgia acuta con irradiazione"],
    videoUrl: "https://www.youtube.com/results?search_query=mobilizzazione+trapezio+superiore",
    videoThumbnail: "",
  },
  {
    id: "ex_latissimus_pulldown",
    groupId: "latissimus_dorsi",
    name: "Lat pulldown con elastico",
    category: "rinforzo",
    description: "Rinforza il gran dorsale migliorando la stabilità della cintura scapolare.",
    execution: "Elastico ancorato in alto, tira verso il basso portando i gomiti lungo il busto, controlla il ritorno.",
    sets: "3 x 12 ripetizioni",
    contraindications: ["Conflitto subacromiale acuto"],
    videoUrl: "https://www.youtube.com/results?search_query=lat+pulldown+elastico",
    videoThumbnail: "",
  },
  {
    id: "ex_erector_spinae_birddog",
    groupId: "erector_spinae",
    name: "Bird dog",
    category: "recupero",
    description: "Stabilizzazione degli erettori spinali con basso carico compressivo, indicato in fase di recupero lombare.",
    execution: "Carponi, estendi braccio e gamba opposti mantenendo il bacino stabile e la colonna neutra.",
    sets: "3 x 8 ripetizioni per lato",
    contraindications: ["Fase acuta di lombalgia con dolore irradiato"],
    videoUrl: "https://www.youtube.com/results?search_query=bird+dog+exercise+lombalgia",
    videoThumbnail: "",
  },
  {
    id: "ex_gluteus_bridge",
    groupId: "gluteus_maximus",
    name: "Ponte gluteo (glute bridge)",
    category: "rinforzo",
    description: "Attiva il grande gluteo migliorando l'estensione d'anca, utile in caso di dominanza dei flessori.",
    execution: "Supino, ginocchia flesse, solleva il bacino contraendo i glutei senza inarcare eccessivamente la lombare.",
    sets: "3 x 15 ripetizioni",
    contraindications: [],
    videoUrl: "https://www.youtube.com/results?search_query=glute+bridge+esecuzione",
    videoThumbnail: "",
  },
  {
    id: "ex_hamstrings_stretch",
    groupId: "hamstrings",
    name: "Stretching ischiocrurali supino con elastico",
    category: "stretching",
    description: "Allunga la catena posteriore della coscia in scarico, sicuro anche in presenza di lombalgia lieve.",
    execution: "Supino, elastico intorno all'avampiede, estendi il ginocchio portando la gamba verso l'alto mantenendo la lombare a contatto col suolo.",
    sets: "3 x 30\" per lato",
    contraindications: ["Sciatalgia acuta"],
    videoUrl: "https://www.youtube.com/results?search_query=stretching+ischiocrurali+elastico",
    videoThumbnail: "",
  },
  {
    id: "ex_gastrocnemius_stretch",
    groupId: "gastrocnemius",
    name: "Stretching polpaccio su gradino",
    category: "stretching",
    description: "Allunga il gastrocnemio, utile per prevenzione di sovraccarichi tendinei achillei.",
    execution: "Avampiede su un gradino, lascia scendere il tallone sotto il livello del gradino con ginocchio esteso.",
    sets: "3 x 30\" per lato",
    contraindications: ["Tendinopatia achillea in fase acuta"],
    videoUrl: "https://www.youtube.com/results?search_query=stretching+polpaccio+gradino",
    videoThumbnail: "",
  },
];

export function exercisesForGroup(groupId: string): Exercise[] {
  return exercises.filter((e) => e.groupId === groupId);
}
