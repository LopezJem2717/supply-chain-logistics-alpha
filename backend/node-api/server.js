/**
 * REST API Backend Server - Supply Chain Logistics Alpha
 * Course: CMSC 495 Computer Science Capstone
 * Author / Role: Jemma Lopez (Interface Designer & Co-Integration Lead) &
 * Tawhid Tala (Architect Lead & Co-Integration Lead)
 */


const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable pretty-printed JSON output for API tools and browser responses (2-space indentation)
app.set('json spaces', 2);

// Native CORS Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

/**
 * In-memory dataset
 */
let shipments = [
    { id: 1, trackingNumber: 'TRK-1001', origin: 'Baltimore, MD', destination: 'Washington, DC', status: 'IN_TRANSIT', etaHours: 1.5, driverId: 1 },
    { id: 2, trackingNumber: 'TRK-1002', origin: 'Richmond, VA', destination: 'Philadelphia, PA', status: 'IN_TRANSIT', etaHours: 4.25, driverId: 3 },
    { id: 3, trackingNumber: 'TRK-1003', origin: 'Norfolk, VA', destination: 'Annapolis, MD', status: 'PENDING', etaHours: 2.75, driverId: null }
];

let drivers = [
    { id: 1, name: 'John Doe', status: 'ON_DELIVERY', lat: 38.3004, lng: -76.5414 },
    { id: 2, name: 'Jane Smith', status: 'AVAILABLE', lat: 38.8951, lng: -77.0364 }
];

/**
 * HTML Helper to render clean horizontal table layouts in web browsers
 */
function renderHtmlTable(title, headers, rows) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title} - Supply Chain Logistics Alpha</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
      .container { max-width: 1000px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px 0 rgba(0,0,0,0.1); }
      .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px; }
      h1 { margin: 0; font-size: 22px; color: #0f172a; }
      .badge { background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 13px; }
      table { width: 100%; border-collapse: collapse; text-align: left; }
      th { background: #f1f5f9; padding: 12px; font-size: 13px; text-transform: uppercase; color: #475569; letter-spacing: 1px; border-bottom: 2px solid #cbd5e1; }
      td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
      tr:hover { background: #f8fafc; }
      .status-pill { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; display: inline-block; }
      .IN_TRANSIT, .ON_DELIVERY { background: #dcfce7; color: #15803d; }
      .PENDING, .AVAILABLE { background: #fef9c3; color: #a16207; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${title}</h1>
        <span class="badge">Total Records: ${rows.length}</span>
      </div>
      <table>
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  `;
}

// Root Endpoint
app.get('/', (req, res) => {
    res.send(`
    <div style="font-family: sans-serif; padding: 30px;">
      <h2>Supply Chain Logistics Alpha API Server</h2>
      <p>Server status: <strong>ACTIVE</strong></p>
      <ul>
        <li><a href="/api/shipments">View Shipments Dashboard (/api/shipments)</a></li>
        <li><a href="/api/drivers">View Drivers Dashboard (/api/drivers)</a></li>
        <li><a href="/api/health">Health Check (/api/health)</a></li>
      </ul>
    </div>
  `);
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Supply Chain Node API is operational.' });
});

// GET /api/drivers - Supports HTML browser layout & REST JSON output
app.get('/api/drivers', (req, res) => {
    if (req.accepts('html') && !req.xhr && !req.headers['user-agent'].includes('Postman')) {
        const headers = ['Driver ID', 'Name', 'Status', 'Latitude', 'Longitude'];
        const rows = drivers.map(d => [
            d.id,
            `<strong>${d.name}</strong>`,
            `<span class="status-pill ${d.status}">${d.status}</span>`,
            d.lat,
            d.lng
        ]);
        return res.send(renderHtmlTable('Active Drivers Dashboard', headers, rows));
    }
    res.json({ success: true, count: drivers.length, data: drivers });
});

// GET /api/shipments - Supports HTML browser layout & REST JSON output
app.get('/api/shipments', (req, res) => {
    if (req.accepts('html') && !req.xhr && !req.headers['user-agent'].includes('Postman')) {
        const headers = ['ID', 'Tracking Number', 'Origin', 'Destination', 'Status', 'ETA (Hours)', 'Driver ID'];
        const rows = shipments.map(s => [
            s.id,
            `<code>${s.trackingNumber}</code>`,
            s.origin,
            s.destination,
            `<span class="status-pill ${s.status}">${s.status}</span>`,
            `${s.etaHours} hrs`,
            s.driverId ? `Driver #${s.driverId}` : '<em>Unassigned</em>'
        ]);
        return res.send(renderHtmlTable('Active Shipments Dashboard', headers, rows));
    }
    res.json({ success: true, count: shipments.length, data: shipments });
});

// GET /api/shipments/:trackingNumber - Fetch single shipment details
app.get('/api/shipments/:trackingNumber', (req, res) => {
    const shipment = shipments.find(s => s.trackingNumber === req.params.trackingNumber);
    if (!shipment) return res.status(404).json({ success: false, message: 'Shipment not found' });
    res.json({ success: true, data: shipment });
});

// POST /api/shipments - Create new shipment
app.post('/api/shipments', (req, res) => {
    const { trackingNumber, origin, destination, etaHours } = req.body;
    if (!trackingNumber || !origin || !destination) {
        return res.status(400).json({ success: false, message: 'Missing required payload parameters' });
    }

    const newShipment = {
        id: shipments.length + 1,
        trackingNumber: String(trackingNumber),
        origin: String(origin),
        destination: String(destination),
        status: 'PENDING',
        etaHours: etaHours !== undefined ? Number(etaHours) : 2.50,
        driverId: null
    };

    shipments.push(newShipment);
    res.status(201).json({ success: true, data: newShipment });
});

// PUT /api/shipments/:trackingNumber/telemetry - Endpoint for AI Telemetry Engine Sync
app.put('/api/shipments/:trackingNumber/telemetry', (req, res) => {
    const shipment = shipments.find(s => s.trackingNumber === req.params.trackingNumber);
    if (!shipment) return res.status(404).json({ success: false, message: 'Shipment not found' });

    const { status, etaHours } = req.body;
    if (status) shipment.status = String(status);
    if (etaHours !== undefined) shipment.etaHours = Number(etaHours);

    res.json({ success: true, message: 'Shipment telemetry updated successfully', data: shipment });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`[Node API] Server executing on http://localhost:${PORT}`);
    });
}

module.exports = app;


