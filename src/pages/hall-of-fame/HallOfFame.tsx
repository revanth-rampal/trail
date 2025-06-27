import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  student: {
    id: string;
    name: string;
    class: string;
  };
  title: string;
  description: string;
  category: 'academics' | 'sports' | 'arts' | 'leadership';
  date: string;
  image?: string;
}

const HallOfFame: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academics' | 'sports' | 'arts' | 'leadership'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Mock data - replace with actual data from your backend
  const achievements: Achievement[] = [
    {
      id: '1',
      student: {
        id: '1',
        name: 'John Smith',
        class: 'Class 10A'
      },
      title: 'National Science Olympiad Winner',
      description: 'Secured first place in the National Science Olympiad, demonstrating exceptional knowledge in Physics and Chemistry.',
      category: 'academics',
      date: '2024-03-15',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      student: {
        id: '2',
        name: 'Emma Davis',
        class: 'Class 9B'
      },
      title: 'State Level Basketball Championship',
      description: 'Led the school basketball team to victory in the State Level Championship, scoring the winning points.',
      category: 'sports',
      date: '2024-03-10',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      student: {
        id: '3',
        name: 'Michael Wilson',
        class: 'Class 11C'
      },
      title: 'Art Exhibition Recognition',
      description: 'Received special recognition for outstanding artwork displayed in the Annual School Art Exhibition.',
      category: 'arts',
      date: '2024-03-05',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '4',
      student: {
        id: '4',
        name: 'Sophie Brown',
        class: 'Class 12A'
      },
      title: 'Student Council Leadership Award',
      description: 'Recognized for exceptional leadership as the Student Council President, organizing successful school events.',
      category: 'leadership',
      date: '2024-03-01',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Hall of Fame</h1>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex space-x-1.5 min-w-max">
            {['all', 'academics', 'sports', 'arts', 'leadership'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center space-x-1.5 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {category === 'all' ? achievements.length : achievements.filter(a => a.category === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="p-4 space-y-4">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            onClick={() => setSelectedAchievement(achievement)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={achievement.image}
                  alt={achievement.student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{achievement.student.name}</p>
                    <p className="text-xs text-gray-500">{achievement.student.class}</p>
                  </div>
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mt-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-2">{formatDate(achievement.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Achievement Details</h2>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.student.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{selectedAchievement.student.name}</p>
                  <p className="text-sm text-gray-500">{selectedAchievement.student.class}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedAchievement.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{selectedAchievement.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="capitalize">{selectedAchievement.category}</span>
                  <span>{formatDate(selectedAchievement.date)}</span>
                </div>

                {selectedAchievement.image && (
                  <img
                    src={selectedAchievement.image}
                    alt={selectedAchievement.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallOfFame; 