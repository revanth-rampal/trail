import React, { useState } from 'react';
import { Trophy, Star, Award } from 'lucide-react';

interface Achievement {
  id: string;
  student: {
    id: string;
    name: string;
  };
  title: string;
  description: string;
  date: string;
  attachment?: {
    name: string;
    url: string;
    type: 'image' | 'pdf';
  };
  isHallOfFame?: boolean;
}

interface AchievementsViewProps {
  achievements: Achievement[];
  onToggleHallOfFame: (id: string) => void;
}

const AchievementsView: React.FC<AchievementsViewProps> = ({ achievements, onToggleHallOfFame }) => {
  const [view, setView] = useState<'all' | 'hallOfFame'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredAchievements = achievements
    .filter(achievement => view === 'all' || achievement.isHallOfFame)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.student.name.localeCompare(b.student.name);
    });

  return (
    <div className="space-y-4">
      {/* Header with View Toggle and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">Student Achievements</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                view === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setView('hallOfFame')}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                view === 'hallOfFame'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Hall of Fame
            </button>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-white p-4 rounded-lg shadow-sm border ${
              achievement.isHallOfFame
                ? 'border-yellow-300 shadow-md'
                : 'border-gray-200'
            } hover:shadow-md transition-shadow relative`}
          >
            {achievement.isHallOfFame && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                  <Star className="h-5 w-5" />
                </div>
              </div>
            )}
            
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-500">
                  {achievement.student.name} • {formatDate(achievement.date)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className={`h-5 w-5 ${
                  achievement.isHallOfFame ? 'text-yellow-500' : 'text-gray-400'
                }`} />
                <button
                  onClick={() => onToggleHallOfFame(achievement.id)}
                  className={`p-1.5 rounded-full ${
                    achievement.isHallOfFame
                      ? 'text-yellow-500 hover:bg-yellow-50'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                  title={achievement.isHallOfFame ? 'Remove from Hall of Fame' : 'Add to Hall of Fame'}
                >
                  <Award className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="text-base text-gray-700 mb-3">{achievement.description}</p>

            {achievement.attachment && (
              <div className="mt-3">
                {achievement.attachment.type === 'image' ? (
                  <img
                    src={achievement.attachment.url}
                    alt={achievement.attachment.name}
                    className="max-w-full h-auto rounded-lg"
                  />
                ) : (
                  <a
                    href={achievement.attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <span className="mr-1">📄</span>
                    {achievement.attachment.name}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <p className="text-base text-gray-500">
            {view === 'hallOfFame'
              ? 'No achievements in Hall of Fame yet'
              : 'No achievements found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsView; 