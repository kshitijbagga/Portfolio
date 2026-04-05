import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { Project, DendriticBranch, Stage } from '../../types';
import type { ActiveStage } from '../../hooks/useCameraAnimation';
import type { Stage as StageType } from '../../types';
import Nucleus from './Nucleus';
import ProjectNode from './ProjectNode';
import ParticleSystem from './ParticleSystem';

interface DendriticStructureProps {
  projects: Project[];
  branches: DendriticBranch[];
  activeStage: ActiveStage;
  revealedStages?: Stage[];
  focusStage?: StageType | null;  // playthrough: dim everything except this stage
  onNodeHover: (id: string | null) => void;
  onNodeClick: (id: string) => void;
}

export default function DendriticStructure({
  projects,
  branches,
  activeStage,
  revealedStages,
  focusStage,
  onNodeHover,
  onNodeClick,
}: DendriticStructureProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.04;
    }
  });

  const isStageVisible = (stage: Stage) => {
    if (revealedStages) return revealedStages.includes(stage);
    return true;
  };

  const isBranchDimmed = (branch: DendriticBranch) => {
    if (!isStageVisible(branch.stage)) return true;
    if (focusStage && branch.stage !== focusStage) return true;   // playthrough focus
    if (activeStage !== 'all' && branch.stage !== activeStage) return true;
    return false;
  };

  const isNodeDimmed = (project: Project) => {
    if (!isStageVisible(project.stage)) return true;
    if (focusStage && project.stage !== focusStage) return true;  // playthrough focus
    if (activeStage !== 'all' && project.stage !== activeStage) return true;
    return false;
  };

  return (
    <group ref={groupRef}>
      <Nucleus />
      <ParticleSystem count={300} />

      {branches.map((branch) => {
        const dimmed  = isBranchDimmed(branch);
        const hidden  = revealedStages && !revealedStages.includes(branch.stage);
        if (hidden) return null;
        return (
          <Line
            key={branch.id}
            points={[
              new THREE.Vector3(...branch.start),
              new THREE.Vector3(...branch.end),
            ]}
            color={branch.color}
            lineWidth={branch.thickness}
            transparent
            opacity={dimmed ? 0.08 : 0.65}
          />
        );
      })}

      {projects.map((project) => {
        const hidden = revealedStages && !revealedStages.includes(project.stage);
        if (hidden) return null;
        return (
          <ProjectNode
            key={project.id}
            project={project}
            dimmed={isNodeDimmed(project)}
            onHover={onNodeHover}
            onClick={onNodeClick}
          />
        );
      })}
    </group>
  );
}
