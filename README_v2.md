# Supply Chain Logistics & Driver Platform (Alpha Release)

Developed as part of the **CMSC 495 Computer Science Capstone** at the **University of Maryland Global Campus**, this platform provides real-time supply chain tracking, predictive ETA analytics using machine learning, and automated route optimization for fleet dispatchers.

## Project Structure
- `backend/node-api/`: Express REST API managing driver profiles and shipment lifecycles.
- `backend/python-service/`: Machine learning simulation engine predicting delays and adjusting ETAs.
- `database/`: Relational database schemas and seed datasets.
- `tests/`: Integration testing suite executed in GitHub Actions.
- `.github/workflows/`: CI/CD automation pipeline configurations.

## Quickstart Guide

1. **Start the API Server:**
   ```bash
   cd backend/node-api
   npm install
   npm start