import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/api/";  // Make sure you're using this relative path

    const data = {
      model: "default",
      input: [[44, 43, 44], [90, 83, 82], "N", "N", "N"],
    };

    const fetchPalette = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setPalette(result.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPalette();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>COLORPAL</h1>
      </header>

      <div style={{ display: 'flex' }}>
        {palette && palette.map((color, index) => (
          <div key={index} style={{
            width: '100px',
            height: '100px',
            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
            margin: '5px',
          }} />
        ))}
      </div>
    </div>
  );
}

export default App;
