import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GlowShader } from '@/lib/shaders/GlowShader';
import { QuantumPlasmaShader } from '@/lib/shaders/QuantumPlasmaShader';

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
        color="#8b5cf6"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface ShaderPlanetProps {
  position: [number, number, number];
  shader: typeof GlowShader | typeof QuantumPlasmaShader;
  baseColor: THREE.Color;
  edgeColor?: THREE.Color;
  scale?: number;
  rotationSpeed?: number;
}

function ShaderPlanet({ position, shader, baseColor, edgeColor, scale = 1, rotationSpeed = 0.3 }: ShaderPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        {...shader}
        uniforms={{
          time: { value: 0 },
          baseColor: { value: baseColor },
          ...(edgeColor && { edgeColor: { value: edgeColor } }),
          intensity: { value: 2.0 },
        }}
        transparent
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.05} />
        
        <StarField />
        
        {/* Orange Glow Planet */}
        <ShaderPlanet
          position={[-18, 3, -15]}
          shader={GlowShader}
          baseColor={new THREE.Color(1.0, 0.45, 0.05)}
          edgeColor={new THREE.Color(1.0, 0.9, 0.4)}
          scale={2}
          rotationSpeed={0.5}
        />
        
        {/* Purple Quantum Planet */}
        <ShaderPlanet
          position={[20, -4, -20]}
          shader={QuantumPlasmaShader}
          baseColor={new THREE.Color(0.5, 0.1, 0.8)}
          scale={1.5}
          rotationSpeed={0.7}
        />
        
        {/* Blue Quantum Planet */}
        <ShaderPlanet
          position={[5, 10, -25]}
          shader={QuantumPlasmaShader}
          baseColor={new THREE.Color(0.1, 0.4, 1.0)}
          scale={1.8}
          rotationSpeed={0.4}
        />
        
        {/* Pink/Magenta Glow Planet */}
        <ShaderPlanet
          position={[-12, -8, -18]}
          shader={GlowShader}
          baseColor={new THREE.Color(1.0, 0.2, 0.6)}
          edgeColor={new THREE.Color(1.0, 0.7, 0.9)}
          scale={1.3}
          rotationSpeed={0.6}
        />
        
        {/* Cyan Quantum Planet */}
        <ShaderPlanet
          position={[15, 6, -22]}
          shader={QuantumPlasmaShader}
          baseColor={new THREE.Color(0.0, 0.8, 0.9)}
          scale={1.2}
          rotationSpeed={0.8}
        />
        
        {/* Green Glow Planet (small) */}
        <ShaderPlanet
          position={[-8, 0, -12]}
          shader={GlowShader}
          baseColor={new THREE.Color(0.2, 1.0, 0.3)}
          edgeColor={new THREE.Color(0.7, 1.0, 0.5)}
          scale={0.8}
          rotationSpeed={0.9}
        />
      </Canvas>
    </div>
  );
}
