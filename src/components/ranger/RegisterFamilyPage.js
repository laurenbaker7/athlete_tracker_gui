import React from 'react';
import RegisterFamilyForm from '../forms/RegisterFamilyForm';
import BackLink from '../common/BackLink';

function RegisterFamilyPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/ranger" label="Back to Ranger Portal" />
      <h2>Register Family</h2>
      <RegisterFamilyForm />
    </div>
  );
}

export default RegisterFamilyPage;