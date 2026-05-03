






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



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import techprologo from "../assets/images/techprologo.png";
import api from "../api/axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await api.get("/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status) setUser(response.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate(`/landingpage#${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed z-50 w-full shadow-md backdrop-blur-md bg-white/80">
      <nav className="flex items-center justify-between h-16 px-6 py-4 mx-auto max-w-7xl sm:h-20 sm:px-8">
        {/* Logo */}
        <Link to="/landingpage">
          <img
            src={techprologo}
            alt="Logo"
            className="object-contain w-auto h-16 md:h-24"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden gap-8 md:flex md:flex-1 md:justify-center sm:gap-12">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group cursor-pointer"
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#15256E] mt-1"></span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-800 font-normal text-[18px] hover:text-[#15256E] transition relative group cursor-pointer"
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

        {/* Desktop Profile / Buttons */}
        <div className="relative items-center hidden gap-4 md:flex">
          {loadingUser ? (
            <div className="w-8 h-8 border-4 border-gray-300 border-t-[#15256E] rounded-full animate-spin"></div>
          ) : !user ? (
            <>
              <Link to="/login">
                <button className="px-5 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-normal cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition font-medium cursor-pointer">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 transition bg-gray-100 rounded-full hover:shadow-md"
              >
                <span className="w-8 h-8 bg-[#15256E] text-white rounded-full flex items-center justify-center font-medium">
                  {user.firstName[0].toUpperCase()}
                </span>
                <span className="font-medium text-gray-700">
                  {user.firstName} {user.lastName}
                </span>
                <FiChevronDown />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-50 py-2 mt-2 bg-white rounded-md shadow-lg w-44">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
        <div className="absolute left-0 w-full shadow-lg md:hidden top-full bg-white/95 backdrop-blur-md">
          <div className="flex flex-col gap-3 p-6">
            {loadingUser ? (
              <div className="flex justify-center py-4">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-[#15256E] rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* User info */}
                {user && (
                  <div className="flex items-center gap-4 pb-4 mb-4 border-b border-gray-200">
                    <div className="w-12 h-12 bg-[#15256E] text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {user.firstName[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <button
                  onClick={() => scrollToSection("hero")}
                  className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100"
                >
                  About
                </button>
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 font-medium text-left transition rounded-lg hover:bg-gray-100"
                >
                  Contact
                </Link>

                {/* Auth Buttons */}
                {!user ? (
                  <>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      <button className="w-full px-4 py-3 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">
                        Login
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)}>
                      <button className="w-full px-4 py-3 rounded-lg bg-[#15256E] text-white hover:bg-[#001489] transition font-medium">
                        Sign up
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-2 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium">
                        Dashboard
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 rounded-lg border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition font-medium"
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;





