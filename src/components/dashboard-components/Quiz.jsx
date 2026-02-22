// import { useEffect, useState, useRef } from "react";
// import api from "../../api/axios";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const QUIZ_TIME_PER_QUESTION = 60;
// const READY_TIME = 15;

// const Quiz = () => {
//   const { id: moduleId } = useParams();

//   const [quizId, setQuizId] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [result, setResult] = useState(null);

//   const [readyTime, setReadyTime] = useState(READY_TIME);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);
//   const [reviewing, setReviewing] = useState(false);

//   const timerRef = useRef(null);
//   const optionLabels = ["A", "B", "C", "D"];

//   /* ===================== FETCH QUIZ ===================== */
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await api.get(`/v1/modules/${moduleId}/quiz`);
//         const quiz = res.data.data;
//         if (!quiz) {
//           toast.error("No quiz found");
//           return;
//         }
//         setQuizId(quiz.id);
//         setQuestions(quiz.questions || []);
//       } catch (err) {
//         console.error("FETCH ERROR ❌", err.response || err);
//         toast.error("Failed to load quiz");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [moduleId]);

//   /* ===================== READY TIMER ===================== */
//   useEffect(() => {
//     if (quizStarted) return;
//     const interval = setInterval(() => {
//       setReadyTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setQuizStarted(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [quizStarted]);

//   /* ===================== QUESTION TIMER ===================== */
//   useEffect(() => {
//     if (!quizStarted || showResult || reviewing) return;

//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           handleNext(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [currentQuestion, quizStarted, showResult, reviewing]);

//   useEffect(() => {
//     if (quizStarted) {
//       setTimeLeft(QUIZ_TIME_PER_QUESTION);
//     }
//   }, [currentQuestion, quizStarted]);

//   /* ===================== NEXT / PREV ===================== */
//   const handleNext = (auto = false) => {
//     const current = questions[currentQuestion];
//     if (!auto && !selectedOption) return;

//     const updatedAnswers = [
//       ...answers.filter((a) => a.question_id !== current.id),
//       {
//         question_id: current.id,
//         selected_option_id: selectedOption?.id || null,
//       },
//     ];
//     setAnswers(updatedAnswers);

//     if (currentQuestion === questions.length - 1) {
//       setReviewing(true);
//     } else {
//       setSelectedOption(
//         updatedAnswers.find(a => a.question_id === questions[currentQuestion + 1].id)
//           ?.selected_option_id
//           ? questions[currentQuestion + 1].options.find(
//               o =>
//                 o.id ===
//                 updatedAnswers.find(a => a.question_id === questions[currentQuestion + 1].id)
//                   .selected_option_id
//             )
//           : null
//       );
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestion === 0) return;
//     setCurrentQuestion((prev) => prev - 1);
//     setSelectedOption(
//       answers.find(a => a.question_id === questions[currentQuestion - 1].id)
//         ?.selected_option_id
//         ? questions[currentQuestion - 1].options.find(
//             o =>
//               o.id ===
//               answers.find(a => a.question_id === questions[currentQuestion - 1].id)
//                 .selected_option_id
//           )
//         : null
//     );
//   };

//   /* ===================== SUBMIT QUIZ ===================== */
//   const submitQuiz = async (finalAnswers) => {
//     if (!quizId) {
//       toast.error("Quiz ID missing");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       await api.post(`/v1/quizzes/${quizId}/submit`, { answers: finalAnswers });
//       toast.success("Quiz submitted!");
//       await fetchQuizScore(quizId);
//       setShowResult(true);
//     } catch (error) {
//       console.error("SUBMIT ERROR ❌", error.response || error);
//       toast.error(error.response?.data?.message || "Submit failed");
//     } finally {
//       setSubmitting(false);
//       setReviewing(false);
//     }
//   };

//   /* ===================== FETCH QUIZ SCORE ===================== */
//   const fetchQuizScore = async (qid) => {
//     try {
//       const res = await api.get(`/v1/quiz/${qid}/score`);
//       setResult(res.data.data);
//     } catch (error) {
//       console.error("SCORE FETCH ERROR ❌", error.response || error);
//       toast.error("Failed to fetch quiz score");
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setSelectedOption(null);
//     setAnswers([]);
//     setShowResult(false);
//     setResult(null);
//     setReadyTime(READY_TIME);
//     setQuizStarted(false);
//     setReviewing(false);
//     toast.info("Quiz restarted");
//   };

//   /* ===================== RENDER ===================== */
//   const currentQ = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   return (
//     <div className="flex items-center justify-center px-4 bg-gray-100 min-h-screen">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : !questions.length ? (
//         <p>No quiz available</p>
//       ) : (
//         <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
//           {/* READY SCREEN */}
//           {!quizStarted && (
//             <div className="text-center py-16">
//               <h1 className="text-3xl font-bold mb-4">Get Ready</h1>
//               <p className="text-lg mb-4">Quiz starts in</p>
//               <div className="text-6xl font-extrabold">{readyTime}</div>
//             </div>
//           )}

//           {/* QUESTION SCREEN */}
//           {quizStarted && !showResult && !reviewing && currentQ && (
//             <>
//               <div className="w-full bg-gray-200 h-2 rounded mb-4">
//                 <div
//                   className="bg-[#15256E] h-2 rounded"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <div className="flex justify-between text-sm mb-4">
//                 <span>
//                   Question {currentQuestion + 1}/{questions.length}
//                 </span>
//                 <span>⏱ {timeLeft}s</span>
//               </div>

//               <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

//               <div className="space-y-3">
//                 {currentQ.options.map((option, i) => (
//                   <button
//                     key={option.id}
//                     onClick={() => setSelectedOption(option)}
//                     className={`w-full text-left px-4 py-3 rounded-lg border ${
//                       selectedOption?.id === option.id
//                         ? "bg-blue-100 border-[#15256E]"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <strong className="mr-2">{optionLabels[i]}</strong>
//                     {option.text}
//                   </button>
//                 ))}
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={handlePrev}
//                   disabled={currentQuestion === 0}
//                   className="flex-1 bg-gray-200 py-2 rounded disabled:opacity-50"
//                 >
//                   Prev
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (currentQuestion === questions.length - 1) {
//                       setReviewing(true);
//                     } else {
//                       handleNext(false);
//                     }
//                   }}
//                   disabled={!selectedOption || submitting}
//                   className="flex-1 bg-[#15256E] text-white py-2 rounded"
//                 >
//                   {currentQuestion === questions.length - 1 ? "Review" : "Next"}
//                 </button>
//               </div>
//             </>
//           )}

//           {/* REVIEW SCREEN */}
//           {reviewing && (
//             <div className="py-6">
//               <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
//               <div className="space-y-4">
//                 {questions.map((q, idx) => {
//                   const answer = answers.find((a) => a.question_id === q.id);
//                   return (
//                     <div key={q.id} className="p-4 border rounded">
//                       <p className="font-semibold">{idx + 1}. {q.question}</p>
//                       {q.options.map((opt, i) => (
//                         <div
//                           key={opt.id}
//                           className={`px-3 py-1 rounded ${
//                             answer?.selected_option_id === opt.id
//                               ? "bg-blue-100 border border-blue-500"
//                               : "bg-gray-100"
//                           }`}
//                         >
//                           <strong>{optionLabels[i]}.</strong> {opt.text}
//                         </div>
//                       ))}
//                       <button
//                         onClick={() => {
//                           setCurrentQuestion(idx);
//                           setSelectedOption(
//                             q.options.find((o) => o.id === answer?.selected_option_id)
//                           );
//                           setReviewing(false);
//                         }}
//                         className="mt-2 text-sm text-blue-700 underline"
//                       >
//                         Edit Answer
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => submitQuiz(answers)}
//                 className="mt-6 px-6 py-2 bg-[#15256E] text-white rounded"
//               >
//                 Submit All
//               </button>
//             </div>
//           )}

//           {/* RESULT SCREEN */}
//           {showResult && result && (
//             <div className="text-center py-12">
//               <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
//               <div className="text-5xl font-extrabold mb-3">
//                 {result?.score}/{questions.length}
//               </div>
//               <p className="mb-6 text-lg">
//                 {result?.passed ? "✅ Passed" : "❌ Failed"}
//               </p>
//               <button
//                 onClick={handleRestart}
//                 className="border-2 border-[#15256E] px-6 py-2 rounded"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;


// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const QUIZ_TIME_PER_QUESTION = 60;
// const READY_TIME = 15;

// const Quiz = () => {
//   const { id: moduleId } = useParams();

//   const [quizId, setQuizId] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [result, setResult] = useState(null);
//   const [readyTime, setReadyTime] = useState(READY_TIME);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);
//   const [reviewing, setReviewing] = useState(false);

//   const timerRef = useRef(null);
//   const optionLabels = ["A", "B", "C", "D"];

//   /* ===================== FETCH QUIZ ===================== */
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await api.get(`/v1/modules/${moduleId}/quiz`);
//         const quiz = res.data.data;
//         if (!quiz) {
//           toast.error("No quiz found");
//           return;
//         }
//         setQuizId(quiz.id);
//         setQuestions(quiz.questions || []);
//       } catch (err) {
//         console.error("FETCH ERROR ❌", err.response || err);
//         toast.error("Failed to load quiz");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [moduleId]);

//   /* ===================== READY TIMER ===================== */
//   useEffect(() => {
//     if (quizStarted) return;
//     const interval = setInterval(() => {
//       setReadyTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           setQuizStarted(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [quizStarted]);

//   /* ===================== QUESTION TIMER ===================== */
//   useEffect(() => {
//     if (!quizStarted || showResult || reviewing) return;

//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           handleNext(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [currentQuestion, quizStarted, showResult, reviewing]);

//   useEffect(() => {
//     if (quizStarted) setTimeLeft(QUIZ_TIME_PER_QUESTION);
//   }, [currentQuestion, quizStarted]);

//   /* ===================== NEXT / PREV ===================== */
//   const handleNext = (auto = false) => {
//     const current = questions[currentQuestion];
//     if (!auto && !selectedOption) return;

//     const updatedAnswers = [
//       ...answers.filter((a) => a.question_id !== current.id),
//       {
//         question_id: current.id,
//         selected_option_id: selectedOption?.id || null,
//       },
//     ];
//     setAnswers(updatedAnswers);

//     if (currentQuestion === questions.length - 1) {
//       setReviewing(true);
//     } else {
//       setSelectedOption(
//         updatedAnswers.find(
//           (a) => a.question_id === questions[currentQuestion + 1].id
//         )?.selected_option_id
//           ? questions[currentQuestion + 1].options.find(
//               (o) =>
//                 o.id ===
//                 updatedAnswers.find(
//                   (a) => a.question_id === questions[currentQuestion + 1].id
//                 ).selected_option_id
//             )
//           : null
//       );
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentQuestion === 0) return;
//     setCurrentQuestion((prev) => prev - 1);
//     setSelectedOption(
//       answers.find((a) => a.question_id === questions[currentQuestion - 1].id)
//         ?.selected_option_id
//         ? questions[currentQuestion - 1].options.find(
//             (o) =>
//               o.id ===
//               answers.find(
//                 (a) => a.question_id === questions[currentQuestion - 1].id
//               ).selected_option_id
//           )
//         : null
//     );
//   };

//   /* ===================== SUBMIT QUIZ ===================== */
//   const submitQuiz = async (finalAnswers) => {
//     if (!quizId) {
//       toast.error("Quiz ID missing");
//       return;
//     }

//     try {
//       setSubmitting(true);
//       await api.post(`/v1/quizzes/${quizId}/submit`, { answers: finalAnswers });
//       toast.success("Quiz submitted!");
//       await fetchQuizScore(quizId);
//       setShowResult(true);
//     } catch (error) {
//       console.error("SUBMIT ERROR ❌", error.response || error);
//       toast.error(error.response?.data?.message || "Submit failed");
//     } finally {
//       setSubmitting(false);
//       setReviewing(false);
//     }
//   };

//   /* ===================== FETCH QUIZ SCORE ===================== */
//   const fetchQuizScore = async (qid) => {
//     try {
//       const res = await api.get(`/v1/quiz/${qid}/score`);
//       setResult(res.data.data);
//     } catch (error) {
//       console.error("SCORE FETCH ERROR ❌", error.response || error);
//       toast.error("Failed to fetch quiz score");
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setSelectedOption(null);
//     setAnswers([]);
//     setShowResult(false);
//     setResult(null);
//     setReadyTime(READY_TIME);
//     setQuizStarted(false);
//     setReviewing(false);
//     toast.info("Quiz restarted");
//   };

//   /* ===================== RENDER ===================== */
//   const currentQ = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   return (
//     <div className="flex items-center justify-center px-4 bg-gray-100 min-h-screen">
//       <ToastContainer position="top-right" autoClose={3000} />

//       {loading ? (
//         <p>Loading...</p>
//       ) : !questions.length ? (
//         <p>No quiz available</p>
//       ) : (
//         <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
//           {/* READY SCREEN */}
//           {!quizStarted && (
//             <div className="text-center py-16">
//               <h1 className="text-3xl font-bold mb-4">Get Ready</h1>
//               <p className="text-lg mb-4">Quiz starts in</p>
//               <div className="text-6xl font-extrabold">{readyTime}</div>
//             </div>
//           )}

//           {/* QUESTION SCREEN */}
//           {quizStarted && !showResult && !reviewing && currentQ && (
//             <>
//               <div className="w-full bg-gray-200 h-2 rounded mb-4">
//                 <div
//                   className="bg-[#15256E] h-2 rounded"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               <div className="flex justify-between text-sm mb-4">
//                 <span>
//                   Question {currentQuestion + 1}/{questions.length}
//                 </span>
//                 <span>⏱ {timeLeft}s</span>
//               </div>

//               <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

//               <div className="space-y-3">
//                 {currentQ.options.map((option, i) => (
//                   <button
//                     key={option.id}
//                     onClick={() => setSelectedOption(option)}
//                     className={`w-full text-left px-4 py-3 rounded-lg border ${
//                       selectedOption?.id === option.id
//                         ? "bg-blue-100 border-[#15256E]"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     <strong className="mr-2">{optionLabels[i]}</strong>
//                     {option.text}
//                   </button>
//                 ))}
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={handlePrev}
//                   disabled={currentQuestion === 0}
//                   className="flex-1 bg-gray-200 py-2 rounded disabled:opacity-50"
//                 >
//                   Prev
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (currentQuestion === questions.length - 1) {
//                       setReviewing(true);
//                     } else {
//                       handleNext(false);
//                     }
//                   }}
//                   disabled={!selectedOption || submitting}
//                   className="flex-1 bg-[#15256E] text-white py-2 rounded"
//                 >
//                   {currentQuestion === questions.length - 1 ? "Review" : "Next"}
//                 </button>
//               </div>
//             </>
//           )}

//           {/* REVIEW SCREEN */}
//           {reviewing && (
//             <div className="py-6">
//               <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
//               <div className="space-y-4">
//                 {questions.map((q, idx) => {
//                   const answer = answers.find((a) => a.question_id === q.id);
//                   return (
//                     <div key={q.id} className="p-4 border rounded">
//                       <p className="font-semibold">{idx + 1}. {q.question}</p>
//                       {q.options.map((opt, i) => (
//                         <div
//                           key={opt.id}
//                           className={`px-3 py-1 rounded ${
//                             answer?.selected_option_id === opt.id
//                               ? "bg-blue-100 border border-blue-500"
//                               : "bg-gray-100"
//                           }`}
//                         >
//                           <strong>{optionLabels[i]}.</strong> {opt.text}
//                         </div>
//                       ))}
//                       <button
//                         onClick={() => {
//                           setCurrentQuestion(idx);
//                           setSelectedOption(
//                             q.options.find((o) => o.id === answer?.selected_option_id)
//                           );
//                           setReviewing(false);
//                         }}
//                         className="mt-2 text-sm text-blue-700 underline"
//                       >
//                         Edit Answer
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//               <button
//                 onClick={() => submitQuiz(answers)}
//                 className="mt-6 px-6 py-2 bg-[#15256E] text-white rounded"
//               >
//                 Submit All
//               </button>
//             </div>
//           )}

//           {/* RESULT SCREEN */}
//           {showResult && result && (
//             <div className="text-center py-12">
//               <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
//               <div className="text-5xl font-extrabold mb-3">
//                 {result?.score}/{questions.length}
//               </div>
//               <p className="mb-6 text-lg">
//                 {result?.passed ? "✅ Passed" : "❌ Failed"}
//               </p>
//               <button
//                 onClick={handleRestart}
//                 className="border-2 border-[#15256E] px-6 py-2 rounded"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;




import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QUIZ_TIME_PER_QUESTION = 60;
const READY_TIME = 15;

const Quiz = () => {
  const { id: moduleId } = useParams();
  const navigate = useNavigate();

  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [readyTime, setReadyTime] = useState(READY_TIME);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);
  const [reviewing, setReviewing] = useState(false);

  const timerRef = useRef(null);
  const optionLabels = ["A", "B", "C", "D"];

  /* ===================== FETCH QUIZ ===================== */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/v1/modules/${moduleId}/quiz`);
        const quiz = res.data.data;
        if (!quiz) {
          toast.error("No quiz found");
          return;
        }
        setQuizId(quiz.id);
        setQuestions(quiz.questions || []);
      } catch (err) {
        console.error("FETCH ERROR ❌", err.response || err);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [moduleId]);

  /* ===================== READY TIMER ===================== */
  useEffect(() => {
    if (quizStarted) return;
    const interval = setInterval(() => {
      setReadyTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizStarted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizStarted]);

  /* ===================== QUESTION TIMER ===================== */
  useEffect(() => {
    if (!quizStarted || showResult || reviewing) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestion, quizStarted, showResult, reviewing]);

  useEffect(() => {
    if (quizStarted) setTimeLeft(QUIZ_TIME_PER_QUESTION);
  }, [currentQuestion, quizStarted]);

  /* ===================== NEXT / PREV ===================== */
  const handleNext = (auto = false) => {
    const current = questions[currentQuestion];
    if (!auto && !selectedOption) return;

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== current.id),
      {
        question_id: current.id,
        selected_option_id: selectedOption?.id || null,
      },
    ];
    setAnswers(updatedAnswers);

    if (currentQuestion === questions.length - 1) {
      setReviewing(true);
    } else {
      setSelectedOption(
        updatedAnswers.find(
          (a) => a.question_id === questions[currentQuestion + 1].id
        )?.selected_option_id
          ? questions[currentQuestion + 1].options.find(
              (o) =>
                o.id ===
                updatedAnswers.find(
                  (a) => a.question_id === questions[currentQuestion + 1].id
                ).selected_option_id
            )
          : null
      );
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
    setSelectedOption(
      answers.find((a) => a.question_id === questions[currentQuestion - 1].id)
        ?.selected_option_id
        ? questions[currentQuestion - 1].options.find(
            (o) =>
              o.id ===
              answers.find(
                (a) => a.question_id === questions[currentQuestion - 1].id
              ).selected_option_id
          )
        : null
    );
  };

  /* ===================== SUBMIT QUIZ ===================== */
  const submitQuiz = async (finalAnswers) => {
    if (!quizId) {
      toast.error("Quiz ID missing");
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/v1/quizzes/${quizId}/submit`, { answers: finalAnswers });
      toast.success("Quiz submitted!");
      await fetchQuizScore(quizId);
      setShowResult(true);
    } catch (error) {
      console.error("SUBMIT ERROR ❌", error.response || error);
      toast.error(error.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
      setReviewing(false);
    }
  };

  /* ===================== FETCH QUIZ SCORE ===================== */
  const fetchQuizScore = async (qid) => {
    try {
      const res = await api.get(`/v1/quiz/${qid}/score`);
      setResult(res.data.data);
    } catch (error) {
      console.error("SCORE FETCH ERROR ❌", error.response || error);
      toast.error("Failed to fetch quiz score");
    }
  };

  /* ===================== NAVIGATE TO DASHBOARD ===================== */
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  /* ===================== RENDER ===================== */
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex items-center justify-center px-4 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <p>Loading...</p>
      ) : !questions.length ? (
        <p>No quiz available</p>
      ) : (
        <div className="w-full max-w-5xl bg-white rounded-xl shadow p-6">
          {/* READY SCREEN */}
          {!quizStarted && (
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Get Ready</h1>
              <p className="text-lg mb-4">Quiz starts in</p>
              <div className="text-6xl font-extrabold">{readyTime}</div>
            </div>
          )}

          {/* QUESTION SCREEN */}
          {quizStarted && !showResult && !reviewing && currentQ && (
            <>
              <div className="w-full bg-gray-200 h-2 rounded mb-4">
                <div
                  className="bg-[#15256E] h-2 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span>⏱ {timeLeft}s</span>
              </div>

              <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>

              <div className="space-y-3">
                {currentQ.options.map((option, i) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${
                      selectedOption?.id === option.id
                        ? "bg-blue-100 border-[#15256E]"
                        : "border-gray-300"
                    }`}
                  >
                    <strong className="mr-2">{optionLabels[i]}</strong>
                    {option.text}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className="flex-1 bg-gray-200 py-2 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (currentQuestion === questions.length - 1) {
                      setReviewing(true);
                    } else {
                      handleNext(false);
                    }
                  }}
                  disabled={!selectedOption || submitting}
                  className="flex-1 bg-[#15256E] text-white py-2 rounded"
                >
                  {currentQuestion === questions.length - 1 ? "Review" : "Next"}
                </button>
              </div>
            </>
          )}

          {/* REVIEW SCREEN */}
          {reviewing && (
            <div className="py-6">
              <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const answer = answers.find((a) => a.question_id === q.id);
                  return (
                    <div key={q.id} className="p-4 border rounded">
                      <p className="font-semibold">{idx + 1}. {q.question}</p>
                      {q.options.map((opt, i) => (
                        <div
                          key={opt.id}
                          className={`px-3 py-1 rounded ${
                            answer?.selected_option_id === opt.id
                              ? opt.correct
                                ? "bg-green-100 border border-green-500"
                                : "bg-red-100 border border-red-500"
                              : "bg-gray-100"
                          }`}
                        >
                          <strong>{optionLabels[i]}.</strong> {opt.text}
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setCurrentQuestion(idx);
                          setSelectedOption(
                            q.options.find((o) => o.id === answer?.selected_option_id)
                          );
                          setReviewing(false);
                        }}
                        className="mt-2 text-sm text-blue-700 underline"
                      >
                        Edit Answer
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => submitQuiz(answers)}
                className="mt-6 px-6 py-2 bg-[#15256E] text-white rounded"
              >
                Submit All
              </button>
            </div>
          )}

          {/* RESULT SCREEN */}
          {showResult && result && (
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Quiz Completed</h2>
              <div className="text-5xl font-extrabold mb-3">
                {result?.score}/{questions.length}
              </div>
              <p className="mb-6 text-lg">
                {result?.passed ? "✅ Passed" : "❌ Failed"}
              </p>
              <button
                onClick={goToDashboard}
                className="border-2 border-[#15256E] px-6 py-2 rounded"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;