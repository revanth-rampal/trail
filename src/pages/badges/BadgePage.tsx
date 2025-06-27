import React from 'react';

// Main App Component
export default function BadgePage() {
  // --- IMPORTANT ---
  // You need to place your 'rank1.png' image in a location where your web app can access it.
  // For example, if you place it in the 'public/images' folder of your project,
  // the path would be '/images/rank1.png'.
  // I am using the previously provided URL as a placeholder.
  // REPLACE THE LINE BELOW WITH THE ACTUAL PATH TO YOUR IMAGE.
  const badgeImageUrl = '/Picsart_25-06-15_11-44-57-964.png';

  return (
    <>
      {/* This <style> block contains all the custom CSS for the animations and visual effects. */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        @keyframes rotateGlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .badge-float {
          animation: float 5s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .badge-float:hover {
          transform: scale(1.1) rotate(5deg);
          filter: brightness(1.2);
        }

        .glow-effect::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 150%;
          height: 150%;
          background: conic-gradient(
            from 0deg,
            rgba(255, 215, 0, 0.75),
            rgba(240, 230, 140, 0.55),
            rgba(255, 250, 205, 0.45),
            rgba(218, 165, 32, 0.65),
            rgba(255, 215, 0, 0.75)
          );
          filter: blur(70px);
          z-index: -1;
          animation: rotateGlow 7s linear infinite;
          opacity: 0.7;
        }

        .title-shimmer {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 215, 0, 0.85) 25%,
            #ffffff 50%,
            rgba(255, 215, 0, 0.85) 75%,
            #ffffff 100%
          );
          background-size: 2000px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 8s linear infinite;
        }

        .content-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .share-button {
          position: relative;
          overflow: hidden;
        }

        .share-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: 0.5s;
        }

        .share-button:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Main container with a dark background to make the gold pop. */}
      <div className="bg-gradient-to-b from-[#10141f] to-[#1a1f2e] min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans text-white overflow-hidden">
        
        {/* Badge Section */}
        <div className="relative w-full max-w-sm flex flex-col items-center justify-center mb-8 content-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* This div is the anchor for the glow pseudo-element. */}
          <div className="relative glow-effect">
            <img 
              src={badgeImageUrl} 
              alt="Rank 1 Badge - Legendary Learner" 
              className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain badge-float cursor-pointer"
              // Fallback image in case your 'rank1.png' fails to load.
            />
          </div>
        </div>

        {/* Text Content Section */}
        <div className="text-center max-w-md w-full content-fade-in" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wider uppercase title-shimmer mb-6">
            Legendary Learner
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 leading-relaxed">
            Awarded to the top-performing student who consistently demonstrates exceptional academic excellence, curiosity, and a passion for learning. A true role model in the classroom, setting the standard for brilliance and dedication.
          </p>
        </div>

        {/* Share Button Section */}
        <div className="mt-12 w-full flex justify-center content-fade-in" style={{ animationDelay: '0.6s' }}>
          <button className="share-button bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-16 sm:px-20 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">
            Share Achievement
          </button>
        </div>
      </div>
    </>
  );
}

