// client/src/App.js
import React, { useState } from 'react';
import ObjectDetectionResults from './components/ObjectDetectionResults';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Object Detection App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={handleInputChange}
          placeholder="Enter image URL"
        />
        <button type="submit">Submit</button>
      </form>
      {imageUrl && <ObjectDetectionResults imageUrl={imageUrl} />}
    </div>
  );
};

export default App;
