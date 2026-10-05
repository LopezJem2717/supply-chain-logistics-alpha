const http = require("http");

const BASE_URL = "http://localhost:3000";

function request(path, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        Accept: "application/json",
        "User-Agent": "V2-Integration-Test",
      },
    };

    let data = null;

    if (body) {
      data = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
      options.headers["Content-Length"] = Buffer.byteLength(data);
    }

    const req = http.request(`${BASE_URL}${path}`, options, (res) => {
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: responseBody,
        });
      });
    });

    req.on("error", reject);

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

async function runTests() {
  console.log("Running V2 API Integration Tests...\n");

  try {
    // Test 1: Health endpoint
    const health = await request("/api/health");

    if (health.statusCode !== 200) {
      throw new Error("Health endpoint failed");
    }

    console.log("PASSED: Health endpoint");

    // Test 2: Shipment list
    const shipments = await request("/api/shipments");

    if (shipments.statusCode !== 200) {
      throw new Error("Shipment list endpoint failed");
    }

    console.log("PASSED: Shipment list endpoint");

    // Test 3: Existing shipment
    const shipment = await request("/api/shipments/TRK-1001");

    if (shipment.statusCode !== 200) {
      throw new Error("Shipment lookup failed");
    }

    console.log("PASSED: Existing shipment lookup");

    // Test 4: Missing shipment
    const missing = await request("/api/shipments/TRK-9999");

    if (missing.statusCode !== 404) {
      throw new Error("Missing shipment validation failed");
    }

    console.log("PASSED: Missing shipment returns 404");

    // Test 5: Telemetry integration
    const telemetry = await request(
      "/api/shipments/TRK-1001/telemetry",
      "PUT",
      {
        status: "DELAYED",
        etaHours: 2.25,
      },
    );

    if (telemetry.statusCode !== 200) {
      throw new Error("Telemetry update failed");
    }

    console.log("PASSED: Telemetry update endpoint");

    console.log("\nAll V2 API integration tests passed.");
  } catch (error) {
    console.error("\nFAILED:", error.message);
    process.exit(1);
  }
}

runTests();
