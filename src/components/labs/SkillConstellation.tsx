import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { profile } from '../../data/profile';
import { projectStations } from '../../data/projectStations';

const ACCENT = '#ff5722';
const ACCENT_DIM = '#7a3016';

/** Evenly distributes N points on a sphere (golden-angle spiral). */
function fibonacciSphere(count: number, radius: number) {
  const points: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

type Node = { name: string; position: [number, number, number] };

function nearestNeighborPairs(nodes: Node[], maxLinksPerNode = 2) {
  const pairs: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((n, i) => {
    const distances = nodes
      .map((other, j) => ({ j, d: new THREE.Vector3(...n.position).distanceTo(new THREE.Vector3(...other.position)) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, maxLinksPerNode);
    distances.forEach(({ j }) => {
      const key = [i, j].sort().join('-');
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push([i, j]);
      }
    });
  });
  return pairs;
}

// Short glyphs instead of a bare dot — gives every node a distinct
// silhouette at a glance instead of a field of identical orange marbles.
const SKILL_GLYPH: Record<string, string> = {
  'Engineering Leadership': '◆',
  '0→1 Product Delivery': '→',
  'AI / LLM Integration': '✳',
  'Platform Scale': '▲',
  'MERN / MEAN Stack': '{ }',
  'Node.js': '⬡',
  React: '⚛',
  TypeScript: 'TS',
  'AWS / Linux': '☁',
  'Growth Platforms': '↗',
  'Team Leadership': '◈',
  'System Architecture': '▦',
};

function SkillNode({ node, showLabel }: { node: Node; showLabel: boolean }) {
  const [hovered, setHovered] = useState(false);
  const active = showLabel || hovered;
  return (
    <group position={node.position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={hovered ? 1.4 : 0.7}
          roughness={0.4}
        />
      </mesh>
      <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
        <div
          className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-black/70 py-1 pl-1.5 pr-2.5 backdrop-blur-sm transition-[opacity,transform] duration-200"
          style={{
            opacity: active ? 1 : 0,
            transform: `scale(${active ? 1 : 0.9})`,
          }}
        >
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#ff5722]/20 text-[9px] font-medium text-[#ff8a4a]">
            {SKILL_GLYPH[node.name] ?? '•'}
          </span>
          <span className="text-[10px] tracking-wide text-white/90">{node.name}</span>
        </div>
      </Html>
    </group>
  );
}

function ProjectStationMesh({
  position,
  color,
  logo,
  name,
  active,
}: {
  position: [number, number, number];
  color: string;
  logo: string;
  name: string;
  active: boolean;
}) {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (glowRef.current) {
      glowRef.current.rotation.y += delta * 0.15;
      const targetScale = active ? 1.5 : 1;
      glowRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    }
  });

  return (
    <group position={position}>
      <Line points={[[0, 0, 0], [-position[0] * 0.55, -position[1] * 0.55, -position[2] * 0.55]]} color={color} transparent opacity={0.18} lineWidth={1} />
      {/* Ambient glow "pedestal" behind the plaque — gives the flat logo card real depth in the scene */}
      <mesh ref={glowRef}>
        <icosahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.9 : 0.35} roughness={0.5} transparent opacity={0.35} />
      </mesh>
      <Html center distanceFactor={7} style={{ pointerEvents: 'none' }}>
        <div
          className="flex flex-col items-center gap-2 transition-transform duration-300"
          style={{ transform: `scale(${active ? 1.15 : 1})` }}
        >
          <div
            className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border bg-black/70 p-2.5 backdrop-blur-sm"
            style={{ borderColor: `${color}55`, boxShadow: active ? `0 0 24px ${color}66` : 'none' }}
          >
            <img src={logo} alt="" className="h-full w-full object-contain" />
          </div>
          {active && (
            <span className="whitespace-nowrap rounded-full bg-black/70 px-2.5 py-1 text-[10px] tracking-wide text-white/90 backdrop-blur-sm">
              {name}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

function Constellation({
  cameraRef,
  activeKey,
}: {
  cameraRef?: React.MutableRefObject<{ position: [number, number, number]; target: [number, number, number] }>;
  activeKey?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useThree((s) => s.mouse);
  const { camera } = useThree();

  const nodes: Node[] = useMemo(
    () =>
      fibonacciSphere(profile.skills.length, 2.4).map((position, i) => ({
        name: profile.skills[i],
        position,
      })),
    []
  );
  const links = useMemo(() => nearestNeighborPairs(nodes, 2), [nodes]);

  useFrame((_, delta) => {
    // Once the scroll rig is driving the camera, the group must stay put —
    // waypoints target fixed world positions, and a drifting rotation would
    // slowly point the camera at empty space instead of a project station.
    if (groupRef.current && !cameraRef) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        groupRef.current.rotation.y + mouse.x * 0.05,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.15, 0.03);
    }

    if (cameraRef?.current) {
      const targetPos = new THREE.Vector3(...cameraRef.current.position);
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(...cameraRef.current.target);
    }
  });

  return (
    <group ref={groupRef}>
      {links.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodes[a].position, nodes[b].position]}
          color={ACCENT_DIM}
          transparent
          opacity={0.5}
          lineWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <SkillNode key={n.name} node={n} showLabel={i % 3 === 0} />
      ))}
      {projectStations.map((s) => (
        <ProjectStationMesh
          key={s.key}
          position={s.position}
          color={s.color}
          logo={s.logo}
          name={profile.projects.find((p) => p.key === s.key)?.name ?? s.key}
          active={activeKey === s.key}
        />
      ))}
    </group>
  );
}

export default function SkillConstellation({
  cameraRef,
  interactive = true,
  activeKey,
}: {
  cameraRef?: React.MutableRefObject<{ position: [number, number, number]; target: [number, number, number] }>;
  interactive?: boolean;
  activeKey?: string;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={40} color={ACCENT} />
        <Constellation cameraRef={interactive ? cameraRef : undefined} activeKey={activeKey} />
      </Canvas>
    </div>
  );
}
