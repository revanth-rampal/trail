import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, User, Calendar, List } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../common/Layout';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

const StudentTimetable: React.FC = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const [selectedDay, setSelectedDay] = useState<string>('Mon');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'full'>('daily');
  const [currentStudentId, setCurrentStudentId] = useState<string>('');

  useEffect(() => {
    if (studentId) {
      setCurrentStudentId(studentId);
      // TODO: Fetch student's timetable data using studentId
    }
  }, [studentId]);

  // Mock data - Replace with actual API call
  const weeklySchedule: DaySchedule[] = [
    {
      day: 'Mon',
      slots: [
        { id: '1', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
        { id: '2', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Science', teacher: 'Mrs. Johnson', room: 'Lab 2' },
        { id: '3', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'English', teacher: 'Ms. Davis', room: 'Room 203' },
        { id: '4', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'History', teacher: 'Mr. Brown', room: 'Room 105' },
      ]
    },
    {
      day: 'Tue',
      slots: [
        { id: '5', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Physics', teacher: 'Dr. Wilson', room: 'Lab 1' },
        { id: '6', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Chemistry', teacher: 'Mrs. Taylor', room: 'Lab 3' },
        { id: '7', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'Biology', teacher: 'Mr. Anderson', room: 'Lab 2' },
        { id: '8', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Computer Science', teacher: 'Ms. White', room: 'Room 301' },
      ]
    },
    {
      day: 'Wed',
      slots: [
        { id: '9', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
        { id: '10', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Science', teacher: 'Mrs. Johnson', room: 'Lab 2' },
        { id: '11', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'English', teacher: 'Ms. Davis', room: 'Room 203' },
        { id: '12', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'History', teacher: 'Mr. Brown', room: 'Room 105' },
      ]
    },
    {
      day: 'Thu',
      slots: [
        { id: '13', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Physics', teacher: 'Dr. Wilson', room: 'Lab 1' },
        { id: '14', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Chemistry', teacher: 'Mrs. Taylor', room: 'Lab 3' },
        { id: '15', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'Biology', teacher: 'Mr. Anderson', room: 'Lab 2' },
        { id: '16', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Computer Science', teacher: 'Ms. White', room: 'Room 301' },
      ]
    },
    {
      day: 'Fri',
      slots: [
        { id: '17', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
        { id: '18', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Science', teacher: 'Mrs. Johnson', room: 'Lab 2' },
        { id: '19', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'English', teacher: 'Ms. Davis', room: 'Room 203' },
        { id: '20', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'History', teacher: 'Mr. Brown', room: 'Room 105' },
      ]
    },
    {
      day: 'Sat',
      slots: [
        { id: '21', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Art', teacher: 'Ms. Parker', room: 'Art Studio' },
        { id: '22', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Music', teacher: 'Mr. Lee', room: 'Music Room' },
        { id: '23', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'Drama', teacher: 'Mrs. Wilson', room: 'Theater' },
        { id: '24', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Sports', teacher: 'Coach Davis', room: 'Field' },
      ]
    },
    {
      day: 'Sun',
      slots: [
        { id: '25', startTime: '9:00 AM', endTime: '9:45 AM', subject: 'Library', teacher: 'Ms. Brown', room: 'Library' },
        { id: '26', startTime: '10:00 AM', endTime: '10:45 AM', subject: 'Study Hall', teacher: 'Mr. Clark', room: 'Room 201' },
        { id: '27', startTime: '11:00 AM', endTime: '11:45 AM', subject: 'Computer Lab', teacher: 'Ms. White', room: 'Lab 4' },
        { id: '28', startTime: '12:00 PM', endTime: '12:45 PM', subject: 'Study Hall', teacher: 'Mr. Clark', room: 'Room 201' },
      ]
    },
  ];

  const getCurrentDay = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[new Date().getDay()];
  };

  const isCurrentDay = (day: string) => day === getCurrentDay();

  const renderDailyView = () => (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {weeklySchedule
        .find(day => day.day === selectedDay)
        ?.slots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center space-x-2 text-blue-600 mb-3">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">
                {slot.startTime} - {slot.endTime}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {slot.subject}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span>{slot.teacher}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{slot.room}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

 

  const renderFullSchedule = () => (
    <div className="p-4 overflow-x-auto">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden min-w-[1000px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              {weeklySchedule.map((day) => (
                <th key={day.day} scope="col" className={`px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  isCurrentDay(day.day) ? 'bg-blue-50' : ''
                }`}>
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weeklySchedule[0].slots.map((_, slotIndex) => (
              <tr key={slotIndex} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {weeklySchedule[0].slots[slotIndex].startTime}
                </td>
                {weeklySchedule.map((day) => {
                  const slot = day.slots[slotIndex];
                  return (
                    <td key={day.day} className={`px-6 py-4 text-sm ${
                      isCurrentDay(day.day) ? 'bg-blue-50' : ''
                    }`}>
                      <div className="font-medium text-gray-900">{slot.subject}</div>
                      <div className="text-gray-500">{slot.teacher}</div>
                      <div className="text-xs text-gray-400">{slot.room}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">My Timetable</h1>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setViewMode('daily')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'daily' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Daily View"
                >
                  <Calendar className="h-5 w-5" />
                </button>
           
                <button
                  onClick={() => setViewMode('full')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'full' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Full Schedule"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Day Selector - Only show in daily view */}
          {viewMode === 'daily' && (
            <div className="px-4 pb-4 overflow-x-auto">
              <div className="flex space-x-2 min-w-max max-w-7xl mx-auto">
                {weeklySchedule.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      selectedDay === day.day
                        ? 'bg-blue-600 text-white'
                        : isCurrentDay(day.day)
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Schedule Content */}
        <div className="max-w-7xl mx-auto">
          {viewMode === 'daily' && renderDailyView()}
          {viewMode === 'full' && renderFullSchedule()}
        </div>
      </div>
    </Layout>
  );
};

export default StudentTimetable; 