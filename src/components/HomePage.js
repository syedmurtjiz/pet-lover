import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]); // State for filtered cats
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [expandedCatId, setExpandedCatId] = useState(null); // State to track expanded cat
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

  // Toggle expanded cat info
  const toggleExpandCat = (catId) => {
    setExpandedCatId(expandedCatId === catId ? null : catId);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="container">
      <style>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: auto;
          text-align: center;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        input[type="text"] {
          margin: 10px 0;
          padding: 10px;
          width: 100%;
          max-width: 400px;
          border: 2px solid #007bff;
          border-radius: 5px;
          font-size: 1rem;
        }
        input[type="text"]:focus {
          border-color: #0056b3;
          outline: none;
        }
        .cat-list {
          display: flex;
          flex-wrap: wrap;
          list-style-type: none;
          padding: 0;
          justify-content: center;
        }
        .cat-item {
          margin: 15px;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 10px;
          width: 200px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .cat-item:hover {
          transform: scale(1.05);
        }
        .cat-item img {
          width: 100%;
          height: 200px; /* Fixed height for all images */
          object-fit: cover; /* Ensures aspect ratio is maintained */
          border-radius: 10px;
        }
        .cat-item h2 {
          font-size: 1.5rem;
          margin: 10px 0;
          cursor: pointer; /* Indicate that the name is clickable */
          color: #007bff; /* Optional: change color for better visibility */
        }
        .cat-item p {
          margin: 5px 0;
          font-size: 0.9rem;
        }
        .cat-info {
          margin-top: 10px;
        }
      `}</style>

      {error && <p>Error: {error}</p>}
      <h1>Cat Breeds and Images</h1>
      <input
        type="text"
        placeholder="Search for a cat breed..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="cat-list">
        {filteredCats.map((cat) => (
          <li key={cat.id} className="cat-item">
            {cat.image ? (
              <img 
                src={cat.image} 
                alt={cat.name} 
              />
            ) : (
              <p>No image available</p>
            )}
            <h2 onClick={() => toggleExpandCat(cat.id)}>{cat.name}</h2>
            {expandedCatId === cat.id && (
              <div className="cat-info">
                <p>{cat.temperament}</p>
                <p>{cat.description}</p>
                <p>Life Span: {cat.life_span} years</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
