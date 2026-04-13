

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import {
  FiCheckCircle,
  FiLink,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import api from "../../api/axios";
import { toast } from "react-toastify";

const COMPLETED_KEY = "completedModules";

const getCompletedModules = () =>
  JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];
const markModuleCompleted = (moduleId) => {
  const completed = getCompletedModules();
  if (!completed.includes(moduleId)) {
    localStorage.setItem(
      COMPLETED_KEY,
      JSON.stringify([...completed, moduleId]),
    );
  }
};

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bestAttempt, setBestAttempt] = useState(null);
  const [loadingBest, setLoadingBest] = useState(false);
  const [openSection, setOpenSection] = useState("videos");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/modules/${id}`);
        const contents = res.data.data || [];
        setResources(contents);

        const firstVideo = contents.find((r) => r.type === "video");
        if (firstVideo) setSelectedItem(firstVideo);

        const linksRes = await api.get(`/v1/course/useful-links`);

        setUsefulLinks(linksRes.data?.data || []);
      } catch (err) {
        console.error(err.response);
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCheckboxClick = async (item) => {
    if (item.is_completed) return;
    try {
      await api.post(`/v1/module-contents/${item.id}/complete`);
      setResources((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, is_completed: true } : r)),
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark lesson complete");
    }
  };

  const handlePdfClick = (pdf) => {
    if (pdf.data?.url) {
      window.open(pdf.data.url, "_blank");
      handleCheckboxClick(pdf);
    }
  };

  useEffect(() => {
    if (resources.length > 0 && resources.every((r) => r.is_completed)) {
      markModuleCompleted(Number(id));
    }
  }, [resources, id]);

  const allCompleted = resources.every((r) => r.is_completed);
  const completionPercent = Math.round(
    (resources.filter((r) => r.is_completed).length / resources.length) * 100,
  );

  const goToQuiz = () => {
    if (!allCompleted) return;
    navigate(`/quiz/${id}`);
  };

  const viewBestAttempt = async () => {
    setLoadingBest(true);
    try {
      const res = await api.get(`/v1/quiz/${id}/score`);
      if (res.data.status) {
        setBestAttempt(res.data.data);
        setShowModal(true);
        toast.success("Best attempt fetched!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch best attempt");
    } finally {
      setLoadingBest(false);
    }
  };

  const toggleSection = (section) =>
    setOpenSection(openSection === section ? null : section);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm font-semibold text-red-500">{error}</p>
      </div>
    );

  const videoResources = resources.filter((r) => r.type === "video");
  const pdfResources = resources.filter((r) => r.type === "pdf");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="gap-6 px-2 py-6 mx-auto max-w-7xl lg:grid lg:grid-cols-3">
        {/* LEFT: Video + Lesson Notes */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video */}
          {selectedItem?.type === "video" && (
            <div className="overflow-hidden bg-black shadow-md aspect-video rounded-xl">
              <video
                src={selectedItem.data.url}
                controls
                className="w-full h-full"
                onEnded={() => handleCheckboxClick(selectedItem)}
              />
            </div>
          )}

          {/* Lesson Notes */}
          <div className="p-6 mb-4 bg-white border border-gray-300 shadow-md rounded-xl sm:mb-0">
            <h2 className="mb-4 text-lg font-semibold text-black">
              Lesson Notes
            </h2>
            {resources.length === 0 && (
              <p className="italic text-gray-400">No lesson notes available.</p>
            )}

            {resources.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-none"
              >
                <button
                  onClick={() => {
                    const newOpenId = openNoteId === item.id ? null : item.id;
                    setOpenNoteId(newOpenId);
                    if (newOpenId && !item.is_completed)
                      handleCheckboxClick(item);
                    setSelectedItem(
                      item.type === "video" ? item : selectedItem,
                    );
                  }}
                  className={`flex items-center justify-between w-full py-3 font-medium text-left text-black transition hover:bg-gray-50 ${
                    selectedItem?.id === item.id ? "bg-gray-100 rounded-md" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.is_completed && (
                      <FiCheckCircle className="text-[#001489] animate-pulse" />
                    )}
                    {item.title}
                  </span>
                  {openNoteId === item.id ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openNoteId === item.id ? "max-h-fit mt-2" : "max-h-0"
                  }`}
                >
                  {item.content && (
                    <div
                      className="max-w-full p-4 overflow-x-auto text-gray-800 whitespace-pre"
                      style={{ wordBreak: "normal" }}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}
                  {!item.content && openNoteId === item.id && (
                    <p className="p-4 italic text-gray-500">
                      No notes for this lesson.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Sidebar */}

        <div className="flex flex-col p-4 space-y-4 bg-white border border-gray-300 shadow-md rounded-xl h-fit">
          <div className="pb-2 mb-2 font-semibold text-black border-b border-gray-300">
            Module Content
          </div>

          <div className="border-b border-gray-200">
            <button
              onClick={() => toggleSection("videos")}
              className="flex items-center justify-between w-full py-3 font-medium text-black hover:bg-gray-50"
            >
              Videos
              {openSection === "videos" ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openSection === "videos" ? "max-h-screen" : "max-h-0"}`}
            >
              {videoResources.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full flex gap-3 items-start text-left text-black hover:bg-gray-50 rounded-md transition-colors py-2 px-2 mb-2 ${
                    selectedItem?.id === item.id
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={item.is_completed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckboxClick(item);
                    }}
                    className="mt-1 accent-[#001489]"
                  />
                  <div>
                    <p className="text-sm">
                      {idx + 1}. {item.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Video lesson</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {pdfResources.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("pdfs")}
                className="flex items-center justify-between w-full py-2 font-medium text-black hover:bg-gray-50"
              >
                Resources
                {openSection === "pdfs" ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openSection === "pdfs" ? "max-h-screen" : "max-h-0"}`}
              >
               


{pdfResources.map((file) => (
  <div
    key={file.id}
    className="flex items-center justify-between w-full px-3 py-3 mb-2 transition-all border border-transparent rounded-lg group hover:border-gray-200 hover:bg-gray-50"
  >
    {/* LEFT SIDE */}
    <button
      onClick={() => handlePdfClick(file)}
      className="flex items-center flex-1 gap-3 text-sm text-left text-gray-800"
    >
      <input
        type="checkbox"
        readOnly
        checked={file.is_completed}
        onClick={(e) => {
          e.stopPropagation();
          handleCheckboxClick(file);
        }}
        className="accent-[#001489] w-4 h-4"
      />

      <AiOutlineFilePdf className="text-[#001489] text-lg shrink-0" />

      <div className="flex flex-col">
        <span className="font-medium leading-tight">
          {file.title}
        </span>
        <span className="text-[11px] text-gray-500">
          PDF Resource
        </span>
      </div>

      {file.is_completed && (
        <FiCheckCircle className="ml-2 text-[#001489] text-sm" />
      )}
    </button>

{file.is_completed && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/content/quiz/${file.id}`, {
        state: { resourceId: file.id },
      });
    }}
    className="ml-3 px-2.5 py-1 text-[11px] font-medium text-[#001489] border border-[#001489]/40 rounded-md 
               hover:bg-[#001489] hover:text-white hover:border-[#001489] transition
               opacity-80 group-hover:opacity-100"
  >
    Quiz
  </button>
)}
  </div>
))}
              </div>
            </div>
          )}

          {usefulLinks.length > 0 && (
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("links")}
                className="flex items-center justify-between w-full py-3 font-medium text-black hover:bg-gray-50"
              >
                Useful Links
                {openSection === "links" ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openSection === "links" ? "max-h-screen" : "max-h-0"}`}
              >
                {usefulLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#001489] hover:underline py-2 px-2 mb-2 rounded-md hover:bg-gray-50 transition"
                  >
                    <FiLink /> <span>{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Actions */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={goToQuiz}
              disabled={!allCompleted}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition text-center ${
                allCompleted
                  ? "bg-[#001489] hover:bg-[#000f5a] text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
              }`}
            >
              {allCompleted ? " Module Quiz" : "Complete all lessons"}
            </button>

            <button
              onClick={viewBestAttempt}
              disabled={loadingBest}
              className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border border-[#001489] text-[#001489] hover:bg-[#001489] hover:text-white transition"
            >
              {loadingBest ? "Loading..." : "View Attempt"}
            </button>
          </div>
        </div>
      </div>

      {showModal && bestAttempt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-11/12 max-w-md p-6 bg-white shadow-lg rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute text-2xl font-bold text-gray-500 top-3 right-3 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="mb-4 text-xl font-semibold">Best Attempt</h2>
            <p>
              <strong>Score:</strong> {bestAttempt.score}
            </p>
            <p>
              <strong>Percentage:</strong> {bestAttempt.percentage}%
            </p>
            <p>{bestAttempt.passed ? "✅ Passed" : "❌ Failed"}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 bg-[#001489] text-white rounded-lg hover:bg-[#000f5a] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;




