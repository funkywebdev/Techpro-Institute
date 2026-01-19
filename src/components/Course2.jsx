import React from "react";
import { FaClock, FaCertificate, FaStar } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import FrameF from "../assets/images/FrameF.png";

const Course2 = () => {
  return (
    <div className="bg-[#F3F3FF] relative overflow-hidden">

      {/* HERO / COURSE INTRO */}
      <section className="relative py-12 px-4 sm:px-8 lg:px-16 pt-[100px] sm:pt-[120px]">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6 px-2 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              Product Owner Certification Program
            </h1>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
             Learn the core principles of product ownership, Agile mindset, backlog management, stakeholder collaboration, and real-world workflows needed to work as a certified Product Owner.
            </p>

            {/* FEATURES */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-3 sm:gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <FaClock className="text-[#15256E]" />
                <span>Duration: 6 Weeks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCertificate className="text-[#15256E]" />
                <span>Certificate Included</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaStar className="text-[#15256E]" />
                <span>Beginner-Friendly</span>
              </div>
            </div>

            <button className="mt-4 px-6 py-3 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition">
              Enroll Now
            </button>
          </div>
        </div>

        {/* PHONE MOCKUP */}
        <div
          className="
            static mt-6
            lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-52
            z-10 
          "
        >
          <div className="relative w-[300px] md:w-[260px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1">

            {/* NOTCH */}
            <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

            {/* SCREEN */}
            <div className="bg-white rounded-3xl p-3 sm:p-5 space-y-3">
              <img
                src={FrameF}
                alt="Scrum Master Certification Program"
                className="w-full rounded-xl shadow-md"
              />

              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Course Summary
                </h2>

                {[
                  "Full Access to Course Videos",
                  "Downloadable Study Materials",
                  "Weekly Live Mentorship Session",
                  "Certificate of Completion",
                ].map((item, idx) => (
                  <p
                    key={idx}
                    className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm"
                  >
                    <BsCheckCircle className="text-[#15256E]" /> {item}
                  </p>
                ))}

                {/* PRICE + BUTTON */}
                <div className="pt-3 space-y-3">
                  <span className="block text-xl font-bold text-gray-900">
                    $250
                  </span>

                  <button className="w-full px-4 py-2 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition text-sm">
                    Enroll Now
                  </button>
                </div>

                <p className="text-gray-600 text-xs text-center">
                  Secure Payment • <span className="font-medium">24/7 Support</span>
                </p>
                <p className="text-gray-600 text-xs text-center">
                  Instant Access After Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE OVERVIEW */}
      <section className="bg-white py-16 px-8 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">

          {/* WHAT YOU'LL LEARN */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Course Overview
            </h2>
            <p className="text-gray-700 font-semibold">What You’ll Learn</p>

            <div className="space-y-2 text-gray-700">
              {[
                "Gain a deep understanding of the Agile mindset",
                "Learn the complete Scrum framework",
                "Understand Scrum roles and responsibilities",
                "Master Scrum events and ceremonies",
                "Use industry tools like Jira or ClickUp",
                "Apply Scrum to real-life projects",
              ].map((item, idx) => (
                <p key={idx} className="flex items-center gap-2">
                  <BsCheckCircle className="text-[#15256E]" /> {item}
                </p>
              ))}
            </div>
          </div>

          {/* WHO THIS IS FOR */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Who This Course Is For
            </h2>

            <div className="space-y-2 text-gray-700">
              {[
                "Beginners who want to start a tech career",
                "Anyone switching into project or product roles",
                "Professionals who want Scrum Master certification",
                "Professionals aiming for career advancement",
              ].map((item, idx) => (
                <p key={idx} className="flex items-center gap-2">
                  <BsCheckCircle className="text-[#15256E]" /> {item}
                </p>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Course2;
