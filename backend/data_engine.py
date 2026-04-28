import random
import pandas as pd
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import List, Dict, Any

POLLUTANTS = ['PM2.5', 'PM10', 'O3', 'NO2', 'SO2', 'CO']
REGIONS = ['North Region', 'South Region', 'East Region', 'West Region']

class SensorData(BaseModel):
    timestamp: str
    region: str
    pollutant: str
    value: float
    rolling_avg: float
    is_anomaly: bool
    threshold: float

class DataEngine:
    def __init__(self):
        self.history = self._generate_historical_data()
    
    def _get_threshold(self, pollutant: str) -> float:
        thresholds = {
            'PM2.5': 35.0,
            'PM10': 50.0,
            'O3': 70.0,
            'NO2': 53.0,
            'SO2': 75.0,
            'CO': 9.0
        }
        return thresholds.get(pollutant, 50.0)

    def _generate_historical_data(self) -> pd.DataFrame:
        data = []
        now = datetime.now()
        for i in range(24 * 7): # Last 7 days, hourly
            ts = now - timedelta(hours=i)
            for region in REGIONS:
                for pol in POLLUTANTS:
                    base_val = self._get_threshold(pol) * 0.5
                    val = base_val + random.uniform(-base_val*0.3, base_val*0.6)
                    
                    # Induce some anomalies
                    is_anomaly = False
                    if random.random() < 0.05:
                        val *= random.uniform(1.5, 3.0)
                        is_anomaly = True
                        
                    data.append({
                        'timestamp': ts,
                        'region': region,
                        'pollutant': pol,
                        'value': val,
                        'is_anomaly': is_anomaly,
                        'threshold': self._get_threshold(pol)
                    })
        
        df = pd.DataFrame(data)
        df = df.sort_values('timestamp')
        
        # Calculate rolling averages per region and pollutant
        df['rolling_avg'] = df.groupby(['region', 'pollutant'])['value'].transform(lambda x: x.rolling(window=4, min_periods=1).mean())
        return df

    def get_latest_kpis(self) -> List[Dict[str, Any]]:
        # Get latest hour for each region and pollutant
        latest = self.history.loc[self.history.groupby(['region', 'pollutant'])['timestamp'].idxmax()]
        
        # Aggregate overall KPIs (avg rolling avg across regions)
        kpis = []
        for pol in POLLUTANTS:
            pol_data = latest[latest['pollutant'] == pol]
            avg_val = pol_data['rolling_avg'].mean()
            threshold = self._get_threshold(pol)
            status = 'Critical' if avg_val > threshold else ('Warning' if avg_val > threshold * 0.8 else 'Healthy')
            
            kpis.append({
                'pollutant': pol,
                'current_value': round(avg_val, 2),
                'threshold': threshold,
                'status': status,
                'trend': round(random.uniform(-5.0, 5.0), 1) # Mock trend %
            })
        return kpis

    def get_trends(self) -> Dict[str, Any]:
        # Return last 24 hours of data formatted for Recharts
        cutoff = datetime.now() - timedelta(hours=24)
        recent = self.history[self.history['timestamp'] >= cutoff]
        
        # Group by timestamp to create multi-line chart data
        grouped = recent.groupby('timestamp')
        chart_data = []
        for ts, group in grouped:
            entry = {'time': ts.strftime('%H:%M')}
            for _, row in group.iterrows():
                # We'll just provide overall average across regions for simplicity in the trend chart
                # or regional breakdown
                pass
                
        # Actually, let's aggregate by timestamp and pollutant (average across regions)
        agg = recent.groupby(['timestamp', 'pollutant'])['value'].mean().reset_index()
        pivot = agg.pivot(index='timestamp', columns='pollutant', values='value').reset_index()
        
        for _, row in pivot.iterrows():
            entry = {'time': row['timestamp'].strftime('%H:%M')}
            for pol in POLLUTANTS:
                entry[pol] = round(row[pol], 2)
            chart_data.append(entry)
            
        return chart_data

    def get_anomalies(self) -> List[Dict[str, Any]]:
        # Get recent anomalies
        cutoff = datetime.now() - timedelta(hours=24)
        recent = self.history[(self.history['timestamp'] >= cutoff) & (self.history['is_anomaly'] == True)]
        recent = recent.sort_values('timestamp', ascending=False).head(10)
        
        anomalies = []
        for _, row in recent.iterrows():
            anomalies.append({
                'id': str(random.randint(1000, 9999)),
                'timestamp': row['timestamp'].strftime('%Y-%m-%d %H:%M'),
                'region': row['region'],
                'pollutant': row['pollutant'],
                'value': round(row['value'], 2),
                'threshold': row['threshold']
            })
        return anomalies

    def get_regional_comparison(self) -> List[Dict[str, Any]]:
        latest = self.history.loc[self.history.groupby(['region', 'pollutant'])['timestamp'].idxmax()]
        
        data = []
        for region in REGIONS:
            reg_data = latest[latest['region'] == region]
            entry = {'region': region}
            total_aqi_proxy = 0
            for _, row in reg_data.iterrows():
                entry[row['pollutant']] = round(row['value'], 2)
                total_aqi_proxy += (row['value'] / row['threshold']) * 50 # Rough AQI proxy
            entry['AQI'] = round(total_aqi_proxy / len(POLLUTANTS), 0)
            data.append(entry)
            
        return data

engine = DataEngine()
