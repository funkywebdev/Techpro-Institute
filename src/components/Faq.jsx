
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// FAQ data
const faqs = [
  {
    question: "Who are TechPro courses for?",
    answer:
      "This course is ideal for beginners and professionals looking to become certified Scrum Masters."
  },
  {
    question: "Are classes live or recorded?",
    answer:
      "Our classes include both live sessions and recorded lessons, allowing you to learn in real time or revisit materials anytime."
  },
  {
    question: "What kind of support can I expect from instructors?",
    answer:
      "You’ll receive mentorship, assignment reviews, live Q&A sessions, and community support throughout your learning journey."
  },
  {
    question: "Are the courses self-paced or do they have fixed schedules?",
    answer:
      "Most courses combine structured timelines with self-paced learning so you can study at your convenience."
  },
  {
    question: "Can I download the course materials for offline access?",
    answer:
      "Yes, selected course materials are available for download so you can study offline."
  },
];

// Animation variants
const answerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const Faq = () => {
  // State: activeIndex of open FAQ (null = all closed)
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle FAQ open/close
  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-4 py-12 bg-white sm:px-8 lg:px-16">
      <div className="flex flex-col max-w-6xl gap-10 mx-auto lg:grid lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-sm font-semibold text-[#F91C0D]">FAQs</p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>

          <p className="max-w-md mx-auto text-sm text-gray-600 sm:text-base lg:mx-0">
            Still have any questions? Contact our team via{" "}
            <span className="text-[#F91C0D] font-medium">info@techproinstitute.org</span>
          </p>

          <button className="mt-3 px-6 py-3 rounded-xl bg-[#F1F1F3] text-[#262626] text-sm font-medium hover:bg-gray-200 transition inline-block">
            See All FAQs
          </button>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
                className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(index);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex items-center justify-between w-full gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-gray-900 sm:text-base">
                    {faq.question}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-xl font-bold text-gray-500 bg-[#F1F1F3] p-1 rounded"
                  >
                    {isOpen ? "−" : "+"}
                  </motion.span>
                </button>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="px-5 pb-4"
                    >
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
