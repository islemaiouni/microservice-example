// producer.js
const { Queue } = require('bullmq');
const redisConnection = require('./redisConfig');

// Create a new queue
const myQueue = new Queue('myQueue', { connection: redisConnection });

// Function to add a job to the queue
async function addJob(data) {
  await myQueue.add('myJob', data, {
    attempts: 3, // Retry failed jobs 3 times
    backoff: 5000, // Wait 5 seconds before retrying
  });
  console.log('Job added:', data);
}

// Example usage
addJob({ task: 'processData', value: 42 });