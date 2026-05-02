



 import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  FiCreditCard, FiCalendar, FiBookOpen,
  FiCheckCircle, FiClock, FiXCircle,
  FiDownload, FiTrendingUp, FiDollarSign,
} from "react-icons/fi";

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
   Status config
═══════════════════════════════ */
const STATUS = {
  approved: {
    bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0",
    icon:<FiCheckCircle size={12}/>, label:"Approved",
  },
  pending: {
    bg:"#fffbeb", color:"#d97706", border:"#fde68a",
    icon:<FiClock size={12}/>, label:"Pending",
  },
  declined: {
    bg:"#fef2f2", color:"#dc2626", border:"#fecaca",
    icon:<FiXCircle size={12}/>, label:"Declined",
  },
};

const getStatus = (s = "") => STATUS[s.toLowerCase()] || STATUS.pending;

/* ═══════════════════════════════
   Stat Card
═══════════════════════════════ */
const StatCard = ({ icon, label, value, sub, color, index }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), index * 100); return () => clearTimeout(t); }, [index]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      background:"#fff", borderRadius:14,
      boxShadow:"0 2px 10px rgba(0,0,0,.06)",
      border:"1px solid #f0f0f0",
      padding:"1rem 1.1rem",
      display:"flex", alignItems:"center", gap:"1rem",
    }}>
      <div style={{
        width:44, height:44, borderRadius:12, flexShrink:0,
        background:`${color}18`,
        display:"flex", alignItems:"center", justifyContent:"center",
        border:`1px solid ${color}30`,
      }}>
        {React.cloneElement(icon, { size:18, color })}
      </div>
      <div>
        <p style={{ margin:0, fontSize:".6rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:".06em" }}>{label}</p>
        <p style={{ margin:".15rem 0 0", fontSize:"1.15rem", fontWeight:800, color:"#111827", fontFamily:"'Sora',sans-serif", lineHeight:1 }}>{value}</p>
        {sub && <p style={{ margin:".2rem 0 0", fontSize:".62rem", color:"#9ca3af" }}>{sub}</p>}
      </div>
    </div>
  );
};

/* ═══════════════════════════════
   Table Row
═══════════════════════════════ */
const PaymentRow = ({ payment, index }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 300 + index * 80); return () => clearTimeout(t); }, [index]);

  const st = getStatus(payment.status);
  const date = new Date(payment.created_at);
  const formattedDate = date.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
  const formattedTime = date.toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" });

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-12px)",
        transition: "opacity 0.45s ease, transform 0.45s ease, background 0.15s",
        background: hovered ? "#f7f8ff" : "#fff",
        cursor:"default",
      }}
    >
      {/* date */}
      <td style={{ padding:".85rem 1rem", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
          <div style={{
            width:32, height:32, borderRadius:8, background:"#f0f2fa",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
          }}>
            <FiCalendar size={13} color="#15256E" />
          </div>
          <div>
            <p style={{ margin:0, fontSize:".75rem", fontWeight:600, color:"#111827" }}>{formattedDate}</p>
            <p style={{ margin:0, fontSize:".62rem", color:"#9ca3af" }}>{formattedTime}</p>
          </div>
        </div>
      </td>

      {/* course */}
      <td style={{ padding:".85rem 1rem", borderBottom:"1px solid #f3f4f6", maxWidth:220 }}>
        <div style={{ display:"flex", alignItems:"center", gap:".5rem" }}>
          <div style={{
            width:32, height:32, borderRadius:8, background:"#f0f2fa",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
          }}>
            <FiBookOpen size={13} color="#15256E" />
          </div>
          <p style={{
            margin:0, fontSize:".75rem", fontWeight:600, color:"#111827",
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
          }}>
            {payment.enrollment?.course_title || "N/A"}
          </p>
        </div>
      </td>

      {/* amount */}
      <td style={{ padding:".85rem 1rem", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:".4rem" }}>
          <span style={{ fontSize:".65rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase" }}>
            {payment.currency}
          </span>
          <span style={{ fontSize:".88rem", fontWeight:800, color:"#111827", fontFamily:"'Sora',sans-serif" }}>
            {Number(payment.amount_due).toLocaleString()}
          </span>
        </div>
      </td>

      {/* status */}
      <td style={{ padding:".85rem 1rem", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:5,
          fontSize:".68rem", fontWeight:700,
          padding:"4px 10px", borderRadius:99,
          background:st.bg, color:st.color,
          border:`1px solid ${st.border}`,
        }}>
          {st.icon} {st.label}
        </span>
      </td>

      {/* receipt */}
      <td style={{ padding:".85rem 1rem", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>
        <button
          title="Download receipt"
          style={{
            width:30, height:30, borderRadius:8,
            border:"1px solid #e5e7eb", background: hovered ? "#f0f2fa" : "#fff",
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", transition:"background .2s, border-color .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="#e0e5f7"; e.currentTarget.style.borderColor="#c7d2fe"; }}
          onMouseLeave={e => { e.currentTarget.style.background=hovered?"#f0f2fa":"#fff"; e.currentTarget.style.borderColor="#e5e7eb"; }}
        >
          <FiDownload size={13} color="#15256E" />
        </button>
      </td>
    </tr>
  );
};

/* ═══════════════════════════════
   PAYMENT PAGE
═══════════════════════════════ */
const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("v1/payment/records");
        setPayments(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payment records.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <Spinner />;

  if (error) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"50vh" }}>
      <div style={{ padding:"1.5rem 2rem", background:"#fff", borderRadius:14, border:"1px solid #fee2e2", boxShadow:"0 2px 12px rgba(0,0,0,.06)", textAlign:"center" }}>
        <p style={{ margin:0, fontSize:"2rem" }}>⚠️</p>
        <p style={{ margin:".5rem 0 0", fontSize:".85rem", color:"#ef4444", fontWeight:600 }}>{error}</p>
      </div>
    </div>
  );

  /* ── derived stats ── */
  const totalPaid = payments
    .filter(p => p.status?.toLowerCase() === "approved")
    .reduce((sum, p) => sum + Number(p.amount_due || 0), 0);

  const currency = payments[0]?.currency || "";
  const approved = payments.filter(p => p.status?.toLowerCase() === "approved").length;
  const pending  = payments.filter(p => p.status?.toLowerCase() === "pending").length;

  const filtered = filter === "all" ? payments : payments.filter(p => p.status?.toLowerCase() === filter);

  const tabs = ["all","approved","pending","declined"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fade-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .pay-root { font-family:'DM Sans',sans-serif; }
        .pay-root h1,.pay-root h2 { font-family:'Sora',sans-serif; }
        .tab-btn { border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:700; font-size:.72rem; padding:.35rem .85rem; border-radius:99px; transition:background .2s,color .2s; }
        .tab-btn.active { background:#15256E; color:#fff; box-shadow:0 2px 8px rgba(21,37,110,.22); }
        .tab-btn.inactive { background:#f3f4f6; color:#6b7280; }
        .tab-btn.inactive:hover { background:#e5e7eb; color:#374151; }
        thead th { font-family:'DM Sans',sans-serif !important; }
      `}</style>

      <div className="pay-root" style={{ padding:"clamp(.75rem,2.5vw,1.5rem)", background:"#f7f8fa", minHeight:"100vh" }}>

        {/* ── Page header ── */}
        <div style={{ animation:"fade-up 0.4s ease both", marginBottom:"1.25rem" }}>
          <p style={{ margin:0, fontSize:".62rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#9ca3af" }}>
            Billing
          </p>
          <h1 style={{ margin:".2rem 0 .2rem", fontSize:"1.2rem", fontWeight:800, color:"#111827" }}>
            Payments & Invoices
          </h1>
          <p style={{ margin:0, fontSize:".75rem", color:"#6b7280" }}>
            View and manage your transactions
          </p>
        </div>

        {/* ── Stat cards ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(190px, 1fr))",
          gap:".85rem",
          marginBottom:"1.25rem",
        }}>
          <StatCard index={0} icon={<FiDollarSign/>}   color="#15256E" label="Total Paid"        value={`${currency} ${totalPaid.toLocaleString()}`} sub="All approved payments" />
          <StatCard index={1} icon={<FiCreditCard/>}    color="#6366f1" label="Transactions"      value={payments.length}    sub={`${approved} approved`} />
          <StatCard index={2} icon={<FiCheckCircle/>}   color="#16a34a" label="Approved"          value={approved}           sub="Successful payments" />
          <StatCard index={3} icon={<FiClock/>}         color="#d97706" label="Pending"           value={pending}            sub="Awaiting confirmation" />
        </div>

        {/* ── Table card ── */}
        <div style={{
          animation:"fade-up 0.45s 0.15s ease both",
          background:"#fff", borderRadius:16,
          boxShadow:"0 2px 12px rgba(0,0,0,.07)",
          border:"1px solid #f0f0f0",
          overflow:"hidden",
        }}>

          {/* card header + tabs */}
          <div style={{
            padding:".9rem 1.1rem",
            borderBottom:"1px solid #f3f4f6",
            display:"flex", alignItems:"center",
            justifyContent:"space-between", flexWrap:"wrap", gap:".65rem",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:".55rem" }}>
              <div style={{ width:32, height:32, borderRadius:9, background:"#f0f2fa", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <FiCreditCard size={15} color="#15256E" />
              </div>
              <div>
                <p style={{ margin:0, fontSize:".82rem", fontWeight:700, color:"#111827", fontFamily:"'Sora',sans-serif" }}>Transaction History</p>
                <p style={{ margin:0, fontSize:".62rem", color:"#9ca3af" }}>{filtered.length} record{filtered.length !== 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* filter tabs */}
            <div style={{ display:"flex", gap:".4rem", flexWrap:"wrap" }}>
              {tabs.map(t => (
                <button
                  key={t}
                  className={`tab-btn ${filter === t ? "active" : "inactive"}`}
                  onClick={() => setFilter(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* empty state */}
          {!filtered.length && (
            <div style={{ padding:"3rem 1rem", textAlign:"center" }}>
              <p style={{ margin:0, fontSize:"2rem" }}>💳</p>
              <p style={{ margin:".5rem 0 0", fontSize:".82rem", color:"#6b7280", fontWeight:600 }}>No {filter !== "all" ? filter : ""} transactions found.</p>
            </div>
          )}

          {/* table */}
          {filtered.length > 0 && (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:580 }}>
                <thead>
                  <tr style={{ background:"#f7f8ff" }}>
                    {["Date", "Course", "Amount", "Status", "Receipt"].map(h => (
                      <th key={h} style={{
                        padding:".65rem 1rem",
                        textAlign:"left",
                        fontSize:".62rem", fontWeight:700,
                        color:"#9ca3af", textTransform:"uppercase",
                        letterSpacing:".06em",
                        borderBottom:"1px solid #f3f4f6",
                        whiteSpace:"nowrap",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((payment, i) => (
                    <PaymentRow key={i} payment={payment} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* footer summary */}
          {filtered.length > 0 && (
            <div style={{
              padding:".75rem 1.1rem",
              borderTop:"1px solid #f3f4f6",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:".5rem",
            }}>
              <p style={{ margin:0, fontSize:".68rem", color:"#9ca3af" }}>
                Showing <span style={{ fontWeight:700, color:"#374151" }}>{filtered.length}</span> of <span style={{ fontWeight:700, color:"#374151" }}>{payments.length}</span> transactions
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:".4rem" }}>
                <FiTrendingUp size={12} color="#16a34a" />
                <p style={{ margin:0, fontSize:".68rem", color:"#16a34a", fontWeight:600 }}>
                  Total: {currency} {filtered.reduce((s,p)=>s+Number(p.amount_due||0),0).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default PaymentPage;