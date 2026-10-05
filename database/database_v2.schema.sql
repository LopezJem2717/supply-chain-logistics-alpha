-- PostgreSQL Database Schema for Supply Chain Logistics Alpha
-- Author: Group 7 Jemma Lopez (Interface Designer and Co-Integration Lead) &
-- Tawhid Talal (Architect Lead and Co-Integration lead)
-- Date: October 2, 2026

DROP TABLE IF EXISTS shipments CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS weather_data CASCADE;

CREATE TABLE drivers (
                         driver_id SERIAL PRIMARY KEY,
                         name VARCHAR(100) NOT NULL,
                         status VARCHAR(20) DEFAULT 'AVAILABLE', -- AVAILABLE, ON_DELIVERY, OFF_DUTY
                         current_lat NUMERIC(9, 6),
                         current_lng NUMERIC(9, 6),
                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipments (
                           shipment_id SERIAL PRIMARY KEY,
                           tracking_number VARCHAR(50) UNIQUE NOT NULL,
                           origin VARCHAR(100) NOT NULL,
                           destination VARCHAR(100) NOT NULL,
                           status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, IN_TRANSIT, DELIVERED, DELAYED
                           estimated_eta_hours NUMERIC(4, 2),
                           driver_id INT REFERENCES drivers(driver_id) ON DELETE SET NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weather_data (
                              weather_id SERIAL PRIMARY KEY,
                              location VARCHAR(100) NOT NULL,
                              condition VARCHAR(50) NOT NULL, -- CLEAR, RAIN, SNOW, FOG
                              temperature_f NUMERIC(4, 1),
                              recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);