"use client";

import { useEffect, useRef, useState } from "react";
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
  "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/emergency-plumbing.webp",
  "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/emergency-plumbing-2.webp",
  "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/emergency-plumbing-3.webp",
  "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/emergency-plumbing-4.webp",
  "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/emergency-plumbing-5.webp",
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

const AUTOPLAY_DELAY = 4500;

// Diagonal-feeling clip-path wipe instead of a plain slide/fade — the
// incoming slide reveals itself edge-first rather than just sliding over.
const slideVariants = {
  enter: (dir) => ({
    clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    scale: 1.12,
    filter: "brightness(1.3)",
  }),
  center: {
    clipPath: "inset(0 0 0 0)",
    scale: 1,
    filter: "brightness(1)",
  },
  exit: (dir) => ({
    clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    scale: 1.12,
    filter: "brightness(0.85)",
  }),
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  function go(dir) {
    setDirection(dir);
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }

  // Autoplay — pauses while the user's cursor is over the carousel, and the
  // timer restarts fresh every time `index` changes (auto or manual) so a
  // manual click never gets immediately overridden by a queued auto-advance.
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => go(1), AUTOPLAY_DELAY);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, index]);

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
            <span className={styles.flickerWrap}>
              <Zap size={13} strokeWidth={2.5} />
              24/7 Emergency & General Plumbing in Birmingham
            </span>
          </motion.span>

          <motion.h1 variants={item} className={styles.headline}>
            24/7 Emergency Plumber in Birmingham For Fast, Reliable Repairs
          </motion.h1>

          <motion.p variants={item} className={styles.copy}>
            Need a plumber today? Our experienced team is available 24/7 for emergency callouts, plumbing repairs, installations and maintenance across Birmingham. Whether you're dealing with a burst pipe, leaking tap, blocked drain or another urgent plumbing problem, our Emergency Plumber in Birmingham service is ready to respond quickly and get the problem sorted professionally.
          </motion.p>

          <motion.div variants={item} className={styles.buttonRow}>
            <motion.a
              href="#book"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={styles.primaryBtn}
            >
              <Calendar size={18} strokeWidth={2.5} />
              Call a Plumber Now
            </motion.a>
            <motion.a
              href="#message"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={styles.secondaryBtn}
            >
              <MessageCircle size={18} strokeWidth={2.5} />
              WhatsApp Us
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
            onMouseLeave={() => {
              handleMouseLeave();
              setIsPaused(false);
            }}
            onMouseEnter={() => setIsPaused(true)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={styles.imageCard}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
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