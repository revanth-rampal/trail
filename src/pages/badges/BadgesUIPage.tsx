import React, { useState } from 'react';
import { X, Award, Calendar, User, Star } from 'lucide-react';

// --- MOCK DATA ---
// UPDATED: All badges are now marked as earned.
const allBadges = [
  {
    id: 'll',
    name: 'Legendary Learner',
    image: '/ll.png',
    description: 'Awarded for demonstrating exceptional curiosity and a deep passion for learning across all subjects. A true role model in the classroom.',
    earned: true,
    awardedBy: 'Ms. Davidson',
    date: '2024-06-15T10:00:00Z',
  },
  {
    id: 'ck',
    name: 'Comback kid',
    image: '/ck.png',
    description: 'Recognizes outstanding creativity and innovation in project work, thinking outside the box to produce extraordinary results.',
    earned: true,
    awardedBy: 'Mr. Carter',
    date: '2024-05-22T14:30:00Z',
  },
  {
    id: 'som',
    name: 'Star of the Month',
    image: '/som.png',
    description: 'Awarded for exemplary behavior, consistent effort, and a positive attitude throughout the entire month.',
    earned: true,
    awardedBy: 'Principal Adams',
    date: '2024-04-30T09:00:00Z',
  },
  {
    id: 'sc',
    name: 'Sports Champion',
    image: '/sc.png',
    description: 'Celebrates exceptional skill, sportsmanship, and leadership on the sports field. A true team player.',
    earned: true,
    awardedBy: 'Coach Miller',
    date: '2024-03-18T16:00:00Z',
  },
  {
    id: 'sw',
    name: 'Science Wizard',
    image: '/sw.png',
    description: 'For students who show a remarkable aptitude for scientific inquiry, experimentation, and discovery.',
    earned: true,
    awardedBy: 'Dr. Evelyn Reed',
    date: '2024-02-10T11:00:00Z',
  },
];


// --- Badge Detail Modal Component ---
const BadgeDetailModal = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl m-4 transform transition-all duration-300 ease-in-out scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white p-2 rounded-full text-gray-600 hover:text-red-500 hover:scale-110 transition-transform z-10 shadow-lg"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
               <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
               <img
                src={badge.image}
                alt={badge.name}
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain relative z-10 animate-float"
              />
            </div>
          </div>

          <div className="text-center md:text-left">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Achievement Unlocked</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">{badge.name}</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">{badge.description}</p>

            <div className="space-y-3 text-sm text-gray-500">
               <div className="flex items-center justify-center md:justify-start gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>Awarded by: <strong>{badge.awardedBy}</strong></span>
               </div>
               <div className="flex items-center justify-center md:justify-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>Date: <strong>{new Date(badge.date).toLocaleDateString()}</strong></span>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulse-slow 4s infinite; }
        @keyframes click-pop { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
        .animate-click-pop { animation: click-pop 0.3s ease-in-out; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};


// --- Badge Card Component ---
const BadgeCard = ({ badge, onSelect }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onSelect(badge);
            setIsAnimating(false);
        }, 300);
    };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm
        flex flex-col items-center justify-start text-center
        transform transition-all duration-300 ease-in-out group cursor-pointer
        hover:shadow-xl hover:-translate-y-2
        ${isAnimating ? 'animate-click-pop' : ''}
      `}
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        <img src={badge.image} alt={badge.name} className="w-full h-full object-contain relative z-10" />
      </div>

      <h3 className="text-lg font-bold text-gray-800 mt-4">{badge.name}</h3>
      <p className="text-sm font-semibold mt-1 text-green-600">
        Earned
      </p>
    </div>
  );
};

// --- Main Page Component ---
export default function BadgesUIPage() {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const earnedBadges = allBadges.filter(b => b.earned);
  const earnedCount = earnedBadges.length;

  const mostRecentBadge = earnedBadges.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <Award className="mx-auto h-12 w-12 text-blue-500" />
            <h1 className="text-4xl font-extrabold text-gray-900 mt-4">My Achievements</h1>
        </div>
        
        {/* UPDATED: Highlights section now has a 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Total Badges Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex items-center gap-6">
                <div className="bg-blue-100 p-4 rounded-full"><Award className="w-8 h-8 text-blue-600"/></div>
                <div>
                    <p className="text-gray-600 text-sm">Total Badges</p>
                    <p className="text-2xl font-bold text-gray-900">{earnedCount}</p>
                </div>
            </div>
            {/* Most Recent Badge Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex items-center gap-6">
                <div className="bg-green-100 p-4 rounded-full"><Star className="w-8 h-8 text-green-600"/></div>
                <div>
                    <p className="text-gray-600 text-sm">Most Recent</p>
                    <p className="text-xl font-bold text-gray-900">{mostRecentBadge?.name || 'None'}</p>
                </div>
            </div>
        </div>

        {/* Badges Grid Header */}
        <div className="border-t border-gray-200 pt-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Badge Collection</h2>
        </div>

        {/* Badges Grid - maps over all badges, but BadgeCard now assumes all are earned */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {allBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} onSelect={setSelectedBadge} />
          ))}
        </div>
      </div>

      <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </div>
  );
}
