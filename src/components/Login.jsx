import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10 ">
      <div className="w-full max-w-6xl">
        <div className="bg-white p-8 rounded-lg shadow-md">

          {/* Header */}
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Login</h1>
            <p className="text-gray-600 text-sm sm:text-base">Login to start learning</p>
          </div>

          {/* Email */}
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0 "
          />

          {/* Password */}
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-0  pr-10"
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

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#15256E]" />
              Remember me
            </label>

            {/* Link to Reset Password page */}
            <Link
              to="/resetpassword"
              className="text-[#15256E] cursor-pointer hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login button */}
          <button className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition">
            Login
          </button>

          {/* OR separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google login */}
          <a
            href="https://accounts.google.com/"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded mb-4 hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </a>

          {/* Sign up link */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="inline-flex items-center gap-1 text-[#15256E] cursor-pointer hover:underline"
            >
              Sign Up <HiArrowRight className="text-sm" />
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
