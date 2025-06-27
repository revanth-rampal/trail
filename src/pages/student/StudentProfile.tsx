import React, { useState, useMemo } from 'react';
import { Mail, Phone, MapPin, Award, User, Percent, BarChartHorizontal, BookOpen, Star, Calendar, MessageSquare, Edit, XCircle, Filter } from 'lucide-react';

// --- MOCK DATA for a single student profile ---
const studentData = {
  id: 'STU-1024',
  name: 'Aarav Sharma',
  avatar: 'https://placehold.co/200x200/E2A8A8/4F5D75?text=AS',
  class: 'Class 10 - Section A',
  rollNo: '10A-24',
  personalDetails: {
    dob: '2008-05-15',
    address: '45/B, Lakeview Apartments, Greenfield, Mumbai, MH 400001',
    parentName: 'Mr. Rajan Sharma',
    parentPhone: '+91 98200 98200',
    parentEmail: 'r.sharma@email.com',
  },
  academicStats: {
    attendance: 96,
    overallGrade: 88,
    badgesEarned: 4,
    absentDays: 3, 
  },
  // UPDATED: Added 'year' to grades for better filtering
  grades: [
    { year: 2024, term: 'Term 1', subject: 'Mathematics', marks: 92, total: 100, grade: 'A+' },
    { year: 2024, term: 'Term 1', subject: 'Physics', marks: 88, total: 100, grade: 'A' },
    { year: 2024, term: 'Term 1', subject: 'Chemistry', marks: 85, total: 100, grade: 'A' },
    { year: 2024, term: 'Term 1', subject: 'English', marks: 90, total: 100, grade: 'A+' },
    { year: 2024, term: 'Mid-Term', subject: 'Mathematics', marks: 89, total: 100, grade: 'A' },
    { year: 2024, term: 'Mid-Term', subject: 'Physics', marks: 91, total: 100, grade: 'A+' },
    { year: 2023, term: 'Term 1', subject: 'Mathematics', marks: 85, total: 100, grade: 'A' },
    { year: 2023, term: 'Final Term', subject: 'Physics', marks: 90, total: 100, grade: 'A+' },
  ],
  attendanceLog: [
      { date: '2024-05-20', status: 'Absent', reason: 'Sick Leave' },
      { date: '2024-04-11', status: 'Absent', reason: 'Family Function' },
      { date: '2024-03-02', status: 'Late', reason: 'Traffic Delay' },
      { date: '2024-01-29', status: 'Absent', reason: 'Medical Appointment' },
  ],
  badges: [
      { id: 'll', name: 'Legendary Learner', image: '/ll.png' },
      { id: 'ck', name: 'Creative Kingpin', image: '/ck.png' },
      { id: 'som', name: 'Star of the Month', image: '/som.png' },
      { id: 'sw', name: 'Science Wizard', image: '/sw.png' },
  ]
};

// --- Helper Components ---
const StatCard = ({ icon, label, value, suffix, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}{suffix}</p>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-4">
        <div className="text-gray-400 mt-1">{icon}</div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

// --- Main Student Profile Component ---
export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('academics');
  const [yearFilter, setYearFilter] = useState('All');
  const [termFilter, setTermFilter] = useState('All');

  const { name, avatar, class: studentClass, rollNo, personalDetails, academicStats, grades, attendanceLog, badges } = studentData;

  const uniqueYears = useMemo(() => ['All', ...Array.from(new Set(grades.map(g => g.year)))], [grades]);
  const uniqueTerms = useMemo(() => ['All', ...Array.from(new Set(grades.map(g => g.term)))], [grades]);

  const filteredGrades = useMemo(() => {
    return grades.filter(grade => {
      const yearMatch = yearFilter === 'All' || grade.year === parseInt(yearFilter);
      const termMatch = termFilter === 'All' || grade.term === termFilter;
      return yearMatch && termMatch;
    });
  }, [grades, yearFilter, termFilter]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'academics':
        return (
          <div>
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                    <label htmlFor="year-filter" className="text-xs font-medium text-gray-600">Year</label>
                    <select id="year-filter" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                        {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="term-filter" className="text-xs font-medium text-gray-600">Term</label>
                    <select id="term-filter" value={termFilter} onChange={(e) => setTermFilter(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm">
                        {uniqueTerms.map(term => <option key={term} value={term}>{term}</option>)}
                    </select>
                </div>
            </div>

            {/* Grades Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="p-3 text-left font-semibold">Subject</th>
                    <th className="p-3 text-center font-semibold">Marks</th>
                    <th className="p-3 text-center font-semibold">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGrades.length > 0 ? (
                        filteredGrades.map((grade, i) => (
                        <tr key={i} className="border-b border-gray-100">
                            <td className="p-3 font-medium text-gray-800">{grade.subject}</td>
                            <td className="p-3 text-center">{grade.marks} / {grade.total}</td>
                            <td className="p-3 text-center font-bold text-blue-600">{grade.grade}</td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-6 text-gray-500">
                                No records found for the selected filters.
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
          </div>
        );
      case 'attendance':
        return (
            <div className="space-y-3">
                {attendanceLog.map((log, i) => (
                    <div key={i} className="bg-gray-50/70 p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                        <div>
                            <p className={`font-bold ${log.status === 'Absent' ? 'text-red-600' : 'text-yellow-600'}`}>{log.status}</p>
                            <p className="text-sm text-gray-600">{log.reason}</p>
                        </div>
                        <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                ))}
            </div>
        );
      case 'achievements':
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {badges.map(badge => (
                    <div key={badge.id} className="bg-gray-50/70 p-4 rounded-lg border border-gray-200 text-center flex flex-col items-center justify-center">
                        <img src={badge.image} alt={badge.name} className="w-16 h-16 object-contain"/>
                        <p className="text-xs font-semibold mt-2 text-gray-700">{badge.name}</p>
                    </div>
                ))}
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5">
                <img src={avatar} alt={name} className="w-24 h-24 rounded-full border-4 border-blue-200" />
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                    <p className="text-md text-gray-600 font-medium">{studentClass} | Roll No: {rollNo}</p>
                </div>
            </div>
        </div>
        
        {/* Academic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<Percent size={20} className="text-green-600"/>} label="Attendance" value={academicStats.attendance} suffix="%" color="bg-green-100"/>
            <StatCard icon={<BarChartHorizontal size={20} className="text-blue-600"/>} label="Avg. Grade" value={academicStats.overallGrade} suffix="%" color="bg-blue-100"/>
            <StatCard icon={<Star size={20} className="text-yellow-600"/>} label="Badges" value={academicStats.badgesEarned} color="bg-yellow-100"/>
            <StatCard icon={<XCircle size={20} className="text-red-600"/>} label="Days Absent" value={academicStats.absentDays} color="bg-red-100"/>
        </div>

        {/* Personal & Parent Info */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <InfoRow icon={<User size={16}/>} label="Parent/Guardian" value={personalDetails.parentName} />
                <InfoRow icon={<Phone size={16}/>} label="Parent Phone" value={personalDetails.parentPhone} />
                <InfoRow icon={<Calendar size={16}/>} label="Date of Birth" value={new Date(personalDetails.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
                <InfoRow icon={<MapPin size={16}/>} label="Address" value={personalDetails.address} />
            </div>
        </div>

        {/* Tabbed content */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200/80">
            <div className="border-b border-gray-200 mb-4">
                <nav className="flex gap-4 -mb-px overflow-x-auto">
                    <button onClick={() => setActiveTab('academics')} className={`py-2 px-1 font-semibold whitespace-nowrap border-b-2 ${activeTab === 'academics' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>Academics</button>
                    <button onClick={() => setActiveTab('attendance')} className={`py-2 px-1 font-semibold whitespace-nowrap border-b-2 ${activeTab === 'attendance' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>Attendance</button>
                    <button onClick={() => setActiveTab('achievements')} className={`py-2 px-1 font-semibold whitespace-nowrap border-b-2 ${activeTab === 'achievements' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>Achievements</button>
                </nav>
            </div>
            <div>{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
