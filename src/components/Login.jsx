


import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  // LOGIN
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await api.post("/login", data);

      const token = response.data?.data?.token;
      const user = response.data?.data?.user;

      if (!token) throw new Error("No token returned from server");

      // STORE TOKEN
      localStorage.setItem("token", token);

      // Optionally store user info
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login successful:", user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setServerError(error.response?.data?.message || "Failed to login. Please check credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // FORGOT PASSWORD → SEND OTP
  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (!email) {
      setServerError("Please enter your email first.");
      return;
    }

    setIsSendingCode(true);
    setServerError(null);

    try {
      const payload = { email, purpose: "password_reset" };
      const response = await api.post("/forgot-password", payload);

      console.log("Reset code sent:", response.data);
      navigate("/forget", { state: { email } });
    } catch (error) {
      console.error("Forgot password error:", error);
      setServerError(error.response?.data?.message || "Failed to send reset code.");
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <div className="w-full max-w-6xl">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Login</h1>
            <p className="text-gray-600 text-sm sm:text-base">Login to start learning</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-black">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full mb-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-0 text-black"
                {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message || "Invalid email"}</span>}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block mb-1 font-medium text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="w-full p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-0 pr-10"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 ">
                <input type="checkbox" className="accent-[#15256E]" />
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#15256E] hover:underline disabled:opacity-50"
                disabled={isSendingCode}
              >
                {isSendingCode ? "Sending code..." : "Forgot password?"}
              </button>
            </div>

            {/* Server error */}
            {serverError && <p className="text-red-500 text-sm mb-2">{serverError}</p>}

            {/* Login button */}
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition disabled:opacity-50">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* OR */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google login */}
          <a href="https://accounts.google.com/" className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded mb-4 hover:bg-gray-100 transition text-gray-700">
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </a>

          {/* Sign up */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="inline-flex items-center gap-1 text-[#15256E] hover:underline">
              Sign Up <HiArrowRight className="text-sm" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
