import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Nucleus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.05;
      meshRef.current.scale.setScalar(pulse);
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = t * 0.15;
    }
    if (glowRef.current) {
      const glow = 1 + Math.sin(t * 1.8 + 0.5) * 0.12;
      glowRef.current.scale.setScalar(glow);
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 1.8) * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#8338ec"
          emissive="#8338ec"
          emissiveIntensity={0.35}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.45, 2]} />
        <meshStandardMaterial
          color="#8338ec"
          emissive="#8338ec"
          emissiveIntensity={0.6}
          wireframe={false}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Inner wireframe for crystalline look */}
      <mesh>
        <icosahedronGeometry args={[0.47, 2]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Point light at nucleus */}
      <pointLight color="#8338ec" intensity={3} distance={4} decay={2} />
    </group>
  );
}
