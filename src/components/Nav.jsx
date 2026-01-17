



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/images/image1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Certification", link: "/certification" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50 sm:px-8">
      <nav className="flex items-center justify-between w-[92%] mx-auto py-4">
        {/* Logo */}
        <div>
          <img src={image1} alt="Logo" className="h-8 md:h-10" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-1 md:justify-center gap-8 sm:gap-12">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="font-normal hover:text-[#001489] transition text-[18px]"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/login">
            <button className="px-4 py-2 rounded-md border border-[#001489] text-[#001489] hover:bg-[#001489] hover:text-white transition font-medium">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 rounded-md bg-[#001489] text-white hover:bg-[#0025c5] transition font-medium">
              Sign up
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? (
              <IoCloseOutline size={28} className="text-gray-800" />
            ) : (
              <IoMenuOutline size={28} className="text-gray-800" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-6 p-6 items-start text-left">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-gray-800 hover:text-[#001489] transition text-lg"
                >
                  {item.title}
                </Link>
              ))}

              {/* Mobile Buttons */}
              <div className="flex flex-col w-full gap-3 mt-4">
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-4 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium">
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
