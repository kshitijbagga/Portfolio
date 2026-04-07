import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface SafeCanvasProps {
  children: React.ReactNode;
  onWebGLError: () => void;
  [key: string]: any;
}

export default function SafeCanvas({ children, onWebGLError, ...props }: SafeCanvasProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check WebGL support immediately
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) {
        console.error('WebGL not supported');
        setHasError(true);
        onWebGLError();
        return;
      }

      // Check for context loss
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.error('WebGL context lost');
        setHasError(true);
        onWebGLError();
      };

      canvas.addEventListener('webglcontextlost', handleContextLost);
      
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      };
    } catch (error) {
      console.error('WebGL initialization error:', error);
      setHasError(true);
      onWebGLError();
    }
  }, [onWebGLError]);

  if (hasError) {
    return null; // Parent will handle fallback
  }

  return <Canvas {...props}>{children}</Canvas>;
}
