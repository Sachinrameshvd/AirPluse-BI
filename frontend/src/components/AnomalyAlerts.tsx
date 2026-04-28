import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Anomaly {
  id: string;
  timestamp: string;
  region: string;
  pollutant: string;
  value: number;
  threshold: number;
}

const API_URL = 'http://localhost:8000/api';

export default function AnomalyAlerts() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/anomalies`)
      .then(res => res.json())
      .then(data => setAnomalies(data))
      .catch(err => console.error(err));
  }, []);

  if (anomalies.length === 0) return null;

  return (
    <div style={{
      background: 'rgba(255, 42, 42, 0.05)',
      border: '1px solid var(--status-critical)',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 0 20px rgba(255, 42, 42, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--status-critical)' }}>
        <AlertTriangle size={20} className="animate-pulse-critical" />
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Recent Anomalies</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
        {anomalies.map(anomaly => (
          <div key={anomaly.id} style={{
            background: 'var(--bg-panel)',
            padding: '12px',
            borderRadius: '8px',
            borderLeft: '4px solid var(--status-critical)',
            fontSize: '0.875rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-secondary)' }}>
              <span>{anomaly.region}</span>
              <span>{anomaly.timestamp.split(' ')[1]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{anomaly.pollutant} Spike:</span>
              <span style={{ color: 'var(--status-critical)', fontWeight: 700 }}>{anomaly.value}</span>
              <span style={{ color: 'var(--text-muted)' }}>(Threshold: {anomaly.threshold})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
