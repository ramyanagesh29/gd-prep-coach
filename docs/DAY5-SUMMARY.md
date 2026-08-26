# GD Prep Coach — Day 5 Summary

**Day 5 of 10 | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**
**Focus:** AI Analysis Engine (Core Feature Development, continued)

---

## ✅ What Was Completed Today

### Important Architecture Decision
Switched the AI provider from **Anthropic Claude API** (as originally specified in the PRD) to **Google Gemini API** (`gemini-3.6-flash`, free tier). This was a deliberate choice to keep the entire capstone buildable with genuinely free tools, with no payment required at any point. The architecture, prompt design, and JSON contract are otherwise identical — this was a provider swap, not a redesign.

### Backend
- Created `models/Attempt.js` — stores user responses, AI scores, and structured feedback, matching `SCHEMA.md`.
- Created `services/analyzeResponse.js` — builds a structured evaluation prompt, calls Gemini, defensively parses and validates the JSON response (strips markdown fences, validates required fields, clamps score to 0-100).
- Created `routes/attempts.js`:
  - `POST /api/attempts` — saves the attempt **before** calling AI (so responses are never lost even if analysis fails), then attempts analysis and updates the record.
  - `GET /api/attempts/history` — returns the logged-in user's past attempts, newest first, with topic titles populated.
  - `GET /api/attempts/:id` — returns full attempt detail, with ownership check (`403` if attempt belongs to another user).
- Updated `server.js` to mount the new attempts router.

### Frontend
- Created `hooks/useSpeechRecognition.js` — wraps the browser's Web Speech API, with graceful fallback messaging when unsupported.
- Updated `TopicsPage.jsx` — "Start" now navigates to the real Practice page instead of showing a placeholder alert.
- Rebuilt `PracticePage.jsx` — full text/voice response capture, live "Listening..." indicator, submit with loading state.
- Rebuilt `ResultsPage.jsx` — displays score (color-coded), full feedback breakdown (clarity/structure/relevance/assertiveness), overall feedback, and improvement tips.

### Real-World Debugging
- Hit a `404` error because `gemini-2.0-flash` had been deprecated by Google since the model list was last checked — fixed by switching to `gemini-3.6-flash`, exactly as Google's own error message instructed.
- Verified error handling works correctly in practice: two early test attempts show `score: null` in the database from before the model-name fix, proving that failed AI analysis doesn't discard the user's saved response — exactly as designed in `API.md`.

### Verification
- Tested with a deliberately off-topic response → correctly scored low (15/100) with accurate, specific reasoning.
- Tested with an on-topic but imperfect response → correctly scored higher (40/100) with different, genuinely differentiated feedback (grammar, structure, missing depth).
- Verified `GET /api/attempts/history` via browser console — returned all 4 attempts correctly, scoped to the logged-in user, in the right order.

---

## 🚧 What's Ready to Build Tomorrow

Per the Implementation Blueprint (Day 6 = **Practice History & Streak/Goals Dashboard**):
- `server/utils/streak.js` — streak and weekly goal calculation logic
- `server/routes/users.js` — dashboard summary endpoint, goal update endpoint
- `client/src/pages/DashboardPage.jsx` — real streak, goal progress, reminder banner
- `client/src/pages/HistoryPage.jsx` — full attempt history list (backend already supports this — just needs a frontend page)

All backend groundwork for this (the `Attempt.createdAt` index, the working `/history` endpoint) is already in place from today.

---

## 🎯 Tomorrow's Objective

Build the **Dashboard and History pages** — turning the raw attempt data we're already collecting into a motivating, trackable view: streak count, weekly goal progress, an in-app reminder if behind pace, and a full scrollable history of past attempts.

No additional setup or planning required — implementation begins immediately.

---

## Issues Encountered & Resolved

| Issue | Resolution |
|---|---|
| Anthropic API requires payment; task required free tools only | Switched to Google Gemini API (free tier), same architecture |
| `gemini-2.0-flash` returned 404 (deprecated) | Switched to `gemini-3.6-flash` per Google's own error message |
| Needed to verify history data without a frontend page yet | Used browser console `fetch()` with JWT to confirm API correctness directly |

No blocking issues remain. Core AI feature is stable and verified end-to-end with real, differentiated scoring.
