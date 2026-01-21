import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HiArrowRight } from "react-icons/hi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 py-5 pt-24 pb-5 sm:pt-32 sm:pb-10 ">
      <div className="w-full max-w-6xl">
        <div className="bg-white p-8 rounded-lg shadow-md">

          {/* Header */}
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Sign Up</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Create an account to start learning
            </p>
          </div>

          {/* Full Name */}
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0"
          />

          {/* Email */}
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0"
          />

          {/* Phone number with country */}
          <label className="block mb-1 font-medium">Phone Number</label>
          <PhoneInput
            country={"ng"}
            value={phone}
            onChange={setPhone}
            inputStyle={{
              width: "100%",
              height: "48px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
            }}
            containerClass="mb-4"
          />

          {/* Password */}
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

          {/* Terms & Conditions */}
          <label className="flex items-start gap-2 mb-4 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1 accent-[#15256E]"
            />
            <span>
              I agree with the{" "}
              <span className="text-blue-600 cursor-pointer">Terms of Use</span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* Sign up button */}
          <button
            disabled={!agree}
            className={`w-full py-3 rounded mb-4 transition text-white ${
              agree
                ? "bg-[#15256E] hover:bg-[#0f1c58]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>

          {/* Google sign up */}
          <a
            href="https://accounts.google.com/"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded mb-4 hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span>Sign up with Google</span>
          </a>

          {/* Login link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <span className="inline-flex items-center gap-1 text-[#15256E] cursor-pointer hover:underline">
                Login <HiArrowRight className="text-sm" />
            </span>
            </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
