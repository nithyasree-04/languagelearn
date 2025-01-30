import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [totalPoints, setTotalPoints] = useState(() => {
    return parseInt(localStorage.getItem('totalPoints')) || 0;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('isDarkMode')) || false;
  });
  
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [notifications, setNotifications] = useState([
    "Learn a new word today!",
    "You completed a quiz. Great job!",
    "Your language skills are improving!"
  ]);
  const [activeSection, setActiveSection] = useState('profile'); 

  useEffect(() => {
    localStorage.setItem('totalPoints', totalPoints);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark', isDarkMode);
  }, [totalPoints, isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = () => {
    alert(`Feedback Sent: ${feedback}`);
    setFeedback('');
    setShowFeedbackForm(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);  // Change active section to Notifications or Profile
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-green-500 to-blue-500'}`}>
      {/* Sidebar */}
      <div className="w-1/5 bg-green-900 h-screen sticky top-0 flex flex-col items-start p-6 space-y-6 rounded-r-3xl shadow-lg">
        <h1 className="text-white font-bold text-2xl mb-4">LingoLeap</h1>
        <ul className="space-y-4 w-full">
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/dashboard">Home</Link></li>
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/practice">Practice</Link></li>
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/leaderboard">Leaderboard</Link></li>
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Profile Content */}
      <div className="w-4/5 flex flex-col items-center justify-center p-10">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center w-2/3">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

          {/* User Details */}
          <h1 className="text-green-700 text-3xl font-bold mb-2">John Doe</h1>
          <p className="text-gray-600 text-lg mb-4">johndoe@example.com</p>

          {/* Total Points */}
          <p className="text-gray-700 text-xl font-semibold mb-6">
            Total Points: <span className="text-green-600">{totalPoints}</span>
          </p>

          {/* Settings Section */}
          {activeSection === 'profile' && (
            <div className="text-left w-full border-t pt-4">
              <h2 className="text-green-700 font-bold text-lg mb-2">Account Settings</h2>
              <ul className="space-y-3">
                <li className="text-gray-700 hover:text-green-600 cursor-pointer" onClick={handleDarkModeToggle}>
                  {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </li>
                <li className="text-gray-700 hover:text-green-600 cursor-pointer" onClick={() => setShowFeedbackForm(true)}>
                  Feedback
                </li>
                <li className="text-gray-700 hover:text-green-600 cursor-pointer" onClick={() => handleSectionChange('notifications')}>
                  Notifications
                </li>
              </ul>
            </div>
          )}

          {/* Logout Button */}
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl mt-6">
            <Link to="/">Log Out</Link>
          </button>
        </div>

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6 w-2/3">
            <h3 className="font-bold text-lg mb-2">Notifications</h3>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="text-gray-700 mb-2">{notification}</li>
              ))}
            </ul>
            <button onClick={() => handleSectionChange('profile')} className="text-green-600 mt-4">Back to Profile</button>
          </div>
        )}
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-1/3">
            <h3 className="text-xl font-bold mb-4">Your Feedback</h3>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              className="w-full p-4 mb-4 border rounded-lg"
              rows="4"
              placeholder="Write your feedback here..."
            />
            <div className="flex justify-between">
              <button className="bg-green-500 text-white py-2 px-6 rounded" onClick={handleFeedbackSubmit}>
                Submit
              </button>
              <button className="bg-gray-300 text-gray-700 py-2 px-6 rounded" onClick={() => setShowFeedbackForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
