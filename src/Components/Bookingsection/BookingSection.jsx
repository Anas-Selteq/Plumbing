"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowLeft,
  ArrowRight,
  Check,
  Bath,
  UtensilsCrossed,
  Wrench,
  Waves,
  Droplet,
  ShowerHead,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react";
import styles from "./BookingSection.module.css";

// ---- Dummy data (swap for API responses later) ----
const SERVICES = [
  { id: "bathroom", label: "Bathroom Plumbing", icon: Bath },
  { id: "kitchen", label: "Kitchen Plumbing", icon: UtensilsCrossed },
  { id: "pipe-repairs", label: "Pipe Repairs", icon: Wrench },
  { id: "drain-unblocking", label: "Drain Unblocking", icon: Waves },
  { id: "leak-repair", label: "Leak Repair", icon: Droplet },
  { id: "new-installation", label: "New Installation", icon: ShowerHead },
  { id: "plumbing-repair", label: "Plumbing Repair", icon: Wrench },
  { id: "emergency", label: "Emergency Plumbing", icon: AlertTriangle },
  { id: "other", label: "Something Else", icon: MoreHorizontal },
];

const DAYS = [
  { id: "tue-1", name: "Tue", num: "1" },
  { id: "wed-2", name: "Wed", num: "2" },
  { id: "thu-3", name: "Thu", num: "3" },
  { id: "fri-4", name: "Fri", num: "4" },
  { id: "sat-5", name: "Sat", num: "5" },
];

const TIMES = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "ASAP"];

const STEPS = [
  { id: 1, label: "Service" },
  { id: 2, label: "Date & Time" },
  { id: 3, label: "Details" },
  { id: 4, label: "Confirm" },
];

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceId: null,
    dayId: null,
    time: null,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const selectedService = SERVICES.find((s) => s.id === form.serviceId);
  const selectedDay = DAYS.find((d) => d.id === form.dayId);

  function update(fields) {
    setForm((f) => ({ ...f, ...fields }));
  }

  function canProceed() {
    if (step === 1) return !!form.serviceId;
    if (step === 2) return !!form.dayId && !!form.time;
    if (step === 3) return form.fullName.trim() && form.phone.trim() && form.email.trim();
    return true;
  }

  function goNext() {
    if (!canProceed()) return;
    setStep((s) => Math.min(s + 1, 4));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleConfirm() {
    // TODO: replace with real API call, e.g.
    // await fetch("/api/bookings", { method: "POST", body: JSON.stringify(form) })
    setSubmitted(true);
  }

  return (
    <section id="book" className={styles.section}>
      <div className={styles.headWrap}>
        <span className={styles.badge}>
          <Zap size={14} strokeWidth={2.5} />
          Book in Under 60 Seconds
        </span>
        <h2 className={styles.title}>Book a Plumber</h2>
        <p className={styles.subtitle}>
          Pick your service, choose a date, and we&apos;ll handle the rest. It&apos;s that simple.
        </p>
      </div>

      <div className={styles.card}>
        {/* Stepper */}
        <div className={styles.stepper}>
          {STEPS.map((s, i) => {
            const isActive = step === s.id;
            const isDone = step > s.id;
            const canJump = s.id < step;
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => canJump && setStep(s.id)}
                  className={`${styles.stepItem} ${canJump ? styles.clickable : ""}`}
                >
                  <span
                    className={`${styles.stepCircle} ${
                      isActive ? styles.stepCircleActive : isDone ? styles.stepCircleDone : ""
                    }`}
                  >
                    {isDone ? <Check size={14} /> : s.id}
                  </span>
                  <span className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : ""}`}>
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <span className={`${styles.stepLine} ${step > s.id ? styles.stepLineDone : ""}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {step === 1 && (
              <div>
                <p className={styles.stepHeading}>What do you need help with?</p>
                <div className={styles.serviceGrid}>
                  {SERVICES.map((s) => {
                    const Icon = s.icon;
                    const selected = form.serviceId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => update({ serviceId: s.id })}
                        className={`${styles.serviceCard} ${selected ? styles.selected : ""}`}
                      >
                        <Icon size={26} className={styles.serviceIcon} />
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className={styles.stepHeading}>When works best?</p>
                <p className={styles.stepSub}>Pick a preferred day and time slot.</p>

                <p className={styles.fieldLabel}>Choose a day</p>
                <div className={styles.dayGrid}>
                  {DAYS.map((d) => {
                    const selected = form.dayId === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => update({ dayId: d.id })}
                        className={`${styles.dayCard} ${selected ? styles.selected : ""}`}
                      >
                        <span className={styles.dayName}>{d.name}</span>
                        <span className={styles.dayNum}>{d.num}</span>
                      </button>
                    );
                  })}
                </div>

                <p className={styles.fieldLabel}>Choose a time</p>
                <div className={styles.timeGrid}>
                  {TIMES.map((t) => {
                    const selected = form.time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update({ time: t })}
                        className={`${styles.timeCard} ${selected ? styles.selected : ""}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className={styles.stepHeading}>Your details</p>
                <p className={styles.stepSub}>So we know where to send your plumber.</p>

                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.inputLabel}>Full Name</label>
                    <input
                      className={styles.input}
                      placeholder="John Smith"
                      value={form.fullName}
                      onChange={(e) => update({ fullName: e.target.value })}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.inputLabel}>Phone Number</label>
                    <input
                      className={styles.input}
                      placeholder="07xxx xxxxxx"
                      value={form.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.inputLabel}>Email Address</label>
                    <input
                      className={styles.input}
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => update({ email: e.target.value })}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.inputLabel}>Address</label>
                    <input
                      className={styles.input}
                      placeholder="Street, city, postcode"
                      value={form.address}
                      onChange={(e) => update({ address: e.target.value })}
                    />
                  </div>
                  <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                    <label className={styles.inputLabel}>Describe the issue (optional)</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="A quick note about what's going on..."
                      value={form.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className={styles.confirmWrap}>
                <span className={styles.confirmCheck}>
                  <Check size={26} strokeWidth={3} />
                </span>
                <p className={styles.stepHeading}>Confirm your booking</p>
                <p className={styles.stepSub}>Review your details, then send it through — we&apos;ll call to confirm.</p>

                <div className={styles.summaryCard}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Service</span>
                    <span className={styles.summaryValue}>{selectedService?.label ?? "—"}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>When</span>
                    <span className={styles.summaryValue}>
                      {selectedDay ? `${selectedDay.name} ${selectedDay.num}` : "—"} · {form.time ?? "—"}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Name</span>
                    <span className={styles.summaryValue}>{form.fullName || "—"}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Phone</span>
                    <span className={styles.summaryValue}>{form.phone || "—"}</span>
                  </div>
                </div>

                {submitted && <p className={styles.successText}>Booking sent — we&apos;ll call to confirm shortly.</p>}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer nav */}
        <div className={styles.footerRow}>
          {step > 1 ? (
            <button type="button" onClick={goBack} className={styles.btnBack}>
              <ArrowLeft size={16} strokeWidth={2.5} />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 && (
            <motion.button
              type="button"
              onClick={goNext}
              whileHover={canProceed() ? { scale: 1.03 } : {}}
              whileTap={canProceed() ? { scale: 0.97 } : {}}
              className={`${styles.btnPrimary} ${!canProceed() ? styles.btnDisabled : ""}`}
            >
              Next
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.button>
          )}

          {step === 3 && (
            <motion.button
              type="button"
              onClick={goNext}
              whileHover={canProceed() ? { scale: 1.03 } : {}}
              whileTap={canProceed() ? { scale: 0.97 } : {}}
              className={`${styles.btnAccent} ${!canProceed() ? styles.btnDisabled : ""}`}
            >
              Review
              <ArrowRight size={16} strokeWidth={2.5} />
            </motion.button>
          )}

          {step === 4 && !submitted && (
            <motion.button
              type="button"
              onClick={handleConfirm}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={styles.btnAccent}
            >
              Confirm Booking
              <Check size={16} strokeWidth={2.5} />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}