import { motion, AnimatePresence } from 'framer-motion';
import { about } from '../../data/about';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
            }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              background: 'rgba(30, 30, 30, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '48px 40px',
              zIndex: 101,
              maxWidth: '700px',
              width: '90%',
              maxHeight: '85vh',
              overflowY: 'auto',
              backdropFilter: 'blur(30px) saturate(180%)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)',
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
                color: 'var(--text-primary)',
                marginBottom: '28px',
                letterSpacing: '0.05em',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              About Me
            </h2>

            {/* Bio */}
            <div
              style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {about.bio}
            </div>

            {/* Education & Research in two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Education */}
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  Education
                </h3>
                {about.education.map((edu, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        marginBottom: '6px',
                      }}
                    >
                      {edu.degree}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        marginBottom: '4px',
                      }}
                    >
                      {edu.institution}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-label)',
                      }}
                    >
                      {edu.year} • CPI: {edu.cpi}
                    </div>
                  </div>
                ))}
              </div>

              {/* Research Interests */}
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                  }}
                >
                  Research Interests
                </h3>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {about.researchInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        display: 'block',
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
