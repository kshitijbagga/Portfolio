import { useRef, useMemo } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// Extend THREE with custom shader material
const DendriteGlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.6,
    uColor: new THREE.Color('#8338ec'),
  },
  // Vertex shader
  `
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying float vGlowIntensity;
    
    uniform float uTime;
    
    void main() {
      vPosition = position;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      
      float pulse = sin(uTime * 2.0 + position.x * 0.5) * 0.5 + 0.5;
      vGlowIntensity = pulse;
      
      vec4 mvPosition = viewMatrix * worldPos;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying float vGlowIntensity;
    
    uniform float uTime;
    uniform float uOpacity;
    uniform vec3 uColor;
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec3 glowColor = uColor * (1.0 + vGlowIntensity * 0.5);
      float noiseVal = noise(vWorldPosition.xz * 2.0 + uTime * 0.1);
      glowColor += vec3(noiseVal * 0.2);
      
      float dist = length(vPosition.xy);
      float glow = exp(-dist * 2.0);
      float pulse = sin(uTime * 3.0) * 0.3 + 0.7;
      
      vec3 finalColor = glowColor * glow * pulse;
      float finalOpacity = uOpacity * (0.6 + vGlowIntensity * 0.4);
      
      gl_FragColor = vec4(finalColor, finalOpacity);
    }
  `
);

extend({ DendriteGlowMaterial });

interface DendriteGlowProps {
  position?: [number, number, number];
  color?: string;
  opacity?: number;
  scale?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dendriteGlowMaterial: any;
    }
  }
}

export default function DendriteGlow({ 
  position = [0, 0, 0], 
  color = '#8338ec', 
  opacity = 0.6,
  scale = 1 
}: DendriteGlowProps) {
  const materialRef = useRef<any>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });
  
  const uniformColor = useMemo(() => new THREE.Color(color), [color]);
  
  return (
    <mesh position={position} scale={[scale, scale, scale]}>
      <sphereGeometry args={[1, 32, 32]} />
      <primitive 
        object={new (DendriteGlowMaterial as any)({
          uOpacity: opacity,
          uColor: uniformColor,
          transparent: true,
        })}
        ref={materialRef}
      />
    </mesh>
  );
}
