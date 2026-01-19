// import React, { useState } from "react";
// import { BsCheckCircle, BsChevronDown } from "react-icons/bs";

// const syllabus = [
//   {
//     title: "Module 1 — Introduction to Product Ownership",
//     lessons: [
//       "What is Product Ownership?",
//       "Product Owner roles and mindset",
//       "Why product thinking matters",
//       "Agile product fundamentals",
//     ],
//   },
//   {
//     title: "Module 2 — Product Ownership Framework Basics",
//     lessons: [
//       "What is Scrum?",
//       "Scrum theory & pillars",
//       "Scrum vs traditional project management",
//       "Benefits of Scrum",
//     ],
//   },
//   {
//     title: "Module 3 — Product Ownership Framework Basics",
//     lessons: [
//       "Scrum Master responsibilities",
//       "Product Owner role",
//       "Development Team structure",
//       "Stakeholder collaboration",
//     ],
//   },
//   {
//     title: "Module 4 — Product Ownership Framework Basics",
//     lessons: [
//       "Sprint planning",
//       "Daily stand-up",
//       "Sprint review",
//       "Sprint retrospective",
//     ],
//   },
//   {
//     title: "Module 5 — Product Ownership Framework Basics",
//     lessons: [
//       "Using Jira & ClickUp",
//       "Managing sprint boards",
//       "Tracking progress",
//       "Real-life Scrum project simulation",
//     ],
//   },
// ];

// const CourseOverview = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="max-w-full sm:max-w-3xl md:max-w-6xl mx-auto px-6 pb-12">
//       <h1 className="text-[16px] sm:text-2xl font-bold text-gray-900 mb-7 text-center sm:text-left">
//         Course Syllabus
//       </h1>

//       {/* ACCORDION */}
//       <div className="space-y-4">
//         {syllabus.map((module, index) => (
//           <div
//             key={index}
//             className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
//           >
//             {/* HEADER */}
//             <button
//               onClick={() => toggle(index)}
//               className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left"
//             >
//               <span className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
//                 {module.title}
//               </span>

//               <BsChevronDown
//                 className={`transition-transform duration-300 text-gray-700 ${
//                   openIndex === index ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {/* CONTENT */}
//             {openIndex === index && (
//               <div className="px-4 sm:px-5 pb-5 space-y-3">
//                 {module.lessons.map((lesson, i) => (
//                   <p
//                     key={i}
//                     className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm md:text-base break-words"
//                   >
//                     <BsCheckCircle className="text-[#15256E]" />
//                     {lesson}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseOverview;

import React, { useState } from "react";
import { BsCheckCircle, BsChevronDown } from "react-icons/bs";

const syllabus = [
  {
    title: "Module 1 — Introduction to Product Ownership",
    lessons: [
      "What is Product Ownership?",
      "Product Owner roles and mindset",
      "Why product thinking matters",
      "Agile product fundamentals",
    ],
  },
  {
    title: "Module 2 — Product Ownership Framework Basics",
    lessons: [
      "What is Scrum?",
      "Scrum theory & pillars",
      "Scrum vs traditional project management",
      "Benefits of Scrum",
    ],
  },
  {
    title: "Module 3 — Product Ownership Framework Basics",
    lessons: [
      "Scrum Master responsibilities",
      "Product Owner role",
      "Development Team structure",
      "Stakeholder collaboration",
    ],
  },
  {
    title: "Module 4 — Product Ownership Framework Basics",
    lessons: [
      "Sprint planning",
      "Daily stand-up",
      "Sprint review",
      "Sprint retrospective",
    ],
  },
  {
    title: "Module 5 — Product Ownership Framework Basics",
    lessons: [
      "Using Jira & ClickUp",
      "Managing sprint boards",
      "Tracking progress",
      "Real-life Scrum project simulation",
    ],
  },
];

const CourseOverview = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-full sm:max-w-3xl md:max-w-6xl mx-auto px-8 sm:px-0 pb-12">
      {/* TITLE */}
      <h1 className="text-[18px] sm:text-2xl font-bold text-gray-900 mb-6 text-start sm:text-left">
        Course Syllabus
      </h1>

      {/* ACCORDION */}
      <div className="space-y-4">
        {syllabus.map((module, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden"
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 text-left"
            >
              <span className="font-normal text-gray-900 text-xs sm:text-base md:text-lg line-clamp-1 sm:line-clamp-none">
                {module.title}
              </span>

              <BsChevronDown
                className={`text-gray-700 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* CONTENT */}
            {openIndex === index && (
              <div className="px-3 sm:px-5 pb-4 sm:pb-5 space-y-3">
                {module.lessons.map((lesson, i) => (
                  <p
                    key={i}
                    className="flex items-start gap-2 text-gray-700 text-[11px] sm:text-sm md:text-base line-clamp-2 sm:line-clamp-none"
                  >
                    <BsCheckCircle className="text-[#15256E] mt-[2px] text-xs sm:text-sm" />
                    {lesson}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOverview;
