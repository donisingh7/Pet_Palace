// client/src/components/OfferCluster.jsx
"use client";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, a } from "@react-spring/three";
import { useDrag } from "@use-gesture/react";


// 1) List out all your offers here (15–20 if you like)
const offers = [
      { id: 1, img: "/offers/o1.png", title: "30% OFF Dog Food" },
      { id: 2, img: "/offers/o2.png", title: "Buy 2, Get 1 Free Toys" },
      { id: 3, img: "/offers/o3.png", title: "20% OFF Grooming Kit" },
      { id: 4, img: "/offers/o4.png", title: "15% OFF Health Care" },
      { id: 5, img: "/offers/o5.png", title: "Free Shipping" },
      { id: 6, img: "/offers/o6.png", title: "New Arrivals" },
      { id: 7, img: "/offers/o7.png", title: "Buy 1, Get 1 Free Chew Toys" },
      { id: 8, img: "/offers/o8.png", title: "25% OFF Cat Food" },
      { id: 9, img: "/offers/o9.png", title: "20% OFF Flea & Tick Treatments" },
      { id: 10, img: "/offers/o10.png", title: "Subscribe & Save 10% on Treat Boxes" },
      { id: 11, img: "/offers/o11.png", title: "FREE Gift with Purchase Over ₹2,000" },
      { id: 12, img: "/offers/o12.png", title: "50% OFF Holiday Pet Apparel" },
      { id: 13, img: "/offers/o13.png", title: "Bundle & Save: Collar + Leash Set" },
      { id: 14, img: "/offers/o14.png", title: "15% OFF Wellness Supplements" },
      { id: 15, img: "/offers/o15.png", title: "Early Bird Special: 30% OFF Pre-Orders" },
      { id: 16, img: "/offers/o16.png", title: "Limited-Time: 40% OFF Orthopedic Pet Beds" },
      // …add as many as you want…
    ];

export default function OfferCluster({ onHover, onUnhover }) {
  const group = useRef();
  // drag to rotate the entire group
  const [{ rx, ry }, api] = useSpring(() => ({ rx: 0, ry: 0 }));
  useDrag(
    ({ movement: [mx, my] }) => api.start({ ry: mx / 100, rx: -my / 100 }),
    { target: group }
  );
  useFrame(() => {
    group.current.rotation.x = rx.get();
    group.current.rotation.y = ry.get();
  });   
 
   // 3) Get camera + viewport size for screen-projection
 const { camera, size } = useThree();
 // one Vector3 reused for projection
 const vec = useMemo(() => new THREE.Vector3(), []);


 const positions = [
    [  0.00,   0.00, 0],

    // inner hexagon (radius = 1.7)
    [  1.70,   0.00, 0],
    [ -1.70,   0.00, 0],
    [  0.85,   1.47, 0],
    [  0.85,  -1.47, 0],
    [ -0.85,   1.47, 0],
    [ -0.85,  -1.47, 0],
  
    // outer nonagon (radius = 3.4, 9 pts evenly spaced)
    [  3.40,   0.00, 0],
    [  2.61,   2.19, 0],
    [  0.59,   3.35, 0],
    [ -1.70,   2.94, 0],
    [ -3.20,   1.16, 0],
    [ -3.20,  -1.16, 0],
    [ -1.70,  -2.94, 0],
    [  0.59,  -3.35, 0],
    [  2.61,  -2.19, 0],
       // …and so on until positions.length >= offers.length
     ];

  return (
    <a.group ref={group}>
          {offers.map((offer, i) => {
            // load the texture for each sphere
            const texture = useLoader(THREE.TextureLoader, offer.img);
            return (
              <mesh
                key={offer.id}
                position={positions[i]}
                onPointerOver={(e) => {
                  // 1) world point of intersection
                  const worldPoint = e.point.clone();
                  // 2) project to normalized device coords
                  vec.copy(worldPoint).project(camera);
                  // 3) convert to screen pixels
                  const x = (vec.x * 0.5 + 0.5) * size.width;
                  const y = (-vec.y * 0.5 + 0.5) * size.height;
                  onHover({ offer, screenPos: { x, y } });
                }}
                onPointerOut={onUnhover}
              >
                <sphereGeometry args={[0.75, 32, 32]} />
                <meshStandardMaterial map={texture} />
              </mesh>
            );
          })}
        </a.group>
  );
}
