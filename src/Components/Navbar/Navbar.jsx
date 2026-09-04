"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import styles from "./Navbar.module.css";

// TODO: same logo URL is used in Footer.jsx — consider moving to a shared constants file
const LOGO_URL = "https://flowfix247.co.uk/wp-content/uploads/flowfix-logo.jpeg";

const NAV_LINKS = [
  { label: "Book Now", href: "#book" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  function handleNavClick(e, href) {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) {
      // eslint-disable-next-line no-console
      console.warn(`No element with id="${id}" found — add id="${id}" to that section.`);
      return;
    }
    const offset = (headerRef.current?.offsetHeight ?? 100) + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <header ref={headerRef} className={styles.header}>
      {/* Top announcement bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.topBar}
      >
        <div className={styles.topBarInner}>
          <MessageCircle className={styles.topBarIcon} size={16} strokeWidth={2.5} />
          <span>WhatsApp Us — 24/7 Free Advice &amp; Emergency Callouts</span>
        </div>
      </motion.div>

      {/* Main nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className={styles.nav}
      >
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
                  <span className={styles.linkUnderline} />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href="#message"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={styles.cta}
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            Message Us
            <motion.span
              className={styles.ctaShine}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
          </motion.a>

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
                <li>
                  <a href="#message" className={styles.mobileCta}>
                    <MessageCircle size={16} strokeWidth={2.5} />
                    Message Us
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}