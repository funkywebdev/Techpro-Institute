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
   Spinner Component
========================= */
const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin" />
  </div>
);

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

        const userRes = await api.get("/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser = userRes.data?.data || null;
        setUser(fetchedUser);

        const enrollmentRes = await api.get("/v1/enrollment/details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const enrolledCourse = enrollmentRes.data?.data || null;

        let courseData = null;
        if (enrolledCourse) {
          const courseRes = await api.get(
            `/v1/course-progress/${enrolledCourse.course_id}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          courseData = courseRes.data?.data || null;
        }
        setCourse(courseData);
      } catch (error) {
        if (error.response.status === 403) {
        //  console.log(error.response);
          toast.error(error.response.data.message);
          setCourse(null);
        }

        if (error.response.status === 500) {
          toast.error("Failed to load data. Try again.");
          setUser(null);
          setCourse(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spinner />;

  

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
    <div className="p-4 space-y-6 sm:p-6">
      <div className="grid items-stretch grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
        {/* ENROLLED COURSE */}
        <div className="flex flex-col cursor-pointer">
          <p className="mb-2 font-bold text-gray-800">Enrolled Courses</p>
          <Link
            to={progress === 100 ? "/certificate" : "/admincourse"}
            className="flex-1"
          >
            <div className="flex gap-4 p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
              <img
                src={safeCourse.image?.url || Rectangle4317}
                alt={safeCourse.title}
                className="object-cover w-32 h-20 rounded-md"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <p className="font-semibold text-gray-800">
                    {safeCourse.title}
                  </p>
                  <div className="w-full h-3 mt-3 bg-gray-200 rounded-full">
                    <div
                      className="bg-[#15256E] h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    {progress}% completed
                  </p>
                </div>
                <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition w-full cursor-pointer">
                  {progress === 100 ? "Print Certificate" : "Continue Learning"}
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* PROGRESS OVERVIEW */}
        <div className="flex flex-col cursor-pointer">
          <p className="mb-2 font-bold text-gray-800">Progress Overview</p>
          <div className="flex flex-1 gap-6 p-6 transition-all bg-white rounded-lg shadow-md hover:shadow-lg">
            <div className="flex flex-col items-center justify-center flex-1 gap-3 pr-4 border-r">
              <p className="font-semibold text-gray-800">{safeCourse.title}</p>
              <CircularProgress progress={progress} />
              <p className="text-sm font-medium">{safeCourse.instructor}</p>
            </div>
            {/* PERSONAL INFO */}
            <div className="flex flex-col justify-center flex-1 space-y-2 text-sm text-black">
              <p className="font-semibold text-gray-800">
                Personal Information
              </p>
              <p>
                👤 {safeUser.firstName} {safeUser.lastName}
              </p>
              <p>📧 {safeUser.email}</p>
              <p>📞 {safeUser.phone}</p>
              <p>🌍 {safeUser.region}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <Preview  course={course}/>
    </div>
  );
};

export default Home;
