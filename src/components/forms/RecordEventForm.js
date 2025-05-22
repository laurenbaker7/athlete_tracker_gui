import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RECORD_EVENT } from '../../graphql/mutations';

function RecordEventForm() {
  const [form, setForm] = useState({
    familyId: '',
    latitude: '',
    longitude: '',
    description: ''
  });

  const [recordEvent, { data, loading, error }] = useMutation(RECORD_EVENT);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordEvent({
        variables: {
          familyId: parseInt(form.familyId),
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          description: form.description
        }
      });
      setForm({ familyId: '', latitude: '', longitude: '', description: '' });
    } catch (err) {
      // Apollo error already handled via `error` object
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="familyId" placeholder="Family ID" value={form.familyId} onChange={handleChange} />
      <input name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
      <input name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">Record Event</button>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
      {data && <p style={{ color: 'green' }}>✅ Event recorded!</p>}
    </form>
  );
}

export default RecordEventForm;