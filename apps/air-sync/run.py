import os

from dotenv import load_dotenv
from main import AirSync

load_dotenv()

API_URL = os.getenv("API_URL")
API_KEY = os.getenv("API_KEY")
ARDUINO_URL = os.getenv("ARDUINO_URL")
PENDING_FILE = os.getenv("PENDING_FILE")
INTERVAL = int(os.getenv("INTERVAL", "300"))

air_sync = AirSync(ARDUINO_URL, API_URL, API_KEY, PENDING_FILE, INTERVAL)
air_sync.run()