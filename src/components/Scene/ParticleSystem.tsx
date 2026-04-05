import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  animateUpward?: boolean;
  glowIntensity?: number;
}

export default function ParticleSystem({ 
  count = 320, 
  animateUpward = true,
  glowIntensity = 1.0 
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate stable particle data with more variety
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => {
      // Distribute particles in a vertical cylinder around the dendrite
      const angle  = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 5.5;
      const y      = Math.random() * 10 - 1;

      // Add orbital motion parameters
      const orbitSpeed = 0.001 + Math.random() * 0.002;
      const orbitDirection = Math.random() > 0.5 ? 1 : -1;

      // Each particle gets a random drift direction and speed
      return {
        x:      Math.cos(angle) * radius,
        y,
        z:      Math.sin(angle) * radius,
        speedX: (Math.random() - 0.5) * 0.004,
        speedY: animateUpward ? (0.003 + Math.random() * 0.006) : 0,
        speedZ: (Math.random() - 0.5) * 0.004,
        phase:  Math.random() * Math.PI * 2,
        size:   0.02 + Math.random() * 0.04,
        colorIndex: 0, // All white
        orbitSpeed,
        orbitDirection,
        baseRadius: radius,
        baseAngle: angle,
      };
    });
  }, [count, animateUpward]);

  // Pre-allocate reusables
  const dummy    = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  // Set initial colors (once)
  const colorsInitialized = useRef(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Init colors on first frame with glow intensity - WHITE PARTICLES
    if (!colorsInitialized.current) {
      particles.forEach((_, i) => {
        colorObj.set('#ffffff'); // Force white
        meshRef.current!.setColorAt(i, colorObj);
      });
      meshRef.current.instanceColor!.needsUpdate = true;
      colorsInitialized.current = true;
    }

    particles.forEach((p, i) => {
      // Orbital motion around the central axis
      const currentAngle = p.baseAngle + t * p.orbitSpeed * p.orbitDirection;
      const orbitRadius = p.baseRadius + Math.sin(t * 0.2 + p.phase) * 0.3;
      
      // Drift with gentle sine-wave wobble
      const x = Math.cos(currentAngle) * orbitRadius + Math.sin(t * 0.3 + p.phase) * 0.4;
      const z = Math.sin(currentAngle) * orbitRadius + Math.cos(t * 0.25 + p.phase * 1.3) * 0.4;

      // Y wraps: particles drift upward and reset at bottom
      let y: number;
      if (animateUpward) {
        const rawY = p.y + (t * p.speedY * 60) % 12;
        y = ((rawY + 1) % 12) - 1;  // loop between -1 and 11
      } else {
        y = p.y + Math.sin(t * 0.5 + p.phase) * 0.5;  // gentle floating
      }

      // Pulsing size with glow intensity
      const pulse = 0.8 + Math.sin(t * 1.5 + p.phase) * 0.2;
      const size = p.size * pulse * glowIntensity;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(size);
      dummy.rotation.set(p.phase, p.phase * 1.5, p.phase * 0.5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        emissive="#ffffff"
        emissiveIntensity={0.8 * glowIntensity}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
