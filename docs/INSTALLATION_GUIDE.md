# Installation Guide

## Purpose

This guide explains how to run the Supply Chain Logistics & Driver Platform locally and verify the integrated Node/Python workflow.

## Prerequisites

Install the following before starting:

- Node.js and npm
- Python 3.x
- Git (recommended if working from the repository)
- A modern web browser

PostgreSQL is **not required to run the current prototype** because the live API uses in-memory data.

## Install and Start the Node API

Open a terminal at the repository root:

```bash
cd backend/node-api
npm install
npm start
```

On Windows PowerShell, use the following if `npm` is blocked by execution-policy settings:

```cmd
npm.cmd install
npm.cmd start
```

Expected startup message:

```text
[Node API] Server executing on http://localhost:3000
```

Keep this terminal open while using the application.

## Verify the API

Open a second terminal:

```cmd
curl.exe http://localhost:3000/api/health
```

Or open `http://localhost:3000/api/health` in a browser.

The API should report status `OK`.

## Open the User Interface

Use a browser to open:

```text
http://localhost:3000/
```

The root page links to:

- Shipment Dashboard — `/api/shipments`
- Driver Dashboard — `/api/drivers`
- Health Check — `/api/health`

## Run the Predictive ETA Simulator

Keep the Node API running. From the repository root in another terminal:

```cmd
py backend\python-service\Simulator_v2.py
```

Cross-platform alternative:

```bash
python backend/python-service/Simulator_v2.py
```

The simulator performs five steps unless delivery is reached earlier. Each step generates a traffic delay and weather-severity factor, calculates an adjusted ETA, and attempts to update `TRK-1001` through the telemetry endpoint.

After the simulator finishes, refresh the shipment dashboard to see the latest ETA and status.

## Run the Integration Tests

The Node API must already be running.

From `backend/node-api`:

```cmd
npm.cmd test
```

or:

```bash
npm test
```

A successful run reports five passed checks and ends with:

```text
All V2 API integration tests passed.
```

## Troubleshooting

### Port 3000 is already in use

If Node reports `EADDRINUSE`, another process is already using port 3000. First check whether the Supply Chain API is already running:

```cmd
curl.exe http://localhost:3000/api/health
```

To inspect the process on Windows:

```cmd
netstat -ano | findstr :3000
```

Only terminate the process if it is not the API instance you intend to use:

```cmd
taskkill /PID <PID> /F
```

### `npm` is blocked in PowerShell

Use `npm.cmd` instead of `npm`.

### Simulator reports Node API offline

Confirm that the Node server is running and that `http://localhost:3000/api/health` is reachable before rerunning the simulator.

### Test returns HTML unexpectedly

The V2 test script already supplies `Accept: application/json` and `User-Agent: V2-Integration-Test`. Use the provided test script rather than manually modifying the request behavior.
