import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './components/Home';
import HerdMap from './components/maps/HerdMap';
import FamilyMap from './components/maps/FamilyMap';
import NearbyEventsMap from './components/maps/NearbyEventsMap';
import NearbyFamiliesMap from './components/maps/NearbyFamiliesMap';
import FamilyStats from './components/charts/FamilyStats';
import RangerPortal from './components/RangerPortal';
import RegisterHerdPage from './components/ranger/RegisterHerdPage';
import RegisterFamilyPage from './components/ranger/RegisterFamilyPage';
import RecordObservationPage from './components/ranger/RecordObservationPage';
import RecordEventPage from './components/ranger/RecordEventPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/herd-map" element={<HerdMap />} />
        <Route path="/family-map" element={<FamilyMap />} />
        <Route path="/nearby-events" element={<NearbyEventsMap />} />
        <Route path="/nearby-families" element={<NearbyFamiliesMap />} />
        <Route path="/family-stats" element={<FamilyStats />} />
        <Route path="/ranger" element={<RangerPortal />} />
        <Route path="/ranger/register-herd" element={<RegisterHerdPage />} />
        <Route path="/ranger/register-family" element={<RegisterFamilyPage />} />
        <Route path="/ranger/record-observation" element={<RecordObservationPage />} />
        <Route path="/ranger/record-event" element={<RecordEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;