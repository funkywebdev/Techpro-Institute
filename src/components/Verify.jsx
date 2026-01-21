import React, { useState } from "react";
import { HiMail } from "react-icons/hi";

const Verify = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];

      if (newCode[index]) {
        newCode[index] = "";
      } else if (index > 0) {
        document.getElementById(`code-${index - 1}`)?.focus();
        newCode[index - 1] = "";
      }

      setCode(newCode);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#F2F4F8] px-6 py-5 pt-24 pb-5 sm:pt-32 sm:pb-10 ">
      
      {/* White card */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md 
                      p-4 sm:p-8 flex flex-col items-center">

        {/* Icon */}
        <div className="bg-[#E0E7FF] p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
          <HiMail className="text-3xl sm:text-4xl text-[#15256E]" />
        </div>

        {/* Header */}
        <h1 className="text-lg sm:text-3xl font-bold mb-2 text-center">
          VERIFY YOUR EMAIL ADDRESS
        </h1>

        {/* Email info */}
        <p className="text-center text-xs sm:text-base text-gray-600 mb-1">
          A verification has been sent to
        </p>

        <p className="text-center text-sm sm:text-base font-medium mb-3 sm:mb-4">
          karee655@gmail.com
        </p>

        <p className="text-center text-xs sm:text-base text-gray-600 mb-5 sm:mb-6">
          Please check your inbox and enter the verification code below to verify your email address.
        </p>

        {/* Six code inputs */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
                w-9 h-9 sm:w-12 sm:h-12
                text-sm sm:text-lg
                text-center border border-gray-300 rounded
                focus:outline-none focus:ring-2 focus:ring-[#15256E]
              "
            />
          ))}
        </div>

        {/* Verify button */}
        <button className="w-full bg-[#15256E] text-white 
                           py-2.5 sm:py-3 rounded mb-4 
                           hover:bg-[#0f1c58] transition">
          Verify
        </button>

        {/* Options */}
        <div className="flex justify-between w-full text-xs sm:text-sm text-gray-600">
          <button className="text-[#15256E] hover:underline">
            Resend Code
          </button>
          <button className="text-[#15256E] hover:underline">
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
