# Supply Chain Logistics & Driver Platform

**CMSC 495 Computer Science Capstone — Final Integrated Prototype**

This project demonstrates an integrated supply-chain logistics prototype for fleet dispatch operations. It combines browser-based shipment and driver visibility, a Node.js/Express REST API, a Python predictive ETA simulator, automated API integration tests, a GitHub Actions continuous-integration pipeline, and a PostgreSQL persistence design.

## Project Goal

Dispatchers need timely visibility when delivery conditions change. The prototype demonstrates an end-to-end workflow in which simulated traffic and weather conditions influence a shipment ETA, the Python component sends the updated telemetry to the Node API, and the updated ETA becomes visible in the shipment dashboard.

## Implemented Features

- Browser-based shipment dashboard.
- Browser-based driver dashboard.
- REST API for health, driver, and shipment operations.
- Predictive ETA adjustments using simulated traffic and weather inputs.
- Python-to-Node telemetry updates through HTTP PUT requests.
- Five automated V2 API integration checks.
- GitHub Actions CI pipeline for repeatable integration verification.
- PostgreSQL schema and seed data for the planned persistence layer.

## Current Architecture

```text
Dispatcher / Browser
        |
        v
Node.js / Express REST API <---- Python Predictive ETA Simulator
        |                              |
        |                              +-- simulated traffic/weather
        v
In-memory shipment and driver data

Planned persistence layer:
PostgreSQL schema + seed data (not live-connected in the current prototype)
```

### Predictive ETA Scope

The current predictive component is a **heuristic simulator**, not a trained machine-learning model. It generates traffic-delay and weather-severity values, calculates an adjusted ETA, and sends `status` and `etaHours` telemetry to the Node API. This validates the integration boundary so that a trained model could replace the heuristic component in a future version without redesigning the entire API.

## Repository Structure

```text
backend/node-api/          Node.js / Express API
backend/python-service/    Python ETA simulator
database/                  PostgreSQL schema and seed data
tests/                     V2 API integration tests
.github/workflows/         GitHub Actions CI configuration
docs/                      Final technical documentation
```

## Quick Start

### Requirements

- Node.js 20 or a compatible current Node.js version
- npm
- Python 3.x
- A web browser

### 1. Install Node dependencies

```bash
cd backend/node-api
npm install
```

On Windows PowerShell, `npm.cmd` may be used if script execution policy blocks `npm`.

### 2. Start the API

```bash
npm start
```

Windows alternative:

```cmd
npm.cmd start
```

The application runs at `http://localhost:3000` by default.

### 3. Open the dashboards

- Root page: `http://localhost:3000/`
- Shipments: `http://localhost:3000/api/shipments`
- Drivers: `http://localhost:3000/api/drivers`
- Health: `http://localhost:3000/api/health`

### 4. Run the predictive ETA simulator

From the repository root, while the Node API is running:

```bash
python backend/python-service/Simulator_v2.py
```

On Windows:

```cmd
py backend\python-service\Simulator_v2.py
```

The simulator updates `TRK-1001`. Refresh the shipment dashboard to observe the new ETA/status.

### 5. Run integration tests

Keep the API running. From `backend/node-api`:

```bash
npm test
```

Windows:

```cmd
npm.cmd test
```

## Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Installation Guide](docs/INSTALLATION_GUIDE.md)
- [User Manual](docs/USER_MANUAL.md)
- [CI/CD Evidence](docs/CI_CD_EVIDENCE.md)

## Testing Summary

The V2 integration test script checks five behaviors:

1. API health endpoint returns HTTP 200.
2. Shipment list endpoint returns HTTP 200.
3. Existing shipment `TRK-1001` can be retrieved.
4. Missing shipment `TRK-9999` returns HTTP 404.
5. Shipment telemetry can be updated through the PUT endpoint.

## CI/CD

GitHub Actions checks out the repository, installs Node dependencies, starts the API, runs the API integration tests, configures Python, and executes the ETA simulator. The project history includes an initial failed workflow followed by three consecutive successful final-integration runs after the test and workflow configuration were corrected. See [CI/CD Evidence](docs/CI_CD_EVIDENCE.md).

## Database Design

The repository includes PostgreSQL tables for `drivers`, `shipments`, and `weather_data`, together with representative seed data. These files document the intended persistent architecture. **The current Node API does not connect to PostgreSQL; the live prototype uses in-memory JavaScript data.**

## Current Limitations

- Data resets when the Node process restarts because the live prototype is in-memory.
- PostgreSQL is designed but not connected to the running application.
- Traffic and weather conditions are simulated rather than retrieved from live external services.
- ETA prediction is heuristic rather than a trained ML model.
- Authentication and role-based authorization are not implemented.
- The submitted repository demonstrates local execution and CI verification; no production deployment is claimed in this documentation.

## Future Work

Future iterations can connect PostgreSQL, add authentication and role-based access, integrate live traffic/weather services, persist telemetry history, and replace the heuristic ETA calculation with a trained predictive model using historical logistics data.
