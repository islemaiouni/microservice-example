// consumer.js
const { Worker } = require('bullmq');
const redisConnection = require('./redisConfig');

// Function to simulate data processing
function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed value: ${data.value}`);
    }, 1000);
  });
}

// Create a new worker
const worker = new Worker(
  'myQueue',
  async (job) => {
    const result = await processData(job.data);
    await redisConnection.set(`result:${job.id}`, result);
    console.log('Job processed and cached:', job.id, result);
  },
  { connection: redisConnection }
);

worker.on('completed', (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.log(`Job failed: ${job.id}`, err);
});