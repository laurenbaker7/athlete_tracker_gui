import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Map, Marker, Popup, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import BackLink from '../common/BackLink';
import { GET_HERD_LOCATIONS } from '../../graphql/queries';

const colors = [
  '#1f77b4', '#ff7f0e', '#2ca02c',
  '#d62728', '#9467bd', '#8c564b',
  '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
];

function HerdMap() {
  const [herdId, setHerdId] = useState('1');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [popupInfo, setPopupInfo] = useState(null);
  const [showPath, setShowPath] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_HERD_LOCATIONS, {
    variables: { id: parseInt(herdId) }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(herdId);
    if (!isNaN(id)) {
      refetch({ id });
    }
  };

  const start = startDate
    ? new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
    : null;
  const end = endDate
    ? new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
    : null;

  const families = data?.herd?.families || [];

  // Flatten all valid locations for fitBounds
  const allLocations = families.flatMap(fam =>
    [...fam.observations, ...fam.events].filter(
      loc =>
        isFinite(loc.latitude) &&
        isFinite(loc.longitude) &&
        (!start || new Date(loc.timestamp) >= start) &&
        (!end || new Date(loc.timestamp) <= end)
    )
  );

  const bounds = allLocations.length > 0
    ? [
        [
          Math.min(...allLocations.map(l => l.longitude)),
          Math.min(...allLocations.map(l => l.latitude))
        ],
        [
          Math.max(...allLocations.map(l => l.longitude)),
          Math.max(...allLocations.map(l => l.latitude))
        ]
      ]
    : null;

  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/" label="Back to Maps" />
      <h1>Herd Movement Map</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          Herd ID:
          <input
            type="text"
            value={herdId}
            onChange={(e) => setHerdId(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '1rem' }}>
          Show Map
        </button>

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
        <button
          type="button"
          onClick={() => setShowPath(prev => !prev)}
          style={{ marginLeft: '1rem', marginTop: '1rem' }}
        >
          {showPath ? 'Hide Paths' : 'Show Paths'}
        </button>   
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error loading data</p>}

      {allLocations.length > 0 ? (
        <Map
          bounds={bounds}
          fitBoundsOptions={{ padding: 50 }}
          style={{ width: '100%', height: '500px' }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {families.map((fam, i) => {
            const color = colors[i % colors.length];
            const filteredObs = fam.observations.filter(obs => {
              const ts = new Date(obs.timestamp);
              return (!start || ts >= start) && (!end || ts <= end);
            });
            const filteredEvents = fam.events.filter(evt => {
              const ts = new Date(evt.timestamp);
              return (!start || ts >= start) && (!end || ts <= end);
            });

            const pathCoords = [...filteredObs, ...filteredEvents]
              .filter(l => isFinite(l.latitude) && isFinite(l.longitude))
              .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map(l => [l.longitude, l.latitude]);

            const pathGeoJson = {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: pathCoords
              }
            };

            return (
              <React.Fragment key={fam.id}>
                {filteredObs.map((obs, j) => (
                  <Marker
                    key={`obs-${fam.id}-${j}`}
                    latitude={obs.latitude}
                    longitude={obs.longitude}
                    anchor="bottom"
                  >
                    <div
                      onMouseEnter={() => setPopupInfo({ ...obs, type: 'Observation', name: fam.name })}
                      onMouseLeave={() => setPopupInfo(null)}
                      style={{
                        fontSize: '20px',
                        color,
                        cursor: 'pointer',
                        lineHeight: '1'
                      }}
                    >
                      ●
                    </div>
                  </Marker>
                ))}

                {filteredEvents.map((evt, j) => (
                  <Marker
                    key={`evt-${fam.id}-${j}`}
                    latitude={evt.latitude}
                    longitude={evt.longitude}
                    anchor="bottom"
                  >
                    <div
                      onMouseEnter={() => setPopupInfo({ ...evt, type: 'Event', name: fam.name })}
                      onMouseLeave={() => setPopupInfo(null)}
                      style={{
                        fontSize: '20px',
                        color,
                        cursor: 'pointer',
                        lineHeight: '1'
                      }}
                    >
                      ●
                    </div>
                  </Marker>
                ))}

                {showPath &&pathCoords.length > 1 && (
                  <Source id={`path-${fam.id}`} type="geojson" data={pathGeoJson}>
                    <Layer
                      id={`line-${fam.id}`}
                      type="line"
                      paint={{
                        'line-color': color,
                        'line-width': 2
                      }}
                    />
                  </Source>
                )}
              </React.Fragment>
            );
          })}

          {popupInfo && (
            <Popup
              longitude={popupInfo.longitude}
              latitude={popupInfo.latitude}
              anchor="top"
              closeButton={false}
              closeOnClick={false}
            >
              <div style={{ fontSize: '12px' }}>
                <strong>{popupInfo.name}</strong><br />
                Lat: {popupInfo.latitude}, Lng: {popupInfo.longitude}<br />
                {new Date(popupInfo.timestamp).toLocaleString()}
              </div>
            </Popup>
          )}
        </Map>
      ) : (
        !loading && <p>No locations found for this herd.</p>
      )}
    </div>
  );
}

export default HerdMap;