# Database Architecture

## Overview

The database layer supports the Supply Chain Logistics & Driver Workforce
Optimization Platform. It stores driver, delivery, route, simulated traffic,
simulated weather, and ETA prediction data used by the platform.

PostgreSQL is used as the relational database for the Alpha release. The
database structure is designed so that routing and ETA components can access
consistent operational and simulation data.

## Core Tables

### drivers
Stores driver identification, availability status, and current location.

### deliveries
Stores delivery assignments, pickup locations, destination locations,
scheduled times, and delivery status.

### routes
Stores route information associated with deliveries, including start and end
coordinates, distance, and estimated travel duration.

### traffic_conditions
Stores simulated traffic conditions associated with routes, including
congestion level, average speed, construction events, and estimated delays.

### weather_conditions
Stores simulated weather conditions associated with routes, including weather
type, severity, visibility, and estimated delays.

### eta_predictions
Stores ETA predictions associated with deliveries and routes, including
predicted duration, confidence score, model version, and whether route
re-optimization is recommended.

## Data Flow

The basic data flow is:

Driver → Delivery → Route → Traffic/Weather Conditions → ETA Prediction

Traffic and weather conditions are maintained separately from route data so
that simulated conditions can change over time without modifying the core
delivery or route records.

## Files

- `schema.sql` creates the database tables, relationships, and validation
  constraints.
- `seed.sql` provides sample data for development and integration testing.

## Alpha Scope

The Alpha release uses latitude and longitude fields directly for simplicity.
PostGIS-based geospatial functionality can be incorporated as the routing
capabilities are expanded.