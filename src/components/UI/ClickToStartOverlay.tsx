import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useIsMobile } from '../../hooks/useDeviceDetection';

interface ClickToStartOverlayProps {
  onInteraction: () => void;
}

export default function ClickToStartOverlay({ onInteraction }: ClickToStartOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Completely skip overlay on mobile
    if (isMobile) {
      setIsVisible(false);
      sessionStorage.setItem('hasInteracted', 'true');
      // Trigger audio initialization immediately
      onInteraction();
      return;
    }
    
    // Check if user has already interacted (via sessionStorage)
    const hasInteracted = sessionStorage.getItem('hasInteracted');
    if (hasInteracted) {
      setIsVisible(false);
    }
  }, []); // Empty dependency array - only run once on mount

  const handleInteraction = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasInteracted', 'true');
    onInteraction();
  };

  return (
    <AnimatePresence>
      {isVisible && !isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          onClick={handleInteraction}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(5, 8, 13, 0.95)',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Animated pulse circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
              marginBottom: '30px',
            }}
          />

          {/* Main text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display"
            style={{
              fontSize: '28px',
              color: '#00f0ff',
              letterSpacing: '0.15em',
              textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
              marginBottom: '12px',
              textAlign: 'center',
            }}
          >
            CLICK TO BEGIN
          </motion.div>

          {/* Subtext */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-label"
            style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.2em',
              textAlign: 'center',
            }}
          >
            Tap anywhere to explore
          </motion.div>

          {/* Audio indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '16px' }}>🔊</span>
            <span className="font-label" style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.15em' }}>
              AUDIO ENABLED
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
