import React, { useEffect, useRef, useState } from "react";
import {
  FiMail, FiPhone, FiMapPin,
  FiArrowUpRight, FiArrowUp, FiSend,
} from "react-icons/fi";
import { FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import techprologo from "../assets/images/techprologo.png";
import { Link } from "react-router-dom";

/* ── Intersection observer reveal ── */
const useReveal = (threshold = 0.1) => {
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

/* ── Hover-underline link ── */
const FooterLink = ({ href, to, children, delay = 0, visible }) => {
  const [hov, setHov] = useState(false);
  const style = {
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: ".82rem", color: hov ? "#c7d2fe" : "#94a3b8",
    textDecoration: "none", fontWeight: 500, lineHeight: 1.6,
    position: "relative",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-10px)",
    transition: `opacity 0.45s ${delay}ms ease, transform 0.45s ${delay}ms ease, color 0.2s`,
  };
  const underline = {
    position: "absolute", bottom: -1, left: 0,
    height: 1, borderRadius: 99,
    background: "linear-gradient(90deg,#6366f1,#818cf8)",
    width: hov ? "100%" : "0%",
    transition: "width 0.25s ease",
  };
  const props = {
    style,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
  };
  const inner = (
    <>
      <FiArrowUpRight size={11} style={{ opacity: hov ? 1 : 0.4, transition: "opacity .2s, transform .2s", transform: hov ? "translate(1px,-1px)" : "none" }} />
      {children}
      <span style={underline} />
    </>
  );
  if (to) return <Link to={to} {...props}>{inner}</Link>;
  return <a href={href} {...props}>{inner}</a>;
};

/* ── Section heading with animated underline ── */
const SectionHead = ({ children, visible, delay = 0 }) => (
  <div style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(-8px)",
    transition: `opacity 0.4s ${delay}ms ease, transform 0.4s ${delay}ms ease`,
    marginBottom: "1.1rem",
  }}>
    <h4 style={{ margin: 0, fontSize: ".65rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#64748b" }}>
      {children}
    </h4>
    <div style={{
      marginTop: ".4rem", height: 2, width: 28, borderRadius: 99,
      background: "linear-gradient(90deg,#6366f1,#818cf8)",
    }} />
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
        background: hov ? "rgba(99,102,241,.22)" : "rgba(255,255,255,.06)",
        border: `1px solid ${hov ? "rgba(99,102,241,.45)" : "rgba(255,255,255,.1)"}`,
        color: hov ? "#a5b4fc" : "#64748b",
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(.88)",
        transition: `opacity 0.4s ${delay}ms ease, transform 0.4s ${delay}ms ease, background .2s, border-color .2s, color .2s`,
      }}
    >
      {React.cloneElement(icon, { size: 14 })}
    </a>
  );
};

/* ── Contact row ── */
const ContactRow = ({ icon, children, delay, visible }) => (
  <li style={{
    display: "flex", gap: ".6rem", alignItems: "flex-start",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-12px)",
    transition: `opacity 0.45s ${delay}ms ease, transform 0.45s ${delay}ms ease`,
  }}>
    <div style={{
      width: 26, height: 26, borderRadius: 7, flexShrink: 0, marginTop: 1,
      background: "rgba(99,102,241,.1)",
      border: "1px solid rgba(99,102,241,.18)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {React.cloneElement(icon, { size: 12, color: "#818cf8" })}
    </div>
    <div style={{ fontSize: ".78rem", color: "#94a3b8", lineHeight: 1.6 }}>{children}</div>
  </li>
);

/* ══════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════ */
const Footer = () => {
  const { ref, visible } = useReveal(0.08);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* back-to-top visibility */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .ft-root { font-family:'DM Sans',sans-serif; }
        .ft-root h1,.ft-root h2,.ft-root h3,.ft-root h4 { font-family:'Sora',sans-serif; }

        @keyframes shimmer-sweep {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes fade-up-ft {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,.3); }
          50%      { box-shadow: 0 0 0 6px rgba(99,102,241,.0); }
        }

        .ft-accent-bar {
          height: 3px;
          background: linear-gradient(90deg,#001489,#6366f1,#a5b4fc,#001489);
          background-size: 300% 100%;
          animation: shimmer-sweep 6s infinite linear;
        }
        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg,transparent,rgba(99,102,241,.3),rgba(148,163,184,.15),transparent);
          background-size: 200% 100%;
          animation: shimmer-sweep 5s infinite linear;
        }
        .ft-subscribe-input {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px 0 0 9px;
          color: #fff;
          font-family: 'DM Sans',sans-serif;
          font-size: .78rem;
          padding: .55rem .85rem;
          outline: none;
          width: 100%;
          transition: border-color .2s, background .2s;
        }
        .ft-subscribe-input::placeholder { color: #475569; }
        .ft-subscribe-input:focus { border-color: rgba(99,102,241,.5); background: rgba(255,255,255,.09); }
        .ft-subscribe-btn {
          background: linear-gradient(135deg,#4f46e5,#6366f1);
          border: none; border-radius: 0 9px 9px 0;
          color: #fff; cursor: pointer;
          padding: .55rem .85rem;
          display: flex; align-items: center; gap: .3rem;
          font-size: .78rem; font-weight: 600;
          font-family: 'DM Sans',sans-serif;
          transition: opacity .2s, transform .15s;
          white-space: nowrap;
        }
        .ft-subscribe-btn:hover { opacity: .88; transform: translateY(-1px); }
        .back-top-btn {
          position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999;
          width: 40px; height: 40px; border-radius: 11px;
          background: linear-gradient(135deg,#001489,#4f46e5);
          border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,20,137,.35);
          animation: pulse-ring 2.5s infinite;
          transition: opacity .3s, transform .3s;
        }
        .back-top-btn:hover { transform: translateY(-2px); }

        @media (max-width: 640px) {
          .ft-newsletter-row { flex-direction: column !important; text-align: center; }
          .ft-newsletter-row > div:first-child { margin-bottom: .75rem; }
        }
      `}</style>

      {/* ── Back to top ── */}
      <button
        className="back-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "all" : "none" }}
        aria-label="Back to top"
      >
        <FiArrowUp size={16} />
      </button>

      <footer ref={ref} className="ft-root" style={{
        background: "linear-gradient(180deg,#0d1640 0%,#090e25 60%,#060a1a 100%)",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>

        {/* ── Decorative glows ── */}
        <div style={{ position:"absolute", top:-100, left:-80, width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.1) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, right:-80, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle,rgba(21,37,110,.15) 0%,transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"40%", left:"50%", width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,.06) 0%,transparent 70%)", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />

        {/* ── Top accent bar ── */}
        <div className="ft-accent-bar" />

        
        

        {/* ══ Main grid ═════════════════════════════════════════════ */}
        <div style={{ padding:"2.75rem clamp(1rem,4vw,3rem) 2.5rem", maxWidth:1200, margin:"0 auto" }}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",
            gap:"2.25rem 2rem",
          }}>

            {/* Brand */}
            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)" ,
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}>
              <img src={techprologo} alt="TechPro Logo" style={{ width:148, marginBottom:".3rem", display: "block", filter:"brightness(1.06) drop-shadow(0 0 8px rgba(99,102,241,.2))" }} />
              <p style={{ fontSize:".78rem", color:"#64748b", lineHeight:1.25, maxWidth:230, margin:"0 0 1.15rem" }}>
                TechPro Institute empowers learners with practical, industry-ready
                tech skills and globally recognized certifications.
              </p>
              <div style={{ display:"flex", gap:".45rem", flexWrap:"wrap" }}>
                <SocialBtn visible={visible} delay={80}  label="LinkedIn"  href="#" icon={<FaLinkedinIn />} />
                <SocialBtn visible={visible} delay={140} label="Twitter"   href="#" icon={<FaTwitter />} />
                <SocialBtn visible={visible} delay={200} label="YouTube"   href="#" icon={<FaYoutube />} />
                <SocialBtn visible={visible} delay={260} label="Instagram" href="#" icon={<FaInstagram />} />
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <SectionHead visible={visible} delay={60}>Useful Links</SectionHead>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:".5rem" }}>
                {[
                  { label:"Home",    href:"#hero" },
                  { label:"About",   href:"#about" },
                  { label:"FAQ",     href:"#faq" },
                  { label:"Contact", to:"/contact" },
                ].map((item, i) => (
                  <li key={item.label}>
                    <FooterLink href={item.href} to={item.to} visible={visible} delay={100 + i * 55}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <SectionHead visible={visible} delay={120}>Legal</SectionHead>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:".5rem" }}>
                {[
                  { label:"Terms of Service", to:"/term" },
                  { label:"Privacy Policy",   to:"/privacy" },
                  { label:"Legal Terms",      to:"/legal" },
                ].map((item, i) => (
                  <li key={item.label}>
                    <FooterLink to={item.to} visible={visible} delay={160 + i * 55}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <SectionHead visible={visible} delay={180}>Contact Us</SectionHead>
              <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:".75rem" }}>
                <ContactRow icon={<FiMail />} delay={220} visible={visible}>
                  <a href="mailto:support@lms.techproinstitute.org"
                    style={{ color:"#94a3b8", textDecoration:"none", transition:"color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#c7d2fe"}
                    onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}
                  >
                    support@lms.techproinstitute.org
                  </a>
                </ContactRow>

                <ContactRow icon={<FiPhone />} delay={280} visible={visible}>
                  <div style={{ display:"flex", flexDirection:"column", gap:".3rem" }}>
                    {[
                      { flag:"🇬🇧", label:"UK",        href:"tel:+447534617780",  num:"+44 7534 617 780" },
                      { flag:"🇦🇺", label:"Australia", href:"tel:+61390883396",   num:"03 9088 3396" },
                      { flag:"🇳🇬", label:"Nigeria",   href:"tel:+2348086478810", num:"+234 808 647 8810" },
                    ].map(p => (
                      <div key={p.label} style={{ display:"flex", alignItems:"center", gap:".4rem" }}>
                        <span style={{ fontSize:".75rem" }}>{p.flag}</span>
                        <span style={{ fontSize:".68rem", color:"#334155", minWidth:58 }}>{p.label}:</span>
                        <a href={p.href}
                          style={{ fontSize:".76rem", color:"#94a3b8", textDecoration:"none", transition:"color .2s" }}
                          onMouseEnter={e => e.currentTarget.style.color="#c7d2fe"}
                          onMouseLeave={e => e.currentTarget.style.color="#94a3b8"}
                        >{p.num}</a>
                      </div>
                    ))}
                  </div>
                </ContactRow>

                <ContactRow icon={<FiMapPin />} delay={340} visible={visible}>
                  <span style={{ color:"#64748b" }}>Australia &bull; United Kingdom &bull; Nigeria</span>
                </ContactRow>
              </ul>
            </div>

          </div>
        </div>

        {/* ══ Divider ═══════════════════════════════════════════════ */}
        <div className="ft-divider" />

        {/* ══ Bottom bar ════════════════════════════════════════════ */}
        <div style={{
          padding:".95rem clamp(1rem,4vw,3rem)",
          display:"flex", alignItems:"center",
          justifyContent:"space-between", flexWrap:"wrap", gap:".5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s 0.35s ease",
        }}>
          <p style={{ margin:0, fontSize:".72rem", color:"#334155" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color:"#818cf8", fontWeight:600 }}>TechPro Institute</span>.
            {" "}All rights reserved.
          </p>
          <div style={{ display:"flex", gap:"1.1rem", alignItems:"center" }}>
            {/* live dot */}
            <span style={{ display:"flex", alignItems:"center", gap:".3rem", fontSize:".68rem", color:"#334155" }}>
              <span style={{
                width:6, height:6, borderRadius:"50%",
                background:"#22c55e",
                boxShadow:"0 0 0 2px rgba(34,197,94,.25)",
                display:"inline-block",
                animation:"pulse-ring 2s infinite",
              }} />
              All systems operational
            </span>
            {[{ label:"Terms", to:"/term" }, { label:"Privacy", to:"/privacy" }].map(item => (
              <Link key={item.label} to={item.to}
                style={{ fontSize:".72rem", color:"#334155", textDecoration:"none", transition:"color .2s" }}
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



