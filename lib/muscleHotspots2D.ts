export type View2D = "front" | "back";
export type Side2D = "sx" | "dx" | "c";

export interface Hotspot2D {
  id: string;
  groupId: string;
  view: View2D;
  side: Side2D;
  x: number;
  y: number;
  w: number;
  h: number;
}

// Coordinate space: 1000 x 1400 (stessa proporzione delle immagini in /public/body).
export const hotspots2D: Hotspot2D[] = [
  // --- FRONTE ---
  { id: "deltoid_anterior_dx", groupId: "deltoid_anterior", view: "front", side: "dx", x: 270, y: 260, w: 90, h: 90 },
  { id: "deltoid_anterior_sx", groupId: "deltoid_anterior", view: "front", side: "sx", x: 640, y: 260, w: 90, h: 90 },
  { id: "pectoralis_major_c", groupId: "pectoralis_major", view: "front", side: "c", x: 390, y: 270, w: 220, h: 110 },
  { id: "biceps_brachii_dx", groupId: "biceps_brachii", view: "front", side: "dx", x: 250, y: 350, w: 80, h: 130 },
  { id: "biceps_brachii_sx", groupId: "biceps_brachii", view: "front", side: "sx", x: 670, y: 350, w: 80, h: 130 },
  { id: "forearm_flexors_dx", groupId: "forearm_flexors", view: "front", side: "dx", x: 220, y: 480, w: 75, h: 140 },
  { id: "forearm_flexors_sx", groupId: "forearm_flexors", view: "front", side: "sx", x: 705, y: 480, w: 75, h: 140 },
  { id: "rectus_abdominis_c", groupId: "rectus_abdominis", view: "front", side: "c", x: 430, y: 390, w: 140, h: 190 },
  { id: "obliques_dx", groupId: "obliques", view: "front", side: "dx", x: 380, y: 400, w: 50, h: 160 },
  { id: "obliques_sx", groupId: "obliques", view: "front", side: "sx", x: 570, y: 400, w: 50, h: 160 },
  { id: "hip_flexors_c", groupId: "hip_flexors", view: "front", side: "c", x: 420, y: 580, w: 160, h: 70 },
  { id: "adductors_dx", groupId: "adductors", view: "front", side: "dx", x: 440, y: 650, w: 60, h: 180 },
  { id: "adductors_sx", groupId: "adductors", view: "front", side: "sx", x: 500, y: 650, w: 60, h: 180 },
  { id: "quadriceps_dx", groupId: "quadriceps", view: "front", side: "dx", x: 400, y: 630, w: 100, h: 280 },
  { id: "quadriceps_sx", groupId: "quadriceps", view: "front", side: "sx", x: 500, y: 630, w: 100, h: 280 },
  { id: "tibialis_anterior_dx", groupId: "tibialis_anterior", view: "front", side: "dx", x: 410, y: 950, w: 75, h: 220 },
  { id: "tibialis_anterior_sx", groupId: "tibialis_anterior", view: "front", side: "sx", x: 515, y: 950, w: 75, h: 220 },

  // --- RETRO ---
  { id: "trapezius_c", groupId: "trapezius", view: "back", side: "c", x: 400, y: 260, w: 200, h: 140 },
  { id: "deltoid_posterior_sx", groupId: "deltoid_posterior", view: "back", side: "sx", x: 270, y: 270, w: 90, h: 90 },
  { id: "deltoid_posterior_dx", groupId: "deltoid_posterior", view: "back", side: "dx", x: 640, y: 270, w: 90, h: 90 },
  { id: "triceps_brachii_sx", groupId: "triceps_brachii", view: "back", side: "sx", x: 250, y: 360, w: 80, h: 130 },
  { id: "triceps_brachii_dx", groupId: "triceps_brachii", view: "back", side: "dx", x: 670, y: 360, w: 80, h: 130 },
  { id: "forearm_extensors_sx", groupId: "forearm_extensors", view: "back", side: "sx", x: 220, y: 490, w: 75, h: 140 },
  { id: "forearm_extensors_dx", groupId: "forearm_extensors", view: "back", side: "dx", x: 705, y: 490, w: 75, h: 140 },
  { id: "latissimus_dorsi_sx", groupId: "latissimus_dorsi", view: "back", side: "sx", x: 370, y: 390, w: 90, h: 170 },
  { id: "latissimus_dorsi_dx", groupId: "latissimus_dorsi", view: "back", side: "dx", x: 540, y: 390, w: 90, h: 170 },
  { id: "erector_spinae_c", groupId: "erector_spinae", view: "back", side: "c", x: 440, y: 420, w: 120, h: 220 },
  { id: "gluteus_maximus_sx", groupId: "gluteus_maximus", view: "back", side: "sx", x: 400, y: 650, w: 100, h: 100 },
  { id: "gluteus_maximus_dx", groupId: "gluteus_maximus", view: "back", side: "dx", x: 500, y: 650, w: 100, h: 100 },
  { id: "hamstrings_sx", groupId: "hamstrings", view: "back", side: "sx", x: 400, y: 750, w: 100, h: 230 },
  { id: "hamstrings_dx", groupId: "hamstrings", view: "back", side: "dx", x: 500, y: 750, w: 100, h: 230 },
  { id: "gastrocnemius_sx", groupId: "gastrocnemius", view: "back", side: "sx", x: 405, y: 990, w: 90, h: 140 },
  { id: "gastrocnemius_dx", groupId: "gastrocnemius", view: "back", side: "dx", x: 505, y: 990, w: 90, h: 140 },
  { id: "soleus_sx", groupId: "soleus", view: "back", side: "sx", x: 405, y: 1130, w: 90, h: 90 },
  { id: "soleus_dx", groupId: "soleus", view: "back", side: "dx", x: 505, y: 1130, w: 90, h: 90 },
];

export function hotspotsForView(view: View2D): Hotspot2D[] {
  return hotspots2D.filter((h) => h.view === view);
}

export function findHotspot(id: string): Hotspot2D | undefined {
  return hotspots2D.find((h) => h.id === id);
}
