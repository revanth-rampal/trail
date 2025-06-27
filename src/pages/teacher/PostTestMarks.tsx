import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const PostTestMarks: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showClassPicker, setShowClassPicker] = useState(false);
  const [showTestPicker, setShowTestPicker] = useState(false);
  const [showStudentPicker, setShowStudentPicker] = useState(false);
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects: Subject[] = [
    { id: '1', name: 'Mathematics' },
    { id: '2', name: 'Science' },
    { id: '3', name: 'English' },
    { id: '4', name: 'History' },
    { id: '5', name: 'Geography' },
  ];

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Doe', rollNumber: '001', marks: {} },
    { id: '2', name: 'Jane Smith', rollNumber: '002', marks: {} },
    { id: '3', name: 'Mike Johnson', rollNumber: '003', marks: {} },
    { id: '4', name: 'Sarah Williams', rollNumber: '004', marks: {} },
    { id: '5', name: 'David Brown', rollNumber: '005', marks: {} },
  ]);

  const classes: Class[] = [
    { id: '1', name: 'Class 10A' },
    { id: '2', name: 'Class 10B' },
    { id: '3', name: 'Class 11A' },
    { id: '4', name: 'Class 11B' },
  ];

  const tests: Test[] = [
    { id: '1', name: 'Unit Test 1', maxMarks: 50 },
    { id: '2', name: 'Mid Term', maxMarks: 100 },
    { id: '3', name: 'Final Exam', maxMarks: 100 },
    { id: '4', name: 'Quiz 1', maxMarks: 25 },
  ];

  const handleMarksChange = (subjectId: string, marks: string) => {
    if (!selectedStudent) return;
    
    setStudents(students.map(student => 
      student.id === selectedStudent.id 
        ? { 
            ...student, 
            marks: {
              ...student.marks,
              [subjectId]: marks ? parseInt(marks) : undefined
            }
          }
        : student
    ));
  };

  const handleSubjectSelect = (subject: Subject) => {
    if (selectedSubjects.some(s => s.id === subject.id)) {
      setSelectedSubjects(selectedSubjects.filter(s => s.id !== subject.id));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedTest || !selectedStudent || selectedSubjects.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate marks
    const hasInvalidMarks = selectedSubjects.some(subject => {
      const marks = selectedStudent.marks[subject.id];
      return marks === undefined || marks < 0 || marks > selectedTest.maxMarks;
    });

    if (hasInvalidMarks) {
      alert('Please enter valid marks for all subjects');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful submission
      console.log('Submitting marks:', {
        class: selectedClass,
        test: selectedTest,
        student: selectedStudent,
        subjects: selectedSubjects,
        marks: selectedStudent.marks
      });

      // Show success message
      alert('Marks submitted successfully!');
      
      // Navigate back to view marks page
      navigate('/teacher/view-test-marks');
    } catch (error) {
      console.error('Error submitting marks:', error);
      alert('Failed to submit marks. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 mr-4 text-sm"
        >
          &lt; Back
        </button>
        <h1 className="text-lg font-semibold">Post Test Marks</h1>
      </div>

      {/* Dropdowns */}
      <div className="p-4 space-y-4">
        <div 
          className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50"
          onClick={() => setShowClassPicker(true)}
        >
          <p className="text-sm text-gray-500">Select Class</p>
          <p className="font-medium">{selectedClass?.name || 'Choose a class'}</p>
        </div>

        <div 
          className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50"
          onClick={() => setShowTestPicker(true)}
        >
          <p className="text-sm text-gray-500">Select Test</p>
          <p className="font-medium">{selectedTest?.name || 'Choose a test'}</p>
        </div>

        <div 
          className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50"
          onClick={() => setShowStudentPicker(true)}
        >
          <p className="text-sm text-gray-500">Select Student</p>
          <p className="font-medium">
            {selectedStudent ? `${selectedStudent.name} (${selectedStudent.rollNumber})` : 'Choose a student'}
          </p>
        </div>

        <div 
          className="bg-white p-4 rounded-lg shadow-sm active:bg-gray-50"
          onClick={() => setShowSubjectPicker(true)}
        >
          <p className="text-sm text-gray-500">Select Subjects</p>
          <p className="font-medium">
            {selectedSubjects.length > 0 
              ? `${selectedSubjects.length} subjects selected` 
              : 'Choose subjects'}
          </p>
        </div>
      </div>

      {/* Marks Entry Section */}
      {selectedStudent && selectedSubjects.length > 0 && (
        <div className="p-4 space-y-3 pb-24">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Enter Marks for {selectedStudent.name}</h2>
              <p className="text-sm text-gray-500">Roll No: {selectedStudent.rollNumber}</p>
            </div>
            <div className="space-y-4">
              {selectedSubjects.map((subject) => (
                <div key={subject.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={selectedStudent.marks[subject.id] || ''}
                      onChange={(e) => handleMarksChange(subject.id, e.target.value)}
                      className="w-20 p-2 border rounded text-center text-sm"
                      placeholder="Marks"
                      min="0"
                      max={selectedTest?.maxMarks}
                    />
                    {selectedTest && (
                      <span className="text-xs text-gray-500">
                        /{selectedTest.maxMarks}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-medium text-sm ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Marks'}
        </button>
      </div>

      {/* Class Picker Modal */}
      {showClassPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Class</h2>
              <button 
                onClick={() => setShowClassPicker(false)}
                className="text-gray-500 p-2"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 border-b active:bg-gray-50"
                  onClick={() => {
                    setSelectedClass(cls);
                    setShowClassPicker(false);
                  }}
                >
                  {cls.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Test Picker Modal */}
      {showTestPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Test</h2>
              <button 
                onClick={() => setShowTestPicker(false)}
                className="text-gray-500 p-2"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="p-4 border-b active:bg-gray-50"
                  onClick={() => {
                    setSelectedTest(test);
                    setShowTestPicker(false);
                  }}
                >
                  {test.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Student Picker Modal */}
      {showStudentPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Student</h2>
              <button 
                onClick={() => setShowStudentPicker(false)}
                className="text-gray-500 p-2"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 border-b active:bg-gray-50"
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowStudentPicker(false);
                  }}
                >
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">Roll No: {student.rollNumber}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subject Picker Modal */}
      {showSubjectPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Subjects</h2>
              <button 
                onClick={() => setShowSubjectPicker(false)}
                className="text-gray-500 p-2"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="p-4 border-b active:bg-gray-50 flex items-center"
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <input
                    type="checkbox"
                    checked={selectedSubjects.some(s => s.id === subject.id)}
                    onChange={() => {}}
                    className="mr-3"
                  />
                  {subject.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostTestMarks; 