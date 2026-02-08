


import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../api/axios";

const CompletePayment = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bank details from backend
  const [bankDetail, setBankDetail] = useState(null);
  const [loadingBank, setLoadingBank] = useState(true);

  // =========================
  // FETCH BANK DETAILS
  // =========================
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await api.get("/v1/bank-detail");
        if (response.data.status) {
          setBankDetail(response.data.data);
        } else {
          toast.error("Failed to load bank details");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching bank details");
      } finally {
        setLoadingBank(false);
      }
    };

    fetchBankDetails();
  }, []);

  // =========================
  // FILE HANDLERS
  // =========================
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // =========================
  // SUBMIT PAYMENT
  // =========================
  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload payment evidence");
      return;
    }

    if (!bankDetail) {
      toast.error("Bank details not loaded yet");
      return;
    }

    const formData = new FormData();
    formData.append("paymentEvidence", file);
    formData.append("bankId", bankDetail.id); // remove if not required
    formData.append("amount", 120);
    

    try {
      setIsSubmitting(true);

      // ✅ Correct endpoint
      const response = await api.post("/v1/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "Payment submitted successfully");
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Payment submission failed"
      );
    } finally {
      setIsSubmitting(false);
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
        {loadingBank ? (
          <p className="text-gray-500">Loading bank details...</p>
        ) : bankDetail ? (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-[#15256E]">Bank Details</p>
            <p>
              Bank Name:{" "}
              <span className="font-medium">{bankDetail.bankName}</span>
            </p>
            <p>
              Account Number:{" "}
              <span className="font-medium">{bankDetail.bankAccountNumber}</span>
            </p>
            <p>
              Region:{" "}
              <span className="font-medium">{bankDetail.region}</span>
            </p>
          </div>
        ) : (
          <p className="text-red-500">No bank details available</p>
        )}

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
          {!file ? (
            <>
              <FiUploadCloud size={36} className="mx-auto text-[#15256E]" />
              <p className="font-medium">Upload Evidence of Payment</p>
              <p className="text-sm text-gray-500">
                Drag and drop or browse files
              </p>
            </>
          ) : (
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
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#15256E] text-white py-3 rounded-lg font-semibold hover:bg-[#0f1c58] transition disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};

export default CompletePayment;