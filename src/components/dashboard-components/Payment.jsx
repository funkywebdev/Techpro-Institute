import React from "react";

const PaymentPage = () => {
  // Sample data
  const payments = [
    {
      date: "2026-01-01",
      course: "Scrum Master",
      amount: "$50",
      status: "Paid",
    },
    {
      date: "2026-01-05",
      course: "Scrum Master",
      amount: "$40",
      status: "Pending",
    },
    {
      date: "2026-01-10",
      course: "Scrum Master",
      amount: "$60",
      status: "Paid",
    },
  ];

  // Function to style status
  const statusStyles = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm";
      case "Failed":
        return "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Payments & Invoices</h1>
        <p className="text-gray-600">
          View and manage your past transactions and active subscriptions
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {payment.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={statusStyles(payment.status)}>
                    {payment.status}
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
