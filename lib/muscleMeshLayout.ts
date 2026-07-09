export type Side = "l" | "r" | "c";
export type Region = "shoulder" | "torso" | "hip" | "none";

export interface MuscleMeshDef {
  id: string;
  groupId: string;
  side: Side;
  region: Region;
  /** unsigned x offset from centerline; mirrored for l/r, ignored (must be 0) for c */
  x: number;
  y: number;
  z: number;
  size: [number, number, number];
  rotationZ?: number;
}

// Base humanoid rig, standing, arms relaxed at sides. Units ~ meters, origin at floor between feet.
const defs: MuscleMeshDef[] = [
  // shoulders / arms - front
  { id: "deltoid_anterior", groupId: "deltoid_anterior", side: "r", region: "shoulder", x: 0.235, y: 1.3, z: 0.09, size: [0.09, 0.09, 0.06] },
  { id: "pectoralis_major", groupId: "pectoralis_major", side: "c", region: "shoulder", x: 0, y: 1.28, z: 0.16, size: [0.32, 0.12, 0.07] },
  { id: "biceps_brachii", groupId: "biceps_brachii", side: "r", region: "shoulder", x: 0.27, y: 1.13, z: 0.07, size: [0.075, 0.15, 0.055] },
  { id: "forearm_flexors", groupId: "forearm_flexors", side: "r", region: "shoulder", x: 0.3, y: 0.9, z: 0.06, size: [0.065, 0.15, 0.05] },
  // torso - front
  { id: "rectus_abdominis", groupId: "rectus_abdominis", side: "c", region: "torso", x: 0, y: 1.02, z: 0.17, size: [0.15, 0.25, 0.055] },
  { id: "obliques", groupId: "obliques", side: "r", region: "torso", x: 0.15, y: 1.03, z: 0.14, size: [0.06, 0.21, 0.05] },
  { id: "hip_flexors", groupId: "hip_flexors", side: "c", region: "hip", x: 0, y: 0.82, z: 0.16, size: [0.18, 0.09, 0.05] },
  // legs - front
  { id: "adductors", groupId: "adductors", side: "r", region: "hip", x: 0.08, y: 0.55, z: 0.08, size: [0.07, 0.21, 0.05] },
  { id: "quadriceps", groupId: "quadriceps", side: "r", region: "hip", x: 0.12, y: 0.55, z: 0.09, size: [0.12, 0.33, 0.065] },
  { id: "tibialis_anterior", groupId: "tibialis_anterior", side: "r", region: "hip", x: 0.12, y: 0.16, z: 0.065, size: [0.065, 0.27, 0.045] },

  // shoulders / arms - back
  { id: "trapezius", groupId: "trapezius", side: "c", region: "shoulder", x: 0, y: 1.35, z: -0.14, size: [0.22, 0.17, 0.06] },
  { id: "deltoid_posterior", groupId: "deltoid_posterior", side: "r", region: "shoulder", x: 0.235, y: 1.3, z: -0.09, size: [0.09, 0.09, 0.06] },
  { id: "triceps_brachii", groupId: "triceps_brachii", side: "r", region: "shoulder", x: 0.27, y: 1.13, z: -0.07, size: [0.075, 0.15, 0.055] },
  { id: "forearm_extensors", groupId: "forearm_extensors", side: "r", region: "shoulder", x: 0.3, y: 0.9, z: -0.06, size: [0.065, 0.15, 0.05] },
  // torso - back
  { id: "latissimus_dorsi", groupId: "latissimus_dorsi", side: "r", region: "torso", x: 0.14, y: 1.08, z: -0.14, size: [0.095, 0.21, 0.055] },
  { id: "erector_spinae", groupId: "erector_spinae", side: "c", region: "torso", x: 0, y: 0.95, z: -0.16, size: [0.11, 0.23, 0.05] },
  // legs - back
  { id: "gluteus_maximus", groupId: "gluteus_maximus", side: "r", region: "hip", x: 0.1, y: 0.78, z: -0.12, size: [0.12, 0.15, 0.065] },
  { id: "hamstrings", groupId: "hamstrings", side: "r", region: "hip", x: 0.12, y: 0.55, z: -0.09, size: [0.105, 0.31, 0.065] },
  { id: "gastrocnemius", groupId: "gastrocnemius", side: "r", region: "hip", x: 0.12, y: 0.2, z: -0.075, size: [0.075, 0.17, 0.055] },
  { id: "soleus", groupId: "soleus", side: "r", region: "hip", x: 0.12, y: 0.08, z: -0.065, size: [0.065, 0.1, 0.045] },
];

// Mirror right-side defs onto left, keep single-side ("c") as is.
export function buildMuscleMeshes(): MuscleMeshDef[] {
  const out: MuscleMeshDef[] = [];
  for (const d of defs) {
    if (d.side === "c") {
      out.push({ ...d, id: `${d.id}_c` });
    } else {
      out.push({ ...d, id: `${d.id}_r` });
      out.push({ ...d, id: `${d.id}_l`, side: "l" });
    }
  }
  return out;
}

export const shoulderFactor = { M: 1.08, F: 0.92 };
export const hipFactor = { M: 0.92, F: 1.1 };
export const torsoFactor = { M: 1.0, F: 0.94 };

export function resolveX(d: MuscleMeshDef, sex: "M" | "F"): number {
  const factor = d.region === "shoulder" ? shoulderFactor[sex] : d.region === "hip" ? hipFactor[sex] : d.region === "torso" ? torsoFactor[sex] : 1;
  const magnitude = d.x * factor;
  return d.side === "l" ? -magnitude : magnitude;
}
