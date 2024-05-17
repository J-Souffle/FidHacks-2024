import React, { useState } from 'react';
import axios from 'axios';

const StockMarketNews = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [headlines, setHeadlines] = useState([]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate month and year
    const monthNumber = parseInt(month, 10);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      alert('Please enter a valid month (1-12).');
      return;
    }

    const from = `${year}-${String(month).padStart(2, '0')}-01`;
    const to = `${year}-${String(month).padStart(2, '0')}-31`;

    try {
      // Fetch stock market news for the specified year and month from Marketaux API
      const response = await axios.get(
        `https://api.marketaux.com/v1/news/all`,
        {
          params: {
            api_token: 'PwPkEgBzBQrO5mY2RFkSHAVfDnJPZ84N30WK6jUm', // Replace with your actual API key
            from,
            to,
            language: 'en' // Request news articles in English
          }
        }
      );

      const stories = response.data.data.map((story) => story.title);

      // Update headlines state
      setHeadlines(stories);

      // Clear year and month inputs after fetching
      setYear('');
      setMonth('');
    } catch (error) {
      console.error('Error fetching stock market news:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Stock Market News</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Enter a year..."
          style={{ color: 'black' }}
        />
        <input
          type="text"
          value={month}
          onChange={handleMonthChange}
          placeholder="Enter a month (1-12)..."
          style={{ color: 'black' }}
        />
        <button type="submit">Get News</button>
      </form>
      {headlines.length > 0 && (
        <div>
          <h2>Top Stock Market News of {month}/{year}</h2>
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

export default StockMarketNews;
