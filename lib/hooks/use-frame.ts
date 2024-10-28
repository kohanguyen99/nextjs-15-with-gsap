import { useEffect } from 'react';

export function useFrame(callback: any, priority = 0): void {
  useEffect(() => {
    let animationFrameId: number;

    const animate = (time: number) => {
      callback(time);
      animationFrameId = requestAnimationFrame(animate); // Schedule the next frame
    };

    animationFrameId = requestAnimationFrame(animate); // Start the loop

    return () => {
      cancelAnimationFrame(animationFrameId); // Cleanup when component unmounts
    };
  }, [callback, priority]);
}