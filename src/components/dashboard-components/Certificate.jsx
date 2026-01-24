


import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import image1 from "../../assets/images/image1.png";

const Certificate = ({
  childName = "Michael Scott",
  courseName = "Scrum Master Certification",
  instructor = "John Doe",
  date = "January 2026",
}) => {
  const certificateRef = useRef(null);

  const downloadPDF = async () => {
    try {
      const element = certificateRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${childName}-certificate.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to download certificate");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 print:hidden">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Certificate
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            View all certificates earned by your children
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-2 border rounded text-xs sm:text-sm"
          >
            Print
          </button>

          <button
            type="button"
            onClick={downloadPDF}
            className="px-3 py-2 bg-[#15256E] text-white rounded text-xs sm:text-sm"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div
        ref={certificateRef}
        className="
          max-w-4xl mx-auto bg-white
          border-[6px] sm:border-[10px] border-[#15256E]
          px-4 py-6 sm:px-10 sm:py-10
          text-center
        "
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Logo */}
        <img
          src={image1}
          alt="Logo"
          className="mx-auto w-14 sm:w-20 mb-4 sm:mb-6"
        />

        <h1 className="text-2xl sm:text-4xl font-bold text-[#15256E] mb-3 sm:mb-4">
          Certificate of Completion
        </h1>

        <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-6">
          This is to proudly certify that
        </p>

        <p className="text-xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
          {childName}
        </p>

        <p className="text-sm sm:text-lg text-gray-600 mb-2 sm:mb-3">
          has successfully completed the course
        </p>

        <p className="text-lg sm:text-2xl font-medium text-gray-800 mb-8 sm:mb-10">
          {courseName}
        </p>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mt-8 sm:mt-12">
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-500">Date</p>
            <p className="text-sm sm:text-base font-medium">{date}</p>
          </div>

          <div className="text-center sm:text-right">
            <img
              src={image1}
              alt="Signature"
              className="w-20 sm:w-28 mx-auto sm:ml-auto mb-1"
            />
            <p className="text-sm sm:text-base font-medium">{instructor}</p>
            <p className="text-xs sm:text-sm text-gray-500">
              Course Instructor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
