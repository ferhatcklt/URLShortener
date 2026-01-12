# High-Performance URL Shortener Microservice 🚀

A scalable URL shortening service built with **Node.js** and **Redis**. Designed to handle high-throughput traffic with low latency using the **Cache-Aside** pattern.

## 🏗 Architecture
- **API:** Node.js & Express
- **Caching Layer:** Redis (In-Memory)
- **Architecture:** Layered (Controller-Service-Data)

## ⚡ Features
- **Ultra-fast Redirection:** Sub-10ms response times for cached URLs.
- **Cache-Aside Pattern:** Falls back to database (simulated) only on cache miss.
- **Scalable Structure:** Clean code architecture ready for microservice deployment.

## 🛠 Installation

1. **Clone the repo**
   ```bash
   git clone [https://github.com/ferhatcklt/node-redis-shortener.git](https://github.com/ferhatcklt/node-redis-shortener.git)