import React from 'react';
import RecordEventForm from '../forms/RecordEventForm';
import BackLink from '../common/BackLink';

function RecordEventPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/ranger" label="Back to Ranger Portal" />
      <h2>Record Event</h2>
      <RecordEventForm />
    </div>
  );
}

export default RecordEventPage;