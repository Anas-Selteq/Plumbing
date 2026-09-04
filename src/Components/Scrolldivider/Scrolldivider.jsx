"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ScrollDivider.module.css";

export default function ScrollDivider() {
  const ref = useRef(null);

  // Tracks how far this element has scrolled through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Line drifts up/down as you scroll past it
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-22, 0, 22]);
  // Line "draws" itself in as it enters view
  const pathLength = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={styles.wrap}>
      <motion.svg
        style={{ y, opacity }}
        className={styles.svg}
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="scrollLineGradient" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0%" stopColor="#f7a922" />
            <stop offset="50%" stopColor="#1f6fed" />
            <stop offset="100%" stopColor="#f7a922" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,45 C150,90 300,0 450,45 C600,90 750,0 900,45 C1050,90 1150,10 1200,45"
          stroke="url(#scrollLineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </motion.svg>
    </div>
  );
}