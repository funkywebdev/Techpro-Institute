import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import techprologo from "../../assets/images/techprologo.png";
import api from "../../api/axios";
import { MdDashboard, MdSchool, MdPayment, MdCardMembership, MdLogout } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student info
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/v1/me");
        if (res.data?.status && res.data.data) {
          setStudent(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching student info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "My Courses", icon: <MdSchool />, path: "/admincourse" },
    { name: "Available Courses", icon: <MdSchool />, path: "/available-courses" },
    { name: "Payments", icon: <MdPayment />, path: "/adminpayments" },
    { name: "Certificates", icon: <MdCardMembership />, path: "/certificate" },
  ];

  const menuItemClass =
    "flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl transition-all duration-200 w-full max-w-[200px] cursor-pointer md:hover:bg-[#F81C0D] md:hover:text-white";
  const iconSize = "text-lg sm:text-xl";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-56 sm:w-64 min-h-screen bg-[#111827] text-gray-200 flex flex-col items-center py-5">
      
      {/* Logo / Profile */}
      <div className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 border-b border-gray-600 w-full text-center">
        <img
          src={techprologo}
          alt="TechPro Logo"
          className="w-28 sm:w-40 rounded-full mb-4"
        />

        {/* Profile picture or blank rounded circle */}
        {student?.profilePicture?.url ? (
          <img
            src={student.profilePicture.url}
            alt="Profile"
            className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover mb-2 -translate-x-12 sm:-translate-7"
          />
        ) : (
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gray-700 mb-2 -translate-x-12 sm:-translate-7" />
        )}

        {/* Student Name */}
        <p className="text-xs sm:text-sm text-white font-normal -translate-x-12 sm:-translate-7">
          {loading
            ? "Loading..."
            : student
            ? `${student.firstName} ${student.lastName}`
            : ""}
        </p>
      </div>

      {/* Menu */}
      <ul className="flex-1 flex flex-col items-center px-2 sm:px-4 py-2 sm:py-4 space-y-5 sm:space-y-3 w-full">
        {menuItems.map((item) => (
          <li key={item.name} className="w-full flex justify-center">
            <Link
              to={item.path}
              className={`${menuItemClass} ${
                location.pathname === item.path ? "bg-[#F81C0D] text-white" : "text-white"
              }`}
            >
              <span className={`${iconSize} shrink-0`}>{item.icon}</span>
              <span className="text-xs sm:text-sm">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="w-full py-3 sm:py-4 border-t border-gray-600 flex justify-center">
        <div
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-red-400 transition-all duration-200 w-full max-w-[200px] cursor-pointer md:hover:bg-red-500 md:hover:text-white active:bg-red-500 active:text-white"
          onClick={handleLogout}
        >
          <MdLogout className={`${iconSize}`} />
          <span className="text-xs sm:text-sm">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
