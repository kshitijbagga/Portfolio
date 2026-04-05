import { useState, useEffect, useRef, useCallback } from 'react';
import type { CameraTarget } from './useCameraAnimation';
import type { Stage } from '../types';

export interface PlaythroughBeat {
  time: number;
  camera: CameraTarget;
  revealedStages: Stage[];
  focusStage: Stage | null;   // which stage is highlighted; others are dimmed
  headline?: string;
  sub?: string;
}

export const BEATS: PlaythroughBeat[] = [
  {
    time: 0,
    camera: { position: [12, 4, 16], lookAt: [0, 2, 0] },
    revealedStages: [],
    focusStage: null,
    headline: 'KSHITIJ BAGGA',
    sub: 'A journey through computational growth',
  },
  {
    time: 4,
    camera: { position: [3, 1, 4], lookAt: [0, 0, 0] },
    revealedStages: ['nucleation'],
    focusStage: 'nucleation',
    headline: 'NUCLEATION',
    sub: '2022 · IIT Kanpur · Materials Science & Engineering',
  },
  {
    time: 9,
    camera: { position: [-4, 3.5, 5], lookAt: [-2, 2.5, 1] },
    revealedStages: ['nucleation', 'primary'],
    focusStage: 'primary',
    headline: 'PRIMARY GROWTH',
    sub: 'Computational Materials · Machine Learning · Programming',
  },
  {
    time: 16,
    camera: { position: [5, 6, 9], lookAt: [0, 5, 0] },
    revealedStages: ['nucleation', 'primary', 'secondary'],
    focusStage: 'secondary',
    headline: 'SECONDARY BRANCHING',
    sub: 'Time Series · Probabilistic ML · Generative Models',
  },
  {
    time: 24,
    camera: { position: [-2, 5.5, -3], lookAt: [-1, 5.5, -1] },
    revealedStages: ['nucleation', 'primary', 'secondary'],
    focusStage: 'secondary',
    headline: 'THE PIVOT',
    sub: 'Bayesian LSTMs for microstructure evolution prediction',
  },
  {
    time: 30,
    camera: { position: [4, 10, 6], lookAt: [0, 8, 0] },
    revealedStages: ['nucleation', 'primary', 'secondary', 'convergence'],
    focusStage: 'convergence',
    headline: 'CONVERGENCE',
    sub: 'Same tools. Different domain.',
  },
  {
    time: 37,
    camera: { position: [2, 9, 3], lookAt: [0, 8, 0] },
    revealedStages: ['nucleation', 'primary', 'secondary', 'convergence'],
    focusStage: 'convergence',
    headline: 'ML ENGINEER · XYTON',
    sub: 'Surrogate models for SPICE & Monte Carlo circuit simulation',
  },
  {
    time: 43,
    camera: { position: [8, 5, 12], lookAt: [0, 4, 0] },
    revealedStages: ['nucleation', 'primary', 'secondary', 'convergence'],
    focusStage: null,
    headline: '',
    sub: '',
  },
];

const TOTAL_DURATION = 48; // seconds

export interface PlaythroughState {
  isPlaying: boolean;
  beat: PlaythroughBeat;
  beatIndex: number;
  progress: number;
  textVisible: boolean;
  focusStage: Stage | null;
  skip: () => void;
}

export function useAutoPlaythrough(): PlaythroughState {
  const [elapsed, setElapsed]       = useState(0);
  const [isPlaying, setIsPlaying]   = useState(true);
  const lastTimestamp               = useRef<number | null>(null);
  const rafId                       = useRef<number>(0);

  const tick = useCallback((ts: number) => {
    if (lastTimestamp.current === null) lastTimestamp.current = ts;
    const dt = (ts - lastTimestamp.current) / 1000;
    lastTimestamp.current = ts;

    setElapsed((prev) => {
      const next = prev + dt;
      if (next >= TOTAL_DURATION) {
        setIsPlaying(false);
        return TOTAL_DURATION;
      }
      return next;
    });

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      rafId.current = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(rafId.current);
  }, [isPlaying, tick]);

  const skip = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    setIsPlaying(false);
    setElapsed(TOTAL_DURATION);
  }, []);

  // Find current beat
  let beatIndex = 0;
  for (let i = BEATS.length - 1; i >= 0; i--) {
    if (elapsed >= BEATS[i].time) {
      beatIndex = i;
      break;
    }
  }
  const beat = BEATS[beatIndex];

  // Text visible for first 4s of each beat, then fades out
  const beatElapsed = elapsed - beat.time;
  const textVisible = isPlaying && beatElapsed < 4 && !!beat.headline;

  return {
    isPlaying,
    beat,
    beatIndex,
    progress: elapsed / TOTAL_DURATION,
    textVisible,
    focusStage: beat.focusStage,
    skip,
  };
}
