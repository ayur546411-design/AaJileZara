# Ji Le Zara (જી લે ઝરા) — Social Guidance Platform

> **Brand Tagline:** “Pause · Reflect · Realign · Live Fully”  
> **Brand Philosophy:** “Soch se Shanti Tak”  
> **Leadership:** Dr. Nilambari Dave, PhD  
> **Proposed Domain:** `www.jilezara.com`

---

## 🌸 Executive Overview

**Ji Le Zara** is a human-designed, editorial social well-being platform dedicated to family harmony, relational dynamics, parenting, life transitions, and personal clarity. Led by **Dr. Nilambari Dave, PhD** (Doctorate in Human Development and Family Studies, 30+ years of practice), the platform provides a safe sanctuary to de-escalate domestic conflict and quiet racing thoughts without judgment or clinical stigma.

### Key Distinctives:
1. **Social Guidance vs. Clinical Psychiatry:** Focuses on everyday relationships, cross-generational dynamics, self-worth, and transitions. Clearly demarcated from clinical psychiatric hospitalization or prescription pharmacotherapy.
2. **Replacing "7 Chakras" with 7 Stages of Life:** A grounded, human-centered framework spanning Self-Discovery, Relationships & Family, Parenting & Home Life, Emotional Well-being, Life Transitions, Social Communication, and Purpose & Balance.
3. **Two Guidance Plans:**
   - **Plan A — Direct Guidance:** Immediate category and advisor selection, slot booking, and instant Digital Live Session ID Card.
   - **Plan B — Advisory Team Support:** Confidential intake review by an authorized senior coordinator, matching to the most synergistic advisor, introductory call, and written roadmap.
4. **Transparent Category-Based Fair Pricing:** Subsidized rates for **Students (₹500)** and **Homemakers / Housewives (₹1,000)** alongside professional tiers.
5. **Session Scheduling with Anti-Double-Booking Protection:** Strict 15-minute buffer enforcement between sessions to ensure counselors are never rushed.
6. **Dual-Consent Recording Vault:** Live calls are strictly **unrecorded by default**. Recording is only triggered by explicit mutual opt-in consent, stored in private Azure Blob Storage, audited for access, and auto-purged on a mandatory **90-day retention countdown**.

---

## 🏛️ System Architecture

```
Jile Zara/
├── backend/                  # Node.js + Express + TypeScript + Prisma ORM
│   ├── prisma/
│   │   ├── schema.prisma     # Relational schema (Users, Bookings, Costs, Recordings)
│   │   └── seed.ts           # Authentic seed data with Dr. Nilambari Dave & team
│   ├── src/
│   │   ├── middleware/auth.ts# Clerk JWT & role verification (Admin, Advisor, Client)
│   │   ├── routes/           # REST APIs: bookings, categories, packages, daily, costs...
│   │   ├── test/runTests.ts  # Automated test suite (16 tests covering double-booking, etc.)
│   │   └── index.ts          # Express server with Helmet, CORS, Morgan
│   └── Dockerfile
├── frontend/                 # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Navbar, Footer, Floating Role Perspective Switcher
│   │   ├── context/          # AuthContext with instant multi-role perspective switcher
│   │   ├── pages/            # 14 Full pages (Home, About, Stages, Plans, Advisors,
│   │   │                     # Book, SessionRoom, Portal, AdvisoryPortal, Admin, Policies)
│   │   └── services/api.ts   # REST API client
│   └── Dockerfile
├── database/
│   └── migrations/
│       └── 001_init.sql      # Azure Database for PostgreSQL initial migration script
├── azure-deploy.json         # Azure ARM Template (App Service, PostgreSQL, Blob, KV, Insights)
├── docker-compose.yml        # Multi-container local orchestration
└── readme.md
```

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js** v20+ or v24+
- **npm** v10+

### 2. Backend Startup
```bash
cd backend
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```
*Backend runs on port `http://localhost:5000`.*

### 3. Run Automated Verification Tests
```bash
cd backend
npm test
```
*Verifies 16 critical test scenarios: double booking collision blocking, word limit rejection, category pricing rules (Student ₹500, Homemaker ₹1,000), 90-day retention calculation, and dual recording consent gating.*

### 4. Frontend Startup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on port `http://localhost:5174` (or `5173`).*

---

## 🧭 Multi-Role Perspective Switcher

For comprehensive testing without creating dummy accounts, click the floating **"Public Visitor"** pill in the bottom right corner of the website to switch perspectives instantaneously:

| Perspective | Identity | Role & Access |
|---|---|---|
| **Public Visitor** | Anonymous | Public pages, marketing, and booking wizard |
| **Aarav Sharma** | Student | Client Portal · Verified Student rate (₹500) |
| **Sunita Patel** | Homemaker | Client Portal · Dedicated Homemaker rate (₹1,000) |
| **Vikram Singh** | Professional | Client Portal · Standard Working Professional tier |
| **Prof. Ananya Sengupta** | Senior Advisor | **Advisor Space** · Review client intakes & internal notes |
| **Dr. Nilambari Dave, PhD** | Founder & Lead | **Complete 9-Module Admin Dashboard** |

---

## 🛡️ Complete Admin Dashboard Modules

1. **Overview:** Today's calls, upcoming appointments, pending Plan B requests, client distribution by category, revenue summary, and live audit logs.
2. **Session Scheduling:** View and manage appointments, assign counselors, verify 15-minute buffers, and launch session bridge cards.
3. **Users & Verification:** Directory of clients, booking histories, and one-click Student Discount (₹500) verification management.
4. **Advisory Team:** Workload tracking, active/deactive status toggles, weekly hours cap, and language coverage.
5. **Plans & Pricing:** Manage Plan A & B, adjust prices per category (Student, Homemaker, Professional), and update session counts.
6. **Intake & Word Limits:** Configure intake form fields, server-side word count limits (250-word max for concise clarity), and mandatory legal disclaimers.
7. **Payments & Refunds:** Transaction ledger, payment verification, and refund management with audit logging.
8. **Secure Recording Vault:** Administrator-only access library, playback authorization, confirmed permanent purge actions, and 90-day retention countdown.
9. **Infrastructure & Azure Costs:** 9 cost categories (Domain 3-yr amortized ₹89/mo, Azure App Service, PostgreSQL, Blob Storage, Daily Video SDK, Bandwidth, Notifications, Monitoring) with budget threshold alerts (>80%).

---

## ☁️ Azure Cloud Deployment Guide

1. **Database:** Deploy **Azure Database for PostgreSQL Flexible Server** (B1ms, Central India). Apply `database/migrations/001_init.sql`.
2. **App Service:** Deploy **Azure App Service (Linux B1)** running Node.js 20 LTS using `azure-deploy.json`.
3. **Blob Storage:** Create private containers in **Azure Blob Storage** (`private-recordings`) with public access disabled.
4. **Key Vault:** Store `CLERK_SECRET_KEY`, `DAILY_API_KEY`, and `AZURE_STORAGE_CONNECTION_STRING`.
5. **Domain:** Connect `www.jilezara.com` with custom domain binding and automated App Service Managed SSL certificate.