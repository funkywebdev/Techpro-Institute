
// export default Home;
import React from "react"; 
import Rectangle4317 from "../../assets/images/Rectangle4317.png";
import Preview from "../../components/dashboard-components/Preview";
import { Link } from "react-router-dom";


// Functional circular progress bar
const CircularProgress = ({
  size = 60,
  strokeWidth = 6,
  progress,
  color = "#15256E",
  bgColor = "#e5e7eb",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        stroke={bgColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-xs sm:text-sm font-semibold"
        fill={color}
      >
        {progress}%
      </text>
    </svg>
  );
};

const Home = () => {
  const linearProgress = 65;
  const circularProgress = 70;

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Grid layout: stacked on mobile, side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

        {/* Linear Progress Card */}
        <div>
          <p className="font-semibold text-gray-800 text-base md:text-lg mb-2">
            Enrolled Courses
          </p>
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 h-full">
            <img
              src={Rectangle4317}
              alt="Course"
              className="w-28 md:w-40 h-16 md:h-24 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-1 flex flex-col gap-2 w-full h-full justify-between">
              <p className="font-semibold text-gray-800 text-sm md:text-base text-center md:text-left">
                Scrum Master Certification
              </p>

              {/* Linear progress */}
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-[#15256E] h-3 rounded-full"
                  style={{ width: `${linearProgress}%` }}
                ></div>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-1 text-center md:text-left">
                {linearProgress}% completed
              </p>

              {/* Continue Learning Button */}
              <Link to="/admincourse">
              <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors self-center md:self-start">
                Continue Learning
              </button>
            </Link>
            </div>
          </div>
        </div>

        {/* Circular Progress Card */}
        <div>
          {/* Move title completely outside the card */}
          <p className="font-semibold text-gray-800 text-base md:text-lg mb-2 mt-8 sm:mt-0">
            Progress Overview
          </p>
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6 h-full">

            {/* Left Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-2 md:border-r md:border-gray-200 pr-0 md:pr-4 h-full justify-between">
              
              {/* Image for mobile only */}
              <img
                src={Rectangle4317}
                alt="Course"
                className="w-28 md:w-20 h-16 md:h-24 object-cover rounded-md flex-shrink-0 md:hidden"
              />

              <div className="flex-1 flex flex-col gap-2 items-center md:items-start">
                <p className="font-semibold text-gray-800 text-sm md:text-base text-center md:text-left">
                  Scrum Master Certification
                </p>

                <CircularProgress size={60} progress={circularProgress} />

                <p className="font-semibold text-gray-800 text-sm md:text-base text-center md:text-left">
                  Michael Scott
                </p>
              </div>
            </div>

            {/* Right Section - Personal Info */}
            <div className="flex-1 flex flex-col items-center md:items-start gap-2 mt-4 md:mt-0 h-full justify-center">
              <p className="font-semibold text-gray-800 text-sm md:text-base text-center md:text-left">
                Personal Information
              </p>
              <p className="text-sm flex items-center gap-1">👤 <span>Male</span></p>
              <p className="text-sm flex items-center gap-1">📧 <span>Email</span></p>
              <p className="text-sm flex items-center gap-1">🎂 <span>December 29</span></p>
            </div>
          </div>
        </div>
      </div>

      <Preview />
    </div>
  );
};

export default Home;
