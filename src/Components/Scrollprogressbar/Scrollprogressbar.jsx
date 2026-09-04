import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgressBar.module.css";

export default function ScrollProgressBar() {
  // Tracks 0 -> 1 across the whole page's scroll range, both directions
  const { scrollYProgress } = useScroll();

  // Spring just smooths out fast/jerky scroll wheel input — remove this and
  // use scrollYProgress directly in style={{ scaleX }} if you want it 1:1 raw
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className={styles.bar} style={{ scaleX }} />;
}