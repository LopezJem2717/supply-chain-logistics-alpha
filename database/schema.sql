-- Table: drivers
CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    current_latitude DECIMAL(9,6)
        CHECK (current_latitude BETWEEN -90 AND 90),
    current_longitude DECIMAL(9,6)
        CHECK (current_longitude BETWEEN -180 AND 180),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: deliveries
CREATE TABLE deliveries (
    delivery_id SERIAL PRIMARY KEY,
    driver_id INTEGER REFERENCES drivers(driver_id),

    pickup_address VARCHAR(255) NOT NULL,
    pickup_latitude DECIMAL(9,6) NOT NULL
        CHECK (pickup_latitude BETWEEN -90 AND 90),
    pickup_longitude DECIMAL(9,6) NOT NULL
        CHECK (pickup_longitude BETWEEN -180 AND 180),

    destination_address VARCHAR(255) NOT NULL,
    destination_latitude DECIMAL(9,6) NOT NULL
        CHECK (destination_latitude BETWEEN -90 AND 90),
    destination_longitude DECIMAL(9,6) NOT NULL
        CHECK (destination_longitude BETWEEN -180 AND 180),

    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    scheduled_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: routes
CREATE TABLE routes (
    route_id SERIAL PRIMARY KEY,

    delivery_id INTEGER NOT NULL
        REFERENCES deliveries(delivery_id)
        ON DELETE CASCADE,

    start_latitude DECIMAL(9,6) NOT NULL
        CHECK (start_latitude BETWEEN -90 AND 90),
    start_longitude DECIMAL(9,6) NOT NULL
        CHECK (start_longitude BETWEEN -180 AND 180),

    end_latitude DECIMAL(9,6) NOT NULL
        CHECK (end_latitude BETWEEN -90 AND 90),
    end_longitude DECIMAL(9,6) NOT NULL
        CHECK (end_longitude BETWEEN -180 AND 180),

    distance_km DECIMAL(10,2)
        CHECK (distance_km >= 0),

    estimated_duration_minutes INTEGER
        CHECK (estimated_duration_minutes >= 0),

    route_status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Traffic Conditions
CREATE TABLE traffic_conditions (
    traffic_id SERIAL PRIMARY KEY,

    route_id INTEGER NOT NULL
        REFERENCES routes(route_id)
        ON DELETE CASCADE,

    congestion_level VARCHAR(20) NOT NULL,

    average_speed_kmh DECIMAL(6,2)
        CHECK (average_speed_kmh >= 0),

    construction_event BOOLEAN NOT NULL DEFAULT FALSE,

    delay_minutes INTEGER NOT NULL DEFAULT 0
        CHECK (delay_minutes >= 0),

    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Weather Conditions
CREATE TABLE weather_conditions (
    weather_id SERIAL PRIMARY KEY,

    route_id INTEGER NOT NULL
        REFERENCES routes(route_id)
        ON DELETE CASCADE,

    weather_type VARCHAR(30) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'low',

    temperature_celsius DECIMAL(5,2),

    visibility_km DECIMAL(6,2)
        CHECK (visibility_km >= 0),

    delay_minutes INTEGER NOT NULL DEFAULT 0
        CHECK (delay_minutes >= 0),

    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: ETA Predictions
CREATE TABLE eta_predictions (
    prediction_id SERIAL PRIMARY KEY,

    delivery_id INTEGER NOT NULL
        REFERENCES deliveries(delivery_id)
        ON DELETE CASCADE,

    route_id INTEGER NOT NULL
        REFERENCES routes(route_id)
        ON DELETE CASCADE,

    predicted_eta TIMESTAMP NOT NULL,

    predicted_duration_minutes INTEGER NOT NULL
        CHECK (predicted_duration_minutes >= 0),

    confidence_score DECIMAL(5,4)
        CHECK (confidence_score BETWEEN 0 AND 1),

    model_version VARCHAR(50),

    reoptimization_required BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);