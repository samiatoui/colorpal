import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchPalette = async () => {

    const url = "/api/";  // Make sure you're using this relative path

    const data = {
      model: "default",
      input: ["N", "N", "N", "N", "N"],
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not good');
      }

      const result = await response.json();
      setPalette(result.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPalette();
  }, []);

  const handleClick = () => {
    setLoading(true);
    fetchPalette();
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>COLORPAL</h1>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          palette && palette.map((color, index) => (
            <div key={index} style={{
              width: '100%',
              height: '500px',
            }}>
              <div className="colorbox" style={{
                width: '100%',
                height: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: '0 auto',
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
              }}>
                <p style={{
                   color: 'white',
                   margin: 0,
                }}>{`[${color[0]}, ${color[1]}, ${color[2]}]`}</p>
              </div>
            </div>
          ))
        )}
      </div>


      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        padding: '50px 25px',
      }}>
        <a href="#" onClick={handleClick}>
          Generate</a>
      </div>
    </div>
  );
}

export default App;
