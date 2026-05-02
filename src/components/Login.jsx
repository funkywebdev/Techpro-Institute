


// import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { HiArrowRight } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import api from "../api/axios";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [serverError, setServerError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSendingCode, setIsSendingCode] = useState(false);

//   const navigate = useNavigate();

//   const { register, handleSubmit, getValues, formState: { errors } } = useForm();

//   // LOGIN
//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     setServerError(null);

//     try {
//       const response = await api.post("/login", data);

//       const token = response.data?.data?.token;
//       const user = response.data?.data?.user;

//       if (!token) throw new Error("No token returned from server");

//       // STORE TOKEN
//       localStorage.setItem("token", token);

//       // Optionally store user info
//       localStorage.setItem("user", JSON.stringify(user));

//       console.log("Login successful:", user);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Login error:", error);
//       setServerError(error.response?.data?.message || "Failed to login. Please check credentials.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // FORGOT PASSWORD → SEND OTP
//   const handleForgotPassword = async () => {
//     const email = getValues("email");
//     if (!email) {
//       setServerError("Please enter your email first.");
//       return;
//     }

//     setIsSendingCode(true);
//     setServerError(null);

//     try {
//       const payload = { email, purpose: "password_reset" };
//       const response = await api.post("/forgot-password", payload);

//       console.log("Reset code sent:", response.data);
//       navigate("/forget", { state: { email } });
//     } catch (error) {
//       console.error("Forgot password error:", error);
//       setServerError(error.response?.data?.message || "Failed to send reset code.");
//     } finally {
//       setIsSendingCode(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
//       <div className="w-full max-w-6xl">
//         <div className="p-8 bg-white rounded-lg shadow-md">
//           <div className="mb-6 space-y-1 text-center">
//             <h1 className="text-2xl font-bold text-black sm:text-3xl">Login</h1>
//             <p className="text-sm text-gray-600 sm:text-base">Login to start learning</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* Email */}
//             <div>
//               <label className="block mb-1 font-medium text-black">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your Email"
//                 className="w-full p-3 mb-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-0"
//                 {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
//               />
//               {errors.email && <span className="text-sm text-red-500">{errors.email.message || "Invalid email"}</span>}
//             </div>

//             {/* Password */}
//             <div className="mb-2">
//               <label className="block mb-1 font-medium text-black">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your Password"
//                   className="w-full p-3 pr-10 text-black border border-gray-300 rounded focus:outline-none focus:ring-0"
//                   {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//                 </button>
//               </div>
//               {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
//             </div>

//             {/* Remember me & Forgot password */}
//             <div className="flex items-center justify-between mb-4 text-sm">
//               <label className="flex items-center gap-2 text-gray-600 cursor-pointer ">
//                 <input type="checkbox" className="accent-[#15256E]" />
//                 Remember me
//               </label>

//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-[#15256E] hover:underline disabled:opacity-50 cursor-pointer"
//                 disabled={isSendingCode}
//               >
//                 {isSendingCode ? "Sending code..." : "Forgot password?"}
//               </button>
//             </div>

//             {/* Server error */}
//             {serverError && <p className="mb-2 text-sm text-red-500">{serverError}</p>}

            
//    <button
//   type="submit"
//   disabled={isSubmitting}
//   className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition disabled:opacity-50 flex justify-center items-center gap-2"
// >
//   {isSubmitting && (
//     <svg
//       className="w-5 h-5 text-white animate-spin"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       ></circle>
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//       ></path>
//     </svg>
//   )}
//   {isSubmitting ? "Logging in..." : "Login"}
// </button>

// {/* Forgot password button */}
// <button
//   type="button"
//   onClick={handleForgotPassword}
//   className="text-[#15256E] hover:underline disabled:opacity-50 flex items-center gap-2"
//   disabled={isSendingCode}
// >
//   {isSendingCode && (
//     <svg
//       className="animate-spin h-4 w-4 text-[#15256E]"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//     >
//       <circle
//         className="opacity-25"
//         cx="12"
//         cy="12"
//         r="10"
//         stroke="currentColor"
//         strokeWidth="4"
//       ></circle>
//       <path
//         className="opacity-75"
//         fill="currentColor"
//         d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//       ></path>
//     </svg>
//   )}
//   {isSendingCode ? "Sending code..." : "Forgot password?"}
// </button>
//           </form>

//           {/* OR */}
//           <div className="flex items-center my-4">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-2 text-sm text-gray-400">OR</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Google login */}
//           <a href="https://accounts.google.com/" className="flex items-center justify-center w-full gap-2 py-2 mb-4 text-gray-700 transition border border-gray-300 rounded hover:bg-gray-100">
//             <FcGoogle size={24} />
//             <span>Sign in with Google</span>
//           </a>

//           {/* Sign up */}
//           <p className="text-center text-gray-600">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="inline-flex items-center gap-1 text-[#15256E] hover:underline">
//               Sign Up <HiArrowRight className="text-sm" />
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;







import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";

/* ── animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* ── floating label field ── */
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
   LOGIN
════════════════════════════════ */
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = await api.post("/login", data);
      const token = response.data?.data?.token;
      const user = response.data?.data?.user;
      if (!token) throw new Error("No token returned from server");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to login. Please check credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (!email) { setServerError("Please enter your email first."); return; }
    setIsSendingCode(true);
    setServerError(null);
    try {
      await api.post("/forgot-password", { email, purpose: "password_reset" });
      navigate("/forget", { state: { email } });
    } catch (error) {
      setServerError(error.response?.data?.message || "Failed to send reset code.");
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .auth-body  { font-family: 'DM Sans', sans-serif; }
        .auth-syne  { font-family: 'Syne', sans-serif; }
        .auth-mesh  {
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
        .auth-glow {
          box-shadow: 0 0 60px rgba(29,78,216,0.35), 0 0 120px rgba(21,37,110,0.15);
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .float-a { animation: floatY 4s ease-in-out infinite; }
        .float-b { animation: floatY 5s ease-in-out 1s infinite; }
        .float-c { animation: floatY 6s ease-in-out 2s infinite; }
      `}</style>

      <div className="flex items-start justify-center min-h-screen px-4 pt-20 pb-10 auth-body bg-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
         className="grid w-full max-w-5xl mt-10 overflow-hidden shadow-2xl lg:grid-cols-2 rounded-3xl shadow-slate-900/20"
        >
          {/* ── LEFT BRAND PANEL ── */}
          <div className="relative flex-col justify-between hidden p-10 overflow-hidden auth-mesh auth-dot-grid lg:flex">
            {/* Floating blobs */}
            <div className="absolute border rounded-full float-a top-16 right-12 w-28 h-28 bg-white/5 border-white/10" />
            <div className="absolute w-16 h-16 border rounded-full float-b bottom-24 left-8 bg-blue-400/10 border-blue-300/15" />
            <div className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 border rounded-full float-c top-1/2 left-1/2 bg-white/3 border-white/8" />

            {/* Logo area */}
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
                Welcome<br />Back 👋
              </h2>
              <p className="max-w-xs text-sm leading-relaxed text-blue-200">
                Log in to continue your learning journey and pick up right where you left off.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { n: "12K+", l: "Active Learners" },
                  { n: "200+", l: "Courses" },
                  { n: "98%",  l: "Satisfaction" },
                  { n: "24/7", l: "Support" },
                ].map((s, i) => (
                  <div key={i} className="px-4 py-3 border bg-white/8 border-white/10 rounded-2xl">
                    <p className="text-xl text-white auth-syne font-700">{s.n}</p>
                    <p className="text-blue-300 text-xs mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom quote */}
            <div className="z-10 p-4 border bg-white/8 border-white/10 rounded-2xl">
              <p className="text-sm italic leading-relaxed text-blue-100">
                "The best investment you can make is in yourself."
              </p>
              <p className="mt-2 text-xs font-medium text-blue-300">— Warren Buffett</p>
            </div>
          </div>

          {/* ── RIGHT FORM PANEL ── */}
          <div className="flex flex-col justify-center px-8 py-12 bg-white sm:px-12">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="w-full max-w-sm mx-auto"
            >
              {/* Header */}
              <motion.div variants={fadeUp} className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#15256E] mb-1.5">
                  Student Portal
                </p>
                <h1 className="text-2xl auth-syne sm:text-3xl font-800 text-slate-900">
                  Sign in to learn
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your credentials below
                </p>
              </motion.div>

              {/* Google */}
              <motion.a
                variants={fadeUp}
                href="https://accounts.google.com/"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-center gap-3 w-full border border-slate-200 rounded-xl py-2.5 text-sm text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 mb-6"
              >
                <FcGoogle size={20} />
                Continue with Google
              </motion.a>

              {/* Divider */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <hr className="flex-grow border-slate-200" />
                <span className="text-xs font-medium text-slate-400">or sign in with email</span>
                <hr className="flex-grow border-slate-200" />
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <Field label="Email" icon={<MdEmail size={13} />} error={errors.email?.message || (errors.email && "Invalid email")} index={2}>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputCls}
                    {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                  />
                </Field>

                {/* Password */}
                <Field label="Password" icon={<MdLock size={13} />} error={errors.password?.message} index={3}>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={inputCls + " pr-11"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "At least 6 characters" },
                      })}
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

                {/* Remember + Forgot */}
                <motion.div variants={fadeUp} custom={4} className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none text-slate-600">
                    <input type="checkbox" className="accent-[#15256E] rounded" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isSendingCode}
                    className="text-sm text-[#15256E] font-medium hover:underline disabled:opacity-50 transition"
                  >
                    {isSendingCode ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 border-2 border-[#15256E]/30 border-t-[#15256E] rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : "Forgot password?"}
                  </button>
                </motion.div>

                {/* Server error */}
                <AnimatePresence>
                  {serverError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"
                    >
                      {serverError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  variants={fadeUp}
                  custom={5}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full bg-[#15256E] hover:bg-[#0f1c58] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[#15256E]/25"
                  style={{ marginTop: "8px" }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                      Logging in…
                    </>
                  ) : (
                    <>Login <HiArrowRight /></>
                  )}
                </motion.button>
              </form>

              {/* Sign up link */}
              <motion.p variants={fadeUp} custom={6} className="mt-6 text-sm text-center text-slate-500">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#15256E] font-semibold hover:underline inline-flex items-center gap-1">
                  Sign Up <HiArrowRight className="text-xs" />
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
