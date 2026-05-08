





import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiLock,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import api from "../api/axios";

/* =======================
   Spinner
======================= */
const Spinner = ({ text = "Loading…" }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <div className="w-10 h-10 border-4 border-[#001489]/40 border-t-[#001489] rounded-full animate-spin" />
  </div>
);

const VideoTemplate = () => {
  const [course, setCourse] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModule, setOpenModule] = useState(null);
  const [openNoteIds, setOpenNoteIds] = useState([]);

  const navigate = useNavigate();

  /* =======================
     Fetch Course
  ======================= */
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await api.get("/v1/courses/free");
        const courseData = res?.data?.data;

        if (!courseData) throw new Error("Invalid course data");

        setCourse(courseData);

        const firstAccessibleModule = courseData?.modules?.find(
          (mod) => mod?.can_access && mod?.contents?.length > 0
        );

        if (firstAccessibleModule) {
          setOpenModule(firstAccessibleModule.id);
          setSelectedModule(firstAccessibleModule);

          const firstContent =
            firstAccessibleModule.contents.find(
              (item) => item.type === "video" || item.content
            ) || firstAccessibleModule.contents[0];

          setSelectedItem(firstContent);
        }

        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  /* =======================
     Mark Completed
  ======================= */
  const handleCheckboxClick = (moduleId, contentId) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              contents: mod.contents.map((item) =>
                item.id === contentId
                  ? { ...item, is_completed: true }
                  : item
              ),
            }
          : mod
      ),
    }));
  };

  /* =======================
     Handle Click
  ======================= */
  const handleItemClick = (module, item) => {
    if (item.type === "pdf") {
      window.open(item.data.url, "_blank");
      return;
    }

    setSelectedModule(module);
    setSelectedItem(item);

    handleCheckboxClick(module.id, item.id);
  };

  /* =======================
     Toggle Lesson Notes
  ======================= */
  const toggleNote = (id) => {
    setOpenNoteIds((prev) =>
      prev.includes(id)
        ? prev.filter((nid) => nid !== id)
        : [...prev, id]
    );
  };

  if (loading) return <Spinner text="Loading course preview..." />;

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );

  if (!course)
    return (
      <div className="flex items-center justify-center">
        No course found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 px-4 pt-24 pb-10 mx-auto max-w-7xl lg:grid-cols-3 sm:px-6">

        {/* ================= LEFT CONTENT ================= */}
        <div className="space-y-6 lg:col-span-2">

          {/* VIDEO */}
          {selectedItem?.type === "video" && (
            <div className="w-full overflow-hidden bg-black border border-gray-200 aspect-video rounded-xl">
              <video
                src={selectedItem?.data?.url}
                controls
                className="w-full h-full"
              />
            </div>
          )}

          {/* PDF */}
          {selectedItem?.type === "pdf" && (
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl sm:p-6">
              <AiOutlineFilePdf className="text-4xl text-red-500" />

              <button
                onClick={() =>
                  window.open(selectedItem.data.url, "_blank")
                }
                className="text-[#001489] font-medium hover:underline"
              >
                Open PDF
              </button>
            </div>
          )}

          {/* LESSON NOTES */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">

            <h2 className="mb-4 text-lg font-semibold">
              Lesson Notes
            </h2>

            {selectedModule?.contents?.filter((c) => c.content)
              .length > 0 ? (
              selectedModule.contents
                .filter((c) => c.content)
                .map((item) => {
                  const isOpen = openNoteIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >

                      <button
                        onClick={() => toggleNote(item.id)}
                        className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50"
                      >
                        <span className="text-base font-medium">
                          {item.title}
                        </span>

                        {isOpen ? (
                          <FiChevronUp className="text-gray-500" />
                        ) : (
                          <FiChevronDown className="text-gray-500" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-2 pb-4 text-base prose text-gray-700 max-w-none">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
            ) : (
              <p className="italic text-gray-400">
                No lesson notes available.
              </p>
            )}
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl h-fit lg:sticky lg:top-6">

          <div className="px-4 py-3 text-lg font-semibold border-b border-gray-200">
            Module Content
          </div>

          {course.modules.map((module) => {
            const isOpen = openModule === module.id;

            const completedCount =
              module.contents?.filter((c) => c.is_completed)
                .length || 0;

            const totalCount = module.contents?.length || 0;

            return (
              <div
                key={module.id}
                className="border-b border-gray-100"
              >

                {/* MODULE HEADER */}
                <button
                  onClick={() =>
                    setOpenModule(isOpen ? null : module.id)
                  }
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col text-left">
                    <span>{module.title}</span>

                    <span className="mt-1 text-xs text-gray-500">
                      {completedCount} of {totalCount} completed
                    </span>
                  </div>

                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* MODULE BODY */}
                {isOpen && (
                  <div className="px-2 py-1 bg-white border-t border-gray-100">

                    {!module.can_access || module.contents.length === 0 ? (
                      <div
                        onClick={() => navigate("/signup")}
                        className="px-4 py-6 text-center text-gray-500 cursor-pointer hover:bg-gray-50"
                      >
                        <FiLock className="mx-auto mb-2 text-2xl text-gray-400" />

                        <p className="text-sm font-medium">
                          Register to unlock this module
                        </p>
                      </div>
                    ) : (
                      module.contents.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleItemClick(module, item)
                          }
                          className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-md hover:bg-gray-50 transition ${
                            selectedItem?.id === item.id
                              ? "bg-gray-100 font-semibold"
                              : ""
                          }`}
                        >

                          {item.type === "video" && (
                            <span className="w-3 h-3 bg-[#001489] rounded-full" />
                          )}

                          {item.type === "pdf" && (
                            <AiOutlineFilePdf className="text-[#001489]" />
                          )}

                          <input
                            type="checkbox"
                            readOnly
                            checked={item.is_completed}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckboxClick(
                                module.id,
                                item.id
                              );
                            }}
                            className="accent-[#001489]"
                          />

                          <div className="flex-1">
                            <p className="text-sm">
                              {index + 1}. {item.title}
                            </p>

                            <p className="text-xs text-gray-400 capitalize">
                              {item.type}
                            </p>
                          </div>

                          {item.is_completed && (
                            <FiCheckCircle className="text-[#001489]" />
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoTemplate;