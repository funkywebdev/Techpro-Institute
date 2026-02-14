// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// const AdminCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await api.get("v1/courses"); // your API
//         setCourses(response.data?.data || []); // fallback to empty array
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//         setCourses([]); // fallback
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) return <p className="p-4 text-gray-600">Loading courses...</p>;
//   if (!courses.length) return <p className="p-4 text-gray-600">No courses found.</p>;

//   return (
//     <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center">
//       {courses.map((course) => (
//         <div
//           key={course.id}
//           className="flex flex-col items-center justify-between h-full gap-4 p-5 bg-white rounded-xl shadow-md transition-transform hover:scale-105 w-full max-w-xs"
//         >
//           {/* Course Image */}
//           <img
//             src={course.image?.url || "https://via.placeholder.com/150"}
//             alt={course.title || "Course"}
//             className="w-32 h-24 md:w-40 md:h-24 object-cover rounded-md"
//           />

//           {/* Course Info */}
//           <div className="flex flex-col items-center w-full gap-2 mt-2">
//             <p className="text-center text-gray-800 font-semibold text-base md:text-lg">
//               {course.title || "Untitled Course"}
//             </p>

//             {/* Progress Bar */}
//             <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
//               <div
//                 className="h-3 bg-[#15256E] rounded-full transition-all"
//                 style={{ width: `${course.progress || 0}%` }}
//               ></div>
//             </div>
//             <p className="text-gray-600 text-xs md:text-sm mt-1 text-center">
//               {course.progress || 0}% completed
//             </p>

//             {/* Button */}
//             <Link to={`/preview/${course.id}`} className="w-full">
//               <button className="mt-3 w-full bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors">
//                 Continue Learning
//               </button>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminCourse;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const fetchCoursesAndProgress = async () => {
  try {
    const coursesRes = await api.get("/v1/courses");  // ✅ declared
    const progressRes = await api.get("/v1/progress"); // ✅ declared

    console.log("Progress API response:", progressRes.data);

    const progressData = progressRes.data.data || [];

    console.log("Processed progressData:", progressData);

    const coursesWithProgress = coursesRes.data.data.map(course => {
      const progress = progressData.find(p => p.course_id === course.id) || { progress: 0 };
      return { ...course, progress: progress.progress };
    });

    setCourses(coursesWithProgress);
  } catch (err) {
    console.error("Error fetching courses or progress:", err);
  }
};

    fetchCoursesAndProgress();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Loading courses...</p>;
  if (!courses.length) return <p className="p-4 text-gray-600">No courses found.</p>;

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col items-center justify-between h-full gap-4 p-5 bg-white rounded-xl shadow-md transition-transform hover:scale-105 w-full max-w-xs"
        >
          {/* Course Image */}
          <img
            src={course.image?.url || "https://via.placeholder.com/150"}
            alt={course.title || "Course"}
            className="w-32 h-24 md:w-40 md:h-24 object-cover rounded-md"
          />

          {/* Course Info */}
          <div className="flex flex-col items-center w-full gap-2 mt-2">
            <p className="text-center text-gray-800 font-semibold text-base md:text-lg">
              {course.title || "Untitled Course"}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full mt-1">
              <div
                className="h-3 bg-[#15256E] rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mt-1 text-center">
              {course.progress}% completed
            </p>

            {/* Button */}
            <Link to={`/preview/${course.id}`} className="w-full">
              <button className="mt-3 w-full bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors">
                Continue Learning
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCourse;