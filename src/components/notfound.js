import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetNotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Pet Not Found</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default PetNotFoundPage;
