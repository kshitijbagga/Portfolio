import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { CameraTarget } from '../../hooks/useCameraAnimation';

interface CameraControllerProps {
  target: CameraTarget;
  onPositionUpdate: (x: number, z: number) => void;
}

const ARRIVE_THRESHOLD = 0.05;

export default function CameraController({ target, onPositionUpdate }: CameraControllerProps) {
  const { camera, controls } = useThree();
  const targetPos   = useRef(new THREE.Vector3(...target.position));
  const targetLook  = useRef(new THREE.Vector3(...target.lookAt));
  const isAnimating = useRef(false);

  // Cancel animation the moment the user starts interacting
  useEffect(() => {
    if (!controls) return;
    const cancel = () => { isAnimating.current = false; };
    (controls as any).addEventListener('start', cancel);
    return () => (controls as any).removeEventListener('start', cancel);
  }, [controls]);

  // When a new target is requested, start animating toward it
  useEffect(() => {
    targetPos.current.set(...target.position);
    targetLook.current.set(...target.lookAt);
    isAnimating.current = true;
  }, [target]);

  useFrame(() => {
    onPositionUpdate(camera.position.x, camera.position.z);

    if (!isAnimating.current) return;

    camera.position.lerp(targetPos.current, 0.07);

    const orbitControls = controls as any;
    if (orbitControls?.target) {
      orbitControls.target.lerp(targetLook.current, 0.07);
      orbitControls.update();
    }

    const distPos  = camera.position.distanceTo(targetPos.current);
    const distLook = orbitControls?.target
      ? orbitControls.target.distanceTo(targetLook.current)
      : 0;

    if (distPos < ARRIVE_THRESHOLD && distLook < ARRIVE_THRESHOLD) {
      isAnimating.current = false;
    }
  });

  return null;
}
