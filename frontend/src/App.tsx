import { useState } from 'react';
import { Activity, BarChart2, AlertTriangle, Wind } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Drilldown from './components/Drilldown';
import AnomalyAlerts from './components/AnomalyAlerts';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <Wind size={32} color="var(--accent-cyan)" />
          <h1 style={{ fontSize: '1.5rem', margin: 0 }} className="heading-gradient">AirPulse BI</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              background: activeTab === 'dashboard' ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: 'none', borderRadius: '8px', color: activeTab === 'dashboard' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer', textAlign: 'left', fontSize: '1rem', transition: 'all 0.2s'
            }}
          >
            <Activity size={20} color={activeTab === 'dashboard' ? 'var(--accent-cyan)' : 'currentColor'} />
            Executive Summary
          </button>
          
          <button
            onClick={() => setActiveTab('drilldown')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              background: activeTab === 'drilldown' ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: 'none', borderRadius: '8px', color: activeTab === 'drilldown' ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer', textAlign: 'left', fontSize: '1rem', transition: 'all 0.2s'
            }}
          >
            <BarChart2 size={20} color={activeTab === 'drilldown' ? 'var(--accent-cyan)' : 'currentColor'} />
            Trend Drilldown
          </button>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <AnomalyAlerts />
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 className="heading-gradient">
              {activeTab === 'dashboard' ? 'Global Control Tower' : 'Detailed Analytics'}
            </h1>
            <h2>Real-time air quality monitoring & anomaly detection</h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-panel)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-glass)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 10px var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>System Active • Live Sync</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'drilldown' && <Drilldown />}
      </main>
    </div>
  );
}

export default App;
