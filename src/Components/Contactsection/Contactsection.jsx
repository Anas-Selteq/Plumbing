"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import styles from "./ContactSection.module.css";

// TODO: point this at the same number used elsewhere (consider a shared lib/whatsapp.js)
const WHATSAPP_NUMBER = "447915582754";
const WHATSAPP_DISPLAY = "+44 7915 582754";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I'd like some help with a plumbing issue."
)}`;

const INFO_CARDS = [
  { icon: MapPin, title: "Address", text: "Broad Street, Birmingham." },
  { icon: Mail, title: "Email", text: "flowfixplumb8@gmail.com" },
  { icon: Clock, title: "Hours", text: "24/7 — We never close" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ParticleBurst() {
  const particles = Array.from({ length: 10 });
  return (
    <>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 46;
        return (
          <motion.span
            key={i}
            className={styles.particle}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}

export default function ContactSection() {
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const shakeControls = useAnimation();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status !== "idle") return;

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      shakeControls.start({
        x: [0, -8, 8, -6, 6, 0],
        transition: { duration: 0.4 },
      });
      return;
    }

    setStatus("loading");

    // TODO: replace with a real API call, e.g.
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 2200);
  }

  return (
    <section id="contact" className={styles.section}>
      <motion.div
        className={styles.headWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className={styles.eyebrow}>Need Help Right Now?</p>
        <h2 className={styles.title}>Got a Plumbing Emergency?</h2>
        <p className={styles.subtitle}>
          Burst pipe, serious leak or blocked toilet? Flow Fix 24/7 is ready to help with fast emergency plumbing across Birmingham. Call now and get your plumbing problem dealt with by a professional team.
        </p>
      </motion.div>

      <div className={styles.layout}>
        {/* Left column */}
        <motion.div
          className={styles.leftCol}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemUp}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={styles.waCard}
          >
            <span className={styles.waIconWrap}>
              <span className={styles.waRing} />
              <span className={styles.waRing} />
              <MessageCircle size={22} strokeWidth={2.5} style={{ position: "relative", zIndex: 1 }} />
            </span>
            <span className={styles.waTextWrap}>
              <p className={styles.waNumber}>{WHATSAPP_DISPLAY}</p>
              <p className={styles.waSub}>Message now — free advice</p>
            </span>
            <motion.span
              className={styles.waShine}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          </motion.a>

          {INFO_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={itemUp}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={styles.infoCard}
              >
                <span className={styles.infoAccentBar} />
                <span className={styles.infoIcon}>
                  <Icon size={19} strokeWidth={2.2} />
                </span>
                <span>
                  <p className={styles.infoTitle}>{card.title}</p>
                  <p className={styles.infoText}>{card.text}</p>
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right column — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className={styles.formCard}
        >
          <motion.form animate={shakeControls} onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label
                className={`${styles.inputLabel} ${focusedField === "name" ? styles.inputLabelFocused : ""
                  }`}
              >
                Your Name
              </label>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  placeholder="John Smith"
                  value={form.name}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => update("name", e.target.value)}
                />
                <span className={styles.underline} />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label
                className={`${styles.inputLabel} ${focusedField === "phone" ? styles.inputLabelFocused : ""
                  }`}
              >
                Phone Number
              </label>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  placeholder="07xxx xxxxxx"
                  value={form.phone}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => update("phone", e.target.value)}
                />
                <span className={styles.underline} />
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
              <label
                className={`${styles.inputLabel} ${focusedField === "email" ? styles.inputLabelFocused : ""
                  }`}
              >
                Email Address
              </label>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  placeholder="john@example.com"
                  value={form.email}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => update("email", e.target.value)}
                />
                <span className={styles.underline} />
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
              <label
                className={`${styles.inputLabel} ${focusedField === "message" ? styles.inputLabelFocused : ""
                  }`}
              >
                How Can We Help?
              </label>
              <div className={styles.inputWrap}>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Describe your plumbing issue or enquiry..."
                  value={form.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => update("message", e.target.value)}
                />
                <span className={styles.underline} />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileHover={status === "idle" ? { scale: 1.015 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
              className={`${styles.submitBtn} ${status === "success" ? styles.submitBtnSuccess : ""}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === "idle" && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
                  >
                    <Send size={17} strokeWidth={2.5} />
                    Send Enquiry
                  </motion.span>
                )}
                {status === "loading" && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      style={{ display: "flex" }}
                    >
                      <Loader2 size={17} strokeWidth={2.5} />
                    </motion.span>
                    Sending...
                  </motion.span>
                )}
                {status === "success" && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    style={{ display: "flex", alignItems: "center", gap: "0.625rem", position: "relative" }}
                  >
                    <CheckCircle2 size={17} strokeWidth={2.5} />
                    Sent!
                    <ParticleBurst />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}