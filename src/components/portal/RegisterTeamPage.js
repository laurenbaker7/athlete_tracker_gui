import React from 'react';
import RegisterTeamForm from '../forms/RegisterTeamForm';
import BackLink from '../common/BackLink';

function RegisterTeamPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/portal" label="Back to Athlete Portal" />
      <h2>Register Team</h2>
      <RegisterTeamForm />
    </div>
  );
}

export default RegisterTeamPage;