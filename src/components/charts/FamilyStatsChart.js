import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

function FamilyStatsChart({ observations, startDate, endDate }) {
  const filtered = observations.filter(obs => {
    const ts = new Date(obs.timestamp);
    const start = startDate
      ? new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
      : null;
    const end = endDate
      ? new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
      : null;

    return (!start || ts >= start) && (!end || ts <= end);
  });

  const data = filtered.map(obs => ({
    date: new Date(obs.timestamp).toLocaleDateString(),
    size: obs.size,
    health: obs.healthRating
  }));

  return (
    <div style={{ paddingTop: '1rem' }}>
      {/* Size Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>👥 Size Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="size" stroke="#8884d8" name="Size" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Health Chart */}
      <div>
        <h3>💓 Health Rating Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="health" stroke="#82ca9d" name="Health Rating" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FamilyStatsChart;