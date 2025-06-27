import React from 'react';

interface FloatingActionButtonProps {
  onClick?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700"
    >
      <span className="text-2xl">+</span>
    </button>
  );
};

export default FloatingActionButton; 