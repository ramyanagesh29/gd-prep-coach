# GD Prep Coach — Future Scope

**Day 10 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

This document outlines how GD Prep Coach could realistically evolve beyond v1.0.0, broken into 3, 6, and 12-month horizons. Each phase builds directly on what already exists — no rewrites, only extensions.

---

## 3 Months: Deepen the Core Loop

The current core loop (Pick Topic → Respond → AI Score → Track) works well but is still shallow in a few places. The next quarter should focus on making the existing experience richer, not adding entirely new surfaces.

- **Audio-based delivery analysis:** Move beyond text-only analysis by capturing actual audio (not just the Web Speech API transcript) and running it through a speech-analysis model to detect pace, filler words ("um," "uh"), and pauses. This directly extends the existing `Attempt` model — just adds new fields (`pace`, `fillerWordCount`, `pauseCount`) without touching the schema's core shape.
- **AI-generated topics on demand (completing the stretch feature):** The `POST /api/topics/generate` endpoint was scoped as a stretch goal in the PRD but not built in v1.0.0. This is a natural next step — same Gemini integration pattern already used in `analyzeResponse.js`, just a second prompt template.
- **Richer History analytics:** Add a simple trend chart (score over time) to the History page using a lightweight charting library (e.g., Recharts) — the data already exists in MongoDB, this is purely a frontend addition.
- **Email verification on signup:** Currently any email works without verification. Adding a simple verification flow (e.g., via a free tier of Resend or similar) closes an obvious gap before wider public use.

## 6 Months: Community & Social Features

Once the core experience is deepened, the next phase introduces light social/community mechanics — carefully, without compromising the app's core value of low-pressure, judgment-free practice.

- **Peer feedback (opt-in):** Allow users to optionally share a past attempt and get lightweight feedback from another user — not a live GD room, just an async, opt-in review system. This respects the original PRD's explicit decision to defer "live multi-user GD rooms" while still adding social value.
- **Leaderboards by category:** A simple, opt-in leaderboard (e.g., "Top scores this week in Current Affairs") to drive engagement, without making the core experience feel competitive or discouraging for beginners.
- **Mentor review mode:** Allow a small group of trusted reviewers (e.g., seniors, alumni) to leave structured comments on a user's attempt, layered on top of — not replacing — the AI feedback.
- **Migrate rate limiting to a shared store:** The current in-memory rate limiter resets on server restart and won't scale across multiple server instances. At this stage, moving to a Redis-backed limiter (e.g., via a free-tier Upstash Redis instance) becomes worthwhile.

## 12 Months: Platform Maturity

By this point, the goal shifts from "a tool I built" to "a small but real product with users who depend on it."

- **Mobile app (React Native):** Given the existing REST API is already fully decoupled from the frontend, a React Native app could reuse the entire backend without changes — just a new client.
- **Institutional/placement-cell accounts:** Add a lightweight "organization" concept so college placement cells can create cohorts, assign topics, and see aggregate (not individual) progress — a natural extension of the existing `User` and `Attempt` models with a new `Organization` reference.
- **Multi-language topic support:** Given India's placement landscape spans many regional contexts, supporting GD topics and AI feedback in Hindi or other regional languages (Gemini supports multilingual prompts natively) would meaningfully broaden who the tool serves.
- **Automated testing suite:** By this point, enough surface area exists to justify investing in real unit/integration tests (currently manual QA only, as documented in `TESTING.md`) — likely Jest for the backend and React Testing Library for the frontend.

---

## Guiding Principle for All Future Work

Every item above extends the existing architecture (MongoDB schema, JWT auth, Gemini integration, React/Express separation) rather than replacing it. The system was designed on Day 2 to be extensible in exactly these directions — this isn't a rewrite roadmap, it's a "keep building on a solid foundation" roadmap.
