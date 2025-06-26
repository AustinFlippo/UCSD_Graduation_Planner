import React, { useState } from 'react';

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleBackdropClick = (e) => {
    // Close popup if clicking on backdrop (not the modal content)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!showPopup) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gray-50 border-b border-gray-200 p-6 rounded-t-lg">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none"
            aria-label="Close welcome popup"
          >
            ×
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Welcome to TritonPlanner!
          </h1>
          
          <p className="text-lg text-gray-600">
            Your hub to plan your future at UCSD — with smart course search, an AI assistant, and a personalized graduation tracker.
          </p>
        </div>

        {/* Features Content */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Feature 1: Upload Degree Audit HTML */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Upload Degree Audit HTML
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Easily upload your degree audit HTML file to extract and visualize your completed and remaining courses automatically.
              </p>
            </div>

            {/* Feature 2: 4 Year Planner */}
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                4 Year Planner
              </h3>
              <p className="text-blue-800 leading-relaxed">
                Drag and drop courses into a clean quarterly grid organized by year. Plan your academic journey with clarity.
              </p>
            </div>

            {/* Feature 3: Course Search */}
            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Course Search
              </h3>
              <p className="text-green-800 leading-relaxed">
                Search for UCSD courses by name, keyword, or course ID. View course descriptions, enrollment times, and RateMyProfessor scores to make informed choices.
              </p>
            </div>

            {/* Feature 4: Course Assistant */}
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Course Assistant
              </h3>
              <p className="text-purple-800 leading-relaxed">
                Ask questions like "What classes fulfill this requirement?" or "Build me a schedule." Get intelligent suggestions based on your data.
              </p>
            </div>

          </div>

          {/* Get Started Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;