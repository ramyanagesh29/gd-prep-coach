# GD Prep Coach — Project Structure

**Updated Day 5 | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

```
gd-prep-coach/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx            ✅ Functional (Day 4)
│   │   │   ├── Signup.jsx           ✅ Functional (Day 4)
│   │   │   ├── DashboardPage.jsx    ⏳ Day 6
│   │   │   ├── TopicsPage.jsx       ✅ Functional (Day 4/5)
│   │   │   ├── PracticePage.jsx     ✅ Functional (Day 5) — text + voice input
│   │   │   ├── ResultsPage.jsx      ✅ Functional (Day 5) — AI score + feedback display
│   │   │   └── HistoryPage.jsx      ⏳ Day 6
│   │   ├── components/
│   │   │   ├── NavBar.jsx           ✅ Created (Day 3)
│   │   │   ├── TopicCard.jsx        ✅ Created (Day 4)
│   │   │   ├── ScoreBadge.jsx       ⏳ Day 6 (may fold into ResultsPage inline styling)
│   │   │   ├── StreakBadge.jsx      ⏳ Day 6
│   │   │   ├── GoalProgressBar.jsx  ⏳ Day 6
│   │   │   ├── Toast.jsx            ⏳ Day 7
│   │   │   └── EmptyState.jsx       ⏳ Day 7
│   │   ├── hooks/
│   │   │   └── useSpeechRecognition.js  ✅ Created (Day 5) — Web Speech API wrapper
│   │   ├── api/
│   │   │   └── axios.js             ✅ Created (Day 3)
│   │   ├── App.jsx                  ✅ Routing (Day 3)
│   │   └── main.jsx                 ✅ Vite default
│   └── package.json                 ✅ Configured
│
├── server/
│   ├── models/
│   │   ├── User.js                  ✅ Created (Day 3)
│   │   ├── Topic.js                 ✅ Created (Day 4)
│   │   └── Attempt.js               ✅ Created (Day 5) — score/feedback schema
│   ├── routes/
│   │   ├── auth.js                  ✅ Implemented (Day 4) — signup/login
│   │   ├── topics.js                ✅ Implemented (Day 4)
│   │   ├── attempts.js              ✅ Implemented (Day 5) — POST, GET history, GET :id
│   │   └── users.js                 ⏳ Day 6
│   ├── middleware/
│   │   └── auth.js                  ✅ Created (Day 3)
│   ├── services/
│   │   └── analyzeResponse.js       ✅ Created (Day 5) — Gemini AI integration
│   ├── utils/
│   │   └── streak.js                ⏳ Day 6
│   ├── seed/
│   │   └── seedTopics.js            ✅ Created (Day 4) — 22 curated topics
│   ├── server.js                    ✅ Updated (Day 5) — all routers mounted
│   ├── package.json                 ✅ Configured
│   └── .env                         ✅ Includes GEMINI_API_KEY (Day 5)
│
├── docs/
│   ├── ARCHITECTURE.md              ✅ (Day 2) — ⚠️ needs AI provider note (see below)
│   ├── SCHEMA.md                    ✅ (Day 2)
│   ├── API.md                       ✅ (Day 2)
│   ├── UI-WIREFRAMES.md             ✅ (Day 2)
│   ├── PROJECT-STRUCTURE.md         ✅ This file, updated Day 5
│   ├── SETUP.md                     ✅ (Day 3)
│   ├── ENVIRONMENT.md               ✅ (Day 3) — ⚠️ needs GEMINI_API_KEY added
│   ├── DAY3-SUMMARY.md              ✅ (Day 3)
│   └── DAY5-SUMMARY.md              ✅ New (Day 5)
│
├── .gitignore
└── README.md
```

## Key Change: AI Provider Switched to Google Gemini

**Original plan (PRD/Architecture, Day 1-2):** Anthropic Claude API for response analysis.

**Actual implementation (Day 5):** **Google Gemini API** (`gemini-3.6-flash` model, free tier).

**Reason for change:** Anthropic's Claude API is pay-as-you-go with no ongoing free tier. Google's Gemini API offers a genuine free tier (no credit card required), which better fits this capstone's constraint of using only free tools. The architecture, prompt design, JSON response contract, and error-handling logic are **unchanged** — only the SDK/provider call inside `analyzeResponse.js` differs. This is a drop-in swap, not a redesign.

## Legend
- ✅ = File exists and is functional as of today
- ⏳ = Planned, not yet created — scheduled for a specific upcoming Blueprint day
- ⚠️ = Needs a minor doc update to reflect the Gemini switch
