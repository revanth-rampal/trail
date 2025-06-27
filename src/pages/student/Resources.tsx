import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  FileText, 
  Play, 
  Link as LinkIcon,
  BookOpen,
  X
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  type: 'pdf' | 'video' | 'link' | 'ebook';
  description: string;
  url: string;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    gradeLevel: 'Grade 8',
    type: 'pdf',
    description: 'Comprehensive guide to basic algebraic concepts and problem-solving techniques.',
    url: '/resources/algebra-intro.pdf'
  },
  {
    id: '2',
    title: 'Photosynthesis Explained',
    subject: 'Science',
    gradeLevel: 'Grade 7',
    type: 'video',
    description: 'Animated video explaining the process of photosynthesis in plants.',
    url: '/resources/photosynthesis.mp4'
  },
  {
    id: '3',
    title: 'Interactive Periodic Table',
    subject: 'Chemistry',
    gradeLevel: 'Grade 9',
    type: 'link',
    description: 'Interactive periodic table with detailed information about each element.',
    url: 'https://example.com/periodic-table'
  }
];

const filterOptions = ['All', 'Math', 'Science', 'Videos', 'eBooks', 'PDFs', 'Links'];

const Resources: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [resources] = useState<Resource[]>(mockResources);

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'video':
        return <Play className="h-6 w-6 text-blue-500" />;
      case 'link':
        return <LinkIcon className="h-6 w-6 text-green-500" />;
      case 'ebook':
        return <BookOpen className="h-6 w-6 text-purple-500" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || 
                         resource.subject.toLowerCase().includes(activeFilter.toLowerCase()) ||
                         resource.type.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="flex items-center px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-2">Learning Resources</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${activeFilter === filter 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="p-4 space-y-4">
        {filteredResources.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white rounded-lg shadow-sm p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{resource.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">{resource.subject}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{resource.gradeLevel}</span>
                </div>
              </div>
              {getResourceIcon(resource.type)}
            </div>
            <p className="text-sm text-gray-600">{resource.description}</p>
            <button
              onClick={() => window.open(resource.url, '_blank')}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              View Resource
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources; 