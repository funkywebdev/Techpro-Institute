import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";


const Payment = () => {
  const [paymentType, setPaymentType] = useState("full");

  const fullAmount = 120;
  const installmentAmount = 60;

  const amountToPay =
    paymentType === "full" ? fullAmount : installmentAmount;

  const activeStyles = "border-[#15256E] bg-[#15256E]/5";

  return (
    <div className="bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg px-4 py-6 sm:px-8 sm:py-10 space-y-6">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-[#15256E]">
          Select a Payment Method
        </h1>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Payment */}
          <div
            onClick={() => setPaymentType("full")}
            className={`cursor-pointer rounded-lg p-5 border space-y-3 transition ${
              paymentType === "full"
                ? activeStyles
                : "border-gray-300 hover:border-[#15256E]"
            }`}
          >
            <div className="flex items-center gap-2 text-[#15256E]">
              <MdEmail size={22} />
              <p className="font-medium">Full Payment</p>
            </div>

            <p className="text-sm text-gray-600">
              Pay once and get full course access after verification
            </p>

            <p className="text-2xl font-bold text-[#15256E]">$120</p>
            <p className="text-sm text-green-600">
              Instant activation after approval
            </p>
          </div>

          {/* Installment Payment */}
          <div
            onClick={() => setPaymentType("installment")}
            className={`cursor-pointer rounded-lg p-5 border space-y-3 transition ${
              paymentType === "installment"
                ? activeStyles
                : "border-gray-300 hover:border-[#15256E]"
            }`}
          >
            <div className="flex items-center gap-2 text-[#15256E]">
              <MdEmail size={22} />
              <p className="font-medium">Installment Payment</p>
            </div>

            <p className="text-sm text-gray-600">
              Pay in two installments. Access granted after first payment
            </p>

            <p className="text-2xl font-bold text-[#15256E]">$60 now</p>
            <p className="text-sm text-orange-600">
              Remaining balance paid later
            </p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-[#EEF1FB] rounded-lg p-5 space-y-4">
          <div className="flex justify-between">
            <p>Course Fee</p>
            <p>$120</p>
          </div>

          <div className="flex justify-between font-semibold">
            <p>Total payable now</p>
            <p className="text-[#15256E]">${amountToPay}</p>
          </div>

          <hr />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <p>Name</p>
              <p>Olamide</p>
            </div>
            <div className="flex justify-between">
              <p>Email</p>
              <p>sample@gmail.com</p>
            </div>
            <div className="flex justify-between">
              <p>Phone</p>
              <p>+24-9059927681</p>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        
        <Link
          to="/complete"
          className="w-full bg-[#15256E] text-white py-3 rounded-lg font-semibold hover:bg-[#101B52] transition inline-block text-center"
        >
          Pay ${amountToPay} Now
        </Link>
      </div>
    </div>
  );
};

export default Payment;
