import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RECORD_OBSERVATION } from '../../graphql/mutations';

function RecordObservationForm() {
  const [form, setForm] = useState({
    familyId: '',
    latitude: '',
    longitude: '',
    size: '',
    healthRating: ''
  });

  const [recordObservation, { data, loading, error }] = useMutation(RECORD_OBSERVATION);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordObservation({
        variables: {
          familyId: parseInt(form.familyId),
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          size: parseInt(form.size),
          healthRating: parseInt(form.healthRating)
        }
      });
      setForm({ familyId: '', latitude: '', longitude: '', size: '', healthRating: '' });
    } catch (err) {
      // Apollo error already handled via `error` object
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="familyId" placeholder="Family ID" value={form.familyId} onChange={handleChange} />
      <input name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
      <input name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
      <input name="size" placeholder="Size" value={form.size} onChange={handleChange} />
      <input name="healthRating" placeholder="Health Rating (1–10)" value={form.healthRating} onChange={handleChange} />
      <button type="submit">Record Observation</button>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
      {data && <p style={{ color: 'green' }}>✅ Observation recorded!</p>}
    </form>
  );
}

export default RecordObservationForm;