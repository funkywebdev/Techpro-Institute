




import React from "react";
import Group from "../assets/images/Group.png";

const Diamond = () => (
  <span className="inline-block w-2 h-2 bg-[#001489] rotate-45 mt-1"></span>
);

const How = () => {
  return (
    <section className="py-12 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
        
        {/* IMAGE — FIRST ON MOBILE */}
        

        {/* TEXT */}
        <div className="text-center lg:text-left lg:order-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>

          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
            Getting started is simple and straightforward. Sign up, choose a
            course, learn at your own pace, and earn a certificate upon
            completion.
          </p>

          {/* STEPS */}
          <div className="space-y-3">
            {[
              "Create Your Free Account",
              "Enroll in the Course",
              "Learn with Expert Guidance",
              "Get Certified",
            ].map((step, index) => (
              <div
                key={index}
                className="
                  flex items-start gap-3
                  p-4 rounded-xl
                  bg-gray-50
                  text-sm sm:text-base
                  font-medium text-gray-800
                  shadow-sm
                  hover:shadow-md
                  transition
                  lg:bg-transparent lg:p-0 lg:shadow-none
                "
              >
                <Diamond />
                <span>{step}</span>
                <span className="text-gray-400 text-lg">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:order-1">
          <img
            src={Group}
            alt="How it works illustration"
            className="
              w-full
              max-w-[300px]
              md:max-w-[500px]
              object-contain
            "
          />
        </div>

      </div>
    </section>
  );
};

export default How;
