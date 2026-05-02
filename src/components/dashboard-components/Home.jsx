




import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Rectangle4317 from "../../assets/images/Rectangle4317.png";
import Preview from "../../components/dashboard-components/Preview";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiBookOpen,
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";

/* ─── localStorage helpers ───────────────────────────────────────────────── */
const COMPLETED_KEY = "completedModules";
const getCompletedModules = () => {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
  } catch {
    return [];
  }
};

/* ═══════════════════════════════
   Circular Progress
═══════════════════════════════ */
const CircularProgress = ({ size = 52, strokeWidth = 5, progress = 0 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const color = progress === 100 ? "#16a34a" : "#15256E";
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle stroke="#e5e7eb" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
      <circle
        stroke={color} fill="transparent" strokeWidth={strokeWidth} r={radius}
        cx={size / 2} cy={size / 2}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(.4,0,.2,1), stroke 0.4s" }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={color}
        style={{ fontSize: "9px", fontWeight: 800, fontFamily: "'Sora',sans-serif" }}>
        {progress}%
      </text>
    </svg>
  );
};

/* ═══════════════════════════════
   Spinner
═══════════════════════════════ */
const Spinner = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem" }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <div style={{ position: "relative", width: 40, height: 40 }}>
      <div style={{ position: "absolute", inset: 0, border: "3px solid #e5e7eb", borderTopColor: "#15256E", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <div style={{ position: "absolute", inset: "7px", border: "2px solid #e5e7eb", borderTopColor: "#3b5bdb", borderRadius: "50%", animation: "spin 1.3s linear infinite reverse" }} />
    </div>
    <p style={{ color: "#15256E", fontWeight: 600, fontSize: ".75rem", letterSpacing: ".08em", textTransform: "uppercase" }}>Loading…</p>
  </div>
);

/* ═══════════════════════════════
   InfoRow
═══════════════════════════════ */
const InfoRow = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: ".4rem", padding: ".28rem 0", borderBottom: "1px solid #f3f4f6" }}>
    <span style={{ width: 22, height: 22, borderRadius: 6, background: "#f0f2fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {React.cloneElement(icon, { size: 11, color: "#15256E" })}
    </span>
    <div style={{ minWidth: 0 }}>
      <p style={{ margin: 0, fontSize: ".57rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</p>
      <p style={{ margin: 0, fontSize: ".72rem", fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {value || "N/A"}
      </p>
    </div>
  </div>
);

/* ═══════════════════════════════
   HOME COMPONENT
═══════════════════════════════ */
const Home = () => {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { toast.error("Please login to continue"); setLoading(false); return; }
        const headers = { Authorization: `Bearer ${token}` };

        const userRes = await api.get("/v1/me", { headers });
        setUser(userRes.data?.data || null);

        const enrollmentRes = await api.get("/v1/enrollment/details", { headers });
        const enrolledCourse = enrollmentRes.data?.data || null;

        if (enrolledCourse) {
          const [courseRes, modulesRes] = await Promise.allSettled([
            api.get(`/v1/course-progress/${enrolledCourse.course_id}`, { headers }),
            api.get("/v1/modules", { headers }),
          ]);
          if (courseRes.status === "fulfilled") setCourse(courseRes.value.data?.data || null);
          if (modulesRes.status === "fulfilled") setModules(modulesRes.value.data?.data || []);
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 403) toast.error(error.response.data.message);
        else if (status === 500) toast.error("Failed to load data. Please try again.");
        setCourse(null); setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  const safeUser = user || { firstName: "N/A", lastName: "", email: "N/A", phone: "N/A", region: "N/A" };
  const safeCourse = course || { title: "No course enrolled", instructor: "N/A", image: null, course_progress_precentage: 0 };
  const progress = Number(safeCourse.course_progress_precentage) || 0;
  const completedModules = getCompletedModules();
  const nextModule = modules.find((m) => !completedModules.includes(m.id));
  const resumeModule = nextModule || (modules.length > 0 ? modules[modules.length - 1] : null);

  const handleContinueLearning = () => {
    if (progress === 100) navigate("/certificate");
    else if (resumeModule) navigate(`/module/${resumeModule.id}`);
    else navigate("/admincourse");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .home-root { font-family: 'DM Sans', sans-serif; }
        .home-root h1,.home-root h2,.home-root h3 { font-family: 'Sora', sans-serif; }
        .card-lift { transition: box-shadow 0.22s, transform 0.22s; }
        .card-lift:hover { box-shadow: 0 10px 24px rgba(21,37,110,0.13) !important; transform: translateY(-2px); }
        @keyframes progress-fill { from { width: 0; } }
        .prog-bar { animation: progress-fill 1s cubic-bezier(.4,0,.2,1) forwards; }
        @keyframes fade-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up   { animation: fade-up 0.4s ease forwards; }
        .fade-up-1 { animation: fade-up 0.4s 0.05s ease both; }
        .fade-up-2 { animation: fade-up 0.4s 0.10s ease both; }

        .home-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .85rem;
          align-items: stretch;   /* ← equal height */
        }
        /* each column stretches its card to fill */
        .home-col { display: flex; flex-direction: column; }
        .home-col > .card-lift { flex: 1; display: flex; flex-direction: column; }

        @media (max-width: 700px) {
          .home-grid { grid-template-columns: 1fr !important; }
          .course-card-inner { flex-direction: column !important; }
          .course-img { width: 100% !important; height: 110px !important; }
          .progress-panel { flex-direction: column !important; }
          .progress-divider {
            border-right: none !important;
            border-bottom: 1px solid #f3f4f6 !important;
            padding-right: 0 !important;
            padding-bottom: .85rem !important;
          }
        }
      `}</style>

      <div className="home-root" style={{ padding: "clamp(.75rem,2.5vw,1.25rem)", background: "#f7f8fa", minHeight: "100vh" }}>
        <div style={{ width: "100%" }}>

          <p className="fade-up" style={{ margin: "0 0 .85rem", fontSize: ".62rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9ca3af" }}>
            Dashboard Overview
          </p>

          {/* ── Equal-height two-column grid ─────────────────────── */}
          <div className="home-grid" style={{ marginBottom: "clamp(.75rem,2.5vw,1.25rem)" }}>

            {/* ══ ENROLLED COURSE ══════════════════════════════════ */}
            <div className="home-col fade-up-1">
              <p style={{ margin: "0 0 .4rem", fontWeight: 700, fontSize: ".88rem", color: "#111827", fontFamily: "'Sora',sans-serif" }}>
                Enrolled Course
              </p>

              <div className="card-lift" style={{
                background: "#fff", borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                border: "1px solid #f0f0f0", overflow: "hidden",
              }}>
                {/* image + info — fills available height */}
                <div className="course-card-inner" style={{ display: "flex", flex: 1 }}>
                  {/* thumbnail */}
                  <div className="course-img" style={{ width: 90, flexShrink: 0, overflow: "hidden", background: "#f1f5f9" }}>
                    <img
                      src={safeCourse.image?.url || Rectangle4317}
                      alt={safeCourse.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>

                  {/* text info */}
                  <div style={{ flex: 1, padding: ".55rem .7rem", display: "flex", flexDirection: "column", gap: ".22rem", justifyContent: "center" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontSize: ".55rem", fontWeight: 700, padding: "2px 6px",
                      borderRadius: 99, alignSelf: "flex-start",
                      background: progress === 100 ? "#f0fdf4" : "#f0f2fa",
                      color: progress === 100 ? "#15803d" : "#15256E",
                      border: `1px solid ${progress === 100 ? "#bbf7d0" : "#c7d2fe"}`,
                    }}>
                      {progress === 100 ? "✓ Completed" : "● In Progress"}
                    </span>

                    <h3 style={{ margin: 0, fontSize: ".78rem", fontWeight: 700, color: "#111827", lineHeight: 1.3, fontFamily: "'Sora',sans-serif" }}>
                      {safeCourse.title}
                    </h3>

                    {safeCourse.instructor && safeCourse.instructor !== "N/A" && (
                      <p style={{ margin: 0, fontSize: ".63rem", color: "#6b7280" }}>by {safeCourse.instructor}</p>
                    )}

                    <div style={{ marginTop: ".25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <span style={{ fontSize: ".6rem", color: "#6b7280", fontWeight: 600 }}>Progress</span>
                        <span style={{ fontSize: ".6rem", fontWeight: 700, color: "#15256E" }}>{progress}%</span>
                      </div>
                      <div style={{ height: 4, background: "#f0f0f0", borderRadius: 99, overflow: "hidden" }}>
                        <div className="prog-bar" style={{
                          height: "100%", width: `${progress}%`,
                          background: progress === 100
                            ? "linear-gradient(90deg,#16a34a,#4ade80)"
                            : "linear-gradient(90deg,#15256E,#3b5bdb)",
                          borderRadius: 99,
                        }} />
                      </div>
                      {progress < 100 && resumeModule && (
                        <p style={{ margin: ".2rem 0 0", fontSize: ".6rem", color: "#6b7280" }}>
                          Next: <span style={{ fontWeight: 700, color: "#15256E" }}>{resumeModule.title}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA — pinned to bottom */}
                <div style={{ padding: ".5rem .65rem", borderTop: "1px solid #f3f4f6", marginTop: "auto" }}>
                  <button
                    onClick={handleContinueLearning}
                    style={{
                      width: "100%", padding: ".45rem 1rem",
                      background: progress === 100
                        ? "linear-gradient(135deg,#16a34a,#22c55e)"
                        : "linear-gradient(135deg,#15256E,#1e3a8a)",
                      color: "#fff", border: "none", borderRadius: 8,
                      fontWeight: 700, fontSize: ".73rem", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                      fontFamily: "'DM Sans',sans-serif",
                      boxShadow: "0 2px 8px rgba(21,37,110,0.18)",
                      transition: "opacity .2s, transform .15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = ".88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
                  >
                    {progress === 100
                      ? <><FiAward size={12} /> Print Certificate</>
                      : <><FiBookOpen size={12} /> Continue Learning <FiChevronRight size={11} /></>}
                  </button>
                </div>
              </div>
            </div>

            {/* ══ PROGRESS OVERVIEW ════════════════════════════════ */}
            <div className="home-col fade-up-2">
              <p style={{ margin: "0 0 .4rem", fontWeight: 700, fontSize: ".88rem", color: "#111827", fontFamily: "'Sora',sans-serif" }}>
                Progress Overview
              </p>

              <div className="card-lift" style={{
                background: "#fff", borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                border: "1px solid #f0f0f0",
                padding: ".85rem",
              }}>
                <div className="progress-panel" style={{ display: "flex", gap: ".85rem", height: "100%" }}>

                  {/* ring + badge */}
                  <div className="progress-divider" style={{
                    flex: "0 0 auto", display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: ".45rem", paddingRight: ".85rem",
                    borderRight: "1px solid #f3f4f6", minWidth: 84,
                  }}>
                    <CircularProgress progress={progress} size={52} />

                    <div style={{ textAlign: "center" }}>
                      <p style={{
                        margin: 0, fontSize: ".65rem", fontWeight: 700, color: "#111827",
                        lineHeight: 1.3, fontFamily: "'Sora',sans-serif",
                        display: "-webkit-box", WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {safeCourse.title}
                      </p>
                      {safeCourse.instructor && safeCourse.instructor !== "N/A" && (
                        <p style={{ margin: ".15rem 0 0", fontSize: ".58rem", color: "#9ca3af" }}>{safeCourse.instructor}</p>
                      )}
                    </div>

                    <div style={{
                      background: "#f0f2fa", borderRadius: 8,
                      padding: ".28rem .55rem", textAlign: "center",
                      border: "1px solid #e0e5f7", width: "100%",
                    }}>
                      <p style={{ margin: 0, fontSize: ".85rem", fontWeight: 800, color: "#15256E", fontFamily: "'Sora',sans-serif" }}>
                        {completedModules.length}
                        <span style={{ fontSize: ".6rem", color: "#9ca3af", fontWeight: 600 }}>/{modules.length}</span>
                      </p>
                      <p style={{ margin: 0, fontSize: ".54rem", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>
                        Modules done
                      </p>
                    </div>
                  </div>

                  {/* personal info */}
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: ".08rem" }}>
                    <p style={{ margin: "0 0 .35rem", fontSize: ".68rem", fontWeight: 700, color: "#111827", fontFamily: "'Sora',sans-serif" }}>
                      Personal Information
                    </p>
                    <InfoRow icon={<FiUser />}  label="Name"   value={`${safeUser.firstName} ${safeUser.lastName}`.trim()} />
                    <InfoRow icon={<FiMail />}  label="Email"  value={safeUser.email} />
                    <InfoRow icon={<FiPhone />} label="Phone"  value={safeUser.phone} />
                    <InfoRow icon={<FiGlobe />} label="Region" value={safeUser.region} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Preview Section ──────────────────────────────────── */}
          <Preview course={course} />
        </div>
      </div>
    </>
  );
};

export default Home;
