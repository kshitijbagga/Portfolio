import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import type { ActiveStage } from '../../hooks/useCameraAnimation';

// Map world XZ coords → minimap pixel coords
const MAP_SIZE = 130;
const WORLD_RANGE = 14; // world units visible (-7 to +7 in X and Z)
const CENTER = MAP_SIZE / 2;

function worldToMap(x: number, z: number): [number, number] {
  const px = CENTER + (x / WORLD_RANGE) * MAP_SIZE * 0.9;
  const py = CENTER + (z / WORLD_RANGE) * MAP_SIZE * 0.9;
  return [px, py];
}

interface MiniMapProps {
  cameraX: number;
  cameraZ: number;
  activeStage: ActiveStage;
  onStageHover?: (stage: ActiveStage | null) => void;
}

export default function MiniMap({ cameraX, cameraZ, activeStage }: MiniMapProps) {
  const [camPx, camPy] = worldToMap(cameraX, cameraZ);

  const nodeData = useMemo(() =>
    projects.map((p) => {
      const [px, py] = worldToMap(p.position[0], p.position[2]);
      return { ...p, px, py };
    }),
    []
  );

  const sizeMap = { small: 2.5, medium: 3.5, large: 4.5, featured: 6 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        bottom: '16px',
        right: '24px',
        zIndex: 10,
        width: `${MAP_SIZE}px`,
        height: `${MAP_SIZE}px`,
        background: 'rgba(20, 20, 20, 0.88)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        touchAction: 'none',
      }}
    >
      {/* Label */}
      <div
        className="font-label"
        style={{
          position: 'absolute', top: '6px', left: '8px',
          fontSize: '8px', color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.15em', zIndex: 2,
        }}
      >
        TOP VIEW
      </div>

      <svg width={MAP_SIZE} height={MAP_SIZE} style={{ position: 'absolute', inset: 0 }}>
        {/* Grid lines */}
        <line x1={CENTER} y1={0} x2={CENTER} y2={MAP_SIZE} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1={0} y1={CENTER} x2={MAP_SIZE} y2={CENTER} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Origin dot */}
        <circle cx={CENTER} cy={CENTER} r={3} fill="#ffffff" opacity={0.3} />

        {/* Project nodes */}
        {nodeData.map((n) => {
          const dimmed = activeStage !== 'all' && n.stage !== activeStage;
          const r = sizeMap[n.size];
          return (
            <circle
              key={n.id}
              cx={n.px}
              cy={n.py}
              r={r}
              fill={n.color}
              opacity={dimmed ? 0.15 : 0.75}
              style={{ transition: 'opacity 0.3s' }}
            />
          );
        })}

        {/* Camera position crosshair */}
        <g transform={`translate(${camPx}, ${camPy})`}>
          <circle r={5} fill="none" stroke="#00f0ff" strokeWidth="1" opacity={0.7} />
          <line x1={-8} y1={0} x2={8} y2={0} stroke="#00f0ff" strokeWidth="0.75" opacity={0.5} />
          <line x1={0} y1={-8} x2={0} y2={8} stroke="#00f0ff" strokeWidth="0.75" opacity={0.5} />
        </g>
      </svg>
    </motion.div>
  );
}
