import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!agree) {
      toast.error("You must agree to the terms");
      return;
    }

    if (!phone) {
      toast.error("Phone number is required");
      return;
    }

    setIsLoading(true);

    const payload = {
      ...data,
      phone,
      region: "africa",
    };

    try {
      // Example Axios POST request (replace with your API)
      const res = await axios.post("https://techproinstitute.org/api/register", payload);

      toast.success("Account created! Please verify your email 📧");

// save email for verify page
      localStorage.setItem("verifyEmail", data.email);

      // go to verify page
      setTimeout(() => {
        navigate("/verify");
      }, 1500);

      toast.success("Account created successfully ✅");
      console.log("Response:", res.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || "Server Error ❌");
      } else {
        toast.error("Something went wrong ❌");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 py-5 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <div className="w-full max-w-6xl">
        <div className="bg-white p-8 rounded-lg shadow-md">

          {/* Header */}
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-black">Sign Up</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Create an account to start learning
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* First Name */}
            <label className="block mb-1 font-medium text-black">First Name</label>
            <input
              {...register("first_name", { required: "First name is required" })}
              className="w-full mb-1 p-3 border border-gray-300 text-black rounded"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mb-3">{errors.first_name.message}</p>
            )}

            {/* Last Name */}
            <label className="block mb-1 font-medium text-black">Last Name</label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              className="w-full mb-1 p-3 border border-gray-300 text-black rounded"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mb-3">{errors.last_name.message}</p>
            )}

            {/* Email */}
            <label className="block mb-1 font-medium text-black">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full mb-1 p-3 border border-gray-300 text-black rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
            )}

            {/* Phone */}
            <label className="block mb-1 font-medium text-black">Phone Number</label>
            <PhoneInput
              country={"ng"}
              value={phone}
              onChange={setPhone}
              inputStyle={{
                width: "100%",
                height: "48px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                color: "#000000",
              }}
              containerClass="mb-4"
            />

            {/* Password */}
            <label className="block mb-1 font-medium text-black">Password</label>
            <div className="relative mb-1">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full p-3 border border-gray-300 rounded text-black pr-10"
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
            {errors.password && (
              <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
            )}

            {/* Confirm Password */}
            <label className="block mb-1 font-medium text-black">Confirm Password</label>
            <input
              type="password"
              {...register("password_confirmation", {
                required: "Confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="w-full mb-1 p-3 border border-gray-300 text-black rounded"
            />
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mb-3">{errors.password_confirmation.message}</p>
            )}

            {/* Terms */}
            <label className="flex items-start gap-2 mb-4 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mt-1 accent-[#15256E]"
              />
              <span className="text-black">
                I agree with the <span className="text-blue-600">Terms of Use</span> and{" "}
                <span className="text-blue-600">Privacy Policy</span>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agree || isLoading}
              className={`w-full py-3 rounded mb-4 text-white flex items-center justify-center gap-2 transition ${
                !agree || isLoading ? "bg-[#15256E] cursor-not-allowed" : "bg-[#15256E] hover:bg-[#0f1c58]"
              }`}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-xl"></span>
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* OR */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google */}
          <a
            href="https://accounts.google.com/http:/localhost:5174/signup"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded mb-4 hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700">Sign up with Google</span>
          </a>

          {/* Login */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#15256E] hover:underline">
              Login <HiArrowRight className="inline text-sm" />
            </Link>
          </p>

        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;