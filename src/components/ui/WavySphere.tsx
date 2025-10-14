"use client";
import * as THREE from "three";
import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";

/* =========================
   SHADER (White–Black–Purple Glow)
   ========================= */
const vert = /* glsl */ `
  uniform float uTime;
  uniform float uNoiseScale;
  varying vec3 vNormal;

  float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
  float noise(vec3 p){
    vec3 i=floor(p), f=fract(p);
    float n000=hash(i+vec3(0,0,0));
    float n100=hash(i+vec3(1,0,0));
    float n010=hash(i+vec3(0,1,0));
    float n110=hash(i+vec3(1,1,0));
    float n001=hash(i+vec3(0,0,1));
    float n101=hash(i+vec3(1,0,1));
    float n011=hash(i+vec3(0,1,1));
    float n111=hash(i+vec3(1,1,1));
    vec3 u=f*f*(3.0-2.0*f);
    return mix(
      mix(mix(n000,n100,u.x), mix(n010,n110,u.x), u.y),
      mix(mix(n001,n101,u.x), mix(n011,n111,u.x), u.y),
      u.z
    );
  }

  void main(){
    vNormal = normal;
    vec3 p = position;
    float n = noise(normal * uNoiseScale + vec3(uTime * 0.25));
    p += normal * (n * 0.25);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  varying vec3 vNormal;

  void main(){
    float glow = 0.5 + 0.5 * sin(uTime * 1.5);
    vec3 base = mix(vec3(0.05, 0.02, 0.1), vec3(1.0, 1.0, 1.0), abs(vNormal.z));
    vec3 purple = vec3(0.42, 0.0, 0.65);   // deep dark purple
    vec3 col = mix(base, purple, 0.65 + 0.35 * glow);
    col *= (0.4 + 0.6 * pow(abs(normalize(vNormal).z), 1.5));
    gl_FragColor = vec4(col * 1.1, 1.0);
  }
`;

/* =========================
   MATERIAL SETUP
   ========================= */
const WavyMat = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color("#6B21A8"), uNoiseScale: 2.6 },
  vert,
  frag
);

function Mesh() {
  // Create the material once
  const material = useMemo(
    () =>
      new (WavyMat as any)({
        uTime: 0,
        uColor: new THREE.Color("#6B21A8"), // dark purple
        uNoiseScale: 2.6,
      }),
    []
  );

  useFrame((_, dt) => {
    if (material) material.uTime += dt;
  });

  return (
    <mesh rotation={[0.5, 0.2, 0]}>
      <icosahedronGeometry args={[1.2, 64]} />
      {/* Safe, TS-friendly material attach */}
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* =========================
   MAIN EXPORT
   ========================= */
export default function WavySphere() {
  return (
    <div className="relative h-[360px] w-full rounded-3xl overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        style={{
          background:
            "radial-gradient(circle at 50% 60%, #000000 0%, #0a0012 60%, #000000 100%)",
        }}
      >
        {/* Subtle ambient and rim lighting */}
        <ambientLight intensity={0.25} color={"#ffffff"} />
        <directionalLight position={[2, 3, 2]} intensity={1.4} color={"#ffffff"} />
        <pointLight position={[-3, -2, -3]} intensity={1.1} color={"#6B21A8"} />

        {/* Main object */}
        <Mesh />

        {/* Soft user camera movement */}
        <OrbitControls enableZoom={false} enablePan={false} enableDamping />
      </Canvas>

      {/* Optional Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-black/80 pointer-events-none" />
    </div>
  );
}
