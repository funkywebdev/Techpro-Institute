


import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiCheckCircle, FiLink } from "react-icons/fi";
import api from "../../api/axios";

const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [showFullNote, setShowFullNote] = useState(false);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH MODULE DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch module contents
        const res = await api.get(`/v1/modules/${id}`);
        const contents = res.data.data || [];
        setResources(contents);

        // Auto-select first video or PDF
        const first = contents.find((r) => r.type === "video" || r.type === "pdf");
        if (first) setSelectedItem(first);

        // Fetch useful links
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

  // ================= MARK ITEM COMPLETE =================
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

  // ================= PDF CLICK HANDLER =================
  const handlePdfClick = (pdf) => {
    setSelectedItem(pdf);
    if (pdf.data?.url) {
      // Open PDF in new tab
      window.open(pdf.data.url, "_blank");
      // Auto-mark PDF complete
      handleCheckboxClick(pdf);
    }
  };

  // ================= QUIZ BUTTON LOGIC =================
  const allCompleted = resources.every((r) => r.is_completed);

  const goToQuiz = () => {
    if (!allCompleted) return;
    navigate(`/quiz/${id}`);
  };

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const videoResources = resources.filter((r) => r.type === "video");
  const pdfResources = resources.filter((r) => r.type === "pdf");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 sm:px-4 py-6">
        {/* PLAYER + NOTES */}
        <div className="lg:col-span-2">
          {selectedItem?.type === "video" && (
            <div className="bg-black aspect-video">
              <video
                src={selectedItem.data.url}
                controls
                className="w-full h-full"
                onEnded={() => handleCheckboxClick(selectedItem)} // auto-mark video complete
              />
            </div>
          )}

          {selectedItem?.type === "pdf" && (
            <div className="bg-white border  p-5 h-96 flex items-center justify-center">
              <p className="text-gray-500 italic">
                PDF "{selectedItem.title}" is available to view
              </p>
            </div>
          )}

  <div className="bg-white border border-gray-300 rounded-xl p-6 mt-6 shadow-md">
  <div className="flex items-center justify-between mb-3">
    <h2 className="text-lg font-semibold text-black">
      Lesson Notes
    </h2>

    {selectedItem?.content && (
      <button
        onClick={() => setShowFullNote(!showFullNote)}
        className="text-sm font-medium text-[#001489] hover:underline"
      >
        {showFullNote ? "Read less" : "Read more"}
      </button>
    )}
  </div>

  {selectedItem?.content ? (
    <div
      className={`relative prose prose-sm max-w-none text-black transition-all duration-300 ${
        showFullNote ? "max-h-full" : "max-h-40 overflow-hidden"
      }`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: selectedItem.content }}
      />

      {/* Fade effect when collapsed */}
      {!showFullNote && (
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
      )}
    </div>
  ) : (
    <p className="text-gray-400 italic">
      No lesson notes available for this lesson.
    </p>
  )}
</div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white border border-gray-300 h-fit sticky top-6 flex flex-col">
          <div className="px-4 py-3 text-black font-semibold border-b border-gray-300">Module Content</div>

          {/* VIDEOS */}
          <div className="divide-y">
            {videoResources.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full px-4 py-3 flex gap-3 text-left text-black hover:bg-gray-50 ${
                  selectedItem?.id === item.id ? "bg-gray-100" : ""
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
                  <p className="text-sm font-medium">
                    {index + 1}. {item.title}
                  </p>
                  <p className="text-xs text-gray-500">Video lesson</p>
                </div>
              </button>
            ))}
          </div>

          {/* PDFs */}
          {pdfResources.length > 0 && (
            <div className="border-t border-gray-300 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-black">Resources</h3>
              {pdfResources.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => handlePdfClick(file)}
                  className="flex items-center gap-2 text-sm hover:text-[#001489] text-black"
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={file.is_completed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCheckboxClick(file);
                    }}
                    className="accent-[#001489]"
                  />
                  <AiOutlineFilePdf className="text-[#001489]" />
                  {file.title}
                  {file.is_completed && (
                    <FiCheckCircle className="ml-1 text-[#001489]]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* USEFUL LINKS */}
          {usefulLinks.length > 0 && (
            <div className="border-t border-gray-300 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-black">Useful Links</h3>
              {usefulLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#001489] hover:underline"
                >
                  <FiLink />
                  {link.title}
                </a>
              ))}
            </div>
          )}

          {/* QUIZ BUTTON */}
          <div className="p-4 border-t border-gray-300 mt-4">
            <button
              onClick={goToQuiz}
              disabled={!allCompleted}
              className={`w-full py-2 text-white font-semibold rounded-lg transition ${
                allCompleted
                  ? "bg-[#001489] hover:bg-[#000f5a]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
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
