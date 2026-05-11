import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  varying vec2 vUv;

  // Cheap value noise from sin/cos sums — enough for ambient gradient flow
  float n(vec2 p) {
    return sin(p.x * 1.3) * cos(p.y * 1.7)
         + sin(p.x * 2.1 + 1.0) * cos(p.y * 0.9 + 0.5) * 0.5;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.07;
    vec2 p  = uv * 2.6;

    float a = n(p + vec2(t,        t * 0.7));
    float b = n(p * 1.7 + vec2(-t * 0.5, t * 1.1));
    float c = n(p * 0.6 + vec2(t * 0.3, -t * 0.4));

    vec3 cream  = vec3(0.984, 0.969, 0.929); // #fbfaf6
    vec3 peach  = vec3(1.000, 0.890, 0.770);
    vec3 orange = vec3(1.000, 0.500, 0.250);
    vec3 line   = vec3(0.961, 0.949, 0.918); // #e6e3da

    vec3 col = cream;
    col = mix(col, peach,  smoothstep(-0.5, 0.7, a) * 0.85);
    col = mix(col, orange, smoothstep( 0.3, 1.5, b * c) * 0.18);
    col = mix(col, line,   smoothstep(-1.0, 0.5, c) * 0.22);

    // Soft fade toward bottom so content reads cleanly
    float fade = smoothstep(0.05, 0.55, uv.y);
    col = mix(cream, col, fade);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function GradientPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function ShaderGradient() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <GradientPlane />
    </Canvas>
  );
}
