




// import React from "react";
// import Rectangle3 from "../../assets/images/Rectangle3.png";
// import techprologo from "../../assets/images/techprologo.png";

// import {
//   MdDashboard,
//   MdSchool,
//   MdPayment,
//   MdPerson,
//   MdCardMembership,
//   MdLogout,
// } from "react-icons/md";

// const Sidebar = () => {
//   // FIX: fixed inner width so all items align perfectly
//   const menuItem =
//     "flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 hover:bg-[#F81C0D] hover:text-white w-full max-w-[200px]";

//   return (
//     <aside className="w-64 min-h-screen bg-[#111827] text-gray-200 flex flex-col items-center">
//       {/* Logo / Profile Section */}
//       <div className="flex flex-col items-center gap-3 py-6 border-b border-white/10 w-full text-center">
//         <img
//           src={techprologo}
//           alt="TechPro Logo"
//           className="w-40 rounded-full -translate-x-1"
//         />

//         <img
//           src={Rectangle3}
//           alt="Profile"
//           className="w-20 h-20 rounded-full object-cover -translate-x-7"
//         />

//         <p className="text-sm text-white font-medium -translate-x-7">
//           Michael Scott
//         </p>
//       </div>

//       {/* Menu */}
//       <ul className="flex-1 flex flex-col items-center px-4 py-6 space-y-3 w-full">
//         <li className="w-full flex justify-center">
//           <a className={`${menuItem} bg-white/10 text-white`}>
//             <MdDashboard size={22} />
//             <span className="text-sm">Dashboard</span>
//           </a>
//         </li>

//         <li className="w-full flex justify-center">
//           <a className={menuItem}>
//             <MdSchool size={22} />
//             <span className="text-sm">My Courses</span>
//           </a>
//         </li>

//         <li className="w-full flex justify-center">
//           <a className={menuItem}>
//             <MdPayment size={22} />
//             <span className="text-sm">Payments</span>
//           </a>
//         </li>

//         <li className="w-full flex justify-center">
//           <a className={menuItem}>
//             <MdPerson size={22} />
//             <span className="text-sm">Profile</span>
//           </a>
//         </li>

//         <li className="w-full flex justify-center">
//           <a className={menuItem}>
//             <MdCardMembership size={22} />
//             <span className="text-sm">Certificates</span>
//           </a>
//         </li>
//       </ul>

//       {/* Logout */}
//       <div className="w-full py-6 border-t border-white/10 flex justify-center">
//         <a className="flex items-center gap-3 px-5 py-3 rounded-xl text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 w-full max-w-[200px]">
//           <MdLogout size={22} />
//           <span className="text-sm">Logout</span>
//         </a>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;






// import React, { useState } from "react";
// import Rectangle3 from "../../assets/images/Rectangle3.png";
// import techprologo from "../../assets/images/techprologo.png";

// import {
//   MdDashboard,
//   MdSchool,
//   MdPayment,
//   MdPerson,
//   MdCardMembership,
//   MdLogout,
// } from "react-icons/md";

// const Sidebar = () => {
//   const [activeTab, setActiveTab] = useState("Dashboard");

//   const menuItems = [
//     { name: "Dashboard", icon: <MdDashboard /> },
//     { name: "My Courses", icon: <MdSchool /> },
//     { name: "Payments", icon: <MdPayment /> },
//     { name: "Profile", icon: <MdPerson /> },
//     { name: "Certificates", icon: <MdCardMembership /> },
//   ];

//   const menuItemClass =
//     "flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl transition-all duration-200 w-full max-w-[200px] cursor-pointer \
//      md:hover:bg-[#F81C0D] md:hover:text-white";

//   const iconSize = "text-lg sm:text-xl";

//   return (
//     <aside className="w-56 sm:w-64 min-h-screen bg-[#111827] text-gray-200 flex flex-col items-center">
      
//       {/* Logo / Profile */}
//       <div className="flex flex-col items-center gap-2 sm:gap-3 py-4 sm:py-6 border-b border-gray-600 w-full text-center">
//         <img
//           src={techprologo}
//           alt="TechPro Logo"
//           className="w-28 sm:w-40 rounded-full -translate-x-8 sm:-translate-1"
//         />
//         <img
//           src={Rectangle3}
//           alt="Profile"
//           className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover -translate-x-12  sm:-translate-7"
//         />
//         <p className="text-xs sm:text-sm text-white font-medium -translate-x-12 sm:-translate-7 ">
//           Michael Scott
//         </p>
//       </div>

//       {/* Menu */}
//       <ul className="flex-1 flex flex-col items-center px-2 sm:px-4 py-4 sm:py-6 space-y-8 sm:space-y-3 w-full">
//         {menuItems.map((item) => (
//           <li key={item.name} className="w-full flex justify-center">
//             <div
//               className={`${menuItemClass} ${
//                 activeTab === item.name ? "bg-[#F81C0D] text-white" : " text-white"
//               }`}
//               onClick={() => setActiveTab(item.name)}
//             >
//               <span className={`${iconSize} shrink-0`}>{item.icon}</span>
//               <span className="text-xs sm:text-sm">{item.name}</span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Logout */}
//       <div className="w-full py-4 sm:py-6 border-t border-gray-600 flex justify-center">
//         <div
//           className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-red-400 transition-all duration-200 w-full max-w-[200px] cursor-pointer \
//                       md:hover:bg-red-500 md:hover:text-white active:bg-red-500 active:text-white"
//           onClick={() => alert("Logging out")}
//         >
//           <MdLogout className={`${iconSize}`} />
//           <span className="text-xs sm:text-sm">Logout</span>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import Rectangle3 from "../../assets/images/Rectangle3.png";
import techprologo from "../../assets/images/techprologo.png";

import {
  MdDashboard,
  MdSchool,
  MdPayment,
  MdPerson,
  MdCardMembership,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard /> },
    { name: "My Courses", icon: <MdSchool /> },
    { name: "Payments", icon: <MdPayment /> },
    { name: "Profile", icon: <MdPerson /> },
    { name: "Certificates", icon: <MdCardMembership /> },
  ];

  const menuItemClass =
    "flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl transition-all duration-200 w-full max-w-[200px] cursor-pointer md:hover:bg-[#F81C0D] md:hover:text-white";

  const iconSize = "text-lg sm:text-xl";

  return (
    <aside className="w-56 sm:w-64 min-h-screen bg-[#111827] text-gray-200 flex flex-col items-center py-5">

      {/* Logo / Profile */}
      <div className="flex flex-col items-center gap-1 sm:gap-2 py-3 sm:py-4 border-b border-gray-600 w-full text-center">
        <img
          src={techprologo}
          alt="TechPro Logo"
          className="w-28 sm:w-40 rounded-full -translate-x-8 sm:-translate-1  sm:mb-4"
        />
        <img
          src={Rectangle3}
          alt="Profile"
          className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover -translate-x-12 sm:-translate-7 mb-2"
        />
        <p className="text-xs sm:text-sm text-white font-normal -translate-x-12 sm:-translate-7">
          Michael Scott
        </p>
      </div>

      {/* Menu */}
      <ul className="flex-1 flex flex-col items-center px-2 sm:px-4 py-2 sm:py-4 space-y-5 sm:space-y-3 w-full">
        {menuItems.map((item) => (
          <li key={item.name} className="w-full flex justify-center">
            <div
              className={`${menuItemClass} ${
                activeTab === item.name ? "bg-[#F81C0D] text-white" : "text-white"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className={`${iconSize} shrink-0`}>{item.icon}</span>
              <span className="text-xs sm:text-sm">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="w-full py-3 sm:py-4 border-t border-gray-600 flex justify-center">
        <div
          className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-red-400 transition-all duration-200 w-full max-w-[200px] cursor-pointer md:hover:bg-red-500 md:hover:text-white active:bg-red-500 active:text-white"
          onClick={() => alert("Logging out")}
        >
          <MdLogout className={`${iconSize}`} />
          <span className="text-xs sm:text-sm">Logout</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
