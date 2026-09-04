"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Calendar, MessageCircle, ChevronLeft, ChevronRight, Siren } from "lucide-react";
import styles from "./Hero.module.css";

const SLIDES = [
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607472829322-9d4dd5f9e0d5?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400&auto=format&fit=crop",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const cardRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mvX.set(0);
    mvY.set(0);
  }

  function go(dir) {
    setDirection(dir);
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }

  return (
    <section className={styles.hero}>
      <div className={styles.glowWrap}>
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className={styles.glowOne}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className={styles.glowTwo}
        />
      </div>

      <div className={styles.inner}>
        {/* Copy */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1 variants={item} className={styles.headline}>
            Birmingham&apos;s Trusted 24/7
            <br />
            <span className={styles.headlineLine}>
              <Siren className={styles.siren} size={36} />
              Emergency Plumbing
            </span>
            <br />
            Experts
          </motion.h1>

          <motion.p variants={item} className={styles.copy}>
            Need a plumber today? Our experienced team is available 24/7 for
            emergency callouts, plumbing repairs, installations, and
            maintenance. We arrive quickly, solve the problem professionally.
          </motion.p>

          <motion.div variants={item} className={styles.buttonRow}>
            <motion.a
              href="#book"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={styles.primaryBtn}
            >
              <Calendar size={18} strokeWidth={2.5} />
              Book Now
            </motion.a>
            <motion.a
              href="#message"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={styles.secondaryBtn}
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              Message us
            </motion.a>
          </motion.div>
        </motion.div>

        {/* 3D tilt image carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{ perspective: 1200 }}
          className={styles.imageOuter}
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={styles.imageCard}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className={styles.slide}
              >
                <Image
                  src={SLIDES[index]}
                  alt="Plumbing repair in progress"
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  className={styles.slideImg}
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className={`${styles.arrow} ${styles.arrowLeft}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className={`${styles.arrow} ${styles.arrowRight}`}
            >
              <ChevronRight size={20} />
            </button>

            <div className={styles.dots}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: "translateZ(40px)" }}
            className={styles.badge}
          >
            <span className={styles.badgeCheck}>✓</span>
            <div className={styles.badgeTextWrap}>
              <p className={styles.badgeTitle}>30 min</p>
              <p className={styles.badgeSub}>avg. response</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}