"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./ServicesSection.module.css";

// TODO: swap these for real job-site photos
const SERVICES = [
  {
    id: "bathroom",
    label: "Bathroom Plumbing",
    img: "https://picsum.photos/seed/bathroom-plumbing/700/540",
  },
  {
    id: "kitchen",
    label: "Kitchen Plumbing",
    img: "https://picsum.photos/seed/kitchen-plumbing/700/540",
  },
  {
    id: "pipe-repairs",
    label: "Pipe Repairs",
    img: "https://picsum.photos/seed/pipe-repairs/700/540",
  },
  {
    id: "drain-unblocking",
    label: "Drain Unblocking",
    img: "https://picsum.photos/seed/drain-unblocking/700/540",
  },
  {
    id: "leak-repair",
    label: "Leak Repair",
    img: "https://picsum.photos/seed/leak-repair/700/540",
  },
  {
    id: "new-installation",
    label: "New Installation",
    img: "https://picsum.photos/seed/new-installation/700/540",
  },
  {
    id: "plumbing-repair",
    label: "Plumbing Repair",
    img: "https://picsum.photos/seed/plumbing-repair/700/540",
  },
  {
    id: "emergency",
    label: "Emergency Plumbing",
    img: "https://picsum.photos/seed/emergency-plumbing/700/540",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: (i % 3) * 0.1 },
  }),
};

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Image drifts inside its frame as the card scrolls through the viewport
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      custom={index}
      variants={cardVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className={styles.imageFrame}>
        <motion.div className={styles.imageInner} style={{ y: imgY }}>
          <Image
            src={service.img}
            alt={service.label}
            fill
            sizes="(min-width: 768px) 320px, 90vw"
            className={styles.image}
          />
        </motion.div>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardTitle}>{service.label}</p>
        <a href="#book" className={styles.bookBtn}>
          Book Now
          <ArrowRight size={14} strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.headWrap}>
        <p className={styles.eyebrow}>WHAT WE DO</p>
        <h2 className={styles.title}>Our Plumbing Services</h2>
        <p className={styles.subtitle}>
          From a <span className={styles.accentRed}>dripping</span> tap to a{" "}
          <span className={styles.accentBlue}>full bathroom refit</span>, our
          experienced team <span className={styles.accentGreen}>handles it all</span>.
        </p>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}