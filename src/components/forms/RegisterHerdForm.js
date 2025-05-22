import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_HERD } from '../../graphql/mutations';

function RegisterHerdForm() {
  const [species, setSpecies] = useState('');
  const [registerHerd, { data, loading, error }] = useMutation(REGISTER_HERD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!species.trim()) return;
    try {
      await registerHerd({ variables: { species } });
      setSpecies('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Species:
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '1rem' }}>
          Register Herd
        </button>
      </form>

      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <p style={{ color: 'green' }}>
          ✅ Herd "{data.registerHerd.species}" registered with ID {data.registerHerd.id}
        </p>
      )}
    </div>
  );
}

export default RegisterHerdForm;