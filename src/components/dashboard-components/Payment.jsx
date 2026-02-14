import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await api.get("v1/payment/records"); // replace with your API
        // Extract the array from the API response
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
    switch (status.toLowerCase()) { // API statuses are lowercase
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

  if (loading) return <p className="p-4 text-gray-600">Loading payments...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Payments & Invoices</h1>
        <p className="text-gray-600 text-sm md:text-base">
          View and manage your past transactions and active subscriptions
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-700 text-sm md:text-base">
                  {new Date(payment.created_at).toLocaleDateString()}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-700 text-sm md:text-base">
                  {payment.enrollment.course_title}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-700 text-sm md:text-base">
                  {payment.currency} {payment.amount_due}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
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



// import React from "react";

// const PaymentPage = () => {
//   const payments = [
//     { date: "2026-01-01", course: "Scrum Master", amount: "$50", status: "Paid" },
//     { date: "2026-01-05", course: "Scrum Master", amount: "$40", status: "Pending" },
//     { date: "2026-01-10", course: "Scrum Master", amount: "$60", status: "Paid" },
//   ];

//   const statusStyles = (status) => {
//     switch (status) {
//       case "Paid":
//         return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs md:text-sm";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs md:text-sm";
//       case "Failed":
//         return "bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs md:text-sm";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="mb-4 md:mb-6">
//         <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Payments & Invoices</h1>
//         <p className="text-gray-600 text-sm md:text-base">
//           View and manage your past transactions and active subscriptions
//         </p>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Course
//               </th>
//               <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {payments.map((payment, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-700 text-sm md:text-base">
//                   {payment.date}
//                 </td>
//                 <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-700 text-sm md:text-base">
//                   {payment.course}
//                 </td>
//                 <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-700 text-sm md:text-base">
//                   {payment.amount}
//                 </td>
//                 <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
//                   <span className={statusStyles(payment.status)}>
//                     {payment.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



