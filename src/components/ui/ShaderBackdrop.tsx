"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const vert = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += 0.06 * sin((p.x + p.y) * 4.0 + uTime * 0.6);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;

  void main() {
    vec2 uv = vUv - 0.5;
    float r = length(uv);
    float ring = 0.45 + 0.35 * sin(uTime * 0.25 + r * 6.0);
    float fade = smoothstep(0.9, 0.2, r);
    vec3 col = mix(uColor * 0.5, uColor * 1.2, ring) * fade;
    gl_FragColor = vec4(col, 0.3);
  }
`;

const BackdropMat = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#6B21A8") },
  vert,
  frag
);
extend({ BackdropMat });

function Plane() {
  const mat = useRef<any>(null);
  useFrame((_, dt) => {
    if (mat.current) mat.current.uTime += dt;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12, 256, 256]} />
      // @ts-ignore
     // Instead of <backdropMat ref={mat} />
<primitive object={new (BackdropMat as any)()} attach="material" ref={mat as any} />

    </mesh>
  );
}

export default function ShaderBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 opacity-90">
      <Canvas orthographic camera={{ position: [0, 5, 0], zoom: 80 }}>
        <Plane />
      </Canvas>
    </div>
  );
}
