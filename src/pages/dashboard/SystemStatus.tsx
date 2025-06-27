import React from 'react';

const SystemStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">System Status</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
          <div>
            <p className="font-medium text-gray-900 text-xs sm:text-base">Attendance System</p>
            <p className="text-[10px] sm:text-sm text-gray-600">All systems operational</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
          <div>
            <p className="font-medium text-gray-900 text-xs sm:text-base">Grade Management</p>
            <p className="text-[10px] sm:text-sm text-gray-600">All systems operational</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 col-span-2 lg:col-span-1">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
          <div>
            <p className="font-medium text-gray-900 text-xs sm:text-base">Bus Tracking</p>
            <p className="text-[10px] sm:text-sm text-gray-600">Minor delays on Route C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus; 