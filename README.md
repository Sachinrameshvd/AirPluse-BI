<div align="center">
  <img src="https://raw.githubusercontent.com/Sachinrameshvd/AirPluse-BI/main/dashboard_preview.png" alt="AirPulse BI" width="800"/>
  <h1>AirPulse BI</h1>
  <p><strong>Premium AI-Powered Air Quality Control Tower</strong></p>
</div>

<br/>

## 🚀 Overview

AirPulse BI is an end-to-end data intelligence platform engineered to ingest, process, and visualize real-time air quality metrics. It seamlessly connects a highly optimized **Python/FastAPI** extraction layer with a state-of-the-art **React/Vite** frontend dashboard featuring a striking **"Cyber-Obsidian"** design aesthetic.

This project evolved from a traditional Power BI reporting solution into a custom-built, interactive web application tailored for real-time anomaly detection and non-technical stakeholder drilldowns.

## ✨ Key Features

- **Global Control Tower**: Top-level Key Performance Indicators (KPIs) rendering 6 primary pollutants (PM2.5, PM10, O3, NO2, SO2, CO) with dynamic rolling averages.
- **Real-Time Anomaly Detection**: An automated engine running in the background flags anomalous sensor readings when thresholds are breached, displaying alerts instantly.
- **Detailed Analytics**: Interactive 24-hour pollutant trend lines and regional comparative bar charts powered by `Recharts`.
- **Cyber-Obsidian UI**: Custom-built design system leveraging Vanilla CSS for maximum flexibility, featuring glassmorphism effects, neon accents, and micro-animations.

## 🛠️ Technology Stack

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | React, Vite, TypeScript, Recharts, Lucide-React, Vanilla CSS |
| **Backend** | Python, FastAPI, Uvicorn, Pandas, Numpy, Pydantic |

## ⚙️ How to Run Locally

To run this project, you will need to start both the Python backend and the React frontend concurrently.

### 1. Start the Data Engine (Backend)

Open a terminal and navigate to the `backend` folder:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload
```
*Server runs on `http://localhost:8000`*

### 2. Start the Control Tower (Frontend)

Open a **second** terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install

# Start the Vite development server
npm run dev
```
*Application runs on `http://localhost:5173`*

---
<div align="center">
  <i>Engineered for the Top 1% of Data Intelligence Standards</i>
</div>
