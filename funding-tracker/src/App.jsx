import { useState, useEffect } from 'react';
import FundingBarChart from './Components/FundingBarChart';
import IndustryTrendChart from './Components/IndustryTrendChart';
import './App.css';

function App() {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/Funding.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || data.length === 0) {
          throw new Error('No data found in Funding.json');
        }
        setFundingData(data);
      })
      .catch((error) => console.error('Error loading funding data:', error));
  }, []);

  return (
    <>
      <h1>Funding Tracker</h1>
      <div>
        <h2>Funding Data</h2>
        <FundingBarChart fundingData={fundingData} />
        <h2>Funding Trends by Industry</h2>
        <IndustryTrendChart fundingData={fundingData} />
      </div>
    </>
  );
}

export default App;
