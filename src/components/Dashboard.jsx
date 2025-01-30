import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import japan from './japan.png';
import france from './france.png';
import germany from './german.png';
import italy from './italy.jpg';

function Dashboard() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([
    { name: 'Japan', img: japan },
    { name: 'France', img: france },
    { name: 'Germany', img: germany }
  ]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch('/leaderboard')
      .then(response => response.json())
      .then(data => setLeaderboard(data));
  }, []);

  const addItaly = () => {
    if (!countries.some(country => country.name === 'Italy')) {
      setCountries([...countries, { name: 'Italy', img: italy }]);
    }
  };

  const addPoints = (newPoints) => {
    const updatedPoints = points + newPoints;
    setPoints(updatedPoints);
    setLevel(Math.floor(updatedPoints / 100));
  };
  
  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 min-h-screen flex">
      <div className="w-1/5 bg-green-900 h-screen sticky top-0 flex flex-col items-start p-6 space-y-6 rounded-r-3xl shadow-lg">
        <h1 className="text-white font-bold text-2xl mb-4">LingoLeap</h1>
        <ul className="space-y-4 w-full">
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/dashboard">Home</Link></li>
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/practice">Practice</Link></li>
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/leaderboard">Leaderboard</Link></li>
          <li className="text-white hover:bg-green-700 p-2 rounded-lg w-full"><Link to="/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="w-4/5 flex flex-col p-6 space-y-8">
        <div className="flex justify-between items-center">
          <p className="text-white text-sm">Level {level}</p>
          <div className="flex items-center">
            <p className="text-white mr-4">Good Morning !</p>
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex justify-center items-center">😊</div>
          </div>
        </div>

        <div className="flex justify-start items-center space-x-4">
          {countries.map((country, index) => (
            <img key={index} src={country.img} alt={country.name} className="w-10 h-10" />
          ))}
          <button onClick={addItaly} className="text-white text-lg">+</button>
        </div>

        <div className="p-4 bg-green-600 rounded-lg">
          <h2 className="text-white font-bold text-lg mb-2">Daily Challenge</h2>
          <p className="text-white">Guess these 10 words as MCQ!</p>
          <button onClick={() => navigate('/daily-challenge')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">Try now</button>
        </div>

        <div className="p-4 bg-green-600 rounded-lg">
          <h2 className="text-white font-bold text-lg mb-2">Test your skills</h2>
          <p className="text-white">Track your progress with the quiz!</p>
          <button onClick={() => { addPoints(100); navigate('/practice'); }} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">Start quiz</button>
        </div>

        <div className="p-4 bg-green-600 rounded-lg">
          <h2 className="text-white font-bold text-lg mb-2">Leaderboard</h2>
          {leaderboard.map((user, index) => (
            <p key={index} className="text-white">#{index + 1} {user.name} {user.points} pts.</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
