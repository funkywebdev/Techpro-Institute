
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
