import React, { useState, useMemo } from 'react';
import { Search, UserPlus, ChevronDown, MoreVertical, Eye, Edit, Trash2, Mail, BookOpen, Calendar, Phone } from 'lucide-react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA: A realistic list of teachers with Indian names ---
const mockTeachers = [
  {
    id: 'TCH-001',
    name: 'Dr. Priya Sharma',
    avatar: 'https://placehold.co/100x100/A8D5E2/4F5D75?text=PS',
    subject: 'Physics & Chemistry',
    email: 'p.sharma@school.edu',
    phone: '+91 98765 43210',
    status: 'Active',
    joinDate: '2018-08-15',
  },
  {
    id: 'TCH-002',
    name: 'Mr. Rohan Verma',
    avatar: 'https://placehold.co/100x100/F9A87B/4F5D75?text=RV',
    subject: 'Mathematics',
    email: 'r.verma@school.edu',
    phone: '+91 98765 43211',
    status: 'Active',
    joinDate: '2020-09-01',
  },
  {
    id: 'TCH-003',
    name: 'Ms. Anjali Gupta',
    avatar: 'https://placehold.co/100x100/D4A5A5/4F5D75?text=AG',
    subject: 'English Literature',
    email: 'a.gupta@school.edu',
    phone: '+91 98765 43212',
    status: 'Active',
    joinDate: '2019-07-22',
  },
  {
    id: 'TCH-004',
    name: 'Mr. Vikram Singh',
    avatar: 'https://placehold.co/100x100/AEC6CF/4F5D75?text=VS',
    subject: 'History & Civics',
    email: 'v.singh@school.edu',
    phone: '+91 98765 43213',
    status: 'On Leave',
    joinDate: '2017-02-10',
  },
  {
    id: 'TCH-005',
    name: 'Ms. Sneha Patel',
    avatar: 'https://placehold.co/100x100/FFD3B6/4F5D75?text=SP',
    subject: 'Biology',
    email: 's.patel@school.edu',
    phone: '+91 98765 43214',
    status: 'Active',
    joinDate: '2021-08-20',
  },
  {
    id: 'TCH-006',
    name: 'Mr. Amit Kumar',
    avatar: 'https://placehold.co/100x100/C9E4DE/4F5D75?text=AK',
    subject: 'Physical Education',
    email: 'a.kumar@school.edu',
    phone: '+91 98765 43215',
    status: 'Active',
    joinDate: '2016-05-18',
  },
];

// --- Helper component for status badges ---
const StatusBadge = ({ status }) => {
  const baseClasses = "px-2 py-0.5 text-xs font-semibold rounded-full";
  const statusClasses = {
    Active: "bg-green-100 text-green-800",
    'On Leave': "bg-yellow-100 text-yellow-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

// --- Helper component for the action dropdown ---
const ActionMenu = ({ teacherId, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
        <MoreVertical size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100">
          <a onClick={() => onAction('View Profile', teacherId)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Eye size={16} /> View Profile
          </a>
          <a onClick={() => onAction('Edit', teacherId)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            <Edit size={16} /> Edit Details
          </a>
          <a onClick={() => onAction('Deactivate', teacherId)} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
            <Trash2 size={16} /> Deactivate
          </a>
        </div>
      )}
    </div>
  );
};


// --- Main Component: AllTeachersList ---
export default function AllTeachersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const handleAction = (action, teacherId) => {
    alert(`Action: ${action} for Teacher ID: ${teacherId}`);
  };

  const filteredTeachers = useMemo(() => {
    return mockTeachers
      .filter(teacher => statusFilter === 'All' || teacher.status === statusFilter)
      .filter(teacher => {
        const term = searchTerm.toLowerCase();
        return (
          teacher.name.toLowerCase().includes(term) ||
          teacher.subject.toLowerCase().includes(term) ||
          teacher.email.toLowerCase().includes(term)
        );
      });
  }, [searchTerm, statusFilter]);

  return (
    <Layout>
    <div className="bg-gray-50/50 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teacher Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              View, search, and manage all teachers.
            </p>
          </div>
          <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            <UserPlus size={18} />
            <span>Add New Teacher</span>
          </button>
        </div>

        {/* Control Bar: Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, subject, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none w-full sm:w-48 bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Teachers Card List */}
        <div className="space-y-4">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4" onClick={() => navigate(`/teacher-profile/${teacher.id}`)}>
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img className="h-12 w-12 rounded-full object-cover" src={teacher.avatar} alt={teacher.name} />
                  <div>
                    <div className="text-base font-bold text-gray-900">{teacher.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1.5">
                      <Mail size={14} />
                      {teacher.email}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                    <ActionMenu teacherId={teacher.id} onAction={handleAction}/>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BookOpen size={16} className="text-gray-400"/>
                    <span className="font-semibold">Subject:</span>
                    <span>{teacher.subject}</span>
                </div>
                <div className="flex items-center gap-4">
                    <StatusBadge status={teacher.status} />
                    <div className="text-sm text-gray-500 flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>Joined: {new Date(teacher.joinDate).toLocaleDateString()}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-700">No Teachers Found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>

  );
}
