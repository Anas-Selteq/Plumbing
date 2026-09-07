"use client";

import { motion } from "framer-motion";
import { Phone, Clock, ShieldCheck, Star } from "lucide-react";
import styles from "./HeroStats.module.css";

const STATS = [
  { icon: Phone, value: "24/7 Support", label: "We always pick up" },
  { icon: Clock, value: "1-Hour Response", label: "Emergency team" },
  { icon: ShieldCheck, value: "1-Year Warranty", label: "On every job" },
  { icon: Star, value: "5,000+ Jobs", label: "Happy customers" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroStats() {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.grid}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.value}
              variants={cardUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className={styles.card}
            >
              <Icon size={22} className={styles.icon} />
              <p className={styles.value}>{s.value}</p>
              <p className={styles.label}>{s.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}