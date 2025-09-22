# AirSync

AirSync is a Python script that periodically fetches sensor data from an Arduino (or similar device) and sends it to a backend API. Failed transmissions are saved locally and retried automatically.

## Requirements

- Python 3.10+
- `requests`
- `python-dotenv`
- FastAPI and uvicorn (for running the fake API)

Install dependencies:

```bash
pip install -r requirements.txt
```

## Running AirSync

```bash
python run.py
```

This will start the loop to fetch data from the Arduino, send it to the backend, and retry unsent payloads.

## Running Fake API

If you want to simulate Arduino data:

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Ensure a `fake_data` JSON file exists in the project root with sample Arduino data.
