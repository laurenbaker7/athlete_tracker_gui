import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Wildlife Tracker Maps</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/herd-map">📍 Herd Movement Over Time</Link></li>
        <li><Link to="/family-map">🐾 Family Movement Over Time</Link></li>
        <li><Link to="/nearby-events">🎯 Events Near a Location</Link></li>
        <li><Link to="/nearby-families">👣 Families Near a Location</Link></li>
        <li><Link to="/family-stats">📈 Family Size & Health Over Time</Link></li>
      </ul>
    </div>
  );
}

export default Home;