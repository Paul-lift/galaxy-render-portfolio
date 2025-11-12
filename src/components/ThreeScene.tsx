import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { GlowShader } from '@/lib/shaders/GlowShader';
import { QuantumPlasmaShader } from '@/lib/shaders/QuantumPlasmaShader';
import { SunShader } from '@/lib/shaders/SunShader';

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
  shader: typeof GlowShader | typeof QuantumPlasmaShader | typeof SunShader;
  baseColor: THREE.Color;
  edgeColor?: THREE.Color;
  scale?: number;
  rotationSpeed?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
}

function ShaderPlanet({ 
  position, 
  shader, 
  baseColor, 
  edgeColor, 
  scale = 1, 
  rotationSpeed = 0.3,
  orbitRadius = 0,
  orbitSpeed = 0 
}: ShaderPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Orbital rotation um die Sonne
    if (orbitRef.current && orbitRadius > 0) {
      const angle = state.clock.elapsedTime * orbitSpeed;
      orbitRef.current.position.x = Math.cos(angle) * orbitRadius;
      orbitRef.current.position.z = Math.sin(angle) * orbitRadius;
    }

    // Eigenrotation des Planeten
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001 * rotationSpeed;
    }

    // Shader time uniform
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={orbitRef} position={position}>
      <mesh ref={meshRef} scale={scale}>
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
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [-25, 20, 25], fov: 60, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        
        <StarField />
        
        {/* 🌞 Central Sun - statisch */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={SunShader}
          baseColor={new THREE.Color(1.0, 0.45, 0.05)}
          edgeColor={new THREE.Color(1.0, 0.9, 0.4)}
          scale={2.5}
          rotationSpeed={0.3}
        />
        
        {/* Orange Glow Planet - Orbit 1 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={GlowShader}
          baseColor={new THREE.Color(1.0, 0.5, 0.1)}
          edgeColor={new THREE.Color(1.0, 0.9, 0.4)}
          scale={1.4}
          rotationSpeed={0.6}
          orbitRadius={14}
          orbitSpeed={0.3}
        />
        
        {/* Purple Quantum Planet - Orbit 1 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={QuantumPlasmaShader}
          baseColor={new THREE.Color(0.6, 0.1, 0.9)}
          scale={1.2}
          rotationSpeed={0.8}
          orbitRadius={14}
          orbitSpeed={0.5}
        />
        
        {/* Blue Quantum Planet - Orbit 2 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={QuantumPlasmaShader}
          baseColor={new THREE.Color(0.1, 0.5, 1.0)}
          scale={1.6}
          rotationSpeed={0.4}
          orbitRadius={22}
          orbitSpeed={0.2}
        />
        
        {/* Pink/Magenta Glow Planet - Orbit 2 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={GlowShader}
          baseColor={new THREE.Color(1.0, 0.2, 0.7)}
          edgeColor={new THREE.Color(1.0, 0.7, 0.95)}
          scale={1.3}
          rotationSpeed={0.5}
          orbitRadius={22}
          orbitSpeed={0.15}
        />
        
        {/* Cyan Quantum Planet - Orbit 1.5 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={QuantumPlasmaShader}
          baseColor={new THREE.Color(0.0, 0.9, 0.95)}
          scale={1.1}
          rotationSpeed={0.9}
          orbitRadius={18}
          orbitSpeed={0.35}
        />
        
        {/* Green Glow Planet - Orbit 1 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={GlowShader}
          baseColor={new THREE.Color(0.2, 0.95, 0.4)}
          edgeColor={new THREE.Color(0.7, 1.0, 0.6)}
          scale={0.9}
          rotationSpeed={1.0}
          orbitRadius={14}
          orbitSpeed={0.7}
        />
        
        {/* Red/Amber Glow Planet - Orbit 2.5 */}
        <ShaderPlanet
          position={[0, 0, 0]}
          shader={GlowShader}
          baseColor={new THREE.Color(1.0, 0.3, 0.1)}
          edgeColor={new THREE.Color(1.0, 0.6, 0.3)}
          scale={1.5}
          rotationSpeed={0.3}
          orbitRadius={26}
          orbitSpeed={0.1}
        />
      </Canvas>
    </div>
  );
}
