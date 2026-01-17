



import React, { useState } from "react";
import { motion } from "framer-motion";

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
  {
    question: "Can I download the course materials for online access?",
    answer:
      "Yes, selected course materials are available for download so you can study offline."
  }
  
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10">

        {/* LEFT CONTENT */}
        <div className="space-y-4 text-center lg:text-left">
          <p className="text-sm font-semibold text-[#F91C0D]">
            FAQs
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0">
            Still have any questions? Contact our team via{" "}
            <span className="text-[#F91C0D] font-medium">
              info@techpro.com
            </span>
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
                className="bg-white border border-gray-200 rounded-2xl shadow-sm"
              >
                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {faq.question}
                  </span>

                  <span className="text-xl font-bold text-gray-500 bg-[#F1F1F3] p-1">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* ANSWER */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-4"
                  >
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Faq;
