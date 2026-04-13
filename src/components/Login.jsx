


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
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="mb-6 space-y-1 text-center">
            <h1 className="text-2xl font-bold text-black sm:text-3xl">Login</h1>
            <p className="text-sm text-gray-600 sm:text-base">Login to start learning</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-black">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full p-3 mb-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-0"
                {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message || "Invalid email"}</span>}
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block mb-1 font-medium text-black">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="w-full p-3 pr-10 text-black border border-gray-300 rounded focus:outline-none focus:ring-0"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer ">
                <input type="checkbox" className="accent-[#15256E]" />
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#15256E] hover:underline disabled:opacity-50 cursor-pointer"
                disabled={isSendingCode}
              >
                {isSendingCode ? "Sending code..." : "Forgot password?"}
              </button>
            </div>

            {/* Server error */}
            {serverError && <p className="mb-2 text-sm text-red-500">{serverError}</p>}

            
   <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition disabled:opacity-50 flex justify-center items-center gap-2"
>
  {isSubmitting && (
    <svg
      className="w-5 h-5 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  )}
  {isSubmitting ? "Logging in..." : "Login"}
</button>

{/* Forgot password button */}
<button
  type="button"
  onClick={handleForgotPassword}
  className="text-[#15256E] hover:underline disabled:opacity-50 flex items-center gap-2"
  disabled={isSendingCode}
>
  {isSendingCode && (
    <svg
      className="animate-spin h-4 w-4 text-[#15256E]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  )}
  {isSendingCode ? "Sending code..." : "Forgot password?"}
</button>
          </form>

          {/* OR */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google login */}
          <a href="https://accounts.google.com/" className="flex items-center justify-center w-full gap-2 py-2 mb-4 text-gray-700 transition border border-gray-300 rounded hover:bg-gray-100">
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
