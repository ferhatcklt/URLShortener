require('dotenv').config();
const express = require('express');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // JSON verisini okumak için

// Routes
// Kısaltma işlemleri için '/api' prefixi kullanıyoruz
app.use('/api', urlRoutes); 

// Yönlendirme işlemi ana kökte çalışsın (bit.ly/xyz gibi)
app.use('/', urlRoutes);

// Server Başlat
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});