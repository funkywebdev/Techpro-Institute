import React from "react";
import Navbar from "../../components/dashboard-components/Navbar";
import Sidebar from "../../components/dashboard-components/Sidebar";
import AvailableCourses from "../../components/dashboard-components/AvailableCourses";

const AvailableCoursesPage = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {/* You can replace Dashboard component with any page content */}
          <AvailableCourses />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default AvailableCoursesPage;
