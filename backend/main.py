from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_engine import engine

app = FastAPI(title="AirPulse BI API")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/kpis")
def get_kpis():
    return engine.get_latest_kpis()

@app.get("/api/trends")
def get_trends():
    return engine.get_trends()

@app.get("/api/anomalies")
def get_anomalies():
    return engine.get_anomalies()

@app.get("/api/regions")
def get_regional_comparison():
    return engine.get_regional_comparison()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
