

import React, { useEffect, useRef, useState } from "react";
import {
  FiMail, FiPhone, FiMapPin,
  FiArrowUpRight, FiArrowUp,
} from "react-icons/fi";
import { FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import techprologo from "../assets/images/techprologo.png";
import { Link } from "react-router-dom";

/* ── Intersection observer reveal ── */
const useReveal = (threshold = 0.08) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

/* ── Animated footer link ── */
const FooterLink = ({ href, to, children, delay = 0, visible }) => {
  const [hov, setHov] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: "13px", color: hov ? "#c7d2fe" : "#94a3b8",
    textDecoration: "none", fontWeight: 500, lineHeight: 1.6,
    position: "relative",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-8px)",
    transition: `opacity 0.42s ${delay}ms ease, transform 0.42s ${delay}ms ease, color 0.18s`,
  };
  const line = {
    position: "absolute", bottom: -1, left: 0, height: 1,
    borderRadius: 99, background: "linear-gradient(90deg,#6366f1,#818cf8)",
    width: hov ? "100%" : "0%", transition: "width 0.22s ease",
  };
  const inner = (
    <>
      <FiArrowUpRight size={11} style={{ opacity: hov ? 1 : 0.35, transition: "opacity .18s, transform .18s", transform: hov ? "translate(1px,-1px)" : "none" }} />
      {children}
      <span style={line} />
    </>
  );
  const props = { style: base, onMouseEnter: () => setHov(true), onMouseLeave: () => setHov(false) };
  if (to) return <Link to={to} {...props}>{inner}</Link>;
  return <a href={href || "#"} {...props}>{inner}</a>;
};

/* ── Column heading ── */
const ColHead = ({ children, visible, delay = 0 }) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(-6px)",
    transition: `opacity 0.38s ${delay}ms ease, transform 0.38s ${delay}ms ease`,
    marginBottom: "1rem",
  }}>
    <h4 style={{ margin: 0, fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64748b" }}>
      {children}
    </h4>
    <div style={{ marginTop: "6px", height: 2, width: 24, borderRadius: 99, background: "linear-gradient(90deg,#6366f1,#818cf8)" }} />
  </div>
);

/* ── Social icon button ── */
const SocialBtn = ({ icon, href, label, delay, visible }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? "rgba(99,102,241,.2)" : "rgba(255,255,255,.06)",
        border: `1px solid ${hov ? "rgba(99,102,241,.45)" : "rgba(255,255,255,.1)"}`,
        color: hov ? "#a5b4fc" : "#64748b",
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(.88)",
        transition: `opacity 0.4s ${delay}ms ease, transform 0.4s ${delay}ms ease, background .18s, border-color .18s, color .18s`,
      }}
    >
      {React.cloneElement(icon, { size: 14 })}
    </a>
  );
};

/* ── Contact row ── */
const ContactRow = ({ icon, children, delay, visible }) => (
  <li style={{
    display: "flex", gap: "0.6rem", alignItems: "flex-start",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-10px)",
    transition: `opacity 0.42s ${delay}ms ease, transform 0.42s ${delay}ms ease`,
  }}>
    <div style={{
      width: 26, height: 26, borderRadius: 7, flexShrink: 0, marginTop: 2,
      background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.18)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {React.cloneElement(icon, { size: 12, color: "#818cf8" })}
    </div>
    <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.65 }}>{children}</div>
  </li>
);

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
const Footer = () => {
  const { ref, visible } = useReveal(0.06);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        .ft-root { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* Shimmer accent */
        @keyframes ft-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .ft-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #001489, #6366f1, #a5b4fc, #001489);
          background-size: 300% 100%;
          animation: ft-shimmer 6s linear infinite;
        }
        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,.25), rgba(148,163,184,.12), transparent);
        }

        /* Back to top */
        @keyframes ft-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,.3); }
          50%      { box-shadow: 0 0 0 7px rgba(99,102,241,.0); }
        }
        .ft-back-top {
          position: fixed; bottom: 24px; right: 24px; z-index: 999;
          width: 40px; height: 40px; border-radius: 11px;
          background: linear-gradient(135deg, #001489, #4f46e5);
          border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,20,137,.35);
          animation: ft-pulse 2.5s infinite;
          transition: opacity .28s, transform .28s;
        }
        .ft-back-top:hover { transform: translateY(-2px); }

        /* Main grid — 4 equal columns on desktop */
        .ft-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.5fr;
          gap: 2.5rem 2rem;
        }

        /* Tablet: 2 columns */
        @media (max-width: 900px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem 1.75rem;
          }
        }

        /* Mobile: single column */
        @media (max-width: 560px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .ft-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
          }
          .ft-bottom-links {
            flex-wrap: wrap;
            gap: 0.75rem !important;
          }
        }
      `}</style>

      {/* Back to top */}
      <button
        className="ft-back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "all" : "none" }}
        aria-label="Back to top"
      >
        <FiArrowUp size={16} />
      </button>

      <footer ref={ref} className="ft-root" style={{
        background: "linear-gradient(180deg, #0d1640 0%, #090e25 60%, #060a1a 100%)",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>

        {/* Decorative glows */}
        <div style={{ position:"absolute", top:-120, left:-100, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.09) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, right:-100, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(21,37,110,.14) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:220, height:220, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.05) 0%,transparent 70%)", pointerEvents:"none" }} />

        {/* Accent bar */}
        <div className="ft-accent-bar" />

        {/* ── Main content ── */}
        <div style={{ padding: "2.75rem clamp(1.25rem, 5vw, 3rem) 2.25rem", maxWidth: 1200, margin: "0 auto" }}>
          <div className="ft-grid">

            {/* ── BRAND COLUMN ── */}
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.52s ease, transform 0.52s ease",
              display: "flex", flexDirection: "column", gap: "0",
            }}>
              {/* Logo */}
              <img
                src={techprologo}
                alt="TechPro Logo"
                style={{ width: 140, display: "block", filter: "brightness(1.05) drop-shadow(0 0 8px rgba(99,102,241,.18))", marginBottom: "6px" }}
              />

              {/* Description — sits right under logo with no gap */}
              <p style={{
                margin: "0 0 10px 0",
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.7,
                maxWidth: 235,
              }}>
                TechPro Institute empowers learners with practical, industry-ready
                tech skills and globally recognised certifications.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                <SocialBtn visible={visible} delay={80}  label="LinkedIn"  href="#" icon={<FaLinkedinIn />} />
                <SocialBtn visible={visible} delay={140} label="Twitter"   href="#" icon={<FaTwitter />} />
                <SocialBtn visible={visible} delay={200} label="YouTube"   href="#" icon={<FaYoutube />} />
                <SocialBtn visible={visible} delay={260} label="Instagram" href="#" icon={<FaInstagram />} />
              </div>
            </div>

            {/* ── USEFUL LINKS ── */}
            <div>
              <ColHead visible={visible} delay={60}>Useful Links</ColHead>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                {[
                  { label: "Home",    href: "#hero" },
                  { label: "About",   href: "#about" },
                  { label: "FAQ",     href: "#faq" },
                  { label: "Contact", to: "/contact" },
                ].map((item, i) => (
                  <li key={item.label}>
                    <FooterLink href={item.href} to={item.to} visible={visible} delay={100 + i * 50}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── LEGAL ── */}
            <div>
              <ColHead visible={visible} delay={120}>Legal</ColHead>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                {[
                  { label: "Terms of Service", to: "/term" },
                  { label: "Privacy Policy",   to: "/privacy" },
                  { label: "Legal Terms",      to: "/legal" },
                ].map((item, i) => (
                  <li key={item.label}>
                    <FooterLink to={item.to} visible={visible} delay={160 + i * 50}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── CONTACT ── */}
            <div>
              <ColHead visible={visible} delay={180}>Contact Us</ColHead>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"0.85rem" }}>

                {/* Email */}
                <ContactRow icon={<FiMail />} delay={220} visible={visible}>
                  <a
                    href="mailto:support@lms.techproinstitute.org"
                    style={{ color:"#94a3b8", textDecoration:"none", transition:"color .18s", wordBreak:"break-all" }}
                    onMouseEnter={e => e.currentTarget.style.color="#c7d2fe"}
                    onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}
                  >
                    support@lms.techproinstitute.org
                  </a>
                </ContactRow>

                {/* Phone */}
                <ContactRow icon={<FiPhone />} delay={280} visible={visible}>
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.35rem" }}>
                    {[
                      { flag:"🇬🇧", label:"UK",        href:"tel:+447534617780",  num:"+44 7534 617 780" },
                      { flag:"🇦🇺", label:"Australia", href:"tel:+61390883396",   num:"03 9088 3396" },
                      { flag:"🇳🇬", label:"Nigeria",   href:"tel:+2348086478810", num:"+234 808 647 8810" },
                    ].map(p => (
                      <div key={p.label} style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                        <span style={{ fontSize:"13px" }}>{p.flag}</span>
                        <span style={{ fontSize:"11px", color:"#475569", minWidth:56 }}>{p.label}:</span>
                        <a href={p.href}
                          style={{ fontSize:"12.5px", color:"#94a3b8", textDecoration:"none", transition:"color .18s" }}
                          onMouseEnter={e => e.currentTarget.style.color="#c7d2fe"}
                          onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}
                        >{p.num}</a>
                      </div>
                    ))}
                  </div>
                </ContactRow>

                {/* Location */}
                <ContactRow icon={<FiMapPin />} delay={340} visible={visible}>
                  <span style={{ color:"#64748b", fontSize:"12.5px" }}>
                    Australia &bull; United Kingdom &bull; Nigeria
                  </span>
                </ContactRow>

              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="ft-divider" />

        {/* ── Bottom bar ── */}
        <div
          className="ft-bottom-bar"
          style={{
            padding: "0.9rem clamp(1.25rem, 5vw, 3rem)",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: "0.6rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s 0.35s ease",
          }}
        >
          <p style={{ margin: 0, fontSize: "12px", color: "#334155" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color:"#818cf8", fontWeight:700 }}>TechPro Institute</span>.
            {" "}All rights reserved.
          </p>

          <div className="ft-bottom-links" style={{ display:"flex", alignItems:"center", gap:"1.2rem" }}>
            {/* Live status dot */}
            <span style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"11px", color:"#334155" }}>
              <span style={{
                width:6, height:6, borderRadius:"50%", background:"#22c55e",
                boxShadow:"0 0 0 2px rgba(34,197,94,.25)", display:"inline-block",
                animation:"ft-pulse 2s infinite",
              }} />
              All systems operational
            </span>

            {[{ label:"Terms", to:"/term" }, { label:"Privacy", to:"/privacy" }].map(item => (
              <Link key={item.label} to={item.to}
                style={{ fontSize:"12px", color:"#334155", textDecoration:"none", transition:"color .18s" }}
                onMouseEnter={e => e.currentTarget.style.color="#818cf8"}
                onMouseLeave={e => e.currentTarget.style.color="#334155"}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;



