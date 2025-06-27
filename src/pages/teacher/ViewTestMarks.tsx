import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, ArrowUpDown, Plus, X } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  marks: {
    [subjectId: string]: number | undefined;
  };
}

interface Class {
  id: string;
  name: string;
}

interface Test {
  id: string;
  name: string;
  maxMarks: number;
}

interface TestMark {
  rollNo: string;
  studentName: string;
  marks: {
    [subject: string]: number;
  };
  totalMarks: number;
}

interface TestDetails {
  testName: string;
  class: string;
  maxMarks: number;
  dateConducted: string;
  subjects: string[];
}

const ViewTestMarks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedTestType, setSelectedTestType] = useState<string>('');
  const [selectedTestName, setSelectedTestName] = useState<Test | null>(null);
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [showTestTypePicker, setShowTestTypePicker] = useState(false);
  const [showTestNamePicker, setShowTestNamePicker] = useState(false);
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const [marks, setMarks] = useState<TestMark[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Mock data - Replace with actual API calls
  const classes: Class[] = [
    { id: '1', name: 'Class 10A' },
    { id: '2', name: 'Class 10B' },
    { id: '3', name: 'Class 11A' },
    { id: '4', name: 'Class 11B' },
  ];

  const testTypes = ['Unit Test', 'Mid-Term', 'Final Exam'];
  const tests: Test[] = [
    { id: '1', name: 'Unit Test 1', maxMarks: 50 },
    { id: '2', name: 'Mid Term', maxMarks: 100 },
    { id: '3', name: 'Final Exam', maxMarks: 100 },
    { id: '4', name: 'Quiz 1', maxMarks: 25 },
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting to sheets...');
  };

  const handleAddMarks = () => {
    navigate('/post_marks');
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedMarks = [...marks].sort((a, b) => {
      if (key === 'studentName') {
        return direction === 'asc'
          ? a.studentName.localeCompare(b.studentName)
          : b.studentName.localeCompare(a.studentName);
      }
      if (key === 'totalMarks') {
        return direction === 'asc'
          ? a.totalMarks - b.totalMarks
          : b.totalMarks - a.totalMarks;
      }
      return 0;
    });

    setMarks(sortedMarks);
  };

  // Mock data loading - Replace with actual API calls
  useEffect(() => {
    if (selectedClass && selectedTestType && selectedTestName) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTestDetails({
          testName: selectedTestName.name,
          class: selectedClass.name,
          maxMarks: selectedTestName.maxMarks,
          dateConducted: '2025-06-10',
          subjects: ['Mathematics', 'Science', 'Social Studies', 'English'],
        });
        setMarks([
          {
            rollNo: '01',
            studentName: 'Alice Johnson',
            marks: {
              Mathematics: 45,
              Science: 40,
              'Social Studies': 38,
              English: 42,
            },
            totalMarks: 165,
          },
          // Add more mock data as needed
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [selectedClass, selectedTestType, selectedTestName]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="text-lg font-semibold">View Test Marks</h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={handleAddMarks}
              className="text-blue-600 p-2"
              title="Add Marks"
            >
              <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={handleExport}
              className="text-blue-600 p-2"
              title="Export to Sheets"
            >
              <Download className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Selection Dropdowns */}
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <button
          onClick={() => setShowClassPicker(true)}
          className="w-full p-3 bg-white rounded-lg border border-gray-200 text-left text-sm sm:text-base"
        >
          {selectedClass?.name || 'Select Class'}
        </button>
        <button
          onClick={() => setShowTestTypePicker(true)}
          className="w-full p-3 bg-white rounded-lg border border-gray-200 text-left text-sm sm:text-base"
        >
          {selectedTestType || 'Select Test Type'}
        </button>
        <button
          onClick={() => setShowTestNamePicker(true)}
          className="w-full p-3 bg-white rounded-lg border border-gray-200 text-left text-sm sm:text-base"
        >
          {selectedTestName?.name || 'Select Test Name'}
        </button>
      </div>

      {/* Test Details */}
      {testDetails && (
        <div className="px-3 sm:px-4 py-3 bg-white shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold">{testDetails.testName}</h2>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
            <div>Class: {testDetails.class}</div>
            <div>Max Marks: {testDetails.maxMarks}</div>
            <div>Date: {testDetails.dateConducted}</div>
          </div>
        </div>
      )}

      {/* Marks Table - Mobile Responsive */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : marks.length > 0 ? (
        <div className="overflow-x-auto px-3 sm:px-4 py-2">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500">
                      Roll No
                    </th>
                    <th
                      scope="col"
                      className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort('studentName')}
                    >
                      <div className="flex items-center">
                        Student Name
                        <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                      </div>
                    </th>
                    {testDetails?.subjects.map((subject) => (
                      <th
                        key={subject}
                        className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500"
                      >
                        {subject}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort('totalMarks')}
                    >
                      <div className="flex items-center">
                        Total
                        <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {marks.map((mark, index) => (
                    <tr
                      key={mark.rollNo}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{mark.rollNo}</td>
                      <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">{mark.studentName}</td>
                      {testDetails?.subjects.map((subject) => (
                        <td key={subject} className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
                          {mark.marks[subject]}
                        </td>
                      ))}
                      <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap font-medium">{mark.totalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 text-gray-500 text-sm sm:text-base px-4 text-center">
          {selectedClass && selectedTestType && selectedTestName
            ? 'No marks have been posted for this test yet'
            : 'Please select a Class, Test Type, and Test Name to view marks'}
        </div>
      )}

      {/* Full-screen Pickers - Mobile Optimized */}
      {(showClassPicker || showTestTypePicker || showTestNamePicker) && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {showClassPicker ? 'Select Class' : showTestTypePicker ? 'Select Test Type' : 'Select Test Name'}
            </h2>
            <button
              onClick={() => {
                setShowClassPicker(false);
                setShowTestTypePicker(false);
                setShowTestNamePicker(false);
              }}
              className="p-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
            {showClassPicker && classes.map((cls) => (
              <button
                key={cls.id}
                onClick={() => {
                  setSelectedClass(cls);
                  setShowClassPicker(false);
                }}
                className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
              >
                {cls.name}
              </button>
            ))}
            {showTestTypePicker && testTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedTestType(type);
                  setShowTestTypePicker(false);
                }}
                className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
              >
                {type}
              </button>
            ))}
            {showTestNamePicker && tests.map((test) => (
              <button
                key={test.id}
                onClick={() => {
                  setSelectedTestName(test);
                  setShowTestNamePicker(false);
                }}
                className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
              >
                {test.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTestMarks; 