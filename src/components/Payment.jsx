import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const Payment = () => {
  const { id } = useParams(); // course ID from URL

  const [paymentSchedules, setPaymentSchedules] = useState([]);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const activeStyles = "border-[#15256E] bg-[#15256E]/5";

  // 🔹 Fetch payment schedules and student info
  useEffect(() => {
    const fetchPaymentSchedule = async () => {
      try {
        const res = await api.get(`/v1/courses/${id}/payment-schedule`);
        const schedules = res.data.data.paymentSchedule;
        setPaymentSchedules(schedules);
        setStudent(res.data.data.student);

        // default select first payment option
        setSelectedSchedule(schedules[0]);
      } catch (error) {
        console.error("Failed to load payment schedule", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentSchedule();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 text-center text-gray-600">
        Loading payment options...
      </div>
    );
  }

  if (!selectedSchedule) {
    return (
      <div className="pt-40 text-center text-red-600">
        No payment schedule available
      </div>
    );
  }

  const { amount, currency } = selectedSchedule.price;

const handleEnroll = async () => {
  if (!selectedSchedule || !student) return;

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You must be logged in to enroll");
    return;
  }

  const payload = {
    student_id: student.id,
    course_id: Number(id),
    payment_schedule_id: selectedSchedule.id,
    payment_schedule_price_id: selectedSchedule.price.id,
    amount_due: Number(selectedSchedule.price.amount),
    currency: selectedSchedule.price.currency,
    region: student.region,
  };

  try {
    setIsEnrolling(true);

    const res = await api.post("/v1/enrollments", payload);

    // ✅ CHECK SUCCESS EXPLICITLY
    if (res.status === 200 || res.status === 201) {
      toast.success("Enrollment stored successfully 🎉");

      // ✅ navigate ONLY here
      navigate("/complete", { replace: true });
    }
  } catch (error) {
    // ❌ NO NAVIGATION HERE
    console.error("Enrollment failed", error);

    toast.error(
      error.response?.data?.message ||
      "Enrollment failed. Please try again."
    );
  } finally {
    setIsEnrolling(false);
  }
};

  return (
    <div className="bg-[#F2F4F8] px-4 pt-24 pb-5 sm:pt-32 sm:pb-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg px-4 py-6 sm:px-8 sm:py-10 space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-[#15256E]">
          Select a Payment Method
        </h1>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentSchedules.map((schedule) => (
            <div
              key={schedule.id}
              onClick={() => setSelectedSchedule(schedule)}
              className={`cursor-pointer rounded-lg p-5 border space-y-3 transition ${
                selectedSchedule.id === schedule.id
                  ? activeStyles
                  : "border-gray-300 hover:border-[#15256E]"
              }`}
            >
              <div className="flex items-center gap-2 text-[#15256E]">
                <MdEmail size={22} />
                <p className="font-medium capitalize">{schedule.name}</p>
              </div>

              <p className="text-sm text-gray-600">{schedule.description}</p>

              <p className="text-2xl font-bold text-[#15256E]">
                {schedule.price.currency} {schedule.price.amount}
              </p>

              {schedule.name.toLowerCase().includes("full") ? (
                <p className="text-sm text-green-600">
                  Instant activation after approval
                </p>
              ) : (
                <p className="text-sm text-orange-600">
                  Remaining balance paid later
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="bg-[#EEF1FB] rounded-lg p-5 space-y-4">
          <div className="flex justify-between">
            <p>Course Fee</p>
            <p>
              {currency} {amount}
            </p>
          </div>

          <div className="flex justify-between font-semibold">
            <p>Total payable now</p>
            <p className="text-[#15256E]">
              {currency} {amount}
            </p>
          </div>

          <hr />

          {/* Student Info */}
          {student && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p>Name</p>
                <p>
                  {student.firstName} {student.lastName}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Email</p>
                <p>{student.email}</p>
              </div>
              <div className="flex justify-between">
                <p>Phone</p>
                <p>{student.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Enroll Button */}
        <button
          onClick={handleEnroll}
          disabled={isEnrolling}
          className="w-full bg-[#15256E] text-white py-3 rounded-lg font-semibold hover:bg-[#101B52] transition disabled:opacity-50"
        >
          {isEnrolling ? "Processing..." : `Pay ${currency} ${amount} Now`}
        </button>
      </div>
    </div>
  );
};

export default Payment;