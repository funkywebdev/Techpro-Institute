


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/v1/courses"); // your API
        console.log("API response:", response.data); // <- debug
        setCourses(response.data?.data || []); // fallback to empty array
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  if (!courses.length) return <p>No courses found.</p>;

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col items-center h-full gap-4 p-4 bg-white rounded-lg shadow-md sm:p-6"
        >
          <img
            src={course.image?.path || "https://via.placeholder.com/150"}
            alt={course.title || "Course"}
            className="flex-shrink-0 object-cover h-16 rounded-md w-28 md:w-40 md:h-24"
          />

          <div className="flex flex-col justify-between flex-1 w-full h-full gap-2">
            <p className="text-sm font-semibold text-center text-gray-800 md:text-base md:text-left">
              {course.title || "Untitled Course"}
            </p>

            <div className="w-full h-3 mt-2 bg-gray-200 rounded-full">
              <div
                className="bg-[#15256E] h-3 rounded-full transition-all"
                style={{ width: `${course.progress || 0}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-center text-gray-600 md:text-sm md:text-left">
              {course.progress || 0}% completed
            </p>

            <Link to={`/preview/${course.id}`}>
              <button className="mt-3 bg-[#15256E] text-white px-4 py-2 rounded-md hover:bg-[#0f1f5a] transition-colors self-center md:self-start">
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