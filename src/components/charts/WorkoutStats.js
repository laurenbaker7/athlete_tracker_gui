import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WORKOUTS_BY_ATHLETE } from '../../graphql/queries';
import WorkoutStatsChart from './WorkoutStatsChart';
import BackLink from '../common/BackLink';

function WorkoutStats() {
  const [username, setUsername] = useState('');
  const [getWorkouts, { data, loading, error }] = useLazyQuery(GET_WORKOUTS_BY_ATHLETE);

  const handleSearch = () => {
    if (username.trim()) {
      getWorkouts({ variables: { username } });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/" label="Back to Home" />
      <h1>Workout Stats</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        style={{ marginRight: '1rem' }}
      />
      <button onClick={handleSearch}>Get Workouts</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      {data?.workoutsByAthlete?.length > 0 ? (
        <WorkoutStatsChart workouts={data.workoutsByAthlete} />
      ) : (
        data && <p>No workout data found.</p>
      )}
    </div>
  );
}

export default WorkoutStats;
