"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Droplet,
  Waves,
  Wrench,
  Bath,
  UtensilsCrossed,
  ShowerHead,
  Settings2,
  ArrowRight,
  Calendar,
} from "lucide-react";
import styles from "./ServicesSection.module.css";

// TODO: point each "Learn More" at a real service page once those exist
const SERVICES = [
  {
    id: "emergency",
    icon: AlertTriangle,
    label: "Emergency Plumbing",
    text: "Need urgent help with a plumbing problem? Our emergency plumbers are available 24/7 for burst pipes, major leaks, overflowing toilets, blocked drains and other problems that need prompt attention.",
    accent: "#ef4444",
  },
  {
    id: "leak-detection",
    icon: Droplet,
    label: "Leak Detection & Repair",
    text: "A leaking pipe, tap or plumbing fixture can quickly cause water damage. We identify the source of the leak and carry out the necessary repair to help prevent the problem from getting worse.",
    accent: "#0ea5e9",
  },
  {
    id: "drain-unblocking",
    icon: Waves,
    label: "Drain Unblocking",
    text: "Blocked sinks, toilets, baths and drains can be frustrating and disruptive. We diagnose the cause of the blockage and provide effective drain unblocking to get your plumbing flowing properly again.",
    accent: "#14b8a6",
  },
  {
    id: "pipe-repairs",
    icon: Wrench,
    label: "Pipe Repairs",
    text: "Damaged or leaking pipework can lead to water loss, damp and serious property damage. Our plumbers repair faulty, cracked and leaking pipes and help restore your plumbing system.",
    accent: "#6366f1",
  },
  {
    id: "bathroom",
    icon: Bath,
    label: "Bathroom Plumbing",
    text: "From leaking taps and toilets to showers, baths, basins and pipework, we provide bathroom plumbing repairs, replacements and installation services for homes across Birmingham.",
    accent: "#1f6fed",
  },
  {
    id: "kitchen",
    icon: UtensilsCrossed,
    label: "Kitchen Plumbing",
    text: "We handle a range of kitchen plumbing problems, including leaking taps, sink issues, pipework and appliance connections. Whether you need a repair or new installation, our team can help.",
    accent: "#f59e0b",
  },
  {
    id: "new-installation",
    icon: ShowerHead,
    label: "New Installation",
    text: "Planning a new bathroom, kitchen or plumbing system? We provide plumbing installation and replacement work for a range of residential and commercial requirements.",
    accent: "#8b5cf6",
  },
  {
    id: "plumbing-repairs",
    icon: Settings2,
    label: "Plumbing Repairs",
    text: "Not every plumbing problem is an emergency. We also handle everyday plumbing repairs, faults and maintenance to keep your home's plumbing working safely and reliably.",
    accent: "#16a34a",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: (i % 4) * 0.09 },
  }),
};

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const Icon = service.icon;

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{ "--accent": service.accent }}
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.cardSpotlight} />

      <motion.div
        className={styles.iconTile}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,
        }}
        whileHover={{ scale: 1.12, rotate: -8 }}
      >
        <Icon size={24} strokeWidth={2.2} />
      </motion.div>

      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>{service.label}</p>
        <p className={styles.cardText}>{service.text}</p>
        <a href="#book" className={styles.learnMore}>
          Learn More
          <ArrowRight size={14} strokeWidth={2.5} className={styles.learnMoreArrow} />
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.glowWrap}>
        <div className={styles.glowOne} />
        <div className={styles.glowTwo} />
      </div>

      <motion.div
        className={styles.headWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>PROFESSIONAL PLUMBING SERVICES</p>
        <h2 className={styles.title}>Our Plumbing Services</h2>
        <p className={styles.subtitle}>
          From urgent plumbing emergencies to planned repairs and
          installations, Flow Fix 24/7 provides reliable plumbing services
          for homes and businesses. Our experienced plumbers can help with
          leaks, blocked drains, damaged pipework, bathroom and kitchen
          plumbing, installations and a wide range of everyday plumbing
          problems.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <motion.a
          href="#book"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className={styles.ctaBtn}
        >
          <Calendar size={17} strokeWidth={2.5} />
          Book Now
          <motion.span
            className={styles.ctaShine}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
          />
        </motion.a>
      </div>
    </section>
  );
}