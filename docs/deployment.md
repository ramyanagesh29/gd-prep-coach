# GD Prep Coach — Deployment Guide

**Day 6 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

---

## Live URLs

| Service | URL |
|---|---|
| Frontend (Vercel) | `https://gd-prep-coach-1yw5oijby-ramy....vercel.app` (see Vercel dashboard for permanent alias) |
| Backend (Render) | `https://gd-prep-coach.onrender.com` |
| Health check | `https://gd-prep-coach.onrender.com/api/health` |

---

## Backend Deployment (Render)

1. Created a free Render account, connected via GitHub.
2. New Web Service → connected to `gd-prep-coach` repo.
3. Configuration:
   - **Root Directory:** `server` (backend code lives in this subfolder, not repo root)
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
   - **Region:** Singapore
4. Environment variables set directly in Render's dashboard (never committed to Git):
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
5. Deploy logs confirmed: `🚀 Server running`, `✅ MongoDB connected`, `Your service is live`.

**Known free-tier behavior:** Render's free instances spin down after 15 minutes of inactivity. The first request after idle time takes 30-50 seconds to wake up — this is expected, not a bug.

---

## Frontend Deployment (Vercel)

1. Connected Vercel to GitHub, imported `gd-prep-coach` repo.
2. Configuration:
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `client` (frontend code lives in this subfolder)
3. Environment variable set in Vercel dashboard:
   - `VITE_API_URL` → `https://gd-prep-coach.onrender.com/api`
4. Deployed successfully — confirmed footer text visible on live site: *"Built with Claude as part of the AB Talks 60-Day Claude AI Challenge."*

---

## Post-Deployment Verification (Completed Day 6)

- [x] Signed up with a new account on the **live** site (not localhost)
- [x] Browsed topics with category filtering on live site
- [x] Submitted a practice response (text) on live site
- [x] Received a real AI-generated score and feedback from the live backend
- [x] Dashboard showed correct streak/goal data on live site
- [x] History page showed correct attempt list on live site
- [x] Footer visible on the deployed application

---

## Current Known Limitations (Intentional, Scheduled for Later Days)

| Limitation | Planned Fix |
|---|---|
| CORS is fully open (`cors()`, not restricted to Vercel's exact origin) | Day 9 — lock down to deployed frontend URL only |
| Dashboard/History pages are functionally complete but visually plain | Day 7 — UI/UX polish pass |
| No automated tests yet | Day 8 — structured testing |

These are deliberate sequencing choices per the Implementation Blueprint, not oversights — Day 6's goal was a working MVP, not final polish.
