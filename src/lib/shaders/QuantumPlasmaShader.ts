import * as THREE from "three";

export const QuantumPlasmaShader = {
  uniforms: {
    time: { value: 0 },
    baseColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
    intensity: { value: 2.0 },
  },

  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
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

    // Plasma Noise Funktion
    float plasma(vec3 p) {
      return sin(p.x*1.3 + time*1.1)
           + sin(p.y*2.1 - time*0.9)
           + sin(p.z*2.7 + time*1.3)
           + sin((p.x+p.y+p.z)*1.5 - time*0.5);
    }

    void main() {
      vec3 viewDir = normalize(vPosition);
      float edge = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);

      float plasmaField = plasma(vPosition * 0.6) * 0.25;
      float inner = smoothstep(0.0, 1.0, edge + plasmaField);

      vec3 cold = baseColor;
      vec3 warm = vec3(1.0, 1.0, 1.0);
      vec3 mixCol = mix(cold, warm, inner);

      float hueShift = 0.5 + 0.5 * sin(time * 0.7);
      mixCol = mix(mixCol, vec3(0.3, 1.0, 1.0), hueShift * 0.2);

      float glow = (edge * 0.8 + 0.2) + 0.1 * sin(time + vPosition.y*5.0);
      vec3 color = mixCol * intensity * glow;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};
