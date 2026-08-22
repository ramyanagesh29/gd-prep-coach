# GD Prep Coach — System Architecture

**Day 2 Deliverable | ABTalks 60-Day Claude AI Challenge — 10-Day Capstone**

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React (Vite) | Fast dev server, minimal config, industry-standard |
| Backend | Node.js + Express | Matches existing skill set; REST fits CRUD-heavy app |
| Database | MongoDB Atlas (free M0) | Free tier, flexible schema, already familiar |
| Authentication | JWT + bcryptjs | Stateless, simple on free hosting, no session store needed |
| AI Model/API | Anthropic Claude API (`@anthropic-ai/sdk`) | Specified in PRD; called server-side only |
| Voice Input | Browser Web Speech API | Free, no backend audio processing, matches PRD scope decision |
| Hosting — Frontend | Vercel (free tier) | Zero-config React deploys, fast CDN |
| Hosting — Backend | Render (free tier) | Free Node/Express hosting, easy env var management |
| Hosting — Database | MongoDB Atlas | Free M0 cluster |
| Other libraries | `cors`, `dotenv`, `mongoose`, `axios`, `react-router-dom` | Standard, minimal |

---

## Component Diagram

```mermaid
graph TB
    subgraph Client["Browser (Client)"]
        UI[React App]
        SR[Web Speech API<br/>Speech-to-Text]
    end

    subgraph Frontend Hosting
        Vercel[Vercel<br/>Static React Build]
    end

    subgraph Backend["Render - Node.js/Express API"]
        Auth[Auth Routes<br/>/api/auth]
        Topics[Topics Routes<br/>/api/topics]
        Attempts[Attempts Routes<br/>/api/attempts]
        Users[Users Routes<br/>/api/users]
        Middleware[JWT Auth Middleware]
        AIService[Claude Analysis Service]
    end

    subgraph External["External Services"]
        Claude[Anthropic Claude API]
    end

    subgraph Data["MongoDB Atlas"]
        UserDB[(Users Collection)]
        TopicDB[(Topics Collection)]
        AttemptDB[(Attempts Collection)]
    end

    UI -->|HTTPS Requests| Vercel
    UI -.->|Voice Capture| SR
    SR -.->|Transcribed Text| UI
    Vercel -->|REST API Calls| Middleware
    Middleware --> Auth
    Middleware --> Topics
    Middleware --> Attempts
    Middleware --> Users
    Attempts --> AIService
    AIService -->|API Call| Claude
    Claude -->|JSON Response| AIService
    Auth --> UserDB
    Topics --> TopicDB
    Attempts --> AttemptDB
    Users --> UserDB
```

---

## Data Flow — Practice Session (Core Loop)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant R as React App
    participant S as Web Speech API
    participant E as Express API
    participant M as MongoDB
    participant C as Claude API

    U->>R: Selects a GD topic
    R->>E: GET /api/topics/:id
    E->>M: Fetch topic
    M-->>E: Topic data
    E-->>R: Return topic
    U->>R: Clicks "Speak" or types response
    opt Voice input
        R->>S: Start recognition
        S-->>R: Transcribed text (live)
    end
    U->>R: Clicks "Submit"
    R->>E: POST /api/attempts (topicId, responseText, inputMethod)
    E->>M: Save raw attempt
    E->>C: Send topic + response for analysis
    C-->>E: Structured JSON (score, feedback)
    E->>M: Update attempt with score/feedback
    E-->>R: Return full attempt result
    R->>U: Display Results page
```

---

## Request Lifecycle — Authenticated Request

```mermaid
sequenceDiagram
    participant R as React App
    participant M as Express Middleware
    participant Ctrl as Route Controller
    participant DB as MongoDB

    R->>M: Request with Authorization: Bearer <JWT>
    M->>M: Verify JWT signature & expiry
    alt Invalid/Missing Token
        M-->>R: 401 Unauthorized
    else Valid Token
        M->>M: Attach req.userId
        M->>Ctrl: Forward request
        Ctrl->>DB: Query scoped to req.userId
        DB-->>Ctrl: Data
        Ctrl-->>R: 200 OK + JSON response
    end
```

---

## AI Interaction Detail

```mermaid
graph LR
    A[Attempt Submitted] --> B[Build Prompt:<br/>Topic + Response + Instructions]
    B --> C[Claude API Call<br/>via @anthropic-ai/sdk]
    C --> D{Valid JSON<br/>Response?}
    D -->|Yes| E[Parse score, clarity,<br/>structure, relevance,<br/>assertiveness, tips]
    D -->|No/Error| F[Return graceful error<br/>to frontend]
    E --> G[Save to Attempt<br/>document in MongoDB]
    G --> H[Return to frontend]
```

---

## External Services

- **Anthropic Claude API** — response analysis and scoring (backend-only call, key never exposed to frontend)
- **MongoDB Atlas** — hosted database, free M0 tier
- **Vercel** — frontend static hosting
- **Render** — backend web service hosting

## Security Notes

- JWT secret and Claude API key live only in backend environment variables (`.env` locally, platform dashboard in production) — never committed to Git, never sent to the frontend.
- All data queries are scoped by `req.userId` derived from the verified JWT — never trusted from client-supplied IDs, preventing cross-user data leaks.
- CORS restricted to the exact deployed frontend origin in production.
