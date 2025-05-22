import React from 'react';
import RegisterHerdForm from '../forms/RegisterHerdForm';
import BackLink from '../common/BackLink';

function RegisterHerdPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/ranger" label="Back to Ranger Portal" />
      <h2>Register Herd</h2>
      <RegisterHerdForm />
    </div>
  );
}

export default RegisterHerdPage;