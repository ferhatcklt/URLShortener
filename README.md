# 🚀 Scalable URL Shortener Microservice

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Redis](https://img.shields.io/badge/Redis-Caching-red.svg)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)

A high-performance, **Dockerized** RESTful API built with **Node.js** and **Redis**. Designed to handle high-concurrency traffic with sub-10ms latency using the **Cache-Aside** strategy.

This project demonstrates a production-ready **Layered Architecture** (Controller-Service-Repository pattern) ensuring separation of concerns, scalability, and maintainability.

---

## 🌟 Key Features

* **⚡ High Performance:** Implements **Redis Caching** to minimize database I/O overhead. Delivers cached responses in <10ms.
* **🏗 Scalable Architecture:** Built with a clean separation of concerns (Controllers handle requests, Services handle business logic).
* **🛡 Security:** Integrated **Rate Limiting** middleware to prevent abuse and DDOS attacks.
* **🐳 DevOps Ready:** Fully containerized with **Docker** and **Docker Compose** for one-command deployment.
* **⚙️ Configurable:** 12-Factor App compliant environment configuration via `.env`.

---

## 🛠 Tech Stack

* **Runtime:** Node.js (Express.js)
* **Caching:** Redis (In-Memory Data Store)
* **Database:** *Simulated In-Memory Map* (Easily replaceable with MongoDB/PostgreSQL)
* **Containerization:** Docker & Docker Compose
* **Security:** Helmet & Express-Rate-Limit

---

## 📂 Project Structure

```text
url-shortener-api/
├── src/
│   ├── config/         # Redis & Environment configurations
│   ├── controllers/    # Request/Response handling (No business logic)
│   ├── routes/         # API Route definitions
│   ├── services/       # Business Logic & Data Access (The "Brain")
│   └── app.js          # App entry point
├── .env                # Environment variables
├── docker-compose.yml  # Docker orchestration
├── Dockerfile          # Image definition
└── README.md           # Documentation