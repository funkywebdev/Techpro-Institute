// src/pages/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const QuizPage = () => {
  const { id } = useParams(); // id of the module
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await api.get(`v1/modules/${id}/quiz`);
        setQuizData(res.data?.data || null);
      } catch (err) {
        console.error("Failed to fetch quiz data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading quiz…</p>;
  if (!quizData) return <p className="p-6 text-center text-gray-500">No quiz available for this module yet.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{quizData.title}</h1>
      <p className="text-gray-700 mb-6">{quizData.description}</p>

      {quizData.questions.map((q, index) => (
        <div key={q.id} className="mb-4 border p-4 rounded-lg bg-white shadow-sm">
          <p className="font-medium mb-2">{index + 1}. {q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input type="radio" name={`question-${q.id}`} value={opt} className="accent-[#001489]" />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="mt-6 px-6 py-2 bg-[#001489] text-white rounded-lg font-semibold hover:bg-[#000f5a]">
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;