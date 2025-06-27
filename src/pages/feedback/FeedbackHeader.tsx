import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';

const FeedbackHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => navigate(-1)}
        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h4 className="text-lg font-semibold text-gray-900">Feedback Management</h4>
      <button
        onClick={() => navigate('/feedback/new')}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-4 w-4 mr-1" />
        New Feedback
      </button>
    </div>
  );
};

export default FeedbackHeader; 