

import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useUserRegion } from "../hooks/useUserRegion";
import api from "../api/axios";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const CoursePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { countryCode, regionReady } = useUserRegion();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // Fetch course data when region is ready
  useEffect(() => {
    if (!regionReady) return;

    const fetchCourse = async () => {
      try {
        const res = await api.get(
          `/v1/courses/${slug}`
        );

        console.log(res);
        setCourse(res.data.data || {});

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load course data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [regionReady, slug]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEnroll = () => {
    navigate(`/signup?course=${slug}`);
  };


  

  // Spinner for loading
  if (!regionReady || loading) {
    return (
      <div className="py-40 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-semibold">{error}</div>
    );
  }

  return (
    <div className="bg-[#F3F3FF] relative overflow-hidden">
      {/* HERO */}
      <section className="relative py-12 px-6 sm:px-22 pt-[100px] sm:pt-[120px]">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 items-start">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-3 sm:space-y-6 text-center sm:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-4xl font-bold text-gray-900"
            >
              {course.title || "Untitled Course"}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-700 text-sm sm:text-base leading-relaxed"
            >
              {course.description || "No description available."}
            </motion.p>

            <motion.button
              variants={fadeInUp}
              onClick={handleEnroll}
              className="mt-4 sm:mt-2 px-6 py-2 sm:py-3 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition"
            >
              Enroll Now
            </motion.button>
          </motion.div>

          {/* COURSE IMAGE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="static sm:mt-6 lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-62 z-10 flex items-center"
          >
            <div className="relative w-[300px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1">
              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

              <div className="bg-white rounded-3xl p-4 space-y-3">
                <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 overflow-hidden">
                  {course.image?.url ? (
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    "Course Image"
                  )}
                </div>
                

                  <section className="">
                  <div className="">
                    <h1 className="text-[16px] sm:text-[18px] font-bold text-gray-900 mb-6">
                      Course Summary
                    </h1>

                    <div className="space-y-2">
                      {course.summary?.map((section, idx) => (
                        <ul key={idx} className="space-y-1">
                          {section.data.items.map((item, i) => (
                            <li key={i} className="flex items-center text-gray-700 text-sm sm:text-base">
                              <IoMdCheckmark className="text-[#15256E] mr-2" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      ))}

                      
                      {(!course.summary || course.summary.length === 0) && (
                        <p className="text-gray-500 text-sm">No summary available.</p>
                      )}
                    </div>
                  </div>
                </section>


                <div className="pt-3 space-y-3">
                  <span className="block text-xl font-bold text-gray-900 text-start">
                    {course.price
                      ? `${course.price.currency || "NGN"} ${Number(course.price.amount).toLocaleString()}`
                      : "Free"}
                  </span>

                  <button
                    onClick={handleEnroll}
                    className="w-full px-4 py-2 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition text-sm"
                  >
                    Enroll Now
                  </button>
                </div>

                <p className="text-gray-600 text-xs text-center">
                  Secure Payment • 24/7 Support
                </p>
                <p className="text-gray-600 text-xs text-center">
                  Instant Access After Payment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COURSE SUMMARY */}
      <section className="bg-white py-8 sm:py-16 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Course Overview
          </h1>
          <div className="space-y-6 grid grid-cols-1 sm:grid-cols-4">
            {course.overview?.map((section, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-gray-800 text-[17px] sm:text-[20px] mb-2">
                  {section.type === "what_you_learn"
                    ? "What You Will Learn"
                    : section.type === "who_this_course_is_for"
                    ? "Who This Course Is For"
                    : section.type}
                </h3>
                <ul className="space-y-1">
                  {section.data.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-700 text-[14px] sm:text-[16px]"
                    >
                      <IoMdCheckmark className="text-[#15256E] mr-2" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="bg-white py-6 sm:py-10 px-6 sm:px-16 lg:px-20">
  <div className="max-w-lg">
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
      Course Modules
    </h1>

    <div className="space-y-3">
      {course.modules?.length > 0 ? (
        course.modules.map((module, index) => (
          <div
            key={module.id || index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
          >
            {/* Header */}
            <button
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center justify-between gap-3">
                
                {/* Title */}
                <span className="text-[12px] sm:text-[15px] font-medium text-gray-800">
                  {module.title}
                </span>
              </div>

              <BsChevronDown
                className={`text-gray-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180 text-gray-700" : ""
                }`}
              />
            </button>

            {/* Content */}
            {openIndex === index && module.description && (
              <div className="border-t border-gray-100 px-5 py-4 bg-white">
                <div
                  className="text-sm text-gray-600 leading-relaxed space-y-3"
                  dangerouslySetInnerHTML={{
                    __html: module.description,
                  }}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">
          No modules available yet.
        </p>
      )}
    </div>
  </div>
</section>
    </div>
  );
};

export default CoursePage;