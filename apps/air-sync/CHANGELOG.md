# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0]

### Added

- Initial implementation of AirSync Python script.
- Fetch data from Arduino or compatible sensor endpoint.
- Send payloads to backend API with API key authentication.
- Store pending payloads locally if sending fails.
- Automatic retry of unsent payloads.
- Timestamping of payloads before sending.
- Configurable data collection interval via `.env`.
- Logging for successful and failed API transmissions.
- Simple Fake API using FastAPI to simulate Arduino metrics.
- `.env` configuration support.
