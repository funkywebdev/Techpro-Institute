import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import { AiOutlineFilePdf, AiOutlineFileZip } from "react-icons/ai";
import api from "../../api/axios";

const Video = () => {
  const { id } = useParams();

  const [module, setModule] = useState(null);
  const [moduleResources, setModuleResources] = useState([]);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [pageUrl, setPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Reset pagination when module changes
  useEffect(() => setPageUrl(null), [id]);

  // Scroll to top when page changes
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [pageUrl]);

  // Fetch module + useful links
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = pageUrl
          ? await api.get(pageUrl)
          : await api.get(`/v1/modules/${id}`);
        const response = res.data;

        let resources = [];
        if (Array.isArray(response.data)) resources = response.data;
        else if (response.data?.data)
          resources = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];

        setModuleResources(resources);
        const moduleData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setModule(moduleData);

        setPagination(response.meta?.pagination || null);

        const linksRes = await api.get("/v1/course/useful-links");
        setUsefulLinks(linksRes.data.data || []);

        // Filter video files and sort by id
        const videoList = resources
          .filter((file) => file.type === "video")
          .sort((a, b) => a.id - b.id);

        if (videoList.length) {
          setSelectedVideo(videoList[0]); // play first video
        }
      } catch (err) {
        console.error("Error fetching module:", err);
        setError("Failed to load module content");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, pageUrl]);

  if (loading) return <p className="p-6">Loading module…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!module) return <p className="p-6">Module not found</p>;

  const pdfResources = moduleResources.filter((file) => file.type === "pdf");
  const videoResources = moduleResources
    .filter((file) => file.type === "video")
    .sort((a, b) => a.id - b.id);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="p-4 space-y-8">
        {/* VIDEO + RESOURCES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Video Player */}
          <div className="md:col-span-2 space-y-4">
            {selectedVideo ? (
              <div className="sticky top-4 bg-black rounded-md h-80 md:h-[28rem] overflow-hidden flex justify-center items-center">
                <video
                  src={selectedVideo.data.url} // Supabase video URL
                  controls
                  muted
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                  onError={(e) => console.error("Video failed to load:", e)}
                />
              </div>
            ) : (
              <p className="text-gray-500">No video available</p>
            )}

          
          </div>

          {/* PDF Resources */}
          <div className="bg-white rounded-md shadow-md p-4 max-h-[28rem] overflow-y-auto space-y-3">
            <h2 className="font-bold text-lg">Module Resources</h2>
            {pdfResources.length ? (
              pdfResources.map((file, index) => (
                <a
                  key={index}
                  href={file.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <AiOutlineFilePdf className="text-red-500" />
                  {file.title}.pdf
                </a>
              ))
            ) : (
              <p className="text-gray-500">No resources available</p>
            )}

            <button className="mt-4 w-full bg-[#15256E] text-white py-2 rounded-md hover:bg-[#0f1f5a]">
              Take Quiz
            </button>
          </div>
        </div>

        {/* Lesson Notes + Useful Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-md shadow-md p-4">
            <h2 className="font-bold text-lg mb-2">Lesson Notes</h2>
            <div
              className="max-h-[28rem] overflow-y-auto prose prose-sm"
              dangerouslySetInnerHTML={{ __html: module.content }}
            />
          </div>

          <div className="bg-white rounded-md shadow-md p-4 max-h-[32rem] overflow-y-auto space-y-2">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <FiFileText /> Useful Links
            </h2>
            {usefulLinks.length ? (
              usefulLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  download
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <AiOutlineFileZip className="text-yellow-500" />
                  {link.title}
                </a>
              ))
            ) : (
              <p className="text-gray-500">No useful links available</p>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md py-4">
          <div className="max-w-6xl mx-auto flex justify-center items-center gap-6 px-4">
            <button
              disabled={!pagination.prev_page_url}
              onClick={() => setPageUrl(pagination.prev_page_url)}
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              ← Previous
            </button>

            <span className="text-sm font-semibold text-gray-600">
              Page {pagination.current_page} of {pagination.last_page}
            </span>

            <button
              disabled={!pagination.next_page_url}
              onClick={() => setPageUrl(pagination.next_page_url)}
              className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next → 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;

