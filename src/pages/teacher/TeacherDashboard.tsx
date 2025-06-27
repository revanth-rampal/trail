import React from 'react';
import Layout from '../common/Layout';
import WelcomeSection from '../dashboard/WelcomeSection';
import QuickActionsSection from '../dashboard/QuickActionsSection';
import RecentActivityFeed from '../dashboard/RecentActivityFeed';
import { useNavigate } from 'react-router-dom';

interface ClassCard {
  id: string;
  name: string;
  studentCount: number;
  subject: string;
}

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for classes
  const classes: ClassCard[] = [
    { id: '1', name: 'Class 7A', studentCount: 15, subject: 'Maths' },
    { id: '2', name: 'Class 8B', studentCount: 18, subject: 'Science' },
    { id: '3', name: 'Class 9A', studentCount: 20, subject: 'English' },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    { id: '1', title: 'Parent-Teacher Meeting', date: '2025-07-10', type: 'meeting' },
    { id: '2', title: 'Class 9 Test', date: '2025-07-15', type: 'test' },
  ];

  return (
    <Layout title="Teacher Dashboard">
      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        <WelcomeSection />
        <QuickActionsSection />
        
        {/* Classes Section */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">My Classes</h2>
          <div className="space-y-3 sm:space-y-4">
            {classes.map((classItem) => (
              <div key={classItem.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{classItem.name}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                  {classItem.studentCount} Students • {classItem.subject}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-2 sm:px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                    View Roster
                  </button>
                  <button 
                    onClick={() => navigate(`/homework/${classItem.id}`)}
                    className="px-2 sm:px-3 py-1 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                  >
                    View Homework
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Upcoming Events & Reminders</h2>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <RecentActivityFeed />
      </div>
    </Layout>
  );
};

export default TeacherDashboard; 