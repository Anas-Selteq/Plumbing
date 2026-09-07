"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import styles from "./ReviewsSection.module.css";

const REVIEWS = [
  {
    quote:
      "Emergency boiler breakdown on Christmas Eve. They came out within 40 minutes! Absolutely brilliant service. Can't recommend them enough.",
    name: "Mohammed A.",
    location: "Erdington",
  },
  {
    quote:
      "Flow Fix are incredible. They fixed my boiler and kept the receipt for the part. When it failed again under warranty, they had the proof ready. Saved me over £400!",
    name: "Sarah Thompson",
    location: "Edgbaston",
  },
  {
    quote:
      "Needed a full bathroom refit. The plumber was so professional and the final report with photos was amazing. My insurance paid out in full thanks to it.",
    name: "Rajesh Patel",
    location: "Solihull",
  },
];

const TOTAL_REVIEWS = 45;
const SHOWN_REVIEWS = 3;

function ReviewCard({ review, index }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.35 });

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
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
    <motion.div
      className={styles.cardOuter}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.12 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className={styles.card}
      >
        <Quote className={styles.quoteMark} size={44} fill="currentColor" strokeWidth={0} />

        <div className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: index * 0.12 + 0.3 + i * 0.07,
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <Star size={16} className={styles.star} />
            </motion.span>
          ))}
        </div>

        <p className={styles.quoteText}>&ldquo;{review.quote}&rdquo;</p>
        <p className={styles.name}>{review.name}</p>
        <p className={styles.location}>{review.location}</p>
      </motion.div>
    </motion.div>
  );
}

function CountUpFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, TOTAL_REVIEWS, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView]);

  return (
    <div ref={ref} className={styles.footerRow}>
      <p className={styles.footerText}>
        Showing {SHOWN_REVIEWS} of <span className={styles.footerCount}>{count}</span> five-star
        reviews
      </p>
      <motion.a
        href="#"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={styles.ctaBtn}
      >
        Read More Reviews
        <ArrowRight size={16} strokeWidth={2.5} />
      </motion.a>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.headWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>TRUSTED BY BIRMINGHAM CUSTOMERS</p>
        <h2 className={styles.title}>What Our Customers Say</h2>
        <p className={styles.subtitle}>
          From emergency plumbing callouts to bathroom projects and repairs,
          customers across Birmingham and the West Midlands choose Flow Fix
          24/7 for professional service and clear job documentation.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {REVIEWS.map((review, i) => (
          <ReviewCard key={review.name} review={review} index={i} />
        ))}
      </div>

      <CountUpFooter />
    </section>
  );
}