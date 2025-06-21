"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useBox, usePointToPointConstraint } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Line } from "@react-three/drei";

function PendulumBob({ position, imgUrl }) {
  // 1. box body for the bob
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 0.1]
  }));

  // 2. constraint pivoting at a point above the bob
  usePointToPointConstraint(ref, undefined, {
    pivotA: [0, 0.5, 0],
    pivotB: position
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color="#ff3e6c" />
      {/* you could map the image as a texture here */}
    </mesh>
  );
}

export default function PendulumDisplay({ category }) {
  // sample data: 5 products under this category
  const items = [
    { id: 1 },{ id: 2 },{ id: 3 },{ id: 4 },{ id: 5 }
  ];
  // positions in a row above
  const startY = 2;
  const startX = -2 + (items.length - 1) * 1.1 * 0.5;
  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} />
      <Physics gravity={[0, -9.81, 0]}>
      {items.map((it, i) => {
     // pivot point in world coords
     const pivot = [startX + i * 1.1, startY + 2, 0];
     // bob initial position
     const bobPos = [startX + i * 1.1, startY, 0];
     return (
       <group key={it.id}>
         {/* The visible rope */}
         <Line
           points={[pivot, bobPos]}
           color="black"
           lineWidth={1}
         />
         {/* The physics‐driven bob */}
         <PendulumBob
           position={bobPos}
           imgUrl={`/products/${category}-${i}.png`}
         />
       </group>
     );
   })}
      </Physics>
      <OrbitControls enabled={false} />
    </Canvas>
  );
}
