import * as THREE from "three";

export const SunShader = {
  uniforms: {
    time: { value: 0 },
    baseColor: { value: new THREE.Color(1.0, 0.45, 0.05) },
    edgeColor: { value: new THREE.Color(1.0, 0.9, 0.4) },
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
    uniform vec3 edgeColor;
    uniform float intensity;

    varying vec3 vNormal;
    varying vec3 vPosition;

    // --- Fractal Noise ---
    float fbm(vec3 p) {
      float f = 0.0;
      f += 0.5000 * sin(p.x*2.0 + time*1.5);
      f += 0.2500 * sin(p.y*4.0 - time*2.0);
      f += 0.1250 * sin(p.z*8.0 + time*0.5);
      f += 0.0625 * sin((p.x + p.y + p.z)*6.0 - time*0.8);
      return f;
    }

    void main() {
      vec3 viewDir = normalize(vPosition);
      float ndotv = max(0.0, abs(dot(vNormal, viewDir)));

      // --- Fresnel ---
      float fresnel = pow(1.0 - ndotv, 2.8);

      // --- Oberflächenfluss ---
      float rotationFlow = sin(vPosition.y * 10.0 - time * 2.0) * 0.05;
      vec3 shiftedPos = vPosition + vec3(rotationFlow, 0.0, 0.0);

      float turbulence = fbm(shiftedPos * 1.8);
      float plasma = turbulence * 0.4 + sin(time + vPosition.y * 3.0) * 0.1;

      // --- Corona ---
      float corona = exp(-pow(length(vPosition) - 0.9, 2.0) * 20.0);

      // --- Farbverlauf ---
      float blend = clamp(fresnel + plasma * 2.0, 0.0, 1.0);
      vec3 color = mix(baseColor, edgeColor, blend);
      color = mix(color, edgeColor, corona * 0.7);

      // --- Blickwinkel-Flicker ---
      float angleShift = pow(1.0 - abs(dot(normalize(vNormal), normalize(vPosition))), 2.0);
      float flicker = 1.0 + 0.05 * sin(time * 4.0 + angleShift * 20.0);

      // --- Hitzeverzerrung (winzig, stabil) ---
      vec3 distortion = vec3(sin(vPosition.y * 10.0 + time * 2.0)) * 0.0025;

      // --- Glow berechnen ---
      float glow = (fresnel * 1.1 + plasma * 0.6 + corona * 0.9 + 0.2) * (intensity * 0.85);

      gl_FragColor = vec4(clamp((color + distortion) * glow * flicker, 0.0, 1.0), 1.0);
    }
  `
};
