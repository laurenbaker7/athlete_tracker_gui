import React from 'react';
import RecordWorkoutForm from '../forms/RecordWorkoutForm';
import BackLink from '../common/BackLink';

function RecordWorkoutPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <BackLink to="/portal" label="Back to Athlete Portal" />
      <h2>Record Workout</h2>
      <RecordWorkoutForm />
    </div>
  );
}

export default RecordWorkoutPage;