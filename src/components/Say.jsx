// import React from "react"
// import { motion } from "framer-motion"
// import Vector from "../assets/images/Vector.png"

// const testimonials = [
//   {
//     text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build real confidence, and within weeks, I was applying what I learned on actual client work.",
//   },
//   {
//     text: "The structure and mentorship completely changed how I approach learning. Everything was clear, practical, and easy to follow.",
//   },
//   {
//     text: "I gained confidence, real skills, and clarity in my tech journey. This was the turning point for me.",
//   },
// ]

// const Say = () => {
//   return (
//     <section className="py-12 sm:py-16 px-4 bg-[#1C5187]">
      
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         viewport={{ once: true }}
//         className="max-w-3xl mx-auto text-center text-white mb-12"
//       >
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
//           What Our Learners Say
//         </h1>

//         <p className="text-sm sm:text-base text-[#E9F0FF] leading-relaxed">
//           Hear from students who built real skills, gained confidence, and
//           transformed their careers through our learning programs.
//         </p>
//       </motion.div>

//       {/* Testimonials */}
//       <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//         {testimonials.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             viewport={{ once: true }}
//             className="bg-white p-6 rounded-xl shadow-md"
//           >
//             <img src={Vector} alt="" />
//             <p className="text-[#FCB400] mb-3 text-lg">★★★★★</p>

//             <p className="text-[#111827] text-sm leading-relaxed">
//               {item.text}
//             </p>
//           </motion.div>
//         ))}
//         <div className="border-t-black">
//         <div>
//          <img src={Ellipse129} alt="" />
//          <p>Sarah Mitchell</p>
//          <p>Scrum Master</p>
//          </div> 
//         </div>
//         <div className="border-t-black">
//         <div>
//          <img src={Ellipse127} alt="" />
//          <p>Sarah Mitchell</p>
//          <p>Scrum Master</p>
//          </div> 
//         </div>
//         <div className="border-t-black">
//         <div>
//          <img src={Ellipse128} alt="" />
//          <p>Sarah Mitchell</p>
//          <p>Scrum Master</p>
//          </div> 
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Say



import React from "react"
import { motion } from "framer-motion"
import Vector from "../assets/images/Vector.png"
import Ellipse127 from "../assets/images/Ellipse127.png"
import Ellipse128 from "../assets/images/Ellipse128.png"
import Ellipse129 from "../assets/images/Ellipse129.png"

const testimonials = [
  {
    text: "This platform made tech learning finally make sense for me. The hands-on projects helped me build real confidence, and within weeks, I was applying what I learned on actual client work.",
    name: "Sarah Mitchell",
    title: "Scrum Master",
    img: Ellipse129,
  },
  {
    text: "The structure and mentorship completely changed how I approach learning. Everything was clear, practical, and easy to follow.",
    name: "John Doe",
    title: "Frontend Developer",
    img: Ellipse127,
  },
  {
    text: "I gained confidence, real skills, and clarity in my tech journey. This was the turning point for me.",
    name: "Emily Smith",
    title: "Product Owner",
    img: Ellipse128,
  },
]

const Say = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-[#1C5187]">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center text-white mb-12 px-2"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          What Our Learners Say
        </h1>

        <p className="text-sm sm:text-base text-[#E9F0FF] leading-relaxed">
          Hear from students who built real skills, gained confidence, and
          transformed their careers through our learning programs.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start"
          >
            {/* Icon */}
            <img src={Vector} alt="" className="mb-3" />

            {/* Stars */}
            <p className="text-[#FCB400] mb-3 text-lg">★★★★★</p>

            {/* Testimonial Text */}
            <p className="text-[#111827] text-sm sm:text-base leading-relaxed mb-4">
              {item.text}
            </p>

            {/* Profile */}
            <div className="flex items-center mt-auto gap-3 border-t pt-4 border-gray-200 w-full">
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#111827] text-sm">{item.name}</p>
                <p className="text-xs text-[#6B7280]">{item.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Say
