import type { DendriticBranch } from '../types';

export const branches: DendriticBranch[] = [
  // ── Primary arms from nucleus ─────────────────────────────────────────
  {
    id: 'materials-primary',
    stage: 'primary',
    start: [0, 0, 0],
    end: [-4, 4.5, 2.5],
    color: '#8338ec',
    thickness: 3,
  },
  {
    id: 'ml-primary',
    stage: 'primary',
    start: [0, 0, 0],
    end: [0, 4.5, 0],
    color: '#00f0ff',
    thickness: 3,
  },
  {
    id: 'programming-primary',
    stage: 'primary',
    start: [0, 0, 0],
    end: [3.5, 5, 2],
    color: '#ff006e',
    thickness: 3,
  },

  // ── Secondary arms ────────────────────────────────────────────────────
  {
    id: 'time-series-secondary',
    stage: 'secondary',
    start: [-4, 4.5, 2.5],
    end: [-2, 8.5, -2],
    color: '#ff006e',
    thickness: 1.5,
  },
  {
    id: 'generative-secondary',
    stage: 'secondary',
    start: [0, 4.5, 0],
    end: [2.5, 11, 3.5],
    color: '#00ff87',
    thickness: 1.5,
  },
  {
    id: 'domain-secondary',
    stage: 'secondary',
    start: [3.5, 5, 2],
    end: [4, 8, 1],
    color: '#00f0ff',
    thickness: 1.5,
  },

  // ── Convergence arms ──────────────────────────────────────────────────
  {
    id: 'converge-timeseries',
    stage: 'convergence',
    start: [-2, 8.5, -2],
    end: [0, 12, 0],
    color: '#00f0ff',
    thickness: 2,
  },
  {
    id: 'converge-generative',
    stage: 'convergence',
    start: [2.5, 11, 3.5],
    end: [0, 12, 0],
    color: '#00f0ff',
    thickness: 2,
  },
  {
    id: 'converge-domain',
    stage: 'convergence',
    start: [4, 8, 1],
    end: [0, 12, 0],
    color: '#00f0ff',
    thickness: 2,
  },
  {
    id: 'converge-materials',
    stage: 'convergence',
    start: [-4, 4.5, 2.5],
    end: [0, 12, 0],
    color: '#8338ec',
    thickness: 2,
  },
];
