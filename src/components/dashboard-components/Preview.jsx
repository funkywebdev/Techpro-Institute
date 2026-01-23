import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiPlay,
  FiLock,
  FiAward,
} from "react-icons/fi";

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
    premium: true,
  },
  {
    id: 4,
    title: "Module 4",
    description: "Advanced concepts",
    duration: "22 mins",
    hasQuiz: true,
    premium: true,
  },
];

const Preview = () => {
  const [completedModules, setCompletedModules] = useState([1]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [showPremium, setShowPremium] = useState(false);

  const isUnlocked = (index) =>
    index === 0 || completedModules.includes(index);

  return (
    <>
      {/* HEADER */}
      <section className="mt-25 sm:mt-20">
        <h2 className="text-[18px] sm:text-xl font-semibold text-gray-900">
          Preview Modules
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Learn step by step — complete modules to unlock more content
        </p>

        {/* MODULE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {modulesData.map((module, index) => {
            const unlocked = isUnlocked(index);
            const locked = !unlocked || module.premium;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white border rounded-xl p-5 flex flex-col justify-between
                  ${
                    locked
                      ? "border-gray-200 opacity-80"
                      : "border-gray-100 hover:shadow-md"
                  }`}
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
                  {!locked && (
                    <button
                      onClick={() => setVideoPreview(module.videoUrl)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#15256E] hover:gap-3 transition-all"
                    >
                      Continue Learning <FiArrowRight />
                    </button>
                  )}

                  {locked && module.premium && (
                    <button
                      onClick={() => setShowPremium(true)}
                      className="inline-flex items-center gap-2 text-sm text-amber-600 font-medium"
                    >
                      <FiLock /> Unlock with Premium
                    </button>
                  )}

                  {locked && !module.premium && (
                    <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                      <FiLock /> Complete previous module
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 🎥 VIDEO PREVIEW MODAL */}
      <AnimatePresence>
        {videoPreview && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl w-[90%] max-w-3xl p-4"
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setVideoPreview(null)}
                  className="text-sm text-gray-500"
                >
                  Close
                </button>
              </div>

              <iframe
                src={videoPreview}
                className="w-full h-[400px] rounded"
                allowFullScreen
                title="Preview video"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💳 PREMIUM UPSELL */}
      <AnimatePresence>
        {showPremium && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              className="bg-white rounded-xl p-6 max-w-md w-[90%]"
            >
              <h3 className="text-lg font-semibold">
                Unlock Premium Content
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Get access to advanced modules, quizzes, and certificates.
              </p>

              <button className="mt-5 w-full bg-[#15256E] text-white py-3 rounded">
                Upgrade to Premium
              </button>

              <button
                onClick={() => setShowPremium(false)}
                className="mt-3 w-full text-sm text-gray-500"
              >
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Preview;
