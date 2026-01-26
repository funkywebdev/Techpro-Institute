import React from "react";
import { useLocation } from "react-router-dom";
import { FiFileText } from "react-icons/fi";
import { AiOutlineFilePdf, AiOutlineFileZip } from "react-icons/ai";

const Video = () => {
  // Get the video URL passed from Preview page
  const location = useLocation();
  const videoUrl =
    location.state?.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  return (
    <div className="p-4 space-y-6 min-h-screen bg-gray-50">
      {/* Video + Module Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Video Section */}
        <div className="md:col-span-2">
          <div className="sticky top-4 bg-gray-200 rounded-md flex items-center justify-center h-80 md:h-[28rem]">
            <iframe
              src={videoUrl}
              title="Video Player"
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>
        </div>

        {/* Module Resources */}
        <div className="space-y-4 p-4 bg-white rounded-md shadow-md max-h-[28rem] overflow-y-auto">
          <h1 className="text-lg font-bold mb-2">Module Resources</h1>
          <a
            href="/files/Course_Overview.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <AiOutlineFilePdf className="text-red-500" /> Course Overview.pdf
          </a>
          <a
            href="/files/Scrum_Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <AiOutlineFilePdf className="text-red-500" /> Scrum_Guide.pdf
          </a>
          <button className="mt-4 bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors w-full">
            Take Quiz
          </button>
        </div>
      </div>

      {/* Lesson Notes + Useful Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lesson Notes */}
        <div className="space-y-2 p-4 bg-white rounded-md shadow-md max-h-[32rem] overflow-y-auto">
          <h1 className="font-bold text-lg mb-2">Lesson Notes</h1>
          <p>Overview of the Course</p>
          <p>Keep Concept Introduced</p>
          <p>Requirement to get Started</p>
          <p>Scrum History and Background</p>
          <p className="text-blue-600 cursor-pointer hover:underline">
            Read full notes
          </p>
        </div>

        {/* Useful Links */}
        <div className="space-y-2 p-4 bg-white rounded-md shadow-md max-h-[32rem] overflow-y-auto">
          <h1 className="text-lg font-bold mb-2 flex items-center gap-2">
            <FiFileText /> Useful Links
          </h1>

          <a
            href="/files/Scrum_Guide_Officials.zip"
            download
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <AiOutlineFileZip className="text-yellow-500" /> Scrum_Guide(Officials).zip
          </a>

          <a
            href="/files/Agile_Manifesto.zip"
            download
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <AiOutlineFileZip className="text-yellow-500" /> Agile Manifesto.zip
          </a>

          <a
            href="/files/Recommended_Reading.zip"
            download
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <AiOutlineFileZip className="text-yellow-500" /> Recommended Reading.zip
          </a>
        </div>
      </div>
    </div>
  );
};

export default Video;
