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
    icon: PhoneCall,
    title: "24/7 Emergency Plumbing Support",
    text: "Our team is available 24/7 for emergency plumbing callouts, with free phone advice whenever you need help deciding what to do next.",
  },
  {
    icon: ShieldCheck,
    title: "1-Year Workmanship Warranty",
    text: "Every job is backed by a 12-month workmanship warranty, giving you clear cover after your plumbing work has been completed.",
  },
  {
    icon: FileText,
    title: "Detailed Job Reports",
    text: "Every completed job comes with a professional report containing useful notes and photographs of the work carried out, giving you a clear record for future reference.",
  },
  {
    icon: Archive,
    title: "Receipts Stored Safely",
    text: "We keep records of material receipts used for your job. Where relevant, this can help you access manufacturer or product warranty support without having to search for old paperwork yourself.",
  },
  {
    icon: FolderOpen,
    title: "Insurance-Ready Documentation",
    text: "For plumbing work that may need to be documented for an insurance claim, our detailed reports, photographs and job records give you useful evidence of the work completed.",
  },
  {
    icon: Heart,
    title: "Your Plumber for Life",
    text: "We keep your job history, reports, receipts and warranty information organised in one place, helping you keep track of previous plumbing work and making future repairs easier to manage.",
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
        <p className={styles.eyebrow}>Why Choose Flow Fix 24/7?</p>
        <h2 className={styles.title}>More Than Just a Local Plumbing Service</h2>
        <p className={styles.subtitle}>
          Reliable plumbing from start to finish. Flow Fix 24/7 provides professional repairs,
          emergency callouts and installations across Birmingham, with clear communication and detailed job records.
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