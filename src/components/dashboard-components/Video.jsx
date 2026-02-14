


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FiCheckCircle, FiFileText, FiLink } from "react-icons/fi";
// import { AiOutlineFilePdf } from "react-icons/ai";
// import api from "../../api/axios";

// const Video = () => {
//   const { id } = useParams();

//   const [module, setModule] = useState(null);
//   const [moduleResources, setModuleResources] = useState([]);
//   const [usefulLinks, setUsefulLinks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [completedVideos, setCompletedVideos] = useState({});
//   const [moduleProgress, setModuleProgress] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // MODULE DATA
//         const res = await api.get(`/v1/modules/${id}`);
//         const resources = res.data?.data || [];

//         setModule(res.data);
//         setModuleResources(resources);

//         // ✅ USEFUL LINKS (MODULE LEVEL)
//         const linksRes = await api.get(`/v1/course/useful-links`);
//         setUsefulLinks(linksRes.data?.data || []);

//         // MODULE PROGRESS
//         const progressRes = await api.get(`/v1/module-progress/${id}`);
//         setModuleProgress(
//           progressRes.data?.data?.module_progress_percentage || 0
//         );

//         // AUTO SELECT FIRST VIDEO
//         const videos = resources
//           .filter((r) => r.type === "video")
//           .sort((a, b) => a.id - b.id);

//         if (videos.length) setSelectedVideo(videos[0]);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load module");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) return <p className="p-6">Loading…</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   const videoResources = moduleResources
//     .filter((r) => r.type === "video")
//     .sort((a, b) => a.id - b.id);

//   const pdfResources = moduleResources.filter((r) => r.type === "pdf");

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* ===== HEADER ===== */}
//       <div className="bg-[#1c1d1f] text-white">
//         <div className="px-4 py-4 mx-auto max-w-7xl">
//           <h1 className="text-lg font-semibold">{module?.title}</h1>

//           <div className="flex items-center gap-3 mt-2">
//             <div className="w-48 h-2 bg-gray-700 rounded-full">
//               <div
//                 className="h-2 bg-[#a435f0] rounded-full"
//                 style={{ width: `${moduleProgress}%` }}
//               />
//             </div>
//             <span className="text-sm text-gray-300">
//               {moduleProgress}% complete
//             </span>

//             {moduleProgress === 100 && (
//               <span className="flex items-center gap-1 ml-2 text-sm text-green-400">
//                 <FiCheckCircle /> Completed
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ===== MAIN ===== */}
//       <div className="grid grid-cols-1 gap-6 px-4 py-6 mx-auto max-w-7xl lg:grid-cols-3">
//         {/* VIDEO PLAYER */}
//         <div className="lg:col-span-2">
//           {selectedVideo ? (
//             <div className="overflow-hidden bg-black aspect-video">
//               <video
//                 src={selectedVideo.data.url}
//                 controls
//                 className="w-full h-full"
//                 onEnded={() =>
//                   setCompletedVideos((prev) => ({
//                     ...prev,
//                     [selectedVideo.id]: true,
//                   }))
//                 }
//               />
//             </div>
//           ) : (
//             <p>No video selected</p>
//           )}

//           {/* NOTES */}
//           <div className="p-5 mt-6 bg-white border">
//             <h2 className="mb-2 text-lg font-semibold">Lesson Notes</h2>
//             <div
//               className="prose-sm prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: module?.content }}
//             />
//           </div>
//         </div>

//         {/* ===== SIDEBAR ===== */}
//         <div className="sticky bg-white border h-fit top-6">
//           <div className="px-4 py-3 font-semibold border-b">
//             Module Content
//           </div>

//           {/* VIDEOS */}
//           <div className="divide-y">
//             {videoResources.map((video, index) => (
//               <button
//                 key={video.id}
//                 onClick={() => setSelectedVideo(video)}
//                 className={`w-full px-4 py-3 flex gap-3 text-left hover:bg-gray-50 ${
//                   selectedVideo?.id === video.id ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   readOnly
//                   checked={!!completedVideos[video.id]}
//                   className="mt-1 accent-[#a435f0]"
//                 />
//                 <div>
//                   <p className="text-sm font-medium">
//                     {index + 1}. {video.title}
//                   </p>
//                   <p className="text-xs text-gray-500">Video lesson</p>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* RESOURCES */}
//           {pdfResources.length > 0 && (
//             <div className="p-4 space-y-2 border-t">
//               <h3 className="text-sm font-semibold">Resources</h3>
//               {pdfResources.map((file) => (
//                 <a
//                   key={file.id}
//                   href={file.data.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-purple-600"
//                 >
//                   <AiOutlineFilePdf className="text-red-500" />
//                   {file.title}
//                 </a>
//               ))}
//             </div>
//           )}

//           {/* ✅ USEFUL LINKS */}
//           {usefulLinks.length > 0 && (
//             <div className="p-4 space-y-2 border-t">
//               <h3 className="text-sm font-semibold">Useful Links</h3>

//               {usefulLinks.map((link) => (
//                 <a
//                   key={link.id}
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
//                 >
//                   <FiLink />
//                   {link.title}
//                 </a>
//               ))}
//             </div>
//           )}

//           {/* QUIZ */}
//           <div className="p-4 border-t">
//             <button
//               disabled={
//                 videoResources.length !==
//                 Object.keys(completedVideos).length
//               }
//               className={`w-full py-2 text-sm font-semibold ${
//                 videoResources.length ===
//                 Object.keys(completedVideos).length
//                   ? "bg-[#a435f0] text-white hover:bg-purple-700"
//                   : "bg-gray-300 cursor-not-allowed"
//               }`}
//             >
//               Take Quiz
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FiCheckCircle, FiLink } from "react-icons/fi";
// import { AiOutlineFilePdf } from "react-icons/ai";
// import api from "../../api/axios";

// const Video = () => {
//   const { id } = useParams();

//   const [module, setModule] = useState(null);
//   const [moduleResources, setModuleResources] = useState([]);
//   const [usefulLinks, setUsefulLinks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [completedVideos, setCompletedVideos] = useState({});
//   const [moduleProgress, setModuleProgress] = useState(0);

//   // Fetch module data, resources, links, and progress
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // MODULE DATA
//         const res = await api.get(`/v1/modules/${id}`);
//         const resources = res.data?.data || [];

//         setModule(res.data);
//         setModuleResources(resources);

//         // USEFUL LINKS
//         const linksRes = await api.get(`/v1/course/useful-links`);
//         setUsefulLinks(linksRes.data?.data || []);

//         // COURSE PROGRESS
//         const progressRes = await api.get(`/v1/course-progress/${id}`);
//         setModuleProgress(progressRes.data?.data?.course_progress_precentage || 0);

//         // AUTO SELECT FIRST VIDEO
//         const videos = resources.filter((r) => r.type === "video").sort((a, b) => a.id - b.id);
//         if (videos.length) setSelectedVideo(videos[0]);

//       } catch (err) {
//         console.error(err);
//         setError("Failed to load module");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (loading) return <p className="p-6">Loading…</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   const videoResources = moduleResources.filter((r) => r.type === "video").sort((a, b) => a.id - b.id);
//   const pdfResources = moduleResources.filter((r) => r.type === "pdf");

//   // Handle video completion
//   const handleVideoEnd = async () => {
//     if (!selectedVideo) return;

//     const videoId = selectedVideo.id;

//     // Update completedVideos state
//     const updatedCompletedVideos = { ...completedVideos, [videoId]: true };
//     setCompletedVideos(updatedCompletedVideos);

//     // Calculate progress %
//     const totalVideos = videoResources.length;
//     const completedCount = Object.keys(updatedCompletedVideos).length;
//     const newProgress = Math.round((completedCount / totalVideos) * 100);
//     setModuleProgress(newProgress);

//     // Send progress to backend
//     try {
//       await api.post(`/v1/course-progress/${id}`, {
//         resource_id: videoId,
//         type: "video",
//         completed: true,
//       });
//     } catch (err) {
//       console.error("Failed to update progress:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* HEADER */}
//       <div className="bg-[#1c1d1f] text-white">
//         <div className="px-4 py-4 mx-auto max-w-7xl">
//           <h1 className="text-lg font-semibold">{module?.title}</h1>

//           <div className="flex items-center gap-3 mt-2">
//             <div className="w-48 h-2 bg-gray-700 rounded-full">
//               <div
//                 className="h-2 bg-[#a435f0] rounded-full"
//                 style={{ width: `${moduleProgress}%` }}
//               />
//             </div>
//             <span className="text-sm text-gray-300">{moduleProgress}% complete</span>

//             {moduleProgress === 100 && (
//               <span className="flex items-center gap-1 ml-2 text-sm text-green-400">
//                 <FiCheckCircle /> Completed
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="grid grid-cols-1 gap-6 px-4 py-6 mx-auto max-w-7xl lg:grid-cols-3">
//         {/* VIDEO PLAYER */}
//         <div className="lg:col-span-2">
//           {selectedVideo ? (
//             <div className="overflow-hidden bg-black aspect-video">
//               <video
//                 src={selectedVideo.data.url}
//                 controls
//                 className="w-full h-full"
//                 onEnded={handleVideoEnd}
//               />
//             </div>
//           ) : (
//             <p>No video selected</p>
//           )}

//           {/* NOTES */}
//           <div className="p-5 mt-6 bg-white border">
//             <h2 className="mb-2 text-lg font-semibold">Lesson Notes</h2>
//             <div
//               className="prose-sm prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: module?.content }}
//             />
//           </div>
//         </div>

//         {/* SIDEBAR */}
//         <div className="sticky bg-white border h-fit top-6">
//           <div className="px-4 py-3 font-semibold border-b">Module Content</div>

//           {/* VIDEOS */}
//           <div className="divide-y">
//             {videoResources.map((video, index) => (
//               <button
//                 key={video.id}
//                 onClick={() => setSelectedVideo(video)}
//                 className={`w-full px-4 py-3 flex gap-3 text-left hover:bg-gray-50 ${
//                   selectedVideo?.id === video.id ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   readOnly
//                   checked={!!completedVideos[video.id]}
//                   className="mt-1 accent-[#a435f0]"
//                 />
//                 <div>
//                   <p className="text-sm font-medium">{index + 1}. {video.title}</p>
//                   <p className="text-xs text-gray-500">Video lesson</p>
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* RESOURCES */}
//           {pdfResources.length > 0 && (
//             <div className="p-4 space-y-2 border-t">
//               <h3 className="text-sm font-semibold">Resources</h3>
//               {pdfResources.map((file) => (
//                 <a
//                   key={file.id}
//                   href={file.data.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm hover:text-purple-600"
//                 >
//                   <AiOutlineFilePdf className="text-red-500" />
//                   {file.title}
//                 </a>
//               ))}
//             </div>
//           )}

//           {/* USEFUL LINKS */}
//           {usefulLinks.length > 0 && (
//             <div className="p-4 space-y-2 border-t">
//               <h3 className="text-sm font-semibold">Useful Links</h3>
//               {usefulLinks.map((link) => (
//                 <a
//                   key={link.id}
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
//                 >
//                   <FiLink />
//                   {link.title}
//                 </a>
//               ))}
//             </div>
//           )}

//           {/* QUIZ */}
//           <div className="p-4 border-t">
//             <button
//               disabled={videoResources.length !== Object.keys(completedVideos).length}
//               className={`w-full py-2 text-sm font-semibold ${
//                 videoResources.length === Object.keys(completedVideos).length
//                   ? "bg-[#a435f0] text-white hover:bg-purple-700"
//                   : "bg-gray-300 cursor-not-allowed"
//               }`}
//             >
//               Take Quiz
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCheckCircle, FiFileText, FiLink } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import api from "../../api/axios";

const Video = () => {
  const { id } = useParams();

  const [module, setModule] = useState(null);
  const [moduleResources, setModuleResources] = useState([]);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState({});
  const [currentVideoProgress, setCurrentVideoProgress] = useState(0); // live progress of current video
  const [moduleProgress, setModuleProgress] = useState(0); // total module progress

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // MODULE DATA
        const res = await api.get(`/v1/modules/${id}`);
        const resources = res.data?.data || [];

        setModule(res.data);
        setModuleResources(resources);

        // USEFUL LINKS
        const linksRes = await api.get(`/v1/course/useful-links`);
        setUsefulLinks(linksRes.data?.data || []);

        // AUTO SELECT FIRST VIDEO
        const videos = resources
          .filter((r) => r.type === "video")
          .sort((a, b) => a.id - b.id);
        if (videos.length) setSelectedVideo(videos[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to load module");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Update module progress whenever completed videos or current video progress changes
    const totalVideos = moduleResources.filter((r) => r.type === "video").length;
    const completedCount = Object.keys(completedVideos).length;
    const currentPercent = currentVideoProgress / 100;
    const newProgress = Math.round(((completedCount + currentPercent) / totalVideos) * 100);
    setModuleProgress(newProgress);
  }, [completedVideos, currentVideoProgress, moduleResources]);

  if (loading) return <p className="p-6">Loading…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const videoResources = moduleResources
    .filter((r) => r.type === "video")
    .sort((a, b) => a.id - b.id);
  const pdfResources = moduleResources.filter((r) => r.type === "pdf");

  // VIDEO EVENTS
  const handleTimeUpdate = (e) => {
    const video = e.target;
    const progressPercent = Math.floor((video.currentTime / video.duration) * 100);
    setCurrentVideoProgress(progressPercent);
  };

  const handleVideoEnd = () => {
    if (selectedVideo) {
      setCompletedVideos((prev) => ({
        ...prev,
        [selectedVideo.id]: true,
      }));
      setCurrentVideoProgress(0); // reset current video progress for next video
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-[#1c1d1f] text-white">
        <div className="px-4 py-4 mx-auto max-w-7xl">
          <h1 className="text-lg font-semibold">{module?.title}</h1>

          <div className="flex items-center gap-3 mt-2">
            <div className="w-48 h-2 bg-gray-700 rounded-full">
              <div
                className="h-2 bg-[#a435f0] rounded-full"
                style={{ width: `${moduleProgress}%` }}
              />
            </div>
            <span className="text-sm text-gray-300">{moduleProgress}% complete</span>

            {moduleProgress === 100 && (
              <span className="flex items-center gap-1 ml-2 text-sm text-green-400">
                <FiCheckCircle /> Completed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-6 px-4 py-6 mx-auto max-w-7xl lg:grid-cols-3">
        {/* VIDEO PLAYER */}
        <div className="lg:col-span-2">
          {selectedVideo ? (
            <div className="overflow-hidden bg-black aspect-video">
              <video
                src={selectedVideo.data.url}
                controls
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
              />
            </div>
          ) : (
            <p>No video selected</p>
          )}

          {/* NOTES */}
          <div className="p-5 mt-6 bg-white border">
            <h2 className="mb-2 text-lg font-semibold">Lesson Notes</h2>
            <div
              className="prose-sm prose max-w-none"
              dangerouslySetInnerHTML={{ __html: module?.content }}
            />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="sticky bg-white border h-fit top-6">
          <div className="px-4 py-3 font-semibold border-b">Module Content</div>

          {/* VIDEOS */}
          <div className="divide-y">
            {videoResources.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`w-full px-4 py-3 flex gap-3 text-left hover:bg-gray-50 ${
                  selectedVideo?.id === video.id ? "bg-gray-100" : ""
                }`}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={!!completedVideos[video.id]}
                  className="mt-1 accent-[#a435f0]"
                />
                <div>
                  <p className="text-sm font-medium">
                    {index + 1}. {video.title}
                  </p>
                  <p className="text-xs text-gray-500">Video lesson</p>
                </div>
              </button>
            ))}
          </div>

          {/* RESOURCES */}
          {pdfResources.length > 0 && (
            <div className="p-4 space-y-2 border-t">
              <h3 className="text-sm font-semibold">Resources</h3>
              {pdfResources.map((file) => (
                <a
                  key={file.id}
                  href={file.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-purple-600"
                >
                  <AiOutlineFilePdf className="text-red-500" />
                  {file.title}
                </a>
              ))}
            </div>
          )}

          {/* USEFUL LINKS */}
          {usefulLinks.length > 0 && (
            <div className="p-4 space-y-2 border-t">
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

          {/* QUIZ */}
          <div className="p-4 border-t">
            <button
              disabled={videoResources.length !== Object.keys(completedVideos).length}
              className={`w-full py-2 text-sm font-semibold ${
                videoResources.length === Object.keys(completedVideos).length
                  ? "bg-[#a435f0] text-white hover:bg-purple-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;