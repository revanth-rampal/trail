import React, { useState } from 'react';
import { ArrowLeft, Pencil, Trash2, CheckCircle, Calendar, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Homework } from '../../types';
import Layout from '../common/Layout';

interface HomeworkTrackerProps {
  className?: string;
}

interface HomeworkFormData {
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  classId: string;
  attachments: string[];
}

const HomeworkTracker: React.FC<HomeworkTrackerProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'assigned' | 'new'>('assigned');
  const [selectedClass, setSelectedClass] = useState('Class 7A');
  const [homeworkItems, setHomeworkItems] = useState<Homework[]>([
    {
      id: '1',
      title: 'Algebra Practice Problems',
      description: 'Complete exercises 1-10 from Chapter 5. Show all work.',
      dueDate: '2024-03-20',
      subject: 'Mathematics',
      classId: '7A',
      createdAt: '2024-03-15',
      attachments: ['worksheet.pdf'],
      submissions: [
        { studentId: '1', submittedAt: '2024-03-19', status: 'submitted' },
        { studentId: '2', submittedAt: '2024-03-20', status: 'late' }
      ]
    },
    {
      id: '2',
      title: 'Science Project: Solar System',
      description: 'Create a model of the solar system using household materials.',
      dueDate: '2024-03-25',
      subject: 'Science',
      classId: '7A',
      createdAt: '2024-03-16',
      submissions: [
        { studentId: '1', submittedAt: '2024-03-24', status: 'submitted' }
      ]
    }
  ]);

  const [formData, setFormData] = useState<HomeworkFormData>({
    title: '',
    description: '',
    dueDate: '',
    subject: '',
    classId: '',
    attachments: []
  });

  const [editingHomework, setEditingHomework] = useState<Homework | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files.map(file => file.name)]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingHomework) {
      // Update existing homework
      setHomeworkItems(prev => prev.map(hw => 
        hw.id === editingHomework.id 
          ? { ...hw, ...formData, updatedAt: new Date().toISOString() }
          : hw
      ));
    } else {
      // Add new homework
      const newHomework: Homework = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        submissions: []
      };
      setHomeworkItems(prev => [...prev, newHomework]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      subject: '',
      classId: '',
      attachments: []
    });
    setSelectedFiles([]);
    setEditingHomework(null);
    setActiveTab('assigned');
  };

  const handleEdit = (homework: Homework) => {
    setEditingHomework(homework);
    setFormData({
      title: homework.title,
      description: homework.description,
      dueDate: homework.dueDate,
      subject: homework.subject,
      classId: homework.classId,
      attachments: homework.attachments || []
    });
    setActiveTab('new');
  };

  const handleDelete = (homeworkId: string) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      setHomeworkItems(prev => prev.filter(hw => hw.id !== homeworkId));
    }
  };

  const handleMarkComplete = (homeworkId: string) => {
    setHomeworkItems(prev => prev.map(hw => 
      hw.id === homeworkId 
        ? { ...hw, status: 'completed' }
        : hw
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUrgent = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  const renderAssignedTab = () => (
    <div className="space-y-4">
      {homeworkItems.map((homework) => (
        <div
          key={homework.id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{homework.title}</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleEdit(homework)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(homework.id)}
                className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleMarkComplete(homework.id)}
                className="p-2 text-gray-600 hover:text-green-600 rounded-lg hover:bg-green-50"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-2">
            <span className="text-sm text-gray-600">{homework.subject}</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{homework.classId}</span>
          </div>

          <div className={`flex items-center space-x-2 mb-3 ${
            isUrgent(homework.dueDate) ? 'text-red-600' : 'text-gray-600'
          }`}>
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">
              Due: {formatDate(homework.dueDate)}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {homework.description}
          </p>

          {homework.attachments && homework.attachments.length > 0 && (
            <div className="flex items-center space-x-2">
              <Paperclip className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {homework.attachments.length} attachment(s)
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderNewTab = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Homework Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter homework title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Enter homework description"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter subject"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Class
        </label>
        <select
          name="classId"
          value={formData.classId}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select a class</option>
          <option value="7A">Class 7A</option>
          <option value="7B">Class 7B</option>
          <option value="8A">Class 8A</option>
          <option value="8B">Class 8B</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Attachments
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        >
          <div className="flex items-center justify-center space-x-2">
            <Paperclip className="h-4 w-4" />
            <span>Attach File</span>
          </div>
        </label>
        {selectedFiles.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Selected files:</p>
            <ul className="mt-1 space-y-1">
              {selectedFiles.map((file, index) => (
                <li key={index} className="text-sm text-gray-500">{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {editingHomework ? 'Update Homework' : 'Post Homework'}
      </button>
    </form>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            Homework for {selectedClass}
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'assigned'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('assigned')}
          >
            Assigned
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === 'new'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('new')}
          >
            New
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === 'assigned' ? renderAssignedTab() : renderNewTab()}
        </div>
      </div>
    </Layout>
  );
};

export default HomeworkTracker; 