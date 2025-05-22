import React from 'react';
import { Link } from 'react-router-dom';

function BackLink({ to, label = 'Back' }) {
  return (
    <Link
      to={to}
      style={{
        display: 'inline-block',
        marginBottom: '1rem',
        color: '#007acc',
        textDecoration: 'underline',
        fontSize: '0.95rem'
      }}
    >
      ← {label}
    </Link>
  );
}

export default BackLink;