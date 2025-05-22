import React from 'react';
import RecordObservationForm from '../forms/RecordObservationForm';
import BackLink from '../common/BackLink';

function RecordObservationPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/ranger" label="Back to Ranger Portal" />
      <h2>Record Observation</h2>
      <RecordObservationForm />
    </div>
  );
}

export default RecordObservationPage;