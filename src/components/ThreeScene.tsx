import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import ModelLoader, { preloadModel } from "./ModelLoader";

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

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 150], fov: 60, near: 0.1, far: 2000 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <ambientLight intensity={0.02} />
        <pointLight position={[0, 0, 0]} intensity={0.8} />

        <Sparkles
          position={[0, 0, 0]}
          size={30}
          scale={[200, 200, 200]}
          speed={5}
          count={700}
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
