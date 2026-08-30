# 🎙️ GD Prep Coach

**AI-powered Group Discussion practice & feedback platform.**

Practice for Group Discussion interview rounds by typing or speaking your responses, and get instant, structured AI feedback on clarity, structure, relevance, and assertiveness — built to help students stop guessing why they failed a GD and start improving with specific, actionable feedback.

🔗 **Live App:** [gd-prep-coach.vercel.app](https://gd-prep-coach.vercel.app)
📦 **Built as part of the [ABTalks 60-Day Claude AI Challenge](https://www.abtalks.in)**

---

## 📸 Preview

| Dashboard | Practice | Results |
|---|---|---|
| Streak tracking, weekly goals, recent attempts | Text or voice input for any GD topic | Color-coded AI score + detailed feedback |


---

## ✨ Features

- 🔐 **Secure authentication** — JWT-based signup/login, bcrypt password hashing
- 📚 **Curated GD topic library** — filterable by category (Current Affairs, Abstract, Case Study, Social Issues)
- 🎤 **Text or voice input** — speak your response using the browser's built-in speech recognition
- 🤖 **Real AI analysis** — powered by Google Gemini, scores responses on clarity, structure, relevance, and assertiveness with specific improvement tips
- 📊 **Practice history** — every attempt saved and scored, viewable over time
- 🔥 **Streaks & weekly goals** — stay accountable with a practice streak counter and configurable weekly goal
- 📱 **Fully responsive** — works cleanly on desktop and mobile
- 🛡️ **Production-hardened** — rate limiting, security headers, input validation, centralized error handling

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Authentication | JWT, bcrypt |
| AI | Google Gemini API (free tier) |
| Voice Input | Browser Web Speech API |
| Hosting | Vercel (frontend), Render (backend) |

---

## 🏗️ Architecture

```
Browser (React + Web Speech API)
        │
        ▼
Express REST API (JWT-protected, rate-limited)
        │
   ┌────┴────┐
   ▼         ▼
MongoDB   Gemini API
Atlas     (AI analysis)
```

Full architecture diagrams, database schema, and API documentation are in [`/docs`](./docs).

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+ and npm
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A free [Google Gemini API key](https://aistudio.google.com/apikey)

### Setup

```bash
# Clone the repo
git clone https://github.com/ramyanagesh29/gd-prep-coach.git
cd gd-prep-coach

# Backend setup
cd server
npm install
# Create a .env file (see docs/ENVIRONMENT.md for the full list of variables)
npm run dev

# Frontend setup (in a new terminal)
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` — the frontend expects the backend running on `http://localhost:5000`.

Full setup instructions: [`docs/SETUP.md`](./docs/SETUP.md)

---

## 📁 Project Structure

```
gd-prep-coach/
├── client/     # React frontend
├── server/     # Express backend
└── docs/       # Architecture, schema, API docs, and daily build logs
```

Full structure breakdown: [`docs/PROJECT-STRUCTURE.md`](./docs/PROJECT-STRUCTURE.md)

---

## 📚 Documentation

| Doc | Description |
|---|---|
| [PRD](./docs/GD_Prep_Coach_PRD.docx) | Product requirements document |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture & diagrams |
| [SCHEMA.md](./docs/SCHEMA.md) | Database schema |
| [API.md](./docs/API.md) | Full API endpoint reference |
| [SETUP.md](./docs/SETUP.md) | Local development setup |
| [ENVIRONMENT.md](./docs/ENVIRONMENT.md) | Environment variables reference |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Deployment guide |
| [TESTING.md](./docs/TESTING.md) | QA & testing log |

---

## 🎯 Project Background

This project was built as a 10-day capstone for the ABTalks 60-Day Claude AI Challenge, following a real software development lifecycle: Requirements → Design → Setup → Implementation → Testing → Deployment → Maintenance.

It was inspired by a genuinely personal problem — failing multiple Group Discussion rounds during campus placement prep with no specific, actionable feedback on what went wrong. GD Prep Coach exists to close that feedback gap for any student preparing for placements.

---

## 🔮 Future Scope

- Audio-based delivery analysis (tone, pace, confidence from voice, not just transcribed text)
- Live multi-user GD practice rooms
- Mentor/coach review mode
- Leaderboards and peer benchmarking
- Deeper analytics on long-term progress trends

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with [Claude](https://claude.com) as part of the [ABTalks 60-Day Claude AI Challenge](https://www.abtalks.in).

---

**Built by [Ramya N](https://github.com/ramyanagesh29)**

