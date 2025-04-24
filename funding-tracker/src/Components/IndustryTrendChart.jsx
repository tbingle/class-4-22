import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const IndustryTrendChart = () => {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/Funding.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched funding data:', data); // Debugging
        setFundingData(data);
      })
      .catch((error) => console.error('Error loading funding data:', error));
  }, []);

  // Group data by industry and year
  const groupedData = fundingData.reduce((acc, item) => {
    const { industry, year, amount } = item;
    if (!acc[year]) acc[year] = { year };
    acc[year][industry] = (acc[year][industry] || 0) + amount;
    return acc;
  }, {});

  // Convert grouped data to an array for charting
  const chartData = Object.values(groupedData);

  // Extract unique industries for dynamic line generation
  const industries = [...new Set(fundingData.map((item) => item.industry))];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {industries.map((industry) => (
          <Line
            key={industry}
            type="monotone"
            dataKey={industry}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each line
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IndustryTrendChart;