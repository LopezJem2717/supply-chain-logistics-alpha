"""
AI Predictive Analytics & Telemetry Simulator
Module: Supply Chain Logistics Alpha
Role: Integration Lead / Machine Learning Interface
"""

import time
import random
import json
import urllib.request
import urllib.error

API_URL = "http://localhost:3000/api/shipments"

class PredictiveETASimulator:
    def __init__(self, tracking_number="TRK-1001"):
        self.tracking_number = tracking_number
        self.current_eta = 2.0  # Initial baseline hours
        self.statuses = ["IN_TRANSIT", "DELAYED", "DELIVERED"]

    def calculate_predictive_eta(self, traffic_delay_mins, weather_severity_factor):
        """
        AI Decision Engine: Calculates predictive ETA adjustments based on incoming traffic delays
        and adverse environmental parameters.
        """
        delay_hours = (traffic_delay_mins / 60.0) * weather_severity_factor
        updated_eta = max(0.0, round(self.current_eta + delay_hours - 0.15, 2))
        return updated_eta

    def push_telemetry(self, status, eta):
        payload = json.dumps({
            "status": status,
            "etaHours": eta
        }).encode('utf-8')

        req = urllib.request.Request(
            f"{API_URL}/{self.tracking_number}/telemetry",
            data=payload,
            headers={'Content-Type': 'application/json'},
            method='PUT'
        )

        try:
            with urllib.request.urlopen(req) as response:
                res_body = json.loads(response.read().decode())
                print(f"[AI SIMULATOR] API Sync Success: {res_body.get('message')}")
        except urllib.error.URLError as e:
            print(f"[AI SIMULATOR NOTICE] Node API Offline ({e.reason}). Running local inference model.")

    def run_simulation(self, steps=5):
        print(f"=== Initializing Predictive Telemetry Feed for {self.tracking_number} ===")
        for step in range(1, steps + 1):
            traffic_delay = random.randint(0, 30) # Delay in minutes
            weather_factor = random.choice([1.0, 1.25, 1.6]) # Weather severity multiplier

            self.current_eta = self.calculate_predictive_eta(traffic_delay, weather_factor)
            current_status = "DELIVERED" if self.current_eta == 0 else ("DELAYED" if traffic_delay > 20 else "IN_TRANSIT")

            print(f"Step {step}/{steps} | Traffic Delay: {traffic_delay}m | Weather Factor: {weather_factor}x | Adjusted ETA: {self.current_eta} hrs | Status: {current_status}")

            self.push_telemetry(current_status, self.current_eta)

            if current_status == "DELIVERED":
                print("[AI SIMULATOR] Delivery target reached.")
                break

            time.sleep(1)

if __name__ == "__main__":
    simulator = PredictiveETASimulator(tracking_number="TRK-1001")
    simulator.run_simulation(steps=5)