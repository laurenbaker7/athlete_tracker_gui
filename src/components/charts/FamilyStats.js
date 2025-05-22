import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FAMILY_OBSERVATIONS } from '../../graphql/queries';
import FamilyStatsChart from './FamilyStatsChart';
import BackLink from '../common/BackLink';

function FamilyStats() {
  const [inputId, setInputId] = useState('1');
  const [familyId, setFamilyId] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_FAMILY_OBSERVATIONS, {
    variables: { id: familyId }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedId = parseInt(inputId);
    if (!isNaN(parsedId)) {
      setFamilyId(parsedId);
      refetch({ id: parsedId });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/" label="Back to Maps" />
      <h1>Family Stats</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <label htmlFor="family-id-input">Family ID:</label>
        <input
          id="family-id-input"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          style={{
            marginLeft: '0.5rem',
            padding: '0.25rem',
            width: '100px',
          }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Go
        </button>
      </form>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error loading family data.</p>}

      {data?.family && (
        <>
          <h2>{data.family.name}</h2>
          {data.family.observations.length > 0 ? (
            <FamilyStatsChart
            observations={data.family.observations}
            startDate={startDate}
            endDate={endDate}
            />
          ) : (
            <p>No observations available for this family.</p>
          )}
        </>
      )}
    </div>
  );
}

export default FamilyStats;