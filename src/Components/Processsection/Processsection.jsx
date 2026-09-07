"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Calendar } from "lucide-react";
import styles from "./ProcessSection.module.css";

const STEPS = [
  {
    number: "01",
    title: "Tell Us the Problem",
    text: "Call us, send a WhatsApp message or book online. Tell us what has happened so we can understand what help you need.",
  },
  {
    number: "02",
    title: "Choose a Time",
    text: "Select your preferred date and time when booking online, or let our team know when you need a plumber to attend.",
  },
  {
    number: "03",
    title: "Confirm Your Booking",
    text: "Provide your contact and property details, along with a brief description of the problem. We will review your booking and confirm the next steps.",
  },
  {
    number: "04",
    title: "Assess the Problem",
    text: "Our plumber will inspect the issue, identify the cause and explain the plumbing work required before proceeding.",
  },
  {
    number: "05",
    title: "Complete the Work",
    text: "From emergency plumbing repairs and leak fixes to installations and general plumbing work, we carry out the agreed work professionally.",
  },
  {
    number: "06",
    title: "Receive Your Records",
    text: "After the work is complete, your relevant job report, photographs, receipts and warranty information are kept on record for future reference.",
  },
];

function Step({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });

  return (
    <div ref={ref} className={styles.step}>
      <div className={styles.markerCol}>
        <div className={`${styles.marker} ${inView ? styles.markerActive : ""}`}>
          <span className={styles.markerRing} />
          {step.number}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className={styles.stepCard}
      >
        <p className={styles.stepLabel}>STEP {step.number}</p>
        <p className={styles.stepTitle}>{step.title}</p>
        <p className={styles.stepText}>{step.text}</p>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className={styles.section}>
      <motion.div
        className={styles.headWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>FROM YOUR FIRST CALL TO JOB COMPLETION</p>
        <h2 className={styles.title}>What Happens When You Call Flow Fix 24/7?</h2>
        <p className={styles.subtitle}>
          Getting 24/7 emergency plumbing in Birmingham service should be
          straightforward. Whether you need an emergency callout, plumbing
          repair or installation, Flow Fix 24/7 keeps the process simple from
          your first contact through to completion.
        </p>
      </motion.div>

      <div ref={timelineRef} className={styles.timelineWrap}>
        <div className={styles.trackCol}>
          <div className={styles.track} />
          <motion.div className={styles.progressLine} style={{ scaleY }} />
        </div>

        {STEPS.map((step, i) => (
          <Step key={step.number} step={step} index={i} />
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
          Book a Plumber
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