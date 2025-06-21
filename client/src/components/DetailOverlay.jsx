// client/src/components/DetailOverlay.jsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DetailOverlay.module.css";

export default function DetailOverlay({ offer, screenPos }) {
  if (!offer) return null;

  // decide left or right based on x
  const side = screenPos.x > window.innerWidth / 2 ? "left" : "right";
  const boxX = side === "right" ? screenPos.x - 300 : screenPos.x + 20;
  const boxY = screenPos.y - 50;

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 0.5 } },
  };
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.5 } },
  };

  return (
    <div className={styles.root}>
      {/* animated line */}
      <svg className={styles.connector}>
        <motion.path
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          d={`M${screenPos.x},${screenPos.y} L${boxX},${boxY}`}
          stroke="#3498db"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* speech bubble */}
      <AnimatePresence>
        <motion.div
          className={`${styles.bubble} ${styles[side]}`}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ top: boxY, left: boxX }}
        >
          <h4>{offer.title}</h4>
          <p>Details about this offer…</p>
          <button>Shop Now</button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
