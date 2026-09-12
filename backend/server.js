/**
 * Node.js API Service - Alpha Release Communication Layer
 * Integration Lead Component: Handles basic routing and status validation.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Integration health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "success",
        service: "Supply Chain Logistics Node API",
        environment: "Alpha",
        database_connected: true,
        timestamp: new Date().toISOString()
    });
});

// Mock route for fetching delivery ETA data
app.get('/api/deliveries/:id/eta', (req, res) => {
    const deliveryId = req.params.id;
    // Simulating response based on seed data
    res.status(200).json({
        delivery_id: parseInt(deliveryId),
        status: "in_progress",
        route_distance_km: 15.5,
        predicted_duration_minutes: 45,
        confidence_score: 0.87,
        model_version: "alpha-v1"
    });
});

app.listen(PORT, () => {
    console.log(`API Service running on port ${PORT}`);
});