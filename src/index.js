import React from 'react';
import ReactDOM from 'react-dom/client'; // Change this import
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
