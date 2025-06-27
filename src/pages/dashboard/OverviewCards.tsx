import React from 'react';
import { GraduationCap, BookOpen, AlertCircle, Calendar } from 'lucide-react';

const OverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <a href="/students" className="text-xs text-blue-600 hover:underline">View All</a>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">1,200</h3>
        <p className="text-sm text-gray-600">Total Students</p>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <BookOpen className="h-6 w-6 text-green-600" />
          <a href="/teachers" className="text-xs text-green-600 hover:underline">View All</a>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">60</h3>
        <p className="text-sm text-gray-600">Total Teachers</p>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <AlertCircle className="h-6 w-6 text-red-600" />
          <button className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">
            Review Now
          </button>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">5</h3>
        <p className="text-sm text-gray-600">Pending Complaints</p>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="h-6 w-6 text-purple-600" />
          <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Manage Events
          </button>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">3</h3>
        <p className="text-sm text-gray-600">Upcoming Events</p>
      </div>
    </div>
  );
};

export default OverviewCards; 