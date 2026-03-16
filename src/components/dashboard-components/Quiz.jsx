import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";

const QUIZ_TIME_PER_QUESTION = 60;
const READY_TIME = 0;

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

    // Save current answer
    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== current.id),
      {
        question_id: current.id,
        selected_option_id: selectedOption?.id || null,
      },
    ];
    setAnswers(updatedAnswers);

    // If last question, go to review
    if (currentQuestion === questions.length - 1) {
      setSelectedOption(null);
      setReviewing(true);
      return;
    }

    // Move to next question
    setCurrentQuestion((prev) => prev + 1);

    const nextAnswer = updatedAnswers.find(
      (a) => a.question_id === questions[currentQuestion + 1].id
    )?.selected_option_id;

    setSelectedOption(
      nextAnswer
        ? questions[currentQuestion + 1].options.find((o) => o.id === nextAnswer)
        : null
    );
  };

  const handlePrev = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
    const prevAnswer = answers.find(
      (a) => a.question_id === questions[currentQuestion - 1].id
    )?.selected_option_id;
    setSelectedOption(
      prevAnswer
        ? questions[currentQuestion - 1].options.find((o) => o.id === prevAnswer)
        : null
    );
  };

//   const submitQuiz = async (finalAnswers) => {
//   if (!quizId) {
//     toast.error("Quiz ID missing");
//     return;
//   }

//   try {
//     setSubmitting(true);

//     const res = await api.post(`/v1/quizzes/${quizId}/submit`, {
//       answers: finalAnswers,
//     });

//     toast.success("Quiz submitted!");

//     const attemptId = res.data.data.id;

//     navigate(`/quiz-review/${attemptId}`);

//   } catch (error) {
//     console.error("SUBMIT ERROR ❌", error.response || error);
//     toast.error(error.response?.data?.message || "Submit failed");
//   } finally {
//     setSubmitting(false);
//     setReviewing(false);
//   }
// };
  /* ===================== FETCH QUIZ SCORE ===================== */


  const submitQuiz = async (finalAnswers) => {
  if (!quizId) {
    toast.error("Quiz ID missing");
    return;
  }

  try {
    setSubmitting(true);

    const res = await api.post(`/v1/quizzes/${quizId}/submit`, {
      answers: finalAnswers,
    });

    // ✅ Show toast first
    toast.success("Quiz submitted successfully!", { autoClose: 1500 });

    // Wait a short moment for the toast to be visible
    const attemptId = res.data.data.id;
    setTimeout(() => {
      navigate(`/quiz-review/${attemptId}`);
    }, 1500); // 1.5s delay

  } catch (error) {
    console.error("SUBMIT ERROR ❌", error.response || error);
    toast.error(error.response?.data?.message || "Submit failed");
  } finally {
    setSubmitting(false);
    setReviewing(false);
  }
};
  const fetchQuizScore = async (qid) => {
    try {
      const res = await api.get(`/v1/quiz/${qid}/score`);
      // Convert "passed" from string to boolean
      const data = res.data.data;
      setResult({
        ...data,
        passed: data.passed === "1" || data.passed === 1,
        score: Number(data.score),
        percentage: Number(data.percentage),
      });
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
        <Spinner />
      ) : !questions.length ? (
        <p>No quiz available</p>
      ) : (
        <div className="w-full max-w-5xl p-6 bg-white shadow rounded-xl">
          {/* READY SCREEN */}
          {!quizStarted && (
            <div className="py-16 text-center">
              <h1 className="mb-4 text-3xl font-bold">Get Ready</h1>
              <p className="mb-4 text-lg">Quiz starts in</p>
              <div className="text-6xl font-extrabold">{readyTime}</div>
            </div>
          )}

          {/* QUESTION SCREEN */}
          {quizStarted && !showResult && !reviewing && currentQ && (
            <>
              <div className="w-full h-2 mb-4 bg-gray-200 rounded">
                <div
                  className="bg-[#15256E] h-2 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between mb-4 text-sm">
                <span>
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <span>⏱ {timeLeft}s</span>
              </div>

              <h2 className="mb-6 text-xl font-semibold">{currentQ.question}</h2>

              <div className="space-y-3">
                {currentQ.options.map((option, i) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left px-4 py-3 rounded-lg border cursor-pointer ${
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
                  className="flex-1 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={() => handleNext(false)}
                  disabled={!selectedOption || submitting}
                  className="flex-1 bg-[#15256E] text-white py-2 rounded cursor-pointer"
                >
                  {currentQuestion === questions.length - 1 ? "Review" : "Next"}
                </button>
              </div>
            </>
          )}

          {/* REVIEW SCREEN */}
          {reviewing && (
            <div className="py-6">
              <h2 className="mb-4 text-2xl font-bold">Review Your Answers</h2>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const answer = answers.find((a) => a.question_id === q.id);
                  return (
                    <div key={q.id} className="p-4 border rounded">
                      <p className="font-semibold">
                        {idx + 1}. {q.question}
                      </p>
                      {q.options.map((opt, i) => (
                        <div
                          key={opt.id}
                          className={`px-3 py-1 rounded ${
                            answer?.selected_option_id === opt.id
                              ? opt.correct
                                ? "bg-green-100 border border-green-500"
                                : "bg-green-100 border border-green-500"
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
                            q.options.find(
                              (o) => o.id === answer?.selected_option_id
                            )
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
              disabled={submitting}
              className="mt-6 px-6 py-2 bg-[#15256E] text-white rounded flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Submitting...
                </>
              ) : (
                "Submit All"
              )}
            </button>
            </div>
          )}

          {/* RESULT SCREEN */}
          {showResult && result && (
            <div className="py-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Quiz Completed</h2>
              <div className="mb-3 text-5xl font-extrabold">
                {result.score}/{questions.length}
              </div>
              <p className="mb-2 text-lg">
                Score: {result.percentage.toFixed(2)}%
              </p>
              <p className="mb-6 text-lg">
                {result.passed ? "✅ Passed" : "❌ Failed"}
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