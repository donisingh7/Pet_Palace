// client/src/components/BannerSlider.jsx
"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './BannerSlider.module.css';

export default function BannerSlider({
  images = [],        // array of image URLs, e.g. ['/b1.jpg','/b2.jpg']
  interval = 5000,    // time each image stays visible (ms)
  transition = 600    // fade duration (ms)
}) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // kick off the loop
    timeoutRef.current = setTimeout(() => {
      // start fade out
      setVisible(false);

      // after fade-out completed, switch image and fade in
      setTimeout(() => {
        setIdx((i) => (i + 1) % images.length);
        setVisible(true);
      }, transition);
    }, interval);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [idx, images.length, interval, transition]);

  return (
    <div className={styles.slider}>
      <div
        className={styles.slide}
        style={{
          transition: `opacity ${transition}ms ease-in-out`,
          opacity: visible ? 1 : 0
        }}
      >
        <Image
          src={images[idx]}
          alt={`Banner ${idx + 1}`}
          fill                        
          style={{ objectFit: 'cover' }}
          priority={idx === 0}
        />
      </div>
    </div>
  );
}
