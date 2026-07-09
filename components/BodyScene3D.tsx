"use client";

import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useState } from "react";
import { buildMuscleMeshes, resolveX, shoulderFactor, hipFactor, type MuscleMeshDef } from "@/lib/muscleMeshLayout";
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

const skin = "#e0d3c4";

function Limb({
  args,
  position,
  rotation,
}: {
  args: [number, number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <capsuleGeometry args={args} />
      <meshStandardMaterial color={skin} roughness={0.55} metalness={0.03} />
    </mesh>
  );
}

function BaseRig({ sex }: { sex: Sex }) {
  const sf = shoulderFactor[sex];
  const hf = hipFactor[sex];

  return (
    <group>
      <mesh position={[0, 1.62, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.55} metalness={0.03} />
      </mesh>
      <Limb args={[0.045, 0.06, 8, 16]} position={[0, 1.49, 0]} />
      <Limb args={[0.165, 0.42, 8, 20]} position={[0, 1.15, 0]} />
      <Limb args={[0.17 * hf, 0.14, 8, 20]} position={[0, 0.8, 0]} />
      {[1, -1].map((s) => (
        <group key={`arm-${s}`}>
          <Limb args={[0.055, 0.26, 8, 16]} position={[s * 0.26 * sf, 1.28, 0]} rotation={[0, 0, s * 0.08]} />
          <Limb args={[0.045, 0.24, 8, 16]} position={[s * 0.3 * sf, 0.98, 0.02]} />
          <Limb args={[0.032, 0.06, 8, 16]} position={[s * 0.32 * sf, 0.79, 0.03]} />
        </group>
      ))}
      {[1, -1].map((s) => (
        <group key={`leg-${s}`}>
          <Limb args={[0.09, 0.4, 8, 18]} position={[s * 0.12 * hf, 0.55, 0]} />
          <Limb args={[0.06, 0.36, 8, 18]} position={[s * 0.12 * hf, 0.16, 0]} />
          <RoundedBox
            args={[0.09, 0.06, 0.2]}
            radius={0.025}
            position={[s * 0.12 * hf, -0.03, 0.05]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={skin} roughness={0.55} metalness={0.03} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

function MusclePad({
  d,
  x,
  isSelected,
  onToggle,
  onHover,
}: {
  d: MuscleMeshDef;
  x: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onHover: (info: HoverInfo | null) => void;
}) {
  const [hovering, setHovering] = useState(false);

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovering(true);
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
    setHovering(false);
    onHover(null);
    document.body.style.cursor = "auto";
  };
  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onToggle(d.id);
  };

  const opacity = isSelected ? 0.92 : hovering ? 0.55 : 0.14;
  const color = isSelected ? "#b5482e" : hovering ? "#a17a5c" : "#8f6a52";

  return (
    <RoundedBox
      args={d.size}
      radius={Math.min(...d.size) * 0.35}
      smoothness={4}
      position={[x, d.y, d.z]}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onPointerMove={handleOver}
      onClick={handleClick}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        emissive={isSelected ? "#7a2f1c" : "#000000"}
        emissiveIntensity={isSelected ? 0.2 : 0}
        roughness={0.5}
      />
    </RoundedBox>
  );
}

function MusclePads({ sex, selected, onToggle, onHover }: SceneProps) {
  const meshes = useMemo(() => buildMuscleMeshes(), []);

  return (
    <group>
      {meshes.map((d) => (
        <MusclePad
          key={d.id}
          d={d}
          x={resolveX(d, sex)}
          isSelected={selected.has(d.id)}
          onToggle={onToggle}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

export default function BodyScene3D(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ position: [0, 1.15, 2.1], fov: 36 }}
      gl={{ antialias: true }}
      className="touch-none"
    >
      <color attach="background" args={["#efece5"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[2.5, 4, 2.5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-2, 1.5, -2]} intensity={0.3} />
      <Suspense fallback={null}>
        <BaseRig sex={props.sex} />
        <MusclePads {...props} />
        <Environment preset="apartment" environmentIntensity={0.5} />
        <ContactShadows position={[0, -0.06, 0]} opacity={0.45} scale={2.2} blur={2.2} far={1.2} />
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
