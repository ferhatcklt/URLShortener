const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('✅ Redis Connected'));

// Bağlantıyı başlat ve dışarı aç
(async () => {
    await client.connect();
})();

module.exports = client;