<div align="center">

<br/>

```
  🔐  S E C U R E O P S
```

### *Monitor. Detect. Respond — Login Attack Monitoring Dashboard for Security Operations.*

<br/>

[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Wazuh](https://img.shields.io/badge/Wazuh-SIEM-00A8E0?style=flat-square)](https://wazuh.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-MVP_In_Progress-7C3AED?style=flat-square)]()
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange?style=flat-square)]()

<br/>

> 🔐 SecureOps adalah SOC dashboard berbasis web yang berfokus pada Login Attack Monitoring.
> Dibangun dengan React, Node.js, dan Socket.io — mendeteksi Brute Force, Credential Stuffing,
> Password Spray, dan Impossible Travel secara real-time.

<br/>

[🚀 Live Demo](#) · [📖 Dokumentasi](#-daftar-isi--table-of-contents) · [🐛 Report Bug](mailto:fajarlaksana13@gmail.com) · [✨ Request Feature](mailto:fajarlaksana13@gmail.com)

<br/>

---

</div>

## 📸 Screenshot

> <img width="1905" height="900" alt="image" src="https://github.com/user-attachments/assets/5b9b4be1-3455-4e2c-bf8c-554a83fce60d" />


<br/>

## 📋 Daftar Isi / Table of Contents

- [Tentang Proyek / About](#-tentang-proyek--about)
- [Status Proyek / Project Status](#-status-proyek--project-status)
- [Tech Stack](#-tech-stack)
- [Fitur / Features](#-fitur--features)
- [Arsitektur / Architecture](#-arsitektur--architecture)
- [Database Schema](#-database-schema)
- [Memulai / Getting Started](#-memulai--getting-started)
- [Struktur Proyek / Project Structure](#-struktur-proyek--project-structure)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [Catatan Developer / Developer Notes](#-catatan-developer--developer-notes)
- [Kontribusi / Contributing](#-kontribusi--contributing)
- [Kontak / Contact](#-kontak--contact)
- [Lisensi / License](#-lisensi--license)

<br/>

---

## 🌟 Tentang Proyek / About

**🇮🇩 Bahasa Indonesia**

**SecureOps** adalah aplikasi SOC dashboard berbasis web yang berfokus pada **Login Attack Monitoring**. Sistem ini dirancang untuk membantu security analyst dan administrator memonitor aktivitas login mencurigakan secara real-time, mendeteksi brute force attack, credential stuffing, password spray, dan suspicious login patterns dari berbagai sumber log.

**🇬🇧 English**

**SecureOps** is a web-based SOC dashboard focused on **Login Attack Monitoring**. The system is designed to help security analysts and administrators monitor suspicious login activity in real-time, detecting brute force attacks, credential stuffing, password spray, and suspicious login patterns from multiple log sources.

<br/>

---

## 📋 Status Proyek / Project Status

**🇮🇩** Proyek ini sedang dalam tahap pengembangan **MVP (v1.0)**. Fitur utama dashboard dan detection engine sedang dibangun. Fokus pengembangan berikutnya setelah MVP adalah **integrasi backend nyata dengan PostgreSQL, Redis, dan Wazuh**.

**🇬🇧** This project is currently in **MVP (v1.0)** development. Core dashboard features and detection engine are being built. The next development focus after MVP is **real backend integration with PostgreSQL, Redis, and Wazuh**.

<br/>

| Komponen / Component | Status |
|---|---|
| Authentication & Protected Routes | ✅ Selesai / Done |
| Dashboard Utama + Stat Cards | ✅ Selesai / Done |
| Login Trend Chart | ✅ Selesai / Done |
| Severity Donut Chart | ✅ Selesai / Done |
| Threat Map | ✅ Selesai / Done |
| Alerts Management Page | ✅ Selesai / Done |
| Real-time Socket.io Updates | ✅ Selesai / Done |
| Mock Data Generator | ✅ Selesai / Done |
| Basic Brute Force Detection | ✅ Selesai / Done |
| Wazuh Placeholder Integration | ✅ Selesai / Done |
| Investigation Panel | ⏳ Belum / Pending |
| PostgreSQL Persistence | ⏳ Belum / Pending |
| Redis Sliding Window Detection | ⏳ Belum / Pending |
| Real Wazuh Integration | ⏳ Belum / Pending |
| Automatic IP Blocking | ⏳ Belum / Pending |

<br/>

---

## 🛠 Tech Stack

| Layer | Teknologi / Technology |
|---|---|
| **Frontend** | [React](https://react.dev/) + [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Recharts](https://recharts.org/), [Framer Motion](https://www.framer.com/motion/), [Socket.io-client](https://socket.io/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Socket.io](https://socket.io/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **Cache / Detection** | [Redis](https://redis.io/) (sliding window) |
| **Authentication** | JWT |
| **SIEM** | [Wazuh REST API](https://wazuh.com/) |
| **Deployment** | [Docker](https://www.docker.com/) + Docker Compose |
| **Fonts** | Geist Mono, JetBrains Mono |
| **Run Mode (dev)** | Mock mode — tanpa DB / without DB |
| **Run Mode (prod)** | Real mode — PostgreSQL + Redis + Wazuh |

**Login Sources yang didukung / Supported login sources:**
Linux Server · Windows Endpoint · Website Login · Wazuh Manager · Syslog Server

<br/>

---

## ✨ Fitur / Features

### 🏠 Dashboard Utama / Main Dashboard
- Stat cards: Total failed logins, successful logins, high severity alerts, attacker IPs
- Login trend chart (per jam / per hari) dengan filter date range
- Severity donut chart: Low · Medium · High · Critical
- Active threats panel & threat trend

### 🗺️ Threat Map
- Visualisasi lokasi attacker IP di peta dunia / World map visualization of attacker IPs
- Marker berwarna berdasarkan severity / Color-coded markers by severity
- Popup detail: IP, negara, kota, ISP, attack type, hit count

### 🚨 Alerts Management
- Daftar alert dengan severity badge & timestamp / Alert list with severity badge & timestamp
- Filter berdasarkan status dan severity / Filter by status and severity
- Actions: **Assign · Investigate · Update Status · Dismiss**

### 🔬 Investigation Panel
- Detail alert + timeline event terkait / Alert detail + related event timeline
- Raw event data viewer
- Comment section untuk analyst / Analyst comment section
- Status: `New → Acknowledged → Investigating → Resolved → False Positive`

### 🤖 Detection Engine

| Tipe Deteksi / Detection Type | Deskripsi / Description |
|---|---|
| **Brute Force** | Failed login berulang dari IP yang sama / Repeated failed logins from same IP |
| **Credential Stuffing** | Banyak username berbeda dari satu IP / Many different usernames from one IP |
| **Password Spray** | Satu password dicoba ke banyak akun / One password tried against many accounts |
| **Impossible Travel** | Login dari lokasi mustahil dalam waktu singkat / Login from impossible location in short time |
| **Known Bad IP** | IP dari blacklist / TOR exit node / IP from blacklist or TOR exit node |

### 🛡️ Response Engine
- Auto-block IP jika severity **Critical** / Auto-block IP if severity is Critical
- Manual block / unblock IP
- Update blocked status secara real-time / Real-time blocked status updates

### 🔌 Wazuh Integration
- Connect ke Wazuh REST API & poll authentication logs
- Sync agent list & tampilkan connection status / Display connection status

<br/>

---

## 🏛 Arsitektur / Architecture

**🇮🇩** Alur data dari sumber login hingga tampilan analyst:

**🇬🇧** Data flow from login sources to analyst view:

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────────────┐
│  Login Sources  │────▶│    Wazuh     │────▶│  SecureOps Backend   │
│                 │     │   Manager    │     │  Node.js + Express   │
│  · Linux Server │     └──────────────┘     └──────────┬───────────┘
│  · Windows      │                                     │
│  · Web Login    │                          ┌──────────▼───────────┐
│  · Syslog       │                          │   Detection Engine   │
└─────────────────┘                          │  PostgreSQL + Redis  │
                                             └──────────┬───────────┘
                                                        │ Socket.io
                                             ┌──────────▼───────────┐
                                             │   React Dashboard    │
                                             │    Analyst View      │
                                             └──────────────────────┘
```

<br/>

---

## 🗄 Database Schema

### Tables

| Tabel / Table | Deskripsi / Description |
|---|---|
| `login_events` | Semua login event dari Wazuh, website, syslog, endpoint / All login events |
| `alerts` | Alert yang dihasilkan detection engine / Alerts generated by detection engine |
| `blocked_ips` | IP yang diblok oleh response engine / IPs blocked by response engine |
| `correlation_rules` | Threshold dan aturan deteksi / Detection thresholds and rules |

### Relationships

```
login_events  ──▶  alerts       (triggered by)
alerts        ──▶  blocked_ips  (may block)
correlation_rules ▶ alerts      (creates)
```

<br/>

---

## 🚀 Memulai / Getting Started

### Prasyarat / Prerequisites

Pastikan sudah menginstal / Make sure you have installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) atau/or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) & Docker Compose *(untuk real mode / for real mode)*

### Instalasi / Installation

```bash
# 1. Clone repository ini / Clone this repository
git clone https://github.com/Fajarlaksana/secureops.git

# 2. Masuk ke direktori / Navigate to directory
cd secureops

# 3. Install dependencies
npm install
cd client && npm install && cd ..

# 4. Setup environment variables
cp .env.example .env

# 5. Jalankan dalam mock mode (tanpa DB) / Run in mock mode (no DB needed)
npm run dev:mock

# 6. Buka di browser / Open in browser
```

Buka / Open [http://localhost:5173](http://localhost:5173) di browser.

### Default Credentials

```
Email    : admin@secureops.local
Password : admin123
```

> ⚠️ **Penting / Important:** Ganti password default sebelum deploy ke production! / Change the default password before deploying to production!

### Environment Variables

Buat file `.env` dari template / Create `.env` from template:

```bash
cp .env.example .env
```

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

### Scripts

```bash
npm run dev:mock    # Mock mode — tanpa DB / without DB
npm run dev         # Real mode — dengan DB & Wazuh / with DB & Wazuh
npm run build       # Production build
npm run lint        # Run ESLint
```

### Docker Deployment

```bash
# Build & start semua services / Build & start all services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f backend
```

<br/>

---

## 📁 Struktur Proyek / Project Structure

```
secureops/
│
├── 📄 docker-compose.yml          # Full stack deployment
├── 📄 .env.example                # Environment variables template
├── 📄 package.json                # Root scripts
│
├── 📂 client/                     # React + Vite frontend
│   └── src/
│       ├── 📂 components/
│       │   ├── dashboard/         # Stat cards, trend chart, donut chart
│       │   ├── alerts/            # Alert list & management
│       │   ├── map/               # Threat map (Leaflet / Recharts)
│       │   ├── investigation/     # Investigation panel, timeline
│       │   └── ui/                # Shared UI components
│       ├── 📂 pages/              # Route pages
│       ├── 📂 hooks/              # Custom React hooks
│       ├── 📂 lib/                # Socket.io client, API helpers
│       └── 📂 store/              # State management
│
└── 📂 server/                     # Node.js + Express backend
    ├── 📂 routes/                 # API routes
    ├── 📂 controllers/            # Route controllers
    ├── 📂 services/
    │   ├── detection/             # Brute force, stuffing, spray engine
    │   ├── wazuh/                 # Wazuh API integration
    │   └── mock/                  # Mock data generator
    ├── 📂 models/                 # DB models
    ├── 📂 middleware/             # Auth, validation
    └── 📂 socket/                 # Socket.io event handlers
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
| `GET` | `/api/stats` | Summary stats |
| `GET` | `/api/events/trend` | Login trend chart data |
| `GET` | `/api/events/severity` | Severity distribution |

### Alerts
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/alerts` | List all alerts |
| `GET` | `/api/alerts/:id` | Alert detail + timeline |
| `PATCH` | `/api/alerts/:id/status` | Update alert status |
| `POST` | `/api/alerts/:id/assign` | Assign to analyst |
| `POST` | `/api/alerts/:id/comment` | Add comment |

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
Phase 1 — MVP v1.0              ████████████████████  ⏳ In Progress
Phase 2 — Real Backend          ░░░░░░░░░░░░░░░░░░░░  🔜 Planned
Phase 3 — Enterprise            ░░░░░░░░░░░░░░░░░░░░  🔜 Future
```

### ⏳ Phase 1 — MVP v1.0 *(In Progress)*
- [x] Authentication & protected routes
- [x] Dashboard utama + stat cards
- [x] Login trend chart
- [x] Severity donut chart
- [x] Threat map
- [x] Alerts page
- [x] Real-time Socket.io updates
- [x] Mock data generator
- [x] Basic brute force detection
- [x] Wazuh placeholder integration
- [ ] Investigation panel dengan timeline & comment
- [ ] Dark mode / Light mode toggle

### 🔜 Phase 2 — Real Backend *(Planned)*
- [ ] Real Wazuh REST API integration
- [ ] PostgreSQL persistence
- [ ] Redis-based sliding window detection
- [ ] Automatic IP blocking (severity Critical)
- [ ] Investigation comment section
- [ ] Rule editor UI

### 🔜 Phase 3 — Enterprise *(Future)*
- [ ] Multi-user support & RBAC permissions
- [ ] Export PDF report
- [ ] Email / Telegram / Slack notification
- [ ] Endpoint monitoring
- [ ] Malware monitoring
- [ ] Firewall log monitoring

<br/>

---

## 📌 Catatan Developer / Developer Notes

### ⚠️ Status Mode Saat Ini / Current Mode Status

**🇮🇩** Saat ini aplikasi berjalan dalam **Mock Mode** — semua data dihasilkan secara otomatis oleh mock data generator tanpa memerlukan database nyata. Ini ideal untuk development dan demo, namun memiliki keterbatasan:

**🇬🇧** The app currently runs in **Mock Mode** — all data is automatically generated by a mock data generator without requiring a real database. This is ideal for development and demos, but has limitations:

| Keterbatasan / Limitation | |
|---|---|
| ❌ Data tidak persisten | Data is not persistent — resets on restart |
| ❌ Detection engine belum real | Detection engine not yet fully real |
| ❌ Wazuh belum terhubung | Wazuh is not yet connected |
| ❌ IP blocking belum aktif | IP blocking not yet active |
| ❌ Investigation panel belum tersedia | Investigation panel not yet available |

### 💡 Solusi yang Direkomendasikan / Recommended Solution

**🇮🇩** Untuk menjalankan SecureOps dalam mode produksi nyata, diperlukan:

**🇬🇧** To run SecureOps in real production mode, the following are required:

| Komponen | Mock Mode | Real Mode |
|---|---|---|
| Data persistence | ❌ In-memory | ✅ PostgreSQL |
| Detection sliding window | ❌ Simplified | ✅ Redis |
| Login source | ❌ Generated | ✅ Wazuh / Syslog |
| IP blocking | ❌ Simulated | ✅ Active firewall |
| Deployment | ✅ `npm run dev:mock` | ✅ Docker Compose |

> 💡 **Real Wazuh integration tetap menjadi prioritas utama pengembangan selanjutnya.**
> Real Wazuh integration remains the top priority for the next development phase.

<br/>

---

## 🤝 Kontribusi / Contributing

**🇮🇩** Kontribusi sangat disambut! Proyek ini terbuka untuk siapa saja yang ingin membantu mengembangkan SecureOps.

**🇬🇧** Contributions are very welcome! This project is open to anyone who wants to help develop SecureOps.

```bash
# 1. Fork repository ini / Fork this repository

# 2. Buat branch baru / Create a new branch
git checkout -b feature/nama-fitur

# 3. Commit perubahan / Commit your changes
git commit -m "feat: tambah fitur X"

# 4. Push ke branch / Push to branch
git push origin feature/nama-fitur

# 5. Buka Pull Request / Open a Pull Request
```

### Prioritas Kontribusi / Contribution Priorities

| Prioritas | Task |
|---|---|
| 🔴 **High** | Real Wazuh REST API integration |
| 🔴 **High** | PostgreSQL + Prisma persistence layer |
| 🔴 **High** | Redis sliding window detection engine |
| 🟡 **Medium** | Investigation panel (timeline + comment) |
| 🟡 **Medium** | Automatic IP blocking (severity Critical) |
| 🟡 **Medium** | Dark mode / Light mode toggle |
| 🟢 **Low** | Export PDF report |
| 🟢 **Low** | Email / Telegram / Slack notification |

<br/>

---

## 📬 Kontak / Contact

**🇮🇩** Jika kamu tertarik untuk melanjutkan, berkontribusi, atau mendukung proyek ini, silakan hubungi:

**🇬🇧** If you are interested in continuing, contributing, or supporting this project, feel free to contact:

<div align="center">

**Fajar Laksana**

📧 [fajarlaksana13@gmail.com](mailto:fajarlaksana13@gmail.com)

🔗 [github.com/Fajarlaksana](https://github.com/Fajarlaksana)

</div>

<br/>

---

<div align="center">

Dibangun dengan 🔐 untuk Security Operations Centers

*SecureOps — Monitor. Detect. Respond.*

</div>
