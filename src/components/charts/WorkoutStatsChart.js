import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

function WorkoutStatsChart({ workouts }) {
  const chartData = workouts.map((w) => ({
    date: new Date(w.timestamp).toLocaleDateString(),
    distance: w.distance,
    pace: w.distance > 0 ? +(w.duration / w.distance).toFixed(2) : null,
  }));

  return (
    <div style={{ paddingTop: '1rem' }}>
      {/* Distance Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>📏 Distance Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Miles', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#8884d8" name="Distance" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pace Chart */}
      <div>
        <h3>🏃 Pace Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Min per mile', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pace" stroke="#82ca9d" name="Pace" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WorkoutStatsChart;