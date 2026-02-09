



// import React, { useEffect, useState } from "react";
// import { FiUploadCloud } from "react-icons/fi";
// import { toast } from "react-toastify";
// import api from "../api/axios";

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// const CompletePayment = () => {
//   const [file, setFile] = useState(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Student & bank info
//   const [student, setStudent] = useState(null);
//   const [bankDetail, setBankDetail] = useState(null);
//   const [loadingStudent, setLoadingStudent] = useState(true);
//   const [loadingBank, setLoadingBank] = useState(true);

//   // =========================
//   // FETCH STUDENT INFO
//   // =========================
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await api.get("/v1/me");
//         if (res.data.status) {
//           setStudent(res.data.data);
//         } else {
//           toast.error("Failed to load student info");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching student info");
//       } finally {
//         setLoadingStudent(false);
//       }
//     };

//     fetchStudent();
//   }, []);

//   // =========================
//   // FETCH BANK DETAILS
//   // =========================
//   useEffect(() => {
//     const fetchBankDetails = async () => {
//       try {
//         const res = await api.get("/v1/bank-detail");
//         if (res.data.status) {
//           setBankDetail(res.data.data);
//         } else {
//           toast.error("Failed to load bank details");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching bank details");
//       } finally {
//         setLoadingBank(false);
//       }
//     };

//     fetchBankDetails();
//   }, []);

//   // =========================
//   // FILE HANDLERS
//   // =========================
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     if (
//       !["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(
//         selectedFile.type
//       )
//     ) {
//       toast.error("Invalid file type. Only images or PDFs allowed.");
//       return;
//     }

//     if (selectedFile.size > MAX_FILE_SIZE) {
//       toast.error("File too large (max 5MB).");
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === "dragenter" || e.type === "dragover");
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileChange({ target: { files: e.dataTransfer.files } });
//     }
//   };

//   // =========================
//   // SUBMIT PAYMENT
//   // =========================
//   const handleSubmit = async () => {
//     if (!file) return toast.error("Please upload payment evidence");
//     if (!student?.id) return toast.error("Student ID not available");

//     const formData = new FormData();
//     formData.append("paymentEvidence", file);
//     formData.append("studentId", student.id); // ✅ student ID
    
//     try {
//       setIsSubmitting(true);
//       const res = await api.post("/v1/payments", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success(res.data.message || "Payment submitted successfully");
//       setFile(null);
//       setDragActive(false);
//     } catch (err) {
//       console.error(err);
//       toast.error(
//         err.response?.data?.message || "Payment submission failed"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 sm:p-8 space-y-6">
//         {/* Header */}
//         <div className="space-y-2">
//           <h1 className="text-2xl font-semibold text-[#15256E]">
//             Complete Your Payment
//           </h1>
//           <p className="text-gray-600">
//             Transfer the amount shown below to the account details provided
//           </p>
//         </div>

//         {/* Student Info */}
//         {loadingStudent ? (
//           <p className="text-gray-500">Loading student info...</p>
//         ) : student ? (
//           <>
//             <p>
//               Paying for:{" "}
//               <span className="font-medium">
//                 {student.firstName} {student.lastName}
//               </span>
//             </p>
//             <p className="text-sm text-gray-500">
//               Student ID: {student.id}
//             </p>
//           </>
//         ) : (
//           <p className="text-red-500">Student info unavailable</p>
//         )}

//         {/* Bank Details */}
//         {loadingBank ? (
//           <p className="text-gray-500">Loading bank details...</p>
//         ) : bankDetail ? (
//           <div className="space-y-2 text-sm bg-[#EEF1FB] p-4 rounded-lg">
//             <p className="font-semibold text-[#15256E]">Bank Details</p>
//             <p>
//               Bank Name:{" "}
//               <span className="font-medium">{bankDetail.bankName}</span>
//             </p>
//             <p>
//               Account Number:{" "}
//               <span className="font-medium">
//                 {bankDetail.bankAccountNumber}
//               </span>
//             </p>
//             <p>
//               Region:{" "}
//               <span className="font-medium">{bankDetail.region}</span>
//             </p>
//           </div>
//         ) : (
//           <p className="text-red-500">No bank details available</p>
//         )}

//         {/* Upload Evidence */}
//         <div
//           onClick={() =>
//             document.getElementById("payment-upload").click()
//           }
//           onDragEnter={handleDrag}
//           onDragOver={handleDrag}
//           onDragLeave={handleDrag}
//           onDrop={handleDrop}
//           className={`border-2 border-dashed rounded-lg p-6 text-center space-y-2 transition cursor-pointer ${
//             dragActive
//               ? "border-[#15256E] bg-[#eef1fb]"
//               : "border-gray-300"
//           }`}
//         >
//           {!file ? (
//             <>
//               <FiUploadCloud
//                 size={36}
//                 className="mx-auto text-[#15256E]"
//               />
//               <p className="font-medium">
//                 Upload Evidence of Payment
//               </p>
//               <p className="text-sm text-gray-500">
//                 Drag and drop or browse files
//               </p>
//             </>
//           ) : (
//             <div className="flex flex-col items-center space-y-2">
//               {file.type.startsWith("image/") && (
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="preview"
//                   className="max-h-40 rounded-lg"
//                 />
//               )}
//               <p className="font-medium">{file.name}</p>
//               <p
//                 className="text-sm text-red-500 cursor-pointer"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setFile(null);
//                 }}
//               >
//                 Remove
//               </p>
//             </div>
//           )}

//           <input
//             type="file"
//             id="payment-upload"
//             className="hidden"
//             accept="image/*,application/pdf"
//             onChange={handleFileChange}
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="w-full bg-[#15256E] text-white py-3 rounded-lg font-semibold hover:bg-[#0f1c58] transition disabled:opacity-50"
//         >
//           {isSubmitting ? "Submitting..." : "Proceed to Payment"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompletePayment;




import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const CompletePayment = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [student, setStudent] = useState(null);
  const [bankDetail, setBankDetail] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [loadingBank, setLoadingBank] = useState(true);

  // =========================
  // FETCH STUDENT INFO
  // =========================
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/v1/me");
        if (res.data.status) {
          setStudent(res.data.data);
        } else {
          toast.error("Failed to load student info");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching student info");
      } finally {
        setLoadingStudent(false);
      }
    };
    fetchStudent();
  }, []);

  // =========================
  // FETCH BANK DETAILS
  // =========================
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await api.get("/v1/bank-detail");
        if (res.data.status) {
          setBankDetail(res.data.data);
        } else {
          toast.error("Failed to load bank details");
        }
      } catch (err) {
        console.error(err);
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
    if (!selectedFile) return;

    if (
      !["image/png", "image/jpeg", "image/jpg", "application/pdf"].includes(
        selectedFile.type
      )
    ) {
      toast.error("Invalid file type. Only images or PDFs allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File too large (max 5MB).");
      return;
    }

    setFile(selectedFile);
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
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };


  const handleSubmit = async () => {
  if (!file) return toast.error("Please upload payment evidence");
  if (!student?.id) return toast.error("Student ID not available");

  const formData = new FormData();
  formData.append("payment_receipt", file);
  formData.append("student_id", student.id);

  try {
    setIsSubmitting(true);
    const res = await api.post("/v1/payments", formData);
    console.log("Server response:", res.data);


     if (res.status === 200 || res.status === 201) {
    toast.success(res.data.message || "Payment submitted successfully");
    setFile(null);
    setDragActive(false);
     navigate("/dashboard", { replace: true });
    }
  } catch (err) {
    console.error("Payment error:", err.response?.data || err);
    toast.error(
      err.response?.data?.message ||
        "Payment submission failed. Check console for details"
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

        {/* Student Info */}
        {loadingStudent ? (
          <p className="text-gray-500">Loading student info...</p>
        ) : student ? (
          <>
            <p>
              Paying for:{" "}
              <span className="font-medium">
                {student.firstName} {student.lastName}
              </span>
            </p>
            <p className="text-sm text-gray-500">Student ID: {student.id}</p>
          </>
        ) : (
          <p className="text-red-500">Student info unavailable</p>
        )}

        {/* Bank Details */}
        {loadingBank ? (
          <p className="text-gray-500">Loading bank details...</p>
        ) : bankDetail ? (
          <div className="space-y-2 text-sm bg-[#EEF1FB] p-4 rounded-lg">
            <p className="font-semibold text-[#15256E]">Bank Details</p>
            <p>
              Bank Name: <span className="font-medium">{bankDetail.bankName}</span>
            </p>
            <p>
              Account Number:{" "}
              <span className="font-medium">{bankDetail.bankAccountNumber}</span>
            </p>
            <p>
              Region: <span className="font-medium">{bankDetail.region}</span>
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
              <p className="text-sm text-gray-500">Drag and drop or browse files</p>
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