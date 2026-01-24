


import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiAward } from "react-icons/fi";
import { Link } from "react-router-dom";

const modulesData = [
  {
    id: 1,
    title: "Module 1",
    description: "Introduction to the course",
    duration: "8 mins",
    hasQuiz: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Module 2",
    description: "Basics of the course",
    duration: "12 mins",
    hasQuiz: false,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Module 3",
    description: "In-depth concepts",
    duration: "18 mins",
    hasQuiz: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Module 4",
    description: "Advanced concepts",
    duration: "22 mins",
    hasQuiz: true,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const Preview = () => {
  return (
    <section className="mt-25 sm:mt-20">
      <h2 className="text-[18px] sm:text-xl font-semibold text-gray-900">
        Preview Modules
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Learn step by step — all modules are unlocked
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {modulesData.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between hover:shadow-md"
          >
            {/* TOP */}
            <div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{module.title}</span>
                <span>{module.duration}</span>
              </div>

              <h3 className="mt-2 text-base font-semibold text-gray-800">
                {module.description}
              </h3>

              {/* QUIZ BADGE */}
              {module.hasQuiz && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded mt-3">
                  <FiAward /> Quiz included
                </span>
              )}
            </div>

            {/* ACTION */}
            <div className="mt-6">
              {/* Continue Learning button navigates to /video */}
              <Link to="/video">
                <button className="inline-flex items-center gap-2 text-sm font-medium text-[#15256E] hover:gap-3 transition-all">
                  Continue Learning <FiArrowRight />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Preview;
