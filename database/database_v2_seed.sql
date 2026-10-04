-- Initial Seed Data for Testing and Simulation
INSERT INTO drivers (name, status, current_lat, current_lng) VALUES
                                                                 ('John Doe', 'ON_DELIVERY', 38.3004, -76.5414),
                                                                 ('Jane Smith', 'AVAILABLE', 38.8951, -77.0364),
                                                                 ('Alex Rivera', 'ON_DELIVERY', 39.2904, -76.6122);

INSERT INTO shipments (tracking_number, origin, destination, status, estimated_eta_hours, driver_id) VALUES
                                                                                                         ('TRK-1001', 'Baltimore, MD', 'Washington, DC', 'IN_TRANSIT', 1.50, 1),
                                                                                                         ('TRK-1002', 'Richmond, VA', 'Philadelphia, PA', 'IN_TRANSIT', 4.25, 3),
                                                                                                         ('TRK-1003', 'Norfolk, VA', 'Annapolis, MD', 'PENDING', 2.75, NULL);

INSERT INTO weather_data (location, condition, temperature_f) VALUES
                                                                  ('Washington, DC', 'CLEAR', 72.5),
                                                                  ('Baltimore, MD', 'RAIN', 64.0),
                                                                  ('Philadelphia, PA', 'SNOW', 31.2);