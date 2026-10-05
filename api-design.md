# API Interface Design Contracts

As part of the Alpha release, the following data contracts establish how the Node.js API will communicate with the client-side dispatcher dashboard.

## ETA Prediction Payload

When the client requests the current status and estimated time of arrival for an active delivery, the API will return the following JSON structure. This ensures the frontend components have consistent access to both the live coordinates and the machine-learning ETA predictions.

```json
{
  "delivery_id": 1,
  "status": "in_progress",
  "current_location": {
    "latitude": 39.1434,
    "longitude": -77.2014
  },
  "eta_prediction": {
    "predicted_duration_minutes": 45,
    "confidence_score": 0.87,
    "model_version": "alpha-v1",
    "reoptimization_recommended": true
  },
  "last_updated": "2026-09-12T14:30:00Z"
}