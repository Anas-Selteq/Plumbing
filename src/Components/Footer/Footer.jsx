"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import styles from "./Footer.module.css";

// TODO: same logo URL is used in Navbar.jsx, and this phone number matches ContactSection.jsx —
// consider a shared lib/constants.js so these only need updating in one place
const LOGO_URL = "https://flowfix247.co.uk/wp-content/uploads/flowfix-logo.jpeg";
const PHONE_DISPLAY = "+44 7915 582754";
const PHONE_TEL = "+447915582754";

const QUICK_LINKS = [
  { label: "Book a Plumber", href: "#book" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const colUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.glowWrap}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={styles.glowOne}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className={styles.glowTwo}
        />
      </div>

      <motion.div
        className={styles.inner}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Brand */}
        <motion.div variants={colUp}>
          <div className={styles.brandRow}>
            <motion.div
              whileHover={{ rotate: -6, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={styles.logoBadge}
            >
              <Image
                src={LOGO_URL}
                alt="Flow Fix 24/7 logo"
                fill
                sizes="44px"
                className={styles.logoImg}
              />
            </motion.div>
            <div>
              <p className={styles.brandTitle}>
                Flow Fix <span className={styles.brandAccent}>24/7</span>
              </p>
              <p className={styles.brandTagline}>HOW PLUMBING SHOULD BE DONE</p>
            </div>
          </div>
          <p className={styles.brandDesc}>
            Birmingham&apos;s most trusted plumbing company. Your plumber for
            life — we never lose your records.
          </p>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={colUp}>
          <p className={styles.colHeading}>QUICK LINKS</p>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map((link) => (
              <li key={link.label} className={styles.linkItem}>
                <a href={link.href}>
                  {link.label}
                  <ArrowRight size={13} strokeWidth={2.5} className={styles.linkArrow} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={colUp}>
          <p className={styles.colHeading}>CONTACT</p>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <Phone size={13} strokeWidth={2.5} />
              </span>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <MapPin size={13} strokeWidth={2.5} />
              </span>
              Broad Street, Birmingham.
            </li>
            <li className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <Clock size={13} strokeWidth={2.5} />
              </span>
              24/7 — Always available
            </li>
          </ul>
        </motion.div>

        {/* Emergency */}
        <motion.div variants={colUp}>
          <p className={styles.colHeading}>EMERGENCY?</p>
          <p className={styles.emergencyText}>
            Our emergency team is on standby 24/7 and arrives within 1 hour.
          </p>
          <motion.a
            href={`tel:${PHONE_TEL}`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={styles.emergencyBtn}
          >
            <AlertTriangle size={15} strokeWidth={2.5} />
            Emergency Line
            <motion.span
              className={styles.emergencyShine}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.p
          className={styles.copyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          © {year} Flow Fix 24/7. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}