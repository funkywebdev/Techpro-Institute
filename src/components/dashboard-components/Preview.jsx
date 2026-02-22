import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const COMPLETED_KEY = "completedModules";

// helpers
const getCompletedModules = () =>
  JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];

const Preview = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [completedModules, setCompletedModules] = useState(getCompletedModules());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllModules = async () => {
    try {
      const res = await api.get("/v1/modules");
      setModules(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch modules");
    }
  };

  useEffect(() => {
    fetchAllModules().finally(() => setLoading(false));

    // refresh progress when page regains focus
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

  if (loading) return <p className="text-gray-500 mt-4">Loading modules…</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;

  return (
    <section className="mt-10 px-2">
      <h2 className="text-[16px] font-bold mb-2">Preview Modules</h2>
      <p className="text-sm text-gray-500 mb-6">
        Complete modules in order to unlock the next
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((item, index) => {
          const locked = isLocked(index);
          const completed = completedModules.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border border-gray-200 rounded-xl p-5 flex flex-col shadow-sm ${
                locked ? "bg-gray-100 opacity-60" : "bg-white hover:shadow-md"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[16px] font-medium">{item.title}</h3>
                {completed && <FiCheckCircle className="text-green-500" />}
              </div>

              <p
                className="text-sm text-gray-600 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              {locked ? (
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
                  <FiLock /> Complete previous module
                </div>
              ) : (
                <button
                  onClick={() => navigate(`/module/${item.id}`)}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#15256E]"
                >
                  {completed ? "Review Module" : "View Module"}
                  <FiArrowRight />
                </button>
              )}

              <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
                <div
                  className="bg-[#15256E] h-2 rounded-full transition-all"
                  style={{ width: completed ? "100%" : "0%" }}
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