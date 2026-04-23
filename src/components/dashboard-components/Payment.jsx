



import React, { useEffect, useState } from "react";
import api from "../../api/axios";

// =========================
// Spinner Component
// =========================
const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin" />
  </div>
);

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await api.get("v1/payment/records"); // replace with your API
        setPayments(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const statusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs md:text-sm";
      case "pending":
        return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs md:text-sm";
      case "declined":
        return "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs md:text-sm";
      default:
        return "";
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="mb-4 md:mb-6">
        <h1 className="mb-1 text-xl font-bold text-black md:text-2xl md:mb-2">
          Payments & Invoices
        </h1>
        <p className="text-sm text-gray-600 md:text-base">
          View and manage your past transactions and active subscriptions
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-6 md:py-3 md:text-sm">
                Date
              </th>
              <th className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-6 md:py-3 md:text-sm">
                Course
              </th>
              <th className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-6 md:py-3 md:text-sm">
                Amount
              </th>
              <th className="px-3 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase md:px-6 md:py-3 md:text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm text-gray-700 md:px-6 md:py-4 whitespace-nowrap md:text-base">
                  {new Date(payment.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700 md:px-6 md:py-4 whitespace-nowrap md:text-base">
                  {payment.enrollment.course_title}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700 md:px-6 md:py-4 whitespace-nowrap md:text-base">
                   {payment.currency} {Number(payment.amount_due).toLocaleString()}
                </td>
                <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap">
                  <span className={statusStyles(payment.status)}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPage;



