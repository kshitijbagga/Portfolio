import { useEffect, useRef, useCallback, useState } from 'react';

interface SoundOptions {
  enabled?: boolean;
  volume?: number;
}

export function usePlaythroughSound(options: SoundOptions = {}) {
  const { enabled = true, volume = 0.5 } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize audio on user interaction
  const initAudio = useCallback(() => {
    if (isInitialized) return;
    
    try {
      // Create HTML5 audio element for MP3 playback (with cache busting)
      const timestamp = Date.now();
      audioRef.current = new Audio(`/space-music-v2.mp3?t=${timestamp}`);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Also create AudioContext for sound effects
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      
      setIsInitialized(true);
    } catch (error) {
      console.warn('Web Audio API not supported', error);
    }
  }, [volume, isInitialized]);

  // Start ambient background music
  const startAmbientDrone = useCallback(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      // Reuse the same audio element created in initAudio
      console.warn('startAmbientDrone called before initAudio - this should not happen');
      return;
    }
    
    // Resume AudioContext if suspended (browser requirement)
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    // Reset time and play
    audioRef.current.currentTime = 0;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(err => console.warn('Audio playback failed:', err));
    }
  }, []);

  // Stop ambient background music
  const stopAmbientDrone = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  // Play subtle click sound for node interactions
  const playClickSound = useCallback(() => {
    if (!audioContextRef.current || !enabled) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.15);

    gainNode.gain.setValueAtTime(volume * 0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.15);
  }, [enabled, volume]);

  // Play very subtle hover sound
  const playHoverSound = useCallback(() => {
    if (!audioContextRef.current || !enabled) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, now);

    gainNode.gain.setValueAtTime(volume * 0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.08);
  }, [enabled, volume]);

  // Stage transition sound (DISABLED - user preference)
  const playStageTransition = useCallback((_stageIndex: number) => {
    // Procedural sound effects disabled
    return;
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      audioContextRef.current?.close();
    };
  }, []);

  return {
    initAudio,
    playStageTransition,
    startAmbientDrone,
    stopAmbientDrone,
    playClickSound,
    playHoverSound,
    isPlaying,
    isInitialized,
  };
}
