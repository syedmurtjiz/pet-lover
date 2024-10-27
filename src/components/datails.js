import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [type, setType] = useState(''); // Add state for pet type if needed

  const fetchPets = async () => {
    try {
      const response = await fetch(`/api/pets?type=${type || ''}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch pets: ${response.statusText}`);
      }
      const data = await response.json();
      setPets(data);
    } catch (err) {
      console.error('Fetch pets error:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [type]); // Fetch pets whenever the type changes

  return (
    <div>
      {error && <p>Error: {error}</p>} {/* Display error message if any */}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
