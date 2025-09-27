import os
import json
import time
import logging
import requests
import datetime

logging.basicConfig(
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S',
    format='[%(asctime)s] %(levelname)s: %(message)s'
)

required_fields = [
        "pm01", "pm02", "pm10",
        "pm01Standard", "pm02Standard", "pm10Standard",
        "pm003Count", "pm005Count", "pm01Count", "pm02Count",
        "atmp", "atmpCompensated",
        "rhum", "rhumCompensated",
        "pm02Compensated",
        "rco2",
        "tvocIndex", "tvocRaw",
        "noxIndex", "noxRaw",
        "boot", "bootCount", "wifi",
        "serialno", "firmware", "model",
    ]

class AirSync:
    def __init__(self, arduino_url: str, api_url: str, api_key: str, pending_file: str, interval: int):
        self.arduino_url = arduino_url
        self.api_url = api_url
        self.api_key = api_key
        self.interval = interval
        self.pending_file = pending_file
        
        self.headers = {
            'x-api-key': self.api_key,
            'Content-Type': 'application/json'
        }

        if not os.path.exists(self.pending_file):
            open(self.pending_file, 'w').close()

    def fetch_from_arduino(self) -> dict | None:
        """Fetch sensor data from Arduino."""
        try:
            response = requests.get(self.arduino_url, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logging.warning(f"Failed to fetch from Arduino: {e}")
            return None
        
    def is_valid_payload(self, payload: dict) -> bool:
        """Check if payload has the required fields for API."""
        return all(field in payload for field in required_fields)


    def add_timestamp(self, payload: dict) -> dict:
        """Add current datetime to payload."""
        payload["timestamp"] = datetime.datetime.now().isoformat()
        return payload

    def send_to_api(self, payloads: list) -> bool:
        """Send a list of payloads to the API."""
        try:
            response = requests.post(
                self.api_url,
                headers=self.headers,
                json=payloads,
                timeout=10
            )

            response.raise_for_status()
            logging.info(f"Payloads sent successfully: {payloads}")
            return True
        except Exception as e:
            logging.warning(f"Failed to send payloads to API: {e}")
            return False

    def save_pending(self, payload: dict):
        """Save a payload locally for future retry."""
        try:
            with open(self.pending_file, 'a') as file:
                file.write(json.dumps(payload) + '\n')
            logging.info("Saved payload locally due to failed send.")
        except Exception as e:
            logging.warning(f"Failed to save pending payload: {e}")

    def resend_pending(self):
        """Retry sending all previously unsent payloads."""
        if not os.path.exists(self.pending_file):
            return

        with open(self.pending_file, 'r') as file:
            lines = file.readlines()

        payloads_to_send = []

        for line in lines:
            try:
                payloads_to_send.append(json.loads(line.strip()))
            except Exception as e:
                logging.warning(f"Failed to parse unsent payload: {e}")

        if payloads_to_send:
            if self.send_to_api(payloads_to_send):
                logging.info("All previously unsent payloads sent successfully.")
                open(self.pending_file, 'w').close()
            else:
                logging.warning("Failed to resend unsent payloads. Keeping them for retry.")

    def run(self):
        """Start the main collector loop to fetch, send, and retry payloads."""
        logging.info("Starting AirSync loop...")

        while True:
            payload = self.fetch_from_arduino()

            if payload and self.is_valid_payload(payload):
                payload = self.add_timestamp(payload)
                if not self.send_to_api([payload]):
                    self.save_pending(payload)

            logging.info("AirSync cycle completed, checking pending payloads...")
            self.resend_pending()
            time.sleep(self.interval)