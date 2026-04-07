import { Suspense, useState, useEffect, useCallback } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import DendriticStructure from './components/Scene/DendriticStructure';
import CameraController from './components/Scene/CameraController';
import SafeCanvas from './components/Scene/SafeCanvas';
import ProjectCard from './components/UI/ProjectCard';
import Timeline from './components/UI/Timeline';
import MiniMap from './components/UI/MiniMap';
import PlaythroughOverlay from './components/UI/PlaythroughOverlay';
import ContactModal from './components/UI/ContactModal';
import AboutModal from './components/UI/AboutModal';
import SkillsPanel from './components/UI/SkillsPanel';
import ClickToStartOverlay from './components/UI/ClickToStartOverlay';
import PlaythroughButton from './components/UI/PlaythroughButton';
import LegendPanel from './components/UI/LegendPanel';
import ProjectsIndex from './components/UI/ProjectsIndex';
import { projects } from './data/projects';
import { branches } from './data/branches';
import { useCameraAnimation } from './hooks/useCameraAnimation';
import { useAutoPlaythrough } from './hooks/useAutoPlaythrough';
import { usePlaythroughSound } from './hooks/usePlaythroughSound';
import { useIsMobile } from './hooks/useDeviceDetection';
import type { ActiveStage } from './hooks/useCameraAnimation';

const KEY_STAGE_MAP: Record<string, ActiveStage> = {
  '1': 'nucleation',
  '2': 'primary',
  '3': 'secondary',
  '4': 'convergence',
  'r': 'all',
  'R': 'all',
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [camX, setCamX]             = useState(12);
  const [camZ, setCamZ]             = useState(16);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [webglError, setWebglError] = useState(false);
  
  const isMobile = useIsMobile();
  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

  // Sound effects hook
  const sound = usePlaythroughSound({ enabled: audioEnabled, volume: isMobile ? 0.4 : 0.3 });

  // Manual navigation state (Phase 2)
  const { activeStage, cameraTarget, goToStage } = useCameraAnimation();

  // Playthrough state (Phase 3)
  const playthrough = useAutoPlaythrough();

  // Active camera target: playthrough beat camera while playing, manual target otherwise
  const activeCameraTarget = playthrough.isPlaying
    ? playthrough.beat.camera
    : cameraTarget;

  const handleCameraPos = useCallback((x: number, z: number) => {
    setCamX(x);
    setCamZ(z);
  }, []);

  // WebGL error handler
  const handleContextLoss = useCallback(() => {
    console.error('WebGL context lost - switching to fallback mode');
    setWebglError(true);
  }, []);

  // Fullscreen handling
  const enterFullscreen = async () => {
    const doc = window.document as any;
    const de = doc.documentElement;
    
    try {
      if (de.requestFullscreen) {
        await de.requestFullscreen();
      } else if (de.webkitRequestFullscreen) {
        await de.webkitRequestFullscreen();
      } else if (de.msRequestFullscreen) {
        await de.msRequestFullscreen();
      }
    } catch (err) {
      console.log('Fullscreen denied:', err);
    }
  };

  const exitFullscreen = async () => {
    const doc = window.document as any;
    
    try {
      if (doc.exitFullscreen) {
        await doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
      }
    } catch (err) {
      console.log('Exit fullscreen error:', err);
    }
  };

  // Handle first interaction for audio
  const handleFirstInteraction = useCallback(() => {
    sound.initAudio();
    setAudioEnabled(true);
    // Start audio immediately
    sound.startAmbientDrone();
  }, [sound]);

  // Start playthrough manually
  const startPlaythrough = useCallback(() => {
    enterFullscreen();
    sound.initAudio();
    setAudioEnabled(true);
    playthrough.start();
    setTimeout(() => {
      if (!sound.isPlaying) {
        sound.startAmbientDrone();
      }
    }, 100);
  }, [playthrough, sound]);

  // Exit fullscreen when playthrough ends
  useEffect(() => {
    if (!playthrough.isPlaying && !playthrough.hasStarted) {
      // Don't exit if playthrough never started
      return;
    }
    
    if (!playthrough.isPlaying && playthrough.hasStarted) {
      // Playthrough just ended
      setTimeout(() => {
        exitFullscreen();
      }, 1000);
    }
  }, [playthrough.isPlaying, playthrough.hasStarted]);

  // Keyboard shortcuts — only active after playthrough
  useEffect(() => {
    if (playthrough.isPlaying) return;
    const handler = (e: KeyboardEvent) => {
      if (selectedId) return;
      const stage = KEY_STAGE_MAP[e.key];
      if (stage !== undefined) {
        goToStage(stage);
        sound.playClickSound();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [playthrough.isPlaying, goToStage, selectedId, sound]);

  // Click anywhere on canvas during playthrough to skip
  const handleCanvasClick = () => {
    if (playthrough.isPlaying) {
      playthrough.skip();
      sound.stopAmbientDrone();
    }
  };

  // Play stage transition sound during playthrough
  useEffect(() => {
    if (playthrough.isPlaying) {
      const stageIndex = playthrough.beat.revealedStages.length - 1;
      if (stageIndex >= 0) {
        sound.playStageTransition(stageIndex);
      }
    }
  }, [playthrough.beatIndex, playthrough.isPlaying, sound]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000000' }}>
      <div className="scan-line" />

      {/* Header */}
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(5,8,13,0.8), transparent)',
        pointerEvents: 'none',
      }}>
        <div className="font-display text-glow" style={{ fontSize: '18px', color: 'var(--accent-dendrite)', letterSpacing: '0.1em' }}>
          KSHITIJ BAGGA
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', pointerEvents: 'auto' }}>
          {/* About button */}
          <button
            onClick={() => setIsAboutOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: isMobile ? '8px 12px' : '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minHeight: '44px',
            }}
            className="font-label"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(131, 56, 236, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent-nucleus)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span style={{ fontSize: isMobile ? '11px' : '10px', color: 'var(--text-primary)' }}>About</span>
          </button>

          {/* Skills button */}
          <button
            onClick={() => setIsSkillsOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: isMobile ? '8px 12px' : '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minHeight: '44px',
            }}
            className="font-label"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 255, 135, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent-converge)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span style={{ fontSize: isMobile ? '11px' : '10px', color: 'var(--text-primary)' }}>Skills</span>
          </button>

          {/* Contact button */}
          <button
            onClick={() => setIsContactOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              padding: isMobile ? '8px 12px' : '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minHeight: '44px',
            }}
            className="font-label"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
              e.currentTarget.style.borderColor = 'var(--accent-dendrite)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span style={{ fontSize: '10px', color: 'var(--text-primary)' }}>Contact</span>
          </button>
          
          {/* Audio toggle button */}
          <button
            onClick={() => {
              if (audioEnabled) {
                // Turn OFF
                sound.stopAmbientDrone();
                setAudioEnabled(false);
              } else {
                // Turn ON - only if initialized
                setAudioEnabled(true);
                if (sound.isInitialized) {
                  sound.startAmbientDrone();
                }
              }
            }}
            style={{
              background: audioEnabled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${audioEnabled ? '#00f0ff' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '20px',
              padding: isMobile ? '8px 12px' : '6px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              minHeight: '44px',
            }}
            className="font-label"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = audioEnabled ? 'rgba(0, 240, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = audioEnabled ? '#00f0ff' : 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = audioEnabled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = audioEnabled ? '#00f0ff' : 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span style={{ fontSize: '16px', filter: audioEnabled ? 'none' : 'grayscale(100%)' }}>
              {audioEnabled ? '🔊' : '🔇'}
            </span>
            {!isMobile && (
              <span style={{ fontSize: '10px', color: audioEnabled ? '#00f0ff' : 'var(--text-label)', fontWeight: audioEnabled ? 600 : 400 }}>
                {audioEnabled ? 'On' : 'Off'}
              </span>
            )}
          </button>
          
          {/* Hide hints during playthrough */}
          <AnimatePresence>
            {!playthrough.isPlaying && !isMobile && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="font-label"
                style={{ fontSize: '10px', color: 'var(--text-label)', textAlign: 'right' }}
              >
                <div>Drag to orbit · Scroll to zoom</div>
                <div style={{ marginTop: '2px' }}>Tap nodes to explore</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 3D Canvas */}
      {!webglError ? (
        <SafeCanvas
          onWebGLError={handleContextLoss}
          gl={{ 
            antialias: !isMobile,
            alpha: false, 
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: '#000000', width: '100%', height: '100%' }}
          dpr={[1, Math.min(2, window.devicePixelRatio || 1)]}
          onClick={handleCanvasClick}
        >
          <Suspense fallback={<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#00f0ff', fontFamily: 'monospace' }}>Loading...</div>}>
            <PerspectiveCamera makeDefault position={[12, 8, 18]} fov={50} />

            <ambientLight intensity={0.4} color="#ffffff" />
            <pointLight position={[10, 12, 8]}  intensity={25} color="#00f0ff" distance={35} decay={2} />
            <pointLight position={[-10, 6, -8]} intensity={20} color="#8338ec" distance={30} decay={2} />
            <pointLight position={[0, 10, 0]}   intensity={15} color="#00ff87" distance={25} decay={2} />

            <DendriticStructure
              projects={projects}
              branches={branches}
              activeStage={activeStage}
              revealedStages={playthrough.isPlaying ? playthrough.beat.revealedStages : undefined}
              focusStage={playthrough.isPlaying ? playthrough.focusStage : undefined}
              onNodeHover={() => {}}
              onNodeClick={(id) => {
                if (!playthrough.isPlaying) {
                  setSelectedId(id);
                  sound.playClickSound();
                }
              }}
            />

            <CameraController
              target={activeCameraTarget}
              onPositionUpdate={handleCameraPos}
            />

            <OrbitControls
              makeDefault
              enabled={!playthrough.isPlaying}
              enablePan
              enableZoom
              enableRotate
              minDistance={isMobile ? 5 : 3}
              maxDistance={isMobile ? 18 : 22}
              target={[0, 4, 0]}
            autoRotate={!playthrough.isPlaying}
            autoRotateSpeed={isMobile ? 0.3 : 0.4}
            rotateSpeed={isMobile ? 0.8 : 1.0}
            zoomSpeed={isMobile ? 0.6 : 1.0}
            panSpeed={isMobile ? 0.5 : 1.0}
          />
        </Suspense>
      </SafeCanvas>
      ) : (
        /* Fallback 2D view when WebGL fails */
        <div style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00f0ff',
          fontFamily: 'monospace',
          padding: '20px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '18px', marginBottom: '20px', color: '#ff006e' }}>
            ⚠️ 3D Not Supported
          </div>
          <div style={{ fontSize: '14px', marginBottom: '30px', color: '#a0a0a0' }}>
            Your device doesn't support the 3D visualization.<br/>
            Here are your projects:
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '800px',
            overflowY: 'auto',
            maxHeight: '60vh',
          }}>
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                style={{
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: `1px solid ${project.color}`,
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '14px', color: project.color, fontWeight: 'bold', marginBottom: '8px' }}>
                  {project.title}
                </div>
                <div style={{ fontSize: '12px', color: '#a0a0a0', marginBottom: '8px' }}>
                  {project.subtitle}
                </div>
                <div style={{ fontSize: '11px', color: '#666' }}>
                  {project.timeframe}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setSelectedId(null);
              setWebglError(false);
            }}
            style={{
              marginTop: '30px',
              padding: '12px 24px',
              background: 'rgba(0, 240, 255, 0.2)',
              border: '1px solid #00f0ff',
              color: '#00f0ff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            Retry 3D Mode
          </button>
        </div>
      )}

      {/* Playthrough overlay (text + progress bar + skip) */}
      <AnimatePresence>
        {playthrough.isPlaying && (
          <PlaythroughOverlay
            headline={playthrough.beat.headline ?? ''}
            sub={playthrough.beat.sub ?? ''}
            textVisible={playthrough.textVisible}
            progress={playthrough.progress}
            onSkip={playthrough.skip}
          />
        )}
      </AnimatePresence>

      {/* Post-playthrough UI fades in */}
      <AnimatePresence>
        {!playthrough.isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 5 }}
          >
            {/* Invisible wrapper — children handle their own pointer-events */}
          </motion.div>
        )}
      </AnimatePresence>

      {!playthrough.isPlaying && (
        <>
          <LegendPanel />
          <ProjectsIndex onSelectProject={setSelectedId} />
          <ProjectCard project={selectedProject} onClose={() => setSelectedId(null)} />
          <div style={{ 
            position: 'fixed', 
            bottom: '24px', 
            left: 0, 
            right: 0, 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 10 
          }}>
            <Timeline activeStage={activeStage} onStageClick={goToStage} />
          </div>
          <MiniMap cameraX={camX} cameraZ={camZ} activeStage={activeStage} />
          <PlaythroughButton onStart={startPlaythrough} isPlaying={playthrough.isPlaying} />
        </>
      )}

      {/* Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <SkillsPanel isOpen={isSkillsOpen} onClose={() => setIsSkillsOpen(false)} />
      
      {/* Click to start overlay */}
      <ClickToStartOverlay onInteraction={handleFirstInteraction} />
    </div>
  );
}
