import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/api';
import '../styles/LoginSignup.css';

const LoginSignup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (isSignUp) {
      try {
        const response = await signUp(formData);
        if (response.success) {
          setMessage('✅ Sign up successful! Welcome to our platform!');
          setIsAuthenticated(true);
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setError(response.error || '❌ Sign up failed. Please try again later.');
        }
      } catch (err) {
        setError('❌ Sign up failed. Try again later.');
      }
    } else {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '' });
    setMessage('');
    setError('');
  };

  return (
    <div className="login-container flex justify-center items-center min-h-screen bg-gray-100">
      <div className="login-card bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="login-title text-2xl font-semibold text-center mb-4">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        {message && <div className="message success bg-green-100 text-green-800 p-2 rounded mb-4">{message}</div>}
        {error && <div className="message error bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="input-field p-2 border rounded w-full mb-4"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input-field p-2 border rounded w-full mb-4"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input-field p-2 border rounded w-full mb-4"
          />
          <button type="submit" className="submit-button">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="toggle-form">
          <span onClick={toggleForm}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
