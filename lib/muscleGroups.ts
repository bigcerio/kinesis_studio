export interface MuscleGroup {
  id: string;
  name: string;
  latin: string;
  function: string;
}

export const muscleGroups: Record<string, MuscleGroup> = {
  deltoid_anterior: {
    id: "deltoid_anterior",
    name: "Deltoide anteriore",
    latin: "Deltoideus, capo anteriore",
    function: "Flessione e rotazione interna della spalla",
  },
  pectoralis_major: {
    id: "pectoralis_major",
    name: "Grande pettorale",
    latin: "Pectoralis major",
    function: "Adduzione e flessione orizzontale della spalla",
  },
  biceps_brachii: {
    id: "biceps_brachii",
    name: "Bicipite brachiale",
    latin: "Biceps brachii",
    function: "Flessione del gomito, supinazione dell'avambraccio",
  },
  forearm_flexors: {
    id: "forearm_flexors",
    name: "Flessori dell'avambraccio",
    latin: "Flexor carpi group",
    function: "Flessione di polso e dita",
  },
  rectus_abdominis: {
    id: "rectus_abdominis",
    name: "Retto dell'addome",
    latin: "Rectus abdominis",
    function: "Flessione del tronco, stabilizzazione del core",
  },
  obliques: {
    id: "obliques",
    name: "Obliqui addominali",
    latin: "Obliquus externus/internus abdominis",
    function: "Rotazione e flessione laterale del tronco",
  },
  hip_flexors: {
    id: "hip_flexors",
    name: "Ileopsoas",
    latin: "Iliopsoas",
    function: "Flessione dell'anca, stabilizzazione lombo-pelvica",
  },
  adductors: {
    id: "adductors",
    name: "Adduttori della coscia",
    latin: "Adductor magnus/longus/brevis",
    function: "Adduzione dell'anca, stabilizzazione mediale del ginocchio",
  },
  quadriceps: {
    id: "quadriceps",
    name: "Quadricipite femorale",
    latin: "Quadriceps femoris",
    function: "Estensione del ginocchio, flessione dell'anca (retto femorale)",
  },
  tibialis_anterior: {
    id: "tibialis_anterior",
    name: "Tibiale anteriore",
    latin: "Tibialis anterior",
    function: "Dorsiflessione ed inversione della caviglia",
  },
  trapezius: {
    id: "trapezius",
    name: "Trapezio",
    latin: "Trapezius",
    function: "Elevazione, retrazione e rotazione della scapola",
  },
  deltoid_posterior: {
    id: "deltoid_posterior",
    name: "Deltoide posteriore",
    latin: "Deltoideus, capo posteriore",
    function: "Estensione e rotazione esterna della spalla",
  },
  triceps_brachii: {
    id: "triceps_brachii",
    name: "Tricipite brachiale",
    latin: "Triceps brachii",
    function: "Estensione del gomito",
  },
  forearm_extensors: {
    id: "forearm_extensors",
    name: "Estensori dell'avambraccio",
    latin: "Extensor carpi group",
    function: "Estensione di polso e dita",
  },
  latissimus_dorsi: {
    id: "latissimus_dorsi",
    name: "Gran dorsale",
    latin: "Latissimus dorsi",
    function: "Adduzione, estensione e rotazione interna della spalla",
  },
  erector_spinae: {
    id: "erector_spinae",
    name: "Erettori spinali",
    latin: "Erector spinae",
    function: "Estensione e stabilizzazione della colonna vertebrale",
  },
  gluteus_maximus: {
    id: "gluteus_maximus",
    name: "Grande gluteo",
    latin: "Gluteus maximus",
    function: "Estensione e rotazione esterna dell'anca",
  },
  hamstrings: {
    id: "hamstrings",
    name: "Ischiocrurali",
    latin: "Biceps femoris, semitendinosus, semimembranosus",
    function: "Flessione del ginocchio, estensione dell'anca",
  },
  gastrocnemius: {
    id: "gastrocnemius",
    name: "Gastrocnemio",
    latin: "Gastrocnemius",
    function: "Plantiflessione della caviglia, flessione del ginocchio",
  },
  soleus: {
    id: "soleus",
    name: "Soleo",
    latin: "Soleus",
    function: "Plantiflessione della caviglia, stabilizzazione posturale",
  },
};
