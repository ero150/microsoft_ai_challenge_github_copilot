// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create event store
const events = [];

// Routes
app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // Send event to event bus
  axios.post('http://localhost:4005/events', event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  // Send all events
  res.send(events);
});

// Start server
app.listen(4001, () => {
  console.log('Listening on port 4001');
});