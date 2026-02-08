// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
// import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import techprologo from "../assets/images/techprologo.png";


// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const menuItems = [
//     { title: "Home", link: "/landingpage", isScroll: true },
//     { title: "About", link: "#about", isScroll: true },
//     { title: "Contact", link: "/contact", isScroll: false },
//   ];

//   const handleHomeClick = () => {
//     setMenuOpen(false);
//     if (location.pathname === "/landingpage" || location.pathname === "/") {
//       // Scroll to Hero if already on landing page
//       document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
//     } else {
//       // Navigate back to landing page
//       navigate("/landingpage");
//     }
//   };

//   return (
//     <header className="fixed w-full z-50 backdrop-blur-md bg-white/80 shadow-md">
//       <nav className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6 sm:px-8">
//         {/* Logo */}
//         <Link to="/landingpage">
//           <img src={techprologo} alt="Logo" className="h-10 md:h-12" />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex md:flex-1 md:justify-center gap-8 sm:gap-12">
//           {menuItems.map((item) =>
//             item.isScroll ? (
//               <button
//                 key={item.title}
//                 onClick={handleHomeClick}
//                 className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group"
//               >
//                 {item.title}
//                 <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//               </button>
//             ) : (
//               <Link
//                 key={item.title}
//                 to={item.link}
//                 className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group"
//               >
//                 {item.title}
//                 <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//               </Link>
//             )
//           )}
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex gap-4 items-center">
//           <Link to="/login">
//             <button className="px-5 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#001489] hover:text-white transition font-normal">
//               Login
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="px-5 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium">
//               Sign up
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} aria-label="Toggle menu">
//             {menuOpen ? (
//               <IoCloseOutline size={28} className="text-gray-800" />
//             ) : (
//               <IoMenuOutline size={28} className="text-gray-800" />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="md:hidden bg-white/95 shadow-lg backdrop-blur-md w-full absolute top-full left-0 overflow-hidden"
//           >
//             <div className="flex flex-col gap-6 p-6 items-start text-left">
//               {menuItems.map((item) =>
//                 item.isScroll ? (
//                   <button
//                     key={item.title}
//                     onClick={handleHomeClick}
//                     className="font-medium text-gray-800 hover:text-[#001489] transition text-lg"
//                   >
//                     {item.title}
//                   </button>
//                 ) : (
//                   <Link
//                     key={item.title}
//                     to={item.link}
//                     onClick={() => setMenuOpen(false)}
//                     className="font-medium text-gray-800 hover:text-[#001489] transition text-lg"
//                   >
//                     {item.title}
//                   </Link>
//                 )
//               )}

//               {/* Mobile Buttons */}
//               <div className="flex flex-col w-full gap-3 mt-4">
//                 <Link to="/login" onClick={() => setMenuOpen(false)}>
//                   <button className="w-full px-4 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">
//                     Login
//                   </button>
//                 </Link>
//                 <Link to="/signup" onClick={() => setMenuOpen(false)}>
//                   <button className="w-full px-4 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium">
//                     Signup
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import techprologo from "../assets/images/techprologo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Scroll helper
  const scrollToSection = (id) => {
    setMenuOpen(false); // close mobile menu
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/landingpage#${id}`);
    }
  };

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-white/80 shadow-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6 sm:px-8">
        {/* Logo */}
        <Link to="/landingpage">
          <img src={techprologo} alt="Logo" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-1 md:justify-center gap-8 sm:gap-12">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group"
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group"
          >
            About
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
          </button>
          <Link
            to="/contact"
            className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group"
          >
            Contact
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/login">
            <button className="px-5 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-normal">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-5 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium">
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
      {menuOpen && (
        <div className="md:hidden bg-white/95 shadow-lg backdrop-blur-md w-full absolute top-full left-0 overflow-hidden">
          <div className="flex flex-col gap-6 p-6 items-start text-left">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-medium text-gray-800 hover:text-[#001489] transition text-lg"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="font-medium text-gray-800 hover:text-[#001489] transition text-lg"
            >
              About
            </button>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-800 hover:text-[#001489] transition text-lg"
            >
              Contact
            </Link>

            {/* Mobile Login/Signup */}
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
        </div>
      )}
    </header>
  );
};

export default Navbar;