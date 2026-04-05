import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Holographic Grid Shader Material
const HolographicGridMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#00f0ff'),
    uOpacity: 0.4,
    uFadeDistance: 15.0,
    uGridSpacing: 1.0,
  },
  // Vertex shader
  `
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vGridLine;
    varying float vDistance;
    
    uniform float uTime;
    uniform float uGridSpacing;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Calculate distance from center for fade effect
      vDistance = length(position.xz);
      
      // Grid line calculation using fract for cleaner lines
      float gridX = fract(position.x / uGridSpacing);
      float gridZ = fract(position.z / uGridSpacing);
      
      // Create thin grid lines using fwidth for proper anti-aliasing
      float gridXLine = min(gridX, 1.0 - gridX);
      float gridZLine = min(gridZ, 1.0 - gridZ);
      
      // Combine with smooth anti-aliased edges
      float lineThickness = 0.02;
      vGridLine = 1.0 - smoothstep(lineThickness, 0.0, min(gridXLine, gridZLine));
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vGridLine;
    varying float vDistance;
    
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uFadeDistance;
    
    void main() {
      // Distance-based fade
      float fade = smoothstep(uFadeDistance, uFadeDistance * 0.5, vDistance);
      
      // Grid line alpha with fade
      float alpha = vGridLine * uOpacity * fade;
      
      // Add subtle glow
      float glow = vGridLine * exp(-vDistance * 0.2) * 0.5;
      
      vec3 finalColor = uColor + vec3(glow);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

extend({ HolographicGridMaterial });

interface HolographicGridProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  opacity?: number;
  size?: number;
  gridSpacing?: number;
}

export default function HolographicGrid({ 
  position = [0, -2, 0], 
  rotation = [-Math.PI / 2, 0, 0],
  color = '#00f0ff', 
  opacity = 0.4,
  size = 40,
  gridSpacing = 1.0
}: HolographicGridProps) {
  const materialRef = useRef<any>(null);
  const materialInstance = useMemo(() => new HolographicGridMaterial(), []);
  
  // Create color once
  const uniformColor = useMemo(() => new THREE.Color(color), []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uOpacity = opacity;
      materialRef.current.uGridSpacing = gridSpacing;
      materialRef.current.uColor.copy(uniformColor);
    }
  });
  
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[size, size, 64, 64]} />
      <primitive object={materialInstance} ref={materialRef} />
    </mesh>
  );
}
