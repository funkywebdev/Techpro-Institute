





import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdPhone, MdLocationOn, MdSend } from "react-icons/md";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

/* ─── Framer variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ─── Floating-label input ─── */
const FloatingInput = ({ label, name, type = "text", value, onChange, required, textarea }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const shared = {
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "peer w-full bg-transparent pt-6 pb-2 px-3 text-sm text-gray-900 " +
      "border border-gray-200 rounded-xl outline-none transition-all duration-200 " +
      "focus:border-[#001489] focus:ring-2 focus:ring-[#001489]/10 placeholder-transparent resize-none",
    placeholder: label,
    required,
  };

  return (
    <div className="relative">
      {textarea ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}
      <label
        className={
          "absolute left-3 pointer-events-none font-medium transition-all duration-200 " +
          (active
            ? "top-1.5 text-[10px] text-[#001489] tracking-wide"
            : textarea
            ? "top-4 text-[13px] text-gray-400"
            : "top-1/2 -translate-y-1/2 text-[13px] text-gray-400")
        }
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
    </div>
  );
};

/* ════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════ */
const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { firstName, lastName, email, subject, message, phone } = formData;
    if (!firstName || !lastName || !email || !subject || !message) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (phone && !/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    emailjs
      .send("service_tsbfjqp", "template_8n6g0rc", formData, "W8LUTAQCleCNI4f1q")
      .then(() => {
        toast.success("Message sent! We'll be in touch soon 🎉");
        setSent(true);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      })
      .catch(() => toast.error("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  };

  const contactItems = [
    { icon: <MdEmail size={15} />, label: "Email", value: "support@lms.techproinstitute.org", href: "mailto:support@lms.techproinstitute.org" },
    { icon: <MdPhone size={15} />, label: "Australia", value: "0390883396", href: "tel:0390883396" },
    { icon: <MdPhone size={15} />, label: "UK", value: "+61 435 976 010", href: "tel:+61435976010" },
    { icon: <MdPhone size={15} />, label: "Nigeria", value: "+234 808 647 8810", href: "tel:+2348086478810" },
    { icon: <MdLocationOn size={15} />, label: "Address", value: "3a High Street, Gillingham Kent", href: "https://maps.google.com/?q=3a+High+Street+Gillingham+Kent" },
  ];

  const socials = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaTiktok />, href: "#", label: "TikTok" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        .c-root { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
        .c-syne { font-family: 'Syne', sans-serif; }

        *, *::before, *::after { box-sizing: inherit; }

        .c-mesh {
          background-color: #eef2ff;
          background-image:
            radial-gradient(ellipse 70% 50% at 5% 0%,    #c7d2fe 0%, transparent 55%),
            radial-gradient(ellipse 55% 40% at 95% 100%, #bfdbfe 0%, transparent 55%),
            radial-gradient(ellipse 35% 25% at 50% 50%,  #e0e7ff 0%, transparent 65%);
          min-height: 100vh;
        }

        .c-glass {
          background: rgba(255,255,255,0.76);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .c-panel {
          background: linear-gradient(150deg, #001489 0%, #0020c4 55%, #0033ff 100%);
          position: relative;
          overflow: hidden;
        }
        .c-panel::before {
          content: '';
          position: absolute;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          bottom: -55px; right: -55px;
          pointer-events: none;
        }
        .c-panel::after {
          content: '';
          position: absolute;
          width: 100px; height: 100px; border-radius: 50%;
          background: rgba(255,255,255,0.05);
          top: 30%; right: -25px;
          pointer-events: none;
        }

        .c-btn {
          background: linear-gradient(135deg, #001489 0%, #0025d4 100%);
          box-shadow: 0 6px 18px rgba(0,20,137,0.28);
          transition: all 0.25s ease;
        }
        .c-btn:hover:not(:disabled) {
          box-shadow: 0 10px 26px rgba(0,20,137,0.40);
          transform: translateY(-1px);
        }
        .c-btn:active:not(:disabled) { transform: translateY(0); }

        .c-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
        }

        @keyframes waPulse {
          0%   { transform: scale(1);    opacity: .6; }
          100% { transform: scale(1.85); opacity: 0;  }
        }
        .wa-ring::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 9999px;
          background: rgba(34,197,94,0.4);
          animation: waPulse 2.2s ease-out infinite;
        }

        .Toastify__toast {
          border-radius: 12px !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-size: 13px !important;
        }

        /* Responsive grid helpers */
        @media (min-width: 480px) {
          .xs-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <section className="w-full px-4 py-8 c-root c-mesh sm:py-12 sm:px-6 lg:px-8">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="w-full max-w-5xl mx-auto mt-20">

          {/* ── Header ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="text-center mb-7 sm:mb-10"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 text-[#001489] text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
            >
              <span className="w-5 h-px bg-[#001489] inline-block" />
              Get In Touch
              <span className="w-5 h-px bg-[#001489] inline-block" />
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-xl leading-snug text-gray-900 c-syne sm:text-2xl md:text-3xl font-800"
            >
              Contact <span className="text-[#001489]">Our Team</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-1.5 text-gray-500 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed"
            >
              We respond within 24 hours — usually much sooner.
            </motion.p>
          </motion.div>

          {/* ── Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="w-full overflow-hidden shadow-2xl c-glass rounded-2xl sm:rounded-3xl shadow-blue-900/10"
          >
            {/*
              Mobile  (<lg) → stacked: panel on top, form below
              Desktop (lg+) → side-by-side: 5 cols panel | 7 cols form
            */}
            <div className="flex flex-col lg:grid lg:grid-cols-12">

              {/* ════ INFO PANEL ════ */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="flex flex-col gap-5 p-5 c-panel lg:col-span-5 sm:p-7"
              >
                {/* Title */}
                <motion.div variants={fadeUp}>
                  <h2 className="c-syne text-white text-base sm:text-lg font-700 mb-0.5">
                    Contact Information
                  </h2>
                  <p className="text-blue-200 text-[11px] sm:text-xs leading-relaxed">
                    Reach us via any of the channels below.
                  </p>
                </motion.div>

                {/*
                  Contact items:
                  mobile  → 2-column grid
                  lg      → single column list
                */}
                <motion.div
                  variants={stagger}
                  className="grid grid-cols-2 gap-3 lg:grid-cols-1"
                >
                  {contactItems.map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      variants={fadeUp}
                      custom={i}
                      whileHover={{ x: 3 }}
                      className="flex items-start gap-2.5 group min-w-0"
                    >
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 mt-0.5 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                        <span className="text-white">{item.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-blue-300 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-white text-[11px] sm:text-xs font-medium leading-snug break-words">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>

                <div className="c-divider" />

                {/* Socials */}
                <motion.div variants={fadeUp}>
                  <p className="text-blue-200 text-[9px] font-bold uppercase tracking-widest mb-2.5">
                    Follow Us
                  </p>
                  <div className="flex gap-2">
                    {socials.map((s, i) => (
                      <motion.a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-8 h-8 text-sm text-white transition-colors duration-200 bg-white/15 hover:bg-white/25 rounded-xl"
                      >
                        {s.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* ════ FORM PANEL ════ */}
              <div className="flex flex-col gap-4 p-5 lg:col-span-7 sm:p-7">

                {/* Map — hidden on mobile, shows sm+ */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="flex-shrink-0 hidden overflow-hidden border border-gray-100 shadow-sm sm:block rounded-xl"
                  style={{ height: 130 }}
                >
                  <iframe
                    title="TechPro Institute Location"
                    className="w-full h-full"
                    loading="lazy"
                    src="https://www.google.com/maps?q=Gillingham+Kent&output=embed"
                  />
                </motion.div>

                {/* Form */}
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="show"
                  variants={stagger}
                  className="flex flex-col gap-3"
                >
                  {/* First / Last */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <motion.div variants={fadeUp}>
                      <FloatingInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <FloatingInput
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Email / Phone */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <motion.div variants={fadeUp}>
                      <FloatingInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <FloatingInput
                        label="Phone (optional)"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div variants={fadeUp}>
                    <FloatingInput
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp}>
                    <FloatingInput
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      textarea
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-semibold text-white c-btn rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span
                            key="spin"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
                          />
                        ) : sent ? (
                          <motion.span
                            key="sent"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            ✓ Message Sent!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            Send Message <MdSend />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    className="text-center text-[11px] text-gray-400"
                  >
                    🔒 Your data is safe and will never be shared.
                  </motion.p>
                </motion.form>
              </div>
            </div>
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-center text-gray-400 text-[11px] sm:text-xs mt-5"
          >
            Avg. response time:{" "}
            <span className="text-[#001489] font-semibold">under 4 hours</span>{" "}
            on business days
          </motion.p>
        </div>

        {/* ── WhatsApp FAB ── */}
        <motion.a
          href="https://wa.me/447351662748"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}
        >
          <span className="relative block wa-ring">
            <span
              className="relative flex items-center justify-center text-white transition-colors duration-200 bg-green-500 rounded-full hover:bg-green-600"
              style={{
                width: "clamp(44px, 5vw, 52px)",
                height: "clamp(44px, 5vw, 52px)",
                boxShadow: "0 4px 16px rgba(34,197,94,0.38)",
              }}
            >
              <FaWhatsapp size={20} />
            </span>
          </span>
        </motion.a>
      </section>
    </>
  );
};

export default Contact;
