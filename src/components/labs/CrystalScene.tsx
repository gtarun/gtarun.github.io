import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Crystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useThree((s) => s.mouse);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18;
      meshRef.current.rotation.x += delta * 0.06;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.4, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={512}
            transmission={1}
            roughness={0.05}
            thickness={0.6}
            ior={1.5}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.1}
            distortionScale={0.4}
            temporalDistortion={0.2}
            color="#fff5ec"
            attenuationDistance={1.5}
            attenuationColor="#ff8a4a"
          />
        </mesh>
      </Float>
      {/* Soft accent shapes behind for the crystal to refract */}
      <mesh position={[1.2, -0.8, -2]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#ff5722" roughness={0.4} />
      </mesh>
      <mesh position={[-1.4, 0.6, -2.4]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffd6c2" roughness={0.5} />
      </mesh>
      <mesh position={[0.4, 1.4, -2.6]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#fbfaf6" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function CrystalScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <directionalLight
          position={[-3, -2, 3]}
          intensity={0.5}
          color="#ffd6c2"
        />
        <Environment preset="apartment" />
        <Crystal />
      </Canvas>
    </div>
  );
}
