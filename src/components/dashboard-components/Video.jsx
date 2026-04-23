

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AiOutlineFilePdf } from "react-icons/ai";
// import {
//   FiCheckCircle,
//   FiLink,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";
// import api from "../../api/axios";
// import { toast } from "react-toastify";

// const COMPLETED_KEY = "completedModules";

// const getCompletedModules = () =>
//   JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
// const markModuleCompleted = (moduleId) => {
//   const completed = getCompletedModules();
//   if (!completed.includes(moduleId)) {
//     localStorage.setItem(
//       COMPLETED_KEY,
//       JSON.stringify([...completed, moduleId]),
//     );
//   }
// };

// const Video = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [resources, setResources] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [openNoteId, setOpenNoteId] = useState(null);
//   const [usefulLinks, setUsefulLinks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [bestAttempt, setBestAttempt] = useState(null);
//   const [loadingBest, setLoadingBest] = useState(false);
//   const [openSection, setOpenSection] = useState("videos");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/v1/modules/${id}`);
//         const contents = res.data.data || [];
//         setResources(contents);

//         const firstVideo = contents.find((r) => r.type === "video");
//         if (firstVideo) setSelectedItem(firstVideo);

//         const linksRes = await api.get(`/v1/course/useful-links`);

//         setUsefulLinks(linksRes.data?.data || []);
//       } catch (err) {
//         console.error(err.response);
//         setError(err.response.data.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleCheckboxClick = async (item) => {
//     if (item.is_completed) return;
//     try {
//       await api.post(`/v1/module-contents/${item.id}/complete`);
//       setResources((prev) =>
//         prev.map((r) => (r.id === item.id ? { ...r, is_completed: true } : r)),
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to mark lesson complete");
//     }
//   };

//   const handlePdfClick = (pdf) => {
//     if (pdf.data?.url) {
//       window.open(pdf.data.url, "_blank");
//       handleCheckboxClick(pdf);
//     }
//   };

//   useEffect(() => {
//     if (resources.length > 0 && resources.every((r) => r.is_completed)) {
//       markModuleCompleted(Number(id));
//     }
//   }, [resources, id]);

//   const allCompleted = resources.every((r) => r.is_completed);
//   const completionPercent = Math.round(
//     (resources.filter((r) => r.is_completed).length / resources.length) * 100,
//   );

//   const goToQuiz = () => {
//     if (!allCompleted) return;
//     navigate(`/quiz/${id}`);
//   };

//   const viewBestAttempt = async () => {
//     setLoadingBest(true);
//     try {
//       const res = await api.get(`/v1/quiz/${id}/score`);
//       if (res.data.status) {
//         setBestAttempt(res.data.data);
//         setShowModal(true);
//         toast.success("Best attempt fetched!");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Could not fetch best attempt");
//     } finally {
//       setLoadingBest(false);
//     }
//   };

//   const toggleSection = (section) =>
//     setOpenSection(openSection === section ? null : section);

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-sm font-semibold text-red-500">{error}</p>
//       </div>
//     );

//   const videoResources = resources.filter((r) => r.type === "video");
//   const pdfResources = resources.filter((r) => r.type === "pdf");

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="gap-6 px-2 py-6 mx-auto max-w-7xl lg:grid lg:grid-cols-3">
//         {/* LEFT: Video + Lesson Notes */}
//         <div className="space-y-6 lg:col-span-2">
//           {/* Video */}
//           {selectedItem?.type === "video" && (
//             <div className="overflow-hidden bg-black shadow-md aspect-video rounded-xl">
//               <video
//                 src={selectedItem.data.url}
//                 controls
//                 className="w-full h-full"
//                 onEnded={() => handleCheckboxClick(selectedItem)}
//               />
//             </div>
//           )}

//           {/* Lesson Notes */}
//           <div className="p-6 mb-4 bg-white border border-gray-300 shadow-md rounded-xl sm:mb-0">
//             <h2 className="mb-4 text-lg font-semibold text-black">
//               Lesson Notes
//             </h2>
//             {resources.length === 0 && (
//               <p className="italic text-gray-400">No lesson notes available.</p>
//             )}

//             {resources.map((item) => (
//               <div
//                 key={item.id}
//                 className="border-b border-gray-200 last:border-none"
//               >
//                 <button
//                   onClick={() => {
//                     const newOpenId = openNoteId === item.id ? null : item.id;
//                     setOpenNoteId(newOpenId);
//                     if (newOpenId && !item.is_completed)
//                       handleCheckboxClick(item);
//                     setSelectedItem(
//                       item.type === "video" ? item : selectedItem,
//                     );
//                   }}
//                   className={`flex items-center justify-between w-full py-3 font-medium text-left text-black transition hover:bg-gray-50 ${
//                     selectedItem?.id === item.id ? "bg-gray-100 rounded-md" : ""
//                   }`}
//                 >
//                   <span className="flex items-center gap-2">
//                     {item.is_completed && (
//                       <FiCheckCircle className="text-[#001489] animate-pulse" />
//                     )}
//                     {item.title}
//                   </span>
//                   {openNoteId === item.id ? <FiChevronUp /> : <FiChevronDown />}
//                 </button>

//                 <div
//                   className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
//                     openNoteId === item.id ? "max-h-fit mt-2" : "max-h-0"
//                   }`}
//                 >
//                   {item.content && (
//                     <div
//                       className="max-w-full p-4 overflow-x-auto text-gray-800 whitespace-pre"
//                       style={{ wordBreak: "normal" }}
//                       dangerouslySetInnerHTML={{ __html: item.content }}
//                     />
//                   )}
//                   {!item.content && openNoteId === item.id && (
//                     <p className="p-4 italic text-gray-500">
//                       No notes for this lesson.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: Sidebar */}

//         <div className="flex flex-col p-4 space-y-4 bg-white border border-gray-300 shadow-md rounded-xl h-fit">
//           <div className="pb-2 mb-2 font-semibold text-black border-b border-gray-300">
//             Module Content
//           </div>

//           <div className="border-b border-gray-200">
//             <button
//               onClick={() => toggleSection("videos")}
//               className="flex items-center justify-between w-full py-3 font-medium text-black hover:bg-gray-50"
//             >
//               Videos
//               {openSection === "videos" ? <FiChevronUp /> : <FiChevronDown />}
//             </button>

//             <div
//               className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openSection === "videos" ? "max-h-screen" : "max-h-0"}`}
//             >
//               {videoResources.map((item, idx) => (
//                 <button
//                   key={item.id}
//                   onClick={() => setSelectedItem(item)}
//                   className={`w-full flex gap-3 items-start text-left text-black hover:bg-gray-50 rounded-md transition-colors py-2 px-2 mb-2 ${
//                     selectedItem?.id === item.id
//                       ? "bg-gray-100 font-semibold"
//                       : ""
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     readOnly
//                     checked={item.is_completed}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleCheckboxClick(item);
//                     }}
//                     className="mt-1 accent-[#001489]"
//                   />
//                   <div>
//                     <p className="text-sm">
//                       {idx + 1}. {item.title}
//                     </p>
//                     <p className="mt-1 text-xs text-gray-500">Video lesson</p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {pdfResources.length > 0 && (
//             <div className="border-b border-gray-200">
//               <button
//                 onClick={() => toggleSection("pdfs")}
//                 className="flex items-center justify-between w-full py-2 font-medium text-black hover:bg-gray-50"
//               >
//                 Resources
//                 {openSection === "pdfs" ? <FiChevronUp /> : <FiChevronDown />}
//               </button>

//               <div
//                 className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openSection === "pdfs" ? "max-h-screen" : "max-h-0"}`}
//               >
               


// {pdfResources.map((file) => (
//   <div
//     key={file.id}
//     className="flex items-center justify-between w-full px-3 py-3 mb-2 transition-all border border-transparent rounded-lg group hover:border-gray-200 hover:bg-gray-50"
//   >
//     {/* LEFT SIDE */}
//     <button
//       onClick={() => handlePdfClick(file)}
//       className="flex items-center flex-1 gap-3 text-sm text-left text-gray-800"
//     >
//       <input
//         type="checkbox"
//         readOnly
//         checked={file.is_completed}
//         onClick={(e) => {
//           e.stopPropagation();
//           handleCheckboxClick(file);
//         }}
//         className="accent-[#001489] w-4 h-4"
//       />

//       <AiOutlineFilePdf className="text-[#001489] text-lg shrink-0" />

//       <div className="flex flex-col">
//         <span className="font-medium leading-tight">
//           {file.title}
//         </span>
//         <span className="text-[11px] text-gray-500">
//           PDF Resource
//         </span>
//       </div>

//       {file.is_completed && (
//         <FiCheckCircle className="ml-2 text-[#001489] text-sm" />
//       )}
//     </button>

// {file.is_completed && (
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       navigate(`/content/quiz/${file.id}`, {
//         state: { resourceId: file.id },
//       });
//     }}
//     className="ml-3 px-2.5 py-1 text-[11px] font-medium text-[#001489] border border-[#001489]/40 rounded-md 
//                hover:bg-[#001489] hover:text-white hover:border-[#001489] transition
//                opacity-80 group-hover:opacity-100"
//   >
//     Quiz
//   </button>
// )}
//   </div>
// ))}
//               </div>
//             </div>
//           )}

//           {usefulLinks.length > 0 && (
//             <div className="border-b border-gray-200">
//               <button
//                 onClick={() => toggleSection("links")}
//                 className="flex items-center justify-between w-full py-3 font-medium text-black hover:bg-gray-50"
//               >
//                 Useful Links
//                 {openSection === "links" ? <FiChevronUp /> : <FiChevronDown />}
//               </button>

//               <div
//                 className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openSection === "links" ? "max-h-screen" : "max-h-0"}`}
//               >
//                 {usefulLinks.map((link) => (
//                   <a
//                     key={link.id}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-3 text-sm text-[#001489] hover:underline py-2 px-2 mb-2 rounded-md hover:bg-gray-50 transition"
//                   >
//                     <FiLink /> <span>{link.title}</span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quiz Actions */}
//           <div className="flex flex-col gap-2 sm:flex-row">
//             <button
//               onClick={goToQuiz}
//               disabled={!allCompleted}
//               className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition text-center ${
//                 allCompleted
//                   ? "bg-[#001489] hover:bg-[#000f5a] text-white"
//                   : "bg-gray-300 cursor-not-allowed text-gray-600"
//               }`}
//             >
//               {allCompleted ? " Module Quiz" : "Complete all lessons"}
//             </button>

//             <button
//               onClick={viewBestAttempt}
//               disabled={loadingBest}
//               className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-[#001489] text-[#001489] hover:bg-[#001489] hover:text-white transition"
//             >
//               {loadingBest ? "Loading..." : "View Attempt"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showModal && bestAttempt && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="relative w-11/12 max-w-md p-6 bg-white shadow-lg rounded-xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute text-2xl font-bold text-gray-500 top-3 right-3 hover:text-gray-800"
//               onClick={() => setShowModal(false)}
//             >
//               ×
//             </button>
//             <h2 className="mb-4 text-xl font-semibold">Best Attempt</h2>
//             <p>
//               <strong>Score:</strong> {bestAttempt.score}
//             </p>
//             <p>
//               <strong>Percentage:</strong> {bestAttempt.percentage}%
//             </p>
//             <p>{bestAttempt.passed ? "✅ Passed" : "❌ Failed"}</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 w-full py-2 bg-[#001489] text-white rounded-lg hover:bg-[#000f5a] transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Video;






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
  FiClock,
  FiBarChart2,
  FiLock,
} from "react-icons/fi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import api from "../../api/axios";
import { toast } from "react-toastify";

/* ─── localStorage helpers (unchanged) ─────────────────────────────────── */
const COMPLETED_KEY = "completedModules";
const getCompletedModules = () =>
  JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
const markModuleCompleted = (moduleId) => {
  const completed = getCompletedModules();
  if (!completed.includes(moduleId)) {
    localStorage.setItem(
      COMPLETED_KEY,
      JSON.stringify([...completed, moduleId])
    );
  }
};

/* ─── tiny animation hook ───────────────────────────────────────────────── */
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
    <svg width="52" height="52" className="rotate-[-90deg]">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#e2e8f0" strokeWidth="4" />
      <circle
        cx="26" cy="26" r={r} fill="none"
        stroke="#001489" strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)" }}
      />
      <text
        x="26" y="26"
        textAnchor="middle" dominantBaseline="central"
        fill="#001489" fontSize="9" fontWeight="700"
        style={{ transform: "rotate(90deg)", transformOrigin: "26px 26px" }}
      >
        {pct}%
      </text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bestAttempt, setBestAttempt] = useState(null);
  const [loadingBest, setLoadingBest] = useState(false);
  const [openSection, setOpenSection] = useState("videos");
  const [showModal, setShowModal] = useState(false);

  /* ── API calls (100 % unchanged) ───────────────────────────────────────── */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/modules/${id}`);
        const contents = res.data.data || [];
        setResources(contents);
        const firstVideo = contents.find((r) => r.type === "video");
        if (firstVideo) setSelectedItem(firstVideo);
        const linksRes = await api.get(`/v1/course/useful-links`);
        setUsefulLinks(linksRes.data?.data || []);
      } catch (err) {
        console.error(err.response);
        setError(err.response.data.message);
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

  const allCompleted = resources.every((r) => r.is_completed);
  const completionPercent =
    resources.length === 0
      ? 0
      : Math.round(
          (resources.filter((r) => r.is_completed).length / resources.length) *
            100
        );

  const goToQuiz = () => {
    if (!allCompleted) return;
    navigate(`/quiz/${id}`);
  };

  const viewBestAttempt = async () => {
    setLoadingBest(true);
    try {
      const res = await api.get(`/v1/quiz/${id}/score`);
      if (res.data.status) {
        setBestAttempt(res.data.data);
        setShowModal(true);
        toast.success("Best attempt fetched!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch best attempt");
    } finally {
      setLoadingBest(false);
    }
  };

  const toggleSection = (section) =>
    setOpenSection(openSection === section ? null : section);

  /* ── derived ────────────────────────────────────────────────────────────── */
  const videoResources = resources.filter((r) => r.type === "video");
  const pdfResources = resources.filter((r) => r.type === "pdf");

  /* ── entrance refs ──────────────────────────────────────────────────────── */
  const videoRef = useEntrance(0);
  const notesRef = useEntrance(120);
  const sidebarRef = useEntrance(80);

  /* ════════════════════════════════════════════════════════════════════════
     LOADING
  ════════════════════════════════════════════════════════════════════════ */
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <style>{`
          @keyframes orbit {
            0%   { transform: rotate(0deg)   translateX(28px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
          }
          @keyframes pulse-ring {
            0%,100% { transform: scale(1);   opacity:.6; }
            50%      { transform: scale(1.15); opacity:1; }
          }
          .orbit-dot { animation: orbit 1.4s linear infinite; }
          .orbit-dot:nth-child(2){ animation-delay:.35s; }
          .orbit-dot:nth-child(3){ animation-delay:.7s; }
          .orbit-dot:nth-child(4){ animation-delay:1.05s; }
          .pulse-ring { animation: pulse-ring 1.8s ease-in-out infinite; }
        `}</style>
        <div className="relative w-16 h-16 mb-6">
          <div className="pulse-ring absolute inset-0 rounded-full border-2 border-[#001489]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <MdOutlineOndemandVideo className="text-[#001489] text-2xl" />
          </div>
          {[0,1,2,3].map(i => (
            <span key={i} className="orbit-dot absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#001489]"
              style={{ marginTop:"-4px", marginLeft:"-4px", animationDelay:`${i*0.35}s` }} />
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

  /* ════════════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        /* fonts */
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        /* tokens */
        :root {
          --navy:       #001489;
          --navy-soft:  #f0f2fa;
          --surface:    #ffffff;
          --bg:         #f7f8fa;
          --text:       #111827;
          --muted:      #6b7280;
          --border:     #e5e7eb;
          --radius:     12px;
          --shadow:     0 1px 8px rgba(0,0,0,.07);
        }

        .vid-page * { font-family: 'DM Sans', sans-serif; }
        .vid-page h1,h2,h3 { font-family: 'Sora', sans-serif; }

        /* scroll bar */
        .vid-scroll::-webkit-scrollbar { width: 4px; }
        .vid-scroll::-webkit-scrollbar-track { background: transparent; }
        .vid-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius:99px; }

        /* accordion slide */
        .accordion-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows .4s cubic-bezier(.4,0,.2,1),
                      opacity .35s ease;
          opacity: 0;
        }
        .accordion-body.open {
          grid-template-rows: 1fr;
          opacity: 1;
        }
        .accordion-inner { overflow: hidden; }

        /* card hover */
        .lesson-row {
          transition: background .2s, box-shadow .2s, transform .18s;
        }
        .lesson-row:hover {
          background: #f9fafb;
          transform: translateX(2px);
        }

        /* sidebar item */
        .sid-item {
          transition: background .2s, transform .18s, box-shadow .2s;
          cursor: pointer;
        }
        .sid-item:hover {
          background: #f9fafb;
          transform: translateX(2px);
        }
        .sid-item.active {
          background: #f9fafb;
          border-left: 3px solid var(--navy);
        }

        /* checkbox custom */
        input[type=checkbox].fancy {
          appearance: none;
          width: 17px; height: 17px;
          border: 2px solid #cbd5e1;
          border-radius: 5px;
          cursor: pointer;
          transition: background .2s, border .2s;
          flex-shrink: 0;
          position: relative;
        }
        input[type=checkbox].fancy:checked {
          background: var(--navy);
          border-color: var(--navy);
        }
        input[type=checkbox].fancy:checked::after {
          content:'';
          position:absolute; left:3px; top:1px;
          width:6px; height:9px;
          border:2px solid #fff;
          border-top:none; border-left:none;
          transform: rotate(42deg);
        }

        /* btn primary */
        .btn-primary {
          background: #001489;
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          font-size: .75rem;
          padding: .42rem .85rem;
          transition: opacity .2s, transform .15s, box-shadow .2s;
          box-shadow: none;
          letter-spacing:.01em;
        }
        .btn-primary:hover:not(:disabled) {
          opacity:.9;
          transform:translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,20,137,.15);
        }
        .btn-primary:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          box-shadow:none;
          cursor:not-allowed;
        }

        /* btn outline */
        .btn-outline {
          border: 1.5px solid var(--navy);
          color: var(--navy);
          border-radius: 8px;
          font-weight: 600;
          font-size: .75rem;
          padding: .42rem .85rem;
          background: transparent;
          transition: background .2s, transform .15s;
          cursor: pointer;
        }
        .btn-outline:hover {
          background: var(--navy-soft);
          transform:translateY(-1px);
        }

        /* badge */
        .badge {
          font-size: .7rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 99px;
          letter-spacing:.03em;
        }

        /* video shimmer */
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite;
        }

        /* tab underline */
        .section-toggle {
          position:relative;
          font-weight:600;
          font-size:.82rem;
          color: var(--muted);
          padding: .5rem 0;
          letter-spacing:.02em;
          transition: color .2s;
        }
        .section-toggle.active { color: var(--navy); }
        .section-toggle.active::after {
          content:'';
          position:absolute; bottom:0; left:0; right:0; height:2px;
          background: var(--navy);
          border-radius:2px;
        }

        /* modal backdrop blur */
        .modal-backdrop {
          backdrop-filter: blur(6px);
          background: rgba(15,23,42,.45);
        }

        /* modal card entrance */
        @keyframes modal-in {
          from { opacity:0; transform:scale(.93) translateY(16px); }
          to   { opacity:1; transform:scale(1)   translateY(0); }
        }
        .modal-card { animation: modal-in .3s cubic-bezier(.34,1.56,.64,1); }

        /* confetti tick */
        @keyframes tick-pop {
          0%  { transform:scale(0) rotate(-10deg); opacity:0; }
          60% { transform:scale(1.25) rotate(6deg); opacity:1; }
          100%{ transform:scale(1) rotate(0deg); opacity:1; }
        }
        .tick-pop { animation: tick-pop .5s cubic-bezier(.34,1.56,.64,1) forwards; }

        /* pdf row */
        .pdf-row {
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color .2s, box-shadow .2s, transform .18s;
        }
        .pdf-row:hover {
          border-color: var(--navy);
          box-shadow: 0 2px 8px rgba(0,0,0,.06);
          transform: translateY(-1px);
        }

        /* completed pill animation */
        @keyframes pill-in {
          from { opacity:0; transform:scale(.7); }
          to   { opacity:1; transform:scale(1); }
        }
        .pill-in { animation: pill-in .3s cubic-bezier(.34,1.56,.64,1) forwards; }
      `}</style>

      <div className="min-h-screen vid-page" style={{ background:"var(--bg)" }}>
       
        <div
          className="gap-6 px-4 mx-auto max-w-7xl py-7"
          style={{ display:"grid", gridTemplateColumns:"1fr", alignItems:"start" }}
        >
          <div
            style={{
              display:"grid",
              gridTemplateColumns:"minmax(0,1fr)",
              gap:"1.5rem",
            }}
            className="lg:!grid-cols-[1fr_340px]"
          >
            {/* ══ LEFT COLUMN ═══════════════════════════════════════════ */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>

              {/* Video Player */}
              <div ref={videoRef}>
                {selectedItem?.type === "video" ? (
                  <div
                    style={{
                      borderRadius:"var(--radius)",
                      overflow:"hidden",
                      boxShadow:"0 4px 20px rgba(0,0,0,.15)",
                      background:"#000",
                      aspectRatio:"16/9",
                    }}
                  >
                    <video
                      key={selectedItem.id}
                      src={selectedItem.data.url}
                      controls
                      className="w-full h-full"
                      style={{ display:"block" }}
                      onEnded={() => handleCheckboxClick(selectedItem)}
                    />
                  </div>
                ) : (
                  <div
                    className="shimmer"
                    style={{
                      borderRadius:"var(--radius)",
                      aspectRatio:"16/9",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}
                  >
                    <FiPlay style={{ color:"#94a3b8", fontSize:"2.5rem" }} />
                  </div>
                )}

                {/* Now playing bar */}
                {selectedItem && (
                  <div
                    style={{
                      marginTop:".75rem",
                      display:"flex", alignItems:"center", gap:".6rem",
                    }}
                  >
                    <span
                      className="badge"
                      style={{ background:"#f3f4f6", color:"#374151" }}
                    >
                      NOW PLAYING
                    </span>
                    <span
                      style={{
                        fontSize:".9rem", fontWeight:600,
                        color:"var(--text)", fontFamily:"'Sora',sans-serif",
                      }}
                    >
                      {selectedItem.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Lesson Notes Card */}
              <div
                ref={notesRef}
                style={{
                  background:"var(--surface)",
                  borderRadius:"var(--radius)",
                  boxShadow:"var(--shadow)",
                  border:"1px solid var(--border)",
                  overflow:"hidden",
                }}
              >
                {/* card header */}
                <div
                  style={{
                    padding:"1.1rem 1.4rem",
                    borderBottom:"1px solid var(--border)",
                    display:"flex", alignItems:"center", gap:".7rem",
                  }}
                >
                  <span
                    style={{
                      width:32, height:32, borderRadius:8,
                      background:"#f3f4f6",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}
                  >
                    <FiBook style={{ color:"#001489", fontSize:"1rem" }} />
                  </span>
                  <h2
                    style={{
                      margin:0, fontSize:"1rem", fontWeight:700,
                      color:"var(--text)", fontFamily:"'Sora',sans-serif",
                    }}
                  >
                    Lesson Notes
                  </h2>
                  <span
                    className="badge"
                    style={{
                      marginLeft:"auto",
                      background:"#f3f4f6", color:"#6b7280",
                    }}
                  >
                    {resources.filter(r=>r.is_completed).length}/{resources.length} done
                  </span>
                </div>

                {/* lessons list */}
                <div style={{ padding:"0 .5rem" }}>
                  {resources.length === 0 && (
                    <p style={{ padding:"1.5rem", color:"var(--muted)", fontStyle:"italic", textAlign:"center" }}>
                      No lesson notes available.
                    </p>
                  )}

                  {resources.map((item, idx) => (
                    <div key={item.id} style={{ borderBottom:"1px solid var(--border)" }} className="last:border-0">
                      <button
                        className="lesson-row"
                        onClick={() => {
                          const newOpenId = openNoteId === item.id ? null : item.id;
                          setOpenNoteId(newOpenId);
                          if (newOpenId && !item.is_completed) handleCheckboxClick(item);
                          setSelectedItem(item.type === "video" ? item : selectedItem);
                        }}
                        style={{
                          width:"100%", display:"flex", alignItems:"center",
                          gap:".85rem", padding:".85rem .9rem",
                          background: selectedItem?.id === item.id ? "var(--navy-soft)" : "transparent",
                          borderRadius: "10px",
                          textAlign:"left", border:"none", cursor:"pointer",
                        }}
                      >
                        {/* index / check */}
                        <span
                          style={{
                            width:28, height:28, borderRadius:"50%", flexShrink:0,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:".75rem", fontWeight:700,
                            background: item.is_completed ? "#001489" : "#f3f4f6",
                            color: item.is_completed ? "#fff" : "#6b7280",
                            transition: "background .3s",
                          }}
                        >
                          {item.is_completed
                            ? <FiCheckCircle style={{ fontSize:".9rem" }} />
                            : idx + 1}
                        </span>

                        <span style={{ flex:1, fontSize:".88rem", fontWeight:600, color:"var(--text)" }}>
                          {item.title}
                        </span>

                        {item.type === "video" && (
                          <span className="badge" style={{ background:"#eff6ff", color:"#1d4ed8" }}>
                            Video
                          </span>
                        )}
                        {item.type === "pdf" && (
                          <span className="badge" style={{ background:"#fef2f2", color:"#b91c1c" }}>
                            PDF
                          </span>
                        )}

                        <span style={{ color:"var(--muted)", flexShrink:0 }}>
                          {openNoteId === item.id ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                      </button>

                      {/* accordion body */}
                      <div className={`accordion-body ${openNoteId === item.id ? "open" : ""}`}>
                        <div className="accordion-inner">
                          <div style={{ padding:"1rem 1.1rem 1.2rem 3.5rem" }}>
                            {item.content ? (
                              <div
                                style={{
                                  color:"var(--text)", fontSize:".88rem",
                                  lineHeight:1.7, overflowX:"auto",
                                }}
                                dangerouslySetInnerHTML={{ __html: item.content }}
                              />
                            ) : (
                              <p style={{ color:"var(--muted)", fontStyle:"italic", fontSize:".85rem" }}>
                                No notes for this lesson.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ RIGHT SIDEBAR ════════════════════════════════════════ */}
            <div
              ref={sidebarRef}
              style={{
                background:"var(--surface)",
                borderRadius:"var(--radius)",
                boxShadow:"var(--shadow)",
                border:"1px solid var(--border)",
                display:"flex", flexDirection:"column",
                overflow:"hidden",
                height:"fit-content",
              }}
            >
              {/* sidebar header with ring */}
              <div
                style={{
                  padding:"1.1rem 1.2rem",
                  background:"#fff",
                  borderBottom:"1px solid var(--border)",
                  display:"flex", alignItems:"center", gap:".9rem",
                }}
              >
                <ProgressRing pct={completionPercent} />
                <div>
                  <p style={{ margin:0, color:"var(--text)", fontWeight:700, fontSize:".95rem", fontFamily:"'Sora',sans-serif" }}>
                    Module Content
                  </p>
                  <p style={{ margin:0, color:"var(--muted)", fontSize:".75rem" }}>
                    {resources.filter(r=>r.is_completed).length} of {resources.length} completed
                  </p>
                </div>
              </div>

              {/* sections */}
              <div className="vid-scroll" style={{ padding:".4rem .6rem" }}>

                {/* Videos section */}
                <div style={{ marginBottom:".2rem" }}>
                  <button
                    onClick={() => toggleSection("videos")}
                    className={`section-toggle ${openSection==="videos"?"active":""}`}
                    style={{
                      width:"100%", display:"flex", alignItems:"center",
                      justifyContent:"space-between", padding:".65rem .4rem",
                      background:"transparent", border:"none", cursor:"pointer",
                    }}
                  >
                    <span style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                      <MdOutlineOndemandVideo />
                      Videos
                      <span className="badge" style={{ background:"#f3f4f6", color:"#6b7280" }}>
                        {videoResources.length}
                      </span>
                    </span>
                    {openSection==="videos" ? <FiChevronUp style={{ fontSize:".8rem" }} /> : <FiChevronDown style={{ fontSize:".8rem" }} />}
                  </button>

                  <div className={`accordion-body ${openSection==="videos"?"open":""}`}>
                    <div className="accordion-inner">
                      <div style={{ paddingBottom:".4rem" }}>
                        {videoResources.map((item, idx) => (
                          <div
                            key={item.id}
                            className={`sid-item ${selectedItem?.id===item.id?"active":""}`}
                            onClick={() => setSelectedItem(item)}
                            style={{
                              display:"flex", alignItems:"flex-start", gap:".65rem",
                              padding:".6rem .5rem", borderRadius:"9px",
                              marginBottom:".2rem",
                            }}
                          >
                            <input
                              type="checkbox"
                              className="fancy"
                              readOnly
                              checked={item.is_completed}
                              style={{ marginTop:"2px" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCheckboxClick(item);
                              }}
                            />
                            <div style={{ flex:1, minWidth:0 }}>
                              <p style={{ margin:0, fontSize:".82rem", fontWeight:600, color:"var(--text)", lineHeight:1.4 }}>
                                {idx+1}. {item.title}
                              </p>
                              <p style={{ margin:0, fontSize:".72rem", color:"var(--muted)", marginTop:"2px" }}>
                                Video lesson
                              </p>
                            </div>
                            {selectedItem?.id===item.id && (
                              <span
                                style={{
                                  width:6, height:6, borderRadius:"50%",
                                  background:"var(--navy)", flexShrink:0, marginTop:"6px",
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDFs section */}
                {pdfResources.length > 0 && (
                  <div style={{ marginBottom:".2rem", borderTop:"1px solid var(--border)", paddingTop:".2rem" }}>
                    <button
                      onClick={() => toggleSection("pdfs")}
                      className={`section-toggle ${openSection==="pdfs"?"active":""}`}
                      style={{
                        width:"100%", display:"flex", alignItems:"center",
                        justifyContent:"space-between", padding:".65rem .4rem",
                        background:"transparent", border:"none", cursor:"pointer",
                      }}
                    >
                      <span style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                        <AiOutlineFilePdf />
                        Resources
                        <span className="badge" style={{ background:"#fef2f2", color:"#b91c1c" }}>
                          {pdfResources.length}
                        </span>
                      </span>
                      {openSection==="pdfs" ? <FiChevronUp style={{ fontSize:".8rem" }} /> : <FiChevronDown style={{ fontSize:".8rem" }} />}
                    </button>

                    <div className={`accordion-body ${openSection==="pdfs"?"open":""}`}>
                      <div className="accordion-inner">
                        <div style={{ paddingBottom:".5rem", display:"flex", flexDirection:"column", gap:".4rem" }}>
                          {pdfResources.map((file) => (
                            <div key={file.id} className="pdf-row" style={{ padding:".6rem .7rem" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:".6rem" }}>
                                <input
                                  type="checkbox"
                                  className="fancy"
                                  readOnly
                                  checked={file.is_completed}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxClick(file);
                                  }}
                                />
                                <button
                                  onClick={() => handlePdfClick(file)}
                                  style={{
                                    flex:1, display:"flex", alignItems:"center", gap:".5rem",
                                    background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                                  }}
                                >
                                  <AiOutlineFilePdf style={{ color:"#b91c1c", fontSize:"1.1rem", flexShrink:0 }} />
                                  <div>
                                    <p style={{ margin:0, fontSize:".8rem", fontWeight:600, color:"var(--text)" }}>
                                      {file.title}
                                    </p>
                                    <p style={{ margin:0, fontSize:".7rem", color:"var(--muted)" }}>PDF Resource</p>
                                  </div>
                                </button>
                                {file.is_completed && (
                                  <FiCheckCircle className="pill-in" style={{ color:"var(--navy)", flexShrink:0 }} />
                                )}
                              </div>

                              {file.is_completed && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/content/quiz/${file.id}`, { state: { resourceId: file.id } });
                                  }}
                                  style={{
                                    marginTop:".5rem", marginLeft:"calc(.6rem + 17px + .6rem + 1.1rem + .5rem)",
                                    fontSize:".72rem", fontWeight:700,
                                    color:"var(--navy)", background:"var(--navy-soft)",
                                    border:"1px solid var(--navy)", borderRadius:"7px",
                                    padding:"3px 10px", cursor:"pointer",
                                    transition:"background .2s, color .2s",
                                  }}
                                  onMouseEnter={e => { e.target.style.background="var(--navy)"; e.target.style.color="#fff"; }}
                                  onMouseLeave={e => { e.target.style.background="var(--navy-soft)"; e.target.style.color="var(--navy)"; }}
                                >
                                  Take Quiz →
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Useful Links */}
                {usefulLinks.length > 0 && (
                  <div style={{ borderTop:"1px solid var(--border)", paddingTop:".2rem" }}>
                    <button
                      onClick={() => toggleSection("links")}
                      className={`section-toggle ${openSection==="links"?"active":""}`}
                      style={{
                        width:"100%", display:"flex", alignItems:"center",
                        justifyContent:"space-between", padding:".65rem .4rem",
                        background:"transparent", border:"none", cursor:"pointer",
                      }}
                    >
                      <span style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
                        <FiLink />
                        Useful Links
                      </span>
                      {openSection==="links" ? <FiChevronUp style={{ fontSize:".8rem" }} /> : <FiChevronDown style={{ fontSize:".8rem" }} />}
                    </button>

                    <div className={`accordion-body ${openSection==="links"?"open":""}`}>
                      <div className="accordion-inner">
                        <div style={{ paddingBottom:".4rem", display:"flex", flexDirection:"column", gap:".1rem" }}>
                          {usefulLinks.map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display:"flex", alignItems:"center", gap:".55rem",
                                padding:".55rem .5rem", borderRadius:"9px",
                                fontSize:".82rem", fontWeight:500, color:"var(--navy)",
                                textDecoration:"none",
                                transition:"background .18s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.background="var(--navy-soft)"}
                              onMouseLeave={e => e.currentTarget.style.background="transparent"}
                            >
                              <FiLink style={{ flexShrink:0, fontSize:".85rem" }} />
                              <span>{link.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div
                style={{
                  padding:".65rem .85rem .75rem",
                  borderTop:"1px solid var(--border)",
                  display:"flex", flexDirection:"column", gap:".45rem",
                }}
              >
                {allCompleted && (
                  <div
                    className="pill-in"
                    style={{
                      display:"flex", alignItems:"center", gap:".5rem",
                      background:"#f0fdf4", border:"1px solid #86efac",
                      borderRadius:"9px", padding:".5rem .75rem",
                    }}
                  >
                    <FiCheckCircle style={{ color:"#16a34a" }} />
                    <span style={{ fontSize:".78rem", fontWeight:600, color:"#15803d" }}>
                      All lessons completed!
                    </span>
                  </div>
                )}

                <div style={{ display:"flex", gap:".5rem" }}>
                  <button
                    className="btn-primary"
                    onClick={goToQuiz}
                    disabled={!allCompleted}
                    style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem" }}
                  >
                    {allCompleted ? (
                      <><FiAward style={{ fontSize:".8rem" }} /> Module Quiz</>
                    ) : (
                      <><FiLock style={{ fontSize:".75rem" }} /> Complete lessons</>
                    )}
                  </button>

                  <button
                    className="btn-outline"
                    onClick={viewBestAttempt}
                    disabled={loadingBest}
                    style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:".4rem" }}
                  >
                    {loadingBest ? (
                      <span style={{ display:"flex", alignItems:"center", gap:".4rem" }}>
                        <span
                          style={{
                            width:13, height:13, border:"2px solid var(--navy)",
                            borderTopColor:"transparent", borderRadius:"50%",
                            display:"inline-block", animation:"spin .7s linear infinite",
                          }}
                        />
                        Loading
                      </span>
                    ) : (
                      <><FiBarChart2 style={{ fontSize:".75rem" }} /> View Attempt</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════ MODAL ════════════════════════════════════════════ */}
      {showModal && bestAttempt && (
        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)}
          style={{
            position:"fixed", inset:0, zIndex:50,
            display:"flex", alignItems:"center", justifyContent:"center",
            padding:"1rem",
          }}
        >
          <div
            className="modal-card"
            onClick={e => e.stopPropagation()}
            style={{
              background:"#fff", borderRadius:18,
              padding:"2rem", width:"100%", maxWidth:400,
              boxShadow:"0 24px 64px rgba(15,23,42,.25)",
              position:"relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position:"absolute", top:14, right:14,
                width:30, height:30, borderRadius:"50%",
                border:"none", background:"#f1f5f9",
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", transition:"background .2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="#e2e8f0"}
              onMouseLeave={e => e.currentTarget.style.background="#f1f5f9"}
            >
              <FiX style={{ color:"#64748b" }} />
            </button>

            {/* icon */}
            <div style={{ textAlign:"center", marginBottom:"1.2rem" }}>
              <div
                style={{
                  width:64, height:64, borderRadius:"50%", margin:"0 auto .9rem",
                  background: bestAttempt.passed ? "#f0fdf4" : "#fef2f2",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"1.8rem",
                }}
              >
                {bestAttempt.passed ? "🏆" : "📘"}
              </div>
              <h2 style={{ margin:0, fontFamily:"'Sora',sans-serif", fontSize:"1.15rem", fontWeight:700, color:"var(--text)" }}>
                Best Attempt
              </h2>
            </div>

            {/* stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:".75rem", marginBottom:"1.2rem" }}>
              {[
                { label:"Score", value: bestAttempt.score, icon:<FiAward /> },
                { label:"Percentage", value:`${bestAttempt.percentage}%`, icon:<FiBarChart2 /> },
              ].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    background:"var(--bg)", borderRadius:12,
                    padding:".9rem", textAlign:"center",
                    border:"1px solid var(--border)",
                  }}
                >
                  <div style={{ color:"var(--navy)", marginBottom:".3rem" }}>{stat.icon}</div>
                  <p style={{ margin:0, fontSize:"1.3rem", fontWeight:800, color:"var(--navy)", fontFamily:"'Sora',sans-serif" }}>
                    {stat.value}
                  </p>
                  <p style={{ margin:0, fontSize:".72rem", color:"var(--muted)", fontWeight:500 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign:"center", padding:".55rem",
                borderRadius:10, marginBottom:"1.1rem",
                background: bestAttempt.passed ? "#f0fdf4" : "#fef2f2",
                border:`1px solid ${bestAttempt.passed ? "#86efac" : "#fca5a5"}`,
                color: bestAttempt.passed ? "#15803d" : "#b91c1c",
                fontWeight:700, fontSize:".88rem",
              }}
            >
              {bestAttempt.passed ? "✅ Passed — Great work!" : "❌ Not passed — Keep going!"}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn-primary"
              style={{ width:"100%", justifyContent:"center", display:"flex" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </>
  );
};

export default Video;