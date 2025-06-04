import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './components/Home';
import NearbyEventsMap from './components/maps/NearbyEventsMap';
import NearbyWorkoutsMap from './components/maps/NearbyWorkoutsMap';
import AthletePortal from './components/AthletePortal';
import RecordEventPage from './components/portal/RecordEventPage';
import RegisterTeamPage from './components/portal/RegisterTeamPage';
import RegisterAthletePage from './components/portal/RegisterAthletePage';
import RecordWorkoutPage from './components/portal/RecordWorkoutPage';
import WorkoutsMap from './components/maps/WorkoutsMap';
import WorkoutStats from './components/charts/WorkoutStats';
import TeamMap from './components/maps/TeamMap';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts-map" element={<WorkoutsMap />} />
        <Route path="/team-map" element={<TeamMap />} />
        <Route path="/nearby-events" element={<NearbyEventsMap />} />
        <Route path="/nearby-workouts" element={<NearbyWorkoutsMap />} />
        <Route path="/workout-stats" element={<WorkoutStats />} />  
        <Route path="/portal" element={<AthletePortal />} />
        <Route path="/portal/register-team" element={<RegisterTeamPage />} />
        <Route path="/portal/register-athlete" element={<RegisterAthletePage />} />
        <Route path="/portal/record-workout" element={<RecordWorkoutPage />} />
        <Route path="/portal/record-event" element={<RecordEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;