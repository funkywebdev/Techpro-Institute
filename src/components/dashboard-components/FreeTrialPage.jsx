



import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiCheckCircle, FiLock, FiChevronDown } from "react-icons/fi";
import api from "../../api/axios";

/* =======================
   Spinner Component
======================= */
const Spinner = ({ text = "Loading…" }) => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="w-10 h-10 border-4 border-[#001489]/50 border-t-[#001489] rounded-full animate-spin" />
    {text && <p className="mt-2 text-gray-600">{text}</p>}
  </div>
);

const VideoTemplate = () => {
  const [course, setCourse] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullNote, setShowFullNote] = useState(false);
  const [openModule, setOpenModule] = useState(null);

  // ================= FETCH COURSE PREVIEW =================
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await api.get("/v1/courses/scrum-master/preview");
        const courseData = res?.data?.data;

        if (!courseData) throw new Error("Invalid course data");

        setCourse(courseData);

        // Auto open first accessible module
        const firstAccessibleModule = courseData?.modules?.find(
          (mod) => mod?.can_access && mod?.contents?.length > 0
        );

        if (firstAccessibleModule) {
          setOpenModule(firstAccessibleModule.id);
          setSelectedItem(firstAccessibleModule.contents[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load course preview.");
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  // ================= MARK AS COMPLETED =================
  const handleCheckboxClick = (moduleId, contentId) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev?.modules?.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              contents: mod?.contents?.map((item) =>
                item.id === contentId ? { ...item, is_completed: true } : item
              ),
            }
          : mod
      ),
    }));
  };

  // ================= PDF CLICK HANDLER =================
  const handlePdfClick = (item) => {
    if (item?.data?.url) {
      window.open(item.data.url, "_blank");
      const moduleId = course?.modules?.find((mod) =>
        mod.contents.find((c) => c.id === item.id)
      )?.id;
      if (moduleId) handleCheckboxClick(moduleId, item.id);
    }
  };

  // ================= LOADING =================
  if (loading) return <Spinner text="Loading course preview..." />;

  // ================= ERROR =================
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  // ================= NO COURSE =================
  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No course found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 sm:px-4 py-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2">
          {/* VIDEO */}
          {selectedItem?.type === "video" && (
            <div className="bg-black aspect-video rounded-xl overflow-hidden border border-gray-200">
              <video src={selectedItem?.data?.url} controls className="w-full h-full" />
            </div>
          )}

          {/* LESSON NOTES */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">Lesson Notes</h2>
              {selectedItem?.content && (
                <button
                  onClick={() => setShowFullNote(!showFullNote)}
                  className="text-sm text-[#001489] hover:underline"
                >
                  {showFullNote ? "Read less" : "Read more"}
                </button>
              )}
            </div>

            {selectedItem?.content ? (
              <div
                className={`relative transition-all duration-300 ${
                  showFullNote ? "max-h-full" : "max-h-40 overflow-hidden"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
                {!showFullNote && (
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
            ) : (
              <p className="text-gray-400 italic">No lesson notes available.</p>
            )}
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="bg-white border border-gray-200 rounded-xl h-fit sticky top-6 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 font-semibold">Module Content</div>

          {course?.modules?.length === 0 && (
            <p className="p-4 text-sm text-gray-400">No modules available.</p>
          )}

          {course?.modules?.map((module) => {
            const isOpen = openModule === module.id;
            return (
              <div key={module.id} className="border-b border-gray-200">

                {/* MODULE HEADER */}
                <button
                  onClick={() => setOpenModule(isOpen ? null : module.id)}
                  className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center text-sm font-medium hover:bg-gray-100"
                >
                  <span>{module.title}</span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* MODULE BODY */}
                {isOpen && (
                  <div className="bg-white">
                    {(!module.can_access || module?.contents?.length === 0) && (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <FiLock className="mx-auto text-2xl mb-2 text-gray-400" />
                        <p className="text-sm font-medium">Kindly unlock module</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Kindly unlock to have module content
                        </p>
                      </div>
                    )}

                    {module.can_access &&
                      module?.contents?.length > 0 &&
                      module.contents.map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            if (item.type === "pdf") handlePdfClick(item);
                            else setSelectedItem(item);
                          }}
                          className={`w-full px-4 py-3 flex gap-3 text-left hover:bg-gray-50 border-b border-gray-100 ${
                            selectedItem?.id === item.id ? "bg-gray-100" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            readOnly
                            checked={item.is_completed}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckboxClick(module.id, item.id);
                            }}
                            className="mt-1 accent-[#001489]"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {index + 1}. {item.title}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                          </div>

                          {item.is_completed && <FiCheckCircle className="text-[#001489]" />}
                        </button>
                      ))}
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