# User Manual

## Intended User

The prototype is designed primarily for a fleet dispatcher or operations user who needs visibility into shipments, drivers, statuses, and estimated arrival times.

## Opening the Application

After the Node API has been started, open:

```text
http://localhost:3000/
```

The home page confirms that the server is active and provides links to the main views.

## Viewing Shipments

Select **View Shipments Dashboard** or open:

```text
http://localhost:3000/api/shipments
```

The dashboard displays:

- Shipment ID
- Tracking number
- Origin
- Destination
- Current status
- ETA in hours
- Assigned driver ID, when available

Example shipment `TRK-1001` begins with an ETA of 1.5 hours in the in-memory dataset.

## Viewing Drivers

Select **View Drivers Dashboard** or open:

```text
http://localhost:3000/api/drivers
```

The dashboard displays driver ID, name, current status, latitude, and longitude from the prototype dataset.

## Checking System Health

Open:

```text
http://localhost:3000/api/health
```

A successful response indicates that the Node API is operational.

## Understanding Predictive ETA Updates

The predictive ETA component is demonstrated through `Simulator_v2.py`. It uses simulated traffic delay and weather severity rather than live traffic/weather services.

During a demonstration:

1. Open the shipment dashboard and note the ETA for `TRK-1001`.
2. Run the Python simulator from a terminal.
3. Wait for the telemetry synchronization messages.
4. Refresh the shipment dashboard.
5. Observe the updated ETA and/or shipment status.

This demonstrates the end-to-end flow from predictive calculation to API telemetry update to dispatcher visibility.

## Shipment Statuses

The current prototype may display statuses such as:

- `PENDING` — shipment has not yet entered active transit.
- `IN_TRANSIT` — shipment is actively moving.
- `DELAYED` — the simulated traffic condition produced a delay condition.
- `DELIVERED` — simulator ETA reached zero.

## Important Prototype Limitations

The dashboard is a capstone prototype rather than a production dispatch system. Runtime shipment and driver data are stored in memory and reset when the Node server restarts. Coordinates are sample data. Traffic and weather are simulated. PostgreSQL files describe planned persistence but are not connected to the running dashboard. The predictive ETA component is heuristic rather than a trained machine-learning model.
