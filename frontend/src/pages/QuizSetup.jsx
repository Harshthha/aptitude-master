// src/pages/QuizSetup.jsx
import React, { useState } from 'react';
import './QuizSetup.css';
import { useNavigate } from 'react-router-dom';

const topics = [
  "Clocks", "Time and Work", "Profit and Loss", "Simple Interest",
  "Compound Interest", "Percentage", "Ratio and Proportion", "Mixtures",
  "Speed Time Distance", "Boats and Streams", "Trains", "Pipes and Cisterns"
];

const QuizSetup = ({ onStartQuiz }) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (!topic) return alert("Please select a topic");
    setLoading(true);

    // Mock API call — replace with real fetch later
    setTimeout(() => {
      const questions = [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
          topic,
          difficulty,
          solution: "https://example.com"
        },
        // ...more dummy questions
      ];
      setLoading(false);
      onStartQuiz({ topic, difficulty, count, questions });
      navigate("/quiz");
    }, 1500);
  };

  return (
    <div className="quiz-setup-container">
      <h2>Select Your Quiz</h2>

      <label>Topic:</label>
      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option value="">--Select Topic--</option>
        {topics.map((t) => <option key={t}>{t}</option>)}
      </select>

      <label>Difficulty:</label>
      <div className="difficulty-options">
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            className={difficulty === level ? 'active' : ''}
            onClick={() => setDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <label>Number of Questions: {count}</label>
      <input
        type="range"
        min="5"
        max="50"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />

      <button onClick={handleStart} disabled={loading}>
        {loading ? "Generating Quiz..." : "Start Quiz"}
      </button>
    </div>
  );
};

export default QuizSetup;