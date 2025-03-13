from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.red_team import router as red_team_router
from api.blue_team import router as blue_team_router
from api.attack_scenarios import router as attack_scenarios_router
from api.analytics import router as analytics_router

app = FastAPI()

app.include_router(red_team_router, prefix="/red_team")
app.include_router(blue_team_router, prefix="/blue_team")
app.include_router(attack_scenarios_router, prefix="/attack_scenarios")
app.include_router(analytics_router, prefix="/analytics")

frontend_path = "../frontend"
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.get("/api")
async def root():
    return {"message": "Welcome to Ares Cyber Arena"}
