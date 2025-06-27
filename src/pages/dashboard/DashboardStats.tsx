import React from 'react';
import { Users, Calendar, TrendingUp, Bus, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardStats: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: Users, label: 'Total Students', value: '1,247', change: '+12', changeType: 'positive' },
          { icon: Calendar, label: 'Attendance Rate', value: '94.2%', change: '+2.1%', changeType: 'positive' },
          { icon: TrendingUp, label: 'Average Grade', value: '87.3', change: '+1.8', changeType: 'positive' },
          { icon: Bus, label: 'Active Buses', value: '12', change: '0', changeType: 'neutral' }
        ];
      case 'teacher':
        return [
          { icon: Users, label: 'My Students', value: '156', change: '+3', changeType: 'positive' },
          { icon: CheckCircle, label: 'Present Today', value: '142', change: '+8', changeType: 'positive' },
          { icon: AlertTriangle, label: 'Absent Today', value: '14', change: '-2', changeType: 'positive' },
          { icon: TrendingUp, label: 'Class Average', value: '85.7', change: '+2.3', changeType: 'positive' }
        ];
      case 'parent':
        return [
          { icon: Calendar, label: 'Attendance Rate', value: '96.8%', change: '+1.2%', changeType: 'positive' },
          { icon: TrendingUp, label: 'Overall Grade', value: '89.5', change: '+3.2', changeType: 'positive' },
          { icon: Bus, label: 'Bus ETA', value: '8 min', change: 'On time', changeType: 'neutral' },
          { icon: CheckCircle, label: 'Assignments', value: '12/15', change: '80%', changeType: 'positive' }
        ];
      case 'student':
        return [
          { icon: Calendar, label: 'My Attendance', value: '96.8%', change: '+1.2%', changeType: 'positive' },
          { icon: TrendingUp, label: 'My Average', value: '89.5', change: '+3.2', changeType: 'positive' },
          { icon: Bus, label: 'Bus Arrival', value: '8 min', change: 'On time', changeType: 'neutral' },
          { icon: CheckCircle, label: 'Completed', value: '12/15', change: '80%', changeType: 'positive' }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className={`text-[10px] sm:text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' :
                stat.changeType === 'negative' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-base sm:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">{stat.value}</p>
              <p className="text-[10px] sm:text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;