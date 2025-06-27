import React from 'react';
import { useAuth } from '../../context/AuthContext';

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    return `${greeting}, ${user?.name}!`;
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-4">
      <h1 className="text-2xl font-bold mb-1">{getWelcomeMessage()}</h1>
      <p className="text-blue-100 text-base">
        Welcome to your EduManage dashboard. Here's what's happening today.
      </p>
    </div>
  );
};

export default WelcomeSection; 