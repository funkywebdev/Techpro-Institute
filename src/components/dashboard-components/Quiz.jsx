import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";

const QUIZ_TIME_PER_QUESTION = 60;
const READY_TIME = 0;

/* ─── Styles ────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

  :root {
    --navy:       #001489;
    --navy-dark:  #000f5a;
    --navy-soft:  #f0f2fa;
    --surface:    #ffffff;
    --bg:         #f7f8fa;
    --text:       #111827;
    --muted:      #6b7280;
    --border:     #e5e7eb;
    --green:      #16a34a;
    --green-soft: #f0fdf4;
    --red:        #dc2626;
    --red-soft:   #fef2f2;
    --radius:     14px;
    --shadow:     0 2px 16px rgba(0,0,0,.07);
  }

  .quiz-page { font-family: 'DM Sans', sans-serif; }
  .quiz-page h1, .quiz-page h2, .quiz-page h3 {
    font-family: 'Sora', sans-serif;
  }

  /* ── Progress bar ── */
  .qprog-track {
    height: 6px;
    background: var(--border);
    border-radius: 99px;
    overflow: hidden;
  }
  .qprog-fill {
    height: 100%;
    background: var(--navy);
    border-radius: 99px;
    transition: width .6s cubic-bezier(.4,0,.2,1);
  }

  /* ── Timer ring ── */
  .timer-ring circle { transition: stroke-dashoffset .9s linear; }

  /* ── Option card ── */
  .opt-card {
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: .85rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .85rem;
    transition: border-color .18s, background .18s, transform .15s, box-shadow .15s;
    background: var(--surface);
    position: relative;
    overflow: hidden;
  }
  .opt-card:hover {
    border-color: var(--navy);
    background: var(--navy-soft);
    transform: translateY(-1px);
    box-shadow: 0 3px 12px rgba(0,20,137,.08);
  }
  .opt-card.selected {
    border-color: var(--navy);
    background: var(--navy-soft);
    box-shadow: 0 2px 10px rgba(0,20,137,.1);
  }
  .opt-card.selected .opt-indicator {
    background: var(--navy);
    border-color: var(--navy);
    color: #fff;
  }
  .opt-card.review-selected {
    border-color: var(--green);
    background: var(--green-soft);
  }
  .opt-card.review-selected .opt-indicator {
    background: var(--green);
    border-color: var(--green);
    color: #fff;
  }

  /* Label circle */
  .opt-indicator {
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: .78rem;
    flex-shrink: 0;
    transition: background .18s, border-color .18s, color .18s;
    color: var(--muted);
  }

  /* ripple on click */
  .opt-card::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(0,20,137,.06);
    opacity: 0;
    transition: opacity .3s;
    pointer-events: none;
  }
  .opt-card:active::after { opacity: 1; }

  /* ── Question slide animation ── */
  @keyframes slide-in {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .q-enter  { animation: slide-in      .35s cubic-bezier(.4,0,.2,1) forwards; }
  .q-enter-left { animation: slide-in-left .35s cubic-bezier(.4,0,.2,1) forwards; }

  /* ── Buttons ── */
  .btn-navy {
    background: var(--navy);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: .88rem;
    padding: .65rem 1.4rem;
    cursor: pointer;
    transition: background .2s, transform .15s, box-shadow .2s;
  }
  .btn-navy:hover:not(:disabled) {
    background: var(--navy-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(0,20,137,.2);
  }
  .btn-navy:disabled {
    background: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
  }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: .88rem;
    padding: .65rem 1.4rem;
    cursor: pointer;
    transition: border-color .2s, color .2s, background .2s;
  }
  .btn-ghost:hover { border-color: var(--navy); color: var(--navy); background: var(--navy-soft); }

  /* ── Ready screen ── */
  @keyframes countdown-pop {
    0%   { transform: scale(1.6); opacity: 0; }
    40%  { transform: scale(.9);  opacity: 1; }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .countdown-num { animation: countdown-pop .5s cubic-bezier(.34,1.56,.64,1) forwards; }

  /* ── Result ── */
  @keyframes score-reveal {
    from { opacity: 0; transform: scale(.7) rotate(-8deg); }
    to   { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  .score-reveal { animation: score-reveal .6s cubic-bezier(.34,1.56,.64,1) .15s both; }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fade-up .45s ease both; }
  .fade-up-1 { animation-delay: .1s; }
  .fade-up-2 { animation-delay: .22s; }
  .fade-up-3 { animation-delay: .34s; }
  .fade-up-4 { animation-delay: .46s; }

  /* ── Review card ── */
  .review-card {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem 1.2rem;
    background: var(--surface);
    transition: box-shadow .2s;
  }
  .review-card:hover { box-shadow: var(--shadow); }

  /* ── Q dots ── */
  .q-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    border: 2px solid var(--border);
    background: var(--surface);
    transition: background .2s, border-color .2s, transform .2s;
    cursor: pointer;
  }
  .q-dot.answered { background: var(--navy); border-color: var(--navy); }
  .q-dot.active   { transform: scale(1.4); border-color: var(--navy); }

  /* scrollbar */
  .quiz-scroll::-webkit-scrollbar { width: 4px; }
  .quiz-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }

  /* checkbox / radio custom */
  .multi-check {
    width: 18px; height: 18px;
    border-radius: 5px;
    border: 2px solid #d1d5db;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background .18s, border-color .18s;
    background: #fff;
  }
  .multi-check.checked {
    background: var(--navy);
    border-color: var(--navy);
  }
`;

/* ─── Timer Ring SVG ─────────────────────────────────────────────────────── */
const TimerRing = ({ timeLeft, total }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const pct = timeLeft / total;
  const dash = circ * (1 - pct);
  const color = timeLeft <= 10 ? "#dc2626" : timeLeft <= 20 ? "#f59e0b" : "#001489";
  return (
    <div style={{ position: "relative", width: 60, height: 60, flexShrink: 0 }}>
      <svg width="60" height="60" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="30" cy="30" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="30" cy="30" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          className="timer-ring"
          style={{ transition: "stroke-dashoffset 1s linear, stroke .3s" }}
        />
      </svg>
      <span style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Sora',sans-serif", fontWeight: 700,
        fontSize: ".82rem", color,
      }}>
        {timeLeft}
      </span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   QUIZ COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Quiz = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isContentQuiz = location.pathname.includes("content");
  const isCourseQuiz = location.pathname.includes("course");

  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [readyTime, setReadyTime] = useState(READY_TIME);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);
  const [direction, setDirection] = useState("right");

  const timerRef = useRef(null);
  const optionLabels = ["A", "B", "C", "D"];

  /* ── FETCH QUIZ ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        let endpoint = "";
        if (isCourseQuiz) {
          endpoint = `/v1/courses/${id}/quiz`;
        } else if (isContentQuiz) {
          endpoint = `/v1/module-contents/${id}/quiz`;
        } else {
          endpoint = `/v1/modules/${id}/quiz`;
        }

        const res = await api.get(endpoint);
        const payload = res.data;
        const data = payload.data;

        if (data?.locked) {
          toast.error(`${payload.message} - ${data.reason}`);
          return;
        }
        if (!data?.quiz) {
          toast.error(payload.message || "No quiz found");
          return;
        }

        setQuizId(data.quiz.id);
        setQuestions(data.quiz.questions || []);
      } catch (err) {
        console.error("FETCH ERROR ❌", err);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, location.pathname]);

  /* ── READY TIMER ────────────────────────────────────────────────────── */
  useEffect(() => {
    if (quizStarted) return;
    const interval = setInterval(() => {
      setReadyTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizStarted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizStarted]);

  /* ── QUESTION TIMER ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (!quizStarted || reviewing || showResult) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQuestion, quizStarted, reviewing, showResult]);

  useEffect(() => {
    if (quizStarted) setTimeLeft(QUIZ_TIME_PER_QUESTION);
  }, [currentQuestion, quizStarted]);

  /* ── OPTION SELECT ──────────────────────────────────────────────────── */
  const handleSelectOption = (opt) => {
    const currentQ = questions[currentQuestion];

    if (currentQ.type === "multiple") {
      setSelectedOptions((prev) =>
        prev.some((o) => o.id === opt.id)
          ? prev.filter((o) => o.id !== opt.id)
          : [...prev, opt]
      );
    } else {
      // single choice — store as array for consistency
      setSelectedOptions([opt]);
    }
  };

  /* ── NAVIGATION ─────────────────────────────────────────────────────── */
  const handleNext = (auto = false) => {
    const current = questions[currentQuestion];

    if (!current) return;
    if (!auto && selectedOptions.length === 0) return;

    const answerPayload = {
      question_id: current.id,
      selected_option_ids: selectedOptions.map((o) => o.id),
    };

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== current.id),
      answerPayload,
    ];

    setAnswers(updatedAnswers);

    if (currentQuestion === questions.length - 1) {
      setReviewing(true);
      return;
    }

    setDirection("right");

    const nextIndex = currentQuestion + 1;
    const nextQ = questions[nextIndex];

    setCurrentQuestion(nextIndex);

    const nextAnswer = updatedAnswers.find((a) => a.question_id === nextQ.id);

    setSelectedOptions(
      nextAnswer
        ? nextQ.options.filter((o) =>
            nextAnswer.selected_option_ids?.includes(o.id)
          )
        : []
    );
  };

  const handlePrev = () => {
    if (currentQuestion === 0) return;

    setDirection("left");

    const prevIndex = currentQuestion - 1;
    const prevQ = questions[prevIndex];

    setCurrentQuestion(prevIndex);

    const prevAnswer = answers.find((a) => a.question_id === prevQ.id);

    setSelectedOptions(
      prevAnswer
        ? prevQ.options.filter((o) =>
            prevAnswer.selected_option_ids?.includes(o.id)
          )
        : []
    );
  };

  /* ── FETCH SCORE ────────────────────────────────────────────────────── */
  const fetchQuizScore = async (quizAttemptId) => {
    try {
      const res = await api.get(`/v1/quiz-attempts/${quizAttemptId}/review`);
      const data = res.data.data;
      setResult({
        ...data,
        passed: data.passed === "1" || data.passed === 1,
        score: Number(data.score),
        percentage: Number(data.percentage),
      });
      setShowResult(true);
    } catch (error) {
      console.error("SCORE ERROR ❌", error);
      toast.error("Failed to fetch score");
    }
  };

  /* ── SUBMIT ─────────────────────────────────────────────────────────── */
  const submitQuiz = async (finalAnswers = answers) => {
    if (!quizId) {
      toast.error("Quiz ID missing");
      return;
    }

    try {
      setSubmitting(true);

      const cleanAnswers = finalAnswers
        .map((a) => ({
          question_id: a.question_id,
          selected_option_ids: Array.isArray(a.selected_option_ids)
            ? a.selected_option_ids
            : [],
        }))
        .filter((a) => a.selected_option_ids.length > 0);

      const res = await api.post(`/v1/quizzes/${quizId}/submit`, {
        answers: cleanAnswers,
      });

      toast.success("Quiz submitted successfully!", { autoClose: 1500 });

      const attemptId = res.data.data.id;

      setTimeout(() => {
        // navigate(`/quiz-review/${attemptId}`);
        navigate(`/quiz-review/${attemptId}`, {
        state: {
          sourceId: id, // 👈 THIS is the module/content/course id
          type: isCourseQuiz ? "course" : isContentQuiz ? "content" : "module",
        },
      });
      }, 1000);
    } catch (err) {
      console.error("SUBMIT ERROR ❌", err);
      toast.error(err.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
      setReviewing(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.length;

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <div
      className="quiz-page"
      style={{ minHeight: "100vh", background: "var(--bg)", padding: "0" }}
    >
      <style>{css}</style>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ── Loading ──────────────────────────────────────────────────── */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <Spinner />
        </div>
      ) : !questions.length ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <p style={{ color: "var(--muted)", fontWeight: 600 }}>No quiz available for this module.</p>
          </div>
        </div>
      ) : (
        <>
          {/* ── Top bar ──────────────────────────────────────────────── */}
          {quizStarted && !reviewing && !showResult && (
            <div style={{
              position: "sticky", top: 0, zIndex: 20,
              background: "#fff", borderBottom: "1px solid var(--border)",
              padding: ".6rem 1.5rem",
              display: "flex", alignItems: "center", gap: "1rem",
            }}>
              {/* Q dots */}
              <div style={{ display: "flex", gap: ".35rem", alignItems: "center", flex: 1 }}>
                {questions.map((_, idx) => (
                  <span
                    key={idx}
                    className={`q-dot${answers.some(a => a.question_id === questions[idx].id) ? " answered" : ""}${idx === currentQuestion ? " active" : ""}`}
                    title={`Question ${idx + 1}`}
                  />
                ))}
              </div>
              <span style={{ fontSize: ".78rem", color: "var(--muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                {answeredCount}/{questions.length} answered
              </span>
            </div>
          )}

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.25rem" }}>

            {/* ════════════════════════════════════════════════════
                READY SCREEN
            ════════════════════════════════════════════════════ */}
            {!quizStarted && (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "var(--navy-soft)", border: "3px solid var(--navy)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", fontSize: "2rem",
                }}>
                  🧠
                </div>
                <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "var(--text)", margin: "0 0 .4rem" }}>
                  Ready to begin?
                </h1>
                <p style={{ color: "var(--muted)", marginBottom: "2.5rem", fontSize: ".95rem" }}>
                  {questions.length} questions · {QUIZ_TIME_PER_QUESTION}s per question
                </p>
                {readyTime > 0 ? (
                  <div key={readyTime} className="countdown-num" style={{
                    fontSize: "5rem", fontWeight: 800, color: "var(--navy)",
                    fontFamily: "'Sora',sans-serif", lineHeight: 1,
                  }}>
                    {readyTime}
                  </div>
                ) : (
                  <div style={{ fontSize: "5rem", fontWeight: 800, color: "var(--green)", fontFamily: "'Sora',sans-serif" }}>
                    Go!
                  </div>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                QUESTION
            ════════════════════════════════════════════════════ */}
            {quizStarted && !reviewing && !showResult && currentQ && (
              <div key={currentQuestion} className={direction === "right" ? "q-enter" : "q-enter-left"}>

                {/* Progress */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
                    <span style={{ fontSize: ".8rem", fontWeight: 600, color: "var(--muted)" }}>
                      Question {currentQuestion + 1} <span style={{ color: "#d1d5db" }}>/ {questions.length}</span>
                    </span>
                    <TimerRing timeLeft={timeLeft} total={QUIZ_TIME_PER_QUESTION} />
                  </div>
                  <div className="qprog-track">
                    <div className="qprog-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* Question card */}
                <div style={{
                  background: "var(--surface)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  padding: "1.4rem 1.5rem",
                  marginBottom: "1.25rem",
                  boxShadow: "0 1px 8px rgba(0,0,0,.05)",
                }}>
                  {/* type badge */}
                  <span style={{
                    display: "inline-block", marginBottom: ".7rem",
                    fontSize: ".68rem", fontWeight: 700, letterSpacing: ".06em",
                    textTransform: "uppercase", padding: "3px 10px",
                    borderRadius: "99px",
                    background: currentQ.type === "multiple" ? "#eff6ff" : "var(--navy-soft)",
                    color: currentQ.type === "multiple" ? "#1d4ed8" : "var(--navy)",
                  }}>
                    {currentQ.type === "multiple" ? "Multiple Select" : "Single Choice"}
                  </span>

                  <h2 style={{
                    margin: 0,
                    fontSize: "1.1rem", fontWeight: 700,
                    color: "var(--text)", lineHeight: 1.55,
                  }}>
                    {currentQ.question}
                  </h2>

                  {currentQ.type === "multiple" && (
                    <p style={{ margin: ".5rem 0 0", fontSize: ".8rem", color: "var(--muted)" }}>
                      Select all that apply
                    </p>
                  )}
                </div>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", marginBottom: "1.5rem" }}>
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOptions.some((o) => o.id === opt.id);
                    return (
                      <button
                        key={opt.id}
                        className={`opt-card${isSelected ? " selected" : ""}`}
                        onClick={() => handleSelectOption(opt)}
                        style={{ width: "100%", textAlign: "left", border: "none", fontFamily: "inherit" }}
                      >
                        <span className={`opt-indicator${isSelected ? " selected" : ""}`}
                          style={{
                            background: isSelected ? "var(--navy)" : "#fff",
                            borderColor: isSelected ? "var(--navy)" : "var(--border)",
                            color: isSelected ? "#fff" : "var(--muted)",
                          }}
                        >
                          {currentQ.type === "multiple" ? (
                            <span className={`multi-check${isSelected ? " checked" : ""}`}
                              style={{
                                background: isSelected ? "var(--navy)" : "#fff",
                                borderColor: isSelected ? "var(--navy)" : "#d1d5db",
                                width: 16, height: 16,
                              }}
                            >
                              {isSelected && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                          ) : (
                            optionLabels[i]
                          )}
                        </span>
                        <span style={{ fontSize: ".9rem", color: "var(--text)", fontWeight: isSelected ? 600 : 400 }}>
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Nav buttons */}
                <div style={{ display: "flex", gap: ".75rem" }}>
                  <button
                    className="btn-ghost"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    style={{ flex: 1 }}
                  >
                    ← Previous
                  </button>
                  <button
                    className="btn-navy"
                    onClick={() => handleNext(false)}
                    disabled={selectedOptions.length === 0}
                    style={{ flex: 1 }}
                  >
                    {currentQuestion === questions.length - 1 ? "Review Answers →" : "Next →"}
                  </button>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                REVIEW
            ════════════════════════════════════════════════════ */}
            {reviewing && (
              <div className="q-enter">
                {/* Header */}
                <div style={{
                  background: "var(--surface)", borderRadius: "var(--radius)",
                  border: "1px solid var(--border)", padding: "1.2rem 1.4rem",
                  marginBottom: "1.25rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <h2 style={{ margin: 0, fontFamily: "'Sora',sans-serif", fontSize: "1.2rem", fontWeight: 800, color: "var(--text)" }}>
                      Review Your Answers
                    </h2>
                    <p style={{ margin: ".25rem 0 0", fontSize: ".82rem", color: "var(--muted)" }}>
                      {answers.length} of {questions.length} answered · Check before submitting
                    </p>
                  </div>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "var(--navy-soft)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem",
                  }}>
                    📋
                  </div>
                </div>

                {/* Question list */}
                <div className="quiz-scroll" style={{ display: "flex", flexDirection: "column", gap: ".7rem", marginBottom: "1.5rem", maxHeight: "60vh", overflowY: "auto" }}>
                  {questions.map((q, idx) => {
                    const answer = answers.find((a) => a.question_id === q.id);
                    const isAnswered = !!answer;

                    return (
                      <div key={q.id} className="review-card fade-up" style={{ animationDelay: `${idx * 0.04}s` }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: ".75rem", marginBottom: ".6rem" }}>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: ".88rem", color: "var(--text)", flex: 1, lineHeight: 1.5 }}>
                            <span style={{ color: "var(--navy)", marginRight: ".4rem" }}>Q{idx + 1}.</span>
                            {q.question}
                          </p>
                          {!isAnswered && (
                            <span style={{
                              fontSize: ".68rem", fontWeight: 700, padding: "2px 8px",
                              borderRadius: "99px", background: "#fef2f2", color: "#dc2626",
                              whiteSpace: "nowrap", flexShrink: 0,
                            }}>
                              Unanswered
                            </span>
                          )}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: ".3rem", marginBottom: ".65rem" }}>
                          {q.options.map((opt, i) => {
                            // ✅ FIX: always use selected_option_ids (array) for both single and multiple
                            const isSelected = answer?.selected_option_ids?.includes(opt.id) ?? false;

                            return (
                              <div
                                key={opt.id}
                                className={isSelected ? "opt-card review-selected" : ""}
                                style={{
                                  display: "flex", alignItems: "center", gap: ".6rem",
                                  padding: ".4rem .6rem", borderRadius: "8px",
                                  background: isSelected ? "var(--green-soft)" : "#f9fafb",
                                  border: isSelected ? "1px solid #86efac" : "1px solid transparent",
                                  fontSize: ".83rem",
                                }}
                              >
                                <span style={{
                                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  fontSize: ".72rem", fontWeight: 700,
                                  background: isSelected ? "var(--green)" : "#e5e7eb",
                                  color: isSelected ? "#fff" : "var(--muted)",
                                }}>
                                  {isSelected ? "✓" : optionLabels[i]}
                                </span>
                                <span style={{ color: isSelected ? "#15803d" : "var(--muted)", fontWeight: isSelected ? 600 : 400 }}>
                                  {opt.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          onClick={() => { setCurrentQuestion(idx); setReviewing(false); setDirection("left"); }}
                          style={{
                            background: "transparent", border: "none", cursor: "pointer",
                            fontSize: ".78rem", fontWeight: 600, color: "var(--navy)",
                            padding: 0, fontFamily: "inherit",
                          }}
                        >
                          ✏️ Edit answer
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Submit row */}
                <div style={{
                  background: "var(--surface)", borderRadius: "var(--radius)",
                  border: "1px solid var(--border)", padding: "1rem 1.2rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: ".88rem", color: "var(--text)" }}>
                      Ready to submit?
                    </p>
                    <p style={{ margin: ".2rem 0 0", fontSize: ".78rem", color: "var(--muted)" }}>
                      You cannot change answers after submission.
                    </p>
                  </div>
                  <button
                    className="btn-navy"
                    onClick={() => submitQuiz(answers)}
                    disabled={submitting}
                    style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: ".4rem" }}
                  >
                    {submitting ? (
                      <>
                        <span style={{
                          width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)",
                          borderTopColor: "#fff", borderRadius: "50%",
                          display: "inline-block", animation: "spin .7s linear infinite",
                        }} />
                        Submitting…
                      </>
                    ) : "Submit Quiz →"}
                  </button>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                RESULT
            ════════════════════════════════════════════════════ */}
            {showResult && result && (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                {/* Big score */}
                <div className="score-reveal" style={{
                  width: 120, height: 120, borderRadius: "50%",
                  border: `5px solid ${result.passed ? "var(--green)" : "var(--red)"}`,
                  background: result.passed ? "var(--green-soft)" : "var(--red-soft)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <span style={{
                    fontFamily: "'Sora',sans-serif", fontWeight: 800,
                    fontSize: "1.9rem", lineHeight: 1,
                    color: result.passed ? "var(--green)" : "var(--red)",
                  }}>
                    {result.percentage.toFixed(0)}%
                  </span>
                  <span style={{ fontSize: ".72rem", color: result.passed ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
                    score
                  </span>
                </div>

                <h2 className="fade-up fade-up-1" style={{
                  fontFamily: "'Sora',sans-serif", fontSize: "1.5rem", fontWeight: 800,
                  color: "var(--text)", margin: "0 0 .4rem",
                }}>
                  {result.passed ? "🎉 Congratulations!" : "Keep Going!"}
                </h2>

                <p className="fade-up fade-up-2" style={{ color: "var(--muted)", marginBottom: "1.5rem", fontSize: ".95rem" }}>
                  {result.passed
                    ? "You passed this quiz. Great work!"
                    : "You didn't pass this time. Review the material and try again."}
                </p>

                {/* Stat cards */}
                <div className="fade-up fade-up-3" style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: ".75rem", marginBottom: "1.5rem", textAlign: "left",
                }}>
                  {[
                    { label: "Score", value: `${result.score}/${questions.length}` },
                    { label: "Percentage", value: `${result.percentage.toFixed(2)}%` },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: "var(--surface)", border: "1px solid var(--border)",
                      borderRadius: "12px", padding: "1rem 1.1rem",
                    }}>
                      <p style={{ margin: "0 0 .2rem", fontSize: ".75rem", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>
                        {s.label}
                      </p>
                      <p style={{ margin: 0, fontFamily: "'Sora',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "var(--text)" }}>
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="fade-up fade-up-4">
                  <button
                    className="btn-navy"
                    onClick={() => navigate("/dashboard")}
                    style={{ width: "100%" }}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}

          </div>
        </>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Quiz;