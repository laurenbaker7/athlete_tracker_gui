import React from 'react';
import { Link } from 'react-router-dom';

function RangerPortal() {
  const linkStyle = {
    display: 'block',
    marginBottom: '1rem',
    color: '#007acc',
    textDecoration: 'underline'
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛡️ Ranger Portal</h1>
      <p>Select an action below:</p>

      <Link to="/ranger/register-herd" style={linkStyle}>Register Herd</Link>
      <Link to="/ranger/register-family" style={linkStyle}>Register Family</Link>
      <Link to="/ranger/record-observation" style={linkStyle}>Record Observation</Link>
      <Link to="/ranger/record-event" style={linkStyle}>Record Event</Link>
    </div>
  );
}

export default RangerPortal;