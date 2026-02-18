


import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useParams } from "react-router-dom";
import quizbg from "../../assets/images/Quizbg.png";

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
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleNext = () => {
    if (!selectedOption) return;

    const current = questions[currentQuestion];
    setAnswers([...answers, { question_id: current.id, selected_answer: selectedOption.id }]);

    if (currentQuestion === questions.length - 1) {
      submitQuiz();
    } else {
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
    return <p className="text-center mt-10 text-white/70 text-sm">Loading...</p>;
  if (!questions.length)
    return <p className="text-center mt-10 text-white/70 text-sm">No quiz available</p>;

  const currentQ = questions[currentQuestion];

  return (
    <div
      className="flex items-center justify-center px-2 sm:px-4 py-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${quizbg})` }}
    >
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-xl">
        {!showResult ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-4 sm:mb-6 text-sm sm:text-base">
              <span className="text-white/70">
                Question {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, i) => {
                const isSelected = selectedOption?.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-full border transition-all duration-200
                      ${isSelected
                        ? "bg-[#15256E]/40 border-[#15256E] scale-[1.02] shadow-lg"
                        : "border-white/20 hover:bg-white/10"
                      }`}
                  >
                    <span className="mr-2 sm:mr-3 font-semibold text-[#cfd6ff]">
                      {optionLabels[i]}
                    </span>
                    <span className="text-sm sm:text-base">{option.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button className="flex-1 py-3 rounded-full bg-white/10 hover:bg-white/20 transition">
                ← Prev
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedOption || submitting}
                className={`flex-1 py-3 rounded-full bg-[#15256E] hover:bg-[#1b2f8a] transition font-semibold shadow-md ${
                  !selectedOption || submitting ? "opacity-100 cursor-not-allowed" : ""
                }`}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish →"
                  : "Next →"}
              </button>
            </div>
          </>
        ) : (
          // Result
          <div className="text-center py-6 sm:py-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#cfd6ff]">🎉 Quiz Completed!</h2>
            {result && (
              <>
                <div className="text-3xl sm:text-5xl font-extrabold mb-3 text-[#15256E]">
                  {result.score}/{questions.length}
                </div>
                <p className="text-base sm:text-lg mb-6">{result.passed ? "✅ Passed" : "❌ Failed"}</p>
              </>
            )}
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-full border-2 border-[#15256E] text-[#15256E] font-semibold hover:bg-[#15256E] hover:text-white transition"
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