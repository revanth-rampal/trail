import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface QuickAction {
  title: string;
  description: string;
  color: string;
}

const QuickActionsSection: React.FC = () => {
  const { user } = useAuth();

  const getQuickActions = (): QuickAction[] => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Post New Notice', description: 'Create and publish announcements', color: 'bg-blue-500' },
          { title: 'Add New User', description: 'Create new user accounts', color: 'bg-green-500' },
          { title: 'Manage Calendar', description: 'Schedule and manage events', color: 'bg-purple-500' },
          { title: 'View Reports', description: 'Access system analytics', color: 'bg-orange-500' }
        ];
      case 'teacher':
        return [
          { title: 'Mark Attendance', description: 'Record student attendance', color: 'bg-blue-500' },
          { title: 'Grade Assignments', description: 'Upload and manage grades', color: 'bg-green-500' },
          { title: 'Class Schedule', description: 'View and manage schedule', color: 'bg-purple-500' },
          { title: 'Student Progress', description: 'Monitor student performance', color: 'bg-orange-500' }
        ];
      case 'parent':
        return [
          { title: 'Track Attendance', description: 'View child attendance record', color: 'bg-blue-500' },
          { title: 'Academic Progress', description: 'Monitor grades and performance', color: 'bg-green-500' },
          { title: 'Bus Tracking', description: 'Track school bus location', color: 'bg-purple-500' },
          { title: 'Communications', description: 'Messages from teachers', color: 'bg-orange-500' }
        ];
      case 'student':
        return [
          { title: 'My Attendance', description: 'View attendance record', color: 'bg-blue-500' },
          { title: 'My Grades', description: 'Check academic performance', color: 'bg-green-500' },
          { title: 'Bus Location', description: 'Track bus arrival time', color: 'bg-purple-500' },
          { title: 'Assignments', description: 'View pending assignments', color: 'bg-orange-500' }
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h3>
            <p className="text-gray-600 text-xs">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSection; 