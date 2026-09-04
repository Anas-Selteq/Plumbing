"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Archive,
  FileText,
  FolderOpen,
  PhoneCall,
  Heart,
  MessageCircle,
} from "lucide-react";
import styles from "./WhyChooseSection.module.css";

// TODO: reuse the same number as TrustSection.jsx — consider moving this to a shared lib/whatsapp.js
const WHATSAPP_NUMBER = "447000000000";
const WHATSAPP_MESSAGE = "Hi, I'd like some help with a plumbing issue.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const REASONS = [
  {
    icon: ShieldCheck,
    title: "1-Year Warranty",
    text: "Every single job we do is backed by a full 12-month warranty. No exceptions.",
  },
  {
    icon: Archive,
    title: "Receipts Stored Safely",
    text: "We keep every material receipt in our system. If a product is under factory warranty, we have the proof — saving you hundreds.",
  },
  {
    icon: FileText,
    title: "Detailed Job Reports",
    text: "Every job comes with a professional report including photos and notes. Perfect for your records or insurance claims.",
  },
  {
    icon: FolderOpen,
    title: "Insurance-Ready Reports",
    text: "We work with insurers and provide the best documentation so you can claim back your money — hassle-free.",
  },
  {
    icon: PhoneCall,
    title: "24/7 Free Phone Advice",
    text: "Our customer service team picks up the phone around the clock. Call us for free advice on any plumbing issue.",
  },
  {
    icon: Heart,
    title: "Your Plumber for Life",
    text: "Every job, every receipt, every report — stored forever in your personal portal. We're with you for the long haul.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function SpotlightCard({ reason }) {
  const cardRef = useRef(null);
  const Icon = reason.icon;

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariant}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onMouseMove={handleMouseMove}
      className={styles.card}
    >
      <div className={styles.cardSpotlight} />
      <div className={styles.cardContent}>
        <span className={styles.iconRing}>
          <Icon size={22} strokeWidth={2.2} />
        </span>
        <h3 className={styles.cardTitle}>{reason.title}</h3>
        <p className={styles.cardText}>{reason.text}</p>
      </div>
    </motion.div>
  );
}

function MagneticButton({ href, children }) {
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e) {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={styles.ctaBtn}
    >
      {children}
      <motion.span
        className={styles.ctaShine}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />
    </motion.a>
  );
}

export default function WhyChooseSection() {
  return (
    <section id="why-us" className={styles.section}>
      <div className={styles.headWrap}>
        <p className={styles.eyebrow}>WHY CHOOSE US</p>
        <h2 className={styles.title}>We&apos;re Not Just Plumbers We&apos;re Your Partners</h2>
        <p className={styles.subtitle}>
          Most plumbers fix and forget. We fix, document, store, and stay with{" "}
          <span className={styles.accent}>you</span> for life. Here&apos;s what sets us apart:
        </p>
      </div>

      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {REASONS.map((reason) => (
          <SpotlightCard key={reason.title} reason={reason} />
        ))}
      </motion.div>

      <div className={styles.ctaWrap}>
        <MagneticButton href={WHATSAPP_LINK}>
          <MessageCircle size={18} strokeWidth={2.5} />
          Message Us
        </MagneticButton>
      </div>
    </section>
  );
}