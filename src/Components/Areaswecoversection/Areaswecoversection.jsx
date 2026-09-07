"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import styles from "./AreasWeCoverSection.module.css";

const AREAS = [
    "Acocks Green", "Allens Cross", "Alum Rock", "Aston", "Balsall Heath West",
    "Bartley Green", "Billesley", "Birchfield", "Bordesley & Highgate", "Bordesley Green",
    "Bournbrook & Selly Park", "Bournville & Cotteridge", "Brandwood & King's Heath",
    "Bromford & Hodge Hill", "Castle Vale",
    "Druids Heath & Monyhull", "Edgbaston", "Erdington", "Frankley Great Park",
    "Garretts Green", "Glebe Farm & Tile Cross", "Gravelly Hill", "Hall Green North",
    "Hall Green South", "Handsworth", "Handsworth Wood", "Harborne", "Heartlands",
    "Highter's Heath", "Holyhead",
    "King's Norton North", "King's Norton South", "Kingstanding", "Ladywood",
    "Longbridge & West Heath", "Lozells", "Moseley", "Nechells", "Newtown",
    "North Edgbaston", "Northfield", "Oscott", "Perry Barr", "Perry Common", "Pype Hayes",
];

// Golden-angle spiral: gives every pin an evenly-distributed, non-overlapping
// position without needing real coordinates for each of the 45 areas.
const GOLDEN_ANGLE = 137.508;

function useSpiralPositions(count, maxRadiusPct) {
    return useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const angleDeg = i * GOLDEN_ANGLE;
            const angleRad = (angleDeg * Math.PI) / 180;
            const radiusPct = maxRadiusPct * Math.sqrt((i + 1) / count);
            return {
                angleDeg,
                x: 50 + radiusPct * Math.cos(angleRad),
                y: 50 + radiusPct * Math.sin(angleRad),
                radiusPct,
            };
        });
    }, [count, maxRadiusPct]);
}

export default function AreasWeCoverSection() {
    const [hovered, setHovered] = useState(null);
    const positions = useSpiralPositions(AREAS.length, 42);

    return (
        <section id="areas" className={styles.section}>
            <motion.div
                className={styles.headWrap}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
            >
                <p className={styles.eyebrow}>LOCAL PLUMBING SERVICES ACROSS BIRMINGHAM</p>
                <h2 className={styles.title}>Emergency & General Plumbing Services Across Birmingham</h2>
                <p className={styles.subtitle}>
                    Flow Fix 24/7 provides emergency and general plumbing services across Birmingham and surrounding areas.
                    From urgent leaks and burst pipes to blocked drains, plumbing repairs and installations, our team is available
                    24/7 to help homes and businesses with their plumbing needs. Serving customers throughout Birmingham and nearby
                    communities, we aim to provide a reliable local plumbing service whenever you need us.
                </p>
            </motion.div>

            <motion.div
                className={styles.layout}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Radar map */}
                <div className={styles.mapCard}>
                    {[16, 28, 40].map((r) => (
                        <div
                            key={r}
                            className={styles.ring}
                            style={{ width: `${r * 2}%`, height: `${r * 2}%` }}
                        />
                    ))}

                    <motion.div
                        className={styles.sweep}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {positions.map((pos, i) => {
                        const isActive = hovered === i;
                        return (
                            <div key={AREAS[i]}>
                                {isActive && (
                                    <div
                                        className={styles.connector}
                                        style={{
                                            width: `${pos.radiusPct}%`,
                                            transform: `rotate(${pos.angleDeg}deg)`,
                                        }}
                                    />
                                )}
                                <motion.div
                                    className={`${styles.pin} ${isActive ? styles.pinActive : ""}`}
                                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                                    animate={{ scale: isActive ? 2.6 : 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    {isActive && <span className={styles.pinTooltip}>{AREAS[i]}</span>}
                                </motion.div>
                            </div>
                        );
                    })}

                    <div className={styles.center}>
                        <span className={styles.centerPin}>
                            <span className={styles.centerRing} />
                            <MapPin size={20} strokeWidth={2.5} />
                        </span>
                        <p className={styles.centerLabel}>Birmingham</p>
                        <p className={styles.centerSub}>Covering the West Midlands, 24/7</p>
                    </div>
                </div>

                {/* List */}
                <div className={styles.listPanel}>
                    <div className={styles.listGrid}>
                        {AREAS.map((area, i) => (
                            <div
                                key={area}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                                className={`${styles.listItem} ${hovered === i ? styles.listItemActive : ""}`}
                            >
                                <MapPin size={13} strokeWidth={2.5} className={styles.listIcon} />
                                {area}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}