import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_ATHLETE } from '../../graphql/mutations';

function RegisterAthleteForm() {
  const [form, setForm] = useState({ username: '', teamName: '' });
  const [registerAthlete, { data, loading, error }] = useMutation(REGISTER_ATHLETE);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = {
        username: form.username,
        teamName: form.teamName.trim() === '' ? null : form.teamName
    };

    try {
      await registerAthlete({ variables });
      setForm({ username: '', teamName: '' });
    } catch (err) {
      // ApolloError will already be passed into `error`, no need to log here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
      <input name="teamName" placeholder="Team Name (optional)" value={form.teamName} onChange={handleChange} />
      <button type="submit">Register Athlete</button>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
      {data && <p style={{ color: 'green' }}>✅ Athlete "{data.registerAthlete.username}" registered with ID {data.registerAthlete.id}!</p>}
    </form>
  );
}

export default RegisterAthleteForm;