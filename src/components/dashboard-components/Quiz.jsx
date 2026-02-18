
// import React, { useState, useEffect } from "react";
// import api from "../../api/axios";
// import { useParams } from "react-router-dom";

// const QuizPage = () => {
//   const { id } = useParams();

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         const res = await api.get(`/v1/modules/${id}/quiz`);
//         setQuestions(res.data.data?.questions || []);
//       } catch {
//         alert("Failed to load quiz");
//         setQuestions([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   const progress = questions.length
//     ? ((currentQuestion + 1) / questions.length) * 100
//     : 0;

//   const handleNext = () => {
//     if (!selectedOption) return;
//     const current = questions[currentQuestion];
//     setAnswers([...answers, { question_id: current.id, selected_answer: selectedOption.id }]);
//     if (currentQuestion === questions.length - 1) submitQuiz();
//     else {
//       setSelectedOption(null);
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const submitQuiz = async () => {
//     try {
//       setSubmitting(true);
//       const res = await api.post(`/v1/quizzes/${id}/submit`, { answers });
//       if (res.data.status && res.data.data) setResult(res.data.data);
//       setShowResult(true);
//     } catch {
//       alert("Failed to submit quiz");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setSelectedOption(null);
//     setAnswers([]);
//     setShowResult(false);
//     setResult(null);
//   };

//   if (loading) return <p className="text-center mt-10 text-gray-700 text-sm">Loading...</p>;
//   if (!questions.length) return <p className="text-center mt-10 text-gray-700 text-sm">No quiz</p>;

//   const currentQ = questions[currentQuestion];

//   return (
//     <div className="flex items-center justify-center px-4 py-4 bg-gray-100 ">
//       <div className="w-full max-w-7xl bg-white rounded-md shadow-md p-5 transition-all duration-500">
//         {!showResult ? (
//           <>
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <h1 className="text-lg font-bold text-gray-900">Quiz Challenge</h1>
//                 <p className="text-xs text-gray-500 mt-1">Answer carefully ✨</p>
//               </div>
//               <span className="px-3 py-1 rounded-full border border-gray-300 text-gray-800 text-sm font-medium">
//                 {currentQuestion + 1}/{questions.length}
//               </span>
//             </div>

//             {/* PROGRESS */}
//             <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
//               <div className="h-1.5 bg-black transition-all" style={{ width: `${progress}%` }} />
//             </div>

//             {/* QUESTION */}
//             <h2 className="text-sm font-semibold text-gray-900 mb-4">
//               {currentQ?.question || "Loading..."}
//             </h2>

//             {/* OPTIONS */}
//             <div className="space-y-2">
//               {currentQ?.options?.map((option) => {
//                 const isSelected = selectedOption?.id === option.id;
//                 return (
//                   <button
//                     key={option.id}
//                     onClick={() => setSelectedOption(option)}
//                     className={`w-full text-left px-4 py-2 rounded-xl border text-sm font-medium transition
//                       ${isSelected
//                         ? "border-black bg-gray-900 text-white shadow-md"
//                         : "border-gray-400 text-gray-900 hover:bg-gray-100"
//                       }`}
//                   >
//                     {option.text}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* NEXT BUTTON */}
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handleNext}
//                 disabled={!selectedOption || submitting}
//                 className="px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 disabled:opacity-40"
//               >
//                 {submitting ? "..." : currentQuestion === questions.length - 1 ? "Finish" : "Next"}
//               </button>
//             </div>
//           </>
//         ) : (
//           /* RESULT */
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Done!</h2>
//             {result && (
//               <>
//                 <div className="text-4xl font-extrabold text-black mb-3">{result.score}/{questions.length}</div>
//                 <p className="text-gray-800 text-sm mb-3">{result.passed ? "✅ Passed" : "❌ Failed"}</p>
//               </>
//             )}
//             <button
//               onClick={handleRestart}
//               className="px-6 py-2 rounded-lg border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition"
//             >
//               Retry
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizPage;


// import React, { useState, useEffect } from "react";
// import api from "../../api/axios";
// import { useParams } from "react-router-dom";

// const QuizPage = () => {
//   const { id } = useParams();

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [showResult, setShowResult] = useState(false);
//   const [result, setResult] = useState(null);

//   const optionLabels = ["A", "B", "C", "D"];

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       if (!id) return;
//       try {
//         setLoading(true);
//         const res = await api.get(`/v1/modules/${id}/quiz`);
//         setQuestions(res.data.data?.questions || []);
//       } catch {
//         alert("Failed to load quiz");
//         setQuestions([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [id]);

//   const progress = questions.length
//     ? ((currentQuestion + 1) / questions.length) * 100
//     : 0;

//   const handleNext = () => {
//     if (!selectedOption) return;
//     const current = questions[currentQuestion];
//     setAnswers([...answers, { question_id: current.id, selected_answer: selectedOption.id }]);
//     if (currentQuestion === questions.length - 1) submitQuiz();
//     else {
//       setSelectedOption(null);
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const submitQuiz = async () => {
//     try {
//       setSubmitting(true);
//       const res = await api.post(`/v1/quizzes/${id}/submit`, { answers });
//       if (res.data.status && res.data.data) setResult(res.data.data);
//       setShowResult(true);
//     } catch {
//       alert("Failed to submit quiz");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setSelectedOption(null);
//     setAnswers([]);
//     setShowResult(false);
//     setResult(null);
//   };

//   if (loading) return <p className="text-center mt-10 text-gray-700 text-base">Loading...</p>;
//   if (!questions.length) return <p className="text-center mt-10 text-gray-700 text-base">No quiz</p>;

//   const currentQ = questions[currentQuestion];

//   return (
//     <div className="flex items-center justify-center px-4 py-2 bg-gray-100">
//       <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-6 transition-all duration-500">
//         {!showResult ? (
//           <>
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Quiz Challenge</h1>
//                 <p className="text-base text-gray-600 mt-1">Answer carefully ✨</p>
//               </div>
//               <span className="px-3 py-1 rounded-full border border-gray-300 text-gray-800 text-base font-medium">
//                 {currentQuestion + 1}/{questions.length}
//               </span>
//             </div>

//             {/* PROGRESS */}
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mb-5 overflow-hidden">
//               <div className="h-2.5 bg-black transition-all" style={{ width: `${progress}%` }} />
//             </div>

//             {/* QUESTION */}
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">{currentQ?.question}</h2>

//             {/* OPTIONS */}
//             <div className="space-y-3">
//               {currentQ?.options?.map((option, index) => {
//                 const isSelected = selectedOption?.id === option.id;
//                 return (
//                   <button
//                     key={option.id}
//                     onClick={() => setSelectedOption(option)}
//                     className={`w-full text-left px-5 py-3 rounded-xl border transition flex items-center gap-3 text-lg font-medium
//                       ${isSelected
//                         ? "border-black bg-gray-900 text-white shadow-md"
//                         : "border-gray-400 text-gray-900 hover:bg-gray-100"
//                       }`}
//                   >
//                     <span className="font-bold">{optionLabels[index]})</span>
//                     <span>{option.text}</span>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* NEXT BUTTON */}
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={handleNext}
//                 disabled={!selectedOption || submitting}
//                 className="px-6 py-3 rounded-lg bg-black text-white text-lg font-semibold hover:opacity-90 disabled:opacity-40"
//               >
//                 {submitting ? "..." : currentQuestion === questions.length - 1 ? "Finish" : "Next"}
//               </button>
//             </div>
//           </>
//         ) : (
//           /* RESULT */
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">🎉 Done!</h2>
//             {result && (
//               <>
//                 <div className="text-5xl font-extrabold text-black mb-3">{result.score}/{questions.length}</div>
//                 <p className="text-gray-800 text-lg mb-3">{result.passed ? "✅ Passed" : "❌ Failed"}</p>
//               </>
//             )}
//             <button
//               onClick={handleRestart}
//               className="px-8 py-3 rounded-lg border border-black text-black text-lg font-medium hover:bg-black hover:text-white transition"
//             >
//               Retry
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizPage;


import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";

const QuizPage = () => {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.get(`/v1/modules/${id}/quiz`);
        setQuestions(res.data.data?.questions || []);
      } catch {
        alert("Failed to load quiz");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const progress = questions.length
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;

  const handleNext = () => {
    if (!selectedOption) return;
    const current = questions[currentQuestion];
    setAnswers([...answers, { question_id: current.id, selected_answer: selectedOption.id }]);
    if (currentQuestion === questions.length - 1) submitQuiz();
    else {
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const submitQuiz = async () => {
    try {
      setSubmitting(true);
      const res = await api.post(`/v1/quizzes/${id}/submit`, { answers });
      if (res.data.status && res.data.data) setResult(res.data.data);
      setShowResult(true);
    } catch {
      alert("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-700 text-sm">Loading...</p>;
  if (!questions.length)
    return <p className="text-center mt-10 text-gray-700 text-sm">No quiz</p>;

  const currentQ = questions[currentQuestion];

  return (
    <div className="flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-5 transition-all duration-500">
        {!showResult ? (
          <>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Quiz Challenge</h1>
                <p className="text-sm text-gray-600 mt-1">Answer carefully ✨</p>
              </div>
              <span className="px-2 py-0.5 rounded-full border border-gray-300 text-gray-800 text-sm font-medium">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>

            {/* PROGRESS */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
              <div className="h-2 bg-black transition-all" style={{ width: `${progress}%` }} />
            </div>

            {/* QUESTION */}
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              {currentQ?.question}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-4">
              {currentQ?.options?.map((option, index) => {
                const isSelected = selectedOption?.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left px-4 py-2 rounded-lg border transition flex items-center gap-2 text-base font-medium
                      ${isSelected
                        ? "border-black bg-gray-900 text-white shadow-md"
                        : "border-gray-400 text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    <span className="font-bold">{optionLabels[index]})</span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>

            {/* NEXT BUTTON */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNext}
                disabled={!selectedOption || submitting}
                className="px-5 py-2.5 rounded-lg bg-black text-white text-base font-semibold hover:opacity-90 disabled:opacity-40 transition"
              >
                {submitting ? "..." : currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          /* RESULT */
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">🎉 Done!</h2>
            {result && (
              <>
                <div className="text-4xl font-extrabold text-black mb-2">{result.score}/{questions.length}</div>
                <p className="text-gray-800 text-base mb-2">{result.passed ? "✅ Passed" : "❌ Failed"}</p>
              </>
            )}
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-lg border border-black text-black text-base font-medium hover:bg-black hover:text-white transition"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;