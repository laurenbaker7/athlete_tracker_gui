import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_TEAM } from '../../graphql/mutations';

function RegisterTeamForm() {
  const [teamName, setTeamName] = useState('');
  const [registerTeam, { data, loading, error }] = useMutation(REGISTER_TEAM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    try {
      await registerTeam({ variables: { teamName } });
      setTeamName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '1rem' }}>
          Register Team
        </button>
      </form>

      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && (
        <p style={{ color: 'green' }}>
          ✅ Team "{data.registerTeam.teamName}" registered with ID {data.registerTeam.id}
        </p>
      )}
    </div>
  );
}

export default RegisterTeamForm;