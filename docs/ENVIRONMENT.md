# GD Prep Coach — Environment Configuration

**Updated Day 5 | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

---

## Backend Environment Variables (`server/.env`)

**⚠️ This file is never committed to Git** — it's excluded via `.gitignore`.

| Variable | Purpose | Example Format |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `MONGO_URI` | Full MongoDB Atlas connection string, including database name | `mongodb+srv://<user>:<password>@gdprepcoach.xxxxx.mongodb.net/gdprepcoach?appName=gdprepcoach` |
| `JWT_SECRET` | Random secret used to sign/verify login tokens | 64-character hex string generated via `crypto.randomBytes(32)` |
| `GEMINI_API_KEY` | Google Gemini API key for AI response analysis | From Google AI Studio (aistudio.google.com/apikey) — **free tier, no credit card required** |

**Note:** The original PRD/Architecture specified the Anthropic Claude API. This was changed on Day 5 to Google Gemini to keep the project buildable entirely with free tools. See `PROJECT-STRUCTURE.md` Day 5 notes for details.

---

## Frontend Environment Variables (`client/.env.production`)

**Not yet created** — will be added on Day 9 (Deployment).

| Variable | Purpose | Set On |
|---|---|---|
| `VITE_API_URL` | Base URL of the deployed backend API | Day 9 |

---

## Tools & Versions

| Tool | Version |
|---|---|
| Node.js | v22.20.0 |
| npm | 10.9.3 |
| Git | 2.52.0.windows.1 |
| Vite | v8.2.2 |
| nodemon | 3.1.14 |
| @google/generative-ai | Latest (installed Day 5) |

---

## AI Provider Configuration

| Setting | Value |
|---|---|
| Provider | Google Gemini (via `@google/generative-ai` SDK) |
| Model | `gemini-3.6-flash` |
| Cost | Free tier — no credit card required |
| Where called | Backend only (`server/services/analyzeResponse.js`) — key never exposed to frontend |
| Getting a key | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → Create API key |

---

## MongoDB Atlas Configuration

| Setting | Value |
|---|---|
| Organization | Ramya's Org - 2025-06-27 |
| Project | GD Prep Coach (dedicated project) |
| Cluster Name | `gdprepcoach` |
| Tier | M0 (Free) |
| Region | AWS / Mumbai (`ap-south-1`) |
| Database Name | `gdprepcoach` |
| Network Access | `0.0.0.0/0` (Allow Access from Anywhere) |

---

## Security Notes

- `server/.env` is git-ignored and must never be committed.
- **Action item carried over from Day 3:** rotate the MongoDB database password (it was shared in plaintext during chat-based setup at one point). Same caution applies to the Gemini API key if it's ever pasted into a chat — regenerate it from Google AI Studio if so.
- Multi-machine note: when continuing work on a different computer, `.env` must be recreated manually each time (it's never included in Git/ZIP downloads by design) — reuse the same MongoDB and Gemini credentials, no need to create new services.
