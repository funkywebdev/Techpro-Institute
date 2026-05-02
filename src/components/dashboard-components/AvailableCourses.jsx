





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { FiSearch, FiBookOpen, FiUsers } from "react-icons/fi";
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
   Course Card
═══════════════════════════════ */
const CourseCard = ({ course, isEnrolled, onEnroll, index }) => {
  const [visible, setVisible] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(t);
  }, [index]);

  const price = course.price
    ? `${course.price.currency} ${Number(course.price.amount).toLocaleString()}`
    : "Free";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease",
        display:"flex", flexDirection:"column",
        background:"#fff",
        borderRadius:16,
        boxShadow: hovered
          ? "0 16px 40px rgba(21,37,110,0.14)"
          : "0 2px 12px rgba(0,0,0,.07)",
        border:`1px solid ${hovered ? "#c7d2fe" : "#f0f0f0"}`,
        overflow:"hidden",
        fontFamily:"'DM Sans',sans-serif",
        cursor:"default",
      }}
    >
      {/* ── Image ── */}
      <div style={{ position:"relative", height:150, overflow:"hidden", background:"#e8eaf6", flexShrink:0 }}>
        <img
          src={course.image?.url || "https://via.placeholder.com/400x200"}
          alt={course.title}
          style={{
            width:"100%", height:"100%", objectFit:"cover", display:"block",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition:"transform 0.45s ease",
          }}
        />
        {/* overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(to top, rgba(21,37,110,0.5) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0.6,
          transition:"opacity 0.3s",
        }} />

        {/* enrolled badge */}
        {isEnrolled && (
          <span style={{
            position:"absolute", top:10, right:10,
            fontSize:".58rem", fontWeight:700,
            padding:"3px 9px", borderRadius:99,
            background:"rgba(22,163,74,0.92)",
            color:"#fff", backdropFilter:"blur(4px)",
            border:"1px solid #4ade80",
            letterSpacing:".04em",
          }}>
            ✓ Enrolled
          </span>
        )}

        {/* price chip bottom-left */}
        <span style={{
          position:"absolute", bottom:10, left:10,
          fontSize:".65rem", fontWeight:800,
          padding:"3px 10px", borderRadius:99,
          background:"rgba(255,255,255,0.92)",
          color:"#15256E",
          backdropFilter:"blur(4px)",
          boxShadow:"0 1px 6px rgba(0,0,0,.12)",
          fontFamily:"'Sora',sans-serif",
        }}>
          {price}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ flex:1, padding:"1rem", display:"flex", flexDirection:"column", gap:".5rem" }}>

        <h2 style={{ margin:0, fontSize:".85rem", fontWeight:700, color:"#111827", lineHeight:1.35, fontFamily:"'Sora',sans-serif" }}>
          {course.title}
        </h2>

        <p style={{
          margin:0, fontSize:".72rem", color:"#6b7280", lineHeight:1.5,
          display:"-webkit-box", WebkitLineClamp:2,
          WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>
          {course.description || "No description available."}
        </p>

        {/* meta chips */}
        <div style={{ display:"flex", gap:".45rem", flexWrap:"wrap", marginTop:".1rem" }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:4,
            fontSize:".62rem", fontWeight:600, color:"#15256E",
            background:"#f0f2fa", padding:"3px 8px", borderRadius:99,
            border:"1px solid #e0e5f7",
          }}>
            <IoMdCheckmark size={11} />
            {course.modules_count || 0} Modules
          </span>

          {course.duration && (
            <span style={{
              display:"inline-flex", alignItems:"center", gap:4,
              fontSize:".62rem", fontWeight:600, color:"#6b7280",
              background:"#f7f8fa", padding:"3px 8px", borderRadius:99,
              border:"1px solid #f0f0f0",
            }}>
              <FiBookOpen size={10} />
              {course.duration}
            </span>
          )}
        </div>

        {/* divider */}
        <div style={{ height:1, background:"#f3f4f6", margin:".1rem 0" }} />

        {/* CTA */}
        <div style={{ marginTop:"auto" }}>
          {isEnrolled ? (
            <button disabled style={{
              width:"100%", padding:".5rem 1rem",
              background:"#f3f4f6", color:"#9ca3af",
              border:"none", borderRadius:10,
              fontWeight:700, fontSize:".75rem",
              cursor:"not-allowed", fontFamily:"'DM Sans',sans-serif",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            }}>
              ✓ Already Enrolled
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course.id)}
              style={{
                width:"100%", padding:".5rem 1rem",
                background:"linear-gradient(135deg,#15256E,#1e3a8a)",
                color:"#fff", border:"none", borderRadius:10,
                fontWeight:700, fontSize:".75rem",
                cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                boxShadow:"0 3px 10px rgba(21,37,110,0.22)",
                transition:"opacity .2s, transform .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity=".88"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="none"; }}
            >
              Enroll Now →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════
   AVAILABLE COURSES COMPONENT
═══════════════════════════════ */
const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseId, setEnrolledCourseId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, enrollRes] = await Promise.all([
          api.get("/v1/courses"),
          api.get("/v1/enrollment/details"),
        ]);
        setCourses(coursesRes.data?.data || []);
        const enrollment = enrollRes.data?.data;
        if (enrollment?.course_id) setEnrolledCourseId(Number(enrollment.course_id));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  const filtered = courses.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .search-input:focus { outline:none; border-color:#15256E !important; box-shadow:0 0 0 3px rgba(21,37,110,0.1); }
        @keyframes fade-down {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hdr-anim { animation: fade-down 0.45s ease both; }
      `}</style>

      <div style={{ padding:"clamp(.75rem,2.5vw,1.5rem)", background:"#f7f8fa", minHeight:"100vh", fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── Header ── */}
        <div className="hdr-anim" style={{ marginBottom:"1.5rem" }}>
          <p style={{ margin:0, fontSize:".62rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#9ca3af" }}>
            Course Catalog
          </p>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:".75rem", marginTop:".2rem" }}>
            <div>
              <h1 style={{ margin:0, fontSize:"1.2rem", fontWeight:800, color:"#111827", fontFamily:"'Sora',sans-serif" }}>
                Explore Courses
              </h1>
              <p style={{ margin:".2rem 0 0", fontSize:".75rem", color:"#6b7280" }}>
                {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
              </p>
            </div>

            {/* search */}
            <div style={{ position:"relative", minWidth:200 }}>
              <FiSearch size={13} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#9ca3af" }} />
              <input
                className="search-input"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search courses…"
                style={{
                  paddingLeft:30, paddingRight:12, paddingTop:".45rem", paddingBottom:".45rem",
                  fontSize:".75rem", fontFamily:"'DM Sans',sans-serif",
                  background:"#fff", border:"1px solid #e5e7eb",
                  borderRadius:10, color:"#111827",
                  width:"100%", transition:"border-color .2s, box-shadow .2s",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── Empty state ── */}
        {!filtered.length && (
          <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
            <p style={{ fontSize:"2.5rem", margin:0 }}>🔍</p>
            <p style={{ margin:".5rem 0 0", fontSize:".85rem", color:"#6b7280", fontWeight:600 }}>
              No courses match "{search}"
            </p>
          </div>
        )}

        {/* ── Grid ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(270px, 1fr))",
          gap:"1rem",
        }}>
          {filtered.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              index={i}
              isEnrolled={Number(course.id) === Number(enrolledCourseId)}
              onEnroll={(id) => navigate(`/enrollment/${id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableCourses;