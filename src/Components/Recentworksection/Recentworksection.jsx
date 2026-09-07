"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Expand,
    X,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Bath,
    AlertTriangle,
    Waves,
    UtensilsCrossed,
    Droplet,
    ShowerHead,
} from "lucide-react";
import styles from "./RecentWorkSection.module.css";

// TODO: swap these for real completed-job photos
const WORK_ITEMS = [
    {
        id: "job-1",
        img: "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/completed-bathroom-plumbing.webp",
        caption: "Complete bathroom plumbing",
        tag: "Bathroom Plumbing",
        icon: Bath,
        accent: "#1f6fed",
    },
    {
        id: "job-2",
        img: "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/completed-kitchen-plumbing.webp",
        caption: "Complete kitchen plumbing",
        tag: "Kitchen Plumbing",
        icon: UtensilsCrossed,
        accent: "#ef4444",
    },
    {
        id: "job-3",
        img: "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/completed-leak-repair.webp",
        caption: "Complete leak repair",
        tag: "Leak Repair",
        icon: Droplet,
        accent: "#14b8a6",
    },
    {
        id: "job-4",
        img: "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/bathroom-renovation-plumbing.webp",
        caption: "Bathroom renovation plumbing",
        tag: "Bathroom Plumbing",
        icon: AlertTriangle,
        accent: "#f59e0b",
    },
    {
        id: "job-5",
        img: "https://d3mjveznuygujv.cloudfront.net/Flow-Fix-24-7/boiler-and-pipework-installation.webp",
        caption: "Boiler and pipework installation",
        tag: "Boiler and pipework installation",
        icon: Waves,
        accent: "#0ea5e9",
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function RecentWorkSection() {
    const [activeIndex, setActiveIndex] = useState(null);
    const isOpen = activeIndex !== null;
    const activeItem = isOpen ? WORK_ITEMS[activeIndex] : null;

    function close() {
        setActiveIndex(null);
    }

    function next(e) {
        e.stopPropagation();
        setActiveIndex((i) => (i + 1) % WORK_ITEMS.length);
    }

    function prev(e) {
        e.stopPropagation();
        setActiveIndex((i) => (i - 1 + WORK_ITEMS.length) % WORK_ITEMS.length);
    }

    return (
        <section className={styles.section}>
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
                <p className={styles.eyebrow}>OUR RECENT PLUMBING WORK</p>
                <h2 className={styles.title}>Plumbing Work Completed Across Birmingham</h2>
            </motion.div>

            <motion.div
                className={styles.grid}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                {WORK_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={item.id}
                            variants={itemUp}
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            onClick={() => setActiveIndex(i)}
                            className={styles.card}
                            style={{ "--accent": item.accent }}
                        >
                            <div className={styles.imageFrame}>
                                <Image
                                    src={item.img}
                                    alt={item.caption}
                                    fill
                                    sizes="(min-width: 860px) 24vw, (min-width: 480px) 45vw, 90vw"
                                    className={styles.image}
                                />
                                <span className={styles.tag}>
                                    <Icon size={12} strokeWidth={2.5} />
                                    {item.tag}
                                </span>
                                <div className={styles.overlay}>
                                    <span className={styles.expandIcon}>
                                        <Expand size={20} strokeWidth={2.5} />
                                    </span>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <p className={styles.caption}>{item.caption}</p>
                            </div>
                            <div className={styles.accentBar} />
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className={styles.ctaWrap}>
                <motion.a
                    href="#"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={styles.ctaBtn}
                >
                    View More Plumbing Work
                    <ArrowRight size={16} strokeWidth={2.5} />
                    <motion.span
                        className={styles.ctaShine}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
                    />
                </motion.a>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={close}
                        className={styles.lightboxBackdrop}
                    >
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className={styles.lightboxImageWrap}
                        >
                            <Image
                                src={activeItem.img}
                                alt={activeItem.caption}
                                fill
                                sizes="90vw"
                                className={styles.lightboxImage}
                            />
                            <div className={styles.lightboxCaption}>{activeItem.caption}</div>
                        </motion.div>

                        <button onClick={close} aria-label="Close" className={styles.lightboxClose}>
                            <X size={20} />
                        </button>
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                        >
                            <ChevronRight size={22} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}