import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation'; // Ensure the case matches your file structure
import HomePage from './components/HomePage';
import PetDetailsPage from './components/datails'; // Check the path and filename for details component
import SearchPage from './components/search';
import PetNotFoundPage from './components/notfound';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:type" element={<HomePage />} />
        <Route path="/:type/:id" element={<PetDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/not-found" element={<PetNotFoundPage />} />
        <Route path="*" element={<PetNotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
