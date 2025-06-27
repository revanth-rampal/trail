import React from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Notifications from './Notifications';
import UserProfile from './UserProfile';

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  const notifications = [
    {
      id: '1',
      title: 'Attendance Alert',
      message: 'Alex Johnson was marked absent today',
      type: 'warning' as const,
      time: '5 minutes ago',

    },
    {
      id: '2',
      title: 'Bus Update',
      message: 'Route A is running 10 minutes late',
      type: 'info' as const,
      time: '15 minutes ago',
      source: 'GPS'
    },
    {
      id: '3',
      title: 'Grade Updated',
      message: 'Math quiz grades have been uploaded',
      type: 'success' as const,
      time: '1 hour ago',
      source: 'Notice Board'
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Right: Notifications and Profile */}
        <div className="flex items-center space-x-3">
          <Notifications notifications={notifications} />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;