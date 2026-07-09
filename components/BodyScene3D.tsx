"use client";

import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { buildMuscleMeshes, resolveX, shoulderFactor, hipFactor } from "@/lib/muscleMeshLayout";
import { muscleGroups } from "@/lib/muscleGroups";

export type Sex = "M" | "F";

export interface HoverInfo {
  groupId: string;
  side: "l" | "r" | "c";
  x: number;
  y: number;
}

interface SceneProps {
  sex: Sex;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onHover: (info: HoverInfo | null) => void;
}

function BaseRig({ sex }: { sex: Sex }) {
  const sf = shoulderFactor[sex];
  const hf = hipFactor[sex];
  const skin = "#d9cfc3";

  return (
    <group>
      <mesh position={[0, 1.62, 0]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.49, 0]}>
        <capsuleGeometry args={[0.045, 0.06, 4, 8]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <capsuleGeometry args={[0.165, 0.42, 4, 12]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.17 * hf, 0.14, 4, 12]} />
        <meshStandardMaterial color={skin} roughness={0.85} />
      </mesh>
      {[1, -1].map((s) => (
        <group key={`arm-${s}`}>
          <mesh position={[s * 0.26 * sf, 1.28, 0]} rotation={[0, 0, s * 0.08]}>
            <capsuleGeometry args={[0.055, 0.26, 4, 8]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
          <mesh position={[s * 0.3 * sf, 0.98, 0.02]}>
            <capsuleGeometry args={[0.045, 0.24, 4, 8]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
          <mesh position={[s * 0.32 * sf, 0.79, 0.03]}>
            <capsuleGeometry args={[0.032, 0.06, 4, 8]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
        </group>
      ))}
      {[1, -1].map((s) => (
        <group key={`leg-${s}`}>
          <mesh position={[s * 0.12 * hf, 0.55, 0]}>
            <capsuleGeometry args={[0.09, 0.4, 4, 10]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
          <mesh position={[s * 0.12 * hf, 0.16, 0]}>
            <capsuleGeometry args={[0.06, 0.36, 4, 10]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
          <mesh position={[s * 0.12 * hf, -0.03, 0.05]}>
            <boxGeometry args={[0.09, 0.06, 0.2]} />
            <meshStandardMaterial color={skin} roughness={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function MusclePads({ sex, selected, onToggle, onHover }: SceneProps) {
  const meshes = useMemo(() => buildMuscleMeshes(), []);

  return (
    <group>
      {meshes.map((d) => {
        const isSelected = selected.has(d.id);
        const x = resolveX(d, sex);
        const handleOver = (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover({
            groupId: d.groupId,
            side: d.side,
            x: e.nativeEvent.clientX,
            y: e.nativeEvent.clientY,
          });
          document.body.style.cursor = "pointer";
        };
        const handleOut = (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover(null);
          document.body.style.cursor = "auto";
        };
        const handleClick = (e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onToggle(d.id);
        };
        return (
          <mesh
            key={d.id}
            position={[x, d.y, d.z]}
            onPointerOver={handleOver}
            onPointerOut={handleOut}
            onPointerMove={handleOver}
            onClick={handleClick}
          >
            <boxGeometry args={d.size} />
            <meshStandardMaterial
              color={isSelected ? "#b5482e" : "#8f6a52"}
              transparent
              opacity={isSelected ? 0.95 : 0.55}
              emissive={isSelected ? "#7a2f1c" : "#000000"}
              emissiveIntensity={isSelected ? 0.25 : 0}
              roughness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function BodyScene3D(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.1, 2.2], fov: 40 }}
      gl={{ antialias: true }}
      className="touch-none"
    >
      <color attach="background" args={["#f4f1ec"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} />
      <directionalLight position={[-2, 2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <BaseRig sex={props.sex} />
        <MusclePads {...props} />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={1.2}
        maxDistance={3.5}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 1.0, 0]}
        enableDamping
        dampingFactor={0.12}
      />
    </Canvas>
  );
}

export { muscleGroups };
