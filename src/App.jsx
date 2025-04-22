//I will be creating a website that allows the user to see what football rankings are
//I will be using Vite and React to create the website

import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Greeting from './Components/Greeting'; // Import the Greeting component

function App() {
  const [count, setCount] = useState(0);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchRankings = async () => {
      try {
        const response = await fetch(
          'https://api.allorigins.win/raw?url=https://ncaa-api.henrygd.me/rankings/football/fbs/associated-press'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      
        setRankings(data);
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const handleTeamSelect = (event) => {
    const teamName = event.target.value;
    const team = rankings.find((t) => t.team === teamName);
    setSelectedTeam(team);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Greeting /> {/* Use the Greeting component here */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h2>College Football Rankings</h2>
        {loading && <p>Loading rankings...</p>}
        {error && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            <p>Error: {error}</p>
            <p>Please try refreshing the page or check back later.</p>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="mb-4 text-center">
              <select onChange={handleTeamSelect} defaultValue="">
                <option value="" disabled>
                  Select a Team
                </option>
                {rankings.map((team, index) => (
                  <option key={index} value={team.team}>
                    {team.rank}. {team.team}
                  </option>
                ))}
              </select>
            </div>
            {selectedTeam && (
              <div className="team-stats">
                <h2>{selectedTeam.team}</h2>
                <p>
                  <strong>Rank:</strong> {selectedTeam.rank}
                </p>
                <p>
                  <strong>Record:</strong> {selectedTeam.record}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
