# Supply Chain Logistics & Driver Platform (Alpha Release)

Developed as part of the **CMSC 495 Computer Science Capstone** at the **University of Maryland Global Campus**, this platform demonstrates supply chain shipment tracking, driver monitoring, predictive ETA simulation, and API-based telemetry integration for fleet dispatch operations.

## Project Structure

- `backend/node-api/`: Express REST API for shipment and driver management.
- `backend/python-service/`: Predictive ETA simulator using simulated traffic and weather conditions.
- `database/`: PostgreSQL database schema and representative seed data for the persistence architecture.
- `tests/`: Automated API integration tests.
- `.github/workflows/`: Continuous integration workflow configuration.

## Alpha Features

- Shipment and driver tracking through a Node.js/Express API.
- Browser-based shipment and driver dashboards.
- Predictive ETA adjustments based on simulated traffic and weather conditions.
- Python-to-Node telemetry integration for updating shipment ETA and status.
- REST endpoints for retrieving and updating shipment information.
- PostgreSQL schema and seed data representing the planned persistence layer.
- Automated API integration testing.
- GitHub Actions continuous integration pipeline.

## Architecture

The current Alpha prototype uses an Express API with in-memory shipment and driver data for the live demonstration. PostgreSQL schema and seed files define the planned relational persistence layer but are not currently connected to the running API.

The Python predictive ETA simulator generates simulated traffic and weather conditions, calculates ETA adjustments, and sends telemetry updates to the Node.js API through HTTP requests.

### Integration Flow

Traffic & Weather Simulation  
→ Predictive ETA Calculation  
→ Python Simulator  
→ Node.js REST API  
→ Shipment Update  
→ Dispatcher Dashboard

## Quickstart Guide

### 1. Install Node.js Dependencies

```bash
cd backend/node-api
npm install