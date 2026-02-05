import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "https://techproinstitute.org/api/reset-password",
        {
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data?.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <ToastContainer position="top-right" />

      <div className="w-full max-w-6xl">
        <div className="bg-white p-8 rounded-lg shadow-md">

          {/* Header */}
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Reset Password</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your details to reset your password
            </p>
          </div>

          {/* Email */}
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0"
          />

          {/* New Password */}
          <label className="block mb-1 font-medium">New Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-0 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="block mb-1 font-medium">Confirm Password</label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-0 pr-10"
            />
          </div>

          {/* Submit */}
          <Link
            to="#"
            onClick={handleResetPassword}
            className="w-full py-3 rounded mb-4 text-center text-white transition block bg-[#15256E] hover:bg-[#0f1c58]"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Link>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <p className="text-center text-gray-600 mt-2">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-[#15256E] hover:underline"
            >
              Back to Login <HiArrowRight className="text-sm" />
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
