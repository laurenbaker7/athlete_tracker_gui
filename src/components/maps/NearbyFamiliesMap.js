import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Map, Marker, Popup, Source, Layer } from 'react-map-gl';
import { circle as turfCircle, bbox as turfBbox } from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import BackLink from '../common/BackLink';
import { GET_FAMILIES_NEAR_LOCATION } from '../../graphql/queries';

function NearbyFamiliesMap() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState('10');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [queryParams, setQueryParams] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const { data, loading, error } = useQuery(GET_FAMILIES_NEAR_LOCATION, {
    variables: queryParams,
    skip: !queryParams,
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
        endTime: endDate ? new Date(endDate).toISOString() : null,
      });
    }
  };

  const families = useMemo(() => data?.familiesNearby || [], [data]);

  // Assign a unique color to each family
  const colors = useMemo(() => {
    const palette = [
      'hsl(0, 70%, 50%)', 'hsl(36, 70%, 50%)', 'hsl(72, 70%, 50%)',
      'hsl(108, 70%, 50%)', 'hsl(144, 70%, 50%)', 'hsl(180, 70%, 50%)',
      'hsl(216, 70%, 50%)', 'hsl(252, 70%, 50%)', 'hsl(288, 70%, 50%)',
      'hsl(324, 70%, 50%)'
    ];
    const map = {};
    families.forEach((f, i) => map[f.id] = palette[i % palette.length]);
    return map;
  }, [families]);

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
      <h1>Nearby Families Map</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <label>
          Latitude:
          <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} style={{ marginLeft: '0.5rem', marginRight: '1rem' }} />
        </label>
        <label>
          Longitude:
          <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} style={{ marginLeft: '0.5rem', marginRight: '1rem' }} />
        </label>
        <label>
          Radius (miles):
          <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} style={{ marginLeft: '0.5rem', marginRight: '1rem' }} />
        </label>
        <br />
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ marginLeft: '0.5rem', marginRight: '1rem' }} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ marginLeft: '0.5rem', marginRight: '1rem' }} />
        </label>
        <br />
        <button type="submit" style={{ marginTop: '1rem' }}>Show Families</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error loading data.</p>}

      {queryParams && (
        <>
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
                  id="radius-fill"
                  type="fill"
                  paint={{ 'fill-color': '#0080ff', 'fill-opacity': 0.1 }}
                />
                <Layer
                  id="radius-outline"
                  type="line"
                  paint={{ 'line-color': '#0080ff', 'line-width': 2 }}
                />
              </Source>
            )}

            {families.map(family => (
              <>
                {(family.observations || []).map((obs, i) => (
                  <Marker
                    key={`obs-${family.id}-${i}`}
                    latitude={obs.latitude}
                    longitude={obs.longitude}
                    anchor="bottom"
                  >
                    <div
                      onMouseEnter={() => setPopupInfo({ ...obs, name: family.name })}
                      onMouseLeave={() => setPopupInfo(null)}
                      style={{
                        fontSize: '20px',
                        color: colors[family.id] || 'blue',
                        cursor: 'pointer',
                        lineHeight: '1'
                      }}
                    >
                      ●
                    </div>
                  </Marker>
                ))}
                {(family.events || []).map((evt, i) => (
                  <Marker
                    key={`evt-${family.id}-${i}`}
                    latitude={evt.latitude}
                    longitude={evt.longitude}
                    anchor="bottom"
                  >
                    <div
                      onMouseEnter={() => setPopupInfo({ ...evt, name: family.name })}
                      onMouseLeave={() => setPopupInfo(null)}
                      style={{
                        fontSize: '20px',
                        color: colors[family.id] || 'orange',
                        cursor: 'pointer',
                        lineHeight: '1'
                      }}
                    >
                      ●
                    </div>
                  </Marker>
                ))}
              </>
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
                  <strong>{popupInfo.name}</strong><br />
                  Lat: {popupInfo.latitude.toFixed(4)}<br />
                  Lng: {popupInfo.longitude.toFixed(4)}<br />
                  {new Date(popupInfo.timestamp).toLocaleString()}
                </div>
              </Popup>
            )}
          </Map>

          {families.length > 0 ? (
            <p>Families with activity nearby: {families.length}</p>
          ) : (
            !loading && <p>No family observations or events found in this area.</p>
          )}
        </>
      )}
    </div>
  );
}

export default NearbyFamiliesMap;