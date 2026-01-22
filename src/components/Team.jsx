



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Images
// import Rectangle1 from "../assets/images/Rectangle1.png";
// import Rectangle2 from "../assets/images/Rectangle2.png";
// import Rectangle3 from "../assets/images/Rectangle3.png";

// const teamMembers = [
//   {
//     img: Rectangle1,
//     name: "Oladipo Bolodeoku",
//     role: "Founder and CFO",
//     bio:
//       "Oladipo Bolodeoku is a Founder, CEO, and CFO with a sharp eye for value, risk, and long-term sustainability. He blends strategic leadership with disciplined financial thinking across energy, technology, and operations—ensuring bold ideas remain affordable, accountable, and resilient."
//   },
//   {
//     img: Rectangle2,
//     name: "Oladuntoye Oluwaseun",
//     role: "Co-Founder and COO",
//     bio:
//       "Oluwaseun Oladuntoye is a business analyst, product manager, and Co-Founder of BOLO Quiz League. Leverages over 7 years of software engineering experience to manage operations on ground, drive innovation, and turn ideas into working solutions."
//   },
//   {
//     img: Rectangle3,
//     name: "John Omotosho",
//     role: "Backend Developer",
//     bio: "John Omotosho is a software engineer with 4+ years of experience designing and building scalable backend systems, intelligent applications, and high-performance digital products."
//   },
// ];

// const Team = () => {
//   const [selectedMember, setSelectedMember] = useState(null);

//   return (
//     <section id="Team" className="px-6 sm:px-16 md:px-20 lg:px-24 py-12 font-poppins">
//       {/* Heading */}
//       <div className="mb-12 text-center">
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Meet Our Team</h2>
//         <p className="mt-2 text-gray-600 sm:text-lg">Talented individuals driving our mission forward</p>
//       </div>

//       {/* Horizontal Scroll Carousel for mobile, grid for larger screens */}
//       <div className="flex overflow-x-auto space-x-6 pb-4 sm:grid sm:grid-cols-3 sm:gap-10 sm:overflow-visible">
//         {teamMembers.map((member) => (
//           <motion.div
//             key={member.name}
//             whileHover={{ scale: 1.05, y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
//             className="flex flex-col items-center text-center min-w-[220px] sm:min-w-0 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
//             onClick={() => setSelectedMember(member)}
//           >
//             <img
//               src={member.img}
//               alt={member.name}
//               className="w-32 h-32 rounded-full object-cover border-4 border-[#001489] mb-4"
//             />
//             <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
//             <p className="text-sm text-gray-500 mb-3">{member.role}</p>
//             <button className="px-4 py-1 bg-[#001489] text-white rounded-full text-sm hover:bg-[#001aa9] transition">
//               View Profile
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedMember && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedMember(null)}
//           >
//             <motion.div
//               className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
//               initial={{ scale: 0.8, opacity: 0, y: 50 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedMember.img}
//                 alt={selectedMember.name}
//                 className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#001489] object-cover"
//               />
//               <h3 className="text-2xl font-bold text-[#001489]">{selectedMember.name}</h3>
//               <p className="mt-1 text-gray-600">{selectedMember.role}</p>
//               <p className="mt-4 text-gray-700 whitespace-pre-wrap">{selectedMember.bio}</p>
//               <button
//                 className="mt-6 px-6 py-2 bg-[#001489] text-white rounded-lg hover:bg-[#001aa9] transition"
//                 onClick={() => setSelectedMember(null)}
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default Team;



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Images
// import Rectangle1 from "../assets/images/Rectangle1.png";
// import Rectangle2 from "../assets/images/Rectangle2.png";
// import Rectangle3 from "../assets/images/Rectangle3.png";

// const teamMembers = [
//   {
//     img: Rectangle1,
//     name: "Oladipo Bolodeoku",
//     role: "Founder and CFO",
//     bio:
//       "Oladipo Bolodeoku is a Founder, CEO, and CFO with a sharp eye for value, risk, and long-term sustainability. He blends strategic leadership with disciplined financial thinking across energy, technology, and operations—ensuring bold ideas remain affordable, accountable, and resilient."
//   },
//   {
//     img: Rectangle2,
//     name: "Oladuntoye Oluwaseun",
//     role: "Co-Founder and COO",
//     bio:
//       "Oluwaseun Oladuntoye is a business analyst, product manager, and Co-Founder of BOLO Quiz League. Leverages over 7 years of software engineering experience to manage operations on ground, drive innovation, and turn ideas into working solutions."
//   },
//   {
//     img: Rectangle3,
//     name: "John Omotosho",
//     role: "Backend Developer",
//     bio: "John Omotosho is a software engineer with 4+ years of experience designing and building scalable backend systems, intelligent applications, and high-performance digital products."
//   },
// ];

// const Team = () => {
//   const [selectedMember, setSelectedMember] = useState(null);

//   return (
//     <section id="Team" className="px-6 sm:px-16 md:px-20 lg:px-24 py-16 font-poppins">
//       {/* Heading */}
//       <div className="mb-12 text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Team</h2>
//         <p className="mt-2 text-gray-600 sm:text-lg">Talented individuals driving our mission forward</p>
//       </div>

//       {/* Smooth auto carousel */}
//       <div className="relative">
//         <motion.div
//           className="flex gap-8 overflow-x-hidden"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
//         >
//           {[...teamMembers, ...teamMembers].map((member, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl shadow-lg cursor-pointer flex flex-col items-center p-6 text-center"
//               onClick={() => setSelectedMember(member)}
//             >
//               <img
//                 src={member.img}
//                 alt={member.name}
//                 className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#001489] mb-4"
//               />
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{member.name}</h3>
//               <p className="text-sm sm:text-base text-gray-500 mb-2">{member.role}</p>
//               <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedMember && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedMember(null)}
//           >
//             <motion.div
//               className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
//               initial={{ scale: 0.8, opacity: 0, y: 50 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedMember.img}
//                 alt={selectedMember.name}
//                 className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#001489] object-cover"
//               />
//               <h3 className="text-2xl font-bold text-[#001489]">{selectedMember.name}</h3>
//               <p className="mt-1 text-gray-600">{selectedMember.role}</p>
//               <p className="mt-4 text-gray-700 whitespace-pre-wrap">{selectedMember.bio}</p>
//               <button
//                 className="mt-6 px-6 py-2 bg-[#001489] text-white rounded-lg hover:bg-[#001aa9] transition"
//                 onClick={() => setSelectedMember(null)}
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default Team;


// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Images
// import Rectangle1 from "../assets/images/Rectangle1.png";
// import Rectangle2 from "../assets/images/Rectangle2.png";
// import Rectangle3 from "../assets/images/Rectangle3.png";

// const teamMembers = [
//   {
//     img: Rectangle1,
//     name: "Oladipo Bolodeoku",
//     role: "Founder and CFO",
//     bio:
//       "Oladipo Bolodeoku is a Founder, CEO, and CFO with a sharp eye for value, risk, and long-term sustainability. He blends strategic leadership with disciplined financial thinking across energy, technology, and operations."
//   },
//   {
//     img: Rectangle2,
//     name: "Oladuntoye Oluwaseun",
//     role: "Co-Founder and COO",
//     bio:
//       "Oluwaseun Oladuntoye is a business analyst, product manager, and Co-Founder. Leverages over 7 years of software engineering experience to manage operations, drive innovation, and turn ideas into working solutions."
//   },
//   {
//     img: Rectangle3,
//     name: "John Omotosho",
//     role: "Backend Developer",
//     bio: "John Omotosho is a software engineer with 4+ years of experience designing and building scalable backend systems and high-performance digital products."
//   },
// ];

// const Team = () => {
//   const [selectedMember, setSelectedMember] = useState(null);

//   return (
//     <section id="Team" className="px-6 sm:px-16 md:px-20 lg:px-24 py-16 font-poppins">
//       {/* Heading */}
//       <div className="mb-12 text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Team</h2>
//         <p className="mt-2 text-gray-600 sm:text-lg">Talented individuals driving our mission forward</p>
//       </div>

//       {/* Continuous Auto-Scrolling Carousel */}
//       <div className="overflow-hidden relative">
//         <motion.div
//           className="flex gap-8"
//           animate={{ x: ["0%", "-70%"] }}
//           transition={{
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 20,
//             ease: "linear"
//           }}
//         >
//           {/* Duplicate items for seamless loop */}
//           {[...teamMembers, ...teamMembers].map((member, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center cursor-pointer"
//               onClick={() => setSelectedMember(member)}
//             >
//               <img
//                 src={member.img}
//                 alt={member.name}
//                 className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#001489] mb-4"
//               />
//               <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{member.name}</h3>
//               <p className="text-sm sm:text-base text-gray-500 mb-2">{member.role}</p>
//               <p className="text-sm text-gray-600 line-clamp-4">{member.bio}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedMember && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedMember(null)}
//           >
//             <motion.div
//               className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
//               initial={{ scale: 0.8, opacity: 0, y: 50 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedMember.img}
//                 alt={selectedMember.name}
//                 className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#001489] object-cover"
//               />
//               <h3 className="text-2xl font-bold text-[#001489]">{selectedMember.name}</h3>
//               <p className="mt-1 text-gray-600">{selectedMember.role}</p>
//               <p className="mt-4 text-gray-700 whitespace-pre-wrap">{selectedMember.bio}</p>
//               <button
//                 className="mt-6 px-6 py-2 bg-[#001489] text-white rounded-lg hover:bg-[#001aa9] transition"
//                 onClick={() => setSelectedMember(null)}
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default Team;



// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// // Images
// import Rectangle1 from "../assets/images/Rectangle1.png";
// import Rectangle2 from "../assets/images/Rectangle2.png";
// import Rectangle3 from "../assets/images/Rectangle3.png";

// const teamMembers = [
//   {
//     img: Rectangle1,
//     name: "Oladipo Bolodeoku",
//     role: "Founder and CFO",
//     bio:
//       "Oladipo Bolodeoku is a Founder, CEO, and CFO with a sharp eye for value, risk, and long-term sustainability. He blends strategic leadership with disciplined financial thinking across energy, technology, and operations."
//   },
//   {
//     img: Rectangle2,
//     name: "Oladuntoye Oluwaseun",
//     role: "Co-Founder and COO",
//     bio:
//       "Oluwaseun Oladuntoye is a business analyst, product manager, and Co-Founder. Leverages over 7 years of software engineering experience to manage operations, drive innovation, and turn ideas into working solutions."
//   },
//   {
//     img: Rectangle3,
//     name: "John Omotosho",
//     role: "Backend Developer",
//     bio: "John Omotosho is a software engineer with 4+ years of experience designing and building scalable backend systems and high-performance digital products."
//   },
// ];

// const Team = () => {
//   const [selectedMember, setSelectedMember] = useState(null);

//   return (
//     <section
//       id="Team"
//       className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 font-poppins"
//     >
//       {/* Heading */}
//       <div className="mb-12 text-center">
//         <h2 className="text-2xl sm:text-2xl font-bold text-gray-900">
//           Meet Our Team
//         </h2>
//         <p className="mt-2 text-gray-600 sm:text-lg">
//           Talented individuals driving our mission forward
//         </p>
//       </div>

//       {/* Continuous Auto-Scrolling Carousel */}
//       <div className="overflow-hidden relative">
//         <motion.div
//           className="flex gap-10 pb-10"
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{
//             repeat: Infinity,
//             repeatType: "loop",
//             duration: 20,
//             ease: "linear"
//           }}
//         >
//           {[...teamMembers, ...teamMembers].map((member, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 bg-white rounded-2xl shadow-lg flex flex-col items-center p-6 text-center cursor-pointer"
//               onClick={() => setSelectedMember(member)}
//             >
//               <img
//                 src={member.img}
//                 alt={member.name}
//                 className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-[#001489] mb-4"
//               />
//               <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
//                 {member.name}
//               </h3>
//               <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-2">
//                 {member.role}
//               </p>
//               <p className="text-sm sm:text-base text-gray-600 line-clamp-4">
//                 {member.bio}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedMember && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setSelectedMember(null)}
//           >
//             <motion.div
//               className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl"
//               initial={{ scale: 0.8, opacity: 0, y: 50 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={selectedMember.img}
//                 alt={selectedMember.name}
//                 className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-[#001489] object-cover"
//               />
//               <h3 className="text-2xl font-bold text-[#001489]">
//                 {selectedMember.name}
//               </h3>
//               <p className="mt-1 text-gray-600">{selectedMember.role}</p>
//               <p className="mt-4 text-gray-700 whitespace-pre-wrap">
//                 {selectedMember.bio}
//               </p>
//               <button
//                 className="mt-6 px-6 py-2 bg-[#001489] text-white rounded-lg hover:bg-[#001aa9] transition"
//                 onClick={() => setSelectedMember(null)}
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default Team;



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Images
import Rectangle1 from "../assets/images/Rectangle1.png";
import Rectangle2 from "../assets/images/Rectangle2.png";
import Rectangle3 from "../assets/images/Rectangle3.png";

const teamMembers = [
  {
    img: Rectangle1,
    name: "Oladipo Bolodeoku",
    role: "Founder & CFO",
    bio:
      "Founder and CFO with a sharp eye for value and long-term sustainability."
  },
  {
    img: Rectangle2,
    name: "Oladuntoye Oluwaseun",
    role: "Co-Founder & COO",
    bio:
      "Business analyst and product manager driving operations and innovation."
  },
  {
    img: Rectangle3,
    name: "John Omotosho",
    role: "Backend Developer",
    bio:
      "Software engineer designing scalable backend systems and high-performance applications."
  },
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section
      id="Team"
      className="font-poppins bg-gray-50"
    >
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-[20px] sm:text-2xl font-bold text-gray-900">
          Meet Our Team
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600 sm:text-base">
          Talented individuals driving our mission forward
        </p>
      </div>

      {/* Continuous Auto-Scrolling Carousel */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-6 pb-10"
          animate={{ x: ["0%", "-75%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          }}
        >
          {[...teamMembers, ...teamMembers].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-52 sm:w-60 md:w-64 lg:w-72 bg-white rounded-2xl shadow-md flex flex-col items-center p-4 sm:p-5 md:p-6 text-center cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#001489] mb-3"
              />
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-1">
                {member.role}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm sm:max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMember.img}
                alt={selectedMember.name}
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-full mx-auto mb-4 border-4 border-[#001489] object-cover"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-[#001489]">
                {selectedMember.name}
              </h3>
              <p className="mt-1 text-gray-600">{selectedMember.role}</p>
              <p className="mt-3 text-gray-700 whitespace-pre-wrap">
                {selectedMember.bio}
              </p>
              <button
                className="mt-5 px-6 py-2 bg-[#001489] text-white rounded-lg hover:bg-[#001aa9] transition"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;
