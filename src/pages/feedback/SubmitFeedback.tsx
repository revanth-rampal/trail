import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import Layout from '../common/Layout';

interface Student {
  id: string;
  name: string;
}

const SubmitFeedback: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'complaint' | 'achievement'>('complaint');
  const [complaintType, setComplaintType] = useState<'student' | 'teacher' | 'other'>('student');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showStudentPicker, setShowStudentPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock students data
  const students: Student[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
  ];

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachment(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Log the submitted data
      console.log({
        type: activeTab,
        complaintType,
        selectedStudent,
        subject,
        details,
        achievementTitle,
        achievementDescription,
        attachment
      });

      // Show success message and redirect
      alert('Feedback submitted successfully!');
      navigate('/feedback');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Submit Feedback</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'complaint'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('complaint')}
          >
            Complaint
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === 'achievement'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('achievement')}
          >
            Achievement
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'complaint' ? (
            <>
              {/* Complaint Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regarding
                </label>
                <div className="flex space-x-4">
                  {(['student', 'teacher', 'other'] as const).map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        checked={complaintType === type}
                        onChange={() => setComplaintType(type)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Student Selection (if complaint type is student) */}
              {complaintType === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student
                  </label>
                  <div
                    onClick={() => setShowStudentPicker(true)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
                  >
                    {selectedStudent ? (
                      <p className="text-gray-900">{selectedStudent.name}</p>
                    ) : (
                      <p className="text-gray-500">Select a student</p>
                    )}
                  </div>
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject"
                  required
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Details
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter details"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Student Selection for Achievement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Student
                </label>
                <div
                  onClick={() => setShowStudentPicker(true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
                >
                  {selectedStudent ? (
                    <p className="text-gray-900">{selectedStudent.name}</p>
                  ) : (
                    <p className="text-gray-500">Select a student</p>
                  )}
                </div>
              </div>

              {/* Achievement Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Title
                </label>
                <input
                  type="text"
                  value={achievementTitle}
                  onChange={(e) => setAchievementTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter achievement title"
                  required
                />
              </div>

              {/* Achievement Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={achievementDescription}
                  onChange={(e) => setAchievementDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter achievement description"
                  required
                />
              </div>

              {/* Upload Photo/Certificate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo/Certificate
                </label>
                <label className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">
                      {attachment ? attachment.name : 'Choose file'}
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAttachmentChange}
                    accept="image/*,.pdf"
                  />
                </label>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`fixed bottom-0 left-0 right-0 w-full py-3 font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? 'Submitting...' : `Submit ${activeTab === 'complaint' ? 'Complaint' : 'Achievement'}`}
          </button>
        </form>

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
                    {student.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SubmitFeedback; 