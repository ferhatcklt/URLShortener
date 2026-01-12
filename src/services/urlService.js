const redisClient = require('../config/redis');
const crypto = require('crypto'); // Node.js'in kendi kütüphanesi

// Simüle edilmiş veritabanı (Gerçek projede burası MongoDB olur)
const database = new Map();

class UrlService {
    
    async shortenUrl(longUrl) {
        // 1. Benzersiz kısa kod üret (6 karakter)
        const shortCode = crypto.randomBytes(3).toString('hex');
        
        // 2. DB'ye kaydet (Kalıcı hafıza)
        database.set(shortCode, longUrl);

        // 3. Redis'e kaydet (Önbellek - 1 Saatlik)
        // 'EX' expire (son kullanma tarihi) demektir.
        await redisClient.set(shortCode, longUrl, { EX: 3600 });

        return shortCode;
    }

    async getOriginalUrl(shortCode) {
        // A. Önce Cache'e (Redis) sor
        const cachedUrl = await redisClient.get(shortCode);
        if (cachedUrl) {
            return { url: cachedUrl, source: 'cache' }; // İstatistik için kaynağı dönüyoruz
        }

        // B. Cache Miss -> DB'ye sor
        const dbUrl = database.get(shortCode);
        if (dbUrl) {
            // Bir dahaki sefere hızlı olsun diye Redis'i güncelle (Cache Aside Pattern)
            await redisClient.set(shortCode, dbUrl, { EX: 3600 });
            return { url: dbUrl, source: 'database' };
        }

        return null; // Bulunamadı
    }
}

module.exports = new UrlService();