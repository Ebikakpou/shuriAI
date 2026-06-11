# 🌌 ShuriAI Studio — Hybrid Cloud Architecture

ShuriAI Studio is a high-performance, AI-integrated dictionary web platform built with React and Tailwind CSS. This ecosystem leverages a modern **hybrid DevOps pipeline**: a blistering-fast serverless frontend hosted on **Vercel** combined with a containerized **Docker** build engine automated via **GitHub Actions**—offering a clear path for self-hosting on **AWS EC2** with dedicated **Prometheus** and **Grafana** observability.

---

## 🏗️ Architecture Overview

The platform splits user-facing operations from background metrics collection to maximize speed and isolate admin dashboards from public view.

┌───────────────────┐
                           │   GitHub Push     │
                           └─────────┬─────────┘
                                     │
                ┌────────────────────┴────────────────────┐
                ▼                                         ▼
     ┌─────────────────────┐                   ┌─────────────────────┐
     │  Vercel Deployment  │                   │ GitHub Actions CI   │
     │ (Production Live)   │                   └──────────┬──────────┘
     └──────────┬──────────┘                              │
                │ (Log Drains)                            ▼
                ▼                              ┌─────────────────────┐
     ┌─────────────────────┐                   │ Docker Hub Registry │
     │ Grafana Cloud Stack │                   │  (shuri-app:latest)  │
     │ (Vercel Monitoring) │                   └──────────┬──────────┘
     └─────────────────────┘                              │ (Optional)
                                                          ▼
                                               ┌─────────────────────┐
                                               │   AWS EC2 Cluster   │
                                               │  (Self-Hosted App)  │
                                               └─────────────────────┘

* **Frontend Hosting:** Vercel (Global Edge Network, Serverless functions).
* **CI/CD Automation:** GitHub Actions (Multi-stage automated testing and image building).
* **Containerization:** Docker Engine & Docker Compose orchestration.
* **Observability:** Prometheus (Time-series log scraper) + Grafana (Telemetry dashboard).
* **Cloud Infrastructure:** AWS EC2 (`t2.micro` Free-Tier compatible).

---

## 🚀 Quick Start (Local Development)

### Prerequisites
* Node.js (v18 or higher)
* Docker Desktop (Optional, for container environment checking)

### Local Configuration
1. **Clone the repository workspace:**
   ```bash
   git clone [https://github.com/yourusername/shuriai-studio.git](https://github.com/yourusername/shuriai-studio.git)
   cd shuriai-studio
   npm install
   npm run dev