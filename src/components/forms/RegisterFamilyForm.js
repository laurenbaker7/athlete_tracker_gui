import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_FAMILY } from '../../graphql/mutations';

function RegisterFamilyForm() {
  const [form, setForm] = useState({ name: '', species: '', herdId: '' });
  const [registerFamily, { data, loading, error }] = useMutation(REGISTER_FAMILY);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerFamily({
        variables: { ...form, herdId: parseInt(form.herdId) }
      });
      setForm({ name: '', species: '', herdId: '' });
    } catch (err) {
      // ApolloError will already be passed into `error`, no need to log here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Family Name" value={form.name} onChange={handleChange} />
      <input name="species" placeholder="Species" value={form.species} onChange={handleChange} />
      <input name="herdId" type="number" placeholder="Herd ID" value={form.herdId} onChange={handleChange} />
      <button type="submit">Register Family</button>
      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error.message}</p>}
      {data && <p style={{ color: 'green' }}>✅ Family "{data.registerFamily.name}" registered!</p>}
    </form>
  );
}

export default RegisterFamilyForm;