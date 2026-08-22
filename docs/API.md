# GD Prep Coach — API Design

**Day 2 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

No implementation yet — this document is the full contract for every v1.0 endpoint.

---

## Cross-Cutting Rules (apply to all protected endpoints)

- Every protected route requires `Authorization: Bearer <token>` header.
- `userId` is always read from the verified JWT (`req.userId`) — **never** trusted from request body/params/query, preventing cross-user data access.
- All error responses follow a consistent shape: `{ "error": "human-readable message" }`.
- All Claude API failures are caught and return `502` with a friendly message — never a raw stack trace or crash.

---

## Auth Endpoints

### `POST /api/auth/signup`
- **Purpose:** Register a new user
- **Auth required:** No
- **Request body:** `{ "name": "string", "email": "string", "password": "string" }`
- **Validation:** `name` non-empty; `email` valid format; `password` min 6 characters
- **Response (201):** `{ "token": "jwt_string", "user": { "id", "name", "email" } }`
- **Error cases:** `400` missing/invalid fields · `409` email already registered

### `POST /api/auth/login`
- **Purpose:** Authenticate existing user
- **Auth required:** No
- **Request body:** `{ "email": "string", "password": "string" }`
- **Validation:** Both fields required
- **Response (200):** `{ "token": "jwt_string", "user": { "id", "name", "email" } }`
- **Error cases:** `400` missing fields · `401` invalid email or password (generic message)

---

## Topic Endpoints

### `GET /api/topics`
- **Purpose:** List all topics, optionally filtered by category
- **Auth required:** Yes
- **Query params:** `?category=Abstract` (optional)
- **Response (200):** `[{ "_id", "title", "category", "description", "aiGenerated" }, ...]`
- **Error cases:** `401` missing/invalid token

### `GET /api/topics/:id`
- **Purpose:** Get a single topic's details
- **Auth required:** Yes
- **Response (200):** `{ "_id", "title", "category", "description" }`
- **Error cases:** `401` unauthorized · `404` topic not found

### `POST /api/topics/generate` *(Stretch feature)*
- **Purpose:** Generate a new AI topic on demand
- **Auth required:** Yes
- **Request body:** `{ "category": "string" }`
- **Validation:** category must be one of the allowed enum values
- **Response (201):** `{ "_id", "title", "category", "description", "aiGenerated": true }`
- **Error cases:** `400` invalid category · `401` unauthorized · `502` Claude API failure

---

## Attempt Endpoints

### `POST /api/attempts`
- **Purpose:** Submit a practice response; triggers AI analysis
- **Auth required:** Yes
- **Request body:** `{ "topicId": "string", "responseText": "string", "inputMethod": "text" | "voice" }`
- **Validation:** `topicId` must exist; `responseText` non-empty; `inputMethod` one of the enum values
- **Response (201):**
  ```json
  {
    "_id": "...",
    "topicId": "...",
    "responseText": "...",
    "score": 78,
    "feedback": {
      "clarity": "...", "structure": "...", "relevance": "...",
      "assertiveness": "...", "overallFeedback": "...",
      "improvementTips": ["...", "..."]
    },
    "createdAt": "..."
  }
  ```
- **Error cases:** `400` missing/invalid fields · `401` unauthorized · `404` topic not found · `502` Claude API failure (attempt still saved with `score: null`, user can retry)

### `GET /api/attempts/history`
- **Purpose:** Get all past attempts for the logged-in user
- **Auth required:** Yes
- **Query params:** `?page=1&limit=20` (optional pagination)
- **Response (200):** `[{ "_id", "topicId", "topicTitle", "score", "createdAt" }, ...]` (newest first)
- **Error cases:** `401` unauthorized

### `GET /api/attempts/:id`
- **Purpose:** Get full detail (including feedback) of one attempt
- **Auth required:** Yes
- **Response (200):** Full attempt object as in `POST /api/attempts` response
- **Error cases:** `401` unauthorized · `403` attempt belongs to a different user · `404` attempt not found

---

## User / Dashboard Endpoints

### `GET /api/users/dashboard`
- **Purpose:** Return streak, weekly goal progress, and recent attempts for the dashboard
- **Auth required:** Yes
- **Response (200):**
  ```json
  {
    "streak": 4,
    "weeklyGoal": 3,
    "weekProgress": 2,
    "behindPace": false,
    "recentAttempts": [{ "_id", "topicTitle", "score", "createdAt" }]
  }
  ```
- **Error cases:** `401` unauthorized

### `PUT /api/users/goal`
- **Purpose:** Update the user's weekly practice goal
- **Auth required:** Yes
- **Request body:** `{ "weeklyGoal": number }`
- **Validation:** must be a positive integer, reasonable max (e.g. 14)
- **Response (200):** `{ "weeklyGoal": 5 }`
- **Error cases:** `400` invalid value · `401` unauthorized

---

## Endpoint Summary Table

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Authenticate user |
| GET | `/api/topics` | Yes | List/filter topics |
| GET | `/api/topics/:id` | Yes | Get single topic |
| POST | `/api/topics/generate` | Yes | AI-generate topic (stretch) |
| POST | `/api/attempts` | Yes | Submit response for analysis |
| GET | `/api/attempts/history` | Yes | List user's past attempts |
| GET | `/api/attempts/:id` | Yes | Get one attempt's full detail |
| GET | `/api/users/dashboard` | Yes | Streak/goal/recent summary |
| PUT | `/api/users/goal` | Yes | Update weekly goal |
