import React, { useState } from 'react';
import { Mail, Phone, MapPin, Award, BookOpen, Calendar, TrendingUp, UserCheck, Briefcase, Clock, ArrowLeft } from 'lucide-react';
import Layout from '../common/Layout';

// --- MOCK DATA for a single teacher profile ---
const teacherData = {
  id: 'TCH-001',
  name: 'Dr. Priya Sharma',
  avatar: 'https://placehold.co/200x200/A8D5E2/4F5D75?text=PS',
  subject: 'Head of Science (Physics & Chemistry)',
  email: 'p.sharma@school.edu',
  phone: '+91 98765 43210',
  status: 'Active',
  joinDate: '2018-08-15',
  address: '123 Vigyan Lane, Knowledge City, Mumbai, MH 400001',
  qualifications: 'Ph.D. in Applied Physics, M.Sc. in Chemistry',
  stats: {
    yearsOfService: 6,
    classesAssigned: 4,
    avgStudentPerformance: 92, // Percentage
    absencesYTD: 5,
  },
  // UPDATED: Added absence log data
  absenceLog: [
      { date: '2024-05-20', reason: 'Sick Leave' },
      { date: '2024-05-21', reason: 'Sick Leave' },
      { date: '2024-04-11', reason: 'Personal Emergency' },
      { date: '2024-02-15', reason: 'Family Function' },
      { date: '2024-01-29', reason: 'Medical Appointment' },
  ],
  schedule: [
    { day: 'Monday', '9-10': '10A Physics', '10-11': 'Free', '11-12': '9B Chem', '12-1': 'Lunch', '1-2': 'Lab Duty', '2-3': 'Free' },
    { day: 'Tuesday', '9-10': '10B Physics', '10-11': '10A Chem', '11-12': 'Free', '12-1': 'Lunch', '1-2': '9A Physics', '2-3': 'Staff Mtg' },
    { day: 'Wednesday', '9-10': '10A Physics', '10-11': 'Free', '11-12': '9B Chem', '12-1': 'Lunch', '1-2': 'Free', '2-3': '10A Chem' },
    { day: 'Thursday', '9-10': '10B Physics', '10-11': '10A Chem', '11-12': 'Free', '12-1': 'Lunch', '1-2': '9A Physics', '2-3': 'Free' },
    { day: 'Friday', '9-10': '10A Physics', '10-11': 'Lab Duty', '11-12': '9B Chem', '12-1': 'Lunch', '1-2': 'Free', '2-3': 'Free' },
  ],
  assignedClasses: [
      { id: '10A', name: 'Class 10 - Section A', students: 35, avgScore: 94 },
      { id: '10B', name: 'Class 10 - Section B', students: 32, avgScore: 91 },
      { id: '9A', name: 'Class 9 - Section A', students: 38, avgScore: 89 },
      { id: '9B', name: 'Class 9 - Section B', students: 36, avgScore: 93 },
  ]
};

const periods = ['9-10', '10-11', '11-12', '12-1', '1-2', '2-3'];

// --- Helper Components ---
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="text-gray-400 mt-1">{icon}</div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">{value}</p>
        </div>
    </div>
);


export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState('schedule');
  const { name, avatar, subject, stats, schedule, assignedClasses, qualifications, address, email, phone, absenceLog } = teacherData;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-200 w-24"><Clock size={16} className="mx-auto"/></th>
                  {periods.map(p => <th key={p} className="p-2 border border-gray-200 font-semibold">{p}</th>)}
                </tr>
              </thead>
              <tbody>
                {schedule.map(row => (
                  <tr key={row.day} className="border-b">
                    <td className="p-2 border border-gray-200 font-semibold bg-gray-50">{row.day}</td>
                    {periods.map(p => (
                      <td key={p} className={`p-2 border border-gray-200 ${row[p] === 'Free' ? 'bg-green-50 text-green-700' : row[p] === 'Lunch' ? 'bg-yellow-50 text-yellow-700' : ''}`}>
                        {row[p]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'classes':
        return (
            <div className="space-y-3">
                {assignedClasses.map(c => (
                    <div key={c.id} className="bg-gray-50/70 p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                            <p className="font-bold text-gray-800">{c.name}</p>
                            <p className="text-sm text-gray-600">{c.students} Students</p>
                        </div>
                        <div className="text-sm font-semibold text-blue-600">Avg. Score: {c.avgScore}%</div>
                    </div>
                ))}
            </div>
        );
      case 'absenceLog': // UPDATED: Changed from 'performance' to 'absenceLog'
          return(
              <div className="space-y-4">
                 <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex justify-between items-center">
                    <span className="font-bold">Total Absences This Year:</span>
                    <span className="text-2xl font-extrabold">{stats.absencesYTD}</span>
                 </div>
                 <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {absenceLog.map((log, index) =>(
                        <div key={index} className="bg-gray-50/70 p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                            <p className="font-semibold text-gray-700">{log.reason}</p>
                            <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                    ))}
                 </div>
              </div>
          );
      default:
        return null;
    }
  };

  return (
    <Layout>
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <img src={avatar} alt={name} className="w-28 h-28 rounded-full border-4 border-blue-200" />
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                    <p className="text-md text-blue-600 font-semibold">{subject}</p>
                    <div className="mt-3 flex items-center justify-center sm:justify-start gap-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Send Message</button>
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Info & Stats */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Personal Information</h3>
                    <div className="space-y-4">
                        <InfoRow icon={<Mail size={16}/>} label="Email" value={email} />
                        <InfoRow icon={<Phone size={16}/>} label="Phone" value={phone} />
                        <InfoRow icon={<MapPin size={16}/>} label="Address" value={address} />
                        <InfoRow icon={<Award size={16}/>} label="Qualifications" value={qualifications} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={<Briefcase size={20} className="text-indigo-600"/>} label="Experience" value={`${stats.yearsOfService} Yrs`} color="bg-indigo-100" />
                    <StatCard icon={<BookOpen size={20} className="text-green-600"/>} label="Classes" value={stats.classesAssigned} color="bg-green-100" />
                </div>
            </div>

            {/* Right Column: Tabs */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                <div className="border-b border-gray-200 mb-4">
                    <nav className="flex gap-4 -mb-px">
                        <button onClick={() => setActiveTab('schedule')} className={`py-2 px-1 font-semibold border-b-2 ${activeTab === 'schedule' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}>Schedule</button>
                        <button onClick={() => setActiveTab('classes')} className={`py-2 px-1 font-semibold border-b-2 ${activeTab === 'classes' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}>Assigned Classes</button>
                        <button onClick={() => setActiveTab('absenceLog')} className={`py-2 px-1 font-semibold border-b-2 ${activeTab === 'absenceLog' ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}>Absence Log</button>
                    </nav>
                </div>
                <div>
                    {renderTabContent()}
                </div>
            </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
