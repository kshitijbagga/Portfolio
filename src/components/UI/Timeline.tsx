import { motion } from 'framer-motion';
import type { ActiveStage } from '../../hooks/useCameraAnimation';

const STAGES: { id: ActiveStage; label: string; year: string; color: string }[] = [
  { id: 'nucleation',  label: 'NUCLEATION',       year: '2022',     color: '#8338ec' },
  { id: 'primary',     label: 'PRIMARY GROWTH',   year: '2023–24',  color: '#00f0ff' },
  { id: 'secondary',   label: 'SECONDARY GROWTH', year: '2024–25',  color: '#ff006e' },
  { id: 'convergence', label: 'CONVERGENCE',       year: 'Present',  color: '#00ff87' },
];

interface TimelineProps {
  activeStage: ActiveStage;
  onStageClick: (stage: ActiveStage) => void;
}

export default function Timeline({ activeStage, onStageClick }: TimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        background: 'rgba(20, 20, 20, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '6px',
        padding: '12px 20px',
        backdropFilter: 'blur(8px)',
        maxWidth: '95vw',
        overflowX: 'auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {STAGES.map((stage, i) => {
        const isActive = activeStage === stage.id;
        const isAll = activeStage === 'all';

        return (
          <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Connector line */}
            {i > 0 && (
              <div style={{
                width: '40px',
                height: '1px',
                background: isAll
                  ? 'rgba(255, 255, 255, 0.15)'
                  : STAGES[i - 1].id === activeStage || stage.id === activeStage
                  ? `${stage.color}66`
                  : 'rgba(255,255,255,0.08)',
                transition: 'background 0.3s',
              }} />
            )}

            {/* Stage button */}
            <motion.button
              onClick={() => onStageClick(isActive ? 'all' : stage.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                minWidth: '44px',
                minHeight: '44px',
              }}
            >
              {/* Node dot */}
              <div style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                borderRadius: '50%',
                background: isActive || isAll ? stage.color : 'rgba(255,255,255,0.15)',
                boxShadow: isActive ? `0 0 12px ${stage.color}` : 'none',
                transition: 'all 0.3s',
                border: isActive ? 'none' : `1px solid rgba(255,255,255,0.2)`,
              }} />

              {/* Label */}
              <span
                className="font-label"
                style={{
                  fontSize: '9px',
                  color: isActive ? stage.color : isAll ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.2)',
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                {stage.label}
              </span>

              {/* Year */}
              <span
                className="font-mono"
                style={{
                  fontSize: '9px',
                  color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
                  transition: 'color 0.3s',
                }}
              >
                {stage.year}
              </span>
            </motion.button>
          </div>
        );
      })}

      {/* Reset to all */}
      {activeStage !== 'all' && (
        <motion.button
          onClick={() => onStageClick('all')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          style={{
            marginLeft: '16px',
            background: 'none',
            border: '1px solid rgba(0,240,255,0.2)',
            borderRadius: '3px',
            padding: '4px 8px',
            cursor: 'pointer',
            color: 'rgba(0,240,255,0.5)',
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          ALL
        </motion.button>
      )}

      {/* Keyboard hint */}
      <div
        className="font-mono"
        style={{
          marginLeft: '20px',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.15)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          paddingLeft: '14px',
        }}
      >
        1–4 · R reset
      </div>
    </motion.div>
  );
}
