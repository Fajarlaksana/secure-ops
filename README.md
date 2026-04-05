<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0B0B0F,50:1a0533,100:2d1b69&height=180&section=header&text=SecureOps&fontSize=56&fontColor=ffffff&fontAlignY=40&desc=Login%20Attack%20Monitoring%20Dashboard&descAlignY=62&descSize=16&animation=fadeIn"/>

[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Wazuh](https://img.shields.io/badge/Wazuh-SIEM-00A8E0?style=flat-square)](https://wazuh.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

> **SOC Dashboard** modern untuk mendeteksi dan memonitor Login Attack secara real-time.
> Brute Force · Credential Stuffing · Password Spray · Impossible Travel Detection.

</div>

<br/>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Run Modes](#-run-modes)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

<br/>

---

## 🔍 Overview

**SecureOps** adalah SOC dashboard berbasis web yang berfokus pada **Login Attack Monitoring**. Dirancang untuk membantu security analyst dan administrator memonitor aktivitas login mencurigakan secara real-time dari berbagai sumber log.

**Masalah yang diselesaikan:** Sulitnya melihat dan memahami pola serangan login dari banyak sumber — Linux server, Windows endpoint, website login, dan authentication logs — dalam satu tampilan terpadu.

```
Login Sources → Wazuh Manager → SecureOps Backend → Detection Engine → Real-Time Alert → Analyst
```

<br/>

---

## ✨ Features

### 🏠 Dashboard Utama
- Stat cards: Total failed logins, successful logins, high severity alerts, attacker IPs
- Login trend chart (per jam / per hari)
- Severity donut chart (Low / Medium / High / Critical)
- Active threats panel

### 🗺️ Threat Map
- Visualisasi lokasi attacker IP di peta dunia
- Marker berwarna berdasarkan severity
- Popup detail: IP, negara, kota, ISP, attack type, hit count

### 🚨 Alerts Management
- Daftar alert dengan severity badge dan timestamp
- Filter berdasarkan status dan severity
- Actions: **Assign · Investigate · Update Status · Dismiss**

### 🔬 Investigation Panel
- Detail alert + timeline event terkait
- Raw event data viewer
- Comment section untuk analyst
- Status management: `New → Acknowledged → Investigating → Resolved → False Positive`

### 🤖 Detection Engine
| Detection Type | Deskripsi |
|---|---|
| **Brute Force** | Failed login berulang dari IP yang sama |
| **Credential Stuffing** | Banyak username berbeda dari satu IP |
| **Password Spray** | Satu password dicoba ke banyak akun |
| **Impossible Travel** | Login dari lokasi yang mustahil dalam waktu singkat |
| **Known Bad IP** | IP dari daftar blacklist / TOR exit node |

### 🛡️ Response Engine
- Auto-block IP jika severity **Critical**
- Manual block / unblock IP
- Update blocked status secara real-time

### 🔌 Wazuh Integration
- Connect ke Wazuh REST API
- Poll authentication logs & sync agent list
- Tampilkan connection status

<br/>

---

## 🛠 Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React + Vite, Tailwind CSS, Recharts, Framer Motion, Socket.io-client |
| **Backend** | Node.js, Express, Socket.io |
| **Database** | PostgreSQL |
| **Cache / Detection** | Redis (sliding window) |
| **Authentication** | JWT |
| **SIEM** | Wazuh REST API |
| **Deployment** | Docker + Docker Compose |
| **Fonts** | Geist Mono, JetBrains Mono |

**Login Sources yang didukung:**
- Linux server logs
- Windows login logs
- Website login events
- Wazuh Manager
- Syslog server

<br/>

---

## 🏛 Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────────┐
│  Login Sources  │────▶│    Wazuh     │────▶│  SecureOps Backend  │
│  Linux / Win /  │     │   Manager    │     │  Node.js + Express  │
│  Web / Syslog   │     └──────────────┘     └────────┬────────────┘
└─────────────────┘                                   │
                                              ┌───────▼────────┐
                                              │ Detection Engine│
                                              │ PostgreSQL+Redis│
                                              └───────┬────────┘
                                                      │ Socket.io
                                              ┌───────▼────────┐
                                              │ React Dashboard │
                                              │  Analyst View   │
                                              └────────────────┘
```

<br/>

---

## 🗄 Database Schema

### Tables

| Table | Deskripsi |
|---|---|
| `login_events` | Semua login event dari Wazuh, website, syslog, endpoint |
| `alerts` | Alert yang dihasilkan detection engine |
| `blocked_ips` | IP yang diblok oleh response engine |
| `correlation_rules` | Threshold dan aturan deteksi |

### Key Schema

```sql
login_events   { id, source, ip, username, success, timestamp,
                 country, city, lat, lon, wazuh_rule_id, raw_data }

alerts         { id, rule_name, attack_type, severity, ip, username,
                 title, status, assigned_to, score, first_seen, last_seen }

blocked_ips    { ip, reason, blocked_by, alert_id, blocked_at,
                 expires_at, is_active }

correlation_rules { name, description, is_active, threshold,
                    window_secs, severity, config }
```

### Relationships

```
login_events  ──▶  alerts       (triggered by)
alerts        ──▶  blocked_ips  (may block)
rules         ──▶  alerts       (creates)
```

<br/>

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18.x`
- [Docker](https://www.docker.com/) & Docker Compose
- [PostgreSQL](https://www.postgresql.org/) `>= 14`
- [Redis](https://redis.io/) `>= 7`

### Installation

```bash
# 1. Clone repository
git clone https://github.com/Fajarlaksana/secureops.git
cd secureops

# 2. Install dependencies
npm install
cd client && npm install && cd ..

# 3. Setup environment variables
cp .env.example .env

# 4. Run in mock mode (no DB required)
npm run dev:mock

# 5. Or run in real mode
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Default Credentials

```
Email    : admin@secureops.local
Password : admin123
```

> ⚠️ Change default credentials before deploying to production!

<br/>

---

## 🔑 Environment Variables

```env
# App
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key-here
MOCK_MODE=true

# Database (real mode only)
DATABASE_URL=postgresql://user:password@localhost:5432/secureops

# Redis (real mode only)
REDIS_URL=redis://localhost:6379

# Wazuh (optional)
WAZUH_API_URL=https://wazuh-manager:55000
WAZUH_USERNAME=wazuh-api-user
WAZUH_PASSWORD=your-wazuh-password

# Frontend
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

<br/>

---

## ⚙️ Run Modes

| Mode | Deskripsi | DB Required |
|---|---|---|
| **Mock Mode** | Data generated otomatis, cocok untuk development & demo | ❌ |
| **Real Mode** | PostgreSQL + Redis + Wazuh integration | ✅ |

```bash
npm run dev:mock    # Mock mode
npm run dev         # Real mode
npm run build       # Production build
npm run lint        # Run ESLint
```

<br/>

---

## 🐳 Docker Deployment

```bash
# Build & start all services
docker compose up -d

# Services yang dijalankan:
# - secureops-backend  (port 3001)
# - secureops-frontend (port 5173)
# - postgresql         (port 5432)
# - redis              (port 6379)

# Stop services
docker compose down

# View logs
docker compose logs -f backend
```

<br/>

---

## 📁 Project Structure

```
secureops/
│
├── 📂 client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/         # Stat cards, charts
│   │   │   ├── alerts/            # Alert list & management
│   │   │   ├── map/               # Threat map (Leaflet)
│   │   │   ├── investigation/     # Investigation panel
│   │   │   └── ui/                # Shared UI components
│   │   ├── pages/                 # Route pages
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Socket.io client, API
│   │   └── store/                 # State management
│   └── vite.config.ts
│
├── 📂 server/                     # Node.js + Express backend
│   ├── routes/                    # API routes
│   ├── controllers/               # Route controllers
│   ├── services/
│   │   ├── detection/             # Brute force, stuffing, spray
│   │   ├── wazuh/                 # Wazuh API integration
│   │   └── mock/                  # Mock data generator
│   ├── models/                    # DB models (Prisma / Sequelize)
│   ├── middleware/                # Auth, validation
│   └── socket/                   # Socket.io handlers
│
├── 📂 prisma/
│   └── schema.prisma              # Database schema
│
├── 📄 docker-compose.yml          # Full stack deployment
├── 📄 .env.example                # Environment template
└── 📄 package.json
```

<br/>

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login & get JWT token |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/me` | Get current user |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | Summary stats (failed, success, alerts, IPs) |
| `GET` | `/api/events/trend` | Login trend chart data |
| `GET` | `/api/events/severity` | Severity distribution |

### Alerts
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/alerts` | List all alerts |
| `GET` | `/api/alerts/:id` | Alert detail + timeline |
| `PATCH` | `/api/alerts/:id/status` | Update alert status |
| `POST` | `/api/alerts/:id/assign` | Assign alert to analyst |
| `POST` | `/api/alerts/:id/comment` | Add analyst comment |

### Blocked IPs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/blocked-ips` | List blocked IPs |
| `POST` | `/api/blocked-ips` | Block an IP |
| `DELETE` | `/api/blocked-ips/:ip` | Unblock an IP |

### Wazuh
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/wazuh/status` | Connection status |
| `GET` | `/api/wazuh/agents` | Agent list |

<br/>

---

## 🗺️ Roadmap

```
MVP (v1.0)                    ████████████████████  In Progress
─────────────────────────────────────────────────────────────────
 Authentication                    ✅
 Dashboard + Stat Cards            ✅
 Login Trend Chart                 ✅
 Severity Donut Chart              ✅
 Threat Map                        ✅
 Alerts Page                       ✅
 Real-time Socket.io               ✅
 Mock Data Generator               ✅
 Basic Brute Force Detection       ✅
 Wazuh Placeholder                 ✅

v2.0 — Real Backend          ░░░░░░░░░░░░░░░░░░░░  Planned
─────────────────────────────────────────────────────────────────
 [ ] Real Wazuh integration
 [ ] PostgreSQL persistence
 [ ] Redis sliding window detection
 [ ] Automatic IP blocking
 [ ] Investigation comments
 [ ] Rule editor UI

v3.0 — Enterprise            ░░░░░░░░░░░░░░░░░░░░  Future
─────────────────────────────────────────────────────────────────
 [ ] Multi-user + RBAC
 [ ] Export PDF report
 [ ] Email / Telegram / Slack notification
 [ ] Endpoint monitoring
 [ ] Malware monitoring
 [ ] Firewall log monitoring
```

<br/>

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
# Fork → branch → commit → push → PR
git checkout -b feature/nama-fitur
git commit -m "feat: tambah fitur X"
git push origin feature/nama-fitur
```

<br/>

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

<br/>

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:2d1b69,50:1a0533,100:0B0B0F&height=100&section=footer"/>

Built with 🔐 for Security Operations Centers

*SecureOps — Monitor. Detect. Respond.*

</div>
