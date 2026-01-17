// import React, { useState } from "react";
// import image1 from "../assets/images/image1.png";
// import { NavbarMenu } from "../mockdata/data";

// import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   return (
//     <header className="relative z-50 bg-white shadow-md">
//       <nav className="flex items-center justify-between w-[92%] mx-auto  relative">
//         {/* Logo */}
//         <div>
//           <img src={image1} alt="Logo" className="h-20" />
//         </div>

//         {/* Desktop Menu (only above 900px) */}
//         <div className="hidden min-[901px]:flex gap-8 items-center">
//           {NavbarMenu.map((item) => (
//             <a
//               key={item.id}
//               href={item.link}
//               className="hover:text-[#001489] font-medium"
//             >
//               {item.title}
//             </a>
//           ))}
//         </div>

//         {/* Desktop Register Button (only above 900px) */}
//         <div className="hidden min-[901px]:block">
//           <Link to="/registration">
//             <button className="px-5 py-1 text-white rounded-md bg-[#001489]">
//               Register now
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Toggle (show <901px) */}
//         <div className="flex min-[901px]:hidden items-center">
//           <button
//             onClick={toggleMenu}
//             className="text-3xl text-black"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
//           </button>
//         </div>

//         {/* Mobile Animated Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="absolute left-0 w-full bg-white p-5 top-[60px] z-50 shadow-md min-[901px]:hidden"
//             >
//               <ul className="flex flex-col gap-6 text-black">
//                 {NavbarMenu.map((item, index) => (
//                   <motion.li
//                     key={item.id}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                   >
//                     <a
//                       href={item.link}
//                       onClick={() => setMenuOpen(false)}
//                       className="hover:text-[#001489] font-medium"
//                     >
//                       {item.title}
//                     </a>
//                   </motion.li>
//                 ))}

//                 {/* Mobile Register Button */}
//                 <motion.li
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <Link
//                     to="/registration"
//                     className="px-5 py-1 text-white rounded-md bg-[#001489] inline-block text-center"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Register now
//                   </Link>
//                 </motion.li>
//               </ul>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import image1 from "../assets/images/image1.png";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   const menuItems = [
//     { title: "Home", link: "/" },
//     { title: "Certification", link: "/certification" },
//     { title: "Contact", link: "/contact" },
//   ];

//   return (
//     <header className="bg-white shadow-md fixed w-full z-50">
//       <nav className="flex items-center justify-between w-[92%] mx-auto py-4 md:py-6">
//         {/* Logo */}
//         <div>
//           <img src={image1} alt="Logo" className="h-11 md:h-16" />
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex md:flex-1 md:justify-center gap-8  sm:gap-16 ">
//           {menuItems.map((item) => (
//             <Link
//               key={item.title}
//               to={item.link}
//               className="font-meduim hover:text-[#001489] transition text-[18px]"
//             >
//               {item.title}
//             </Link>
//           ))}
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex gap-4 items-center">
//           <Link to="/login">
//             <button className="px-4 py-2 rounded-md border border-[#001489] text-[#001489] hover:bg-[#001489] hover:text-white transition">
//               Login
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="px-4 py-2 rounded-md bg-[#001489] text-white hover:bg-[#0025c5] transition">
//               Sign up
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} aria-label="Toggle menu">
//             {menuOpen ? (
//               <IoCloseOutline size={30} />
//             ) : (
//               <IoMenuOutline size={30} />
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//     {/* Mobile Menu */}
// <AnimatePresence>
//   {menuOpen && (
//     <motion.div
//       initial={{ height: 0, opacity: 0 }}
//       animate={{ height: "auto", opacity: 1 }}
//       exit={{ height: 0, opacity: 0 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="md:hidden bg-white shadow-md overflow-hidden"
//     >
//       <div className="flex flex-col gap-4 p-4 items-start text-left">
//         {menuItems.map((item) => (
//           <Link
//             key={item.title}
//             to={item.link}
//             onClick={() => setMenuOpen(false)}
//             className="font-medium hover:text-[#001489] transition text-lg"
//           >
//             {item.title}
//           </Link>
//         ))}

//         {/* Mobile Buttons */}
//         <Link to="/login" onClick={() => setMenuOpen(false)}>
//           <button className="w-full px-4 py-2 rounded-md border border-[#15256E] text-[#15256E] hover:bg-[#15256E] hover:text-white transition">
//             Login
//           </button>
//         </Link>
//         <Link to="/signup" onClick={() => setMenuOpen(false)}>
//           <button className="w-full px-4 py-2 rounded-md bg-[#15256E] text-white hover:bg-[#15256E] transition">
//             Signup
//           </button>
//         </Link>
//       </div>
//     </motion.div>
//   )}
// </AnimatePresence>

//     </header>
//   );
// };

// export default Navbar;



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
