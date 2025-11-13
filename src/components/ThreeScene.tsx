import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useCameraPath } from "../hooks/useCameraPath";

function StarField() {
  const ref = useRef<THREE.Points>(null);

  const particlesCount = 3000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 35;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4a5568"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Scroll-basierte Kamera-Steuerung
function ScrollCamera() {
  const cameraRef = useRef<THREE.Camera>(null);

  // Subtile, elegante Kamerafahrt um die Galaxy
  const generateSpiralPath = () => {
    const points: [number, number, number][] = [];
    const spiralTurns = 0.5;
    const segments = 100; // Mehr Punkte für smoothere Kurve
    
    for (let i = 0; i < segments; i++) { // Nicht <=, nur <
      const t = i / segments;
      const angle = t * Math.PI * 2 * spiralTurns;
      const radius = 120;
      const height = (Math.sin(t * Math.PI) - 0.5) * 20;
      
      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;
      
      points.push([x, y, z]);
    }
    
    // Ersten Punkt am Ende hinzufügen für nahtlose Kurve
    const firstPoint = points[0];
    points.push(firstPoint);
    
    return points;
  };

  const cameraPathPoints = generateSpiralPath();

  const lookAtPoints: [number, number, number][] = Array(cameraPathPoints.length).fill([0, 0, 0]) as [number, number, number][];

  const { cameraPosition, lookAtPosition } = useCameraPath({
    pathPoints: cameraPathPoints,
    lookAtPoints: lookAtPoints,
  });

  useFrame(({ camera }) => {
    camera.position.copy(cameraPosition);
    camera.lookAt(lookAtPosition);
  });

  return null;
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1000], fov: 60, near: 0.1, far: 2000 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.02} />
        <pointLight position={[0, 0, 0]} intensity={0.8} />

        <ScrollCamera />

        <Sparkles
          position={[0, 0, 0]}
          size={30}
          scale={[200, 200, 200]}
          speed={5}
          count={500}
        />
        <Sparkles
          position={[0, 0, 0]}
          size={100}
          color={"purple"}
          scale={[200, 200, 200]}
          speed={0}
          count={200}
        />
        <Sparkles
          position={[0, 0, 0]}
          size={150}
          color={"#7473a2"}
          scale={[200, 200, 200]}
          speed={2}
          count={100}
        />

      </Canvas>
    </div>
  );
}
