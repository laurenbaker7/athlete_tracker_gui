import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RECORD_EVENT } from '../../graphql/mutations';

function RecordEventForm() {
  const [form, setForm] = useState({
    username: '',
    description: '',
    latitude: '',
    longitude: '',
    teamName: ''
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
          username: form.username,
          description: form.description,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          teamName: form.teamName.trim() === '' ? null : form.teamName
        }
      });
      setForm({ username: '', latitude: '', longitude: '', description: '', teamName: '' });
    } catch (err) {
      // Apollo error already handled via `error` object
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
      <input name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
      <input name="teamName" placeholder="Team Name (optional)" value={form.teamName} onChange={handleChange} />
      <button type="submit">Record Event</button>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
      {data && <p style={{ color: 'green' }}>✅ Event recorded!</p>}
    </form>
  );
}

export default RecordEventForm;