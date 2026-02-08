import React, { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get(`https://techproinstitute.org/api/v1/courses/${slug}`)
      .then((res) => {
        setCourse(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load course data");
        setLoading(false);
      });
  }, [slug]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEnroll = () => {
    navigate("/signup");
    // or: navigate(`/signup?course=${slug}`);
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="bg-[#F3F3FF] relative overflow-hidden">
      {/* HERO */}
      <section className="relative py-12 px-4 sm:px-8 lg:px-16 pt-[100px] sm:pt-[120px]">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 items-start">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-3 sm:space-y-6 px-2 text-center sm:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-[18px] sm:text-4xl font-bold text-gray-900"
            >
              {course?.title || "Untitled Course"}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-700 text-sm sm:text-base leading-relaxed"
            >
              {course?.description || "No description available."}
            </motion.p>

            <motion.button
              variants={fadeInUp}
              onClick={handleEnroll}
              className="mt-4 px-6 py-2 sm:py-3 bg-[#15256E] text-white rounded-lg font-semibold hover:bg-[#001489] transition"
            >
              Enroll Now
            </motion.button>
          </motion.div>

          {/* PHONE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="static mt-6 lg:absolute lg:left-3/4 lg:-translate-x-1/2 lg:-bottom-52 z-10 flex items-center"
          >
            <div className="relative w-[300px] bg-black rounded-3xl shadow-2xl overflow-hidden mx-auto p-1">
              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" />

              <div className="bg-white rounded-3xl p-4 space-y-3">
                <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                  {course?.image?.url ? (
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    "Course Image"
                  )}
                </div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Course Summary
                </h2>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-1"
                >
                  {course?.modules?.length > 0 ? (
                    course.modules.map((mod, idx) => (
                      <motion.div
                        key={idx}
                        variants={fadeInUp}
                        className="flex items-center gap-2 text-gray-700 text-xs"
                      >
                        <IoMdCheckmark className="text-[#15256E]" />
                        <span>{mod.title}</span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs">
                      No modules available yet.
                    </p>
                  )}
                </motion.div>

                <div className="pt-3 space-y-3">
                  <span className="block text-xl font-bold text-gray-900">
                    {course?.price
                      ? `${course.price.currency} ${course.price.amount}`
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

      {/* SYLLABUS */}
      <section className="bg-white py-8 sm:py-16 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-[18px] sm:text-2xl font-bold text-gray-900 mb-6">
            Course Syllabus
          </h1>

          <div className="space-y-4">
            {course?.modules?.length > 0 ? (
              course.modules.map((module, index) => (
                <div
                  key={module.id || index}
                  className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-gray-900 text-sm sm:text-base">
                      {module.title}
                    </span>

                    <BsChevronDown
                      className={`transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === index && module.description && (
                    <div
                      className="px-6 pb-6 text-gray-700 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: module.description,
                      }}
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xs">
                No syllabus available yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursePage;