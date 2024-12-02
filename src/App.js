import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [palette, setPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);


  const fetchPalette = async () => {

    const url = "https://cors-anywhere.herokuapp.com/http://colormind.io/api/"; 

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

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color)
    setCopied(color)

    setTimeout(() => {
      setCopied(false); // Hide the div after 2 seconds
    }, 2000);
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
          palette &&
          palette.map((color, index) => (
            <div className="colorbox-cont" key={index} style={{ width: '100%' }}>
              <ColorBox
                color={color}
                onCopy={handleCopy}
              />
            </div>
          ))
        )}
      </div>
      {copied && (
        <div className="copied-message" style={{
          color: 'white',
        }}>
          <p>Copied</p>
        </div>
      )}


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

  function ColorBox({ color, onCopy }) {
    const [isHovered, setIsHovered] = useState(false); // Track hover state for each box

    const onHover = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    return (
      <div
        className="colorbox"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          margin: '0 auto',
          backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={() => onCopy(`(${color[0]}, ${color[1]}, ${color[2]})`)}
      >
        <p
          className="colorCode"
          style={{
            color: 'white',
            margin: 0,
            fontSize: '20px',
          }}
        >
          {isHovered && (
            <div className="hover-text">
              <p>Click to Copy</p>
              {`(${color[0]}, ${color[1]}, ${color[2]})`}

            </div>
          )}
        </p>
      </div>
    );
  }

}

export default App;
