
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";


const CompletePayment = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#15256E]">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">
            Transfer the amount shown below to the account details provided
          </p>
        </div>

        {/* Amount */}
        <div className="bg-[#EEF1FB] rounded-lg p-4 flex justify-between items-center">
          <p className="font-medium">Amount to transfer</p>
          <p className="text-xl font-bold text-[#15256E]">$120</p>
        </div>

        {/* Bank Details */}
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-[#15256E]">Bank Details</p>
          <p>
            Bank Name: <span className="font-medium">Access Bank</span>
          </p>
          <p>
            Account Number: <span className="font-medium">0123456789</span>
          </p>
          <p>
            Account Name: <span className="font-medium">TechPro Institute</span>
          </p>
        </div>

        {/* Upload Evidence */}
        <div
          onClick={() => document.getElementById("payment-upload").click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center space-y-2 transition cursor-pointer ${
            dragActive ? "border-[#15256E] bg-[#eef1fb]" : "border-gray-300"
          }`}
        >
          {!file && (
            <>
              <FiUploadCloud size={36} className="mx-auto text-[#15256E]" />
              <p className="font-medium">Upload Evidence of Payment</p>
              <p className="text-sm text-gray-500">
                Drag and drop or browse files
              </p>
            </>
          )}

          {file && (
            <div className="flex flex-col items-center space-y-2">
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="max-h-40 rounded-lg"
                />
              )}
              <p className="font-medium">{file.name}</p>
              <p
                className="text-sm text-red-500 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                Remove
              </p>
            </div>
          )}

          <input
            type="file"
            id="payment-upload"
            className="hidden"
            accept="image/*,application/pdf"
            capture="environment"
            onChange={handleFileChange}
          />
        </div>

        {/* Button */}
         <Link
        to="/"
        className="w-full bg-[#15256E] text-white py-3 rounded-lg font-semibold hover:bg-[#0f1c58] transition inline-block text-center"
        >
        Proceed to Payment
        </Link>
      </div>
    </div>
  );
};

export default CompletePayment;

