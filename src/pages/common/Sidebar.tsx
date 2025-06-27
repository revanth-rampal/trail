import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  MapPin,
  X,
  BookOpen,
  Bell,
  Phone,
  FileText,
  Clock,
  MessageSquare,
  Trophy,
  Library,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  LucideIcon
} from 'lucide-react';

type MenuItemType = 'link' | 'divider';

interface BaseMenuItem {
  type: MenuItemType;
}

interface LinkMenuItem extends BaseMenuItem {
  type: 'link';
  icon: LucideIcon;
  label: string;
  path: string;
  subItems?: LinkMenuItem[];
}

interface DividerMenuItem extends BaseMenuItem {
  type: 'divider';
}

type MenuItem = LinkMenuItem | DividerMenuItem;

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, isMobile = false }) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const location = useLocation();

  const getMenuItems = (): MenuItem[] => {
    const commonItems: MenuItem[] = [
      { type: 'link', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ];

    if (!user?.role) return commonItems;

    switch (user.role) {
      case 'admin':
        return [
          ...commonItems,
          { 
            type: 'link',
            icon: Users, 
            label: 'User Management', 
            path: '/users',
            subItems: [
              { type: 'link', icon: GraduationCap, label: 'Students', path: '/users/students' },
              { type: 'link', icon: Users, label: 'Teachers', path: '/users/teachers' },
            ]
          },
          { type: 'link', icon: ClipboardList, label: 'Attendance Management', path: '/attendance' },
          { type: 'link', icon: BookOpen, label: 'Homework Management', path: '/homework/:classId' },
          { type: 'link', icon: Calendar, label: 'Calendar Management', path: '/calendar' },
          { type: 'link', icon: Bell, label: 'Notice Board', path: '/notices' },
          { type: 'link', icon: Phone, label: 'Emergency Contacts', path: '/emergency_contact' },
          { type: 'link', icon: FileText, label: 'Test & Exam Management', path: '/test_marks' },
          { type: 'link', icon: MessageSquare, label: 'Feedback Management', path: '/feedback' },
          { type: 'link', icon: Trophy, label: 'Hall of Fame', path: '/hall-of-fame' },
          { type: 'link', icon: Library, label: 'Resource Hub', path: '/resources' },
          { type: 'divider' },
          { type: 'link', icon: Settings, label: 'Settings', path: '/settings' },
          { type: 'link', icon: HelpCircle, label: 'Help & Support', path: '/help' },
        ];
      case 'teacher':
        return [
          { type: 'link', icon: LayoutDashboard, label: 'Teacher Dashboard', path: '/teacher-dashboard' },
          { type: 'link', icon: ClipboardList, label: 'Mark Attendance', path: '/attendance' },
          { type: 'link', icon: GraduationCap, label: 'My Classes', path: '/classes' },
          { type: 'link', icon: BarChart3, label: 'Student Performance', path: '/performance' },
          { type: 'link', icon: Bell, label: 'Notice Board', path: '/notices' },
          { type: 'link', icon: Calendar, label: 'Calendar Management', path: '/calendar' },
          { type: 'link', icon: Calendar, label: 'Schedule', path: '/schedule' },
          { type: 'link', icon: BookOpen, label: 'Homework Management', path: '/homework/:classId' },
          { type: 'link', icon: FileText, label: 'Test & Exam Management', path: '/test_marks' },
          { type: 'link', icon: Clock, label: 'Timetable Management', path: '/timetable' },
          { type: 'link', icon: MessageSquare, label: 'Submit Feedback', path: '/feedback/submit' },
          { type: 'link', icon: Trophy, label: 'Hall of Fame', path: '/hall-of-fame' },
          { type: 'link', icon: Library, label: 'Resource Hub', path: '/resources' },
          { type: 'divider' },
          { type: 'link', icon: Settings, label: 'Settings', path: '/settings' },
          { type: 'link', icon: HelpCircle, label: 'Help & Support', path: '/help' }
        ];
      case 'parent':
        return [
          ...commonItems,
          { type: 'link', icon: Calendar, label: 'Attendance', path: '/view_attendance/1' },
          { type: 'link', icon: Calendar, label: 'Class TimeTable', path: '/view_timetable/1' },

          { type: 'link', icon: TrendingUp, label: 'Performance', path: '/performance' },
          { type: 'link', icon: MapPin, label: 'Bus Tracking', path: '/bus-tracking' },
          { type: 'link', icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'student':
        return [
          ...commonItems,
          { type: 'link', icon: Calendar, label: 'My Attendance', path: '/attendance' },
          { type: 'link', icon: BarChart3, label: 'My Performance', path: '/performance' },
          { type: 'link', icon: MapPin, label: 'Bus Tracking', path: '/bus-tracking' },
        ];
      default:
        return commonItems;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = getMenuItems();

  const toggleSubmenu = (path: string) => {
    setExpandedSubmenu(expandedSubmenu === path ? null : path);
  };

  return (
    <>
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div 
        className={`bg-white shadow-lg transition-all duration-300 h-full ${
          isMobile 
            ? 'fixed top-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none' 
            : isCollapsed 
              ? 'w-16' 
              : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">EduTrack Admin</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                )}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {(!isCollapsed || isMobile) && user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100`}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="mt-4 px-2 overflow-y-auto max-h-[calc(100vh-200px)]">
          {menuItems.map((item, index) => {
            if (item.type === 'divider') {
              return (
                <div key={index} className="my-2 border-t border-gray-200" />
              );
            }

            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const hasSubmenu = item.subItems && item.subItems.length > 0;
            const isSubmenuExpanded = expandedSubmenu === item.path;
            
            return (
              <div key={index}>
                <div
                  onClick={() => hasSubmenu ? toggleSubmenu(item.path) : undefined}
                  className={`flex items-center px-3 py-3 mb-1 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700 font-semibold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {hasSubmenu ? (
                    <Link to={item.path} className="flex items-center flex-1">
                      <Icon className={`h-5 w-5 ${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-blue-700' : ''}`} />
                      {(!isCollapsed || isMobile) && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                  ) : (
                    <Link to={item.path} className="flex items-center flex-1">
                      <Icon className={`h-5 w-5 ${isCollapsed && !isMobile ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-blue-700' : ''}`} />
                      {(!isCollapsed || isMobile) && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                  )}
                  {hasSubmenu && (!isCollapsed || isMobile) && (
                    <button className="ml-auto">
                      {isSubmenuExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  )}
                </div>
                
                {hasSubmenu && isSubmenuExpanded && (!isCollapsed || isMobile) && (
                  <div className="ml-6 space-y-1">
                    {item.subItems?.map((subItem, subIndex) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = location.pathname === subItem.path;
                      
                      return (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                            isSubActive
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <SubIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-2 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
              isCollapsed && !isMobile ? 'justify-center' : ''
            }`}
          >
            <LogOut className={`h-5 w-5 ${isCollapsed && !isMobile ? '' : 'mr-3'}`} />
            {(!isCollapsed || isMobile) && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;