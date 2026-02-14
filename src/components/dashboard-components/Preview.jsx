import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Preview = () => {
  const { id } = useParams(); // module ID from URL (optional)
  const navigate = useNavigate(); // ✅ initialize navigate

  const [modules, setModules] = useState([]);      // ALL modules
  const [module, setModule] = useState(null);      // SINGLE module
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     FETCH ALL MODULES
  ========================== */
  const fetchAllModules = async () => {
    try {
      const res = await api.get("/v1/modules");
      setModules(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch modules");
    }
  };

  /* =========================
     FETCH SINGLE MODULE
  ========================== */
  const fetchSingleModule = async () => {
    try {
      const res = await api.get(`/v1/modules/${id}`);
      setModule(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch module details");
    }
  };

  /* =========================
     USE EFFECT
  ========================== */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchAllModules();

      if (id) {
        await fetchSingleModule(id);
      }

      setLoading(false);
    };

    loadData();
  }, [id]);

  if (loading) {
    return <p className="text-gray-500 mt-4">Loading modules...</p>;
  }

  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }

  return (
    <section className="mt-10 px-2">
      {/* ================= SINGLE MODULE ================= */}
      {module && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Selected Module
          </h2>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="text-[16px] font-semibold mb-2">{module.title}</h3>
            <p
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{ __html: module.description }}
            />
          </div>
        </div>
      )}

      {/* ================= ALL MODULES ================= */}
      <h2 className="text-[16px] font-bold text-gray-900 mb-2">
        Preview Modules
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Step by step learning — access all available modules
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {modules.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-[16px] font-medium mb-2">{item.title}</h3>

            <p
              className="text-sm text-gray-600 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />

            {/* ================= BUTTON WITH NAVIGATE ================= */}
            <button
              onClick={() => navigate(`/module/${item.id}`)}
              className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#15256E] hover:underline"
            >
              View Module <FiArrowRight />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Preview;