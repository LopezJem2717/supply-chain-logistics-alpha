"""
Supply Chain Logistics - Alpha ETA Prediction Simulator
Integration Lead Component: Simulates machine learning processing
to calculate estimated arrival times based on traffic and weather.
"""


def calculate_eta(
    distance_km,
    base_speed_kmh,
    traffic_delay_min,
    weather_delay_min
):
    # Validate input values
    if base_speed_kmh <= 0:
        raise ValueError("Base speed must be greater than zero.")

    if distance_km < 0:
        raise ValueError("Distance cannot be negative.")

    if traffic_delay_min < 0 or weather_delay_min < 0:
        raise ValueError("Delay values cannot be negative.")

    # Calculate base travel time in minutes
    base_travel_minutes = (distance_km / base_speed_kmh) * 60

    # Add simulated traffic and weather delays
    total_eta_minutes = round(
        base_travel_minutes
        + traffic_delay_min
        + weather_delay_min
    )

    # Simple confidence score for Alpha simulation
    confidence = (
        0.92
        if traffic_delay_min < 15 and weather_delay_min < 10
        else 0.75
    )

    return {
        "predicted_duration_minutes": total_eta_minutes,
        "confidence_score": confidence,
        "model_version": "alpha-sim-v1",
        "reoptimization_required": total_eta_minutes > 40
    }


if __name__ == "__main__":
    # Test case matching the Alpha seed data
    result = calculate_eta(15.5, 30.0, 12, 8)

    print("ETA Prediction Result:")
    print(result)