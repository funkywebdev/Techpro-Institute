import React from "react";
import Rectangle4317 from "../../assets/images/Rectangle4317.png"; // Replace with your course image
import { Link } from "react-router-dom";

const AdminCourse = () => {
  // Example progress value
  const linearProgress = 65; // you can make this dynamic per course

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 h-full">
        {/* Course Image */}
        <img
          src={Rectangle4317}
          alt="Course"
          className="w-28 md:w-40 h-16 md:h-24 object-cover rounded-md flex-shrink-0"
        />

        {/* Course Info */}
        <div className="flex-1 flex flex-col gap-2 w-full h-full justify-between">
          <p className="font-semibold text-gray-800 text-sm md:text-base text-center md:text-left">
            Scrum Master Certification
          </p>

          {/* Linear Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div
              className="bg-[#15256E] h-3 rounded-full transition-all"
              style={{ width: `${linearProgress}%` }}
            ></div>
          </div>
          <p className="text-xs md:text-sm text-gray-600 mt-1 text-center md:text-left">
            {linearProgress}% completed
          </p>

          {/* Continue Learning Button */}
          
          <Link to="/Preview">
          <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors self-center md:self-start">
            Continue Learning
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;

