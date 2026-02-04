


import React, { useState, useEffect } from "react";
import { HiMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // countdown timer
  const navigate = useNavigate();
  const email = localStorage.getItem("verifyEmail");
  const purpose = "email_verification";

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      if (newCode[index]) newCode[index] = "";
      else if (index > 0) {
        document.getElementById(`code-${index - 1}`)?.focus();
        newCode[index - 1] = "";
      }
      setCode(newCode);
    }
  };

  const submitCode = async () => {
    const otp = code.join("");
    if (otp.length < 6) return toast.error("Please enter the full 6-digit code");

    console.log("Submitting OTP:", { email, otp, purpose });

    setLoading(true);
    try {
      const response = await axios.post(
        "https://techproinstitute.org/api/verify-otp",
        { email, otp, purpose },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Verify response:", response.data);
      if (response.data.status) {
        toast.success("Email verified successfully ✅");
        localStorage.removeItem("verifyEmail");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(response.data.message || "Invalid or expired code ❌");
      }
    } catch (err) {
      console.log("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Invalid or expired code ❌");
    } finally {
      setLoading(false);
    }
  };
const resendCode = async () => {
  if (resendTimer > 0) return; // prevent spamming

  console.log("Resending code for:", { email, purpose });
  setResendTimer(60); // start 60s countdown

  try {
    const response = await axios.post(
      "https://techproinstitute.org/api/forgot-password",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Resend response:", response.data);
    localStorage.setItem("verifyEmail", email); // save email

    // Show backend message instead of treating false as error
    if (response.data.status) {
      toast.success("Verification code resent 📩");
    } else {
      toast.info(response.data.message); // ✅ show info for false status
    }
  } catch (err) {
    console.log("Resend error:", err.response?.data);
    toast.error("Failed to resend code ❌");
  }
};
  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-6 py-5 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-md p-8 flex flex-col items-center">
        <div className="bg-[#E0E7FF] p-3 rounded-full mb-4">
          <HiMail className="text-3xl text-[#15256E]" />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">Verify Your Email</h1>

        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to <br />
          <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#15256E]"
            />
          ))}
        </div>

        <button
          onClick={submitCode}
          disabled={loading}
          className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="flex justify-center w-full text-sm text-gray-600">
          <button
            onClick={resendCode}
            disabled={resendTimer > 0}
            className={`text-[#15256E] hover:underline ${resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default VerifyEmail;