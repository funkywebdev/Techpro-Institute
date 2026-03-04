import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiCheckCircle, FiLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import api from "../../api/axios";

const COMPLETED_KEY = "completedModules";

// Helpers for module completion
const getCompletedModules = () =>
  JSON.parse(localStorage.getItem(COMPLETED_KEY)) || [];

const markModuleCompleted = (moduleId) => {
  const completed = getCompletedModules();
  if (!completed.includes(moduleId)) {
    localStorage.setItem(
      COMPLETED_KEY,
      JSON.stringify([...completed, moduleId])
    );
  }
};

const Video = () => {
  const { id } = useParams();

  console.log(id);
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [showFullNote, setShowFullNote] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Accordion state
  const [openSection, setOpenSection] = useState("videos"); // "videos", "pdfs", "links"

  // ================= FETCH MODULE DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/modules/${id}`);
        const contents = res.data.data || [];


      console.log("Module Data:", contents); // ← LOG EVERYTHING

        setResources(contents);

        const first = contents.find((r) => r.type === "video");
        if (first) setSelectedItem(first);

        const linksRes = await api.get(`/v1/course/useful-links`);
        setUsefulLinks(linksRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching module data:", err);
        setError("Failed to load module content");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ================= MARK LESSON COMPLETE =================
  const handleCheckboxClick = async (item) => {
    if (item.is_completed) return;
    try {
      await api.post(`/v1/module-contents/${item.id}/complete`);
      setResources((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, is_completed: true } : r))
      );
    } catch (err) {
      console.error(`Failed to mark ${item.type} complete:`, err);
    }
  };

  const handlePdfClick = (pdf) => {
    if (pdf.data?.url) {
      window.open(pdf.data.url, "_blank");
      handleCheckboxClick(pdf);
    }
  };

  useEffect(() => {
    if (resources.length > 0 && resources.every(r => r.is_completed)) {
      markModuleCompleted(Number(id));
    }
  }, [resources, id]);

  const allCompleted = resources.every((r) => r.is_completed);
  const goToQuiz = () => {
    if (!allCompleted) return;
    navigate(`/quiz/${id}`);
  };

  
  if (loading)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

if (error)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-red-500 font-semibold text-sm sm:text-base">{error}</p>
    </div>
  );

  const videoResources = resources.filter((r) => r.type === "video");
  const pdfResources = resources.filter((r) => r.type === "pdf");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 sm:px-4 py-6">
        {/* PLAYER + LESSON NOTES */}
        <div className="lg:col-span-2">
          {selectedItem?.type === "video" && (
            <div className="bg-black aspect-video">
              <video
                src={selectedItem.data.url}
                controls
                className="w-full h-full"
                onEnded={() => handleCheckboxClick(selectedItem)}
              />
            </div>
          )}

<div className="bg-white border border-gray-300 rounded-xl p-6 mt-6 shadow-md">
  <h2 className="text-lg font-semibold text-black mb-4">Lesson Notes</h2>

  {resources.length === 0 && (
    <p className="text-gray-400 italic">No lesson notes available.</p>
  )}

  {resources.map((item) => (
    <div key={item.id} className="border-b border-gray-200">
      <button
        onClick={() =>
          setOpenNoteId(openNoteId === item.id ? null : item.id)
        }
        className="w-full flex justify-between items-center py-3 text-left font-medium text-black hover:bg-gray-50 transition"
      >
        <span>{item.title}</span>
        {openNoteId === item.id ? (
          <FiChevronUp className="text-gray-600" />
        ) : (
          <FiChevronDown className="text-gray-600" />
        )}
      </button>

      {openNoteId === item.id && item.content && (
        <div
          className="prose prose-sm max-w-none text-black p-4 transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      )}

      {openNoteId === item.id && !item.content && (
        <p className="p-4 text-gray-500 italic">No notes for this lesson.</p>
      )}
    </div>
  ))}
</div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white border border-gray-300 h-fit sticky top-6 flex flex-col">
          <div className="px-4 py-3 text-black font-semibold border-b border-gray-300">
            Module Content
          </div>

          {/* ACCORDION SECTIONS */}
          {/* VIDEOS */}
          <div className="border-b border-gray-300">
            <button
              onClick={() => toggleSection("videos")}
              className="w-full px-4 py-3 flex justify-between items-center text-black font-medium hover:bg-gray-50"
            >
              Videos
              {openSection === "videos" ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {openSection === "videos" && (
              <div className="divide-y">
                {videoResources.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full px-4 py-3 flex gap-3 text-left text-black hover:bg-gray-50 ${selectedItem?.id === item.id ? "bg-gray-100" : ""}`}
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
                      <p className="text-sm font-medium">{index + 1}. {item.title}</p>
                      <p className="text-xs text-gray-500">Video lesson</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PDF RESOURCES */}
          {pdfResources.length > 0 && (
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleSection("pdfs")}
                className="w-full px-4 py-3 flex justify-between items-center text-black font-medium hover:bg-gray-50"
              >
                Resources
                {openSection === "pdfs" ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSection === "pdfs" && (
                <div className="p-4 space-y-2">
                  {pdfResources.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => handlePdfClick(file)}
                      className="flex items-center gap-2 text-sm hover:text-[#001489] text-black"
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={file.is_completed}
                        onClick={(e) => { e.stopPropagation(); handleCheckboxClick(file); }}
                        className="accent-[#001489]"
                      />
                      <AiOutlineFilePdf className="text-[#001489]" />
                      {file.title}
                      {file.is_completed && <FiCheckCircle className="ml-1 text-[#001489]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* USEFUL LINKS */}
          {usefulLinks.length > 0 && (
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleSection("links")}
                className="w-full px-4 py-3 flex justify-between items-center text-black font-medium hover:bg-gray-50"
              >
                Useful Links
                {openSection === "links" ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {openSection === "links" && (
                <div className="p-4 space-y-2">
                  {usefulLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#001489] hover:underline"
                    >
                      <FiLink /> {link.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* QUIZ BUTTON */}
          <div className="p-4  border-gray-300 mt-4">
            <button
              onClick={goToQuiz}
              disabled={!allCompleted}
              className={`w-full py-2 text-white font-semibold rounded-lg transition ${allCompleted ? "bg-[#001489] hover:bg-[#000f5a]" : "bg-gray-300 cursor-not-allowed"}`}
            >
              {allCompleted ? "Take Quiz" : "Complete all lessons to unlock Quiz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;