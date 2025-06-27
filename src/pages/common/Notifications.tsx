import React, { useState } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  time: string;
  source?: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {notifications.length}
        </span>
      </button>

      {showNotifications && (
        <div className="absolute left-[-22vw] -translate-x-1/2 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 relative">
                {notification.source && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                    {notification.source}
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-8">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  <div className={`ml-2 h-2 w-2 rounded-full ${
                    notification.type === 'warning' ? 'bg-yellow-400' :
                    notification.type === 'info' ? 'bg-blue-400' :
                    'bg-green-400'
                  }`}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications; 