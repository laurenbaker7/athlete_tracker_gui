import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const linkStyle = {
    backgroundColor: '#61dafb',
    padding: '0.5rem 1rem',
    color: '#000',
    textDecoration: 'none',
    borderRadius: '4px',
    marginLeft: '1rem'
  };

  return (
    <header style={{
      padding: '1rem',
      backgroundColor: '#333',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Wildlife Tracker</h2>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/portal" style={linkStyle}>Athlete Portal</Link>
      </div>
    </header>
  );
}

export default Header;