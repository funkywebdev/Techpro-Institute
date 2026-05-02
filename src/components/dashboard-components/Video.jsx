import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import {
  FiCheckCircle,
  FiLink,
  FiChevronDown,
  FiChevronUp,
  FiPlay,
  FiBook,
  FiAward,
  FiX,
  FiBarChart2,
  FiTrendingUp,
  FiTarget,
  FiStar,
  FiCalendar,
  FiHash,
} from "react-icons/fi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import api from "../../api/axios";
import { toast } from "react-toastify";

/* ─── localStorage helpers ─────────────────────────────────────────────── */
const COMPLETED_KEY = "completedModules";
const QUIZ_SCORES_KEY = "quizScores";

const getCompletedModules = () => {
  try { return JSON.parse(localStorage.getItem(COMPLETED_KEY)) || []; }
  catch { return []; }
};

const markModuleCompleted = (moduleId) => {
  const completed = getCompletedModules();
  if (!completed.includes(moduleId)) {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify([...completed, moduleId]));
  }
};

export const saveQuizScore = (quizId, data) => {
  try {
    const all = JSON.parse(localStorage.getItem(QUIZ_SCORES_KEY)) || {};
    all[quizId] = data;
    localStorage.setItem(QUIZ_SCORES_KEY, JSON.stringify(all));
  } catch { /* silent */ }
};

const getQuizScore = (quizId) => {
  try {
    const all = JSON.parse(localStorage.getItem(QUIZ_SCORES_KEY)) || {};
    return all[quizId] ?? null;
  } catch { return null; }
};

/* ─── entrance animation hook ───────────────────────────────────────────── */
const useEntrance = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);
    return () => clearTimeout(t);
  }, [delay]);
  return ref;
};

/* ─── Progress ring ─────────────────────────────────────────────────────── */
const ProgressRing = ({ pct }) => {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;
  return (
    <svg width="52" height="52" className="-rotate-90">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
      <circle
        cx="26" cy="26" r={r} fill="none" stroke="#001489" strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(.4,0,.2,1)]"
      />
      <text
        x="26" y="26" textAnchor="middle" dominantBaseline="central"
        fill="#001489" fontSize="9" fontWeight="700"
        style={{ transform: "rotate(90deg)", transformOrigin: "26px 26px" }}
      >
        {pct}%
      </text>
    </svg>
  );
};

/* ─── Score Modal ────────────────────────────────────────────────────────── */
const ScoreModal = ({ data, title, onClose }) => {
  if (!data) return null;

  const pct       = Math.round(parseFloat(data.percentage ?? "0"));
  const isPassed  = data.passed === 1 || data.passed === true || data.passed === "1" || pct >= 70;
  const score     = data.score ?? "-";
  const totalQ    = data.total_questions ? parseInt(data.total_questions) : null;
  const attemptNo = data.attempt_number ?? data.attempt_id ?? null;
  const quizId    = data.quiz_id ?? null;

  const submittedAt = data.submitted_at
    ? new Date(data.submitted_at).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : null;

  const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B" : pct >= 60 ? "C" : "F";

  const statCards = [
    { label: "Score",      value: totalQ ? `${score}/${totalQ}` : String(score), icon: <FiTarget size={14} />,   color: "text-[#001489]", bg: "bg-[#f0f2fa]" },
    { label: "Percentage", value: `${pct}%`, icon: <FiTrendingUp size={14} />, color: isPassed ? "text-green-600" : "text-red-600", bg: isPassed ? "bg-green-50" : "bg-red-50" },
    { label: "Grade",      value: grade,     icon: <FiStar size={14} />,        color: "text-amber-700",          bg: "bg-amber-50" },
  ];

  const metaItems = [
    attemptNo  && { icon: <FiBarChart2 />, label: "Attempt",   value: `#${attemptNo}`, bg: "bg-[#f0f2fa]",  color: "text-[#001489]" },
    quizId     && { icon: <FiHash />,      label: "Quiz ID",   value: quizId,           bg: "bg-violet-50",  color: "text-violet-700" },
    submittedAt && { icon: <FiCalendar />, label: "Submitted", value: submittedAt,      bg: "bg-amber-50",   color: "text-amber-700" },
  ].filter(Boolean);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-[DM_Sans]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-[460px] shadow-2xl overflow-hidden animate-[scoreModalIn_0.32s_cubic-bezier(.34,1.56,.64,1)]"
      >
        {/* header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#001489] via-[#0a2a8a] to-[#1a3fa8] px-6 pt-7 pb-5">
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/[0.04] pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/[0.03] pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/[0.13] border-none flex items-center justify-center text-white hover:bg-white/[0.22] transition-colors cursor-pointer"
          >
            <FiX size={13} />
          </button>

          <div className="flex items-center gap-4">
            <div className={`w-13 h-13 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${isPassed ? "bg-white/[0.12] border-white/25" : "bg-red-500/[0.18] border-red-400/35"}`}>
              <FiAward className={`text-2xl ${isPassed ? "text-amber-400" : "text-red-400"}`} />
            </div>
            <div>
              <p className="m-0 text-white/60 text-[0.68rem] font-semibold tracking-widest uppercase">Quiz Result</p>
              <h3 className="mt-1 text-white text-[1.05rem] font-bold leading-tight font-[Sora]">
                {title || "Module Quiz"}
              </h3>
              <span className={`inline-block mt-1.5 text-[0.67rem] font-bold tracking-wide px-2.5 py-0.5 rounded-full border ${isPassed ? "bg-green-500/20 text-green-400 border-green-500/35" : "bg-red-500/20 text-red-400 border-red-500/35"}`}>
                {isPassed ? "✓  PASSED" : "✗  FAILED"}
              </span>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="px-6 py-5">
          {/* stat cards */}
          <div className="flex gap-3 mb-5">
            {statCards.map(({ label, value, icon, color, bg }) => (
              <div key={label} className={`flex-1 text-center ${bg} rounded-xl py-3 px-1.5 border border-black/[0.04]`}>
                <span className={`${color} flex justify-center mb-1`}>{icon}</span>
                <p className="m-0 text-[1.25rem] font-extrabold text-gray-900 leading-none font-[Sora]">{value}</p>
                <p className="m-0 text-[0.62rem] font-semibold text-gray-400 uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* performance bar */}
          <div className="mb-5">
            <div className="flex justify-between mb-1.5">
              <span className="text-[0.75rem] font-semibold text-gray-500">Performance</span>
              <span className={`text-[0.75rem] font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                {pct}% — {isPassed ? "above pass mark" : "below pass mark"}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(.4,0,.2,1)] ${isPassed ? "bg-gradient-to-r from-[#001489] to-green-500" : "bg-gradient-to-r from-[#001489] to-red-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* meta row */}
          {metaItems.length > 0 && (
            <div className="flex gap-2.5 flex-wrap bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100">
              {metaItems.map(({ icon, label, value, bg, color }) => (
                <div key={label} className="flex items-center flex-1 gap-2">
                  <div className={`w-7 h-7 rounded-lg ${bg} flex-shrink-0 flex items-center justify-center`}>
                    {React.cloneElement(icon, { className: `${color} text-sm` })}
                  </div>
                  <div>
                    <p className="m-0 text-[0.62rem] text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
                    <p className="m-0 text-[0.82rem] font-bold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#001489] text-white border-none rounded-xl font-bold text-[0.85rem] cursor-pointer hover:opacity-90 hover:-translate-y-px transition-all font-[Sora]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resources, setResources]     = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openNoteId, setOpenNoteId]   = useState(null);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [openSection, setOpenSection] = useState("videos");
  const [scoreMap, setScoreMap]       = useState({});
  const [activeModal, setActiveModal] = useState(null);

  /* ── API calls ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/modules/${id}`);
        const contents = res.data.data || [];
        setResources(contents);
        const firstVideo = contents.find((r) => r.type === "video");
        if (firstVideo) setSelectedItem(firstVideo);

        // Pre-load saved scores from localStorage using quiz_id
        const pdfs = contents.filter((r) => r.type === "pdf");
        const preloaded = {};
        pdfs.forEach((f) => {
          const quizId = f.quiz_id ?? f.id;
          const saved = getQuizScore(quizId);
          if (saved) preloaded[f.id] = { loading: false, data: saved };
        });
        if (Object.keys(preloaded).length) setScoreMap(preloaded);

        const linksRes = await api.get(`/v1/course/useful-links`);
        setUsefulLinks(linksRes.data?.data || []);
      } catch (err) {
        console.error(err?.response);
        setError(err?.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCheckboxClick = async (item) => {
    if (item.is_completed) return;
    try {
      await api.post(`/v1/module-contents/${item.id}/complete`);
      setResources((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, is_completed: true } : r))
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark lesson complete");
    }
  };

  const handlePdfClick = (pdf) => {
    if (pdf.data?.url) {
      window.open(pdf.data.url, "_blank");
      handleCheckboxClick(pdf);
    }
  };

  useEffect(() => {
    if (resources.length > 0 && resources.every((r) => r.is_completed)) {
      markModuleCompleted(Number(id));
    }
  }, [resources, id]);



const handleViewScore = async (file) => {
  const quizId = file.id;

  if (!quizId) {
    toast.error("Quiz ID is missing for this resource");
    return;
  }

  setScoreMap((prev) => ({
    ...prev,
    [file.id]: { loading: true, data: null },
  }));

  try {
    const res = await api.get(
      `/v1/module-content/${quizId}/quiz/score?ts=${Date.now()}`
    );

    const scoreData = res.data?.data || res.data;

    // 🚨 IMPORTANT CHECK
    if (!scoreData || Object.keys(scoreData).length === 0) {
      toast.info("Please take the quiz before viewing your score.");
      return;
    }

    // save + show
    saveQuizScore(quizId, scoreData);

    setScoreMap((prev) => ({
      ...prev,
      [file.id]: { loading: false, data: scoreData },
    }));

    setActiveModal({ data: scoreData, title: file.title });

  } catch (err) {
    const status = err?.response?.status;

    setScoreMap((prev) => ({
      ...prev,
      [file.id]: { loading: false, data: null },
    }));

    // ✅ THIS is your main condition
    if (status === 404) {
      toast.info("Please take the quiz before viewing your score.");
      return;
    }

    toast.error("Unable to fetch score");
  }
};


  /* Navigate to quiz page using the quiz_id */
  const handleTakeQuiz = (file) => {
    const quizId = file.quiz_id ?? file.id;
    navigate(`/content/quiz/${quizId}`, {
      state: { resourceId: file.id, quizId },
    });
  };

  const allCompleted = resources.every((r) => r.is_completed);
  const completionPercent =
    resources.length === 0
      ? 0
      : Math.round((resources.filter((r) => r.is_completed).length / resources.length) * 100);

  const toggleSection = (s) => setOpenSection(openSection === s ? null : s);

  const videoResources = resources.filter((r) => r.type === "video");
  const pdfResources   = resources.filter((r) => r.type === "pdf");

  const videoRef   = useEntrance(0);
  const notesRef   = useEntrance(120);
  const sidebarRef = useEntrance(80);

  /* ════════ LOADING ════════════════════════════════════════════════════════ */
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <style>{`
          @keyframes orbit { 0%{transform:rotate(0deg) translateX(28px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(28px) rotate(-360deg)} }
          @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.15);opacity:1} }
          .orbit-dot{animation:orbit 1.4s linear infinite}
          .orbit-dot:nth-child(2){animation-delay:.35s}
          .orbit-dot:nth-child(3){animation-delay:.7s}
          .orbit-dot:nth-child(4){animation-delay:1.05s}
          .pulse-ring{animation:pulse-ring 1.8s ease-in-out infinite}
        `}</style>
        <div className="relative w-16 h-16 mb-6">
          <div className="pulse-ring absolute inset-0 rounded-full border-2 border-[#001489]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MdOutlineOndemandVideo className="text-[#001489] text-2xl" />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="orbit-dot absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#001489]"
              style={{ marginTop: "-4px", marginLeft: "-4px", animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
        <p className="text-sm font-semibold text-[#001489] tracking-widest uppercase">Loading module…</p>
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="flex items-center justify-center mx-auto mb-3 rounded-full w-14 h-14 bg-red-50">
            <FiX className="text-2xl text-red-500" />
          </div>
          <p className="font-semibold text-red-500">{error}</p>
        </div>
      </div>
    );

  /* ════════ RENDER ═════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes scoreModalIn { from{opacity:0;transform:scale(.93) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pill-in { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }
        @keyframes score-spin { to{transform:rotate(360deg)} }
        .accordion-body { display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s cubic-bezier(.4,0,.2,1), opacity .35s ease; opacity:0; }
        .accordion-body.open { grid-template-rows:1fr; opacity:1; }
        .accordion-inner { overflow:hidden; }
        .pill-in { animation:pill-in .3s cubic-bezier(.34,1.56,.64,1) forwards; }
        .score-spin { width:10px;height:10px;border-radius:50%;border:2px solid #c7d2fe;border-top-color:#001489;animation:score-spin .7s linear infinite;display:inline-block;vertical-align:middle; }
        .section-toggle { position:relative; }
        .section-toggle.active::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:#001489; border-radius:2px; }
        .vid-scroll::-webkit-scrollbar { width:4px; }
        .vid-scroll::-webkit-scrollbar-track { background:transparent; }
        .vid-scroll::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:99px; }
      `}</style>

      <div className="min-h-screen bg-[#f7f8fa]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="px-4 mx-auto max-w-7xl py-7">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* ══ LEFT ══════════════════════════════════════════════════ */}
            <div className="flex flex-col gap-6">

              {/* Video Player */}
              <div ref={videoRef}>
                {selectedItem?.type === "video" ? (
                  <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.15)] bg-black aspect-video">
                    <video
                      key={selectedItem.id}
                      src={selectedItem.data?.url}
                      controls
                      className="block w-full h-full"
                      onEnded={() => handleCheckboxClick(selectedItem)}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-gray-100 rounded-xl aspect-video animate-pulse">
                    <FiPlay className="text-5xl text-gray-400" />
                  </div>
                )}

                {selectedItem && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-[0.7rem] font-bold tracking-wide bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full uppercase">
                      Now Playing
                    </span>
                    <span className="text-[0.9rem] font-semibold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {selectedItem.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Lesson Notes */}
              <div
                ref={notesRef}
                className="bg-white rounded-xl shadow-[0_1px_8px_rgba(0,0,0,.07)] border border-gray-200 overflow-hidden"
              >
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                  <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                    <FiBook className="text-[#001489] text-base" />
                  </span>
                  <h2 className="m-0 text-base font-bold text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Lesson Notes
                  </h2>
                  <span className="ml-auto text-[0.7rem] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {resources.filter((r) => r.is_completed).length}/{resources.length} done
                  </span>
                </div>

                <div className="px-2">
                  {resources.length === 0 && (
                    <p className="py-6 text-sm italic text-center text-gray-400">No lesson notes available.</p>
                  )}
                  {resources.map((item, idx) => (
                    <div key={item.id} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => {
                          const newId = openNoteId === item.id ? null : item.id;
                          setOpenNoteId(newId);
                          if (newId && !item.is_completed) handleCheckboxClick(item);
                          if (item.type === "video") setSelectedItem(item);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left border-none cursor-pointer transition-all hover:bg-gray-50 hover:translate-x-0.5 ${selectedItem?.id === item.id ? "bg-[#f0f2fa]" : "bg-transparent"}`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[0.75rem] font-bold transition-colors duration-300 ${item.is_completed ? "bg-[#001489] text-white" : "bg-gray-100 text-gray-500"}`}
                        >
                          {item.is_completed ? <FiCheckCircle className="text-sm" /> : idx + 1}
                        </span>
                        <span className="flex-1 text-[0.88rem] font-semibold text-gray-900">{item.title}</span>
                        {item.type === "video" && (
                          <span className="text-[0.7rem] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Video</span>
                        )}
                        {item.type === "pdf" && (
                          <span className="text-[0.7rem] font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-full">PDF</span>
                        )}
                        <span className="flex-shrink-0 text-gray-400">
                          {openNoteId === item.id ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                      </button>

                      <div className={`accordion-body ${openNoteId === item.id ? "open" : ""}`}>
                        <div className="accordion-inner">
                          <div className="px-4 pb-5 pl-14">
                            {item.content ? (
                              <div
                                className="text-gray-800 text-[0.88rem] leading-7 overflow-x-auto"
                                dangerouslySetInnerHTML={{ __html: item.content }}
                              />
                            ) : (
                              <p className="text-gray-400 italic text-[0.85rem]">No notes for this lesson.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ SIDEBAR ═══════════════════════════════════════════════ */}
            <div
              ref={sidebarRef}
              className="bg-white rounded-xl shadow-[0_1px_8px_rgba(0,0,0,.07)] border border-gray-200 flex flex-col overflow-hidden h-fit"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <ProgressRing pct={completionPercent} />
                <div>
                  <p className="m-0 font-bold text-[0.95rem] text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Module Content
                  </p>
                  <p className="m-0 text-gray-500 text-[0.75rem]">
                    {resources.filter((r) => r.is_completed).length} of {resources.length} completed
                  </p>
                </div>
              </div>

              <div className="vid-scroll px-2.5 py-1">

                {/* Videos Section */}
                <div className="mb-0.5">
                  <button
                    onClick={() => toggleSection("videos")}
                    className={`section-toggle w-full flex items-center justify-between px-1.5 py-2.5 bg-transparent border-none cursor-pointer transition-colors ${openSection === "videos" ? "active text-[#001489]" : "text-gray-500"} text-[0.82rem] font-semibold`}
                  >
                    <span className="flex items-center gap-2">
                      <MdOutlineOndemandVideo />
                      Videos
                      <span className="text-[0.7rem] font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {videoResources.length}
                      </span>
                    </span>
                    {openSection === "videos" ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
                  </button>

                  <div className={`accordion-body ${openSection === "videos" ? "open" : ""}`}>
                    <div className="accordion-inner">
                      <div className="pb-1.5">
                        {videoResources.map((item, idx) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`flex items-start gap-2.5 px-2 py-2.5 rounded-xl mb-0.5 cursor-pointer transition-all hover:bg-gray-50 hover:translate-x-0.5 ${selectedItem?.id === item.id ? "bg-[#f0f2fa] border-l-[3px] border-[#001489]" : ""}`}
                          >
                            <input
                              type="checkbox"
                              readOnly
                              checked={item.is_completed}
                              className="mt-0.5 flex-shrink-0 w-4 h-4 accent-[#001489] cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); handleCheckboxClick(item); }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="m-0 text-[0.82rem] font-semibold text-gray-900 leading-snug">
                                {idx + 1}. {item.title}
                              </p>
                              <p className="m-0 text-[0.72rem] text-gray-400 mt-0.5">Video lesson</p>
                            </div>
                            {selectedItem?.id === item.id && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#001489] flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDFs Section */}
                {pdfResources.length > 0 && (
                  <div className="mb-0.5 border-t border-gray-100 pt-0.5">
                    <button
                      onClick={() => toggleSection("pdfs")}
                      className={`section-toggle w-full flex items-center justify-between px-1.5 py-2.5 bg-transparent border-none cursor-pointer transition-colors ${openSection === "pdfs" ? "active text-[#001489]" : "text-gray-500"} text-[0.82rem] font-semibold`}
                    >
                      <span className="flex items-center gap-2">
                        <AiOutlineFilePdf />
                        Resources
                        <span className="text-[0.7rem] font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                          {pdfResources.length}
                        </span>
                      </span>
                      {openSection === "pdfs" ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
                    </button>

                    <div className={`accordion-body ${openSection === "pdfs" ? "open" : ""}`}>
                      <div className="accordion-inner">
                        <div className="pb-2 flex flex-col gap-1.5">
                          {pdfResources.map((file) => {
                            const ss = scoreMap[file.id] || {};
                            const scorePct = ss.data
                              ? Math.round(parseFloat(ss.data.percentage ?? "0"))
                              : null;

                            return (
                              <div
                                key={file.id}
                                className="border border-gray-200 rounded-xl px-3 py-2.5 transition-all hover:border-[#001489] hover:shadow-sm hover:-translate-y-px"
                              >
                                {/* PDF row */}
                                <div className="flex items-center gap-2.5">
                                  <input
                                    type="checkbox"
                                    readOnly
                                    checked={file.is_completed}
                                    className="flex-shrink-0 w-4 h-4 accent-[#001489] cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); handleCheckboxClick(file); }}
                                  />
                                  <button
                                    onClick={() => handlePdfClick(file)}
                                    className="flex items-center flex-1 gap-2 p-0 text-left bg-transparent border-none cursor-pointer"
                                  >
                                    <AiOutlineFilePdf className="flex-shrink-0 text-lg text-red-700" />
                                    <div>
                                      <p className="m-0 text-[0.8rem] font-semibold text-gray-900">{file.title}</p>
                                      <p className="m-0 text-[0.7rem] text-gray-400">PDF Resource</p>
                                    </div>
                                  </button>
                                  {file.is_completed && (
                                    <FiCheckCircle className="pill-in text-[#001489] flex-shrink-0" />
                                  )}
                                </div>

                                {/* Action buttons — only after PDF viewed */}
                                {file.is_completed && (
                                  <div className="flex gap-1.5 mt-2.5 ml-[calc(16px+10px)]">
                                    {/* Take Quiz */}
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleTakeQuiz(file); }}
                                      className="flex-1 text-[0.72rem] font-bold text-white bg-[#001489] border border-[#001489] rounded-lg py-1.5 cursor-pointer hover:opacity-85 hover:-translate-y-px transition-all tracking-tight"
                                    >
                                      Take Quiz →
                                    </button>

                                    {/* View Score */}
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleViewScore(file); }}
                                      disabled={ss.loading}
                                      className={`flex-1 flex items-center justify-center gap-1 text-[0.72rem] font-bold tracking-tight rounded-lg py-1.5 border border-[#001489] transition-all ${ss.loading ? "opacity-60 cursor-wait" : "cursor-pointer hover:-translate-y-px"} ${ss.data ? "bg-[#001489] text-white" : "bg-[#f0f2fa] text-[#001489] hover:bg-[#001489] hover:text-white"}`}
                                    >
                                      {ss.loading ? (
                                        <span className="score-spin" />
                                      ) : scorePct !== null ? (
                                        <><FiBarChart2 className="text-xs" />{scorePct}%</>
                                      ) : (
                                        <><FiBarChart2 className="text-xs" />View Score</>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Useful Links */}
                {usefulLinks.length > 0 && (
                  <div className="border-t border-gray-100 pt-0.5">
                    <button
                      onClick={() => toggleSection("links")}
                      className={`section-toggle w-full flex items-center justify-between px-1.5 py-2.5 bg-transparent border-none cursor-pointer transition-colors ${openSection === "links" ? "active text-[#001489]" : "text-gray-500"} text-[0.82rem] font-semibold`}
                    >
                      <span className="flex items-center gap-2">
                        <FiLink />
                        Useful Links
                      </span>
                      {openSection === "links" ? <FiChevronUp className="text-xs" /> : <FiChevronDown className="text-xs" />}
                    </button>

                    <div className={`accordion-body ${openSection === "links" ? "open" : ""}`}>
                      <div className="accordion-inner">
                        <div className="pb-1.5 flex flex-col gap-0.5">
                          {usefulLinks.map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-2 py-2 rounded-xl text-[0.82rem] font-medium text-[#001489] no-underline transition-colors hover:bg-[#f0f2fa]"
                            >
                              <FiLink className="flex-shrink-0 text-[0.85rem]" />
                              <span>{link.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-3.5 py-3 border-t border-gray-100 flex flex-col gap-2">
                {allCompleted && (
                  <div className="flex items-center gap-2 px-3 py-2 border border-green-300 pill-in bg-green-50 rounded-xl">
                    <FiCheckCircle className="text-green-600" />
                    <span className="text-[0.78rem] font-semibold text-green-700">All lessons completed!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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