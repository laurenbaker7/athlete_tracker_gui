import React from 'react';
import { Link } from 'react-router-dom';

function AthletePortal() {
  const linkStyle = {
    display: 'block',
    marginBottom: '1rem',
    color: '#007acc',
    textDecoration: 'underline'
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛡️ Athlete Portal</h1>
      <p>Select an action below:</p>

      <Link to="/portal/register-athlete" style={linkStyle}>Register Athlete</Link>
      <Link to="/portal/register-team" style={linkStyle}>Register Team</Link>
      <Link to="/portal/record-workout" style={linkStyle}>Record Workout</Link>
      <Link to="/portal/record-event" style={linkStyle}>Record Event</Link>
    </div>
  );
}

export default AthletePortal;