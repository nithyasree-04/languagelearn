import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside BrowserRouter
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
