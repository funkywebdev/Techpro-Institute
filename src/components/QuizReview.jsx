import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import {
  FiCheckCircle, FiXCircle, FiAward,
  FiRefreshCw, FiGrid, FiMinus,
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

/* ─── Pass threshold ─────────────────────────────────────────────────────── */
const PASS_THRESHOLD = 80;




const buildRetakeUrl = (type, sourceId) => {
  if (type === "course")  return `/course/quiz/${sourceId}`;
  if (type === "content") return `/content/quiz/${sourceId}`;
  return `/quiz/${sourceId}`;
};

/* ═══════════════════════════════
   Animated Score Ring
═══════════════════════════════ */
const ScoreRing = ({ percentage, passed }) => {
  const [animated, setAnimated] = useState(0);
  const size = 130;
  const sw = 9;
  const radius = (size - sw) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (animated / 100) * circ;
  const color = passed ? "#16a34a" : "#dc2626";

  useEffect(() => {
    const t = setTimeout(() => setAnimated(percentage), 250);
    return () => clearTimeout(t);
  }, [percentage]);

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f0f0f0" strokeWidth={sw} />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={color} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: "1.7rem", fontWeight: 800, color, fontFamily: "'Sora',sans-serif", lineHeight: 1 }}>
          {percentage}%
        </span>
        <span style={{ fontSize: ".6rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginTop: 2 }}>
          score
        </span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════
   Stat Pill
═══════════════════════════════ */
const StatPill = ({ label, value, color, bg, icon, delay }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(14px)",
      transition: "opacity 0.45s ease, transform 0.45s ease",
      background: bg, border: `1px solid ${color}30`,
      borderRadius: 12, padding: ".65rem .75rem",
      display: "flex", flexDirection: "column", alignItems: "center", gap: ".2rem",
    }}>
      <span style={{ color, fontSize: "1rem" }}>{icon}</span>
      <p style={{ margin: 0, fontSize: "1rem", fontWeight: 800, color, fontFamily: "'Sora',sans-serif", lineHeight: 1 }}>{value}</p>
      <p style={{ margin: 0, fontSize: ".58rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</p>
    </div>
  );
};

/* ═══════════════════════════════
   Question Card
═══════════════════════════════ */
const optionLabels = ["A", "B", "C", "D"];

const QuestionCard = ({ q, index }) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 180 + index * 70);
    return () => clearTimeout(t);
  }, [index]);

  const correct = q.is_correct === true;

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      background: "#fff",
      borderRadius: 14,
      border: `1.5px solid ${correct ? "#bbf7d0" : "#fecaca"}`,
      overflow: "hidden",
      boxShadow: correct
        ? "0 2px 10px rgba(22,163,74,.08)"
        : "0 2px 10px rgba(220,38,38,.08)",
    }}>
      {/* ── Header (clickable) ── */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: ".8rem 1rem",
          display: "flex", alignItems: "flex-start", gap: ".65rem",
          cursor: "pointer",
          background: correct ? "#f0fdf4" : "#fef2f2",
          borderBottom: open ? `1px solid ${correct ? "#bbf7d0" : "#fecaca"}` : "none",
        }}
      >
        {/* number */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: correct ? "#16a34a" : "#dc2626",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginTop: 1,
        }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: ".72rem", fontFamily: "'Sora',sans-serif" }}>{index + 1}</span>
        </div>

        <p style={{ margin: 0, flex: 1, fontSize: ".83rem", fontWeight: 600, color: "#111827", lineHeight: 1.45 }}>
          {q.question}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: ".45rem", flexShrink: 0, marginTop: 2 }}>
          <span style={{
            fontSize: ".6rem", fontWeight: 700, padding: "2px 8px", borderRadius: 99,
            background: correct ? "#dcfce7" : "#fee2e2",
            color: correct ? "#16a34a" : "#dc2626",
            border: `1px solid ${correct ? "#bbf7d0" : "#fecaca"}`,
            whiteSpace: "nowrap",
          }}>
            {correct ? "✓ Correct" : "✗ Wrong"}
          </span>
          <span style={{
            color: "#9ca3af", fontSize: ".75rem",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform .25s", display: "inline-block",
          }}>▼</span>
        </div>
      </div>

      {/* ── Options ── */}
      {open && (
        <div style={{ padding: ".8rem 1rem", display: "flex", flexDirection: "column", gap: ".4rem" }}>
          {q.options.map((opt, i) => {
            const isCorrect = opt.is_correct;
            const isSelected = opt.is_selected;
            const isWrongPick = isSelected && !isCorrect;

            let bg = "#f9fafb", border = "1px solid #f0f0f0";
            let labelBg = "#e5e7eb", labelColor = "#6b7280";
            let textColor = "#374151";
            let icon = null;

            if (isCorrect)   { bg = "#f0fdf4"; border = "1px solid #86efac"; labelBg = "#16a34a"; labelColor = "#fff"; textColor = "#15803d"; icon = <FiCheckCircle size={13} color="#16a34a" />; }
            if (isWrongPick) { bg = "#fef2f2"; border = "1px solid #fca5a5"; labelBg = "#dc2626"; labelColor = "#fff"; textColor = "#b91c1c"; icon = <FiXCircle size={13} color="#dc2626" />; }
            if (isSelected && isCorrect) icon = <FiCheckCircle size={13} color="#16a34a" />;

            return (
              <div key={opt.id} style={{
                display: "flex", alignItems: "center", gap: ".6rem",
                padding: ".45rem .7rem", borderRadius: 9,
                background: bg, border, transition: "all .2s",
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: ".68rem", fontWeight: 700,
                  background: labelBg, color: labelColor,
                }}>
                  {optionLabels[i]}
                </span>
                <span style={{ flex: 1, fontSize: ".8rem", color: textColor, fontWeight: (isCorrect || isWrongPick) ? 600 : 400 }}>
                  {opt.text}
                </span>
                {icon}
                {isWrongPick && (
                  <span style={{
                    fontSize: ".58rem", color: "#dc2626", fontWeight: 700,
                    background: "#fee2e2", padding: "2px 6px", borderRadius: 99,
                    border: "1px solid #fca5a5", whiteSpace: "nowrap",
                  }}>
                    Your pick
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   QUIZ REVIEW PAGE
═══════════════════════════════════════════════════════════════════════════ */
const QuizReview = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ── State passed from Quiz.jsx on submit ──
  const { sourceId, type } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState(null);

  /* ── Fetch ── */
  useEffect(() => {
    if (!attemptId) { toast.error("Invalid attempt ID"); return; }

    const fetchReview = async () => {
      try {
        const res = await api.get(`/v1/quiz-attempts/${attemptId}/review`);
        const data = res.data.data;

        const mappedQuestions = data.questions.map((q) => ({
          ...q,
          selected_option_ids: (q.selected_option_ids || []).map(Number),
          correct_answer_ids:  (q.correct_answer_ids  || []).map(Number),
          options: q.options.map((opt) => {
            const optId = Number(opt.id);
            return {
              ...opt,
              is_correct:  (q.correct_answer_ids  || []).map(Number).includes(optId),
              is_selected: (q.selected_option_ids || []).map(Number).includes(optId),
            };
          }),
        }));

        const percentage = Number(data.percentage);

        setReviewData({
          ...data,
          questions: mappedQuestions,
          passed: percentage >= PASS_THRESHOLD,
          score: Number(data.score),
          total_questions: Number(data.total_questions),
          percentage,
        });
      } catch (err) {
        console.error("FETCH ERROR:", err);
        toast.error("Failed to load quiz review");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [attemptId]);

  /* ── Retake ─────────────────────────────────────────────────────────── */
  const handleRetakeQuiz = () => {
    // Priority 1: use state passed by Quiz.jsx (most reliable)
    if (sourceId && type) {
      navigate(buildRetakeUrl(type, sourceId));
      return;
    }
    const quizId = reviewData?.quiz_id;
    if (quizId) {
      navigate(`/quiz/${quizId}`);
      return;
    }
    toast.error("Cannot determine quiz source. Please go back and retake from the module.");
  };

  /* ── Guards ── */
  if (loading) return <Spinner />;
  if (!reviewData) return (
    <p style={{ textAlign: "center", marginTop: "4rem", color: "#6b7280" }}>
      No review data available.
    </p>
  );

  const { passed, percentage, score, total_questions, questions } = reviewData;
  const correctCount = questions.filter(q => q.is_correct === true).length;
  const wrongCount   = questions.filter(q => q.is_correct === false).length;
  const skippedCount = Math.max(0, total_questions - correctCount - wrongCount);

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fade-up    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes banner-in  { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer    { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes bar-fill   { from{width:0} }

        .qr-root { font-family:'DM Sans',sans-serif; }
        .qr-root h1,.qr-root h2,.qr-root h3 { font-family:'Sora',sans-serif; }

        .btn-primary {
          background: linear-gradient(135deg,#001489,#1e3a8a);
          color:#fff; border:none; border-radius:10px;
          font-weight:700; font-size:.8rem; cursor:pointer;
          padding:.6rem 1.1rem; font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; justify-content:center; gap:.4rem;
          transition:opacity .2s,transform .15s;
          box-shadow:0 3px 10px rgba(0,20,137,.22);
          width:100%;
        }
        .btn-primary:hover { opacity:.88; transform:translateY(-1px); }

        .btn-secondary {
          background:#fff; color:#374151;
          border:1.5px solid #e5e7eb; border-radius:10px;
          font-weight:600; font-size:.8rem; cursor:pointer;
          padding:.6rem 1.1rem; font-family:'DM Sans',sans-serif;
          display:flex; align-items:center; justify-content:center; gap:.4rem;
          transition:border-color .2s,color .2s,background .2s;
          width:100%;
        }
        .btn-secondary:hover { border-color:#001489; color:#001489; background:#f0f2fa; }

        /* ── Layout ── */
        .qr-layout {
          display: grid;
          grid-template-columns: minmax(0,1fr) 270px;
          gap: 1.1rem;
          align-items: start;
        }
        .qr-sidebar { position: sticky; top: 1.25rem; display:flex; flex-direction:column; gap:.85rem; }
        .qr-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:.5rem; }
        .qr-btns { display:flex; flex-direction:column; gap:.5rem; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .qr-layout { grid-template-columns: 1fr !important; }
          .qr-sidebar { position:static !important; order:-1; }          /* sidebar on top */
          .qr-stat-grid { grid-template-columns: repeat(4,1fr) !important; }
          .qr-score-ring { width:100px !important; height:100px !important; }
        }
        @media (max-width: 520px) {
          .qr-stat-grid { grid-template-columns: repeat(2,1fr) !important; }
          .qr-btns { flex-direction:row !important; }
          .qr-btns button { flex:1; }
          .banner-score { display:none !important; }   /* hide score chip on tiny screens */
        }
        @media (max-width: 380px) {
          .qr-btns { flex-direction:column !important; }
        }
      `}</style>

      <div className="qr-root" style={{
        background: "#f7f8fa", minHeight: "100vh",
        padding: "clamp(.75rem, 2.5vw, 1.5rem)",
      }}>
        <ToastContainer position="top-right" autoClose={3000} />

        {/* ══ Banner ══════════════════════════════════════════════════ */}
        <div style={{
          animation: "banner-in 0.5s ease both",
          background: passed
            ? "linear-gradient(135deg,#15803d,#16a34a)"
            : "linear-gradient(135deg,#b91c1c,#dc2626)",
          borderRadius: 16, padding: "1rem 1.25rem",
          marginBottom: "1.1rem",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: ".65rem",
          boxShadow: passed
            ? "0 4px 20px rgba(22,163,74,.25)"
            : "0 4px 20px rgba(220,38,38,.25)",
          position: "relative", overflow: "hidden",
        }}>
          {/* shimmer */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,.09),transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s infinite linear",
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: "rgba(255,255,255,.15)", backdropFilter: "blur(4px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.3rem", border: "1.5px solid rgba(255,255,255,.25)",
              flexShrink: 0,
            }}>
              {passed ? "🎉" : "💪"}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "clamp(.9rem,2.5vw,1.05rem)", fontWeight: 800, color: "#fff", fontFamily: "'Sora',sans-serif" }}>
                {passed ? "Congratulations! You Passed!" : "Not Quite There Yet"}
              </p>
              <p style={{ margin: ".1rem 0 0", fontSize: ".7rem", color: "rgba(255,255,255,.85)" }}>
                {passed
                  ? `You scored ${percentage}% — above the ${PASS_THRESHOLD}% pass mark`
                  : `You scored ${percentage}% — ${PASS_THRESHOLD}% needed to pass`}
              </p>
            </div>
          </div>

          <span className="banner-score" style={{
            background: "rgba(255,255,255,.18)", backdropFilter: "blur(6px)",
            border: "1.5px solid rgba(255,255,255,.3)",
            borderRadius: 99, padding: ".3rem .9rem",
            fontSize: ".75rem", fontWeight: 800, color: "#fff",
            fontFamily: "'Sora',sans-serif", whiteSpace: "nowrap",
          }}>
            {score} / {total_questions} correct
          </span>
        </div>

        {/* ══ Main grid ═══════════════════════════════════════════════ */}
        <div className="qr-layout">

          {/* ── Questions column ─────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
            <div style={{ animation: "fade-up .4s ease both" }}>
              <p style={{ margin: "0 0 .1rem", fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9ca3af" }}>
                Detailed Breakdown
              </p>
              <p style={{ margin: 0, fontSize: ".75rem", color: "#6b7280" }}>
                {questions.length} questions · tap any card to expand / collapse
              </p>
            </div>

            {questions.map((q, i) => (
              <QuestionCard key={q.question_id || i} q={q} index={i} />
            ))}
          </div>

          {/* ── Sidebar ──────────────────────────────────────────── */}
          <div className="qr-sidebar">

            {/* Score card */}
            <div style={{
              animation: "fade-up .4s .05s ease both",
              background: "#fff", borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,.07)",
              border: "1px solid #f0f0f0",
              padding: "1.1rem 1rem", textAlign: "center",
            }}>
              <p style={{ margin: "0 0 .85rem", fontSize: ".65rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#9ca3af" }}>
                Quiz Result
              </p>

              <div className="qr-score-ring">
                <ScoreRing percentage={percentage} passed={passed} />
              </div>

              <div style={{ marginTop: ".75rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: ".7rem", fontWeight: 700,
                  padding: "3px 12px", borderRadius: 99,
                  background: passed ? "#f0fdf4" : "#fef2f2",
                  color: passed ? "#16a34a" : "#dc2626",
                  border: `1px solid ${passed ? "#bbf7d0" : "#fecaca"}`,
                }}>
                  {passed ? <FiAward size={11} /> : <FiXCircle size={11} />}
                  {passed ? "Passed" : "Failed"}
                </span>
                <p style={{ margin: ".4rem 0 0", fontSize: ".68rem", color: "#9ca3af" }}>
                  Pass mark: <span style={{ fontWeight: 700, color: "#374151" }}>{PASS_THRESHOLD}%</span>
                </p>
              </div>
            </div>

            {/* Stat pills */}
            <div className="qr-stat-grid" style={{ animation: "fade-up .4s .1s ease both" }}>
              <StatPill delay={200} label="Correct" value={correctCount}     color="#16a34a" bg="#f0fdf4" icon={<FiCheckCircle />} />
              <StatPill delay={270} label="Wrong"   value={wrongCount}       color="#dc2626" bg="#fef2f2" icon={<FiXCircle />} />
              <StatPill delay={340} label="Total"   value={total_questions}  color="#15256E" bg="#f0f2fa" icon={<FiGrid />} />
              {skippedCount > 0
                ? <StatPill delay={410} label="Skipped" value={skippedCount} color="#d97706" bg="#fffbeb" icon={<FiMinus />} />
                : <StatPill delay={410} label="Accuracy" value={`${percentage}%`} color="#6366f1" bg="#f5f3ff" icon={<FiAward />} />
              }
            </div>

            {/* Accuracy bar */}
            <div style={{
              animation: "fade-up .4s .15s ease both",
              background: "#fff", borderRadius: 14,
              boxShadow: "0 2px 8px rgba(0,0,0,.05)",
              border: "1px solid #f0f0f0",
              padding: ".9rem 1rem",
            }}>
              <p style={{ margin: "0 0 .55rem", fontSize: ".68rem", fontWeight: 700, color: "#374151" }}>Accuracy</p>
              <div style={{ height: 7, background: "#f0f0f0", borderRadius: 99, overflow: "hidden", marginBottom: ".35rem" }}>
                <div style={{
                  height: "100%", width: `${percentage}%`,
                  background: passed
                    ? "linear-gradient(90deg,#16a34a,#4ade80)"
                    : "linear-gradient(90deg,#dc2626,#f87171)",
                  borderRadius: 99,
                  animation: "bar-fill 1.4s cubic-bezier(.4,0,.2,1) both",
                }} />
              </div>
              {/* pass marker */}
              <div style={{ position: "relative", height: 18 }}>
                <div style={{
                  position: "absolute",
                  left: `${PASS_THRESHOLD}%`,
                  top: 0,
                  transform: "translateX(-50%)",
                  display: "flex", flexDirection: "column", alignItems: "center",
                }}>
                  <div style={{ width: 1.5, height: 7, background: "#d97706" }} />
                  <span style={{ fontSize: ".54rem", color: "#d97706", fontWeight: 700, whiteSpace: "nowrap" }}>
                    {PASS_THRESHOLD}% pass
                  </span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="qr-btns" style={{ animation: "fade-up .4s .2s ease both" }}>
              <button className="btn-primary" onClick={handleRetakeQuiz}>
                <FiRefreshCw size={13} /> Retake Quiz
              </button>
              <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
                <FiGrid size={13} /> Dashboard
              </button>
            </div>

          </div>{/* end sidebar */}
        </div>{/* end grid */}
      </div>
    </>
  );
};

export default QuizReview;