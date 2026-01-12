const express = require('express');
const redis = require('redis'); // Redis client
const app = express();

app.use(express.json());

// Redis Client Oluştur (Coolify/Docker'daki Redis'e bağla)
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });
redisClient.connect().catch(console.error);

// Basit Database (Simülasyon - Sen Mongo yaparsın)
const urlDB = new Map(); 

// 1. Link Kısaltma Endpoint'i
app.post('/api/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const shortCode = Math.random().toString(36).substring(7); // Basit ID (Sen nanoid kullan)
    
    // DB'ye Yaz
    urlDB.set(shortCode, longUrl);
    
    // Redis'e Yaz (Hızlı erişim için)
    await redisClient.set(shortCode, longUrl, { EX: 3600 }); // 1 saat cache

    res.json({ shortCode, longUrl });
});

// 2. Yönlendirme Endpoint'i (HIZLI OLMALI)
app.get('/:code', async (req, res) => {
    const { code } = req.params;

    // ÖNCE REDIS'E BAK (Cache Hit)
    const cachedUrl = await redisClient.get(code);
    if (cachedUrl) {
        console.log('Cache Hit! Redis\'ten geldi.');
        return res.redirect(cachedUrl);
    }

    // YOKSA DB'YE BAK (Cache Miss)
    const dbUrl = urlDB.get(code);
    if (dbUrl) {
        // Bir dahaki sefere hızlı olsun diye Redis'e at
        await redisClient.set(code, dbUrl, { EX: 3600 });
        return res.redirect(dbUrl);
    }

    res.status(404).json({ error: 'Link bulunamadı' });
});

app.listen(3000, () => console.log('Microservice running on port 3000'));