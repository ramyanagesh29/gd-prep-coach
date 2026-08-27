# GD Prep Coach — Project Structure

**Updated Day 6 | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

```
gd-prep-coach/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx            ✅ Functional (Day 4)
│   │   │   ├── Signup.jsx           ✅ Functional (Day 4)
│   │   │   ├── DashboardPage.jsx    ✅ Functional (Day 6) — streak, goal, recent attempts
│   │   │   ├── TopicsPage.jsx       ✅ Functional (Day 4/5)
│   │   │   ├── PracticePage.jsx     ✅ Functional (Day 5)
│   │   │   ├── ResultsPage.jsx      ✅ Functional (Day 5)
│   │   │   └── HistoryPage.jsx      ✅ Functional (Day 6) — full attempt table
│   │   ├── components/
│   │   │   ├── NavBar.jsx           ✅ (Day 3)
│   │   │   ├── TopicCard.jsx        ✅ (Day 4)
│   │   │   ├── StreakBadge.jsx      ✅ Created (Day 6)
│   │   │   ├── GoalProgressBar.jsx  ✅ Created (Day 6)
│   │   │   ├── ScoreBadge.jsx       ⏳ Day 7 (visual polish)
│   │   │   ├── Toast.jsx            ⏳ Day 7
│   │   │   └── EmptyState.jsx       ⏳ Day 7
│   │   ├── hooks/
│   │   │   └── useSpeechRecognition.js  ✅ (Day 5)
│   │   ├── api/
│   │   │   └── axios.js             ✅ (Day 3) — now points to live backend via VITE_API_URL
│   │   ├── App.jsx                  ✅ Updated (Day 6) — added required footer, flex layout
│   │   └── main.jsx                 ✅ Vite default
│   └── package.json                 ✅ Configured
│
├── server/
│   ├── models/
│   │   ├── User.js                  ✅ (Day 3)
│   │   ├── Topic.js                 ✅ (Day 4)
│   │   └── Attempt.js               ✅ (Day 5)
│   ├── routes/
│   │   ├── auth.js                  ✅ (Day 4)
│   │   ├── topics.js                ✅ (Day 4)
│   │   ├── attempts.js              ✅ (Day 5)
│   │   └── users.js                 ✅ Created (Day 6) — dashboard + goal endpoints
│   ├── middleware/
│   │   └── auth.js                  ✅ (Day 3)
│   ├── services/
│   │   └── analyzeResponse.js       ✅ (Day 5) — Gemini AI integration
│   ├── utils/
│   │   └── streak.js                ✅ Created (Day 6) — streak & week-progress logic
│   ├── seed/
│   │   └── seedTopics.js            ✅ (Day 4)
│   ├── server.js                    ✅ Updated (Day 6) — all routers mounted
│   ├── package.json                 ✅ Configured
│   └── .env                         ✅ (local only, git-ignored)
│
├── docs/
│   ├── ARCHITECTURE.md              ✅ (Day 2)
│   ├── SCHEMA.md                    ✅ (Day 2)
│   ├── API.md                       ✅ (Day 2)
│   ├── UI-WIREFRAMES.md             ✅ (Day 2)
│   ├── PROJECT-STRUCTURE.md         ✅ This file, updated Day 6
│   ├── SETUP.md                     ✅ (Day 3)
│   ├── ENVIRONMENT.md               ✅ (Day 5)
│   ├── DAY3-SUMMARY.md              ✅ (Day 3)
│   ├── DAY5-SUMMARY.md              ✅ (Day 5)
│   ├── DAY6-SUMMARY.md              ✅ New (Day 6)
│   └── DEPLOYMENT.md                ✅ New (Day 6)
│
├── .gitignore
└── README.md
```

## MVP Status: Complete ✅

As of Day 6, every core feature from the PRD's "In Scope (v1.0)" list is implemented and working together as a live, deployed application:

- ✅ Auth (signup/login, JWT)
- ✅ Curated topic library with category filtering
- ✅ Text + voice input (Web Speech API)
- ✅ AI analysis (Google Gemini) with score + structured feedback
- ✅ Practice history per user
- ✅ Streak & weekly goal tracking with in-app reminder banner
- ✅ Required footer: "Built with Claude as part of the AB Talks 60-Day Claude AI Challenge."
- ✅ Deployed live (Render backend + Vercel frontend)

**Remaining before final v1.0 polish (Days 7-10):** visual design pass, structured testing, CORS lockdown, final documentation.

## Legend
- ✅ = File exists and is functional as of today
- ⏳ = Planned, scheduled for a specific upcoming Blueprint day
