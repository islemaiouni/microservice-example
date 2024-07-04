// app.js
const express = require('express');
const { Queue } = require('bullmq');
const redisConnection = require('./redisConfig');

const app = express();
const port = 3000;

const myQueue = new Queue('myQueue', { connection: redisConnection });

app.use(express.json());

// Endpoint to add a job
app.post('/add-job', async (req, res) => {
  const { task, value } = req.body;
  const job = await myQueue.add('myJob', { task, value });
  res.send(`Job added with ID: ${job.id}`);
});

// Endpoint to get the result of a job
app.get('/job-result/:id', async (req, res) => {
  const result = await redisConnection.get(`result:${req.params.id}`);
  if (result) {
    res.send(result);
  } else {
    res.send('Result not found');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});