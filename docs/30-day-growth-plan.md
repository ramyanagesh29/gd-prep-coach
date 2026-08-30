# GD Prep Coach — 30-Day Growth Plan

**Day 10 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

A realistic, day-by-day roadmap taking GD Prep Coach from v1.0.0 MVP to a significantly more complete product. Each day is a small, achievable milestone that builds on the previous one.

---

## Week 1: Deepen the Core AI Feature

| Day | Milestone |
|---|---|
| 1 | Set up Jest for the backend. Write your first 3 unit tests for utils/streak.js. |
| 2 | Write unit tests for utils/validators.js. |
| 3 | Write integration tests for POST /api/auth/signup and POST /api/auth/login (success + failure cases). |
| 4 | Build POST /api/topics/generate — the AI-topic-generation stretch feature deferred from v1.0.0. |
| 5 | Add a "Generate New Topic" button to the Topics page, wired to the new endpoint. |
| 6 | Add a favoriteTopics array to the User model; add a star icon on TopicCard to save/unsave favorites. |
| 7 | Build a "My Favorites" filter on the Topics page. |

## Week 2: Analytics & Richer Feedback

| Day | Milestone |
|---|---|
| 8 | Install Recharts. Add a line chart to History showing score-over-time. |
| 9 | Add backend aggregation computing which feedback category the user scores lowest on, across their last 10 attempts. |
| 10 | Surface that "weak area" insight on the Dashboard as a new card. |
| 11 | Add response word-count tracking to the Attempt model at submission time. |
| 12 | Add an "average response length over time" mini-stat to the Dashboard. |
| 13 | Add pagination to the History page (currently unpaginated). |
| 14 | Add a CSV export button on History ("Download my practice history"). |

## Week 3: Trust, Security & Reliability

| Day | Milestone |
|---|---|
| 15 | Add email verification on signup using a free-tier transactional email service. |
| 16 | Add a "Forgot Password" flow (reset token via email, reset via tokenized link). |
| 17 | Move rate limiting from in-memory to a free-tier Redis instance so it persists across restarts. |
| 18 | Add request logging (e.g., morgan) for basic production observability. |
| 19 | Set up a free uptime monitor pinging /api/health every 5 minutes. |
| 20 | Write a SECURITY.md documenting your security practices. |
| 21 | Do a second full manual QA pass, retesting every flow from TESTING.md. |

## Week 4: New Surfaces & Polish

| Day | Milestone |
|---|---|
| 22 | Design a simple "Organization" concept — a placement-cell admin who sees aggregate student progress. |
| 23 | Build the Organization model and a stats endpoint returning aggregate (never individual) scores. |
| 24 | Build a minimal admin dashboard page consuming that endpoint. |
| 25 | Add a dark/light theme toggle, showcasing your CSS variable architecture's flexibility. |
| 26 | Record a fresh demo video reflecting all new features added this month. |
| 27 | Update README.md to reflect the new feature set. |
| 28 | Tag and release v1.1.0 on GitHub with proper release notes. |
| 29 | Write a "30 days later" LinkedIn follow-up post. |
| 30 | Write a short personal retrospective on what you learned building v1.1.0 independently. |

---

## How to Use This Plan

Each day is scoped to be achievable in a single focused session. If a day feels too large, split it across two sessions — consistent forward motion matters more than speed. Use daily-build-prompt.md alongside this plan: paste in the current day's milestone from this table, and it will guide implementation the same way this capstone's daily prompts did.
