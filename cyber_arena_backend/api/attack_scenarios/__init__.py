from fastapi import APIRouter

router = APIRouter()

@router.get("/scenario")
async def get_scenario():
    # Endpoint to get attack scenarios
    return {"scenario": "Sample scenario"}

@router.post("/create")
async def create_scenario(scenario_data: dict):
    # Endpoint to create a new attack scenario
    return {"status": "Scenario created", "scenario": scenario_data}

@router.delete("/delete")
async def delete_scenario(scenario_id: int):
    # Endpoint to delete an attack scenario
    return {"status": f"Scenario {scenario_id} deleted"} 