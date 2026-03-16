


import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { QRCodeCanvas } from "qrcode.react";

/* =======================
   Spinner Component
======================= */
const Spinner = ({ size = 12, borderColor = "#15256E", text = "" }) => (
  <div className="flex flex-col items-center justify-center py-10">
    <div
      className={`w-${size} h-${size} border-2 border-${borderColor} border-t-transparent rounded-full animate-spin`}
      style={{ width: size * 4, height: size * 4, borderWidth: 3 }}
    />
    {text && <p className="mt-2 text-gray-600">{text}</p>}
  </div>
);

/* =======================
   Certificate Card
======================= */
const CertificateCard = ({ data }) => (
  <div className="max-w-6xl p-8 mx-auto bg-white border border-gray-200 shadow-lg rounded-xl">
    <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-2xl">{data.courseName}</h2>
    <p className="mb-6 text-lg text-gray-600 md:text-base">
      Issued to <span className="font-semibold">{data.studentName}</span>
    </p>

    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-gray-500 md:text-base">Certificate ID</p>
        <p className="font-mono text-base text-gray-500 md:text-lg">{data.certificateNumber}</p>
      </div>

      <QRCodeCanvas value={data.verifyLink} size={120} bgColor="#fff" fgColor="#15256E" level="H" />
    </div>

    <p className="mb-2 text-sm text-gray-500 md:text-base">Issued on {data.issuedAt}</p>
    <p className="text-base text-gray-700 md:text-lg">Instructor: {data.instructor}</p>
  </div>
);

/* =======================
   Main Certificate Component
======================= */
const Certificate = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await api.get("/v1/certificates");
        const cert = res.data?.data?.[0];
        if (!cert) return;

        setData({
          id: cert.id,
          studentName: `${cert.student.first_name} ${cert.student.last_name}`,
          courseName: cert.course.title,
          certificateNumber: cert.certificate_number,
          issuedAt: cert.issued_at,
          verifyLink: cert.links.verify,
          downloadLink: cert.links.download_pdf,
          instructor: cert.instructor_name || "Instructor",
        });
   

} catch (error) {
  const message = error?.response?.data?.message;
  console.error("Error message:", message);
  setError(message);   // ⭐ THIS LINE IS MISSING
} finally {
  setLoading(false);
}
    };

    fetchCertificate();
  }, []);

  const downloadPDF = async () => {
    if (!data) return;
    setDownloading(true);
    try {
      const res = await api.get(data.downloadLink, { responseType: "blob" });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.studentName}-certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setDownloading(false);
    }
  };

  const verifyCertificate = () => {
    if (!data) return;
    setVerifying(true);
    window.open(data.verifyLink, "_blank");
    setTimeout(() => setVerifying(false), 1000);
  };

  
if (loading) return <Spinner size={12} />;

if (error)
  return (
    <p className="mt-10 font-medium text-center text-red-500">
      {error}
    </p>
  );

if (!data)
  return (
    <p className="mt-10 text-center">
      No certificate available.
    </p>
  );

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={verifyCertificate}
          disabled={verifying}
          className="flex items-center gap-2 px-4 py-2 text-sm text-black border rounded"
        >
          {verifying && (
            <span className="w-4 h-4 border-2 border-gray-500 rounded-full animate-spin border-t-transparent"></span>
          )}
          Verify Certificate
        </button>

        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="px-4 py-2 bg-[#15256E] text-white rounded text-sm flex items-center gap-2"
        >
          {downloading && (
            <span className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></span>
          )}
          Download PDF
        </button>
      </div>

      <CertificateCard data={data} />
    </div>
  );
};

export default Certificate;