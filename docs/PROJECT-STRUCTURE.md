# GD Prep Coach — Project Structure

**Day 2 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

```
gd-prep-coach/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── pages/                   # One file per screen
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── TopicsPage.jsx
│   │   │   ├── PracticePage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   └── HistoryPage.jsx
│   │   ├── components/              # Reusable UI pieces
│   │   │   ├── NavBar.jsx
│   │   │   ├── TopicCard.jsx
│   │   │   ├── ScoreBadge.jsx
│   │   │   ├── StreakBadge.jsx
│   │   │   ├── GoalProgressBar.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useSpeechRecognition.js
│   │   ├── api/                     # Axios instance + API calls
│   │   │   └── axios.js
│   │   ├── styles/                  # Theme/design system
│   │   │   └── theme.css
│   │   ├── App.jsx                  # Routes definition
│   │   └── main.jsx                 # Entry point
│   ├── index.html
│   ├── package.json
│   └── .env.production              # VITE_API_URL (set on Day 9)
│
├── server/                          # Express backend
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Topic.js
│   │   └── Attempt.js
│   ├── routes/                      # Route definitions
│   │   ├── auth.js
│   │   ├── topics.js
│   │   ├── attempts.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── services/
│   │   └── analyzeResponse.js       # Claude API call logic
│   ├── utils/
│   │   └── streak.js                # Streak/goal calculation logic
│   ├── seed/
│   │   └── seedTopics.js            # Curated topic seed data
│   ├── server.js                    # App entry point
│   ├── package.json
│   └── .env                         # Never committed — in .gitignore
│
├── docs/                            # All design documents (Day 2 output)
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   └── PROJECT-STRUCTURE.md
│
├── .gitignore
└── README.md
```

## Rationale

- **`client` and `server` fully separated** — each deploys independently (Vercel for client, Render for server), matching the hosting plan in the PRD.
- **`pages/` vs `components/` split** — full screens are distinct from reusable pieces, and this maps directly to the Blueprint's daily build order (each day's Blueprint section names specific files here).
- **`services/` isolates Claude API logic** — keeps AI-calling code testable and separate from route handlers, so debugging AI issues doesn't require digging through routing code.
- **`utils/` for pure logic** — streak/goal calculations are pure functions, easy to unit test independently of the database or API.
- **`seed/` for content, not code** — curated GD topics are data, kept separate from application logic.
- **`docs/` centralizes planning artifacts** — every future day's fresh AI conversation can reference these files directly instead of re-deriving decisions.
- **`.env` never committed** — both `client/.env.production` and `server/.env` contain environment-specific secrets/URLs and are excluded via `.gitignore`.

## Where Future Code Will Live (Blueprint Cross-Reference)

| Blueprint Day | Primary Files Touched |
|---|---|
| Day 2 (today) | `docs/*.md` only — no code yet |
| Day 3 | `server/models/Topic.js`, `server/routes/topics.js`, `server/seed/seedTopics.js`, `client/src/pages/TopicsPage.jsx` |
| Day 4 | `server/models/Attempt.js`, `server/routes/attempts.js`, `client/src/pages/PracticePage.jsx`, `client/src/hooks/useSpeechRecognition.js` |
| Day 5 | `server/services/analyzeResponse.js`, `client/src/pages/ResultsPage.jsx` |
| Day 6 | `server/utils/streak.js`, `client/src/pages/DashboardPage.jsx`, `client/src/pages/HistoryPage.jsx` |
| Day 7 | `client/src/styles/theme.css`, `client/src/components/*` polish pass |
| Day 8 | Bug fixes across existing files, `TESTING.md` (new, root level) |
| Day 9 | `client/.env.production`, `server/.env` (production values), CORS config in `server.js` |
| Day 10 | `README.md` (final version) |
