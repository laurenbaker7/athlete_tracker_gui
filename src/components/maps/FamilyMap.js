import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Map, Marker, Popup, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import BackLink from '../common/BackLink';
import { GET_FAMILY_LOCATIONS } from '../../graphql/queries';

function FamilyMap() {
  const [familyId, setFamilyId] = useState('1');
  const [popupInfo, setPopupInfo] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showPath, setShowPath] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_FAMILY_LOCATIONS, {
    variables: { id: parseInt(familyId) }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = parseInt(familyId);
    if (!isNaN(id)) {
      refetch({ id });
    }
  };

  const observations = data?.family?.observations || [];
  const events = data?.family?.events || [];

  const start = startDate
    ? new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
    : null;

  const end = endDate
    ? new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
    : null;

  const filteredObservations = observations.filter(obs => {
    const ts = new Date(obs.timestamp);
    return (!start || ts >= start) && (!end || ts <= end);
  });

  const filteredEvents = events.filter(evt => {
    const ts = new Date(evt.timestamp);
    return (!start || ts >= start) && (!end || ts <= end);
  });

  const allLocations = [...filteredObservations, ...filteredEvents].filter(
    loc => isFinite(loc.latitude) && isFinite(loc.longitude)
  );

  const pathCoordinates = [...filteredObservations, ...filteredEvents]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map(loc => [loc.longitude, loc.latitude]);

  const pathGeoJson = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: pathCoordinates
    }
  };

  const bounds = useMemo(() => {
    if (allLocations.length === 0) return null;
  
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
  
    allLocations.forEach(({ longitude, latitude }) => {
      if (longitude < minLng) minLng = longitude;
      if (longitude > maxLng) maxLng = longitude;
      if (latitude < minLat) minLat = latitude;
      if (latitude > maxLat) maxLat = latitude;
    });
  
    return [
      [minLng, minLat],
      [maxLng, maxLat]
    ];
  }, [allLocations]);
  

  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/" label="Back to Maps" />
      <h1>Family Movement Map</h1>
  
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          Family ID:
          <input
            type="text"
            value={familyId}
            onChange={(e) => setFamilyId(e.target.value)}
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
          {showPath ? 'Hide Path' : 'Show Path'}
        </button>
      </form>
  
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error loading data</p>}
  
      {allLocations.length > 0 ? (
        <Map
          bounds={bounds}
          fitBoundsOptions={{ padding: 40 }}
          style={{ width: '100%', height: '500px' }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {filteredObservations.map((obs, i) => (
            <Marker
              key={`obs-${i}`}
              latitude={obs.latitude}
              longitude={obs.longitude}
              anchor="bottom"
            >
              <div
                onMouseEnter={() => setPopupInfo({ ...obs, type: 'Observation' })}
                onMouseLeave={() => setPopupInfo(null)}
                style={{
                  fontSize: '24px',
                  color: 'blue',
                  cursor: 'pointer',
                  lineHeight: '1'
                }}
              >
                ●
              </div>
            </Marker>
          ))}
  
          {filteredEvents.map((evt, i) => (
            <Marker
              key={`evt-${i}`}
              latitude={evt.latitude}
              longitude={evt.longitude}
              anchor="bottom"
            >
              <div
                onMouseEnter={() => setPopupInfo({ ...evt, type: 'Event' })}
                onMouseLeave={() => setPopupInfo(null)}
                style={{
                  fontSize: '24px',
                  color: 'orange',
                  cursor: 'pointer',
                  lineHeight: '1'
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
                <strong>{popupInfo.type}</strong>
                <br />
                {new Date(popupInfo.timestamp).toLocaleString()}
              </div>
            </Popup>
          )}
  
          {showPath && pathCoordinates.length > 1 && (
            <Source id="path" type="geojson" data={pathGeoJson}>
              <Layer
                id="line"
                type="line"
                paint={{
                  'line-color': '#1e90ff',
                  'line-width': 3
                }}
              />
            </Source>
          )}
        </Map>
      ) : (
        !loading && <p>No locations found for this family.</p>
      )}
    </div>
  );  
}

export default FamilyMap;