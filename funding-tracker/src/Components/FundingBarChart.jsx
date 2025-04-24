import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const FundingBarChart = ({ fundingData }) => {
  // Calculate total funding by year
  const fundingByYear = fundingData.reduce((acc, item) => {
    acc[item.year] = (acc[item.year] || 0) + item.amount;
    return acc;
  }, {});

  // Convert to array for charting
  const chartData = Object.entries(fundingByYear).map(([year, total]) => ({
    year,
    total,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FundingBarChart;