"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import styles from "./FAQSection.module.css";

const FAQS = [
  {
    q: "Do you provide emergency plumbing 24/7?",
    a: "Yes, Flow Fix 24/7 provides emergency plumbing services around the clock across Birmingham and surrounding areas. We help with urgent problems including leaks, burst pipes, blocked toilets and other plumbing emergencies.",
  },
  {
    q: "How quickly can a plumber attend in Birmingham?",
    a: "Our emergency plumbing team aims to respond as quickly as possible, depending on your location, availability and the urgency of the problem. Contact us for the latest availability and response information.",
  },
  {
    q: "What areas of Birmingham do you cover?",
    a: "We provide plumbing services across Birmingham and nearby areas. Our service areas include Edgbaston, Harborne, Moseley, Erdington, Sutton Coldfield, Kings Heath, Selly Oak, Hall Green and other surrounding locations.",
  },
  {
    q: "What plumbing emergencies do you deal with?",
    a: "We deal with a range of plumbing emergencies, including burst pipes, serious leaks, blocked toilets, blocked drains and urgent pipework problems. Contact us as soon as possible if your plumbing issue is causing damage or disruption.",
  },
  {
    q: "Can you repair leaking pipes?",
    a: "Yes, we repair leaking and damaged pipework as part of our plumbing repair services. We identify the source of the problem and carry out the appropriate repair.",
  },
  {
    q: "Can you unblock toilets, sinks and drains?",
    a: "Yes, Flow Fix 24/7 provides drain unblocking for blocked toilets, sinks, baths and drains. Our plumber will assess the blockage and work to restore normal drainage.",
  },
  {
    q: "Do you provide bathroom and kitchen plumbing?",
    a: "Yes, we provide bathroom and kitchen plumbing services, including repairs, replacements and installation work. This includes plumbing for fixtures, fittings, pipework and connections.",
  },
  {
    q: "Do you provide plumbing installations?",
    a: "Yes, we provide plumbing installation and replacement services for a range of residential and commercial requirements. Contact us to discuss your project and the work involved.",
  },
  {
    q: "Is your plumbing work covered by a warranty?",
    a: "Yes, Flow Fix 24/7 offers a 12-month workmanship warranty on eligible completed work. Ask our team for the applicable warranty terms before work begins.",
  },
  {
    q: "Do you provide job reports and receipts?",
    a: "Yes, Flow Fix 24/7 keeps job reports, photographs and relevant receipts as part of its service documentation. These records can be useful for future reference, warranties and insurance-related requirements.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <motion.div variants={itemUp} className={`${styles.item} ${isOpen ? styles.itemActive : ""}`}>
      <button onClick={onToggle} className={styles.question} aria-expanded={isOpen}>
        <span className={styles.questionText}>{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={styles.iconWrap}
        >
          <Plus size={16} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.answerWrap}
          >
            <p className={styles.answerInner}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className={styles.section}>
      <motion.div
        className={styles.headWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>BEFORE YOU BOOK</p>
        <h2 className={styles.title}>Frequently Asked Questions About Plumbing in Birmingham</h2>
      </motion.div>

      <motion.div
        className={styles.list}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {FAQS.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
          />
        ))}
      </motion.div>
    </section>
  );
}