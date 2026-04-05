import { useState, useCallback } from 'react';
import type { Stage } from '../types';

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export type ActiveStage = Stage | 'all';

export const STAGE_CAMERAS: Record<ActiveStage, CameraTarget> = {
  all:         { position: [8, 5, 12],  lookAt: [0, 4, 0] },
  nucleation:  { position: [3, 1, 4],   lookAt: [0, 0, 0] },
  primary:     { position: [5, 4, 7],   lookAt: [0, 2.5, 0] },
  secondary:   { position: [6, 6, 9],   lookAt: [0, 5.5, 0] },
  convergence: { position: [4, 10, 5],  lookAt: [0, 8, 0] },
};

export function useCameraAnimation() {
  const [activeStage, setActiveStage] = useState<ActiveStage>('all');
  const [cameraTarget, setCameraTarget] = useState<CameraTarget>(STAGE_CAMERAS.all);

  const goToStage = useCallback((stage: ActiveStage) => {
    setActiveStage(stage);
    setCameraTarget(STAGE_CAMERAS[stage]);
  }, []);

  return { activeStage, cameraTarget, goToStage };
}
