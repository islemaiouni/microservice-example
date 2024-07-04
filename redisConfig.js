// redisConfig.js
const { Redis } = require('ioredis');

const redisConnection = new Redis({
  host: 'localhost',
  port: 6379,
});

module.exports = redisConnection;