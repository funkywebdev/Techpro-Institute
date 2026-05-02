
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserRegion } from "../hooks/useUserRegion";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

/* ── reusable field wrapper ── */
const Field = ({ label, icon, error, children, index }) => (
  <motion.div variants={fadeUp} custom={index} className="space-y-1">
    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
      <span className="text-[#15256E]">{icon}</span>
      {label}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-xs text-red-500 pt-0.5"
        >{error}</motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const inputCls =
  "w-full px-4 py-3 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl " +
  "outline-none transition-all duration-200 focus:border-[#15256E] focus:bg-white focus:ring-2 focus:ring-[#15256E]/10 " +
  "placeholder:text-slate-400";

/* ════════════════════════════════
   SIGNUP
════════════════════════════════ */
const SignUp = () => {
  const { countryCode, regionReady } = useUserRegion();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    if (!agree) { toast.error("You must agree to the terms"); return; }
    if (!phone) { toast.error("Phone number is required"); return; }
    setIsLoading(true);
    try {
      const res = await api.post("/register", { ...data, phone });
      toast.success("Account created! Please verify your email 📧");
      localStorage.setItem("verifyEmail", data.email);
      setTimeout(() => navigate("/verify"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  };

  if (!regionReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-8 h-8 border-3 border-[#15256E]/20 border-t-[#15256E] rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .auth-body { font-family: 'DM Sans', sans-serif; }
        .auth-syne { font-family: 'Syne', sans-serif; }
        .auth-mesh {
          background-color: #0d1a5e;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 20%, #1e3a8a 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 80% 80%, #1d4ed8 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 50%, #15256E 0%, transparent 70%);
        }
        .auth-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .float-a { animation: floatY 4s ease-in-out infinite; }
        .float-b { animation: floatY 5.5s ease-in-out 1s infinite; }
        .float-c { animation: floatY 6.5s ease-in-out 2.2s infinite; }

        /* Override PhoneInput */
        .react-tel-input .form-control {
          width: 100% !important;
          height: 46px !important;
          font-size: 14px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          background: #f8fafc !important;
          color: #1e293b !important;
          padding-left: 52px !important;
          font-family: 'DM Sans', sans-serif !important;
          transition: all 0.2s !important;
        }
        .react-tel-input .form-control:focus {
          border-color: #15256E !important;
          background: #fff !important;
          box-shadow: 0 0 0 2px rgba(21,37,110,0.1) !important;
          outline: none !important;
        }
        .react-tel-input .flag-dropdown {
          border: 1px solid #e2e8f0 !important;
          border-right: none !important;
          border-radius: 12px 0 0 12px !important;
          background: #f8fafc !important;
        }
        .react-tel-input .flag-dropdown.open {
          border-radius: 12px 0 0 12px !important;
        }
        .react-tel-input .selected-flag {
          border-radius: 12px 0 0 12px !important;
          padding-left: 12px !important;
        }
        .react-tel-input .country-list {
          border-radius: 12px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12) !important;
          border: 1px solid #e2e8f0 !important;
          font-family: 'DM Sans', sans-serif !important;
        }

        .Toastify__toast {
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 13px !important;
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={3000} />

  <div className="flex items-start justify-center px-4 pb-10 pt-25 sm:pt-30 auth-body bg-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid w-full max-w-5xl overflow-hidden shadow-2xl lg:grid-cols-2 rounded-3xl shadow-slate-900/20"
        >
          {/* ── LEFT BRAND PANEL ── */}
          <div className="relative flex-col justify-between hidden p-10 overflow-hidden auth-mesh auth-dot-grid lg:flex">
            {/* Floating decorative circles */}
            <div className="absolute border rounded-full float-a top-16 right-12 w-28 h-28 bg-white/5 border-white/10" />
            <div className="absolute w-16 h-16 border rounded-full float-b bottom-24 left-8 bg-blue-400/10 border-blue-300/15" />
            <div className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 border rounded-full float-c top-1/2 left-1/2 bg-white/3 border-white/8" />

            {/* Logo */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 border bg-white/10 border-white/15 rounded-2xl">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white/20">
                  <span className="text-xs font-bold text-white">T</span>
                </div>
                <span className="text-sm font-semibold tracking-wide text-white">TechPro Institute</span>
              </div>
            </div>

            {/* Center copy */}
            <div className="z-10">
              <h2 className="mb-4 text-4xl leading-tight text-white auth-syne font-800">
                Start Your<br />Journey 🚀
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-blue-200">
                Join thousands of learners building real-world skills with expert-led courses and mentorship.
              </p>

              {/* Feature list */}
              <div className="mt-8 space-y-3">
                {[
                  "Access 200+ expert-led courses",
                  "Learn at your own pace, anytime",
                  "Earn recognised certificates",
                  "Join a global learning community",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 border rounded-full bg-blue-400/20 border-blue-300/30">
                      <svg className="w-2.5 h-2.5 text-blue-300" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-blue-100">{f}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom badge */}
            <div className="z-10 p-4 border bg-white/8 border-white/10 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#3B82F6","#8B5CF6","#EC4899","#10B981"].map((c, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0d1a5e]" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">12,000+ learners enrolled</p>
                  <p className="text-blue-300 text-[11px]">Join them today</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT FORM PANEL ── */}
          <div className="flex items-start justify-center min-h-screen px-4 pt-20 pb-10 auth-body bg-slate-100">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="w-full max-w-sm mx-auto"
            >
              {/* Header */}
              <motion.div variants={fadeUp} className="mb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#15256E] mb-1.5">
                  Student Portal
                </p>
                <h1 className="text-2xl auth-syne sm:text-3xl font-800 text-slate-900">
                  Create account
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Get started for free — no credit card needed
                </p>
              </motion.div>

              {/* Google */}
              

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

                {/* First + Last Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name" icon={<MdPerson size={13} />} error={errors.first_name?.message} index={2}>
                    <input
                      {...register("first_name", { required: "Required" })}
                      placeholder="John"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Last Name" icon={<MdPerson size={13} />} error={errors.last_name?.message} index={3}>
                    <input
                      {...register("last_name", { required: "Required" })}
                      placeholder="Doe"
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Email */}
                <Field label="Email" icon={<MdEmail size={13} />} error={errors.email?.message} index={4}>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
                    })}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>

                {/* Phone */}
                <motion.div variants={fadeUp} custom={5} className="space-y-1">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    <span className="text-[#15256E] text-sm">📞</span>
                    Phone Number
                  </label>
                  <PhoneInput
                    country={"ng"}
                    value={phone}
                    onChange={setPhone}
                    containerClass="w-full"
                  />
                </motion.div>

                {/* Password */}
                <Field label="Password" icon={<MdLock size={13} />} error={errors.password?.message} index={6}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters" },
                      })}
                      placeholder="••••••••"
                      className={inputCls + " pr-11"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute transition-colors -translate-y-1/2 right-3 top-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                </Field>

                {/* Confirm Password */}
                <Field label="Confirm Password" icon={<MdLock size={13} />} error={errors.password_confirmation?.message} index={7}>
                  <input
                    type="password"
                    {...register("password_confirmation", {
                      required: "Please confirm your password",
                      validate: (val) => val === password || "Passwords do not match",
                    })}
                    placeholder="••••••••"
                    className={inputCls}
                  />
                </Field>

                {/* Terms */}
                <motion.label
                  variants={fadeUp}
                  custom={8}
                  className="flex items-start gap-2.5 cursor-pointer select-none pt-1"
                >
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={() => setAgree(!agree)}
                    className="mt-0.5 accent-[#15256E] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-xs leading-relaxed text-slate-600">
                    I agree to the{" "}
                    <span className="text-[#15256E] font-semibold hover:underline cursor-pointer">Terms of Use</span>
                    {" "}and{" "}
                    <span className="text-[#15256E] font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                  </span>
                </motion.label>

                {/* Submit */}
                <motion.button
                  variants={fadeUp}
                  custom={9}
                  type="submit"
                  disabled={!agree || isLoading}
                  whileHover={{ scale: (!agree || isLoading) ? 1 : 1.01 }}
                  whileTap={{ scale: (!agree || isLoading) ? 1 : 0.99 }}
                  className="w-full bg-[#15256E] hover:bg-[#0f1c58] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#15256E]/25 mt-1"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    <>Create Account <HiArrowRight /></>
                  )}
                </motion.button>
              </form>
   


            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-5 mb-5">
                <hr className="flex-grow border-slate-200" />
                <span className="text-xs font-medium text-slate-400">or continue with</span>
                <hr className="flex-grow border-slate-200" />
              </motion.div>


              <motion.a
                variants={fadeUp}
                href="https://accounts.google.com/"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-3 w-full border border-slate-200 rounded-xl py-2.5 text-sm text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 mb-5"
              >
                <FcGoogle size={20} />
                Continue with Google
              </motion.a>

              {/* Divider */}
              

              {/* Login link */}
              <motion.p variants={fadeUp} custom={10} className="mt-5 text-sm text-center text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-[#15256E] font-semibold hover:underline inline-flex items-center gap-1">
                  Log in <HiArrowRight className="text-xs" />
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;