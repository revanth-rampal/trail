import React from 'react';

interface User {
  name?: string;
  role?: string;
  avatar?: string;
}

interface UserProfileProps {
  user: User | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</p>
        <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
      </div>
      <img
        src={user?.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`}
        alt={user?.name || 'User avatar'}
        className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
      />
    </div>
  );
};

export default UserProfile; 