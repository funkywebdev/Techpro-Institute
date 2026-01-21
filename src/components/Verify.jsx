

// import React, { useState } from "react";
// import { HiMail } from "react-icons/hi";

// const Verify = () => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);

//   // Handle input change
//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (/^\d?$/.test(value)) {
//       const newCode = [...code];
//       newCode[index] = value;
//       setCode(newCode);
//       // focus next input
//       if (value && index < 5) {
//         document.getElementById(`code-${index + 1}`).focus();
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-[#F2F4F8] px-4 py-5 pt-24 pb-5 sm:pt-32 sm:pb-10">
//       {/* White card */}
//       <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8 flex flex-col items-center">
        
//         {/* Icon */}
//         <div className="bg-[#E0E7FF] p-4 rounded-full mb-4">
//           <HiMail className="text-4xl text-[#15256E]" />
//         </div>

//         {/* Header */}
//         <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
//           VERIFY YOUR EMAIL ADDRESS
//         </h1>

//         {/* Email info */}
//         <p className="text-center text-gray-600 mb-1">A verification has been sent to</p>
//         <p className="text-center font-medium mb-4">karee655@gmail.com</p>
//         <p className="text-center text-gray-600 mb-6">
//           Please check your inbox and enter the verification code below to verify your email address.
//         </p>

//         {/* Six code inputs */}
//         <div className="flex justify-center gap-2 mb-6">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               id={`code-${index}`}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#15256E] text-lg"
//             />
//           ))}
//         </div>

//         {/* Verify button */}
//         <button className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition">
//           Verify
//         </button>

//         {/* Options */}
//         <div className="flex justify-between w-full text-sm text-gray-600">
//           <button className="text-blue-600 hover:underline">Resend Code</button>
//           <button className="text-blue-600 hover:underline">Change Email</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Verify;


import React, { useState } from "react";
import { HiMail } from "react-icons/hi";

const Verify = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // focus next input
      if (index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      if (newCode[index] !== "") {
        // clear current input if it has value
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // move to previous input if empty
        document.getElementById(`code-${index - 1}`).focus();
        const prevCode = [...newCode];
        prevCode[index - 1] = "";
        setCode(prevCode);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-4 py-5 pt-24 pb-5 sm:pt-32 sm:pb-10">
      {/* White card */}
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-8 flex flex-col items-center">
        
        {/* Icon */}
        <div className="bg-[#E0E7FF] p-4 rounded-full mb-4">
          <HiMail className="text-4xl text-[#15256E]" />
        </div>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
          VERIFY YOUR EMAIL ADDRESS
        </h1>

        {/* Email info */}
        <p className="text-center text-gray-600 mb-1">A verification has been sent to</p>
        <p className="text-center font-medium mb-4">karee655@gmail.com</p>
        <p className="text-center text-gray-600 mb-6">
          Please check your inbox and enter the verification code below to verify your email address.
        </p>

        {/* Six code inputs */}
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#15256E] text-lg"
            />
          ))}
        </div>

        {/* Verify button */}
        <button className="w-full bg-[#15256E] text-white py-3 rounded mb-4 hover:bg-[#0f1c58] transition">
          Verify
        </button>

        {/* Options */}
        <div className="flex justify-between w-full text-sm text-gray-600">
          <button className="text-[#15256E] hover:underline">Resend Code</button>
          <button className="text-[#15256E] hover:underline">Change Email</button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
