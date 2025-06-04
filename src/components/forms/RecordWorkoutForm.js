import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RECORD_WORKOUT } from '../../graphql/mutations';

function RecordWorkoutForm() {
  const [form, setForm] = useState({
    username: '',
    workoutType: '',
    duration: '',
    distance: '',
    latitude: '',
    longitude: '',
    intensity: ''
  });

  const [recordWorkout, { data, loading, error }] = useMutation(RECORD_WORKOUT);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordWorkout({
        variables: {
          username: form.username,
          workoutType: form.workoutType,
          duration: parseInt(form.duration),
          distance: parseFloat(form.distance),
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
          intensity: parseInt(form.intensity)
        }
      });
      setForm({username: '', workoutType: '', duration: '', distance: '', latitude: '', longitude: '', intensity: '' });
    } catch (err) {
      // Apollo error already handled via `error` object
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="workoutType" placeholder="Workout Type" value={form.workoutType} onChange={handleChange} />
      <input name="duration" placeholder="Duration (minutes)" value={form.duration} onChange={handleChange} />
      <input name="distance" placeholder="Distance (miles)" value={form.distance} onChange={handleChange} />
      <input name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
      <input name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
      <input name="intensity" placeholder="Intensity (1–10) (optional)" value={form.intensity} onChange={handleChange} />
      <button type="submit">Record Workout</button>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
      {data && <p style={{ color: 'green' }}>✅ Workout recorded!</p>}
    </form>
  );
}

export default RecordWorkoutForm;