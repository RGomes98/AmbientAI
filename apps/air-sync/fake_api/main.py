from fastapi import FastAPI
from pathlib import Path
import random
import json

app = FastAPI(title="Mock Arduino API")
json_file = Path("fake_data.json")

if not json_file.exists():
    raise FileNotFoundError("Mock data file missing. Provide a valid JSON with sample data.")

with json_file.open("r") as f:
    mock_data = json.load(f)

@app.get("/get-metrics")
def get_metrics():
    """
    Return a random record from the mock JSON as if it were coming from the local Arduino.
    """
    payload = random.choice(mock_data)
    return payload
