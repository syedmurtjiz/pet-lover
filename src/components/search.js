import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?name=${name}`); // Use navigate instead of history.push
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search for a pet by name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchPage;
