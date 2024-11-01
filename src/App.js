import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import './App.css'; // Make sure the case matches exactly

const App = () => {
  return (
    <Router>
      <div className="app-header">

        <h2>Pets Lover</h2>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:type" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
