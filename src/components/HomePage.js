import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]); // State for filtered cats
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const API_KEY = 'live_UZebaDax2R4t5v5BRN8wXDFyCwF9Du57WVzfnzpZHpKMIvzY9NBGjz8VJsngF9al';

  const fetchCats = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const breedsData = await response.json();

      const imagesPromises = breedsData.map(breed => 
        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`)
      );

      const imagesResponses = await Promise.all(imagesPromises);
      const imagesData = await Promise.all(imagesResponses.map(res => res.json()));

      const catsWithImages = breedsData.map((breed, index) => ({
        ...breed,
        image: imagesData[index][0] ? imagesData[index][0].url : null,
      }));

      setCats(catsWithImages);
      setFilteredCats(catsWithImages); // Initialize filtered cats with all cats
    } catch (error) {
      console.error('Error fetching cats:', error);
      setError('Failed to fetch cat breeds.');
    }
  };

  // Filter cats based on search term
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = cats.filter(cat => 
      cat.name.toLowerCase().includes(term) || 
      cat.temperament.toLowerCase().includes(term) || 
      cat.description.toLowerCase().includes(term)
    );
    setFilteredCats(filtered);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <h1>Cat Breeds and Images</h1>
      <input
        type="text"
        placeholder="Search for a cat breed..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: '10px 0', padding: '5px', width: '300px' }}
      />
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
        {filteredCats.map((cat) => (
          <li key={cat.id} style={{ margin: '10px', textAlign: 'center' }}>
            {cat.image ? (
              <img 
                src={cat.image} 
                alt={cat.name} 
                style={{ width: '200px', height: 'auto' }} 
              />
            ) : (
              <p>No image available</p>
            )}
            <h2>{cat.name}</h2>
            <p>{cat.temperament}</p>
            <p>{cat.description}</p>
            <p>Life Span: {cat.life_span} years</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
