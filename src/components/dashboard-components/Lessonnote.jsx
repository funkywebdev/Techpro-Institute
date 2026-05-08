import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FiArrowLeft, FiCheckCircle, FiBook, FiVideo, FiFileText,
  FiClock, FiHash,
} from "react-icons/fi";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { toast } from "react-toastify";

/* ─── HTML sanitizer (same as Video.jsx) ────────────────────────────────── */
function sanitizeNoteHtml(raw) {
  if (!raw) return "";
  let html = raw;
  html = html.replace(/<br\s*\/?>/gi, "§BR§");
  const hasRealParagraphs = /<p[\s>]/i.test(html);
  if (!hasRealParagraphs) {
    html = html.replace(/([.!?'""»])(\s*§BR§\s*){2,}(?=\S)/g, "$1</p><p>");
    html = html.replace(/(§BR§\s*){2,}/g, " ");
    html = html.replace(/§BR§/g, " ");
    html = `<p>${html}</p>`;
  } else {
    html = html.replace(/§BR§/g, " ");
  }
  html = html.replace(/[ \t]{2,}/g, " ");
  html = html.replace(/\s+(<\/p>)/gi, "$1");
  html = html.replace(/(<p[^>]*>)\s+/gi, "$1");
  html = html.replace(/<p[^>]*>\s*<\/p>/gi, "");
  html = html.replace(
    /<p[^>]*>\s*<(strong|b)>([^<]{3,120})<\/\1>\s*:?\s*<\/p>/gi,
    (_, tag, text) => `<h4 class="note-subhead">${text.trim()}</h4>`
  );
  html = html.replace(
    /<p[^>]*>\s*(\d{1,2})[.)]\s+(.+?)<\/p>/gi,
    (_, num, text) =>
      `<li class="note-li note-li--num"><span class="note-li__num">${num}.</span><span class="note-li__text">${text.trim()}</span></li>`
  );
  html = html.replace(
    /<p[^>]*>\s*[·•\-–]\s+(.+?)<\/p>/gi,
    (_, text) =>
      `<li class="note-li note-li--dot"><span class="note-li__text">${text.trim()}</span></li>`
  );
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

/* ─── Note Content Renderer ─────────────────────────────────────────────── */
const NoteContent = ({ html }) => {
  if (!html)
    return (
      <p style={{ color: "#94a3b8", fontStyle: "italic", fontSize: "14px", margin: 0 }}>
        No notes available for this lesson.
      </p>
    );
  const clean = sanitizeNoteHtml(html);
  return <div className="note-body" dangerouslySetInnerHTML={{ __html: clean }} />;
};

/* ════════════════════════════════════════════════════════════════════════════
   LESSON NOTE PAGE
════════════════════════════════════════════════════════════════════════════ */
const LessonNote = () => {
  const navigate        = useNavigate();
  const { state }       = useLocation();
  const item            = state?.item;                    // passed from Video.jsx

  const [isCompleted, setIsCompleted] = useState(item?.is_completed ?? false);
  const [completing,  setCompleting]  = useState(false);

  // Redirect gracefully if landed here without state
  useEffect(() => {
    if (!item) navigate(-1);
  }, [item, navigate]);

  if (!item) return null;

  const isVideo = item.type === "video";
  const TypeIcon = isVideo ? FiVideo : FiFileText;
  const typeColor = isVideo ? "#3b82f6" : "#ef4444";
  const typeBg    = isVideo ? "#eff6ff" : "#fef2f2";

  const handleMarkComplete = async () => {
    if (isCompleted) return;
    setCompleting(true);
    try {
      await api.post(`/v1/module-contents/${item.id}/complete`);
      setIsCompleted(true);
      toast.success("Lesson marked as complete!");
    } catch {
      toast.error("Failed to mark lesson complete");
    } finally {
      setCompleting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        .ln-root * { box-sizing: border-box; }
        .ln-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #f7f8fb; min-height: 100vh; }

        /* ── Note rich text ── */
        .note-body {
          font-size: 15px;
          line-height: 1.85;
          color: #374151;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;
          max-width: 100%;
        }
        .note-body p { margin: 0 0 .9em; line-height: 1.9; white-space: normal; display: block; }
        .note-body p:last-child { margin: 0; }
        .note-body h1,.note-body h2,.note-body h3,.note-body h4,.note-body h5 {
          font-family: 'Syne', sans-serif; color: #0f172a; line-height: 1.3;
          font-weight: 700; margin: 1.1em 0 .4em;
        }
        .note-body h1 { font-size: 1.4rem; }
        .note-body h2 { font-size: 1.2rem; }
        .note-body h3 { font-size: 1.08rem; }
        .note-body h4 { font-size: 1rem; }
        .note-body h1:first-child,.note-body h2:first-child,.note-body h3:first-child,.note-body h4:first-child { margin-top: 0; }
        .note-body .note-subhead {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem;
          font-weight: 700; color: #001489; border-left: 3px solid #001489;
          padding-left: .7em; margin: 1em 0 .4em; line-height: 1.4;
        }
        .note-body strong,.note-body b { font-weight: 700; color: #111827; }
        .note-body em,.note-body i { font-style: italic; color: #4b5563; }
        .note-body a { color: #001489; text-decoration: underline; }
        .note-body a:hover { text-decoration: none; opacity: .8; }

        .note-body ul,.note-body ol,.note-body .note-list {
          list-style: none !important; margin: .4em 0 .7em; padding: 0;
          display: flex; flex-direction: column; gap: .2em;
        }
        .note-body .note-li {
          display: flex; align-items: flex-start; gap: .7em;
          font-size: 14.5px; line-height: 1.75; color: #374151;
          padding: .42em .9em .42em .7em; border-radius: 10px;
        }
        .note-body .note-li--num { background: #f0f2fa; border-left: 2.5px solid #001489; }
        .note-body .note-li__num {
          flex-shrink: 0; font-weight: 800; color: #001489; font-size: 13px;
          min-width: 22px; font-family: 'Syne', sans-serif; line-height: 1.75;
        }
        .note-body .note-li--dot { background: #f8fafc; border-left: 2.5px solid #c7d2fe; }
        .note-body .note-li--dot::before {
          content: ''; display: inline-block; flex-shrink: 0;
          width: 6px; height: 6px; margin-top: .65em; border-radius: 50%; background: #001489;
        }
        .note-body .note-li__text { flex: 1; min-width: 0; }
        .note-body ul > li:not(.note-li),.note-body ol > li:not(.note-li) {
          display: flex; align-items: flex-start; gap: .6em; font-size: 14.5px;
          line-height: 1.75; color: #374151; padding: .38em .85em .38em .65em;
          background: #f8fafc; border-radius: 10px; border-left: 2.5px solid #c7d2fe;
        }
        .note-body ul > li:not(.note-li)::before {
          content: ''; flex-shrink: 0; width: 6px; height: 6px; margin-top: .65em;
          border-radius: 50%; background: #001489;
        }
        .note-body ol { counter-reset: note-cnt; }
        .note-body ol > li:not(.note-li) {
          background: #f0f2fa; border-left-color: #001489; counter-increment: note-cnt;
        }
        .note-body ol > li:not(.note-li)::before {
          content: counter(note-cnt) "."; flex-shrink: 0; font-weight: 800; color: #001489;
          font-size: 13px; min-width: 22px; background: none; height: auto;
          border-radius: 0; margin-top: 0; font-family: 'Syne', sans-serif;
        }
        .note-body blockquote {
          border-left: 3px solid #001489; margin: 1.1em 0; padding: .7em 1.2em;
          background: #f0f2fa; border-radius: 0 10px 10px 0;
          color: #4b5563; font-style: italic; font-size: 14.5px;
        }
        .note-body code {
          background: #f1f5f9; border-radius: 5px; padding: 2px 7px;
          font-size: 12.5px; font-family: 'Fira Mono','Courier New',monospace;
          color: #0f172a; border: 1px solid #e2e8f0;
        }
        .note-body pre {
          background: #0f172a; color: #e2e8f0; padding: 16px 20px; border-radius: 12px;
          overflow-x: auto; font-size: 12.5px; margin: 1.2em 0; line-height: 1.7;
        }
        .note-body pre code { background: none; border: none; padding: 0; color: inherit; font-size: inherit; }
        .note-body table {
          width: 100%; border-collapse: collapse; font-size: 13px; margin: 1.1em 0;
          border-radius: 10px; overflow: hidden; border: 1px solid #e2e8f0;
        }
        .note-body th {
          background: #f0f2fa; color: #001489; padding: 10px 15px; text-align: left;
          font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .04em;
        }
        .note-body td { padding: 9px 15px; border-top: 1px solid #f1f5f9; vertical-align: top; }
        .note-body tr:nth-child(even) td { background: #f8fafc; }
        .note-body img { max-width: 100%; border-radius: 12px; margin: .8em 0; display: block; }
        .note-body hr { border: none; border-top: 1px solid #e2e8f0; margin: 1.4em 0; }

        /* ── back btn ── */
        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0;
          background: white; color: #374151; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all .18s ease; text-decoration: none;
        }
        .back-btn:hover { background: #f0f2fa; border-color: #001489; color: #001489; transform: translateX(-2px); }

        /* ── complete btn ── */
        .complete-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px;
          border-radius: 12px; border: none; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all .2s ease; font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .complete-btn.done { background: #f0fdf4; color: #16a34a; cursor: default; }
        .complete-btn.todo { background: #001489; color: white; }
        .complete-btn.todo:hover:not(:disabled) { background: #0f1c58; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,20,137,.25); }
        .complete-btn:disabled { opacity: .6; cursor: not-allowed; }

        /* scrollbar */
        .ln-scroll::-webkit-scrollbar { width: 4px; }
        .ln-scroll::-webkit-scrollbar-track { background: transparent; }
        .ln-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
      `}</style>

      <div className="ln-root">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-6 lg:py-10">

          {/* ── Back button ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FiArrowLeft size={14} />
              Back to Module
            </button>
          </motion.div>

          {/* ── Hero card ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
          >
            {/* Top accent bar */}
            <div className="w-full h-1" style={{ background: "linear-gradient(90deg, #001489, #3b5bdb, #60a5fa)" }} />

            <div className="px-6 py-6 sm:px-8">
              <div className="flex flex-wrap items-start gap-4">
                {/* Type badge */}
                <div
                  className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl"
                  style={{ background: typeBg }}
                >
                  <TypeIcon style={{ color: typeColor, fontSize: "20px" }} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-[#001489] uppercase tracking-widest">
                      Lesson Notes
                    </span>
                    <span className="text-gray-300">/</span>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize"
                      style={{ background: typeBg, color: typeColor }}
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    className="m-0 text-[1.35rem] sm:text-[1.55rem] font-bold text-gray-900 leading-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h1>
                </div>

                {/* Complete button */}
                <button
                  className={`complete-btn ${isCompleted ? "done" : "todo"}`}
                  onClick={handleMarkComplete}
                  disabled={isCompleted || completing}
                >
                  <FiCheckCircle size={15} />
                  {completing ? "Saving…" : isCompleted ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Note content card ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
          >
            {/* Card header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 sm:px-8 bg-gray-50/40">
              <div className="w-8 h-8 rounded-xl bg-[#f0f2fa] flex items-center justify-center flex-shrink-0">
                <FiBook style={{ color: "#001489", fontSize: "15px" }} />
              </div>
              <span
                className="font-bold text-gray-800 text-[15px]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Lesson Content
              </span>
              {isCompleted && (
                <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                  <FiCheckCircle size={10} /> Done
                </span>
              )}
            </div>

            {/* Note body */}
            <div className="px-6 sm:px-10 py-7 sm:py-9">
              <NoteContent html={item.content} />
            </div>
          </motion.div>

          {/* ── Bottom nav ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-between mt-5"
          >
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FiArrowLeft size={14} />
              Back to Module
            </button>

            {!isCompleted && (
              <button
                className="complete-btn todo"
                onClick={handleMarkComplete}
                disabled={completing}
              >
                <FiCheckCircle size={15} />
                {completing ? "Saving…" : "Mark Complete"}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LessonNote;