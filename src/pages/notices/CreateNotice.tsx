import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Paperclip } from 'lucide-react';

interface TargetAudience {
  id: string;
  name: string;
  type: 'all' | 'class' | 'role';
}

const CreateNotice: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [attachment, setAttachment] = useState<File | null>(null);

  const targetAudiences: TargetAudience[] = [
    { id: 'all-parents', name: 'All Parents', type: 'all' },
    { id: 'all-teachers', name: 'All Teachers', type: 'all' },
    { id: 'class-7a', name: 'Class 7A', type: 'class' },
    { id: 'class-8b', name: 'Class 8B', type: 'class' },
    { id: 'class-9c', name: 'Class 9C', type: 'class' },
    { id: 'teachers', name: 'Teachers', type: 'role' },
    { id: 'parents', name: 'Parents', type: 'role' },
  ];

  const handleAudienceToggle = (audienceId: string) => {
    setSelectedAudiences(prev => 
      prev.includes(audienceId)
        ? prev.filter(id => id !== audienceId)
        : [...prev, audienceId]
    );
  };

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAttachment(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement notice submission logic
    console.log({
      title,
      content,
      targetAudiences: selectedAudiences,
      attachment
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back</span>
        </button>
        <h1 className="text-lg font-semibold">New Notice</h1>
        <div className="w-12" /> {/* Spacer for alignment */}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Notice Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notice Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter notice title"
            required
          />
        </div>

        {/* Notice Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notice Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={6}
            placeholder="Enter notice content"
            required
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label>
          <div 
            onClick={() => setShowAudiencePicker(true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
          >
            {selectedAudiences.length > 0 ? (
              <p className="text-gray-900">
                {selectedAudiences.length} audience{selectedAudiences.length !== 1 ? 's' : ''} selected
              </p>
            ) : (
              <p className="text-gray-500">Select target audience</p>
            )}
          </div>
        </div>

        {/* Add Attachment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add Attachment
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:bg-gray-50">
              <div className="flex items-center justify-center space-x-2">
                <Paperclip className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">
                  {attachment ? attachment.name : 'Choose file'}
                </span>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleAttachmentChange}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="fixed bottom-0 left-0 right-0 w-full py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Publish Notice
        </button>
      </form>

      {/* Audience Picker Modal */}
      {showAudiencePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Target Audience</h2>
              <button 
                onClick={() => setShowAudiencePicker(false)}
                className="text-gray-500 p-2"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {targetAudiences.map((audience) => (
                <div
                  key={audience.id}
                  className="p-4 border-b active:bg-gray-50"
                  onClick={() => handleAudienceToggle(audience.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAudiences.includes(audience.id)}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-gray-900">{audience.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAudiencePicker(false)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNotice; 