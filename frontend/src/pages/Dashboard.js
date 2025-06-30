import React from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = ({ user }) => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
          <p>XP: 120</p>
          <p>Badges: 3</p>
        </div>

        <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Start a Quiz</h2>
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Choose Topic
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Welcome {user.displayName}</h2>
      <button onClick={() => navigate('/setup')}>
        Start New Quiz
      </button>
    </div>
    </div>
    
  );
};

export default Dashboard;