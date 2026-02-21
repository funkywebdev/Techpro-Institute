import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import quizbg from "../../assets/images/Quizbg.png";

const QUIZ_TIME_PER_QUESTION = 30; // seconds
const READY_TIME = 15; // seconds

const QuizGlass = () => {
  const { id } = useParams();

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

  const timerRef = useRef(null);

  const optionLabels = ["(A)", "(B)", "(C)", "(D)"];

  /* ===================== FETCH QUIZ ===================== */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/v1/modules/${id}/quiz`);
        setQuestions(res.data.data?.questions || []);
      } catch {
        alert("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  /* ===================== READY SCREEN TIMER ===================== */
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
    if (!quizStarted || showResult) return;

    setTimeLeft(QUIZ_TIME_PER_QUESTION);

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
  }, [currentQuestion, quizStarted]);

  /* ===================== PAGE PROTECTION ===================== */
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  /* ===================== ANSWER HANDLING ===================== */
  const handleNext = (auto = false) => {
    const current = questions[currentQuestion];

    if (!auto && !selectedOption) return;

    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.question_id !== current.id);
      return [
        ...filtered,
        {
          question_id: current.id,
          selected_answer: selectedOption?.id || null,
        },
      ];
    });

    if (currentQuestion === questions.length - 1) {
      submitQuiz();
    } else {
      setSelectedOption(null);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  };

  /* ===================== SUBMIT ===================== */
  const submitQuiz = async () => {
    try {
      setSubmitting(true);
      const res = await api.post(`/v1/quizzes/${id}/submit`, { answers });
      setResult(res.data.data);
      setShowResult(true);
    } catch {
      alert("Submission failed");
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
    setReadyTime(READY_TIME);
    setQuizStarted(false);
  };

  /* ===================== LOADING ===================== */
  if (loading) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  if (!questions.length) {
    return <p className="text-center mt-10 text-white">No quiz available</p>;
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  /* ===================== UI ===================== */
  return (
    <div
      className="py-10 sm:min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${quizbg})` }}
    >
      <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 text-white shadow-xl">

        {/* READY SCREEN */}
        {!quizStarted && (
          <div className="text-center py-16">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Get Ready!</h1>
            <p className="text-sm sm:text-lg mb-6">Quiz starts in</p>
            <div className="text-4xl sm:text-6xl font-extrabold text-[#cfd6ff]">
              {readyTime}
            </div>
          </div>
        )}

        {/* QUIZ */}
        {quizStarted && !showResult && (
          <>
            {/* PROGRESS */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-4">
              <div
                className="bg-[#15256E] h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* HEADER */}
            <div className="flex justify-between mb-4 text-xs sm:text-sm">
              <span>
                Question {currentQuestion + 1}/{questions.length}
              </span>
              <span className="font-semibold text-[#cfd6ff] text-xs sm:text-sm">
                ⏱ {timeLeft}s
              </span>
            </div>

            {/* QUESTION */}
            <h2 className="text-base sm:text-xl font-semibold mb-6">
              {currentQ.question}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-2 sm:space-y-3">
              {currentQ.options.map((option, i) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-full border transition
                    ${
                      selectedOption?.id === option.id
                        ? "bg-[#15256E]/40 border-[#15256E]"
                        : "border-white/20 hover:bg-white/10"
                    }`}
                >
                  <span className="mr-2 sm:mr-3 font-semibold text-sm sm:text-base">
                    {optionLabels[i]}
                  </span>
                  <span className="text-sm sm:text-base">{option.text}</span>
                </button>
              ))}
            </div>

            {/* NAVIGATION */}
            <div className="flex gap-3 mt-4 sm:mt-6">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="flex-1 py-2 sm:py-3 rounded-full bg-white/10 disabled:opacity-40 text-sm sm:text-base"
              >
                ← Prev
              </button>

              <button
                onClick={() => handleNext(false)}
                disabled={!selectedOption || submitting}
                className="flex-1 py-2 sm:py-3 rounded-full bg-[#15256E] font-semibold disabled:opacity-50 text-sm sm:text-base"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish →"
                  : "Next →"}
              </button>
            </div>
          </>
        )}

        {/* RESULT */}
        {showResult && (
          <div className="text-center py-10 sm:py-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">🎉 Quiz Completed</h2>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#cfd6ff] mb-3">
              {result?.score}/{questions.length}
            </div>
            <p className="mb-6 text-sm sm:text-lg">
              {result?.passed ? "✅ Passed" : "❌ Failed"}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-full border-2 border-[#15256E] hover:bg-[#15256E] text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGlass;