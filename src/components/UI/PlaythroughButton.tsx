import { motion } from 'framer-motion';
import { useState } from 'react';

interface PlaythroughButtonProps {
  onStart: () => void;
  isPlaying: boolean;
}

export default function PlaythroughButton({ onStart, isPlaying }: PlaythroughButtonProps) {
  const [_isExiting, setIsExiting] = useState(false);

  if (isPlaying) {
    return null; // Hide button during playthrough
  }

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onStart();
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 100,
        cursor: 'pointer',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(20, 20, 20, 0.9)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '12px',
          padding: '12px 20px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 240, 255, 0.15)',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.8)';
          e.currentTarget.style.boxShadow = '0 6px 30px rgba(0, 240, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.15)';
        }}
      >
        {/* Play icon */}
        <div style={{ position: 'relative', width: '24px', height: '24px' }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <path
              d="M8 5V19L19 12L8 5Z"
              fill="#00f0ff"
              stroke="#00f0ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            className="font-label"
            style={{
              fontSize: '10px',
              color: '#00f0ff',
              letterSpacing: '0.15em',
              fontWeight: 600,
            }}
          >
            START PLAYTHROUGH
          </span>
          <span
            className="font-label"
            style={{
              fontSize: '8px',
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.1em',
            }}
          >
            Full Experience
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
