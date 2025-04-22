import React from 'react';
import TourCard from '.Components/TourCard';//Imports the TourCard component

const Gallery = ({ tours, loading, error, removeTour, refreshTours }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
// Check if there was an error fetching the tours
  if (error) {
    return <h2>Error fetching tours.</h2>;
  }
// Check if there are no tours available
  if (tours.length === 0) {
    return (
      <div className="No-Tours">
        <h2>No Tours available</h2>
        <button onClick={refreshTours}>Refresh</button>
      </div>
    );
  }
// Render the list of tours
  return (
    <section className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={removeTour} />
      ))}
    </section>
  );
};
// The Gallery component receives props from the parent component (App) and renders the list of tours
export default Gallery;