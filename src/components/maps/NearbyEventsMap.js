import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Map, Marker, Popup, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import BackLink from '../common/BackLink';
import { GET_NEARBY_EVENTS } from '../../graphql/queries';
import { circle as turfCircle, bbox as turfBbox } from '@turf/turf';

function NearbyEventsMap() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState('10');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [queryParams, setQueryParams] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const { data, loading, error } = useQuery(GET_NEARBY_EVENTS, {
    variables: queryParams,
    skip: !queryParams
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    const parsedRadius = parseFloat(radius);
    if (!isNaN(parsedLat) && !isNaN(parsedLng) && !isNaN(parsedRadius)) {
      setQueryParams({
        latitude: parsedLat,
        longitude: parsedLng,
        radiusMiles: parsedRadius,
        startTime: startDate ? new Date(startDate).toISOString() : null,
        endTime: endDate ? new Date(endDate).toISOString() : null
      });
    }
  };

  const events = data?.eventsNearby || [];

  const radiusCircle = queryParams
    ? turfCircle([queryParams.longitude, queryParams.latitude], queryParams.radiusMiles, {
        steps: 64,
        units: 'miles'
      })
    : null;

  const bounds = radiusCircle ? turfBbox(radiusCircle) : null;

  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/" label="Back to Maps" />
      <h1>Nearby Events Map</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          Latitude:
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          Longitude:
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <label>
          Radius (miles):
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <br />
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
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Show Events
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error loading events.</p>}

      {queryParams && (
        <Map
          key={JSON.stringify(queryParams)}
          bounds={bounds}
          fitBoundsOptions={{ padding: 40 }}
          style={{ width: '100%', height: '500px' }}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {radiusCircle && (
            <Source id="search-radius" type="geojson" data={radiusCircle}>
              <Layer
                id="search-radius-fill"
                type="fill"
                paint={{
                  'fill-color': '#0080ff',
                  'fill-opacity': 0.1
                }}
              />
              <Layer
                id="search-radius-outline"
                type="line"
                paint={{
                  'line-color': '#0080ff',
                  'line-width': 2
                }}
              />
            </Source>
          )}

          {events.map((event, i) => (
            <Marker
              key={i}
              latitude={event.latitude}
              longitude={event.longitude}
              anchor="bottom"
            >
              <div
                onMouseEnter={() => setPopupInfo(event)}
                onMouseLeave={() => setPopupInfo(null)}
                style={{
                  fontSize: '20px',
                  color: '#d62728',
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
                <strong>
                  {popupInfo.username}
                  {popupInfo.teamName ? ` (${popupInfo.teamName})` : ''}
                </strong>
                <br />
                {popupInfo.description && <>{popupInfo.description}<br /></>}
                Lat: {popupInfo.latitude}<br />
                Lng: {popupInfo.longitude}<br />
                {new Date(popupInfo.timestamp).toLocaleString()}
              </div>
            </Popup>
          )}
        </Map>
      )}

      {queryParams && !loading && (
        events.length > 0 ? (
          <p>Events found nearby: {events.length}</p>
        ) : (
          <p>No events found in this area.</p>
        )
      )}
    </div>
  );
}

export default NearbyEventsMap;