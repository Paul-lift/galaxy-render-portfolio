import * as THREE from "three";

export const QuantumPlasmaShader = {
  uniforms: {
    time: { value: 0 },
    baseColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
    intensity: { value: 1.0 },
  },

  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldNormal;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */ `
    precision highp float;

    uniform float time;
    uniform vec3 baseColor;
    uniform float intensity;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldNormal;

    // Smooth Fractal Brownian Motion
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 1.0;
      float frequency = 1.0;
      
      for(int i = 0; i < 3; i++) {
        value += amplitude * sin(dot(p * frequency, vec3(12.9898, 78.233, 45.164)));
        amplitude *= 0.5;
        frequency *= 2.0;
      }
      return value * 0.5 + 0.5;
    }

    void main() {
      // Smooth normals
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(-vPosition);
      
      // Soft fresnel effect für Rand-Glow
      float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 1.5);
      
      // Smooth cloud pattern - KEIN schnelles Flackern
      float cloudPattern = fbm(vWorldNormal + time * 0.1);
      cloudPattern = smoothstep(0.3, 0.7, cloudPattern);
      
      // Sanfte Variation
      float variation = 0.8 + 0.2 * sin(time * 0.3 + vWorldNormal.x * 3.0);
      
      // Base color mit leichtem Glow
      vec3 color = baseColor;
      
      // Rim lighting für subtiles Glow
      vec3 rimColor = color * 1.3;
      color = mix(color, rimColor, fresnel * 0.4);
      
      // Cloud variation
      color = mix(color, color * 1.1, cloudPattern * 0.3);
      color *= variation;
      
      // Finales Glow - sehr subtil
      float glow = fresnel * 0.5 + 0.3;
      color *= glow * intensity;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};
