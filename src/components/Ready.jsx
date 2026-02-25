



import React, { useState } from "react";
import ReadyImg from "../assets/images/Ready.png";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const Ready = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_tsbfjqp",
        "template_8n6g0rc",
        { email },
        "W8LUTAQCleCNI4f1q"
      )
      .then(() => {
        toast.success("Subscribed successfully");
        setEmail("");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Subscription failed 😢");
        setLoading(false);
      });
  };

  return (
    <>
      <Toaster position="top-right" />

      <section className="py-2 px-4 sm:px-8 lg:px-16">
        <div className="relative mx-auto rounded-3xl overflow-hidden shadow-lg">
          {/* IMAGE */}
          <img
            src={ReadyImg}
            alt="Ready to start"
            className="w-full h-[540px] sm:h-[480px] object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-8 lg:ml-[550px]">
            <h1 className="text-3xl font-bold text-white mb-3">
              Exam Info
            </h1>

            <p className="text-sm sm:text-base text-gray-200 max-w-xl mb-5">
            At the end of your accelerated master class course, you are guaranteed your certification pass at one sitting:
           </p>

            <p className="text-gray-200 mb-4">
              📝 Exam Name: CSM <br />
              ⏱ Duration: 60 mins <br />
              📄 Format: Multiple-choice <br />
              ✅ Passing score: 60%
            </p>

            {/* GET STARTED */}
            <button
              onClick={() => navigate("/signup")}
              className="mb-6 px-8 py-3 rounded-xl bg-white text-[#15256E] font-medium w-full sm:w-40"
            >
              Get Started
            </button>

            {/* NEWSLETTER */}
            <div className="w-full max-w-md bg-white/95 rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                Subscribe to our newsletter
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#001489]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-xl text-white font-medium
                    ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-900 hover:bg-black"
                    }`}
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ready;