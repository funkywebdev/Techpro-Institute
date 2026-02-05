



// import React, { useState } from "react";
// import { HiMail } from "react-icons/hi";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ForgetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   /* ================= SEND OTP ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) return toast.error("Email is required");
//     if (!email.includes("@")) return toast.error("Enter a valid email");

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "https://techproinstitute.org/api/forgot-password",
//         { email },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (res.data.status) {
//         toast.success("Reset code sent to your email 📩");
//         setShowModal(true); // 👉 OPEN MODAL
//       } else {
//         toast.info(res.data.message);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send code");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= VERIFY OTP ================= */
//   const handleVerifyOtp = async () => {
//     if (otp.length !== 6) {
//       toast.error("Enter the 6-digit OTP");
//       return;
//     }

//     setVerifying(true);

//     try {
//       const res = await axios.post(
//         "https://techproinstitute.org/api/verify-otp",
//         { email, otp },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (res.data.status) {
//         toast.success("OTP verified ✅");
//         localStorage.setItem("resetEmail", email);

//         setTimeout(() => {
//           navigate("/resetpassword");
//         }, 1200);
//       } else {
//         toast.error(res.data.message || "Invalid OTP");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "OTP verification failed");
//     } finally {
//       setVerifying(false);
//     }
//   };

//   return (
//     <>
//       <ToastContainer position="top-right" />

//       {/* ================= MAIN PAGE ================= */}
//       <div className="flex items-center justify-center bg-[#F2F4F8] px-6 pt-24 pb-10">
//         <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-8">
//           <div className="flex justify-center mb-4">
//             <div className="bg-[#E0E7FF] p-3 rounded-full">
//               <HiMail className="text-3xl text-[#15256E]" />
//             </div>
//           </div>

//           <h1 className="text-2xl font-bold text-center mb-2">
//             Forgot Password
//           </h1>
//           <p className="text-center text-gray-600 mb-6">
//             Enter your email to receive a reset code
//           </p>

//           <form onSubmit={handleSubmit}>
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mb-4 p-3 border border-gray-300 rounded"
//               placeholder="Enter your Email"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#15256E] text-white py-3 rounded hover:bg-[#0f1c58]"
//             >
//               {loading ? "Sending..." : "Send Reset Code"}
//             </button>
//           </form>

//           <p className="text-center text-gray-600 mt-4">
//             Remembered your password?{" "}
//             <Link to="/login" className="text-[#15256E] hover:underline">
//               Back to Login
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* ================= OTP MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
//             <h2 className="text-xl font-bold text-center mb-2">
//               Enter Reset Code
//             </h2>
//             <p className="text-center text-gray-600 mb-4">
//               Code sent to <span className="font-medium">{email}</span>
//             </p>

//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//               maxLength={6}
//               className="w-full text-center tracking-widest text-lg p-3 border border-gray-300 rounded mb-4"
//               placeholder="******"
//             />

//             <button
//               onClick={handleVerifyOtp}
//               disabled={verifying}
//               className="w-full bg-[#15256E] text-white py-3 rounded hover:bg-[#0f1c58]"
//             >
//               {verifying ? "Verifying..." : "Verify Code"}
//             </button>

//             <button
//               onClick={() => setShowModal(false)}
//               className="w-full mt-3 text-gray-500 text-sm hover:underline"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ForgetPassword;



import React, { useState } from "react";
import { HiMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  /* ================= SEND OTP ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");
    if (!email.includes("@")) return toast.error("Enter a valid email");

    setLoading(true);

    try {
      const res = await axios.post(
        "https://techproinstitute.org/api/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status) {
        toast.success("Reset code sent to your email 📩");
        setShowModal(true);
      } else {
        toast.info(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  /* ================= OTP INPUT LOGIC ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
        newOtp[index - 1] = "";
      }

      setOtp(newOtp);
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      document.getElementById("otp-5")?.focus();
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }

    setVerifying(true);

    try {
      const res = await axios.post(
        "https://techproinstitute.org/api/verify-otp",
        { email, otp: otpCode },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status) {
        toast.success("OTP verified ✅");
        localStorage.setItem("resetEmail", email);

        setTimeout(() => {
          navigate("/resetpassword");
        }, 1200);
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      {/* ================= MAIN PAGE ================= */}
      <div className="flex items-center justify-center bg-[#F2F4F8] px-6 pt-24 pb-10">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#E0E7FF] p-3 rounded-full">
              <HiMail className="text-3xl text-[#15256E]" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your email to receive a reset code
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 border border-gray-300 rounded"
              placeholder="Enter your Email"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#15256E] text-white py-3 rounded hover:bg-[#0f1c58]"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-[#15256E] hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>

      {/* ================= OTP MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-center mb-2">
              Enter Reset Code
            </h2>
            <p className="text-center text-gray-600 mb-4">
              Code sent to <span className="font-medium">{email}</span>
            </p>

            <div
              className="flex justify-center gap-3 mb-5"
              onPaste={handleOtpPaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleOtpKeyDown(e, index)
                  }
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15256E]"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={verifying}
              className="w-full bg-[#15256E] text-white py-3 rounded hover:bg-[#0f1c58]"
            >
              {verifying ? "Verifying..." : "Verify Code"}
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-3 text-gray-500 text-sm hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
