import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, TrendingUp, Users, Bell, MapPin, Bus } from 'lucide-react';

interface Activity {
  icon: React.ElementType;
  text: string;
  time: string;
}

const RecentActivities: React.FC = () => {
  const { user } = useAuth();

  const getRecentActivities = (): Activity[] => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: Users, text: '15 new student registrations this week', time: '2 hours ago' },
          { icon: TrendingUp, text: 'Monthly performance report generated', time: '4 hours ago' },
          { icon: Bus, text: 'Bus route optimization completed', time: '1 day ago' },
          { icon: Bell, text: 'System maintenance scheduled for Sunday', time: '2 days ago' }
        ];
      case 'teacher':
        return [
          { icon: Calendar, text: 'Attendance marked for Class 10-A', time: '1 hour ago' },
          { icon: TrendingUp, text: 'Math quiz grades uploaded', time: '3 hours ago' },
          { icon: Users, text: 'Parent-teacher meeting scheduled', time: '5 hours ago' },
          { icon: Bell, text: 'Assignment deadline reminder sent', time: '1 day ago' }
        ];
      case 'parent':
        return [
          { icon: Calendar, text: 'Alex marked present today', time: '2 hours ago' },
          { icon: TrendingUp, text: 'Science test score: 92/100', time: '1 day ago' },
          { icon: MapPin, text: 'Bus arrived at school on time', time: '2 days ago' },
          { icon: Bell, text: 'Parent-teacher meeting confirmed', time: '3 days ago' }
        ];
      case 'student':
        return [
          { icon: Calendar, text: 'Attendance: Present (96.8% this month)', time: 'Today' },
          { icon: TrendingUp, text: 'Science assignment graded: A-', time: '1 day ago' },
          { icon: MapPin, text: 'Bus tracking: On time arrival', time: '2 days ago' },
          { icon: Bell, text: 'Math homework due tomorrow', time: '3 days ago' }
        ];
      default:
        return [];
    }
  };

  const recentActivities = getRecentActivities();

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Activities</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-sm text-gray-900 mb-0.5 sm:mb-1 line-clamp-2">{activity.text}</p>
                  <p className="text-[8px] sm:text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities; 