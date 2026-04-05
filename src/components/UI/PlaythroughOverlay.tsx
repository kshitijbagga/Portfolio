import { motion, AnimatePresence } from 'framer-motion';

interface PlaythroughOverlayProps {
  headline: string;
  sub: string;
  textVisible: boolean;
  progress: number;       // 0–1
  onSkip: () => void;
}

export default function PlaythroughOverlay({
  headline,
  sub,
  textVisible,
  progress,
  onSkip,
}: PlaythroughOverlayProps) {
  return (
    <>
      {/* Text overlay — centre of screen */}
      <AnimatePresence mode="wait">
        {textVisible && headline && (
          <motion.div
            key={headline}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              right: '48px',
              top: '50%',
              transform: 'translateY(-50%)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 20,
              maxWidth: '260px',
            }}
          >
            <div
              className="font-display text-glow"
              style={{
                fontSize: '28px',
                color: 'var(--accent-dendrite)',
                letterSpacing: '0.18em',
                marginBottom: '10px',
              }}
            >
              {headline}
            </div>
            {sub && (
              <div
                className="font-label"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                }}
              >
                {sub}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar — very thin, top of screen */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(0,240,255,0.08)',
        zIndex: 15,
        pointerEvents: 'none',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'var(--accent-dendrite)',
            boxShadow: '0 0 8px var(--accent-dendrite)',
            width: `${progress * 100}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Skip button — bottom right */}
      <motion.button
        onClick={onSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          zIndex: 20,
          background: 'rgba(10,15,26,0.85)',
          border: '1px solid rgba(0,240,255,0.2)',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: 'pointer',
          color: 'rgba(0,240,255,0.6)',
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '11px',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.15em',
          backdropFilter: 'blur(6px)',
        }}
      >
        Skip  ›
      </motion.button>
    </>
  );
}
