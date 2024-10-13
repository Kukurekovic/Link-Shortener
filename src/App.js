import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api.tinyurl.com/create',
        {
          url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TINYURL_API_KEY}`, 
            'Content-Type': 'application/json'
          }
        }
      );

      setShortUrl(response.data.data.tiny_url); 
      console.log(response.data);

      setError(null);
    } catch (err) {
      setError('Failed to shorten URL');
      setShortUrl('');
    }
  };

  return (
    <div className="App">
      <h1>Link Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
