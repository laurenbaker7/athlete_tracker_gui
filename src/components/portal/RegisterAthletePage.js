import React from 'react';
import RegisterAthleteForm from '../forms/RegisterAthleteForm';
import BackLink from '../common/BackLink';

function RegisterAthletePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/portal" label="Back to Athlete Portal" />
      <h2>Register Athlete</h2>
      <RegisterAthleteForm />
    </div>
  );
}

export default RegisterAthletePage;