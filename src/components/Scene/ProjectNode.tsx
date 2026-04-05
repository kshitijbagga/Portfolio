import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Project, NodeSize } from '../../types';

const sizeMap: Record<NodeSize, number> = {
  small: 0.12,
  medium: 0.2,
  large: 0.28,
  featured: 0.42,
};

// Geometry types for variety
const getGeometry = (size: NodeSize, radius: number) => {
  if (size === 'featured') return <dodecahedronGeometry args={[radius, 0]} />;
  if (size === 'large') return <octahedronGeometry args={[radius, 0]} />;
  return <sphereGeometry args={[radius, 16, 16]} />;
};

interface ProjectNodeProps {
  project: Project;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  dimmed?: boolean;
}

export default function ProjectNode({ project, onHover, onClick, dimmed = false }: ProjectNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const radius = sizeMap[project.size];

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    const t = state.clock.elapsedTime;

    // Click animation decay
    if (clicked) {
      setClicked(false);
    }

    // Smooth scale with click burst
    let targetScale = hovered ? 1.2 : 1.0;
    if (clicked) targetScale = 1.4;
    
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      clicked ? 0.3 : 0.12
    );

    // Rotation animation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.015;

    // Featured pulse (only when not dimmed)
    if (project.featured && !dimmed) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.06;
      meshRef.current.scale.multiplyScalar(pulse);
    }

    // Glow intensity with color shift on hover
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (dimmed) {
      mat.emissiveIntensity = 0.05;
      mat.opacity = 0.2;
    } else {
      mat.emissiveIntensity = hovered
        ? 0.9
        : project.featured
        ? 0.5 + Math.sin(t * 2) * 0.15
        : 0.3;
      mat.opacity = hovered ? 1 : 0.95;
      
      // Subtle color shift on hover
      const hoverColor = new THREE.Color(project.color).lerp(new THREE.Color('#ffffff'), hovered ? 0.2 : 0);
      mat.color.lerp(hoverColor, 0.1);
    }

    // Glow sphere with pulsing
    const glowMat = glowRef.current.material as THREE.MeshStandardMaterial;
    const pulseGlow = Math.sin(t * 3) * 0.05 + 0.04;
    glowMat.opacity = dimmed ? 0.01 : hovered ? 0.15 : pulseGlow;
    
    // Expand glow on hover (reduced size)
    const targetGlowScale = hovered ? 1.8 : 1.4;
    glowRef.current.scale.lerp(
      new THREE.Vector3(targetGlowScale, targetGlowScale, targetGlowScale),
      0.1
    );
  });

  return (
    <group position={project.position}>
      {/* Glow halo - reduced size */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[radius * 1.4, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Main node */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(project.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover(null);
          document.body.style.cursor = 'crosshair';
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          setClicked(true);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(project.id);
        }}
      >
        {getGeometry(project.size, radius)}
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Hover tooltip - now clickable */}
      {hovered && (
        <Html center distanceFactor={12} zIndexRange={[10, 0]}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClick(project.id);
            }}
            style={{
              background: 'rgba(10, 15, 26, 0.95)',
              border: `1px solid ${project.color}44`,
              borderLeft: `2px solid ${project.color}`,
              padding: '8px 12px',
              borderRadius: '4px',
              pointerEvents: 'auto',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
              boxShadow: `0 4px 12px ${project.color}22`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(10, 15, 26, 0.98)`;
              e.currentTarget.style.borderColor = project.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(10, 15, 26, 0.95)';
              e.currentTarget.style.borderColor = `${project.color}44`;
            }}
          >
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: project.color, marginBottom: '2px' }}>
              {project.timeframe}
            </div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px', color: '#e8f7fc', maxWidth: '200px', whiteSpace: 'normal', lineHeight: 1.4 }}>
              {project.title}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
