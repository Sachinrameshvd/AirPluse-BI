import { useState, useEffect } from 'react';

interface KPI {
  pollutant: string;
  current_value: number;
  threshold: number;
  status: 'Healthy' | 'Warning' | 'Critical';
  trend: number;
}

interface RegionData {
  region: string;
  AQI: number;
  [key: string]: any;
}

const API_URL = 'http://localhost:8000/api';

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [regions, setRegions] = useState<RegionData[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/kpis`)
      .then(res => res.json())
      .then(data => setKpis(data))
      .catch(err => console.error("Error fetching KPIs", err));
      
    fetch(`${API_URL}/regions`)
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error("Error fetching regions", err));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'var(--status-critical)';
      case 'Warning': return 'var(--status-warning)';
      default: return 'var(--status-healthy)';
    }
  };

  return (
    <div>
      <h2 style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Key Performance Indicators (Rolling Averages)</h2>
      <div className="dashboard-grid">
        {kpis.map(kpi => (
          <div key={kpi.pollutant} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{kpi.pollutant}</span>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '0.75rem', 
                fontWeight: 600,
                background: `${getStatusColor(kpi.status)}20`,
                color: getStatusColor(kpi.status),
                border: `1px solid ${getStatusColor(kpi.status)}`
              }}>
                {kpi.status}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '12px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {kpi.current_value}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                / {kpi.threshold}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '16px' }}>
              <span style={{ 
                color: kpi.trend > 0 ? 'var(--status-critical)' : 'var(--status-healthy)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {kpi.trend > 0 ? '↗' : '↘'} {Math.abs(kpi.trend)}%
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>vs last 24h</span>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ color: 'var(--text-secondary)', marginTop: '40px', marginBottom: '16px' }}>Regional Air Quality Index (AQI Proxy)</h2>
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {regions.map(reg => (
          <div key={reg.region} className="glass-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{reg.region}</h3>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              border: `4px solid ${reg.AQI > 100 ? 'var(--status-critical)' : (reg.AQI > 50 ? 'var(--status-warning)' : 'var(--status-healthy)')}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 20px ${reg.AQI > 100 ? 'rgba(255,42,42,0.2)' : 'rgba(0,255,157,0.2)'}`
            }}>
              <span style={{ fontSize: '2rem', fontWeight: 700 }}>{reg.AQI}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
