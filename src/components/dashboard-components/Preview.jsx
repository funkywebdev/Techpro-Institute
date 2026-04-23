ew;






import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiArrowRight, FiLock, FiCheckCircle, FiBook, FiAward } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

/* ─── Persist helpers ───────────────────────────────────────────────────── */
const COMPLETED_KEY = "completedModules";
const getCompletedModules = () => {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
  } catch {
    return [];
  }
};

/* ─── Inline styles / keyframes ────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .preview-root {
    font-family: 'DM Sans', sans-serif;
  }
  .preview-root h1,
  .preview-root h2,
  .preview-root h3 {
    font-family: 'Sora', sans-serif;
  }

  /* shimmer loader */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e4f0 50%, #f0f0f0 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
    border-radius: 10px;
  }

  /* floating orb behind header */
  @keyframes float-orb {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-12px) scale(1.04); }
  }
  .orb { animation: float-orb 6s ease-in-out infinite; }

  /* card shine sweep */
  .module-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 60%);
    background-size: 200% 200%;
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
    z-index: 2;
  }
  .module-card:hover::before { opacity: 1; }

  /* step connector line */
  .step-line {
    position: absolute;
    top: 50%;
    left: calc(100% + 4px);
    width: calc(100% - 8px);
    height: 2px;
    background: linear-gradient(90deg, #001489 0%, #c7d2fe 100%);
    transform: translateY(-50%);
    z-index: 0;
  }
  .step-line.locked {
    background: #e5e7eb;
  }

  /* progress bar fill glow */
  .progress-fill {
    box-shadow: 0 0 8px rgba(0, 20, 137, 0.4);
  }

  /* quiz btn pulse ring */
  @keyframes ring-pulse {
    0%   { box-shadow: 0 0 0 0 rgba(0,20,137,.35); }
    70%  { box-shadow: 0 0 0 10px rgba(0,20,137,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,20,137,0); }
  }
  .quiz-btn-pulse { animation: ring-pulse 2.2s ease infinite; }

  /* lock overlay pattern */
  .locked-pattern {
    background-image: repeating-linear-gradient(
      45deg,
      rgba(0,0,0,0.03) 0px,
      rgba(0,0,0,0.03) 1px,
      transparent 1px,
      transparent 8px
    );
  }

  /* badge pop */
  @keyframes badge-pop {
    0%   { transform: scale(0) rotate(-15deg); }
    60%  { transform: scale(1.2) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  .badge-pop { animation: badge-pop .5s cubic-bezier(.34,1.56,.64,1) both; }

  /* number counter */
  .step-num {
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: .7rem;
    letter-spacing: .04em;
  }
`;

/* ─── Skeleton card ─────────────────────────────────────────────────────── */
const SkeletonCard = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 16,
      padding: "1.4rem",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}
  >
    <div className="shimmer" style={{ height: 18, width: "65%" }} />
    <div className="shimmer" style={{ height: 13, width: "90%" }} />
    <div className="shimmer" style={{ height: 13, width: "75%" }} />
    <div className="shimmer" style={{ height: 13, width: "55%", marginTop: 8 }} />
    <div className="shimmer" style={{ height: 6, width: "100%", marginTop: 12 }} />
  </motion.div>
);

/* ─── Module number badge ────────────────────────────────────────────────── */
const StepBadge = ({ num, completed, locked }) => {
  const bg = completed ? "#001489" : locked ? "#d1d5db" : "#001489";
  const color = completed || !locked ? "#fff" : "#9ca3af";
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: bg, color,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, position: "relative", zIndex: 1,
      boxShadow: locked ? "none" : `0 2px 8px ${completed ? "rgba(22,163,74,.35)" : "rgba(0,20,137,.3)"}`,
    }}>
      {completed
        ? <FiCheckCircle size={14} />
        : locked
        ? <FiLock size={11} />
        : <span className="step-num">{num}</span>
      }
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   PREVIEW COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Preview = ({ course }) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState(getCompletedModules);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  /* ── Fetch ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const fetchAllModules = async () => {
      try {
        const res = await api.get("/v1/modules");
        setModules(res.data.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load modules.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllModules();

    /* sync completed state when tab regains focus */
    const syncProgress = () => setCompletedModules(getCompletedModules());
    window.addEventListener("focus", syncProgress);
    return () => window.removeEventListener("focus", syncProgress);
  }, []);

  /* ── Helpers ────────────────────────────────────────────────────────── */
  const isLocked = (index) => {
    if (index === 0) return false;
    return !completedModules.includes(modules[index - 1]?.id);
  };

  const completedCount = modules.filter((m) => completedModules.includes(m.id)).length;
  const overallPct = modules.length ? Math.round((completedCount / modules.length) * 100) : 0;

  /* ── Animation variants ─────────────────────────────────────────────── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <section ref={sectionRef} className="preview-root" style={{ marginTop: "3rem" }}>
      <style>{css}</style>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: "1.75rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left: title + progress summary */}
        <div style={{ position: "relative" }}>
          {/* decorative orb */}
          <div className="orb" style={{
            position: "absolute", top: -8, left: -14,
            width: 52, height: 52, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,20,137,.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <h2 style={{
            margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#111827",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <FiBook style={{ color: "#001489" }} />
            Course Modules
          </h2>
          <p style={{ margin: ".3rem 0 .7rem", fontSize: ".83rem", color: "#6b7280" }}>
            Complete modules in order to unlock the next
          </p>

          {/* overall progress pill */}
          {!loading && modules.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#f0f2fa", borderRadius: 99,
                padding: "4px 12px 4px 6px",
                border: "1px solid #c7d2fe",
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "#001489",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FiAward size={11} color="#fff" />
              </div>
              <span style={{ fontSize: ".75rem", fontWeight: 700, color: "#001489" }}>
                {completedCount}/{modules.length} completed · {overallPct}%
              </span>
              {/* mini bar */}
              <div style={{ width: 60, height: 4, background: "#dde2f4", borderRadius: 99, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallPct}%` }}
                  transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
                  style={{ height: "100%", background: "#001489", borderRadius: 99 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: quiz CTA */}
        {course?.id && (
          <motion.button
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.45 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/course/quiz/${course.id}`)}
            className="quiz-btn-pulse"
            style={{
              padding: "10px 20px",
              fontSize: ".84rem",
              fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
              color: "#fff",
              background: "linear-gradient(135deg, #001489 0%, #0f2fd0 100%)",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 7,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0,20,137,.25)",
            }}
          >
            <FiAward size={14} />
            Take Course Quiz
            <FiArrowRight size={13} />
          </motion.button>
        )}
      </motion.div>

      {/* ── Error ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              background: "#fef2f2", border: "1px solid #fca5a5",
              color: "#dc2626", borderRadius: 10, padding: "10px 16px",
              fontSize: ".84rem", fontWeight: 600, marginBottom: "1rem",
            }}
          >
            ⚠️ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Skeleton loader ───────────────────────────────────────────── */}
      {loading && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}>
          {[0, 1, 2, 3].map((i) => <SkeletonCard key={i} delay={i * 0.07} />)}
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────────────── */}
      {!loading && !error && modules.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: "center", padding: "3rem 1rem",
            background: "#f9fafb", borderRadius: 16, border: "1px dashed #d1d5db",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📭</div>
          <p style={{ color: "#6b7280", fontWeight: 600 }}>No modules available yet.</p>
        </motion.div>
      )}

      {/* ── Module grid ───────────────────────────────────────────────── */}
      {!loading && modules.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {modules.map((item, index) => {
            const locked = isLocked(index);
            const completed = completedModules.includes(item.id);
            const isHovered = hoveredId === item.id;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="module-card"
                onHoverStart={() => !locked && setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                animate={isHovered
                  ? { y: -8, boxShadow: "0 20px 40px rgba(0,20,137,.12)", scale: 1.02 }
                  : { y: 0, boxShadow: completed ? "0 4px 16px rgba(22,163,74,.1)" : "0 2px 8px rgba(0,0,0,.05)", scale: 1 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{
                  position: "relative",
                  borderRadius: 16,
                  border: completed
                    ? "1.5px solid #86efac"
                    : locked
                    ? "1.5px solid #e5e7eb"
                    : "1.5px solid #e5e7eb",
                  background: locked ? "#f9fafb" : "#fff",
                  padding: "1.3rem",
                  display: "flex",
                  flexDirection: "column",
                  cursor: locked ? "default" : "pointer",
                  overflow: "hidden",
                }}
              >
                {/* locked diagonal pattern */}
                {locked && (
                  <div className="locked-pattern" style={{
                    position: "absolute", inset: 0, borderRadius: 16,
                    pointerEvents: "none", zIndex: 0,
                  }} />
                )}

                {/* completed ribbon */}
                {completed && (
                  <div className="badge-pop" style={{
                    position: "absolute", top: 12, right: 12, zIndex: 3,
                    background: "#dcfce7", borderRadius: 99, padding: "3px 9px",
                    fontSize: ".67rem", fontWeight: 700, color: "#15803d",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <FiCheckCircle size={10} />
                    Done
                  </div>
                )}

                {/* top row: step badge + module number */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.85rem", position: "relative", zIndex: 1 }}>
                  <StepBadge num={index + 1} completed={completed} locked={locked} />
                  <span style={{
                    fontSize: ".7rem", fontWeight: 700, letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: locked ? "#9ca3af" : completed ? "#16a34a" : "#001489",
                  }}>
                    Module {index + 1}
                  </span>
                </div>

                {/* title */}
                <h3 style={{
                  margin: "0 0 .5rem",
                  fontSize: ".95rem",
                  fontWeight: 700,
                  color: locked ? "#9ca3af" : "#111827",
                  lineHeight: 1.45,
                  position: "relative", zIndex: 1,
                }}>
                  {item.title}
                </h3>

                {/* description */}
                <p
                  style={{
                    margin: "0 0 1rem",
                    fontSize: ".8rem",
                    color: locked ? "#b0b8c9" : "#6b7280",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    position: "relative", zIndex: 1,
                  }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                {/* footer action */}
                <div style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
                  {locked ? (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: ".78rem", color: "#9ca3af", fontWeight: 500,
                    }}>
                      <FiLock size={12} />
                      Complete previous module
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ gap: "10px" }}
                      onClick={() => navigate(`/module/${item.id}`)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: ".82rem", fontWeight: 700,
                        color: completed ? "#16a34a" : "#001489",
                        padding: 0, fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {completed ? "Review Module" : "Start Module"}
                      <motion.span
                        animate={isHovered ? { x: 4 } : { x: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <FiArrowRight size={14} />
                      </motion.span>
                    </motion.button>
                  )}

                  {/* progress bar */}
                  <div style={{
                    width: "100%", height: 4, background: "#f0f2f5",
                    borderRadius: 99, overflow: "hidden", marginTop: 12,
                  }}>
                    <motion.div
                      className={completed ? "progress-fill" : ""}
                      initial={{ width: 0 }}
                      animate={{ width: completed ? "100%" : locked ? "0%" : "0%" }}
                      transition={{ duration: 0.8, delay: index * 0.08 + 0.4, ease: "easeOut" }}
                      style={{
                        height: "100%", borderRadius: 99,
                        background: completed
                          ? "linear-gradient(90deg, #16a34a, #4ade80)"
                          : "linear-gradient(90deg, #001489, #3b5bdb)",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
};

export default Preview;