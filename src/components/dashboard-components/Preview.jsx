



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const COMPLETED_KEY = "completedModules";

const getCompletedModules = () =>
  JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];

const Preview = ({course}) => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState(getCompletedModules());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //const [courseId, setCourseId] = useState(null);

  const fetchAllModules = async () => {
    try {
      const res = await api.get("/v1/modules");
      setModules(res.data.data || []);
       if (res.data.course_id) {
      setCourseId(res.data.course_id);
    }
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
    }

    if (error?.response?.status === 500) {
      console.log(error.response);
      toast.error("Failed to load data. Try again.");
      setUser(null);
      setCourse(null);
    }
  };


  useEffect(() => {
    fetchAllModules().finally(() => setLoading(false));

    const syncProgress = () => {
      setCompletedModules(getCompletedModules());
    };

    window.addEventListener("focus", syncProgress);
    return () => window.removeEventListener("focus", syncProgress);
  }, []);

  const isLocked = (index) => {
    if (index === 0) return false;
    return !completedModules.includes(modules[index - 1]?.id);
  };

  if (loading) return <p className="mt-4 text-gray-500">Loading modules…</p>;
  if (error) return <p className="mt-4 text-red-500">{error}</p>;

  return (
    <section className="mt-12 sm:px-2">
   

    <div className="flex items-start justify-between gap-3 mb-6">
  <div>
    <h2 className="text-[17px] font-semibold text-gray-800">
      Preview Modules
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Complete modules in order to unlock the next
    </p>
  </div>

 <button
  onClick={() => {
    navigate(`/course/quiz/${course?.id}`);
  }}
  className="
    px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm
    font-medium text-white bg-[#15256E]
    rounded-md hover:bg-[#0f1b4d] transition
    whitespace-nowrap
  "
>
  Take Course Quiz
</button>
</div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((item, index) => {
          const locked = isLocked(index);
          const completed = completedModules.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={!locked ? { y: -8, scale: 1.03 } : {}}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className={`group relative rounded-xl border p-6 flex flex-col transition-all duration-300 ${
                locked
                  ? "bg-gray-100 border-gray-200 opacity-60"
                  : "bg-white border-gray-200 shadow-sm hover:shadow-2xl"
              }`}
            >
              {/* subtle hover glow */}
              {!locked && (
                <div className="absolute inset-0 transition opacity-0 pointer-events-none rounded-xl group-hover:opacity-100 bg-gradient-to-br from-blue-50 to-transparent" />
              )}

              <div className="relative z-10 flex items-start justify-between mb-3">
                <h3 className="text-[16px] font-semibold text-gray-800 leading-snug">
                  {item.title}
                </h3>

                {completed && (
                  <div className="flex items-center justify-center bg-green-100 rounded-full w-7 h-7">
                    <FiCheckCircle className="text-sm text-green-500" />
                  </div>
                )}
              </div>

              <p
                className="relative z-10 mb-5 text-sm leading-relaxed text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              {locked ? (
                <div className="relative z-10 flex items-center gap-2 mt-auto text-sm text-gray-500">
                  <FiLock className="text-gray-400" />
                  Complete previous module
                </div>
              ) : (
                <button
                  onClick={() => navigate(`/module/${item.id}`)}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#15256E] hover:text-blue-600 transition relative z-10"
                >
                  {completed ? "Review Module" : "View Module"}
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
              )}

              <div className="relative z-10 w-full h-2 mt-5 overflow-hidden bg-gray-200 rounded-full">
                <motion.div
                  className="bg-gradient-to-r from-[#15256E] to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: completed ? "100%" : "0%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Preview;