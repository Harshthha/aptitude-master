// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizPage.css';

const QuizPage = ({ quizData, onSubmit }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(quizData?.questions?.length * 60 || 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizData || !quizData.questions || quizData.questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizData]);

  const handleSelect = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
  };

  const handleSubmit = () => {
    const results = quizData.questions.map((q) => {
      const correct = q.correctAnswer === answers[q.id];
      return {
        question: q,
        selected: answers[q.id],
        correct,
      };
    });
    const score = results.filter((r) => r.correct).length;
    onSubmit({ results, score }); // Call parent's setResult
    navigate("/result"); // 🔁 Navigate to result page
  };

  const formatTime = (t) =>
    `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div>No quiz data available.</div>;
  }

  const q = quizData.questions[current];

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <span>Time Left: {formatTime(timer)}</span>
        <span>
          Question {current + 1} of {quizData.questions.length}
        </span>
      </div>

      <h3>{q.question}</h3>

      <div className="options">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className={
              answers[q.id] === idx ? 'option selected' : 'option'
            }
            onClick={() => handleSelect(q.id, idx)}
          >
            {String.fromCharCode(65 + idx)}. {opt}
          </button>
        ))}
      </div>

      <div className="quiz-actions">
        <button
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </button>
        {current === quizData.questions.length - 1 ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={() => setCurrent((c) => c + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;