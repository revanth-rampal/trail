import React, { useEffect } from 'react';
// The GraduationCap icon is no longer needed.

// --- Main SplashScreen Component ---
export default function SplashScreen() {
  // This useEffect hook will run once when the component mounts
  useEffect(() => {
    // Set a timer to navigate to the login page after 3 seconds
    const timer = setTimeout(() => {
      // This now uses the browser's built-in location object to navigate.
      // It avoids the React Router context error.
      window.location.replace('/login');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup function: this will clear the timer if the component is unmounted
    // before the timer finishes, which is a good practice.
    return () => clearTimeout(timer);
  }, []); // The dependency array is now empty.

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 1s ease-out forwards;
        }
        .animate-dot-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      
      <div className="animate-fade-in-scale">
        {/* Logo Section - UPDATED */}
        <div className="flex flex-col items-center justify-center gap-4">
            {/* The image path assumes 'logo.png' is in the 'public' folder */}
            <img src="/logo.png" alt="Delhi Public School Logo" className="h-28 w-auto object-contain" />
            <p className="text-xl font-semibold text-gray-600 mt-4">Delhi Public School</p>
        </div>

        {/* Loading Indicator */}
        <div className="mt-16 flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-dot-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
