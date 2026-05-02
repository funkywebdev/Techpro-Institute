





import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

/* ═══════════════════════════════
   Spinner
═══════════════════════════════ */
const Spinner = () => (
  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"60vh", gap:"1rem" }}>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <div style={{ position:"relative", width:44, height:44 }}>
      <div style={{ position:"absolute", inset:0, border:"3px solid #e5e7eb", borderTopColor:"#15256E", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <div style={{ position:"absolute", inset:"8px", border:"2px solid #e5e7eb", borderTopColor:"#3b5bdb", borderRadius:"50%", animation:"spin 1.3s linear infinite reverse" }} />
    </div>
    <p style={{ color:"#15256E", fontWeight:600, fontSize:".75rem", letterSpacing:".08em", textTransform:"uppercase" }}>Loading…</p>
  </div>
);

/* ═══════════════════════════════
   Circular Progress Ring
═══════════════════════════════ */
const CircularProgress = ({ size = 64, strokeWidth = 5, progress = 0 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const color = progress === 100 ? "#16a34a" : "#15256E";
  return (
    <svg width={size} height={size} style={{ flexShrink:0 }}>
      <circle stroke="#e5e7eb" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size/2} cy={size/2} />
      <circle
        stroke={color} fill="transparent" strokeWidth={strokeWidth} r={radius}
        cx={size/2} cy={size/2}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke 0.4s" }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={color}
        style={{ fontSize:"11px", fontWeight:800, fontFamily:"'Sora',sans-serif" }}>
        {progress}%
      </text>
    </svg>
  );
};

/* ═══════════════════════════════
   Course Card
═══════════════════════════════ */
const CourseCard = ({ course, index }) => {
  const [visible, setVisible] = React.useState(false);
  const [barWidth, setBarWidth] = React.useState(0);

  React.useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), index * 120);
    const t2 = setTimeout(() => setBarWidth(course.progress), index * 120 + 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [index, course.progress]);

  const isDone = course.progress === 100;

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      display: "flex", flexDirection: "column",
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,.07)",
      border: "1px solid #f0f0f0",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* ── Image banner ── */}
      <div style={{ position:"relative", height:140, overflow:"hidden", background:"#e8eaf6" }}>
        <img
          src={course.image}
          alt={course.title || "Course"}
          style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.4s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        {/* gradient overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(21,37,110,0.55) 0%, transparent 55%)",
        }} />
        {/* status badge */}
        <span style={{
          position:"absolute", top:10, left:10,
          fontSize:".58rem", fontWeight:700,
          padding:"3px 9px", borderRadius:99,
          background: isDone ? "rgba(22,163,74,0.92)" : "rgba(21,37,110,0.88)",
          color:"#fff", backdropFilter:"blur(4px)",
          border: isDone ? "1px solid #4ade80" : "1px solid #818cf8",
          letterSpacing:".04em",
        }}>
          {isDone ? "✓ Completed" : "● In Progress"}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ flex:1, padding:"1rem 1rem .75rem", display:"flex", flexDirection:"column", gap:".55rem" }}>

        <h3 style={{ margin:0, fontSize:".88rem", fontWeight:700, color:"#111827", lineHeight:1.35, fontFamily:"'Sora',sans-serif" }}>
          {course.title || "Untitled Course"}
        </h3>

        {/* progress row */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
            <span style={{ fontSize:".65rem", color:"#6b7280", fontWeight:600 }}>Course Progress</span>
            <span style={{
              fontSize:".65rem", fontWeight:800,
              color: isDone ? "#16a34a" : "#15256E",
              fontFamily:"'Sora',sans-serif",
            }}>
              {course.progress}%
            </span>
          </div>
          {/* bar track */}
          <div style={{ height:6, background:"#f0f0f0", borderRadius:99, overflow:"hidden", position:"relative" }}>
            <div style={{
              height:"100%",
              width:`${barWidth}%`,
              background: isDone
                ? "linear-gradient(90deg,#16a34a,#4ade80)"
                : "linear-gradient(90deg,#15256E,#6366f1)",
              borderRadius:99,
              transition:"width 1s cubic-bezier(.4,0,.2,1)",
              position:"relative",
            }}>
              {/* shimmer */}
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                backgroundSize:"200% 100%",
                animation:"shimmer 2s infinite linear",
              }} />
            </div>
          </div>
          <p style={{ margin:".3rem 0 0", fontSize:".62rem", color:"#9ca3af" }}>
            {isDone ? "All modules completed 🎉" : `${course.progress}% of course completed`}
          </p>
        </div>

        {/* circular ring + stat row */}
        <div style={{
          display:"flex", alignItems:"center", gap:"1rem",
          padding:".65rem .75rem",
          background:"#f7f8ff",
          borderRadius:10,
          border:"1px solid #e8eaf6",
          marginTop:"auto",
        }}>
          <CircularProgress progress={course.progress} size={52} strokeWidth={5} />
          <div>
            <p style={{ margin:0, fontSize:".65rem", color:"#9ca3af", fontWeight:600, textTransform:"uppercase", letterSpacing:".04em" }}>Overall</p>
            <p style={{ margin:".1rem 0 0", fontSize:"1.1rem", fontWeight:800, color: isDone ? "#16a34a" : "#15256E", fontFamily:"'Sora',sans-serif", lineHeight:1 }}>
              {course.progress}<span style={{ fontSize:".7rem", color:"#9ca3af", fontWeight:600 }}>%</span>
            </p>
            <p style={{ margin:".1rem 0 0", fontSize:".6rem", color:"#6b7280" }}>
              {isDone ? "Course Complete" : "Keep going!"}
            </p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding:".65rem 1rem .9rem" }}>
        <Link to={isDone ? "/certificate" : "/dashboard"} style={{ textDecoration:"none" }}>
          <button
            style={{
              width:"100%", padding:".55rem 1rem",
              background: isDone
                ? "linear-gradient(135deg,#16a34a,#22c55e)"
                : "linear-gradient(135deg,#15256E,#1e3a8a)",
              color:"#fff", border:"none", borderRadius:10,
              fontWeight:700, fontSize:".78rem", cursor:"pointer",
              fontFamily:"'DM Sans',sans-serif",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              boxShadow: isDone ? "0 3px 10px rgba(22,163,74,0.25)" : "0 3px 10px rgba(21,37,110,0.25)",
              transition:"opacity .2s, transform .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity=".88"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="none"; }}
          >
            {isDone ? (
              <><span style={{ fontSize:"1em" }}>🏆</span> Print Certificate</>
            ) : (
              <><span style={{ fontSize:"1em" }}>📖</span> Continue Learning</>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
};

/* ═══════════════════════════════
   ADMIN COURSE COMPONENT
═══════════════════════════════ */
const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/v1/enrollment/details");
        const enrollment = res.data.data;

        if (!enrollment || !enrollment.course) {
          setCourses([]);
          setLoading(false);
          return;
        }

        const coursesArray = Array.isArray(enrollment) ? enrollment : [enrollment];
        const coursesWithProgress = coursesArray.map((enroll) => ({
          id: enroll.course.id,
          title: enroll.course.title,
          image: enroll.course.image?.url || "https://via.placeholder.com/400x200",
          // ── Round to whole number ──
          progress: Math.round(Number(enroll.progress) || 0),
        }));

        setCourses(coursesWithProgress);
      } catch (error) {
        const message = error?.response?.data?.message || "Failed to load courses";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <Spinner />;

  if (error) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"40vh" }}>
      <div style={{
        padding:"1.25rem 2rem", background:"#fff",
        borderRadius:14, border:"1px solid #fee2e2",
        boxShadow:"0 2px 12px rgba(0,0,0,.06)",
        textAlign:"center", maxWidth:340,
      }}>
        <p style={{ margin:0, fontSize:".85rem", color:"#ef4444", fontWeight:600 }}>⚠ {error}</p>
      </div>
    </div>
  );

  if (!courses.length) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"40vh" }}>
      <div style={{
        padding:"1.5rem 2rem", background:"#fff",
        borderRadius:14, border:"1px solid #f0f0f0",
        boxShadow:"0 2px 12px rgba(0,0,0,.06)",
        textAlign:"center", maxWidth:340,
      }}>
        <p style={{ margin:0, fontSize:"2rem" }}>📚</p>
        <p style={{ margin:".5rem 0 0", fontSize:".85rem", color:"#6b7280", fontWeight:600 }}>No courses found.</p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      <div style={{ padding:"clamp(.75rem,2.5vw,1.5rem)", background:"#f7f8fa", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>

        {/* header */}
        <div style={{ marginBottom:"1.25rem" }}>
          <p style={{ margin:0, fontSize:".62rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#9ca3af" }}>
            My Learning
          </p>
          <h1 style={{ margin:".2rem 0 0", fontSize:"1.2rem", fontWeight:800, color:"#111827", fontFamily:"'Sora',sans-serif" }}>
            Enrolled Courses
          </h1>
        </div>

        {/* grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",
          gap:"1rem",
        }}>
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminCourse;