// src/pages/ResultPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = ({ resultData }) => {
  const navigate = useNavigate();

  if (!resultData) {
    return <div>No result found. Please attempt the quiz first.</div>;
  }

  const { results, score } = resultData;

  return (
    <div className="result-page">
      <h2>Quiz Results</h2>
      <p>You scored {score} out of {results.length}</p>

      <ul>
        {results.map((res, index) => (
          <li key={index} className={res.correct ? "correct" : "incorrect"}>
            <p><strong>Q:</strong> {res.question.question}</p>
            <p><strong>Your Answer:</strong> {res.question.options[res.selected] || "Not answered"}</p>
            <p><strong>Correct Answer:</strong> {res.question.options[res.question.correctAnswer]}</p>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/")}>Take another quiz</button>
    </div>
  );
};

export default ResultPage;