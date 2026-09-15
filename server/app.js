const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../ui')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes (create these files next)
app.use('/api/config', require('./routes/config'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/logs', require('./routes/logs'));

// Create HTTP server for WebSocket support
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('🎬 Dashboard connected');
  clients.add(ws);
  
  // Send initial status
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to real-time monitoring',
    timestamp: new Date().toISOString()
  }));
  
  ws.on('close', () => {
    clients.delete(ws);
    console.log('📊 Dashboard disconnected');
  });
});

// Broadcast function for real-time updates
global.broadcastUpdate = (update) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(update));
    }
  });
};

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Control Panel running at http://localhost:${PORT}`);
  console.log(`📡 Real-time monitoring enabled`);
  console.log(`🎯 Open dashboard in your browser`);
});
