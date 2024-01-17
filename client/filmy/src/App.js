import React, { useEffect, useState } from 'react';

function App() {
  const [movie, setMovie] = useState(null);

  const fetchMovie = () => {
    fetch("/api/random-movie")
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Podaj mi randomowy film</h1>
      <button onClick={fetchMovie}>Pokaż inny film</button>
      {movie ? (
        <div>
          <h2>{movie.title} </h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
