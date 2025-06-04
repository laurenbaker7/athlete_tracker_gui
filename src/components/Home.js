import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Wildlife Tracker Maps</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/workouts-map">📍 Map of Athlete's Workouts</Link></li>
        <li><Link to="/team-map">🐾 Team's Workouts Over Time</Link></li>
        <li><Link to="/nearby-events">🎯 Events Near a Location</Link></li>
        <li><Link to="/nearby-workouts">👣 Workouts Near a Location</Link></li>
        <li><Link to="/workout-stats">📈 Workout Duration and Distance Over Time</Link></li>
      </ul>
    </div>
  );
}

export default Home;