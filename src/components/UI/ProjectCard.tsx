import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types';
import { useIsMobile } from '../../hooks/useDeviceDetection';

interface ProjectCardProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectCard({ project, onClose }: ProjectCardProps) {
  const isMobile = useIsMobile();
  
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Card Container for Centering */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            {/* Card */}
            <motion.div
              style={{
                width: isMobile ? 'calc(100vw - 32px)' : 'min(560px, 90vw)',
                maxWidth: isMobile ? 'none' : 'none',
                maxHeight: isMobile ? '70vh' : '80vh',
                overflowY: isMobile ? 'auto' : 'visible',
                background: 'rgba(20, 20, 20, 0.98)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderLeft: `3px solid ${project.color}`,
                borderRadius: '8px',
                padding: isMobile ? '20px' : '28px 32px',
                boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), 0 20px 60px rgba(0,0,0,0.7)',
                backdropFilter: 'blur(30px) saturate(180%)',
                pointerEvents: 'auto',
                margin: isMobile ? '16px' : '0',
              }}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div className="font-label" style={{ fontSize: '11px', color: project.color, marginBottom: '6px' }}>
                  {project.timeframe} · {project.category}
                </div>
                <h2 className="font-display" style={{ fontSize: '16px', color: '#ffffff', lineHeight: 1.4, marginBottom: '4px' }}>
                  {project.title}
                </h2>
                <div className="font-mono" style={{ fontSize: '12px', color: '#9ca3af' }}>
                  {project.subtitle}
                </div>
              </div>
              <button
                onClick={onClose}
                className="font-label"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)', 
                  color: '#9ca3af',
                  padding: '4px 10px', 
                  borderRadius: '3px', 
                  cursor: 'pointer', 
                  fontSize: '11px',
                  marginLeft: '16px', 
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ESC
              </button>
            </div>

            {/* Description */}
            <p className="font-mono" style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.7, marginBottom: '20px' }}>
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: `${project.color}11`,
                      border: `1px solid ${project.color}33`,
                      borderRadius: '4px',
                      padding: '8px 14px',
                      textAlign: 'center',
                    }}
                  >
                    <div className="font-display" style={{ fontSize: '16px', color: project.color }}>
                      {m.value}
                    </div>
                    <div className="font-label" style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            <div style={{ marginBottom: '20px' }}>
              <div className="font-label" style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '8px' }}>
                Key Achievements
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {project.achievements.map((a, i) => (
                  <li key={i} className="font-mono" style={{ fontSize: '11px', color: '#9ca3af', padding: '3px 0', paddingLeft: '12px', position: 'relative', lineHeight: 1.6 }}>
                    <span style={{ position: 'absolute', left: 0, color: project.color }}>›</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <div className="font-label" style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '8px' }}>
                Technologies
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-label"
                    style={{
                      fontSize: '10px',
                      padding: '3px 8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '3px',
                      color: '#9ca3af',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.links && Object.keys(project.links).length > 0 && (
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="font-label"
                    style={{ fontSize: '11px', color: project.color, textDecoration: 'none', borderBottom: `1px solid ${project.color}55` }}>
                    GitHub ↗
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="font-label"
                    style={{ fontSize: '11px', color: project.color, textDecoration: 'none', borderBottom: `1px solid ${project.color}55` }}>
                    Demo ↗
                  </a>
                )}
              </div>
            )}
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
