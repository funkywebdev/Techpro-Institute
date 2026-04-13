



import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";

const QUIZ_TIME_PER_QUESTION = 60;
const READY_TIME = 0;

const Quiz = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isContentQuiz = location.pathname.includes("content");
  const isCourseQuiz = location.pathname.includes("course");

  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 🔹 supports multiple selection
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [reviewing, setReviewing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const [readyTime, setReadyTime] = useState(READY_TIME);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);

  const timerRef = useRef(null);
  const optionLabels = ["A", "B", "C", "D"];

  /* ================= FETCH QUIZ ================= */
 useEffect(() => {
  const fetchQuiz = async () => {
    try {
      setLoading(true);

      

      let endpoint = "";

      if (isCourseQuiz) {
        endpoint = `/v1/courses/${id}/quiz`;
      } else if (isContentQuiz) {
        endpoint = `/v1/module-contents/${id}/quiz`;
      } else {
        endpoint = `/v1/modules/${id}/quiz`;
      }

  


const res = await api.get(endpoint);
console.log(res);

const payload = res.data;
const data = payload.data;

// ✅ HANDLE LOCKED FIRST
if (data?.locked) {
  toast.error(
    `${payload.message} - ${data.reason}`
  );
  return;
}

// ❌ THEN check quiz
if (!data?.quiz) {
  toast.error(payload.message || "No quiz found");
  return;
}

// ✅ SET QUIZ
setQuizId(data.quiz.id);
setQuestions(data.quiz.questions || []);

      if (!data?.quiz) {
  toast.error(res.data?.message);
  return;
}
      setQuizId(data.quiz.id);
      setQuestions(data.quiz.questions || []);
    } catch (err) {
      console.error("FETCH ERROR ❌", err);
      toast.error("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  fetchQuiz();
}, [id, location.pathname]);
  /* ================= READY TIMER ================= */
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

  /* ================= QUESTION TIMER ================= */
  useEffect(() => {
    if (!quizStarted || reviewing || showResult) return;

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
  }, [currentQuestion, quizStarted, reviewing, showResult]);

  useEffect(() => {
    if (quizStarted) setTimeLeft(QUIZ_TIME_PER_QUESTION);
  }, [currentQuestion, quizStarted]);

  /* ================= OPTION SELECT ================= */
  const handleSelectOption = (opt) => {
    const currentQ = questions[currentQuestion];

    if (currentQ.type === "multiple") {
      setSelectedOptions((prev) =>
        prev.some((o) => o.id === opt.id)
          ? prev.filter((o) => o.id !== opt.id)
          : [...prev, opt]
      );
    } else {
      setSelectedOptions([opt]);
    }
  };

  /* ================= NAVIGATION ================= */
  const handleNext = (auto = false) => {
    const current = questions[currentQuestion];
    if (!current) return;

    if (!auto && selectedOptions.length === 0) return;

    const answerPayload =
      current.type === "multiple"
        ? {
            question_id: current.id,
            selected_option_ids: selectedOptions.map((o) => o.id),
          }
        : {
            question_id: current.id,
            selected_option_id: selectedOptions[0]?.id || null,
          };

    const updatedAnswers = [
      ...answers.filter((a) => a.question_id !== current.id),
      answerPayload,
    ];

    setAnswers(updatedAnswers);

    if (currentQuestion === questions.length - 1) {
      setReviewing(true);
      return;
    }

    const nextIndex = currentQuestion + 1;
    const nextQ = questions[nextIndex];

    setCurrentQuestion(nextIndex);

    const nextAnswer = updatedAnswers.find(
      (a) => a.question_id === nextQ.id
    );

    if (nextQ.type === "multiple") {
      setSelectedOptions(
        nextAnswer
          ? nextQ.options.filter((o) =>
              nextAnswer.selected_option_ids?.includes(o.id)
            )
          : []
      );
    } else {
      setSelectedOptions(
        nextAnswer
          ? nextQ.options.filter(
              (o) => o.id === nextAnswer.selected_option_id
            )
          : []
      );
    }
  };

  const handlePrev = () => {
    if (currentQuestion === 0) return;

    const prevIndex = currentQuestion - 1;
    const prevQ = questions[prevIndex];

    setCurrentQuestion(prevIndex);

    const prevAnswer = answers.find(
      (a) => a.question_id === prevQ.id
    );

    if (prevQ.type === "multiple") {
      setSelectedOptions(
        prevAnswer
          ? prevQ.options.filter((o) =>
              prevAnswer.selected_option_ids?.includes(o.id)
            )
          : []
      );
    } else {
      setSelectedOptions(
        prevAnswer
          ? prevQ.options.filter(
              (o) => o.id === prevAnswer.selected_option_id
            )
          : []
      );
    }
  };

  /* ================= FETCH SCORE ================= */
  const fetchQuizScore = async (quizAttemptId) => {
    try {
      const res = await api.get(`/v1/quiz-attempts/${quizAttemptId}/review`);
      const data = res.data.data;

      setResult({
        ...data,
        passed: data.passed === "1" || data.passed === 1,
        score: Number(data.score),
        percentage: Number(data.percentage),
      });

      setShowResult(true);
    } catch (error) {
      console.error("SCORE ERROR ❌", error);
      toast.error("Failed to fetch score");
    }
  };

  /* ================= SUBMIT ================= */
 const submitQuiz = async (finalAnswers = answers) => {
  if (!quizId) {
    toast.error("Quiz ID missing");
    return;
  }

  try {
    setSubmitting(true);

    const res = await api.post(`/v1/quizzes/${quizId}/submit`, {
      answers: finalAnswers,
    });

    toast.success("Quiz submitted successfully!", { autoClose: 1500 });

    const attemptId = res.data.data.id;

    setTimeout(() => {
       navigate(`/quiz-review/${attemptId}`);
    }, 1000);

  } catch (err) {
    console.error("SUBMIT ERROR ❌", err);
    toast.error(err.response?.data?.message || "Submit failed");
  } finally {
    setSubmitting(false);
    setReviewing(false);
  }
};

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  /* ================= UI ================= */
  return (
    <div className="flex items-center justify-center px-4 bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <Spinner />
      ) : !questions.length ? (
        <p>No quiz available</p>
      ) : (
        <div className="w-full max-w-5xl p-6 bg-white shadow rounded-xl">

          {!quizStarted && (
            <div className="py-16 text-center">
              <h1 className="text-3xl font-bold">Get Ready</h1>
              <div className="text-6xl font-bold">{readyTime}</div>
            </div>
          )}

          {quizStarted && !reviewing && !showResult && currentQ && (
            <>
              <div className="h-2 mb-4 bg-gray-200 rounded">
                <div
                  className="h-2 bg-[#15256E] rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span>
                  {currentQuestion + 1}/{questions.length}
                </span>
                <span>{timeLeft}s</span>
              </div>

              <h2 className="mb-2 text-xl font-semibold">
  {currentQ.question}
</h2>

{/* Instruction text */}
<p className="mb-4 text-sm text-gray-500">
  {currentQ.type === "multiple"
    ? "You can select more than one option."
    : "Select one option."}
</p>

              <div className="space-y-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3 border rounded ${
                      selectedOptions.some((o) => o.id === opt.id)
                        ? "bg-blue-100 border-[#15256E]"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">

                      {currentQ.type === "multiple" ? (
                        <span>
                          {selectedOptions.some((o) => o.id === opt.id)
                            ? "☑️"
                            : "⬜"}
                        </span>
                      ) : (
                        <span>
                          {selectedOptions.some((o) => o.id === opt.id)
                            ? "🔘"
                            : "⚪"}
                        </span>
                      )}

                      <span>
                        <strong>{optionLabels[i]}</strong> {opt.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handlePrev}
                  className="flex-1 p-2 bg-gray-200 rounded"
                >
                  Prev
                </button>

                <button
                  onClick={() => handleNext(false)}
                  className="flex-1 p-2 text-white bg-[#15256E] rounded"
                >
                  {currentQuestion === questions.length - 1
                    ? "Review"
                    : "Next"}
                </button>
              </div>
            </>
          )}

          {reviewing && (
            <div className="py-6">
              <h2 className="mb-4 text-2xl font-bold">Review Your Answers</h2>

              {questions.map((q, idx) => {
                const answer = answers.find(
                  (a) => a.question_id === q.id
                );

                return (
                  <div key={q.id} className="p-4 mb-4 border rounded">
                    <p className="font-semibold">
                      {idx + 1}. {q.question}
                    </p>

                    {q.options.map((opt, i) => {
                      const isSelected =
                        q.type === "multiple"
                          ? answer?.selected_option_ids?.includes(opt.id)
                          : answer?.selected_option_id === opt.id;

                      return (
                        <div
                          key={opt.id}
                          className={`px-3 py-1 rounded ${
                            isSelected
                              ? "bg-green-100 border border-green-500"
                              : "bg-gray-100"
                          }`}
                        >
                          <strong>{optionLabels[i]}.</strong> {opt.text}
                        </div>
                      );
                    })}

                    <button
                      onClick={() => {
                        setCurrentQuestion(idx);
                        setReviewing(false);
                      }}
                      className="mt-2 text-sm text-blue-700 underline"
                    >
                      Edit Answer
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() => submitQuiz(answers)}
                disabled={submitting}
                className="px-6 py-2 text-white bg-[#15256E] rounded"
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </button>
            </div>
          )}

          {showResult && result && (
            <div className="py-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Quiz Completed</h2>

              <div className="mb-3 text-5xl font-bold">
                {result.score}/{questions.length}
              </div>

              <p className="text-lg">
                Score: {result.percentage.toFixed(2)}%
              </p>

              <p className="mb-6 text-lg">
                {result.passed ? "✅ Passed" : "❌ Failed"}
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 border-2 border-[#15256E] rounded"
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




