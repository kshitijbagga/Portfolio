import type { DendriticBranch } from '../types';

export const branches: DendriticBranch[] = [
  // ── Primary arms from nucleus ─────────────────────────────────────────
  {
    id: 'materials-primary',
    stage: 'primary',
    start: [0, 0, 0],
    end: [-2.5, 3.5, 1.5],
    color: '#8338ec',
    thickness: 3,
  },
  {
    id: 'ml-primary',
    stage: 'primary',
    start: [0, 0, 0],
    end: [0, 3.5, -0.5],
    color: '#00f0ff',
    thickness: 3,
  },
  {
    id: 'programming-primary',
    stage: 'primary',
    start: [0, 0, 0],
    end: [2.5, 3, 0.5],
    color: '#ff006e',
    thickness: 3,
  },

  // ── Secondary arms ────────────────────────────────────────────────────
  {
    id: 'time-series-secondary',
    stage: 'secondary',
    start: [-2.5, 3.5, 1.5],
    end: [-1.5, 6, -0.5],
    color: '#ff006e',
    thickness: 1.5,
  },
  {
    id: 'generative-secondary',
    stage: 'secondary',
    start: [0, 3.5, -0.5],
    end: [1.5, 6, 1.5],
    color: '#00ff87',
    thickness: 1.5,
  },
  {
    id: 'domain-secondary',
    stage: 'secondary',
    start: [2.5, 3, 0.5],
    end: [2.5, 5.5, 0.5],
    color: '#00f0ff',
    thickness: 1.5,
  },

  // ── Convergence arms ──────────────────────────────────────────────────
  {
    id: 'converge-timeseries',
    stage: 'convergence',
    start: [-1.5, 6, -0.5],
    end: [0, 8, 0],
    color: '#00f0ff',
    thickness: 2,
  },
  {
    id: 'converge-generative',
    stage: 'convergence',
    start: [1.5, 6, 1.5],
    end: [0, 8, 0],
    color: '#00f0ff',
    thickness: 2,
  },
  {
    id: 'converge-domain',
    stage: 'convergence',
    start: [2.5, 5.5, 0.5],
    end: [0, 8, 0],
    color: '#00f0ff',
    thickness: 2,
  },
  {
    id: 'converge-materials',
    stage: 'convergence',
    start: [-2.5, 3.5, 1.5],
    end: [0, 8, 0],
    color: '#8338ec',
    thickness: 2,
  },
];
