


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// const AdminCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await api.get("/v1/enrollment/details");
//         console.log("Enrollment API response:", res.data);

//         const enrollment = res.data.data;

//         if (!enrollment || !enrollment.course) {
//           setCourses([]);
//           setLoading(false);
//           return;
//         }

//         // Wrap enrollment in an array for future-proofing multiple enrollments
//         const coursesArray = Array.isArray(enrollment) ? enrollment : [enrollment];

//         const coursesWithProgress = coursesArray.map((enroll) => ({
//           id: enroll.course.id,
//           title: enroll.course.title,
//           image: enroll.course.image,
//           progress: Number(enroll.progress) || 0,
//         }));

//         setCourses(coursesWithProgress);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading)
//     return <p className="p-4 text-gray-600">Loading courses...</p>;
//   if (!courses.length)
//     return <p className="p-4 text-gray-600">No courses found.</p>;

//   return (
//     <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
//                 style={{ width: `${course.progress}%` }}
//               ></div>
//             </div>
//             <p className="text-gray-600 text-xs md:text-sm mt-1 text-center">
//               {course.progress}% completed
//             </p>

//             {/* Button */}
//             <Link
//               to={course.progress === 100 ? "/certificate" : `/preview/${course.id}`}
//               className="w-full"
//             >
//               <button className="mt-3 w-full bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors">
//                 {course.progress === 100 ? "Print Certificate" : "Continue Learning"}
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
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [freeTrialCourses, setFreeTrialCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch enrolled courses
        const enrollmentRes = await api.get("/v1/enrollment/details");
        const enrollmentData = enrollmentRes.data?.data;

        if (enrollmentData) {
          const enrollments = Array.isArray(enrollmentData)
            ? enrollmentData
            : [enrollmentData];

          const formattedEnrolled = enrollments.map((enroll) => ({
            id: enroll.course.id,
            slug: enroll.course.slug,
            title: enroll.course.title,
            image: enroll.course.image,
            progress: Number(enroll.progress) || 0,
          }));

          setEnrolledCourses(formattedEnrolled);
        }

        // 2️⃣ Fetch FREE TRIAL course manually
        const previewRes = await api.get(
          "/v1/courses/scrum-master/preview"
        );

        if (previewRes.data?.data?.preview_mode) {
          setFreeTrialCourses([previewRes.data.data]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="p-4 text-gray-600">Loading courses...</p>;

  return (
    <div className="p-6 space-y-10">

      {/* ================= FREE TRIAL SECTION ================= */}
      {freeTrialCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-700">
           Free Trial Courses
          </h2>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {freeTrialCourses.map((course) => (
              <div
                key={course.id}
                className="bg-green-50 border border-green-200 p-5 rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                <img
                  src={course.image?.url}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-lg text-gray-800">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {course.description}
                </p>

                <Link
                  to={`/courses/${course.slug}/preview`}
                  className="block mt-4"
                >
                  <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ENROLLED COURSES ================= */}
      {enrolledCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#15256E]">
           My Courses
          </h2>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                <img
                  src={course.image?.url}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                <h3 className="font-semibold text-lg text-gray-800">
                  {course.title}
                </h3>

                <div className="w-full h-3 bg-gray-200 rounded-full mt-4">
                  <div
                    className="h-3 bg-[#15256E] rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {course.progress}% completed
                </p>

                <Link
                  to={
                    course.progress === 100
                      ? "/certificate"
                      : `/preview/${course.slug}`
                  }
                  className="block mt-4"
                >
                  <button className="w-full bg-[#15256E] text-white py-2 rounded-md hover:bg-[#0f1f5a] transition-colors">
                    {course.progress === 100
                      ? "Print Certificate"
                      : "Continue Learning"}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourse;