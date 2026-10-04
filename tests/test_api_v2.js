const http = require('http');
const app = require('../backend/node-api/server');

const PORT = 3001;
let server;

beforeAll((done) => {
    server = app.listen(PORT, done);
});

afterAll((done) => {
    server.close(done);
});

async function runTests() {
    console.log("Running Integration Test Suite...");

    http.get(`http://localhost:${PORT}/api/health`, (res) => {
        console.log(`[TEST] Health Endpoint Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log("PASSED: API is healthy.");
        } else {
            console.error("FAILED: Non-200 response.");
            process.exit(1);
        }
    });
}

if (require.main === module) {
    server = app.listen(PORT, () => {
        runTests().then(() => {
            setTimeout(() => server.close(), 1000);
        });
    });
}