





import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import {
  FiCheckCircle, FiLink, FiChevronDown, FiChevronUp,
  FiPlay, FiBook, FiAward, FiX, FiBarChart2, FiTrendingUp,
  FiTarget, FiStar, FiCalendar, FiHash, FiLock,
  FiFileText, FiVideo, FiAlertCircle,
} from "react-icons/fi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { toast } from "react-toastify";

/* ─── localStorage helpers ─────────────────────────────────────────────── */
const COMPLETED_KEY  = "completedModules";
const QUIZ_SCORES_KEY = "quizScores";

const getCompletedModules = () => {
  try { return JSON.parse(localStorage.getItem(COMPLETED_KEY)) || []; } catch { return []; }
};
const markModuleCompleted = (moduleId) => {
  const c = getCompletedModules();
  if (!c.includes(moduleId))
    localStorage.setItem(COMPLETED_KEY, JSON.stringify([...c, moduleId]));
};
export const saveQuizScore = (quizId, data) => {
  try {
    const all = JSON.parse(localStorage.getItem(QUIZ_SCORES_KEY)) || {};
    all[quizId] = data;
    localStorage.setItem(QUIZ_SCORES_KEY, JSON.stringify(all));
  } catch {}
};
const getQuizScore = (quizId) => {
  try { return (JSON.parse(localStorage.getItem(QUIZ_SCORES_KEY)) || {})[quizId] ?? null; }
  catch { return null; }
};

/* ─── Animation variants ────────────────────────────────────────────────── */
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

/* ─── Progress ring ─────────────────────────────────────────────────────── */
const ProgressRing = ({ pct }) => {
  const r    = 22;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;
  return (
    <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="28" cy="28" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4.5" />
      <circle cx="28" cy="28" r={r} fill="none" stroke="#001489" strokeWidth="4.5"
        strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x="28" y="28" textAnchor="middle" dominantBaseline="central"
        fill="#001489" fontSize="9.5" fontWeight="800"
        style={{ transform: "rotate(90deg)", transformOrigin: "28px 28px", fontFamily: "'Syne',sans-serif" }}
      >
        {pct}%
      </text>
    </svg>
  );
};

/* ─── Score Modal ────────────────────────────────────────────────────────── */
const ScoreModal = ({ data, title, onClose }) => {
  if (!data) return null;
  const pct      = Math.round(parseFloat(data.percentage ?? "0"));
  const isPassed = data.passed === 1 || data.passed === true || data.passed === "1" || pct >= 70;
  const score    = data.score ?? "-";
  const totalQ   = data.total_questions ? parseInt(data.total_questions) : null;
  const grade    = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : "F";
  const submittedAt = data.submitted_at
    ? new Date(data.submitted_at).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })
    : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl"
        >
          {/* Header */}
          <div className="relative px-6 pb-6 overflow-hidden pt-7"
            style={{ background: "linear-gradient(135deg, #001489 0%, #0a2a8a 55%, #1a3fa8 100%)" }}>
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/[0.04] pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/[0.03] pointer-events-none" />
            <button onClick={onClose}
              className="absolute flex items-center justify-center text-white transition-colors border-none rounded-full cursor-pointer top-4 right-4 w-7 h-7 bg-white/10 hover:bg-white/20">
              <FiX size={13} />
            </button>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${isPassed ? "bg-amber-400/15 border-amber-400/30" : "bg-red-400/15 border-red-400/30"}`}>
                <FiAward className={`text-2xl ${isPassed ? "text-amber-400" : "text-red-400"}`} />
              </div>
              <div>
                <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-0.5">Quiz Result</p>
                <h3 className="text-white text-[1.05rem] font-bold leading-tight m-0" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {title || "Module Quiz"}
                </h3>
                <span className={`inline-block mt-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${isPassed ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
                  {isPassed ? "✓ PASSED" : "✗ FAILED"}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "Score",      value: totalQ ? `${score}/${totalQ}` : String(score), icon: <FiTarget />,    color: "text-[#001489]", bg: "bg-[#f0f2fa]" },
                { label: "Percentage", value: `${pct}%`, icon: <FiTrendingUp />, color: isPassed ? "text-green-600" : "text-red-600", bg: isPassed ? "bg-green-50" : "bg-red-50" },
                { label: "Grade",      value: grade,     icon: <FiStar />,       color: "text-amber-600",           bg: "bg-amber-50" },
              ].map(s => (
                <div key={s.label} className={`text-center ${s.bg} rounded-xl py-3 px-1.5 border border-black/[0.04]`}>
                  <span className={`${s.color} flex justify-center mb-1 text-sm`}>{s.icon}</span>
                  <p className="m-0 text-xl font-extrabold leading-none text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>{s.value}</p>
                  <p className="m-0 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Performance bar */}
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-[12px] font-semibold text-gray-500">Performance</span>
                <span className={`text-[12px] font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                  {pct}% — {isPassed ? "above pass mark" : "below pass mark"}
                </span>
              </div>
              <div className="h-2 overflow-hidden bg-gray-100 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                  className={`h-full rounded-full ${isPassed ? "bg-gradient-to-r from-[#001489] to-green-500" : "bg-gradient-to-r from-[#001489] to-red-500"}`}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-2 p-3 border border-gray-100 bg-gray-50 rounded-xl">
              {[
                data.attempt_number && { icon: <FiBarChart2 />, label: "Attempt",   value: `#${data.attempt_number}`, color: "text-[#001489]", bg: "bg-[#f0f2fa]" },
                submittedAt         && { icon: <FiCalendar />,  label: "Submitted", value: submittedAt,               color: "text-amber-700", bg: "bg-amber-50" },
              ].filter(Boolean).map(m => (
                <div key={m.label} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${m.bg} flex-shrink-0 flex items-center justify-center`}>
                    {React.cloneElement(m.icon, { className: `${m.color} text-sm` })}
                  </div>
                  <div>
                    <p className="m-0 text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{m.label}</p>
                    <p className="m-0 text-[13px] font-bold text-gray-900">{m.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onClose}
              className="w-full py-2.5 bg-[#001489] text-white border-none rounded-xl font-bold text-sm cursor-pointer hover:bg-[#0f1c58] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─── HTML sanitizer — fixes <br>-broken sentences from the API ─────────── */
function sanitizeNoteHtml(raw) {
  if (!raw) return "";
  let html = raw;

  // Step 1: normalise ALL <br> variants to a placeholder token
  html = html.replace(/<br\s*\/?>/gi, "§BR§");

  // Step 2: decide strategy based on whether real <p> tags exist
  const hasRealParagraphs = /<p[\s>]/i.test(html);

  if (!hasRealParagraphs) {
    // Content is plain text + <br> only.
    // Multiple §BR§ after a sentence-ending character = real paragraph break
    html = html.replace(/([.!?'""»])(\s*§BR§\s*){2,}(?=\S)/g, "$1</p><p>");
    // Multiple §BR§ NOT after sentence-ending punct = mid-sentence break → space
    html = html.replace(/(§BR§\s*){2,}/g, " ");
    // Any remaining single §BR§ = continuation → space
    html = html.replace(/§BR§/g, " ");
    // Wrap whole content in <p>
    html = `<p>${html}</p>`;
  } else {
    // Content has real <p> tags: NEVER treat any <br> as a break — always space
    html = html.replace(/§BR§/g, " ");
  }

  // Step 3: clean up whitespace artefacts
  html = html.replace(/[ \t]{2,}/g, " ");
  html = html.replace(/\s+(<\/p>)/gi, "$1");
  html = html.replace(/(<p[^>]*>)\s+/gi, "$1");
  html = html.replace(/<p[^>]*>\s*<\/p>/gi, "");

  // Step 4: promote bold-only <p> to sub-heading <h4>
  html = html.replace(
    /<p[^>]*>\s*<(strong|b)>([^<]{3,120})<\/\1>\s*:?\s*<\/p>/gi,
    (_, tag, text) => `<h4 class="note-subhead">${text.trim()}</h4>`
  );

  // Step 5: auto-style numbered items "1. Text" inside <p>
  html = html.replace(
    /<p[^>]*>\s*(\d{1,2})[.)]\s+(.+?)<\/p>/gi,
    (_, num, text) =>
      `<li class="note-li note-li--num"><span class="note-li__num">${num}.</span><span class="note-li__text">${text.trim()}</span></li>`
  );

  // Step 6: auto-style bullet items "· text" or "• text" inside <p>
  html = html.replace(
    /<p[^>]*>\s*[·•\-–]\s+(.+?)<\/p>/gi,
    (_, text) =>
      `<li class="note-li note-li--dot"><span class="note-li__text">${text.trim()}</span></li>`
  );

  // Step 7: wrap consecutive <li> runs in <ol> or <ul>
  html = html.replace(
    /(<li class="note-li note-li--num"[\s\S]*?<\/li>)(\n?<li class="note-li note-li--num"[\s\S]*?<\/li>)*/g,
    match => `<ol class="note-list">${match}</ol>`
  );
  html = html.replace(
    /(<li class="note-li note-li--dot"[\s\S]*?<\/li>)(\n?<li class="note-li note-li--dot"[\s\S]*?<\/li>)*/g,
    match => `<ul class="note-list">${match}</ul>`
  );

  return html;
}

/* ─── Lesson note content renderer ─────────────────────────────────────── */
const NoteContent = ({ html }) => {
  if (!html) return (
    <p style={{ color: "#94a3b8", fontStyle: "italic", fontSize: "13px", margin: 0 }}>
      No notes available for this lesson.
    </p>
  );
  const clean = sanitizeNoteHtml(html);
  return (
    <div className="note-body" dangerouslySetInnerHTML={{ __html: clean }} />
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Video = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [resources,    setResources]    = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openNoteId,   setOpenNoteId]   = useState(null);
  const [usefulLinks,  setUsefulLinks]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [openSection,  setOpenSection]  = useState("videos");
  const [scoreMap,     setScoreMap]     = useState({});
  const [activeModal,  setActiveModal]  = useState(null);
  const [sidebarTab,   setSidebarTab]   = useState("content"); // "content" | "notes"

  /* ── Fetch ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res      = await api.get(`/v1/modules/${id}`);
        const contents = res.data.data || [];
        setResources(contents);
        const firstVideo = contents.find(r => r.type === "video");
        if (firstVideo) setSelectedItem(firstVideo);

        const preloaded = {};
        contents.filter(r => r.type === "pdf").forEach(f => {
          const saved = getQuizScore(f.quiz_id ?? f.id);
          if (saved) preloaded[f.id] = { loading: false, data: saved };
        });
        if (Object.keys(preloaded).length) setScoreMap(preloaded);

        const linksRes = await api.get(`/v1/course/useful-links`);
        setUsefulLinks(linksRes.data?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleCheckboxClick = async (item) => {
    if (item.is_completed) return;
    try {
      await api.post(`/v1/module-contents/${item.id}/complete`);
      setResources(prev => prev.map(r => r.id === item.id ? { ...r, is_completed: true } : r));
    } catch { toast.error("Failed to mark lesson complete"); }
  };

  const handlePdfClick = (pdf) => {
    if (pdf.data?.url) { window.open(pdf.data.url, "_blank"); handleCheckboxClick(pdf); }
  };

  useEffect(() => {
    if (resources.length > 0 && resources.every(r => r.is_completed))
      markModuleCompleted(Number(id));
  }, [resources, id]);

  const handleViewScore = async (file) => {
    const quizId = file.id;
    if (!quizId) { toast.error("Quiz ID is missing"); return; }
    setScoreMap(prev => ({ ...prev, [file.id]: { loading: true, data: null } }));
    try {
      const res       = await api.get(`/v1/module-content/${quizId}/quiz/score?ts=${Date.now()}`);
      const scoreData = res.data?.data || res.data;
      if (!scoreData || !Object.keys(scoreData).length) {
        toast.info("Please take the quiz before viewing your score.");
        setScoreMap(prev => ({ ...prev, [file.id]: { loading: false, data: null } }));
        return;
      }
      saveQuizScore(quizId, scoreData);
      setScoreMap(prev => ({ ...prev, [file.id]: { loading: false, data: scoreData } }));
      setActiveModal({ data: scoreData, title: file.title });
    } catch (err) {
      setScoreMap(prev => ({ ...prev, [file.id]: { loading: false, data: null } }));
      if (err?.response?.status === 404) { toast.info("Please take the quiz before viewing your score."); return; }
      toast.error("Unable to fetch score");
    }
  };

  const handleTakeQuiz = (file) => {
    navigate(`/content/quiz/${file.quiz_id ?? file.id}`, {
      state: { resourceId: file.id, quizId: file.quiz_id ?? file.id },
    });
  };

  const allCompleted       = resources.every(r => r.is_completed);
  const completionPercent  = resources.length
    ? Math.round((resources.filter(r => r.is_completed).length / resources.length) * 100)
    : 0;
  const videoResources     = resources.filter(r => r.type === "video");
  const pdfResources       = resources.filter(r => r.type === "pdf");
  const completedCount     = resources.filter(r => r.is_completed).length;

  /* ════════ LOADING ═══════════════════════════════════════════════════ */
  if (loading) return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white">
      <style>{`
        @keyframes orbit { 0%{transform:rotate(0deg) translateX(30px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(30px) rotate(-360deg)} }
        @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.18);opacity:1} }
        .ld-dot{animation:orbit 1.4s linear infinite; width:8px; height:8px; border-radius:50%; background:#001489; position:absolute; top:50%; left:50%; margin:-4px 0 0 -4px}
        .ld-ring{animation:pulseRing 1.8s ease-in-out infinite; position:absolute; inset:0; border-radius:50%; border:2px solid rgba(0,20,137,.25)}
      `}</style>
      <div className="relative w-16 h-16">
        <div className="ld-ring" />
        <div className="absolute inset-0 flex items-center justify-center">
          <MdOutlineOndemandVideo style={{ color: "#001489", fontSize: "22px" }} />
        </div>
        {[0,1,2,3].map(i => (
          <span key={i} className="ld-dot" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
      </div>
      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"13px", fontWeight:600, color:"#001489", letterSpacing:"0.12em", textTransform:"uppercase", margin:0 }}>
        Loading module…
      </p>
    </div>
  );

  if (error) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="max-w-sm p-8 text-center">
        <div className="flex items-center justify-center mx-auto mb-4 rounded-full w-14 h-14 bg-red-50">
          <FiAlertCircle style={{ color: "#ef4444", fontSize: "22px" }} />
        </div>
        <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, color:"#ef4444", margin:0 }}>{error}</p>
      </div>
    </div>
  );

  /* ════════ RENDER ════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        .video-root * { box-sizing: border-box; }
        .video-root { font-family:'Plus Jakarta Sans', sans-serif; }
        .video-root h1,.video-root h2,.video-root h3 { font-family:'Syne', sans-serif; }

        /* ── custom scrollbar ── */
        .v-scroll::-webkit-scrollbar { width: 4px; }
        .v-scroll::-webkit-scrollbar-track { background: transparent; }
        .v-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }

        /* ── accordion ── */
        .acc-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .38s cubic-bezier(.4,0,.2,1), opacity .3s ease; opacity: 0; }
        .acc-body.open { grid-template-rows: 1fr; opacity: 1; }
        .acc-inner { overflow: hidden; }

        /* ════════════════════════════════════
           LESSON NOTE RICH TEXT
           ════════════════════════════════════ */

        /* Base container — full-width, always flowing, never clipped */
        .note-body {
          font-size: 15px;
          line-height: 1.85;
          color: #374151;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;
          max-width: 100%;
        }

        /* Paragraphs — single source of truth for text blocks */
        .note-body p {
          margin: 0;
          line-height: 1.9;
          white-space: normal;
          display: block;
        }
        .note-body p:last-child { margin: 0; }

        /* Headings */
        .note-body h1,.note-body h2,.note-body h3,
        .note-body h4,.note-body h5 {
          font-family: 'Syne', sans-serif;
          color: #0f172a;
          line-height: 1.3;
          font-weight: 700;
          margin: .8em 0 .3em;
        }
        .note-body h1 { font-size: 1.3rem; }
        .note-body h2 { font-size: 1.15rem; }
        .note-body h3 { font-size: 1.05rem; }
        .note-body h4 { font-size: .98rem; }
        .note-body h1:first-child,.note-body h2:first-child,
        .note-body h3:first-child,.note-body h4:first-child { margin-top: 0; }

        /* Sub-heading promoted from bold-only <p> */
        .note-body .note-subhead {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .97rem;
          font-weight: 700;
          color: #001489;
          border-left: 3px solid #001489;
          padding-left: .65em;
          margin: .8em 0 .3em;
          line-height: 1.4;
        }

        /* Inline */
        .note-body strong,.note-body b { font-weight: 700; color: #111827; }
        .note-body em,.note-body i { font-style: italic; color: #4b5563; }
        .note-body a { color: #001489; text-decoration: underline; }
        .note-body a:hover { text-decoration: none; opacity: .8; }

        /* ── Lists ─────────────────────────────────── */
        /* Shared list wrapper */
        .note-body ul,.note-body ol,
        .note-body .note-list {
          list-style: none !important;
          margin: .35em 0 .5em;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: .15em;
        }

        /* Every auto-detected list item */
        .note-body .note-li {
          display: flex;
          align-items: flex-start;
          gap: .65em;
          font-size: 14.5px;
          line-height: 1.75;
          color: #374151;
          padding: .38em .85em .38em .65em;
          border-radius: 9px;
        }
        /* Numbered variant */
        .note-body .note-li--num {
          background: #f0f2fa;
          border-left: 2.5px solid #001489;
        }
        .note-body .note-li__num {
          flex-shrink: 0;
          font-weight: 800;
          color: #001489;
          font-size: 13px;
          min-width: 22px;
          font-family: 'Syne', sans-serif;
          line-height: 1.75;
        }
        /* Bullet variant */
        .note-body .note-li--dot {
          background: #f8fafc;
          border-left: 2.5px solid #c7d2fe;
        }
        .note-body .note-li--dot::before {
          content: '';
          display: inline-block;
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          margin-top: .62em;
          border-radius: 50%;
          background: #001489;
        }
        .note-body .note-li__text {
          flex: 1;
          min-width: 0;
        }

        /* Native <ul>/<ol> li fallback (if API sends proper list HTML) */
        .note-body ul > li:not(.note-li),
        .note-body ol > li:not(.note-li) {
          display: flex;
          align-items: flex-start;
          gap: .6em;
          font-size: 14.5px;
          line-height: 1.75;
          color: #374151;
          padding: .35em .8em .35em .6em;
          background: #f8fafc;
          border-radius: 9px;
          border-left: 2.5px solid #c7d2fe;
        }
        .note-body ul > li:not(.note-li)::before {
          content: '';
          flex-shrink: 0;
          width: 6px; height: 6px;
          margin-top: .62em;
          border-radius: 50%;
          background: #001489;
        }
        .note-body ol {
          counter-reset: note-cnt;
        }
        .note-body ol > li:not(.note-li) {
          background: #f0f2fa;
          border-left-color: #001489;
          counter-increment: note-cnt;
        }
        .note-body ol > li:not(.note-li)::before {
          content: counter(note-cnt) ".";
          flex-shrink: 0;
          font-weight: 800;
          color: #001489;
          font-size: 13px;
          min-width: 22px;
          background: none;
          height: auto;
          border-radius: 0;
          margin-top: 0;
          font-family: 'Syne', sans-serif;
        }

        /* Blockquote */
        .note-body blockquote {
          border-left: 3px solid #001489;
          margin: 1em 0;
          padding: .65em 1.1em;
          background: #f0f2fa;
          border-radius: 0 10px 10px 0;
          color: #4b5563;
          font-style: italic;
          font-size: 14.5px;
        }

        /* Code */
        .note-body code {
          background: #f1f5f9;
          border-radius: 5px;
          padding: 2px 7px;
          font-size: 12.5px;
          font-family: 'Fira Mono','Courier New',monospace;
          color: #0f172a;
          border: 1px solid #e2e8f0;
        }
        .note-body pre {
          background: #0f172a;
          color: #e2e8f0;
          padding: 14px 18px;
          border-radius: 10px;
          overflow-x: auto;
          font-size: 12.5px;
          margin: 1em 0;
          line-height: 1.7;
        }
        .note-body pre code {
          background:none; border:none; padding:0; color:inherit; font-size:inherit;
        }

        /* Tables */
        .note-body table {
          width:100%; border-collapse:collapse; font-size:13px;
          margin:1em 0; border-radius:10px; overflow:hidden;
          border:1px solid #e2e8f0;
        }
        .note-body th {
          background:#f0f2fa; color:#001489; padding:9px 14px;
          text-align:left; font-weight:700; font-size:12px;
          text-transform:uppercase; letter-spacing:.04em;
        }
        .note-body td { padding:8px 14px; border-top:1px solid #f1f5f9; vertical-align:top; }
        .note-body tr:nth-child(even) td { background:#f8fafc; }

        /* Images & HR */
        .note-body img { max-width:100%; border-radius:10px; margin:.7em 0; display:block; }
        .note-body hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 1.2em 0;
        }

        /* ── lesson row hover ── */
        .lesson-row { transition: background .15s ease, transform .15s ease; }
        .lesson-row:hover { background: #f8fafc; transform: translateX(2px); }
        .lesson-row.active { background: #eef1fb; }
        .lesson-row.active::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:#001489; border-radius:0 2px 2px 0; }

        /* ── section tab underline ── */
        .stab { position: relative; transition: color .2s; }
        .stab.active { color: #001489 !important; }
        .stab.active::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:#001489; border-radius:2px; }

        /* ── score spin ── */
        @keyframes sSpin { to { transform:rotate(360deg); } }
        .s-spin { width:10px;height:10px;border-radius:50%;border:2px solid #c7d2fe;border-top-color:#001489;animation:sSpin .65s linear infinite;display:inline-block;vertical-align:middle; }

        /* ── pill pop ── */
        @keyframes pillPop { from{opacity:0;transform:scale(.72)} to{opacity:1;transform:scale(1)} }
        .pill-pop { animation: pillPop .3s cubic-bezier(.34,1.56,.64,1) both; }

        /* ── progress fill glow ── */
        .prog-glow { box-shadow: 0 0 6px rgba(0,20,137,.35); }
      `}</style>

      <div className="video-root min-h-screen bg-[#f7f8fb]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 py-6 lg:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ══════════════ LEFT COLUMN ══════════════════════════════ */}
            <div className="flex flex-col gap-5">

              {/* ── Video Player ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
              >
                <div className="overflow-hidden bg-black shadow-xl rounded-2xl" style={{ aspectRatio: "16/9" }}>
                  {selectedItem?.type === "video" ? (
                    <video
                      key={selectedItem.id}
                      src={selectedItem.data?.url}
                      controls
                      className="block object-cover w-full h-full"
                      onEnded={() => handleCheckboxClick(selectedItem)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-3 bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10">
                        <FiPlay style={{ fontSize: "28px", color: "rgba(255,255,255,.5)" }} />
                      </div>
                      <p style={{ color: "rgba(255,255,255,.4)", fontSize: "14px", margin: 0 }}>
                        Select a video to play
                      </p>
                    </div>
                  )}
                </div>

                {/* Now Playing bar */}
                <AnimatePresence>
                  {selectedItem && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 px-1 mt-3"
                    >
                      <span className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-bold tracking-widest bg-[#001489] text-white px-2.5 py-1 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                        Now Playing
                      </span>
                      <span className="text-gray-900 font-semibold text-[15px] leading-snug truncate" style={{ fontFamily: "'Syne',sans-serif" }}>
                        {selectedItem.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Lesson Notes ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.1 }}
                className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-xl bg-[#f0f2fa] flex items-center justify-center flex-shrink-0">
                    <FiBook style={{ color: "#001489", fontSize: "16px" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="m-0 text-[15px] font-bold text-gray-900 leading-none" style={{ fontFamily:"'Syne',sans-serif" }}>
                      Lesson Notes
                    </h2>
                    <p className="m-0 text-[12px] text-gray-400 mt-0.5">
                      Click any lesson to expand notes and mark as complete
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 bg-[#f0f2fa] rounded-xl px-3 py-1.5">
                    <span className="text-[12px] font-bold text-[#001489]">{completedCount}</span>
                    <span className="text-[12px] text-gray-400">/</span>
                    <span className="text-[12px] text-gray-400 font-medium">{resources.length}</span>
                    <span className="text-[11px] text-gray-400">done</span>
                  </div>
                </div>

                {/* Overall progress bar */}
                <div className="px-6 py-2.5 bg-gray-50/60 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercent}%` }}
                        transition={{ duration: 1.0, ease: "easeOut", delay: 0.4 }}
                        className="h-full rounded-full prog-glow"
                        style={{ background: "linear-gradient(90deg, #001489, #3b5bdb)" }}
                      />
                    </div>
                    <span className="text-[12px] font-bold text-[#001489] flex-shrink-0">{completionPercent}%</span>
                  </div>
                </div>

                {/* Lesson list */}
                <div className="divide-y divide-gray-50">
                  {resources.length === 0 && (
                    <p className="text-center text-[13px] text-gray-400 italic py-10">No lesson notes available.</p>
                  )}

                  {resources.map((item, idx) => {
                    const isOpen      = openNoteId === item.id;
                    const isActive    = selectedItem?.id === item.id;
                    const isVideo     = item.type === "video";
                    const isPdf       = item.type === "pdf";

                    return (
                      <div key={item.id}>
                        {/* Lesson row */}
                        <button
                          onClick={() => {
                            const next = isOpen ? null : item.id;
                            setOpenNoteId(next);
                            if (next && !item.is_completed) handleCheckboxClick(item);
                            if (isVideo) setSelectedItem(item);
                          }}
                          className={`lesson-row relative w-full flex items-center gap-3.5 px-6 py-4 text-left border-none bg-transparent cursor-pointer ${isActive ? "active" : ""}`}
                        >
                          {/* Step circle */}
                          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-all duration-300 ${item.is_completed ? "bg-[#001489] text-white" : "bg-gray-100 text-gray-500"}`}>
                            {item.is_completed ? <FiCheckCircle size={13} /> : idx + 1}
                          </div>

                          {/* Type icon */}
                          <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${isVideo ? "bg-blue-50" : "bg-red-50"}`}>
                            {isVideo
                              ? <FiVideo style={{ color: "#3b82f6", fontSize: "13px" }} />
                              : <FiFileText style={{ color: "#ef4444", fontSize: "13px" }} />
                            }
                          </div>

                          {/* Title */}
                          <div className="flex-1 min-w-0">
                            <p className="m-0 text-[13.5px] font-semibold text-gray-900 leading-snug truncate">
                              {item.title}
                            </p>
                            <p className="m-0 text-[11px] text-gray-400 mt-0.5 capitalize">{item.type} lesson</p>
                          </div>

                          {/* Badges */}
                          <div className="flex items-center flex-shrink-0 gap-2">
                            {item.is_completed && (
                              <span className="pill-pop inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">
                                <FiCheckCircle size={9} /> Done
                              </span>
                            )}
                            <span className="text-gray-300">
                              {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                            </span>
                          </div>
                        </button>

                        {/* Expanded note panel */}
                        <div className={`acc-body ${isOpen ? "open" : ""}`}>
                          <div className="acc-inner">
                            <div className="mx-6 mt-1 mb-4 overflow-hidden border border-gray-100 rounded-xl bg-gray-50/60">
                              {/* Note header strip */}
                              <div className="flex items-center gap-2 px-5 py-3 bg-white border-b border-gray-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#001489]" />
                                <span className="text-[11px] font-bold text-[#001489] uppercase tracking-widest">Lesson Notes</span>
                                <span className="ml-auto text-[11px] text-gray-400">{item.title}</span>
                              </div>
                              {/* Note content */}
                              <div className="px-5 py-4">
                                <NoteContent html={item.content} />
                              </div>

                              {/* PDF action row */}
                             
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Completion banner */}
                <AnimatePresence>
                  {allCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mx-6 mb-5 mt-1 flex items-center gap-3 px-5 py-3.5 bg-green-50 border border-green-200 rounded-xl"
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-full">
                        <FiCheckCircle style={{ color: "#16a34a", fontSize: "16px" }} />
                      </div>
                      <div>
                        <p className="m-0 text-[13px] font-bold text-green-700">Module Complete! 🎉</p>
                        <p className="m-0 text-[11px] text-green-600 mt-0.5">All lessons finished. Great work!</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ══════════════ SIDEBAR ══════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.52, ease: [0.22,1,0.36,1], delay: 0.08 }}
              className="sticky flex flex-col overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl top-4"
              style={{ maxHeight: "calc(100vh - 2rem)" }}
            >
              {/* Sidebar header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <ProgressRing pct={completionPercent} />
                <div className="min-w-0">
                  <p className="m-0 font-bold text-[14px] text-gray-900 leading-none" style={{ fontFamily:"'Syne',sans-serif" }}>
                    Module Content
                  </p>
                  <p className="m-0 text-[12px] text-gray-400 mt-1">
                    {completedCount} of {resources.length} completed
                  </p>
                  {/* mini progress */}
                  <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercent}%` }}
                      transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #001489, #3b5bdb)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 px-3 py-3 overflow-y-auto v-scroll">

                {/* ── Videos ── */}
                <div className="mb-1">
                  <button
                    onClick={() => setOpenSection(openSection === "videos" ? null : "videos")}
                    className={`stab ${openSection === "videos" ? "active" : "text-gray-500"} w-full flex items-center justify-between px-2 py-2.5 bg-transparent border-none cursor-pointer text-[12.5px] font-bold`}
                  >
                    <span className="flex items-center gap-2">
                      <MdOutlineOndemandVideo style={{ fontSize: "15px" }} />
                      Videos
                      <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {videoResources.length}
                      </span>
                    </span>
                    {openSection === "videos" ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
                  </button>

                  <div className={`acc-body ${openSection === "videos" ? "open" : ""}`}>
                    <div className="acc-inner">
                      <div className="pb-2 flex flex-col gap-0.5">
                        {videoResources.map((item, idx) => {
                          const isActive = selectedItem?.id === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className={`relative flex items-start gap-2.5 px-2.5 py-2.5 rounded-xl cursor-pointer transition-all hover:bg-gray-50 hover:translate-x-0.5 ${isActive ? "bg-[#eef1fb]" : ""}`}
                            >
                              {isActive && (
                                <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#001489] rounded-r-full" />
                              )}
                              <input
                                type="checkbox"
                                readOnly
                                checked={item.is_completed}
                                className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 accent-[#001489] cursor-pointer"
                                onClick={e => { e.stopPropagation(); handleCheckboxClick(item); }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="m-0 text-[12.5px] font-semibold text-gray-900 leading-snug">
                                  {idx + 1}. {item.title}
                                </p>
                                <p className="m-0 text-[10.5px] text-gray-400 mt-0.5">Video lesson</p>
                              </div>
                              {isActive && (
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#001489] mt-1.5 animate-pulse" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── PDFs ── */}
                {pdfResources.length > 0 && (
                  <div className="pt-1 mb-1 border-t border-gray-100">
                    <button
                      onClick={() => setOpenSection(openSection === "pdfs" ? null : "pdfs")}
                      className={`stab ${openSection === "pdfs" ? "active" : "text-gray-500"} w-full flex items-center justify-between px-2 py-2.5 bg-transparent border-none cursor-pointer text-[12.5px] font-bold`}
                    >
                      <span className="flex items-center gap-2">
                        <AiOutlineFilePdf style={{ fontSize: "15px" }} />
                        Resources
                        <span className="text-[10px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                          {pdfResources.length}
                        </span>
                      </span>
                      {openSection === "pdfs" ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
                    </button>

                    <div className={`acc-body ${openSection === "pdfs" ? "open" : ""}`}>
                      <div className="acc-inner">
                        <div className="flex flex-col gap-2 pb-2">
                          {pdfResources.map((file) => {
                            const ss = scoreMap[file.id] || {};
                            const scorePct = ss.data ? Math.round(parseFloat(ss.data.percentage ?? "0")) : null;
                            return (
                              <div
                                key={file.id}
                                className="border border-gray-150 rounded-xl px-3 py-3 transition-all hover:border-[#001489]/30 hover:shadow-sm"
                                style={{ borderColor: "#f0f0f0" }}
                              >
                                <div className="flex items-start gap-2">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={file.is_completed}
                                    className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 accent-[#001489] cursor-pointer"
                                    onClick={e => { e.stopPropagation(); handleCheckboxClick(file); }}
                                  />
                                  <button
                                    onClick={() => handlePdfClick(file)}
                                    className="flex items-center flex-1 min-w-0 gap-2 p-0 text-left bg-transparent border-none cursor-pointer"
                                  >
                                    <AiOutlineFilePdf style={{ color: "#ef4444", fontSize: "18px", flexShrink: 0 }} />
                                    <div className="min-w-0">
                                      <p className="m-0 text-[12px] font-semibold text-gray-900 truncate leading-snug">{file.title}</p>
                                      <p className="m-0 text-[10.5px] text-gray-400 mt-0.5">PDF Resource</p>
                                    </div>
                                  </button>
                                  {file.is_completed && (
                                    <FiCheckCircle className="pill-pop flex-shrink-0 mt-0.5" style={{ color: "#001489", fontSize: "13px" }} />
                                  )}
                                </div>

                                {file.is_completed && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-1.5 mt-2.5 ml-[22px]"
                                  >
                                    <button
                                      onClick={e => { e.stopPropagation(); handleTakeQuiz(file); }}
                                      className="flex-1 text-[11px] font-bold text-white bg-[#001489] border border-[#001489] rounded-lg py-1.5 cursor-pointer hover:bg-[#0f1c58] transition-colors"
                                    >
                                      Take Quiz →
                                    </button>
                                    <button
                                      onClick={e => { e.stopPropagation(); handleViewScore(file); }}
                                      disabled={ss.loading}
                                      className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-bold rounded-lg py-1.5 border border-[#001489] transition-all cursor-pointer disabled:opacity-50 ${ss.data ? "bg-[#001489] text-white" : "bg-[#f0f2fa] text-[#001489] hover:bg-[#001489] hover:text-white"}`}
                                    >
                                      {ss.loading
                                        ? <span className="s-spin" />
                                        : scorePct !== null
                                          ? <><FiBarChart2 size={10} />{scorePct}%</>
                                          : <><FiBarChart2 size={10} />Score</>
                                      }
                                    </button>
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Useful Links ── */}
                {usefulLinks.length > 0 && (
                  <div className="pt-1 border-t border-gray-100">
                    <button
                      onClick={() => setOpenSection(openSection === "links" ? null : "links")}
                      className={`stab ${openSection === "links" ? "active" : "text-gray-500"} w-full flex items-center justify-between px-2 py-2.5 bg-transparent border-none cursor-pointer text-[12.5px] font-bold`}
                    >
                      <span className="flex items-center gap-2">
                        <FiLink size={14} />
                        Useful Links
                      </span>
                      {openSection === "links" ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
                    </button>

                    <div className={`acc-body ${openSection === "links" ? "open" : ""}`}>
                      <div className="acc-inner">
                        <div className="pb-2 flex flex-col gap-0.5">
                          {usefulLinks.map(link => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[12.5px] font-medium text-[#001489] no-underline hover:bg-[#f0f2fa] transition-colors"
                            >
                              <div className="w-6 h-6 rounded-lg bg-[#f0f2fa] flex items-center justify-center flex-shrink-0">
                                <FiLink style={{ fontSize: "11px", color: "#001489" }} />
                              </div>
                              <span className="truncate">{link.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar footer */}
              <AnimatePresence>
                {allCompleted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-3.5 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <FiCheckCircle style={{ color: "#16a34a", fontSize: "16px", flexShrink: 0 }} />
                      <div>
                        <p className="m-0 text-[12px] font-bold text-green-700">All lessons complete!</p>
                        <p className="m-0 text-[10.5px] text-green-500 mt-0.5">Ready for the final quiz</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Score Modal */}
      {activeModal && (
        <ScoreModal
          data={activeModal.data}
          title={activeModal.title}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default Video;





