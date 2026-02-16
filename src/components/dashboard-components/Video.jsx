

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiCheckCircle, FiLink } from "react-icons/fi";
import api from "../../api/axios";

const Video = () => {
  const { id } = useParams();


  const [resources, setResources] = useState([]);
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

        console.log("Fetched module contents:", contents);
        setResources(contents);

        // Auto-select first video or PDF
        const first = contents.find(
          (r) => r.type === "video" || r.type === "pdf",
        );
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
    if (item.is_completed) return; // already completed

    try {
      await api.post(`/v1/module-contents/${item.id}/complete`);
      setResources((prev) =>
        prev.map((r) => (r.id === item.id ? { ...r, is_completed: true } : r)),
      );
    } catch (err) {
      console.error(`Failed to mark ${item.type} complete:`, err);
    }
  };

  // ================= PDF CLICK HANDLER =================
  const handlePdfClick = (pdf) => {
    setSelectedItem(pdf);
    if (pdf.data?.url) {
      window.open(pdf.data.url, "_blank");
    }
  };

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const videoResources = resources.filter((r) => r.type === "video");
  const pdfResources = resources.filter((r) => r.type === "pdf");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-6">
        {/* PLAYER + NOTES */}
        <div className="lg:col-span-2">
          {selectedItem?.type === "video" && (
            <div className="bg-black aspect-video">
              <video
                src={selectedItem.data.url}
                controls
                className="w-full h-full"
              />
            </div>
          )}

          {selectedItem?.type === "pdf" && (
            <div className="bg-white border p-5 h-96 flex items-center justify-center">
              <p className="text-gray-500 italic">
                PDF "{selectedItem.title}" is available to view
              </p>
            </div>
          )}

          {/* LESSON NOTES */}
          <div className="bg-white border p-5 mt-6">
            <h2 className="text-lg font-semibold mb-2">Lesson Notes</h2>
            {selectedItem?.content ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedItem.content }}
              />
            ) : (
              <p className="text-gray-400 italic">No lesson notes available.</p>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="bg-white border h-fit sticky top-6">
          <div className="px-4 py-3 font-semibold border-b">Module Content</div>

          {/* VIDEOS */}
          <div className="divide-y">
            {videoResources.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full px-4 py-3 flex gap-3 text-left hover:bg-gray-50 ${
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
            <div className="border-t p-4 space-y-2">
              <h3 className="text-sm font-semibold">Resources</h3>
              {pdfResources.map((file, index) => (
                <button
                  key={file.id}
                  onClick={() => handlePdfClick(file)}
                  className="flex items-center gap-2 text-sm hover:text-[#001489]"
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
                    <FiCheckCircle className="ml-1 text-green-400" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* USEFUL LINKS */}
          {usefulLinks.length > 0 && (
            <div className="border-t p-4 space-y-2">
              <h3 className="text-sm font-semibold">Useful Links</h3>
              {usefulLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <FiLink />
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
