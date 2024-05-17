import React, { useState } from 'react';
import axios from 'axios';

const MarketauxTopStories = () => {
  const [year, setYear] = useState('');
  const [headlines, setHeadlines] = useState([]);

  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch top stories for the specified year from Marketaux API
      const response = await axios.get(
        `https://api.marketaux.com/v1/news/all`,
        {
          params: {
            api_token: 'PwPkEgBzBQrO5mY2RFkSHAVfDnJPZ84N30WK6jUm', // Replace with your actual API key
            filter_entities: 'year',
            entities: year,
          }
        }
      );

      const stories = response.data.data.map((story) => story.title);

      // Update headlines state
      setHeadlines(stories);

      // Clear year input after fetching
      setYear('');
    } catch (error) {
      console.error('Error fetching top stories:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Top Stories</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={year}
          onChange={handleInputChange}
          placeholder="Enter a year..."
          style={{ color: 'black' }}
        />
        <button type="submit">Get Top Stories</button>
      </form>
      {headlines.length > 0 && (
        <div>
          <h2>Top Stories of {year}</h2>
          <ul>
            {headlines.map((headline, index) => (
              <li key={index}>{headline}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MarketauxTopStories;
