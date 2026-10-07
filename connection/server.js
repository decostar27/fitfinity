const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'events.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// API Routes
app.get('/api/events', (req, res) => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  res.json(JSON.parse(data));
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  
  newEvent.id = Date.now();
  newEvent.status = 'Upcoming';
  data.push(newEvent);
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json(newEvent);
});

app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const filteredData = data.filter(e => e.id !== id);
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(filteredData, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Vanilla Server running at http://localhost:${PORT}`);
});
