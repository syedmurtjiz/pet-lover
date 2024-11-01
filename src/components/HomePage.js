import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // Make sure the case matches exactly

const HomePage = () => {
  const [cats, setCats] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [expandedAnimalId, setExpandedAnimalId] = useState(null);
  const [showing, setShowing] = useState('all');
  const CAT_API_KEY = 'live_UZebaDax2R4t5v5BRN8wXDFyCwF9Du57WVzfnzpZHpKMIvzY9NBGjz8VJsngF9al';
  const DOG_API_KEY = 'live_KnMmktEhsdq5alSzZwyWhsiVMzFcgmaQI4G7hKXwim4PTOV4IfUnqsiJ4DHnhNT9';

  const fetchCats = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': CAT_API_KEY,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
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
      setFilteredAnimals(prev => [...prev, ...catsWithImages]);
    } catch (error) {
      console.error('Error fetching cats:', error);
      setError('Failed to fetch cat breeds.');
    }
  };

  const fetchDogs = async () => {
    try {
      const response = await fetch('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': DOG_API_KEY,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const breedsData = await response.json();
      const dogsWithImages = breedsData.map((breed) => ({
        ...breed,
        image: breed.image?.url || null,
      }));

      setDogs(dogsWithImages);
      setFilteredAnimals(prev => [...prev, ...dogsWithImages]);
    } catch (error) {
      console.error('Error fetching dogs:', error);
      setError('Failed to fetch dog breeds.');
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const allAnimals = [...cats, ...dogs];
    const filtered = allAnimals.filter(animal => 
      animal.name.toLowerCase().includes(term) || 
      animal.temperament?.toLowerCase().includes(term) || 
      animal.description?.toLowerCase().includes(term)
    );

    setFilteredAnimals(filtered);
  };

  const toggleExpandAnimal = (animalId) => {
    setExpandedAnimalId(expandedAnimalId === animalId ? null : animalId);
  };

  const handleShow = (type) => {
    setShowing(type);
    setSearchTerm('');

    if (type === 'cats') {
      setFilteredAnimals(cats);
    } else if (type === 'dogs') {
      setFilteredAnimals(dogs);
    } else {
      setFilteredAnimals([...cats, ...dogs]);
    }
  };

  useEffect(() => {
    fetchCats();
    fetchDogs();
  }, []);

  return (
    <div className="container">
      <style>{`
        /* Add your CSS styling here */
      `}</style>

      
      <h1 className='heading'>Cat and Dog Breeds</h1>
      
      
      <div className="nav-links">
        <Link to="#" onClick={() => handleShow('all')}>All Pets</Link>
        <Link to="#" onClick={() => handleShow('cats')}>Cats</Link>
        <Link to="#" onClick={() => handleShow('dogs')}>Dogs</Link>
      </div>

      <input
        type="text"
        placeholder="Search for a breed..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="animal-list">
        {filteredAnimals.map((animal, index) => (
          <li key={`${animal.id}-${animal.name}-${index}`} className="animal-item">
            {animal.image ? (
              <img 
                src={animal.image} 
                alt={animal.name} 
              />
            ) : (
              <p>No image available</p>
            )}
            <h2 onClick={() => toggleExpandAnimal(animal.id)}>{animal.name}</h2>
            {expandedAnimalId === animal.id && (
              <div className="animal-info">
                <p>{animal.temperament}</p>
                <p>{animal.description}</p>
                <p>Life Span: {animal.life_span} years</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
