import React, { useEffect, useState } from 'react';

const PetDetailsPage = () => { // Renamed component
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [type, setType] = useState('');

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
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchPets();
  }, [type]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>} {/* Loading feedback */}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PetDetailsPage; // Export renamed component
