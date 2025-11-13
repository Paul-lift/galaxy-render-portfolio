import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CameraPathOptions {
  pathPoints: [number, number, number][]; // Punkte die die Kamera durchläuft
  lookAtPoints?: [number, number, number][]; // Optional: Punkte wo die Kamera hinschaut
  onPathChange?: (progress: number) => void;
}

// Erstelle eine glatte Bezier-Kurve aus mehreren Punkten
function createBezierCurve(points: [number, number, number][]) {
  // Verwende CatmullRomCurve für smooth interpolation
  const vectors = points.map((p) => new THREE.Vector3(...p));
  
  const curve = new THREE.CatmullRomCurve3(vectors);
  // closed = false (default) - damit springt es am Ende nicht zurück
  
  return curve;
}

export function useCameraPath({
  pathPoints,
  lookAtPoints,
  onPathChange,
}: CameraPathOptions) {
  const scrollProgressRef = useRef(0);
  const cameraPosRef = useRef(new THREE.Vector3(...pathPoints[0]));
  const lookAtPosRef = useRef(
    new THREE.Vector3(...(lookAtPoints?.[0] || [0, 0, 0]))
  );

  // Erstelle Bezier-Kurven statt CatmullRom
  const cameraPathRef = useRef(createBezierCurve(pathPoints));

  const lookAtPathRef = useRef(
    lookAtPoints ? createBezierCurve(lookAtPoints) : null
  );

  // Scroll-Listener mit passive flag für bessere Performance
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      let progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;

      // Clampe progress zwischen 0 und 0.99 um am Ende nicht zu springen
      progress = Math.min(Math.max(progress, 0), 0.99);
      scrollProgressRef.current = progress;

      // Update Positionen mit Bezier-Kurven
      cameraPathRef.current.getPoint(
        scrollProgressRef.current,
        cameraPosRef.current
      );

      if (lookAtPathRef.current) {
        lookAtPathRef.current.getPoint(
          scrollProgressRef.current,
          lookAtPosRef.current
        );
      } else {
        // Default: Schaue auf Zentrum
        lookAtPosRef.current.set(0, 0, 0);
      }

      onPathChange?.(scrollProgressRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onPathChange]);

  return {
    scrollProgress: scrollProgressRef.current,
    cameraPosition: cameraPosRef.current,
    lookAtPosition: lookAtPosRef.current,
    cameraPath: cameraPathRef.current,
    lookAtPath: lookAtPathRef.current,
  };
}
