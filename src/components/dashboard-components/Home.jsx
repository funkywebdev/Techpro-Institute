import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Rectangle4317 from "../../assets/images/Rectangle4317.png";
import Preview from "../../components/dashboard-components/Preview";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

/* =========================
   Circular Progress Component
========================= */
const CircularProgress = ({
  size = 60,
  strokeWidth = 6,
  progress = 0,
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
        className="text-xs font-semibold"
        fill={color}
      >
        {progress}%
      </text>
    </svg>
  );
};

/* =========================
   Home Component
========================= */
const Home = () => {
  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to continue");
          setLoading(false);
          return;
        }

        // 1️⃣ Fetch user data
        const userRes = await api.get("/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedUser = userRes.data?.data || null;

        // 2️⃣ Fetch enrollment details
        const enrollmentRes = await api.get("/v1/enrollment/details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const enrolledCourse = enrollmentRes.data?.data || null;

        let courseData = null;
        if (enrolledCourse) {
          const courseRes = await api.get(`/v1/course-progress/${enrolledCourse.course_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          courseData = courseRes.data?.data || null;
        }

        setUser(fetchedUser);
        setCourse(courseData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data. Try again.");
        setUser(null);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse text-center">
        Loading data...
      </div>
    );
  }

  const safeUser = user || {
    firstName: "N/A",
    lastName: "",
    email: "N/A",
    phone: "N/A",
    region: "N/A",
  };

  const safeCourse = course || {
    title: "No course enrolled",
    instructor: "N/A",
    image: null,
    course_progress_precentage: 0,
  };

  const progress = Number(safeCourse.course_progress_precentage) || 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-stretch">
        {/* ENROLLED COURSE */}
        <div className="flex flex-col">
          <p className="font-bold text-gray-800 mb-2">Enrolled Courses</p>
          <div className="bg-white shadow-md rounded-lg p-6 flex-1 flex gap-4">
            <img
              src={safeCourse.image?.url || Rectangle4317}
              alt={safeCourse.title}
              className="w-32 h-20 object-cover rounded-md"
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="font-semibold text-gray-800">{safeCourse.title}</p>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                  <div
                    className="bg-[#15256E] h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-600 mt-1">{progress}% completed</p>
              </div>

              <Link to={progress === 100 ? "/certificate" : "/admincourse"}>
                <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition whitespace-nowrap w-full">
                  {progress === 100 ? "Print Certificate" : "Continue Learning"}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* PROGRESS OVERVIEW */}
        <div className="flex flex-col">
          <p className="font-bold text-gray-800 mb-2">Progress Overview</p>
          <div className="bg-white shadow-md rounded-lg p-6 flex-1 flex gap-6">
            <div className="flex-1 flex flex-col items-center gap-3 border-r pr-4 justify-center">
              <p className="font-semibold text-gray-800">{safeCourse.title}</p>
              <CircularProgress progress={progress} />
              <p className="text-sm font-medium">{safeCourse.instructor}</p>
            </div>

            {/* PERSONAL INFO */}
            <div className="flex-1 text-sm space-y-2 flex flex-col justify-center text-black">
              <p className="font-semibold text-gray-800">Personal Information</p>
              <p>👤 {safeUser.firstName} {safeUser.lastName}</p>
              <p>📧 {safeUser.email}</p>
              <p>📞 {safeUser.phone}</p>
              <p>🌍 {safeUser.region}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <Preview />
    </div>
  );
};

export default Home;