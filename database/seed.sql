-- Sample data for Supply Chain Logistics Alpha

-- Driver
INSERT INTO drivers (
    first_name,
    last_name,
    status,
    current_latitude,
    current_longitude
)
VALUES (
    'Alex',
    'Morgan',
    'assigned',
    39.1434,
    -77.2014
);

-- Delivery
INSERT INTO deliveries (
    driver_id,
    pickup_address,
    pickup_latitude,
    pickup_longitude,
    destination_address,
    destination_latitude,
    destination_longitude,
    status,
    scheduled_time
)
VALUES (
    1,
    'Montgomery Village, MD',
    39.1768,
    -77.1953,
    'Rockville, MD',
    39.0840,
    -77.1528,
    'in_progress',
    CURRENT_TIMESTAMP
);

-- Route
INSERT INTO routes (
    delivery_id,
    start_latitude,
    start_longitude,
    end_latitude,
    end_longitude,
    distance_km,
    estimated_duration_minutes,
    route_status
)
VALUES (
    1,
    39.1768,
    -77.1953,
    39.0840,
    -77.1528,
    15.50,
    25,
    'active'
);

-- Simulated Traffic Condition
INSERT INTO traffic_conditions (
    route_id,
    congestion_level,
    average_speed_kmh,
    construction_event,
    delay_minutes
)
VALUES (
    1,
    'heavy',
    30.00,
    TRUE,
    12
);

-- Simulated Weather Condition
INSERT INTO weather_conditions (
    route_id,
    weather_type,
    severity,
    temperature_celsius,
    visibility_km,
    delay_minutes
)
VALUES (
    1,
    'heavy_rain',
    'high',
    18.00,
    4.50,
    8
);

-- Sample ETA Prediction
INSERT INTO eta_predictions (
    delivery_id,
    route_id,
    predicted_eta,
    predicted_duration_minutes,
    confidence_score,
    model_version,
    reoptimization_required
)
VALUES (
    1,
    1,
    CURRENT_TIMESTAMP + INTERVAL '45 minutes',
    45,
    0.8700,
    'alpha-v1',
    TRUE
);