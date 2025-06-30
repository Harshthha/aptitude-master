// src/AppRoutes.js
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import QuizSetup from './pages/QuizSetup';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Dashboard user={user} /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route
        path="/setup"
        element={
          user ? (
            <QuizSetup
              onStartQuiz={(quiz) => {
                setQuizData(quiz);
                navigate('/quiz');
              }}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/quiz"
        element={
          user ? (
            quizData ? (
              <QuizPage
                quizData={quizData}
                onSubmit={(res) => {
                  setResult(res);
                  navigate('/result');
                }}
              />
            ) : (
              <Navigate to="/setup" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/result"
        element={
          user ? (
            result ? (
              <ResultPage result={result} />
            ) : (
              <Navigate to="/quiz" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;