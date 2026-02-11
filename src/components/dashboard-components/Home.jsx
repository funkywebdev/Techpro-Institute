




// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import Rectangle4317 from "../../assets/images/Rectangle4317.png";
// import Preview from "../../components/dashboard-components/Preview";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// /* ========================
//    Circular Progress
// ========================= */
// const CircularProgress = ({
//   size = 60,
//   strokeWidth = 6,
//   progress = 0,
//   color = "#15256E",
//   bgColor = "#e5e7eb",
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <svg width={size} height={size}>
//       <circle
//         stroke={bgColor}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//       />
//       <circle
//         stroke={color}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//         strokeDasharray={circumference}
//         strokeDashoffset={offset}
//         strokeLinecap="round"
//         transform={`rotate(-90 ${size / 2} ${size / 2})`}
//       />
//       <text
//         x="50%"
//         y="50%"
//         dominantBaseline="middle"
//         textAnchor="middle"
//         className="text-xs font-semibold"
//         fill={color}
//       >
//         {progress}%
//       </text>
//     </svg>
//   );
// };

// /* =========================
//    Home Component
// ========================= */
// const Home = () => {
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseProgress = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Please login to continue");
//           return;
//         }

//         const res = await api.get("/v1/course-progress/1");

//         setCourse(res.data.data);
//       } catch (error) {
//         console.error("Course progress error:", error);

//         if (error.response?.status === 403) {
//           toast.error("Unauthorized. Please login again.");
//         } else {
//           toast.error("Failed to load course progress");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseProgress();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 text-gray-500 animate-pulse">
//         Loading course progress...
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="p-6 text-red-500">
//         Unable to load course data.
//       </div>
//     );
//   }

//   const progress = Number(course.course_progress_precentage) || 0;

//   return (
//     <div className="p-4 sm:p-6 space-y-6">

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

//         {/* =====================
//            Enrolled Course
//         ===================== */}
//         <div>
//           <p className="font-bold text-gray-800 mb-2">
//             Enrolled Courses
//           </p>

//           <div className="bg-white shadow-md rounded-lg p-6 flex gap-4">
//             <img
//               src={course.image?.url || Rectangle4317}
//               alt={course.title}
//               className="w-32 h-20 object-cover rounded-md"
//             />

//             <div className="flex-1">
//               <p className="font-semibold text-gray-800">
//                 {course.title}
//               </p>

//               {/* Linear Progress */}
//               <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
//                 <div
//                   className="bg-[#15256E] h-3 rounded-full transition-all"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <p className="text-xs text-gray-600 mt-1">
//                 {progress}% completed
//               </p>


//               {/* <Link to="/admincourse">
//             <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition whitespace-nowrap">
//               Continue Learning
//             </button>
//           </Link> */}

//           {/* Button changes text based on progress */}
//             <Link to={progress === 100 ? "/certificate" : "/admincourse"}>
//               <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition whitespace-nowrap">
//                 {progress === 100 ? "Print Certificate" : "Continue Learning"}
//               </button>
//             </Link>
//             </div>
//           </div>
//         </div>

//         {/* =====================
//            Progress Overview
//         ===================== */}
//         <div>
//           <p className="font-bold text-gray-800 mb-2">
//             Progress Overview
//           </p>

//           <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">

//             <div className="flex-1 flex flex-col items-center gap-3 border-r pr-4">
//               <p className="font-semibold text-gray-800">
//                 {course.title}
//               </p>

//               <CircularProgress progress={progress} />

//               <p className="text-sm font-medium">
//                 {course.instructor || "Instructor"}
//               </p>
//             </div>

//             <div className="flex-1 text-sm space-y-2">
//               <p className="font-semibold text-gray-800">
//                 Personal Information
//               </p>
//               <p>👤 {course.student?.gender || "N/A"}</p>
//               <p>📧 {course.student?.email || "N/A"}</p>
//               <p>🎂 {course.student?.dob || "N/A"}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Preview />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import Rectangle4317 from "../../assets/images/Rectangle4317.png";
// import Preview from "../../components/dashboard-components/Preview";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// /* =========================
//    Circular Progress
// ========================= */
// const CircularProgress = ({
//   size = 60,
//   strokeWidth = 6,
//   progress = 0,
//   color = "#15256E",
//   bgColor = "#e5e7eb",
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <svg width={size} height={size}>
//       <circle
//         stroke={bgColor}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//       />
//       <circle
//         stroke={color}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//         strokeDasharray={circumference}
//         strokeDashoffset={offset}
//         strokeLinecap="round"
//         transform={`rotate(-90 ${size / 2} ${size / 2})`}
//       />
//       <text
//         x="50%"
//         y="50%"
//         dominantBaseline="middle"
//         textAnchor="middle"
//         className="text-xs font-semibold"
//         fill={color}
//       >
//         {progress}%
//       </text>
//     </svg>
//   );
// };

// /* =========================
//    Home Component
// ========================= */
// const Home = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("Please login to continue");
//           return;
//         }

//         const res = await api.get("/v1/me"); // <-- Updated endpoint
//         setUser(res.data.data); // Assuming API returns data inside `data`
//       } catch (error) {
//         console.error("User data error:", error);
//         toast.error("Failed to load user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-gray-500 animate-pulse">Loading data...</div>;
//   }

//   if (!user) {
//     return <div className="p-6 text-red-500">Unable to load user data.</div>;
//   }

//   // Assuming the user object has `course_progress_percentage` and `enrolled_course`
//   const course = user.enrolled_course || {};
//   const progress = Number(course.course_progress_percentage) || 0;

//   return (
//     <div className="p-4 sm:p-6 space-y-6">

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

//         {/* Enrolled Course */}
//         <div>
//           <p className="font-bold text-gray-800 mb-2">Enrolled Courses</p>

//           <div className="bg-white shadow-md rounded-lg p-6 flex gap-4">
//             <img
//               src={course.image?.url || Rectangle4317}
//               alt={course.title}
//               className="w-32 h-20 object-cover rounded-md"
//             />

//             <div className="flex-1">
//               <p className="font-semibold text-gray-800">{course.title}</p>

//               {/* Linear Progress */}
//               <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
//                 <div
//                   className="bg-[#15256E] h-3 rounded-full transition-all"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <p className="text-xs text-gray-600 mt-1">{progress}% completed</p>

//               {/* Button changes text based on progress */}
//               <Link to={progress === 100 ? "/certificate" : "/admincourse"}>
//                 <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition whitespace-nowrap">
//                   {progress === 100 ? "Print Certificate" : "Continue Learning"}
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Progress Overview */}
//         <div>
//           <p className="font-bold text-gray-800 mb-2">Progress Overview</p>

//           <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">

//             <div className="flex-1 flex flex-col items-center gap-3 border-r pr-4">
//               <p className="font-semibold text-gray-800">{course.title}</p>

//               <CircularProgress progress={progress} />

//               <p className="text-sm font-medium">{course.instructor || "Instructor"}</p>
//             </div>

//             <div className="flex-1 text-sm space-y-2">
//               <p className="font-semibold text-gray-800">Personal Information</p>
//               <p>👤 {user.gender || "N/A"}</p>
//               <p>📧 {user.email || "N/A"}</p>
//               <p>🎂 {user.dob || "N/A"}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Preview />
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import api from "../../api/axios";
// import Rectangle4317 from "../../assets/images/Rectangle4317.png";
// import Preview from "../../components/dashboard-components/Preview";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// /* =========================
//    Circular Progress
// ========================= */
// const CircularProgress = ({
//   size = 60,
//   strokeWidth = 6,
//   progress = 0,
//   color = "#15256E",
//   bgColor = "#e5e7eb",
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <svg width={size} height={size}>
//       <circle
//         stroke={bgColor}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//       />
//       <circle
//         stroke={color}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//         strokeDasharray={circumference}
//         strokeDashoffset={offset}
//         strokeLinecap="round"
//         transform={`rotate(-90 ${size / 2} ${size / 2})`}
//       />
//       <text
//         x="50%"
//         y="50%"
//         dominantBaseline="middle"
//         textAnchor="middle"
//         className="text-xs font-semibold"
//         fill={color}
//       >
//         {progress}%
//       </text>
//     </svg>
//   );
// };

// /* =========================
//    Home Component
// ========================= */
// const Home = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Please login to continue");
//           setLoading(false);
//           return;
//         }

//         const res = await api.get("/v1/me");
//         setUser(res.data.data); // ✅ correct mapping
//       } catch (error) {
//         console.error("User data error:", error);
//         toast.error("Failed to load user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 text-gray-500 animate-pulse">
//         Loading data...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="p-6 text-red-500">
//         Unable to load user data.
//       </div>
//     );
//   }

//   /* =========================
//      SAFE FALLBACK COURSE DATA
//      (until backend provides it)
//   ========================= */
//   const course = user.enrolled_course || {
//     title: "No course enrolled",
//     instructor: "N/A",
//     image: null,
//   };

//   const progress =
//     Number(course.course_progress_percentage) || 0;

//   return (
//     <div className="p-4 sm:p-6 space-y-6">

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

//         {/* =====================
//             ENROLLED COURSE
//         ====================== */}
//         <div>
//           <p className="font-bold text-gray-800 mb-2">
//             Enrolled Courses
//           </p>

//           <div className="bg-white shadow-md rounded-lg p-6 flex gap-4">
//             <img
//               src={course.image?.url || Rectangle4317}
//               alt={course.title}
//               className="w-32 h-20 object-cover rounded-md"
//             />

//             <div className="flex-1">
//               <p className="font-semibold text-gray-800">
//                 {course.title}
//               </p>

//               {/* Linear Progress */}
//               <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
//                 <div
//                   className="bg-[#15256E] h-3 rounded-full transition-all"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <p className="text-xs text-gray-600 mt-1">
//                 {progress}% completed
//               </p>

//               <Link
//                 to={progress === 100 ? "/certificate" : "/admincourse"}
//               >
//                 <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition whitespace-nowrap">
//                   {progress === 100
//                     ? "Print Certificate"
//                     : "Continue Learning"}
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* =====================
//             PROGRESS OVERVIEW
//         ====================== */}
//         <div>
//           <p className="font-bold text-gray-800 mb-2">
//             Progress Overview
//           </p>

//           <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">

//             <div className="flex-1 flex flex-col items-center gap-3 border-r pr-4">
//               <p className="font-semibold text-gray-800">
//                 {course.title}
//               </p>

//               <CircularProgress progress={progress} />

//               <p className="text-sm font-medium">
//                 {course.instructor}
//               </p>
//             </div>

//             {/* =====================
//                 PERSONAL INFO
//             ====================== */}
//             <div className="flex-1 text-sm space-y-2">
//               <p className="font-semibold text-gray-800">
//                 Personal Information
//               </p>
//               <p>👤 {user.firstName} {user.lastName}</p>
//               <p>📧 {user.email}</p>
//               <p>📞 {user.phone}</p>
//               <p>🌍 {user.region}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Preview />
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Rectangle4317 from "../../assets/images/Rectangle4317.png";
import Preview from "../../components/dashboard-components/Preview";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

/* =========================
   Circular Progress
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

  /* =========================
     FETCH USER DATA
  ========================= */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login to continue");
          return;
        }

        const res = await api.get("/v1/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("User data error:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  /* =========================
     FETCH COURSE PROGRESS
  ========================= */
  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login to continue");
          return;
        }

        const res = await api.get("/v1/course-progress/1");
        setCourse(res.data.data);
      } catch (error) {
        console.error("Course progress error:", error);

        if (error.response?.status === 403) {
          toast.error("Unauthorized. Please login again.");
        } else {
          toast.error("Failed to load course progress");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Loading data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-red-500">
        Unable to load user data.
      </div>
    );
  }

  
  const safeCourse = course || {
  title: "No course enrolled",
  instructor: "N/A",
  image: null,
  course_progress_precentage: 0,
};


  const progress =
  Number(safeCourse.course_progress_precentage) || 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">

        {/* ENROLLED COURSE */}
        <div>
          <p className="font-bold text-gray-800 mb-2">
            Enrolled Courses
          </p>

          <div className="bg-white shadow-md rounded-lg p-6 flex gap-4">
            <img
              src={safeCourse.image?.url || Rectangle4317}
              alt={safeCourse.title}
              className="w-32 h-20 object-cover rounded-md"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-800">
                {safeCourse.title}
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div
                  className="bg-[#15256E] h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-xs text-gray-600 mt-1">
                {progress}% completed
              </p>

              <Link
                to={progress === 100 ? "/certificate" : "/admincourse"}
              >
                <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded hover:bg-[#0f1f5a] transition whitespace-nowrap">
                  {progress === 100
                    ? "Print Certificate"
                    : "Continue Learning"}
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* PROGRESS OVERVIEW */}
        <div>
          <p className="font-bold text-gray-800 mb-2">
            Progress Overview
          </p>

          <div className="bg-white shadow-md rounded-lg p-6 flex gap-6">

            <div className="flex-1 flex flex-col items-center gap-3 border-r pr-4">
              <p className="font-semibold text-gray-800">
                {safeCourse.title}
              </p>

              <CircularProgress progress={progress} />

              <p className="text-sm font-medium">
                {safeCourse.instructor}
              </p>
            </div>

            {/* PERSONAL INFO */}
            <div className="flex-1 text-sm space-y-2">
              <p className="font-semibold text-gray-800">
                Personal Information
              </p>
              <p>👤 {user.firstName} {user.lastName}</p>
              <p>📧 {user.email}</p>
              <p>📞 {user.phone}</p>
              <p>🌍 {user.region}</p>
            </div>
          </div>
        </div>
      </div>

      <Preview />
    </div>
  );
};

export default Home;