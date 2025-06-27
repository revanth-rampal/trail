import React from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import { X,  Calendar, BookOpen, AlertCircle, Clock, ChevronDown } from 'lucide-react';

interface Alert {
  id: string;
  type: 'absence' | 'notice' | 'homework' | 'exam' | 'event';
  message: string;
  date: string;
  isDismissible: boolean;
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface ScheduleItem {
  id: string;
  timeSlot: string;
  subject: string;
  teacher: string;
}

interface Homework {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

interface Assessment {
  id: string;
  subject: string;
  title: string;
  date: string;
  type: 'exam' | 'quiz' | 'project';
  weightage: string;
}

interface StudentProfile {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  profilePicture: string;
  grade: string;
  section: string;
  parentName: string;
  admissionNumber: string;
  bloodGroup: string;
  emergencyContact: string;
  classTeacher: string;
}

const ParentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = React.useState(false);
  
  // Single array of all students
  const students: StudentProfile[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      class: 'Class 5B',
      rollNumber: '2024-001',
      profilePicture: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=random',
      grade: '5th',
      section: 'B',
      parentName: 'John Johnson',
      admissionNumber: 'ADM2024001',
      bloodGroup: 'O+',
      emergencyContact: '+1 234-567-8900',
      classTeacher: 'Mr. Smith'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      class: 'Class 3A',
      rollNumber: '2024-002',
      profilePicture: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
      grade: '3rd',
      section: 'A',
      parentName: 'John Johnson',
      admissionNumber: 'ADM2024002',
      bloodGroup: 'A+',
      emergencyContact: '+1 234-567-8900',
      classTeacher: 'Mr. Smith'
    }
  ];

  const [currentStudent, setCurrentStudent] = React.useState<StudentProfile>(students[0]);

  // Function to handle student switch
  const handleStudentSwitch = (studentId: string) => {
    const selectedStudent = students.find(student => student.id === studentId);
    if (selectedStudent) {
      setCurrentStudent(selectedStudent);
      setIsStudentDropdownOpen(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.student-dropdown')) {
        setIsStudentDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock data for today's homework - should be fetched based on current student
  const todaysHomework: Homework[] = [
    { 
      id: '1', 
      subject: 'Mathematics',
      title: 'Complete Chapter 5 Exercises',
      dueDate: '2024-03-18',
      status: 'pending'
    },
    {
      id: '2',
      subject: 'Science',
      title: 'Lab Report - Experiment 3',
      dueDate: '2024-03-19',
      status: 'pending'
    }
  ];

  // Mock data for assessments - should be fetched based on current student
  const upcomingAssessments: Assessment[] = [
    {
      id: '1',
      subject: 'Science',
      title: 'Mid-term Examination',
      date: '2024-03-25',
      type: 'exam',
      weightage: '30%'
    },
    {
      id: '2',
      subject: 'Mathematics',
      title: 'Chapter 5 Quiz',
      date: '2024-03-22',
      type: 'quiz',
      weightage: '15%'
    }
  ];

  // Mock data for alerts - should be fetched based on current student
  const alerts: Alert[] = [
    { 
      id: '1', 
      type: 'absence',
      message: `Child ${currentStudent.name} was Absent on 2024-03-15`,
      date: '2024-03-15',
      isDismissible: true
    },
    { 
      id: '2', 
      type: 'notice',
      message: 'New Notice: Parent-Teacher Meeting on 2024-03-20',
      date: '2024-03-20',
      isDismissible: false
    },
    { 
      id: '3', 
      type: 'homework',
      message: 'Homework Due: Maths Ch 5 by 2024-03-18',
      date: '2024-03-18',
      isDismissible: true
    },
    {
      id: '4',
      type: 'exam',
      message: 'Science Mid-term Exam on 2024-03-25',
      date: '2024-03-25',
      isDismissible: false
    }
  ];

  // Mock data for upcoming events - should be fetched based on current student
  const upcomingEvents: Event[] = [
    { id: '1', title: 'Annual Sports Day', date: '2024-03-25', type: 'event' },
    { id: '2', title: 'Science Exhibition', date: '2024-03-28', type: 'event' },
    { id: '3', title: 'Parent-Teacher Meeting', date: '2024-03-20', type: 'meeting' }
  ];

  // Mock data for daily schedule - should be fetched based on current student
  const dailySchedule: ScheduleItem[] = [
    { id: '1', timeSlot: '9:00 AM - 9:45 AM', subject: 'Mathematics', teacher: 'Mr. Smith' },
    { id: '2', timeSlot: '10:00 AM - 10:45 AM', subject: 'Science', teacher: 'Mrs. Johnson' },
    { id: '3', timeSlot: '11:00 AM - 11:45 AM', subject: 'English', teacher: 'Ms. Davis' },
  ];

  // Attendance statistics - should be fetched based on current student
  const attendanceStats = {
    present: 18,
    absent: 2,
    total: 20,
    percentage: 90
  };

  return (
    <Layout title="Parent Dashboard">

      <div className="max-w-[100vw] overflow-x-hidden space-y-4 sm:space-y-6">
        {/* Student Profile Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="p-4 space-y-4">
            {/* Top Section - Profile and Switch */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={currentStudent.profilePicture} 
                    alt={currentStudent.name}
                    className="w-14 h-14 rounded-full border-2 border-blue-500"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{currentStudent.name}</h2>
                  <p className="text-xs text-gray-600">{currentStudent.grade} Grade - Section {currentStudent.section}</p>
                </div>
              </div>
              <div className="relative student-dropdown">
                <button 
                  onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  <span>Switch</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isStudentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isStudentDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {students.filter(student => student.id !== currentStudent.id).map((student) => (
                      <button
                        key={student.id}
                        onClick={() => handleStudentSwitch(student.id)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <img 
                          src={student.profilePicture} 
                          alt={student.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-600">{student.grade} Grade - Section {student.section}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Student Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Basic Info Card */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="text-xs font-semibold text-gray-700 mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Roll No</span>
                    <span className="text-xs font-medium text-gray-900">{currentStudent.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Class Teacher</span>
                    <span className="text-xs font-medium text-gray-900">{currentStudent.classTeacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Blood Group</span>
                    <span className="text-xs font-medium text-gray-900">{currentStudent.bloodGroup}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide px-4">
          <div className="flex-shrink-0 w-[280px] bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-green-800">Monthly Attendance</h3>
                <p className="text-lg font-bold text-green-600 mt-1">{attendanceStats.percentage}%</p>
                <p className="text-xs text-green-700 mt-1">{attendanceStats.present} days present</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="flex-shrink-0 w-[280px] bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-amber-800">Pending Homework</h3>
                <p className="text-lg font-bold text-amber-600 mt-1">{todaysHomework.length} Assignments</p>
                <button className="text-xs text-amber-600 hover:underline mt-2">View Details</button>
              </div>
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <div className="flex-shrink-0 w-[280px] bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-800">Upcoming Exams</h3>
                <p className="text-lg font-bold text-blue-600 mt-1">{upcomingAssessments.length} Scheduled</p>
                <button className="text-xs text-blue-600 hover:underline mt-2">View Schedule</button>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mx-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Today's Schedule</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate(`/view_timetable/${currentStudent.id}`)}
                className="text-xs text-blue-600 hover:underline"
              >
                View Full Schedule
              </button>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="space-y-4">
            {dailySchedule.map((item) => (
              <div key={item.id} className="flex items-start space-x-3" onClick={() => navigate(`/view_timetable/${currentStudent.id}`)}>
                <div className="w-20 flex-shrink-0">
                  <p className="text-xs text-gray-600">{item.timeSlot}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{item.subject}</p>
                  <p className="text-xs text-gray-600">{item.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Homework */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mx-4">
          <h2 className="text-base font-bold text-gray-900 mb-4">Today's Homework</h2>
          <div className="space-y-3">
            {todaysHomework.map((homework) => (
              <div key={homework.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{homework.subject}</p>
                  <p className="text-xs text-gray-600 mt-1">{homework.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Due: {homework.dueDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  homework.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  homework.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {homework.status.charAt(0).toUpperCase() + homework.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mx-4">
          <h2 className="text-base font-bold text-gray-900 mb-4">Upcoming Assessments</h2>
          <div className="space-y-3">
            {upcomingAssessments.map((assessment) => (
              <div key={assessment.id} className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{assessment.subject}</p>
                  <p className="text-xs text-gray-600 mt-1">{assessment.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Date: {assessment.date}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {assessment.type.toUpperCase()}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">{assessment.weightage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Alerts */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mx-4">
          <h2 className="text-base font-bold text-gray-900 mb-4">Important Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex items-start justify-between p-3 rounded-lg ${
                  alert.type === 'absence' ? 'bg-red-50' :
                  alert.type === 'notice' ? 'bg-green-50' :
                  alert.type === 'homework' ? 'bg-amber-50' :
                  alert.type === 'exam' ? 'bg-blue-50' :
                  'bg-purple-50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{alert.message}</p>
                  <p className="text-xs text-gray-600">{alert.date}</p>
                </div>
                {alert.isDismissible && (
                  <button className="ml-2 flex-shrink-0 p-1 hover:bg-gray-100 rounded-full">
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-gray-900">Upcoming Events</h2>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-xs text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{event.title}</p>
                  <p className="text-xs text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParentDashboard; 