// client/src/components/OffersSection.jsx
"use client";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OfferCluster from "./OfferCluster";
import DetailOverlay from "./DetailOverlay";
import styles from "./OffersSection.module.css";

export default function OffersSection() {
  // track which sphere is hovered and its screen position
  const [hovered, setHovered] = useState(null);
  const [screenPos, setScreenPos] = useState({ x: 0, y: 0 });

  return (
    <div className={styles.wrapper}>
      <Canvas className={styles.canvas}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OfferCluster
          onHover={(data) => {
            setHovered(data.offer);
            setScreenPos(data.screenPos);
          }}
          onUnhover={() => setHovered(null)}
        />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <DetailOverlay offer={hovered} screenPos={screenPos} />
    </div>
  );
}
