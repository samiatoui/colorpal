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

      <div className="colorcontainer">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          palette && palette.map((color, index) => (
            <div className='colorbox-cont' key={index} style={{
              width: '100%',
            }}>
              <div className="colorbox" style={{
                width: '100%',
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
                   fontSize: '20px',
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
        marginTop: '10px',
      }}>
        <button onClick={handleClick}>
          Generate</button>
      </div>
    </div>
  );
}

export default App;
