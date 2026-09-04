"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Star,
  Phone,
  Clock,
  ShieldCheck,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";
import styles from "./TrustSection.module.css";

// TODO: replace with your real WhatsApp business number, digits only, country code first (no +, no spaces)
const WHATSAPP_NUMBER = "447000000000";
const WHATSAPP_MESSAGE = "Hi, I'd like some help with a plumbing issue.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const STATS = [
  { icon: Phone, value: "24/7", label: "Support", sub: "We always pick up" },
  { icon: Clock, value: "1-Hour", label: "Response", sub: "Emergency team" },
  { icon: ShieldCheck, value: "1-Year", label: "Warranty", sub: "On every job" },
  { icon: Star, target: 5000, suffix: "+", label: "Jobs", sub: "Happy customers" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function CountUpStat({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function TrustSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.inner}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span variants={fadeUp} className={styles.badge}>
          <Star size={14} className={styles.star} />
          Trusted by Thousands Across the West Midlands
        </motion.span>

        <motion.h2 variants={fadeUp} className={styles.title}>
          Birmingham&apos;s Most
          <span className={styles.titleAccent}>Reliable Plumbers</span>
        </motion.h2>

        <motion.p variants={fadeUp} className={styles.tagline}>
          How Plumbing Should Be Done
        </motion.p>

        <motion.p variants={fadeUp} className={styles.copy}>
          Your plumber for life. We keep every report, receipt and warranty
          safe — so you never lose a penny. <strong>Free phone advice, 24/7.</strong>
        </motion.p>

        <motion.div variants={fadeUp} className={styles.buttonRow}>
          <motion.a
            href="#book"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={styles.primaryBtn}
          >
            <CalendarCheck size={18} strokeWidth={2.5} />
            Book a Plumber
          </motion.a>
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={styles.secondaryBtn}
          >
            <MessageCircle size={18} strokeWidth={2.5} />
            Message us
          </motion.a>
        </motion.div>

        <motion.div variants={fadeUp} className={styles.statGrid}>
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={styles.statCard}
              >
                <Icon size={22} className={styles.statIcon} />
                <span className={styles.statValue}>
                  {s.target ? <CountUpStat target={s.target} suffix={s.suffix} /> : s.value}
                  {!s.target && s.suffix ? s.suffix : ""}
                </span>
                <div>
                  <p className={styles.statLabel} style={{ fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                    {s.label}
                  </p>
                  <p className={styles.statLabel}>{s.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}