import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../common/Layout';
import { useAuth } from '../../context/AuthContext';
import FeedbackHeader from './FeedbackHeader';
import SearchFilterBar from './SearchFilterBar';
import FeedbackItem from './FeedbackItem';
import AchievementsView from './AchievementsView';

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
  isHallOfFame: boolean;
}

const ViewFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'complaint' | 'achievement'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewed' | 'resolved'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'feedback' | 'achievements'>('feedback');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      type: 'complaint',
      submittedBy: {
        id: '1',
        name: 'John Smith',
        role: 'teacher'
      },
      student: {
        id: '2',
        name: 'Jane Doe'
      },
      subject: 'Behavior Issue',
      details: 'Student was disruptive during class',
      status: 'pending',
      createdAt: '2024-03-15T10:30:00Z',
      isHallOfFame: false
    },
    {
      id: '2',
      type: 'complaint',
      submittedBy: {
        id: '3',
        name: 'Sarah Wilson',
        role: 'student'
      },
      teacher: {
        id: '4',
        name: 'Mr. Brown'
      },
      subject: 'Teaching Method Concern',
      details: 'Teacher is not explaining concepts clearly',
      status: 'pending',
      createdAt: '2024-03-14T15:45:00Z',
      isHallOfFame: false
    },
    {
      id: '3',
      type: 'achievement',
      submittedBy: {
        id: '1',
        name: 'John Smith',
        role: 'teacher'
      },
      student: {
        id: '3',
        name: 'Mike Johnson'
      },
      achievementTitle: 'Science Fair Winner',
      achievementDescription: 'First place in regional science fair',
      attachment: {
        name: 'certificate.pdf',
        url: '/certificates/certificate.pdf',
        type: 'pdf'
      },
      status: 'reviewed',
      createdAt: '2024-03-14T15:45:00Z',
      isHallOfFame: true
    }
  ]);

  // Redirect if not admin or teacher
  if (user?.role !== 'admin' && user?.role !== 'teacher') {
    navigate('/');
    return null;
  }

  // Filter feedback based on search term, filters, and user role
  const filteredFeedbacks = feedbacks.filter(feedback => {
    // Role-based access control
    if (user?.role === 'teacher') {
      // Teachers can only see feedback about students
      if (feedback.teacher) {
        return false;
      }
    }

    const matchesSearch = 
      feedback.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.achievementTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.achievementDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.teacher?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || feedback.type === filterType;
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const updateFeedbackStatus = (id: string, newStatus: 'pending' | 'reviewed' | 'resolved') => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, status: newStatus } : feedback
    ));
  };

  const toggleHallOfFame = (id: string) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, isHallOfFame: !feedback.isHallOfFame } : feedback
    ));
  };

  // Extract achievements from feedbacks
  const achievements = feedbacks
    .filter(feedback => feedback.type === 'achievement')
    .map(feedback => ({
      id: feedback.id,
      student: feedback.student!,
      title: feedback.achievementTitle!,
      description: feedback.achievementDescription!,
      date: feedback.createdAt,
      attachment: feedback.attachment,
      isHallOfFame: feedback.isHallOfFame
    }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <FeedbackHeader />

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('feedback')}
              className={`${
                activeTab === 'feedback'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Feedback
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`${
                activeTab === 'achievements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Achievements
            </button>
          </nav>
        </div>

        {activeTab === 'feedback' ? (
          <>
            <SearchFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
            />

            <div className="space-y-4">
              {filteredFeedbacks.map((feedback) => (
                <FeedbackItem
                  key={feedback.id}
                  feedback={feedback}
                  onStatusUpdate={updateFeedbackStatus}
                  onToggleHallOfFame={feedback.type === 'achievement' ? toggleHallOfFame : undefined}
                />
              ))}

              {filteredFeedbacks.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No feedback found</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <AchievementsView
            achievements={achievements}
            onToggleHallOfFame={toggleHallOfFame}
          />
        )}
      </div>
    </Layout>
  );
};

export default ViewFeedback; 