import React from "react";
import Rectangle3 from "../../assets/images/Rectangle3.png";
import { FiSettings, FiBell } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar bg-white border-b border-[#DFE6F4]  px-3 sm:px-4 flex justify-between items-center">
      
      {/* Left section */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>

        {/* Text smaller on mobile */}
        <h1 className="text-sm sm:text-2xl font-bold truncate">
          Welcome back, Michael 👋
        </h1>
      </div>

      {/* Right section (unchanged on large screens) */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="btn btn-ghost btn-circle">
          <FiBell className="w-5 h-5" />
        </button>

        <button className="btn btn-ghost btn-circle">
          <FiSettings className="w-5 h-5" />
        </button>

        <img
          src={Rectangle3}
          alt="Profile"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
