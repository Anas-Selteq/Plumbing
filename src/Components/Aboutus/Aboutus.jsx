"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { CheckCircle2, ArrowRight, Wrench } from "lucide-react";
import styles from "./AboutSection.module.css";

// TODO: swap for a real photo of the team / a job in progress
const ABOUT_IMAGE = "https://picsum.photos/seed/about-flowfix/700/770";

const CHECKLIST = [
//   "Professional workmanship on every job",
//   "We arrive fully prepared, every time",
//   "Every property treated with care",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function AboutSection() {
  const cardRef = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 20,
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
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        {/* Text column */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={itemUp} className={styles.eyebrow}>
            About Flow Fix 24/7
          </motion.p>

          <motion.h2 variants={itemUp} className={styles.title}>
            A Local Plumbing Team Serving Birmingham
          </motion.h2>

          <motion.p variants={itemUp} className={styles.paragraph}>
            Flow Fix 24/7 is a Birmingham-based plumbing company helping
            homeowners and businesses with reliable plumbing support across
            the local area. Whether you need an Emergency Plumber in
            Birmingham or help with a planned plumbing job, our team focuses
            on clear communication, professional workmanship and treating
            every property with care.
          </motion.p>

          <motion.p variants={itemUp} className={styles.paragraph}>
            Our approach is simple. Provide professional workmanship, arrive
            prepared and treat every property with care. Whether you need an
            emergency plumber or help with a planned plumbing job, our team
            is committed to making the experience straightforward from start
            to finish.
          </motion.p>

          <motion.ul variants={itemUp} className={styles.checklist}>
            {CHECKLIST.map((point) => (
              <li key={point} className={styles.checkItem}>
                <span className={styles.checkIcon}>
                  <CheckCircle2 size={15} strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </motion.ul>

          <motion.a
            variants={itemUp}
            href="#services"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={styles.ctaBtn}
          >
            Learn More About Flow Fix
            <ArrowRight size={16} strokeWidth={2.5} />
            <motion.span
              className={styles.ctaShine}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className={styles.imageWrap}
        >
          <div className={styles.dotPattern} />

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={styles.imageFrame}
          >
            <Image
              src={ABOUT_IMAGE}
              alt="Flow Fix 24/7 plumber at work in Birmingham"
              fill
              sizes="(min-width: 900px) 34vw, 90vw"
              className={styles.image}
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className={styles.floatBadge}
          >
            <span className={styles.floatIcon}>
              <Wrench size={18} strokeWidth={2.5} />
            </span>
            <div>
              <p className={styles.floatTitle}>Locally Owned</p>
              <p className={styles.floatSub}>Serving Birmingham</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}