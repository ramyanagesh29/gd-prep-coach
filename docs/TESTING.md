# GD Prep Coach — Testing & QA Log

**Day 8 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

This log documents the release-readiness review performed on Day 8, structured as a Senior QA Engineer / Security Reviewer / Performance Engineer pass over the existing MVP (built Days 3-7). No new features were introduced — this was a hardening and bug-fixing pass only.

---

## Issues Found & Fixed

### 🔴 Security

| # | Issue | Fix |
|---|---|---|
| 1 | CORS fully open to any origin | Restricted to an explicit allowlist (`localhost:5173` + `FRONTEND_URL` env var) |
| 2 | No rate limiting on login/signup | Added `express-rate-limit` — 20 attempts per 15 minutes per IP |
| 3 | No security headers | Added `helmet()` middleware |
| 4 | Weak email validation (any non-empty string accepted) | Added regex-based email format validation |
| 5 | No limit on response text length | Capped at 3000 characters, validated server-side |
| 6 | Missing env vars caused silent/confusing failures | Server now validates `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY` on startup and exits clearly if missing |

### 🟠 Robustness / Error Handling

| # | Issue | Fix |
|---|---|---|
| 7 | Invalid MongoDB ObjectId caused unhandled 500 errors | Added `isValidObjectId()` checks before every DB lookup by ID, returns clean `400` |
| 8 | No global error handler | Added `errorHandler.js` middleware — catches CastError, ValidationError, duplicate-key errors, and unexpected errors with consistent JSON responses |
| 9 | No 404 handler for unmatched API routes | Added `notFound` middleware — returns clean JSON instead of Express's default HTML error page |

### 🟡 Frontend UX

| # | Issue | Fix |
|---|---|---|
| 10 | Logged-in users could still see Login/Signup forms | Added `PublicOnlyRoute` wrapper — redirects to Dashboard if already authenticated |
| 11 | Unauthenticated users saw broken/empty protected pages before redirect | Added `ProtectedRoute` wrapper — redirects to Login immediately, before any API call |
| 12 | 401 handling duplicated across every page | Centralized in an axios response interceptor — clears token and redirects on any `401`, anywhere in the app |
| 13 | No 404 page for bad URLs | Added a styled `NotFoundPage` with a link back to Dashboard |
| 14 | Form inputs had no accessible labels (screen readers announce poorly) | Added visually-hidden `<label>` elements tied to each input via `htmlFor`/`id` |
| 15 | Browser tab showed default "Vite + React" title | Updated `index.html` with proper title and meta description |

---

## End-to-End Verification (Completed Day 8)

All performed on the live production deployment:

- [x] Signup with a new account → lands on Topics correctly
- [x] Logout → redirected to Login
- [x] Login with valid credentials → lands on Dashboard
- [x] Login with wrong password → clean error message, no crash
- [x] Browse Topics, filter by each of the 4 categories → correct results each time
- [x] Submit a Practice response (text) → real AI score and structured feedback returned
- [x] Dashboard reflects new attempt (streak, goal progress, recent attempts list)
- [x] History table shows new attempt correctly
- [x] Visiting a broken/nonexistent URL → styled 404 page shown
- [x] Mobile width (~375px) → hamburger menu functions, no horizontal overflow anywhere

---

## Manual Security Spot-Checks

- [x] Confirmed a user cannot view another user's attempt by guessing/changing the attempt ID in the URL (`403 Not authorized`)
- [x] Confirmed all protected routes reject requests with no/invalid JWT (`401`)
- [x] Confirmed `.env` and all secrets remain excluded from Git (checked `.gitignore` and repo history)
- [x] Confirmed CORS rejects requests from origins other than the deployed frontend and localhost

---

## Known Limitations (Acceptable for v1.0 Launch)

- Render's free tier cold-starts after 15 minutes of inactivity (~30-50s first-request delay) — inherent to free-tier hosting, not a bug.
- No automated test suite (unit/integration tests) — testing this cycle was structured manual QA, appropriate for the project's scope and timeline.
- Rate limiting is IP-based and in-memory — resets on server restart (acceptable for a single-instance free-tier deployment; would need a shared store like Redis at higher scale).

---

## Release Readiness Assessment

Following a full security, robustness, and UX hardening pass plus a complete manual end-to-end walkthrough with all checks passing, **GD Prep Coach is considered stable and ready for public use** as a v1.0 product. No blocking issues remain.
