"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageCircle,
  Phone,
  CalendarCheck,
} from "lucide-react";
import styles from "./Navbar.module.css";

// TODO: same logo URL is used in Footer.jsx, and this phone number matches ContactSection.jsx —
// consider moving these into a shared constants file
const LOGO_URL = "https://flowfix247.co.uk/wp-content/uploads/flowfix-logo.jpeg";
const PHONE_TEL = "+447915582754";
const PHONE_DISPLAY = "+44 7915 582754";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Areas We Cover", href: "#areas" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) {
      // eslint-disable-next-line no-console
      console.warn(`No element with id="${id}" found — add id="${id}" to that section.`);
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleNavClick(e, href) {
    e.preventDefault();
    setMobileOpen(false);
    scrollToId(href.replace("#", ""));
  }

  return (
    <header className={styles.header}>
      {/* Top announcement bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <MessageCircle className={styles.topBarIcon} size={16} strokeWidth={2.5} />
          <span>WhatsApp Us — 24/7 Free Advice &amp; Emergency Callouts</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <div className={styles.navInner}>
          {/* Logo */}
          <a href="#" className={styles.logoLink}>
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
            <div className={styles.logoTextWrap}>
              <p className={styles.logoTitle}>
                Flow Fix <span className={styles.logoTitleAccent}>24/7</span>
              </p>
              <p className={styles.logoTagline}>How plumbing should be done</p>
            </div>
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.label} className={styles.linkItem}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={styles.link}
                >
                  {link.label}
                </a>
                <span className={styles.linkUnderline} />
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className={styles.actions}>
            <a href={`tel:${PHONE_TEL}`} className={styles.callLink}>
              <span className={styles.callIconWrap}>
                <span className={styles.callRing} />
                <Phone size={16} strokeWidth={2.5} style={{ position: "relative", zIndex: 1 }} />
              </span>
              <span className={styles.callTextWrap}>
                <span className={styles.callLabel}>Call Now</span>
                <br />
                <span className={styles.callNumber}>{PHONE_DISPLAY}</span>
              </span>
            </a>

            <motion.a
              href="#book"
              onClick={(e) => handleNavClick(e, "#book")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={styles.cta}
            >
              <CalendarCheck size={16} strokeWidth={2.5} />
              Book a Plumber
              <motion.span
                className={styles.ctaShine}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              />
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={styles.mobileToggle}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={styles.mobileMenu}
            >
              <ul className={styles.mobileList}>
                <li>
                  <a href={`tel:${PHONE_TEL}`} className={styles.mobileCallRow}>
                    <Phone size={16} strokeWidth={2.5} />
                    Call Now — {PHONE_DISPLAY}
                  </a>
                </li>

                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={styles.mobileLink}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}

                <div className={styles.mobileDivider} />

                <li>
                  <a
                    href="#book"
                    onClick={(e) => handleNavClick(e, "#book")}
                    className={styles.mobileCta}
                  >
                    <CalendarCheck size={16} strokeWidth={2.5} />
                    Book a Plumber
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}