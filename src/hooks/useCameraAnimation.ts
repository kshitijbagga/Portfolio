import { useState, useCallback } from 'react';
import type { Stage } from '../types';

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export type ActiveStage = Stage | 'all';

export const STAGE_CAMERAS: Record<ActiveStage, CameraTarget> = {
  all:         { position: [10, 6, 15], lookAt: [0, 6, 0] },
  nucleation:  { position: [3, 1, 4],   lookAt: [0, 0, 0] },
  primary:     { position: [6, 5, 9],   lookAt: [0, 4, 0] },
  secondary:   { position: [7, 8, 11],  lookAt: [0, 8, 0] },
  convergence: { position: [5, 13, 6],  lookAt: [0, 12, 0] },
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
