import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search, Download, Check, X, Save, AlertCircle, ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  avatar: string;
  status?: 'present' | 'absent' | 'late' | 'excused';
  note?: string;
}

const AttendanceManager: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('10A');
  const [markingMode, setMarkingMode] = useState<'individual' | 'all-present' | 'absentees-only'>('individual');
  const [selectedAbsentees, setSelectedAbsentees] = useState<Set<string>>(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showNoteInput, setShowNoteInput] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  // Mock student data - expanded to show more students
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      rollNumber: '001',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '2',
      name: 'Emma Davis',
      rollNumber: '002',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '3',
      name: 'Michael Wilson',
      rollNumber: '003',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'absent'
    },
    {
      id: '4',
      name: 'Sophie Brown',
      rollNumber: '004',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'late'
    },
    {
      id: '5',
      name: 'James Miller',
      rollNumber: '005',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '6',
      name: 'Olivia Garcia',
      rollNumber: '006',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '7',
      name: 'William Martinez',
      rollNumber: '007',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '8',
      name: 'Ava Rodriguez',
      rollNumber: '008',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'absent'
    },
    {
      id: '9',
      name: 'Benjamin Lee',
      rollNumber: '009',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '10',
      name: 'Charlotte Taylor',
      rollNumber: '010',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '11',
      name: 'Lucas Anderson',
      rollNumber: '011',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'present'
    },
    {
      id: '12',
      name: 'Mia Thomas',
      rollNumber: '012',
      class: '10',
      section: 'A',
      avatar: 'https://images.pexels.com/photos/1181717/pexels-photo-1181717.jpeg?auto=compress&cs=tinysrgb&w=100',
      status: 'excused'
    }
  ]);

  const updateAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'present' as const })));
    setConfirmationMessage(`All ${students.length} students marked as present`);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleAbsenteeSelection = (studentId: string) => {
    const newSelected = new Set(selectedAbsentees);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedAbsentees(newSelected);
  };

  const handleSaveAbsenteeMarking = () => {
    setStudents(prev => prev.map(student => ({
      ...student,
      status: selectedAbsentees.has(student.id) ? 'absent' as const : 'present' as const
    })));
    
    const absentCount = selectedAbsentees.size;
    const presentCount = students.length - absentCount;
    setConfirmationMessage(`Attendance saved: ${presentCount} present, ${absentCount} absent`);
    setShowConfirmation(true);
    setMarkingMode('individual');
    setSelectedAbsentees(new Set());
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-50 border-green-200';
      case 'absent': return 'text-red-600 bg-red-50 border-red-200';
      case 'late': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'excused': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'absent': return <XCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      case 'excused': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const attendanceStats = {
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    excused: students.filter(s => s.status === 'excused').length,
    total: students.length
  };

  const handleAddNote = (studentId: string) => {
    setShowNoteInput(studentId);
  };

  const handleSaveNote = (studentId: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, note: noteText } : student
    ));
    setShowNoteInput(null);
    setNoteText('');
  };

  const handleSwipe = (studentId: string) => {
    handleAddNote(studentId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {selectedClass} - {formatDate(selectedDate)}
          </h1>
          <button
            onClick={() => {
              const datePicker = document.getElementById('date-picker') as HTMLInputElement;
              if (datePicker) {
                datePicker.showPicker();
              }
            }}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Calendar className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Hidden Date Input for Mobile */}
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="hidden"
        />

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-pulse">
            <CheckCircle className="h-5 w-5" />
            <span>{confirmationMessage}</span>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.role === 'teacher' ? 'Mark Attendance' : 'Attendance Management'}
            </h1>
            <p className="text-gray-600">Track and manage student attendance efficiently</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Attendance Marking</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleMarkAllPresent}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Present
            </button>
            <button
              onClick={() => setMarkingMode(markingMode === 'absentees-only' ? 'individual' : 'absentees-only')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                markingMode === 'absentees-only'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
              }`}
            >
              <X className="h-4 w-4 mr-2" />
              {markingMode === 'absentees-only' ? 'Cancel Absentee Mode' : 'Mark Absentees Only'}
            </button>
            {markingMode === 'absentees-only' && (
              <button
                onClick={handleSaveAbsenteeMarking}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Attendance ({selectedAbsentees.size} absent)
              </button>
            )}
          </div>
          {markingMode === 'absentees-only' && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">
                  <strong>Absentee Mode:</strong> Select students who are absent. All others will be marked as present when you save.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Student List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="10A">Class 10-A</option>
                  <option value="10B">Class 10-B</option>
                  <option value="9A">Class 9-A</option>
                  <option value="9B">Class 9-B</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Student List Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Students ({filteredStudents.length})
              </h3>
              <div className="text-sm text-gray-600">
                {markingMode === 'absentees-only' ? 'Select absent students' : 'Individual marking'}
              </div>
            </div>

            {/* Student List */}
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`relative flex items-center justify-between p-4 rounded-lg border transition-all ${
                    markingMode === 'absentees-only'
                      ? selectedAbsentees.has(student.id)
                        ? 'bg-red-50 border-red-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    const startX = touch.clientX;
                    const handleTouchEnd = (e: TouchEvent) => {
                      const touch = e.changedTouches[0];
                      const endX = touch.clientX;
                      if (endX - startX > 100) { // Swipe right threshold
                        handleSwipe(student.id);
                      }
                    };
                    document.addEventListener('touchend', handleTouchEnd, { once: true });
                  }}
                >
                  <div className="flex items-center space-x-4">
                    {markingMode === 'absentees-only' && (
                      <input
                        type="checkbox"
                        checked={selectedAbsentees.has(student.id)}
                        onChange={() => handleAbsenteeSelection(student.id)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                    )}
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
                      {student.note && (
                        <p className="text-xs text-gray-500 mt-1">Note: {student.note}</p>
                      )}
                    </div>
                  </div>

                  {showNoteInput === student.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add note..."
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => handleSaveNote(student.id)}
                        className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {markingMode === 'individual' ? (
                        ['present', 'absent', 'late', 'excused'].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateAttendance(student.id, status as 'present' | 'absent' | 'late' | 'excused')}
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                              student.status === status
                                ? getStatusColor(status)
                                : 'text-gray-600 bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-1">
                              {student.status === status && getStatusIcon(status)}
                              <span className="capitalize">{status}</span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                          selectedAbsentees.has(student.id)
                            ? 'text-red-600 bg-red-50 border-red-200'
                            : 'text-green-600 bg-green-50 border-green-200'
                        }`}>
                          <div className="flex items-center space-x-1">
                            {selectedAbsentees.has(student.id) ? (
                              <>
                                <XCircle className="h-4 w-4" />
                                <span>Will be Absent</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                <span>Will be Present</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Students</span>
                <span className="font-medium text-gray-900">{attendanceStats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600">Present</span>
                <span className="font-medium text-green-600">{attendanceStats.present}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Absent</span>
                <span className="font-medium text-red-600">{attendanceStats.absent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-yellow-600">Late</span>
                <span className="font-medium text-yellow-600">{attendanceStats.late}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600">Excused</span>
                <span className="font-medium text-blue-600">{attendanceStats.excused}</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Attendance Rate</span>
                  <span className="font-bold text-lg text-green-600">
                    {attendanceStats.total > 0 ? ((attendanceStats.present / attendanceStats.total) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {markingMode === 'individual' && (
              <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Save Attendance
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceManager;