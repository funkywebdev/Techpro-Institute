


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import Spinner from "../components/Spinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const QuizReview = () => {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [reviewData, setReviewData] = useState(null);

//   const optionLabels = ["A", "B", "C", "D"];

//   useEffect(() => {
//     if (!attemptId) {
//       setLoading(false);
//       toast.error("Invalid attempt ID");
//       return;
//     }

//     const fetchReview = async () => {
//       try {
//         const res = await api.get(`/v1/quiz-attempts/${attemptId}/review`);
//         console.log("Full API Response:", res.data);
//         const data = res.data.data;

//         // Map options with correct/selected logic as booleans
//         const mappedQuestions = data.questions.map((q) => ({
//           ...q,
//           options: q.options.map((opt) => ({
//             ...opt,
//             is_correct: Number(opt.id) === Number(q.correct_answer_id),
//             is_selected: Number(opt.id) === Number(q.selected_option_id),
//           })),
//         }));

//         setReviewData({
//           ...data,
//           questions: mappedQuestions,
//           passed: data.passed === "1" || data.passed === 1,
//           score: Number(data.score),
//           total_questions: Number(data.total_questions),
//           percentage: Number(data.percentage),
//         });
//       } catch (error) {
//         console.error("FETCH REVIEW ERROR ❌", error);
//         toast.error("Failed to load quiz review");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReview();
//   }, [attemptId]);

//   if (loading) return <Spinner />;

//   if (!reviewData) return <p className="mt-10 text-center">No review data found</p>;

//   return (
//     <div className="flex justify-center min-h-screen p-6 bg-gray-100">
//       <ToastContainer />
//       <div className="w-full max-w-5xl p-6 bg-white shadow rounded-xl">
//         <h1 className="mb-6 text-3xl font-bold text-center">Quiz Review</h1>

//         {/* Score Summary */}
//         <div className="mb-8 text-center">
//           <div className="text-4xl font-bold">
//             {reviewData.score}/{reviewData.total_questions}
//           </div>
//           <p className="mt-2 text-lg">Score: {reviewData.percentage}%</p>
//           <p className="mt-2 text-lg">
//             {reviewData.passed ? "✅ Passed" : "❌ Failed"}
//           </p>
//         </div>

//         {/* Questions */}
//         <div className="space-y-8">
//           {reviewData.questions.map((q, index) => (
//             <div key={q.question_id} className="p-5 border rounded-lg">
//               <h2 className="mb-4 font-semibold">
//                 {index + 1}. {q.question}
//               </h2>

//               {q.options.map((opt, i) => {
//                 let style = "bg-gray-100 border rounded p-3 mb-2";

//                 if (opt.is_correct && opt.is_selected) {
//                   style += " bg-green-200 border-green-500"; // Correct & selected
//                 } else if (opt.is_correct) {
//                   style += " bg-green-100 border-green-500"; // Correct but not selected
//                 } else if (opt.is_selected && !opt.is_correct) {
//                   style += " bg-red-100 border-red-500"; // Wrong selected
//                 }

//                 return (
//                   <div key={opt.id} className={style}>
//                     <strong>{optionLabels[i]}.</strong> {opt.text}

//                     {/* Labels */}
//                     {opt.is_correct && opt.is_selected && (
//                       <span className="ml-2 font-semibold text-green-700">
//                         ✔ Correct Answer (Your Answer)
//                       </span>
//                     )}
//                     {opt.is_correct && !opt.is_selected && (
//                       <span className="ml-2 font-semibold text-green-700">
//                         ✔ Correct Answer
//                       </span>
//                     )}
//                     {!opt.is_correct && opt.is_selected && (
//                       <span className="ml-2 font-semibold text-red-700">
//                         ✖ Your Answer
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}

//               {/* Show correct answer if user got it wrong */}
//               {!q.options.some(opt => opt.is_selected && opt.is_correct) && (
//                 <p className="mt-2 font-semibold text-green-700">
//                   Correct Answer: {q.options.find(opt => opt.is_correct)?.text}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Back Button */}
//         <div className="mt-10 text-center">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="px-6 py-3 border-2 border-[#15256E] rounded"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizReview;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import Spinner from "../components/Spinner";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";

// const QuizReview = () => {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [reviewData, setReviewData] = useState(null);
//   const optionLabels = ["A", "B", "C", "D"];


//    const handleRetakeQuiz = () => {
//     if (!reviewData?.quiz_id) {
//       toast.error("Quiz ID missing");
//       return;
//     }

//     navigate(`/quiz/${reviewData.quiz_id}`);
//   };


//   useEffect(() => {
//     if (!attemptId) {
//       setLoading(false);
//       toast.error("Invalid attempt ID");
//       return;
//     }

//     const fetchReview = async () => {
//       try {
//         const res = await api.get(`/v1/quiz-attempts/${attemptId}/review`);
//         const data = res.data.data;

//         const mappedQuestions = data.questions.map((q) => ({
//           ...q,
//           options: q.options.map((opt) => ({
//             ...opt,
//             is_correct: Number(opt.id) === Number(q.correct_answer_id),
//             is_selected: Number(opt.id) === Number(q.selected_option_id),
//           })),
//         }));

//         setReviewData({
//           ...data,
//           questions: mappedQuestions,
//           passed: data.passed === "1" || data.passed === 1,
//           score: Number(data.score),
//           total_questions: Number(data.total_questions),
//           percentage: Number(data.percentage),
//         });
//       } catch (error) {
//         console.error("FETCH REVIEW ERROR ❌", error);
//         toast.error("Failed to load quiz review");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReview();
//   }, [attemptId]);

//   if (loading) return <Spinner />;
//   if (!reviewData) return <p className="mt-10 text-center">No review data found</p>;

//   return (
//     <div className="flex justify-center min-h-screen p-6 bg-gray-50">
//       <ToastContainer />
//       <div className="w-full max-w-6xl">
//         {/* Score Card */}
//         <div className="p-6 mb-8 text-center bg-white shadow-md rounded-xl">
//           <h1 className="mb-4 text-3xl font-bold">Quiz Review</h1>
//           <div className="text-4xl font-extrabold text-gray-800">
//             {reviewData.score}/{reviewData.total_questions}
//           </div>
//           <p className="mt-2 text-lg text-gray-600">Score: {reviewData.percentage}%</p>
//           <p className={`mt-2 text-lg font-semibold ${reviewData.passed ? "text-green-600" : "text-red-600"}`}>
//             {reviewData.passed ? "✅ Passed" : "❌ Failed"}
//           </p>

//           {/* Progress Bar */}
//           <div className="w-full h-3 mt-4 bg-gray-200 rounded-full">
//             <div
//               className={`h-3 rounded-full ${reviewData.passed ? "bg-green-500" : "bg-red-500"}`}
//               style={{ width: `${reviewData.percentage}%` }}
//             />
//           </div>
//         </div>

//         {/* Questions */}
//         <div className="space-y-6">
//           {reviewData.questions.map((q, index) => (
//             <div key={q.question_id} className="p-5 bg-white shadow-md rounded-xl">
//               <h2 className="mb-4 text-lg font-semibold">{index + 1}. {q.question}</h2>
//               <div className="space-y-2">
//                 {q.options.map((opt, i) => {
//                   let style = "flex items-center p-3 rounded-lg border";
//                   let badgeColor = "bg-gray-200 text-gray-800";

//                   if (opt.is_correct && opt.is_selected) {
//                     style += " bg-green-100 border-green-500";
//                     badgeColor = "bg-green-500 text-white";
//                   } else if (opt.is_correct) {
//                     style += " bg-green-50 border-green-400";
//                     badgeColor = "bg-green-400 text-white";
//                   } else if (opt.is_selected && !opt.is_correct) {
//                     style += " bg-red-100 border-red-500";
//                     badgeColor = "bg-red-500 text-white";
//                   }

//                   return (
//                     <div key={opt.id} className={style}>
//                       <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold mr-3 ${badgeColor}`}>
//                         {optionLabels[i]}
//                       </span>
//                       <span className="flex-1">{opt.text}</span>
//                       {opt.is_correct && (
//                         <FiCheckCircle className="w-5 h-5 ml-2 text-green-600" />
//                       )}
//                       {opt.is_selected && !opt.is_correct && (
//                         <FiXCircle className="w-5 h-5 ml-2 text-red-600" />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Correct Answer Notice */}
//               {!q.options.some(opt => opt.is_selected && opt.is_correct) && (
//                 <p className="mt-2 font-semibold text-green-700">
//                   Correct Answer: {q.options.find(opt => opt.is_correct)?.text}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Back Button */}
//         {/* <div className="mt-10 text-center">
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="px-6 py-3 border-2 border-[#15256E] rounded-full font-semibold hover:bg-[#15256E] hover:text-white transition"
//           >
//             Back to Dashboard
//           </button>
//         </div> */}

//         <div className="flex flex-col items-center gap-4 mt-10 sm:flex-row sm:justify-center">
  
//   {/* Retake Quiz */}
//   <button
//     onClick={handleRetakeQuiz}
//     className="px-6 py-3 bg-[#15256E] text-white font-semibold rounded-full shadow hover:bg-[#0f1d56] transition flex items-center gap-2"
//   >
//     🔁 Retake Quiz
//   </button>

//   {/* Back to Dashboard */}
//   <button
//     onClick={() => navigate("/dashboard")}
//     className="px-6 py-3 border-2 border-[#15256E] text-[#15256E] font-semibold rounded-full hover:bg-[#15256E] hover:text-white transition"
//   >
//     Go to Dashboard
//   </button>

// </div>
//       </div>
//     </div>
//   );
// };

// export default QuizReview;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import Spinner from "../components/Spinner";
// import { ToastContainer, toast } from "react-toastify";
// import { FiCheckCircle, FiXCircle } from "react-icons/fi";
// import "react-toastify/dist/ReactToastify.css";

// const QuizReview = () => {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [reviewData, setReviewData] = useState(null);

//   const optionLabels = ["A", "B", "C", "D"];

//   const handleRetakeQuiz = () => {
//     if (!reviewData?.quiz_id) {
//       toast.error("Quiz ID missing");
//       return;
//     }
//     navigate(`/quiz/${reviewData.quiz_id}`);
//   };

//   useEffect(() => {
//     const fetchReview = async () => {
//       try {
//         const res = await api.get(`/v1/quiz-attempts/${attemptId}/review`);
//         const data = res.data.data;

//         const mappedQuestions = data.questions.map((q) => ({
//           ...q,
//           options: q.options.map((opt) => ({
//             ...opt,
//             is_correct: Number(opt.id) === Number(q.correct_answer_id),
//             is_selected: Number(opt.id) === Number(q.selected_option_id),
//           })),
//         }));

//         setReviewData({
//           ...data,
//           questions: mappedQuestions,
//           passed: data.passed === "1" || data.passed === 1,
//         });
//       } catch (error) {
//         toast.error("Failed to load quiz review");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReview();
//   }, [attemptId]);

//   if (loading) return <Spinner />;
//   if (!reviewData) return <p className="mt-10 text-center">No data found</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <ToastContainer />

//       <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-4">

//         {/* SIDEBAR */}
//         <div className="space-y-6 lg:col-span-1">

//           {/* SCORE CARD */}
//           <div className="sticky p-6 text-center bg-white border rounded-xl top-6">
//             <h2 className="mb-4 text-lg font-semibold">Your Score</h2>

//             <div className="text-4xl font-bold text-[#15256E]">
//               {reviewData.score}/{reviewData.total_questions}
//             </div>

//             <p className="mt-2 text-gray-500">
//               {reviewData.percentage}% Score
//             </p>

//             <p
//               className={`mt-2 font-medium ${
//                 reviewData.passed ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {reviewData.passed ? "Passed" : "Failed"}
//             </p>

//             <div className="h-2 mt-4 bg-gray-200 rounded-full">
//               <div
//                 className="bg-[#15256E] h-2 rounded-full"
//                 style={{ width: `${reviewData.percentage}%` }}
//               />
//             </div>

//             <div className="mt-6 space-y-3">
//               <button
//                 onClick={handleRetakeQuiz}
//                 className="w-full bg-[#15256E] text-white py-2 rounded-lg font-medium hover:opacity-90"
//               >
//                 Retake Quiz
//               </button>

//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="w-full py-2 font-medium border rounded-lg hover:bg-gray-100"
//               >
//                 Dashboard
//               </button>
//             </div>
//           </div>

//           {/* QUESTION NAVIGATION */}
//           <div className="p-4 bg-white border rounded-xl">
//             <h3 className="mb-3 font-semibold">Questions</h3>

//             <div className="grid grid-cols-5 gap-2">
//               {reviewData.questions.map((q, index) => {
//                 const correct = q.options.some(
//                   (opt) => opt.is_correct && opt.is_selected
//                 );

//                 return (
//                   <button
//                     key={index}
//                     onClick={() =>
//                       document
//                         .getElementById(`question-${index}`)
//                         .scrollIntoView({ behavior: "smooth" })
//                     }
//                     className={`text-sm py-1 rounded ${
//                       correct
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* QUESTIONS SECTION */}
//         <div className="space-y-8 lg:col-span-3">
//           {reviewData.questions.map((q, index) => (
//             <div
//               id={`question-${index}`}
//               key={q.question_id}
//               className="p-6 bg-white border rounded-xl"
//             >
//               <h2 className="mb-5 font-semibold text-gray-800">
//                 {index + 1}. {q.question}
//               </h2>

//               <div className="space-y-3">
//                 {q.options.map((opt, i) => {
//                   let border = "border-gray-200";
//                   let icon = null;

//                   if (opt.is_correct) {
//                     border = "border-green-400 bg-green-50";
//                     icon = <FiCheckCircle className="text-green-600" />;
//                   }

//                   if (opt.is_selected && !opt.is_correct) {
//                     border = "border-red-400 bg-red-50";
//                     icon = <FiXCircle className="text-red-500" />;
//                   }

//                   return (
//                     <div
//                       key={opt.id}
//                       className={`flex items-center gap-3 border ${border} rounded-lg p-3`}
//                     >
//                       <span className="flex items-center justify-center text-sm font-semibold bg-gray-100 rounded-full w-7 h-7">
//                         {optionLabels[i]}
//                       </span>

//                       <span className="flex-1">{opt.text}</span>

//                       {icon}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizReview;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const QuizReview = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState(null);

  const optionLabels = ["A", "B", "C", "D"];

  const handleRetakeQuiz = () => {
  // Use the correct field name from your API
  const quizId = reviewData?.quiz_id || reviewData?.id; 

  if (!quizId) {
    toast.error("Quiz ID missing");
    return;
  }

  navigate(`/quiz/${quizId}`);
};



  useEffect(() => {
  if (!attemptId) {
    toast.error("Invalid attempt ID");
    return;
  }

  const fetchReview = async () => {
    try {
      const res = await api.get(`/v1/quiz-attempts/${attemptId}/review`);

      // ✅ Log the entire response
      console.log("API response:", res);

      const data = res.data.data;

      // ✅ Also log the extracted data
      console.log("Extracted data:", data);

      const mappedQuestions = data.questions.map((q) => ({
        ...q,
        options: q.options.map((opt) => ({
          ...opt,
          is_correct: Number(opt.id) === Number(q.correct_answer_id),
          is_selected: Number(opt.id) === Number(q.selected_option_id),
        })),
      }));

      setReviewData({
        ...data,
        questions: mappedQuestions,
        passed: data.passed === "1" || data.passed === 1,
        score: Number(data.score),
        total_questions: Number(data.total_questions),
        percentage: Number(data.percentage),
      });
    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error("Failed to load quiz review");
    } finally {
      setLoading(false);
    }
  };

  fetchReview();
}, [attemptId]);

  if (loading) return <Spinner />;
  if (!reviewData) return <p className="mt-10 text-center">No review data</p>;

  /* =========================
     SCORE CIRCLE CALCULATION
  ========================== */

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (reviewData.percentage / 100) * circumference;

  /* =========================
     STATISTICS
  ========================== */

  const correctAnswers = reviewData.questions.filter((q) =>
    q.options.some((opt) => opt.is_correct && opt.is_selected)
  ).length;

  const wrongAnswers = reviewData.total_questions - correctAnswers;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <ToastContainer />

      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-4">

        {/* =========================
            SIDEBAR
        ========================== */}

        <div className="space-y-6 lg:col-span-1">

          {/* SCORE CARD */}

          <div className="sticky p-6 bg-white border rounded-xl top-6">

            <h2 className="mb-4 text-lg font-semibold text-center">
              Quiz Result
            </h2>

            {/* SCORE CIRCLE */}

            <div className="flex justify-center">
              <svg width="120" height="120">

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="transparent"
                />

                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#15256E"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={progress}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-xl font-bold fill-[#15256E]"
                >
                  {reviewData.percentage}%
                </text>

              </svg>
            </div>

            <p className="mt-3 text-center text-gray-600">
              Score {reviewData.score} / {reviewData.total_questions}
            </p>

            <p
              className={`text-center font-semibold mt-1 ${
                reviewData.passed ? "text-green-600" : "text-red-500"
              }`}
            >
              {reviewData.passed ? "Passed" : "Failed"}
            </p>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-4 mt-6 text-center">

              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Correct</p>
                <p className="font-bold text-green-600">{correctAnswers}</p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500">Wrong</p>
                <p className="font-bold text-red-500">{wrongAnswers}</p>
              </div>

            </div>

            {/* BUTTONS */}

            <div className="mt-6 space-y-3">

              <button
                onClick={handleRetakeQuiz}
                className="w-full bg-[#15256E] text-white py-2 rounded-lg font-medium hover:opacity-90"
              >
                Retake Quiz
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-2 border rounded-lg hover:bg-gray-100"
              >
                Dashboard
              </button>

            </div>

          </div>

          {/* QUESTION NAVIGATION */}

          <div className="p-4 bg-white border rounded-xl">

            <h3 className="mb-3 font-semibold">Questions</h3>

            <div className="grid grid-cols-5 gap-2">

              {reviewData.questions.map((q, index) => {

                const correct = q.options.some(
                  (opt) => opt.is_correct && opt.is_selected
                );

                return (
                  <button
                    key={index}
                    onClick={() =>
                      document
                        .getElementById(`question-${index}`)
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className={`text-sm py-1 rounded ${
                      correct
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}

            </div>

          </div>
        </div>

        {/* =========================
            QUESTIONS SECTION
        ========================== */}

        <div className="space-y-8 lg:col-span-3">

          {reviewData.questions.map((q, index) => (

            <div
              key={q.question_id}
              id={`question-${index}`}
              className="p-6 bg-white border rounded-xl"
            >

              {/* QUESTION TITLE */}

              <h2 className="flex items-center gap-3 mb-5 font-semibold text-gray-800">

                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#15256E] text-white text-sm">
                  {index + 1}
                </span>

                {q.question}

              </h2>

              {/* OPTIONS */}

              <div className="space-y-3">

                {q.options.map((opt, i) => {

                  let border = "border-gray-200";
                  let icon = null;

                  if (opt.is_correct) {
                    border = "border-green-400 bg-green-50";
                    icon = <FiCheckCircle className="text-green-600" />;
                  }

                  if (opt.is_selected && !opt.is_correct) {
                    border = "border-red-400 bg-red-50";
                    icon = <FiXCircle className="text-red-500" />;
                  }

                  return (

                    <div
                      key={opt.id}
                      className={`flex items-center gap-3 border ${border} rounded-lg p-3`}
                    >

                      <span className="flex items-center justify-center text-sm font-semibold bg-gray-100 rounded-full w-7 h-7">
                        {optionLabels[i]}
                      </span>

                      <span className="flex-1 text-gray-700">
                        {opt.text}
                      </span>

                      {icon}

                    </div>
                  );
                })}
              </div>

              {/* EXPLANATION */}

              {q.explanation && (
                <div className="p-4 mt-4 text-sm text-gray-600 border rounded-lg bg-gray-50">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default QuizReview;