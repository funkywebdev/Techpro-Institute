// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiArrowRight, FiLock, FiCheckCircle } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";

// const COMPLETED_KEY = "completedModules";

// // helpers
// const getCompletedModules = () =>
//   JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];

// const Preview = () => {
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [completedModules, setCompletedModules] = useState(getCompletedModules());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchAllModules = async () => {
//     try {
//       const res = await api.get("/v1/modules");
//       setModules(res.data.data || []);
//     } catch (err) {
//       console.log(err.response)
//       setError(err.response.data.message);
//     }
//      if (error.response.status === 500) {
//       console.log(error.response)
//               toast.error("Failed to load data. Try again.");
//               setUser(null);
//               setCourse(null);
//      }
//   };

//   useEffect(() => {
//     fetchAllModules().finally(() => setLoading(false));

//     // refresh progress when page regains focus
//     const syncProgress = () => {
//       setCompletedModules(getCompletedModules());
//     };
//     window.addEventListener("focus", syncProgress);
//     return () => window.removeEventListener("focus", syncProgress);
//   }, []);

//   const isLocked = (index) => {
//     if (index === 0) return false;
//     return !completedModules.includes(modules[index - 1]?.id);
//   };

//   if (loading) return <p className="text-gray-500 mt-4">Loading modules…</p>;
//   if (error) return <p className="text-red-500 mt-4">{error}</p>;

//   return (
//     <section className="mt-10 px-2">
//       <h2 className="text-[16px] font-bold mb-2">Preview Modules</h2>
//       <p className="text-sm text-gray-500 mb-6">
//         Complete modules in order to unlock the next
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         {modules.map((item, index) => {
//           const locked = isLocked(index);
//           const completed = completedModules.includes(item.id);

//           return (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className={`border border-gray-200 rounded-xl p-5 flex flex-col shadow-sm ${
//                 locked ? "bg-gray-100 opacity-60" : "bg-white hover:shadow-md"
//               }`}
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-[16px] font-medium">{item.title}</h3>
//                 {completed && <FiCheckCircle className="text-green-500" />}
//               </div>

//               <p
//                 className="text-sm text-gray-600 mb-4 line-clamp-3"
//                 dangerouslySetInnerHTML={{ __html: item.description }}
//               />

//               {locked ? (
//                 <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
//                   <FiLock /> Complete previous module
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => navigate(`/module/${item.id}`)}
//                   className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#15256E]"
//                 >
//                   {completed ? "Review Module" : "View Module"}
//                   <FiArrowRight />
//                 </button>
//               )}

//               <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
//                 <div
//                   className="bg-[#15256E] h-2 rounded-full transition-all"
//                   style={{ width: completed ? "100%" : "0%" }}
//                 />
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Preview; 



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const COMPLETED_KEY = "completedModules";

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

  if (loading) return <p className="text-gray-500 mt-4">Loading modules…</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;

  return (
    <section className="mt-12 sm:px-2">
      <h2 className="text-[17px] font-semibold mb-2 text-gray-800">
        Preview Modules
      </h2>

      <p className="text-sm text-gray-500 mb-8">
        Complete modules in order to unlock the next
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
              )}

              <div className="flex justify-between items-start mb-3 relative z-10">
                <h3 className="text-[16px] font-semibold text-gray-800 leading-snug">
                  {item.title}
                </h3>

                {completed && (
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100">
                    <FiCheckCircle className="text-green-500 text-sm" />
                  </div>
                )}
              </div>

              <p
                className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-3 relative z-10"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              {locked ? (
                <div className="mt-auto flex items-center gap-2 text-sm text-gray-500 relative z-10">
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

              <div className="w-full bg-gray-200 h-2 rounded-full mt-5 overflow-hidden relative z-10">
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