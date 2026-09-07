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
import { Calendar, MessageCircle, ChevronLeft, ChevronRight, Zap, Phone, ShieldCheck, Star, CheckCircle2 } from "lucide-react";
import styles from "./Hero.module.css";

const SLIDES = [
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607472829322-9d4dd5f9e0d5?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1400&auto=format&fit=crop",
];

const STATS = [
  { icon: CheckCircle2, value: "5,000+", label: "Jobs Completed" },
  { icon: Phone, value: "24/7", label: "Emergency Support" },
  { icon: ShieldCheck, value: "12 Months", label: "Workmanship Warranty" },
  { icon: Star, value: "500+", label: "Customer Reviews" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const statContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const statCard = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
          <motion.span variants={item} className={styles.eyebrow}>
            <Zap size={13} strokeWidth={2.5} />
            24/7 Emergency &amp; General Plumbing in Birmingham
          </motion.span>

          <motion.h1 variants={item} className={styles.headline}>
            Birmingham&apos;s Trusted 24/7
            <br />
            Emergency Plumbing
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

      <motion.div
        className={styles.statGrid}
        variants={statContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.value}
              variants={statCard}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className={styles.statCard}
            >
              <Icon size={22} className={styles.statIcon} />
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}