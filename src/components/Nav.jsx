






// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
// import { FiChevronDown } from "react-icons/fi";
// import techprologo from "../assets/images/techprologo.png";
// import api from "../api/axios";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const response = await api.get("/v1/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.data.status) setUser(response.data.data);
//       } catch (err) {
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const scrollToSection = (id) => {
//     setMenuOpen(false);
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//     else navigate(`/landingpage#${id}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <header className="fixed z-50 w-full shadow-md backdrop-blur-md bg-white/80">
//       <nav className="flex items-center justify-between h-16 px-6 py-4 mx-auto max-w-7xl sm:h-20 sm:px-8">
//         {/* Logo */}
//         <Link to="/landingpage">
//           <img src={techprologo} alt="Logo" className="object-contain w-auto h-16 md:h-24" />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden gap-8 md:flex md:flex-1 md:justify-center sm:gap-12">
//           <button onClick={() => scrollToSection("hero")} className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group cursor-pointer">
//             Home
//             <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//           </button>
//           <button onClick={() => scrollToSection("about")} className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group cursor-pointer">
//             About
//             <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//           </button>
//           <Link to="/contact" className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group">
//             Contact
//             <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//           </Link>
//         </div>

//         {/* Desktop Profile / Buttons */}
//         <div className="relative items-center hidden gap-4 md:flex">
//           {!user ? (
//             <>
//               <Link to="/login">
//                 <button className="px-5 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-normal cursor-pointer">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="px-5 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium cursor-pointer">
//                   Sign up
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2 px-4 py-2 transition bg-gray-100 rounded-full hover:shadow-md"
//               >
//                 <span className="w-8 h-8 bg-[#15256E] text-white rounded-full flex items-center justify-center font-medium">
//                   {user.firstName[0].toUpperCase()}
//                 </span>
//                 <span className="font-medium text-gray-700">{user.firstName} {user.lastName}</span>
//                 <FiChevronDown />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 z-50 py-2 mt-2 bg-white rounded-md shadow-lg w-44">
//                   <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
//                   <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Logout</button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Toggle */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} aria-label="Toggle menu">
//             {menuOpen ? <IoCloseOutline size={28} className="text-gray-800" /> : <IoMenuOutline size={28} className="text-gray-800" />}
//           </button>
//         </div>
//       </nav>

//       {/* Beautiful Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute left-0 w-full shadow-lg md:hidden top-full bg-white/95 backdrop-blur-md">
//           <div className="flex flex-col gap-3 p-6">
//             {/* User info */}
//             {user && (
//               <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-200">
//                 <div className="w-12 h-12 bg-[#15256E] text-white rounded-full flex items-center justify-center font-bold text-lg">
//                   {user.firstName[0].toUpperCase()}
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
//                   <p className="text-sm text-gray-500">{user.email}</p>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Links */}
//             <button onClick={() => scrollToSection("hero")} className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100">Home</button>
//             <button onClick={() => scrollToSection("about")} className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100">About</button>
//             <Link to="/contact" onClick={() => setMenuOpen(false)} className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100">Contact</Link>

//             {/* Auth Buttons */}
//             {!user ? (
//               <>
//                 <Link to="/login" onClick={() => setMenuOpen(false)}>
//                   <button className="w-full px-4 py-3 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">Login</button>
//                 </Link>
//                 <Link to="/signup" onClick={() => setMenuOpen(false)}>
//                   <button className="w-full px-4 py-3 rounded-lg bg-[#15256E] text-white hover:bg-[#001489] transition font-medium">Sign up</button>
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
//                   <button className="w-full px-4 py-2 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">Dashboard</button>
//                 </Link>
//                 <button onClick={handleLogout} className="w-full px-4 py-2 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">Logout</button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
// import { FiChevronDown } from "react-icons/fi";
// import techprologo from "../assets/images/techprologo.png";
// import api from "../api/axios";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const navigate = useNavigate();

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const response = await api.get("/v1/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.data.status) setUser(response.data.data);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoadingUser(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   const scrollToSection = (id) => {
//     setMenuOpen(false);
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//     else navigate(`/landingpage#${id}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <header className="fixed z-50 w-full shadow-md backdrop-blur-md bg-white/80">
//       <nav className="flex items-center justify-between h-16 px-6 py-4 mx-auto max-w-7xl sm:h-20 sm:px-8">
//         {/* Logo */}
//         <Link to="/landingpage">
//           <img
//             src={techprologo}
//             alt="Logo"
//             className="object-contain w-auto h-16 md:h-24"
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden gap-8 md:flex md:flex-1 md:justify-center sm:gap-12">
//           <button
//             onClick={() => scrollToSection("hero")}
//             className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group cursor-pointer"
//           >
//             Home
//             <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//           </button>
//           <button
//             onClick={() => scrollToSection("about")}
//             className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group cursor-pointer"
//           >
//             About
//             <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//           </button>
//           <Link
//             to="/contact"
//             className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group"
//           >
//             Contact
//             <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
//           </Link>
//         </div>

//         {/* Desktop Profile / Buttons */}
//         <div className="relative items-center hidden gap-4 md:flex">
//           {loadingUser ? (
//             <div className="w-8 h-8 border-4 border-gray-300 border-t-[#15256E] rounded-full animate-spin"></div>
//           ) : !user ? (
//             <>
//               <Link to="/login">
//                 <button className="px-5 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-normal cursor-pointer">
//                   Login
//                 </button>
//               </Link>
//               <Link to="/signup">
//                 <button className="px-5 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium cursor-pointer">
//                   Sign up
//                 </button>
//               </Link>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2 px-4 py-2 transition bg-gray-100 rounded-full hover:shadow-md"
//               >
//                 <span className="w-8 h-8 bg-[#15256E] text-white rounded-full flex items-center justify-center font-medium">
//                   {user.firstName[0].toUpperCase()}
//                 </span>
//                 <span className="font-medium text-gray-700">
//                   {user.firstName} {user.lastName}
//                 </span>
//                 <FiChevronDown />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 z-50 py-2 mt-2 bg-white rounded-md shadow-lg w-44">
//                   <Link
//                     to="/dashboard"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
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
//       {menuOpen && (
//         <div className="absolute left-0 w-full shadow-lg md:hidden top-full bg-white/95 backdrop-blur-md">
//           <div className="flex flex-col gap-3 p-6">
//             {loadingUser ? (
//               <div className="flex justify-center py-4">
//                 <div className="w-8 h-8 border-4 border-gray-300 border-t-[#15256E] rounded-full animate-spin"></div>
//               </div>
//             ) : (
//               <>
//                 {/* User info */}
//                 {user && (
//                   <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-200">
//                     <div className="w-12 h-12 bg-[#15256E] text-white rounded-full flex items-center justify-center font-bold text-lg">
//                       {user.firstName[0].toUpperCase()}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {user.firstName} {user.lastName}
//                       </p>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Navigation Links */}
//                 <button
//                   onClick={() => scrollToSection("hero")}
//                   className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100"
//                 >
//                   Home
//                 </button>
//                 <button
//                   onClick={() => scrollToSection("about")}
//                   className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100"
//                 >
//                   About
//                 </button>
//                 <Link
//                   to="/contact"
//                   onClick={() => setMenuOpen(false)}
//                   className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100"
//                 >
//                   Contact
//                 </Link>

//                 {/* Auth Buttons */}
//                 {!user ? (
//                   <>
//                     <Link to="/login" onClick={() => setMenuOpen(false)}>
//                       <button className="w-full px-4 py-3 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">
//                         Login
//                       </button>
//                     </Link>
//                     <Link to="/signup" onClick={() => setMenuOpen(false)}>
//                       <button className="w-full px-4 py-3 rounded-lg bg-[#15256E] text-white hover:bg-[#001489] transition font-medium">
//                         Sign up
//                       </button>
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/dashboard"
//                       onClick={() => setMenuOpen(false)}
//                     >
//                       <button className="w-full px-4 py-2 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">
//                         Dashboard
//                       </button>
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;





import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FiChevronDown, FiGrid, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import techprologo from "../assets/images/techprologo.png";
import api from "../api/axios";

const Navbar = () => {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [user,         setUser]         = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingUser,  setLoadingUser]  = useState(true);
  const [scrolled,     setScrolled]     = useState(false);
  const dropRef  = useRef(null);
  const navigate = useNavigate();

  /* ── scroll shadow ── */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* ── fetch user ── */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setLoadingUser(false); return; }
        const res = await api.get("/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status) setUser(res.data.data);
      } catch { setUser(null); }
      finally { setLoadingUser(false); }
    })();
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate(`/landingpage#${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen((p) => !p);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .nb-wrap * { box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }

        /* shimmer accent line */
        @keyframes nb-shimmer {
          0%   { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }
        .nb-accent {
          position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 10001;
          background: linear-gradient(90deg, #15256E, #4f6efa, #a5b4fc, #4f6efa, #15256E);
          background-size: 300% 100%;
          animation: nb-shimmer 5s linear infinite;
        }

        /* nav link underline */
        .nb-navlink {
          position: relative; display: inline-flex; flex-direction: column;
          align-items: center; background: none; border: none; cursor: pointer;
          padding: 0; color: #374151; font-size: 16px; font-weight: 500;
          transition: color 0.2s;
        }
        .nb-navlink:hover { color: #15256E; }
        .nb-navlink .nb-underline {
          display: block; height: 2px; border-radius: 99px;
          background: linear-gradient(90deg, #15256E, #4f6efa);
          width: 0%; margin-top: 3px;
          transition: width 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-navlink:hover .nb-underline { width: 100%; }

        /* login outline btn */
        .nb-login {
          padding: 8px 20px; border-radius: 10px;
          border: 1.5px solid #15256E; color: #15256E;
          font-size: 14px; font-weight: 600; background: transparent;
          cursor: pointer; transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .nb-login:hover {
          background: #15256E; color: #fff;
          box-shadow: 0 4px 14px rgba(21,37,110,0.22);
        }

        /* signup solid btn */
        .nb-signup {
          padding: 8px 20px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #15256E, #2a45c8);
          color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
          box-shadow: 0 3px 12px rgba(21,37,110,0.25);
          transition: box-shadow 0.2s, transform 0.15s; white-space: nowrap;
        }
        .nb-signup:hover {
          box-shadow: 0 6px 20px rgba(21,37,110,0.35);
          transform: translateY(-1px);
        }

        /* user pill */
        .nb-user-pill {
          display: flex; align-items: center; gap: 8px;
          padding: 5px 12px 5px 5px; border-radius: 99px;
          background: #f1f5f9; border: 1.5px solid #e2e8f0;
          cursor: pointer; transition: all 0.2s;
        }
        .nb-user-pill:hover {
          background: #e8edf8; border-color: #c7d2fe;
          box-shadow: 0 2px 10px rgba(21,37,110,0.12);
        }

        /* dropdown */
        .nb-dropdown {
          position: absolute; right: 0; top: calc(100% + 10px);
          min-width: 192px; background: #fff;
          border: 1px solid #e2e8f0; border-radius: 14px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.10); overflow: hidden; z-index: 1000;
        }
        .nb-drop-user {
          padding: 12px 14px 10px; border-bottom: 1px solid #f1f5f9;
        }
        .nb-drop-item {
          display: flex; align-items: center; gap: 9px;
          width: 100%; padding: 10px 14px; font-size: 13.5px; font-weight: 500;
          color: #374151; text-decoration: none; background: none;
          border: none; cursor: pointer; text-align: left;
          transition: background 0.15s, color 0.15s;
        }
        .nb-drop-item:hover { background: #f0f2fa; color: #15256E; }
        .nb-drop-item.logout:hover { background: #fef2f2; color: #dc2626; }
        .nb-drop-divider { height: 1px; background: #f1f5f9; }

        /* mobile link */
        .nb-mlink {
          display: block; width: 100%; padding: 11px 14px;
          border-radius: 12px; font-size: 15px; font-weight: 500;
          color: #374151; text-decoration: none; background: none;
          border: none; cursor: pointer; text-align: left;
          transition: background 0.15s, color 0.15s;
        }
        .nb-mlink:hover { background: #f0f2fa; color: #15256E; }

        .nb-mbtn-outline {
          width: 100%; padding: 11px 18px; border-radius: 10px;
          border: 1.5px solid #15256E; color: #15256E;
          font-size: 14px; font-weight: 600; background: transparent;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 7px;
          transition: background 0.2s, color 0.2s;
        }
        .nb-mbtn-outline:hover { background: #15256E; color: #fff; }

        .nb-mbtn-solid {
          width: 100%; padding: 11px 18px; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #15256E, #2a45c8);
          color: #fff; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px;
          box-shadow: 0 3px 12px rgba(21,37,110,0.25);
        }

        .nb-mbtn-danger {
          width: 100%; padding: 11px 18px; border-radius: 10px;
          border: 1.5px solid #fee2e2; background: #fef2f2;
          color: #dc2626; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: background 0.2s;
        }
        .nb-mbtn-danger:hover { background: #fee2e2; }

        @keyframes nb-spin { to { transform: rotate(360deg); } }
        .nb-spin {
          width: 28px; height: 28px; border-radius: 50%;
          border: 3px solid #e2e8f0; border-top-color: #15256E;
          animation: nb-spin 0.8s linear infinite;
        }
      `}</style>

      <div className="nb-wrap">
        {/* shimmer accent */}
        <div className="nb-accent" />

        {/* ════ HEADER ════ */}
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", top: "2px", left: 0, right: 0, zIndex: 9999,
            background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.06)" : "none",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        >
          <nav style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 clamp(1rem,4vw,2.5rem)",
            height: 68,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>

            {/* Logo */}
            <Link to="/landingpage">
              <motion.img
                src={techprologo} alt="TechPro Logo"
                style={{ height: 84, width: "auto", objectFit: "contain", display: "block" }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
              />
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex md:flex-1 md:justify-center" style={{ gap: 40 }}>
              {[
                { label: "Home",    fn: () => scrollToSection("hero") },
                { label: "About",   fn: () => scrollToSection("about") },
              ].map(({ label, fn }, i) => (
                <motion.button
                  key={label}
                  onClick={fn}
                  className="nb-navlink"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  {label}
                  <span className="nb-underline" />
                </motion.button>
              ))}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.4 }}
              >
                <Link to="/contact" className="nb-navlink" style={{ textDecoration: "none" }}>
                  Contact
                  <span className="nb-underline" />
                </Link>
              </motion.span>
            </div>

            {/* ── Desktop right ── */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 12, flexShrink: 0 }}>
              {loadingUser ? (
                <div className="nb-spin" />
              ) : !user ? (
                <motion.div
                  style={{ display: "flex", gap: 10 }}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                >
                  <Link to="/login"><button className="nb-login">Login</button></Link>
                  <Link to="/signup"><button className="nb-signup">Sign up</button></Link>
                </motion.div>
              ) : (
                <div ref={dropRef} style={{ position: "relative" }}>
                  <motion.button
                    className="nb-user-pill"
                    onClick={() => setDropdownOpen((p) => !p)}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* avatar */}
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "linear-gradient(135deg,#15256E,#3b5bdb)",
                      color: "#fff", fontWeight: 700, fontSize: 13,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {user.firstName?.[0]?.toUpperCase()}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {user.firstName} {user.lastName}
                    </span>
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ display: "flex", color: "#64748b" }}
                    >
                      <FiChevronDown size={15} />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        className="nb-dropdown"
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22,1,0.36,1] }}
                      >
                        <div className="nb-drop-user">
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                            {user.firstName} {user.lastName}
                          </p>
                          <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.email}
                          </p>
                        </div>
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="nb-drop-item" style={{ display: "flex" }}>
                          <FiGrid size={14} /> Dashboard
                        </Link>
                        <div className="nb-drop-divider" />
                        <button onClick={handleLogout} className="nb-drop-item logout" style={{ color: "#dc2626" }}>
                          <FiLogOut size={14} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* ── Mobile hamburger — ONLY on mobile ── */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: menuOpen ? "#f0f2fa" : "transparent",
                  border: `1.5px solid ${menuOpen ? "#c7d2fe" : "transparent"}`,
                  color: "#374151", cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <IoCloseOutline size={24} />
                    </motion.span>
                  ) : (
                    <motion.span key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <IoMenuOutline size={24} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

          </nav>
        </motion.header>

        {/* ════ MOBILE MENU ════ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
              style={{
                position: "fixed",
                top: 70,
                left: 0, right: 0,
                zIndex: 9998,
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                borderBottom: "1px solid #e2e8f0",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ padding: "14px clamp(1rem,4vw,1.5rem) 20px", display: "flex", flexDirection: "column", gap: 4 }}>

                {loadingUser ? (
                  <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                    <div className="nb-spin" />
                  </div>
                ) : (
                  <>
                    {/* User card */}
                    {user && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03, duration: 0.28 }}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", marginBottom: 6,
                          background: "#f8fafc", border: "1px solid #e2e8f0",
                          borderRadius: 14,
                        }}
                      >
                        <div style={{
                          width: 42, height: 42, borderRadius: "50%",
                          background: "linear-gradient(135deg,#15256E,#3b5bdb)",
                          color: "#fff", fontWeight: 700, fontSize: 16,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          {user.firstName?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                            {user.firstName} {user.lastName}
                          </p>
                          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.email}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Nav links */}
                    {[
                      { label: "Home",    fn: () => scrollToSection("hero") },
                      { label: "About",   fn: () => scrollToSection("about") },
                    ].map(({ label, fn }, i) => (
                      <motion.button
                        key={label}
                        onClick={fn}
                        className="nb-mlink"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.26 }}
                      >
                        {label}
                      </motion.button>
                    ))}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.26 }}
                    >
                      <Link to="/contact" onClick={() => setMenuOpen(false)} className="nb-mlink" style={{ display: "block" }}>
                        Contact
                      </Link>
                    </motion.span>

                    {/* Divider */}
                    <div style={{ height: 1, background: "#f1f5f9", margin: "6px 0" }} />

                    {/* Auth */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.26 }}
                      style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                      {!user ? (
                        <>
                          <Link to="/login" onClick={() => setMenuOpen(false)}>
                            <button className="nb-mbtn-outline">Login</button>
                          </Link>
                          <Link to="/signup" onClick={() => setMenuOpen(false)}>
                            <button className="nb-mbtn-solid">Sign up</button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                            <button className="nb-mbtn-outline">
                              <FiGrid size={14} /> Dashboard
                            </button>
                          </Link>
                          <button onClick={handleLogout} className="nb-mbtn-danger">
                            <FiLogOut size={14} /> Logout
                          </button>
                        </>
                      )}
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;