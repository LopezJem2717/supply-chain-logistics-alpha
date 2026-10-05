# API Documentation

## Overview

The V2 backend is an Express REST API running on port `3000` by default. The browser-facing shipment and driver endpoints can render HTML dashboards, while API clients receive JSON when requesting JSON content.

**Base URL:** `http://localhost:3000`

## GET `/api/health`

Confirms that the Node API is operational.

**Success:** `200 OK`

```json
{
  "status": "OK",
  "message": "Supply Chain Node API is operational."
}
```

## GET `/api/drivers`

Returns the current in-memory driver records. A normal browser request renders the Active Drivers Dashboard; an API request requesting JSON receives a JSON response.

**Success:** `200 OK`

JSON response shape:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "status": "ON_DELIVERY",
      "lat": 38.3004,
      "lng": -76.5414
    }
  ]
}
```

## GET `/api/shipments`

Returns all current in-memory shipments. A normal browser request renders the Active Shipments Dashboard.

**Success:** `200 OK`

Example JSON response shape:

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "trackingNumber": "TRK-1001",
      "origin": "Baltimore, MD",
      "destination": "Washington, DC",
      "status": "IN_TRANSIT",
      "etaHours": 1.5,
      "driverId": 1
    }
  ]
}
```

## GET `/api/shipments/:trackingNumber`

Returns one shipment by tracking number.

Example:

```text
GET /api/shipments/TRK-1001
```

**Success:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "trackingNumber": "TRK-1001",
    "origin": "Baltimore, MD",
    "destination": "Washington, DC",
    "status": "IN_TRANSIT",
    "etaHours": 1.5,
    "driverId": 1
  }
}
```

**Not found:** `404 Not Found`

```json
{
  "success": false,
  "message": "Shipment not found"
}
```

## POST `/api/shipments`

Creates a new in-memory shipment.

Required fields:

- `trackingNumber`
- `origin`
- `destination`

Optional field:

- `etaHours` — defaults to `2.50` when omitted.

Example request:

```json
{
  "trackingNumber": "TRK-2001",
  "origin": "Rockville, MD",
  "destination": "Baltimore, MD",
  "etaHours": 1.75
}
```

**Success:** `201 Created`. The new shipment is created with status `PENDING` and `driverId: null`.

**Validation failure:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Missing required payload parameters"
}
```

## PUT `/api/shipments/:trackingNumber/telemetry`

Updates the status and/or ETA of an existing shipment. This is the integration endpoint used by the Python ETA simulator.

Example:

```text
PUT /api/shipments/TRK-1001/telemetry
```

Request body:

```json
{
  "status": "DELAYED",
  "etaHours": 2.25
}
```

**Success:** `200 OK`

```json
{
  "success": true,
  "message": "Shipment telemetry updated successfully",
  "data": {
    "id": 1,
    "trackingNumber": "TRK-1001",
    "origin": "Baltimore, MD",
    "destination": "Washington, DC",
    "status": "DELAYED",
    "etaHours": 2.25,
    "driverId": 1
  }
}
```

**Not found:** `404 Not Found` with `Shipment not found`.

## Content Negotiation

The `/api/drivers` and `/api/shipments` routes provide browser-friendly HTML when opened normally in a browser. Integration tests explicitly send `Accept: application/json` and a non-browser user agent so that they receive JSON-oriented API behavior.

## Data Persistence

All runtime API records are currently held in memory. API changes therefore reset when the Node process restarts. PostgreSQL files in `database/` represent the planned persistence design and are not connected to these endpoints in the current prototype.
