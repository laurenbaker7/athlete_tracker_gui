import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Map, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GET_WORKOUTS_MAP } from '../../graphql/queries';
import BackLink from '../common/BackLink';

function WorkoutsMap() {
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [popupInfo, setPopupInfo] = useState(null);

  const [getWorkouts, { data, loading, error }] = useLazyQuery(GET_WORKOUTS_MAP);

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = { username };
    if (startDate) variables.startTime = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)).toISOString();
    if (endDate) variables.endTime = new Date(new Date(endDate).setUTCHours(23, 59, 59, 999)).toISOString();
    getWorkouts({ variables });
  };

  const workouts = data?.workoutsByAthlete || [];

  const bounds = workouts.length > 0
    ? [
        [
          Math.min(...workouts.map(w => w.longitude)),
          Math.min(...workouts.map(w => w.latitude)),
        ],
        [
          Math.max(...workouts.map(w => w.longitude)),
          Math.max(...workouts.map(w => w.latitude)),
        ]
      ]
    : null;

  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/" label="Back to Home" />
      <h1>Athlete Workout Map</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '1rem' }}>Show Map</button>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ marginRight: '1rem' }}>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
          <label style={{ marginLeft: '1rem' }}>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>
      </form>

      {loading && <p>Loading workouts...</p>}
      {error && <p style={{ color: 'red' }}>Error loading data</p>}

      {workouts.length > 0 ? (
        <Map
          bounds={bounds}
          fitBoundsOptions={{ padding: 50 }}
          style={{ width: '100%', height: '500px' }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {workouts.map((workout) => (
            <Marker
              key={workout.id}
              latitude={workout.latitude}
              longitude={workout.longitude}
              anchor="bottom"
            >
              <div
                onMouseEnter={() => setPopupInfo(workout)}
                onMouseLeave={() => setPopupInfo(null)}
                style={{
                  fontSize: '20px',
                  color: '#d62728',
                  cursor: 'pointer',
                }}
              >
                ●
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor="top"
              closeButton={false}
              closeOnClick={false}
            >
              <div style={{ fontSize: '12px' }}>
                <strong>{popupInfo.workout_type}</strong><br />
                Distance: {popupInfo.distance} | Duration: {popupInfo.duration}<br />
                {new Date(popupInfo.timestamp).toLocaleString()}
              </div>
            </Popup>
          )}
        </Map>
      ) : (
        !loading && <p>No workouts found for this athlete.</p>
      )}
    </div>
  );
}

export default WorkoutsMap;