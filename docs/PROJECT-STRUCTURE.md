# GD Prep Coach — Project Structure

**Updated Day 7 | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

```
gd-prep-coach/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx            ✅ Polished (Day 7) — centered card layout
│   │   │   ├── Signup.jsx           ✅ Polished (Day 7) — centered card layout
│   │   │   ├── DashboardPage.jsx    ✅ Polished (Day 7) — card-based, styled banners
│   │   │   ├── TopicsPage.jsx       ✅ Polished (Day 7) — pill filters, hover cards
│   │   │   ├── PracticePage.jsx     ✅ Polished (Day 7) — card layout, category badge
│   │   │   ├── ResultsPage.jsx      ✅ Polished (Day 7) — color-coded score, feedback grid
│   │   │   └── HistoryPage.jsx      ✅ Polished (Day 7) — color-coded score table
│   │   ├── components/
│   │   │   ├── NavBar.jsx           ✅ Polished (Day 7) — sticky, active-highlight, mobile hamburger menu
│   │   │   ├── TopicCard.jsx        ✅ Polished (Day 7) — category color-coding, hover lift
│   │   │   ├── StreakBadge.jsx      ✅ Polished (Day 7) — card style
│   │   │   ├── GoalProgressBar.jsx  ✅ Polished (Day 7) — card style, animated fill
│   │   │   ├── ScoreBadge.jsx       ⏳ Folded into ResultsPage/HistoryPage inline styling instead
│   │   │   ├── Toast.jsx            ⏳ Not needed — inline error/success states used instead
│   │   │   └── EmptyState.jsx       ⏳ Folded into each page's inline empty-state markup
│   │   ├── hooks/
│   │   │   └── useSpeechRecognition.js  ✅ (Day 5)
│   │   ├── api/
│   │   │   └── axios.js             ✅ (Day 3)
│   │   ├── styles/
│   │   │   └── theme.css            ✅ Created (Day 7) — full design system: colors, spacing, typography, buttons, cards, responsive rules
│   │   ├── App.jsx                  ✅ (Day 6) — footer, flex layout
│   │   └── main.jsx                 ✅ Updated (Day 7) — imports theme.css
│   └── package.json                 ✅ Configured
│
├── server/                          — unchanged today, all Day 5/6 backend work stands
│   ├── models/ (User.js, Topic.js, Attempt.js)                    ✅
│   ├── routes/ (auth.js, topics.js, attempts.js, users.js)        ✅
│   ├── middleware/auth.js                                          ✅
│   ├── services/analyzeResponse.js                                 ✅
│   ├── utils/streak.js                                             ✅
│   ├── seed/seedTopics.js                                          ✅
│   └── server.js                                                   ✅
│
├── docs/
│   ├── ARCHITECTURE.md, SCHEMA.md, API.md, UI-WIREFRAMES.md        ✅ (Day 2)
│   ├── SETUP.md                                                    ✅ (Day 3)
│   ├── ENVIRONMENT.md                                              ✅ (Day 5)
│   ├── DEPLOYMENT.md                                               ✅ (Day 6)
│   ├── PROJECT-STRUCTURE.md                                        ✅ This file, updated Day 7
│   ├── DAY3-SUMMARY.md, DAY5-SUMMARY.md, DAY6-SUMMARY.md           ✅
│   └── DAY7-SUMMARY.md                                             ✅ New (Day 7)
│
├── .gitignore
└── README.md
```

## Design System Decisions (Day 7)

A few components originally planned in the Day 2 structure (`ScoreBadge.jsx`, `Toast.jsx`, `EmptyState.jsx`) were **intentionally folded into inline page-level styling** rather than built as separate files. Reasoning: with a shared `theme.css` design system in place, these patterns (a colored score number, an empty-state message, an inline error) are short enough (3-6 lines of JSX) that a separate component would add indirection without meaningfully improving reusability at this project's size. This is a deliberate simplification, not a missed task — the visual patterns exist consistently across every page, just implemented inline.

## Legend
- ✅ = File exists and is functional/polished as of today
- ⏳ = Originally planned, deliberately simplified (see note above)
