import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Bell, ArrowLeft, Megaphone, BookOpen, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../common/Layout';

interface Notice {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  createdAt: string;
  targetAudience: string[];
  category: 'announcement' | 'circular' | 'event';
  isNew?: boolean;
  attachment?: {
    name: string;
    url: string;
  };
}

const NoticeBoard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data for notices
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Parent-Teacher Meeting',
      content: 'We are pleased to announce the upcoming Parent-Teacher Meeting scheduled for next week. Please make sure to attend.',
      author: {
        name: 'John Smith',
        role: 'Teacher'
      },
      createdAt: '2024-03-15T10:00:00Z',
      targetAudience: ['All Parents'],
      category: 'event',
      isNew: true,
      attachment: {
        name: 'PTM_Schedule.pdf',
        url: '#'
      }
    },
    {
      id: '2',
      title: 'School Holiday Notice',
      content: 'The school will remain closed on March 20th due to maintenance work.',
      author: {
        name: 'Admin',
        role: 'Administrator'
      },
      createdAt: '2024-03-14T15:30:00Z',
      targetAudience: ['All Parents', 'All Teachers'],
      category: 'announcement'
    }
  ];

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      case 'circular':
        return <BookOpen className="h-4 w-4" />;
      case 'event':
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Calculate category counts
  const categoryCounts = notices.reduce((acc, notice) => {
    acc[notice.category] = (acc[notice.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === selectedCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">School Notices</h1>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="px-4 pb-3 overflow-x-auto">
            <div className="flex space-x-1.5 min-w-max">
              {['all', 'announcement', 'circular', 'event'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center space-x-1.5 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {category === 'all' ? notices.length : categoryCounts[category] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notices List */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">
                        {getCategoryIcon(notice.category)}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                    </div>
                    {notice.isNew && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 block mb-2">
                    {formatDate(notice.createdAt)}
                  </span>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{notice.content}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/notices/${notice.id}`)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-800"
                    >
                      Read More
                    </button>
                    {notice.attachment && (
                      <a
                        href={notice.attachment.url}
                        className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {notice.attachment.name}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Notice Button - Fixed at bottom */}
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => navigate('/notices/new')}
              className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NoticeBoard; 