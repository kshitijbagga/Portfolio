import { motion } from 'framer-motion';
import { skills } from '../../data/skills';

interface SkillsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillsPanel({ isOpen, onClose }: SkillsPanelProps) {
  if (!isOpen) return null;

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div style={{ marginBottom: '12px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px',
          fontSize: '13px',
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ color: 'var(--text-label)' }}>{level}%</span>
      </div>
      <div
        style={{
          height: '6px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${level}%`,
            background: 'linear-gradient(90deg, var(--accent-dendrite), var(--accent-converge))',
            borderRadius: '3px',
            transition: 'width 0.8s ease-out',
          }}
        />
      </div>
    </div>
  );

  const SkillSection = ({ title, items, color }: any) => (
    <div style={{ marginBottom: '24px' }}>
      <h4
        className="font-display"
        style={{
          fontSize: '14px',
          color: color,
          marginBottom: '16px',
          letterSpacing: '0.08em',
        }}
      >
        {title}
      </h4>
      {items.map((skill: any) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
      ))}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
        }}
      />
      
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '420px',
          height: '100vh',
          background: 'rgba(30, 30, 30, 0.95)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '48px 32px',
          zIndex: 101,
          overflowY: 'auto',
          backdropFilter: 'blur(30px) saturate(180%)',
          boxShadow: '-25px 0 80px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '24px',
            cursor: 'pointer',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ×
        </button>

        {/* Title */}
        <h2
          className="font-display"
          style={{
            fontSize: '24px',
            color: 'var(--accent-dendrite)',
            marginBottom: '32px',
            letterSpacing: '0.1em',
          }}
        >
          Skills & Expertise
        </h2>

        {/* Skill Sections */}
        <SkillSection
          title="Programming Languages"
          items={skills.programmingLanguages}
          color="var(--accent-dendrite)"
        />
        <SkillSection
          title="ML Frameworks"
          items={skills.mlFrameworks}
          color="var(--accent-growth)"
        />
        <SkillSection
          title="Domain Tools"
          items={skills.domainTools}
          color="var(--accent-converge)"
        />
        <SkillSection
          title="Other Skills"
          items={skills.other}
          color="var(--accent-nucleus)"
        />
      </motion.div>
    </>
  );
}
