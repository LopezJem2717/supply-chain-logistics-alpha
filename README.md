# Supply Chain Logistics & Driver Workforce Optimization Platform

## Overview
Developed as part of the CMSC 495 Computer Science Capstone project, this platform provides real-time supply chain tracking, predictive ETA analytics using machine learning, and automated route optimization for fleet dispatchers.

## Team Roles
* **Lead Architect (Tawhid Talal):** System components, UML structural models, and component boundaries.
* **Interface Designer (Jemma Lopez):** API specifications, REST contracts, and data validation rules.

## System Architecture
* **Presentation Layer:** Dispatcher Web Dashboard & Driver Mobile Interface.
* **API Gateway:** Node.js Express REST API server handling request validation and CORS.
* **Core Processing:** C++ Routing Engine & Python ML Inference Pipeline (Random Forest Regressor).
* **Persistence Layer:** Relational database tracking drivers, active deliveries, and traffic logs.

## Getting Started & Installation
1. Clone the repository:
   ```bash
  git clone https://github.com/LopezJem2717/supply-chain-logistics-alpha.git
