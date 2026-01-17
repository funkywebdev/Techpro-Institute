// import React from 'react'
// import ReadyImg from "../assets/images/Ready.png"

// const Ready = () => {
//   return (
//     <div>
// <div className="">
//     <img src={Ready} alt="" />
//     <h1>Ready to Start Your Tech Career?</h1>
//     <p>Join TechPro Institute and gain practical experience, industry knowledge, and certifications that help you stand out in today’s tech industry.</p>
//     <button>Get Started</button>
//     <p>Subscribe To our newsletter</p>
//     <div className='flex justify-between'>
//     <input type="text" placeholder='Enter your email addres' />
//     <button>Subscribe</button>
//     </div>
// </div>
//     </div>
//   )
// }

// export default Ready


// import React from "react";
// import ReadyImg from "../assets/images/Ready.png";

// const Ready = () => {
//   return (
//     <section className="py-16 px-4 sm:px-8 lg:px-16">
//       <div className="relative  mx-auto rounded-3xl overflow-hidden shadow-lg">
        
//         {/* IMAGE */}
//         <img
//           src={ReadyImg}
//           alt="Ready to start your tech career"
//           className="w-full h-[420px] sm:h-[480px] object-cover"
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 flex flex-col justify-end items-end text-center px-6">
          
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
//             Ready to Start Your Tech Career?
//           </h1>

//           <p className="text-sm sm:text-base text-gray-200 max-w-xl">
//             Join TechPro Institute and gain practical experience, industry
//             knowledge, and certifications that help you stand out in today’s
//             tech industry.
//           </p>

//           <button className="mb-8 px-8 py-3 rounded-xl bg-[#001489] text-white font-medium text-sm sm:text-base hover:bg-[#000f6a] transition">
//             Get Started
//           </button>

//           {/* NEWSLETTER */}
//           <div className="w-full max-w-md bg-white/95 rounded-2xl p-4">
//             <p className="text-sm font-medium text-gray-900 mb-3">
//               Subscribe to our newsletter
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#001489]"
//               />

//               <button className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition">
//                 Subscribe
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ready;



// import React from "react";
// import ReadyImg from "../assets/images/Ready.png";

// const Ready = () => {
//   return (
//     <section className="py-16 px-4 sm:px-8 lg:px-16">
//       <div className="relative mx-auto rounded-3xl overflow-hidden shadow-lg">
        
//         {/* IMAGE */}
//         <img
//           src={ReadyImg}
//           alt="Ready to start your tech career"
//           className="w-full h-[420px] sm:h-[480px] object-cover"
//         />

//         {/* GRADIENT OVERLAY */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

//         {/* CONTENT — BOTTOM RIGHT */}
//         <div className="absolute inset-0 flex flex-col justify-end items-end px-6 sm:px-10 pb-8 sm:pb-12 text-right">
          
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl text-start font-bold text-white mb-3 max-w-xl">
//             Ready to Start Your Tech Career?
//           </h1>

//           <p className="text-sm sm:text-base text-gray-200 max-w-xl mb-5">
//             Join TechPro Institute and gain practical experience, industry
//             knowledge, and certifications that help you stand out in today’s
//             tech industry.
//           </p>

//           <button className="mb-6 px-8 py-3 rounded-xl bg-[#001489] text-white font-medium text-sm sm:text-base hover:bg-[#000f6a] transition">
//             Get Started
//           </button>

//           {/* NEWSLETTER */}
//           <div className="w-full max-w-md bg-white/95 rounded-2xl p-4 text-left">
//             <p className="text-sm font-medium text-gray-900 mb-3">
//               Subscribe to our newsletter
//             </p>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#001489]"
//               />

//               <button className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition">
//                 Subscribe
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Ready;



import React from "react";
import ReadyImg from "../assets/images/Ready.png";

const Ready = () => {
  return (
    <section className="py-2 px-4 sm:px-8 lg:px-16">
      <div className="relative mx-auto rounded-3xl overflow-hidden shadow-lg">
        
        {/* IMAGE */}
        <img
          src={ReadyImg}
          alt="Ready to start your tech career"
          className="w-full h-[480px] sm:h-[420px] object-cover"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* CONTENT — BOTTOM LEFT */}
        <div className="absolute inset-0 flex flex-col justify-end items-start sm:ml-[550px] px-6 sm:px-10 pb-8 sm:pb-12 ">
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 max-w-xl">
            Ready to Start Your Tech Career?
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-xl mb-5">
            Join TechPro Institute and gain practical experience, industry
            knowledge, and certifications that help you stand out in today’s
            tech industry.
          </p>

          <button className="mb-6 px-8 py-3 rounded-xl bg-white text-[#15256E] font-medium text-sm sm:text-base transition">
            Get Started
          </button>

          {/* NEWSLETTER */}
          <div className="w-full max-w-md bg-white/95 rounded-2xl p-4">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Subscribe to our newsletter
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#001489]"
              />

              <button className="px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ready;
