import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(true); // always true for reset

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10 ">
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
            placeholder="Enter your Email"
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0"
          />

          {/* Reset Code */}
          <label className="block mb-1 font-medium">Reset Code</label>
          <input
            type="text"
            placeholder="Enter your Reset Code"
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0"
          />

          {/* New Password */}
          <label className="block mb-1 font-medium">New Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-0 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="block mb-1 font-medium">Confirm Password</label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-0 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </div>

          {/* Reset Password button */}
          <Link
            to="/verify"
            className={`w-full py-3 rounded mb-4 text-center text-white transition block ${
                agree ? "bg-[#15256E] hover:bg-[#0f1c58]" : "bg-gray-400 cursor-not-allowed pointer-events-none"
            }`}
            >
            Reset Password
            </Link>


          {/* OR separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Back to Login link */}
          <p className="text-center text-gray-600 mt-2">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-[#15256E] cursor-pointer hover:underline"
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
