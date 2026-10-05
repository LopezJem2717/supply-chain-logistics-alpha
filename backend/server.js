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
        status: 'success',
        service: 'Supply Chain Logistics Node API',
        environment: 'Alpha',
        database_connected: false,
        timestamp: new Date().toISOString()
    });
});

// Mock route for fetching delivery ETA data
app.get('/api/deliveries/:id/eta', (req, res) => {
    const deliveryId = Number(req.params.id);

    // Validate delivery ID
    if (!Number.isInteger(deliveryId) || deliveryId <= 0) {
        return res.status(400).json({
            error: 'Invalid delivery ID'
        });
    }

    // Alpha mock response based on simulated route data
    res.status(200).json({
        delivery_id: deliveryId,
        status: 'in_progress',

        current_location: {
            latitude: 39.1434,
            longitude: -77.2014
        },

        eta_prediction: {
            predicted_duration_minutes: 51,
            confidence_score: 0.92,
            model_version: 'alpha-sim-v1',
            reoptimization_recommended: true
        },

        last_updated: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`API Service running on port ${PORT}`);
});