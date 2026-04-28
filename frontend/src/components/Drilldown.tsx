import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const API_URL = 'http://localhost:8000/api';

export default function Drilldown() {
  const [trends, setTrends] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/trends`)
      .then(res => res.json())
      .then(data => setTrends(data))
      .catch(err => console.error(err));

    fetch(`${API_URL}/regions`)
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error(err));
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'var(--bg-panel)',
          border: '1px solid var(--border-glass)',
          padding: '12px',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.name} style={{ color: entry.color, display: 'flex', gap: '8px', marginBottom: '4px' }}>
              <span>{entry.name}:</span>
              <span style={{ fontWeight: 600 }}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>24-Hour Pollutant Trends (Averaged)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
            <XAxis dataKey="time" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="PM2.5" stroke="var(--accent-cyan)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="PM10" stroke="var(--accent-purple)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="O3" stroke="var(--accent-emerald)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="NO2" stroke="var(--accent-amber)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="SO2" stroke="var(--accent-crimson)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="CO" stroke="#fff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-panel" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>Regional Pollutant Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={regions} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" />
            <XAxis dataKey="region" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="PM2.5" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="PM10" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="NO2" fill="var(--accent-amber)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  );
}
