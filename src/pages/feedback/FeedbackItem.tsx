import React from 'react';
import { Check, X, AlertCircle, Award, Star } from 'lucide-react';

interface Feedback {
  id: string;
  type: 'complaint' | 'achievement';
  submittedBy: {
    id: string;
    name: string;
    role: string;
  };
  student?: {
    id: string;
    name: string;
  };
  teacher?: {
    id: string;
    name: string;
  };
  subject?: string;
  details?: string;
  achievementTitle?: string;
  achievementDescription?: string;
  attachment?: {
    name: string;
    url: string;
    type: 'image' | 'pdf';
  };
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
  isHallOfFame?: boolean;
}

interface FeedbackItemProps {
  feedback: Feedback;
  onStatusUpdate: (id: string, newStatus: 'pending' | 'reviewed' | 'resolved') => void;
  onToggleHallOfFame?: (id: string) => void;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, onStatusUpdate, onToggleHallOfFame }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'complaint':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          color: 'bg-red-100 text-red-800',
          text: 'Complaint'
        };
      case 'achievement':
        return {
          icon: <Award className="h-4 w-4" />,
          color: 'bg-purple-100 text-purple-800',
          text: 'Achievement'
        };
      default:
        return {
          icon: null,
          color: 'bg-gray-100 text-gray-800',
          text: type
        };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const typeBadge = getTypeBadge(feedback.type);

  return (
    <div className={`bg-white p-3 rounded-lg shadow-sm border ${
      feedback.isHallOfFame ? 'border-yellow-300 shadow-md' : 'border-gray-200'
    } relative`}>
      {feedback.isHallOfFame && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-yellow-400 text-white p-1.5 rounded-full shadow-lg">
            <Star className="h-4 w-4" />
          </div>
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-1.5">
          <span className={`inline-flex items-center px-1.5 py-0.5 text-sm font-medium rounded-full ${typeBadge.color}`}>
            {typeBadge.icon}
            <span className="ml-1">{typeBadge.text}</span>
          </span>
          <span className={`inline-flex items-center px-1.5 py-0.5 text-sm font-medium rounded-full ${getStatusColor(feedback.status)}`}>
            {feedback.status}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(feedback.createdAt)}
          </span>
        </div>
        <div className="flex space-x-1">
          {feedback.status === 'pending' && (
            <button
              onClick={() => onStatusUpdate(feedback.id, 'reviewed')}
              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
              title="Mark as Reviewed"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          {feedback.status === 'reviewed' && (
            <button
              onClick={() => onStatusUpdate(feedback.id, 'resolved')}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
              title="Mark as Resolved"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          {feedback.status !== 'resolved' && (
            <button
              onClick={() => onStatusUpdate(feedback.id, 'resolved')}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Mark as Resolved"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {feedback.type === 'achievement' && onToggleHallOfFame && (
            <button
              onClick={() => onToggleHallOfFame(feedback.id)}
              className={`p-1 rounded-full ${
                feedback.isHallOfFame
                  ? 'text-yellow-500 hover:bg-yellow-50'
                  : 'text-gray-400 hover:bg-gray-50'
              }`}
              title={feedback.isHallOfFame ? 'Remove from Hall of Fame' : 'Add to Hall of Fame'}
            >
              <Award className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-2">
        <p className="text-sm text-gray-500">
          Submitted by {feedback.submittedBy.name} ({feedback.submittedBy.role})
        </p>
        {feedback.student && (
          <p className="text-sm text-gray-500">
            Regarding Student: {feedback.student.name}
          </p>
        )}
        {feedback.teacher && (
          <p className="text-sm text-gray-500">
            Regarding Teacher: {feedback.teacher.name}
          </p>
        )}
      </div>

      {feedback.type === 'complaint' ? (
        <>
          <h3 className="text-base font-medium text-gray-900 mb-1">{feedback.subject}</h3>
          <p className="text-sm text-gray-700">{feedback.details}</p>
        </>
      ) : (
        <>
          <h3 className="text-base font-medium text-gray-900 mb-1">{feedback.achievementTitle}</h3>
          <p className="text-sm text-gray-700">{feedback.achievementDescription}</p>
          {feedback.attachment && (
            <div className="mt-2">
              {feedback.attachment.type === 'image' ? (
                <img
                  src={feedback.attachment.url}
                  alt={feedback.attachment.name}
                  className="max-w-full h-auto rounded-lg"
                />
              ) : (
                <a
                  href={feedback.attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <span className="mr-1">📄</span>
                  {feedback.attachment.name}
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackItem; 