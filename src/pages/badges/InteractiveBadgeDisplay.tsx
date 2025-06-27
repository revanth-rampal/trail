import React, { useState, useRef } from 'react';
import { User, Calendar, Award, ArrowLeft, RefreshCw } from 'lucide-react';

// --- MOCK DATA for a single badge ---
const badgeData = {
    name: 'Legendary Learner',
    image: '/ll.png', // Make sure this image exists in your /public folder
    description: 'For consistently demonstrating exceptional academic excellence, curiosity, and a passion for learning.',
    awardedBy: 'Ms. Anjali Gupta',
    date: '2024-06-15',
};

// --- Main Component ---
export default function InteractiveBadgeDisplay() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);

  const { name, image, description, awardedBy, date } = badgeData;

  // --- Combined Swipe/Drag Logic ---
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handleDragEnd = (clientX) => {
    if (!isDragging) return;

    const dragEndX = clientX;
    const swipeDistance = dragEndX - dragStartX.current;

    if (Math.abs(swipeDistance) > 50) {
      setIsFlipped(prev => !prev);
    }
    
    setIsDragging(false);
    dragStartX.current = null;
  };
  
  const handleFlipClick = () => {
      setIsFlipped(prev => !prev);
  }

  return (
    <div className="bg-gradient-to-br from-[#000428] via-[#001d3d] to-[#000428] min-h-screen flex flex-col items-center justify-center p-4 font-sans overflow-hidden cursor-grab active:cursor-grabbing">
      {/* Add custom CSS animations via a style tag */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Particle Background Animation */
        @keyframes move-particles {
            from { transform: translateY(0); }
            to { transform: translateY(-1000px); }
        }
        .particle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: move-particles 25s linear infinite;
        }
      `}</style>
      
      {/* Particle container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const style = {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 100}%`, // Start below the screen
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${Math.random() * 15 + 10}s`,
          };
          return <div key={i} className="particle" style={style}></div>;
        })}
      </div>

        {/* Main card container with perspective for 3D effect */}
        <div 
            style={{ perspective: '2000px' }} 
            className="w-full max-w-sm h-[550px] sm:h-[600px] z-10"
            onTouchStart={(e) => handleDragStart(e.targetTouches[0].clientX)}
            onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
            onMouseLeave={(e) => { if (isDragging) handleDragEnd(e.clientX); }}
        >
            {/* The flippable inner element */}
            <div 
                className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
                style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* --- FRONT SIDE --- */}
                <div 
                    className="absolute w-full h-full rounded-3xl p-6 text-center bg-white/10 border border-white/20 backdrop-blur-lg shadow-2xl shadow-cyan-500/10"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* FIXED: Centering logic is now on this div */}
                    <div className={`h-full flex flex-col items-center justify-center transition-opacity duration-200 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="relative">
                            <div className="absolute inset-[-10px] bg-cyan-400/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                            <img 
                                src={image} 
                                alt={name} 
                                className="w-48 h-48 sm:w-56 sm:h-56 object-contain animate-float"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-white mt-6">{name}</h1>
                        <p className="text-gray-300 mt-2 text-base leading-relaxed">{description}</p>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div 
                    className="absolute w-full h-full rounded-3xl p-8 text-center bg-white/10 border border-white/20 backdrop-blur-lg shadow-2xl shadow-yellow-400/10"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {/* FIXED: Centering logic is now on this div */}
                     <div className={`h-full flex flex-col items-center justify-center transition-opacity duration-200 ${!isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                        <Award size={64} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"/>
                        <h2 className="text-2xl font-bold text-white mt-4">Achievement Awarded</h2>
                        
                        <div className="mt-8 space-y-6 text-left w-full">
                            <div className="flex items-center gap-4">
                                <User size={24} className="text-gray-300"/>
                                <div>
                                    <p className="text-sm text-gray-400">Awarded By</p>
                                    <p className="text-lg font-semibold text-white">{awardedBy}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Calendar size={24} className="text-gray-300"/>
                                <div>
                                    <p className="text-sm text-gray-400">Date Awarded</p>
                                    <p className="text-lg font-semibold text-white">{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="w-full max-w-sm mt-8 flex justify-between items-center z-10">
            <button className="text-gray-400 p-3 rounded-full hover:bg-white/10 transition-colors" aria-label="Go Back">
                <ArrowLeft size={24}/>
            </button>
            <button onClick={handleFlipClick} className="text-white p-3 rounded-full hover:bg-white/10 transition-colors" aria-label="Flip Card">
                <RefreshCw size={24}/>
            </button>
        </div>
    </div>
  );
}
