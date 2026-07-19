import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight } from '@phosphor-icons/react';
import { profile } from '../data/profile';

type Project = (typeof profile.projects)[number];

function ProductCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Stack each card slightly down + back from the previous one
  const offset = index - (total - 1) / 2;
  const baseY = -offset * 0.55;
  const baseZ = -index * 0.18;
  const baseRot = -0.05 + index * 0.025;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle per-card float
    groupRef.current.position.y =
      baseY + Math.sin(t * 0.5 + index * 1.3) * 0.04;

    // Hover scale + lift
    const targetScale = hovered ? 1.06 : 1;
    const targetZ = hovered ? baseZ + 0.35 : baseZ;
    groupRef.current.scale.x = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.12
    );
    groupRef.current.scale.y = THREE.MathUtils.lerp(
      groupRef.current.scale.y,
      targetScale,
      0.12
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.12
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0, baseY, baseZ]}
      rotation={[0, 0, baseRot]}
    >
      <RoundedBox
        args={[2.7, 1.55, 0.08]}
        radius={0.1}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(project.url, '_blank', 'noreferrer');
        }}
      >
        <meshStandardMaterial
          color={hovered ? '#ff5722' : '#fbfaf6'}
          roughness={0.4}
          metalness={0.05}
        />
      </RoundedBox>
      <Html
        position={[0, 0, 0.05]}
        transform
        occlude={false}
        zIndexRange={[0, 0]}
        style={{ pointerEvents: 'none' }}
        distanceFactor={1.3}
      >
        <div
          className={`flex w-[260px] flex-col justify-between gap-3 select-none ${
            hovered ? 'text-white' : 'text-ink'
          }`}
          style={{ minHeight: '120px', padding: '14px 18px' }}
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">
              {project.tag}
            </div>
            <div className="font-display text-[28px] leading-[1.05] mt-1.5">
              {project.name}
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] opacity-70">
            <span>{project.role}</span>
            <ArrowUpRight size={13} weight="bold" aria-hidden />
          </div>
        </div>
      </Html>
    </group>
  );
}

function CardStack() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useThree((state) => state.mouse);

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth parallax tilt with the cursor
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.28,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.18,
      0.06
    );
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {profile.projects.map((p, i) => (
        <ProductCard
          key={p.key}
          project={p}
          index={i}
          total={profile.projects.length}
        />
      ))}
    </group>
  );
}

export default function ProductStack() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.0} />
        <directionalLight
          position={[-3, -2, 3]}
          intensity={0.45}
          color="#ffd6c2"
        />
        <CardStack />
      </Canvas>
    </div>
  );
}
