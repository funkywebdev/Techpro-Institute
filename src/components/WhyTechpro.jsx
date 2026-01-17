



// import React from "react";
// import { motion } from "framer-motion";
// import CountUp from "react-countup";
// import Rectangle4323 from "../assets/images/Rectangle4323.png";

// const stats = [
//   { number: 500, suffix: "+", label: "Learners Trained" },
//   { number: 10, suffix: "+", label: "Years Experience" },
//   { number: 100, suffix: "%", label: "Practical Curriculum" },
// ];

// const WhyTechpro = () => {
//   return (
//     <section className="bg-[#F8FAFF] py-12 px-4 md:px-8 lg:px-18">
//       <div className="max-w-7xl mx-auto">
//         {/* Header + Stats */}
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8  bg-white rounded-xl p-6 sm:p-8">
          
//           {/* Title + Image */}
//           <div className="text-center lg:text-left lg:flex-1 space-y-2 sm:space-y-4">
//             <h1 className="text-xl sm:text-3xl font-bold leading-tight">
//               Why Choose TechPro
//             </h1>
//             <p className="text-xs sm:text-base text-[#6B7280] max-w-full sm:max-w-md mx-auto lg:mx-0">
//               We deliver in-demand industry certifications
//             </p>
          
//             <motion.img
//               src={Rectangle4323}
//               alt="TechPro Illustration"
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="w-full max-w-xs mx-auto rounded-xl object-cover sm:max-w-full sm:mx-0 mt-6 sm:mt-4 order-last sm:order-first"
//             />
//           </div>

//           {/* Stats + Feature Cards */}
//           <div className="w-full sm:max-w-3xl mx-auto px-0 sm:px-8 lg:px-16 space-y-4 sm:space-y-6">
            
//             {/* Stats */}
//             <div className="flex flex-row sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
//               {stats.map((stat, idx) => (
//                 <div key={idx} className="flex-1">
//                   <p className="text-xl sm:text-3xl font-bold text-[#001489]">
//                     <CountUp
//                       start={0}
//                       end={stat.number}
//                       duration={2}
//                       suffix={stat.suffix}
//                       enableScrollSpy={true} // animates only when visible
//                       scrollSpyOnce={true}
//                     />
//                   </p>
//                   <p className="text-[10px] sm:text-base text-[#6B7280]">{stat.label}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Feature Cards */}
//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
//               <div className="bg-[#F6FBF9] p-3 sm:p-6 rounded-xl shadow-md">
//                 <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">
//                   Hands-On Projects
//                 </h2>
//                 <p className="text-xs sm:text-base text-[#374151]">
//                   Build real-world projects that strengthen your skills and portfolio.
//                 </p>
//               </div>

//               <div className="bg-white p-3 sm:p-6 rounded-xl shadow-md">
//                 <h2 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2">
//                   Practical Learning
//                 </h2>
//                 <p className="text-xs sm:text-base text-[#374151]">
//                   Join TechPro Institute and gain practical experience, industry knowledge, and certification.
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyTechpro;



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Who are TechPro courses for?",
    answer:
      "TechPro courses are designed for beginners, career switchers, students, and professionals who want practical, industry-ready tech skills."
  },
  {
    question: "Are classes live or recorded?",
    answer:
      "Our programs include both live classes and recorded sessions, so you can learn in real time or revisit lessons anytime."
  },
  {
    question: "What kind of support can I expect?",
    answer:
      "You’ll get mentorship, project reviews, live Q&A sessions, and access to a supportive learning community."
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Most courses follow a flexible structure, allowing you to learn at your own pace while meeting key milestones."
  },
  {
    question: "Can I download course materials?",
    answer:
      "Yes, selected course resources can be downloaded for offline learning."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            Still have questions? Contact our team via{" "}
            <span className="text-[#F91C0D] font-medium">
              info@techpro.com
            </span>
          </p>

          <button className="mt-4 px-6 py-3 rounded-xl bg-[#F1F1F3] text-gray-800 text-sm font-medium hover:bg-gray-200 transition">
            See All FAQs
          </button>
        </div>

        {/* RIGHT SECTION (FAQ ACCORDION) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 sm:p-5 text-left"
              >
                <span className="text-sm sm:text-base font-medium text-gray-900">
                  {faq.question}
                </span>

                <span className="text-xl font-bold text-gray-500">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 sm:px-5"
                  >
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;
